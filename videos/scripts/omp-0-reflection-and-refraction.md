# Reflection and Refraction — Explainer Script

- **Course:** Optics and Modern Physics
- **Chapter:** Chapter 0 · Reflection and Refraction (id: `omp-0-reflection-and-refraction`)
- **Target runtime:** about 6 minutes (roughly 1,110 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/omp-0-reflection-and-refraction.py`, class `OmpCh0Video`

**Learning goal.** The learner sees light as rays whenever everything is much bigger than the wavelength, and rebuilds the whole chapter from two laws ($r = i$ and $n_1\sin i = n_2\sin r$) plus the New Cartesian sign convention. They locate a plane-mirror image by tracing reflected rays back ($v = -u$, virtual, erect, same size) and see why a half-height mirror is enough. They name P, C and F on a concave mirror, know $f = R/2$ only for paraxial rays, and write every distance with its sign ($u < 0$ for a real object, $f < 0$ concave, $f > 0$ convex). They use $\frac1v + \frac1u = \frac1f$ and $m = -\frac vu$ and read real/virtual and erect/inverted from the signs, watching a concave mirror's image change as the object crosses C and F. They know $n = c/v$, that light bends towards the normal only when entering a denser medium, and that frequency stays fixed while $\lambda \to \lambda/n$. They get apparent depth $d' = d\,n_{\text{obs}}/n_{\text{obj}}$, the critical angle $\sin\theta_c = n_2/n_1$ with both conditions for TIR, the lit circle $R = h/\sqrt{n^2-1}$, and the single-surface formula $\frac{n_2}{v} - \frac{n_1}{u} = \frac{n_2-n_1}{R}$ with the sign of $R$ set by where C lies.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: incident and reflected rays = PRIMARY (red) with a small arrowhead on each segment, refracted rays = SECONDARY (teal), dashed back-extensions = PURPLE, objects = INK, images = ACCENT (amber), mirrors = slate with hatching on the back, glass and water = pale teal fill, normals = dashed MUTED, highlights = gold, correct = GREEN, wrong = red strike-through. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols are always spoken as words: "one over v plus one over u equals one over f", "n one sine i", "sine theta c", "d prime", "root two". No lone "a" is spoken as a letter in this chapter, so the `[[char LTRL]]` trick is not needed. Numbers are said the way a teacher reads them aloud ("forty one point eight degrees", "minus one sixtieth").

---

## Title card

**Narration:** Chapter zero. Reflection and refraction.

**Visuals:** `title_card("Optics and Modern Physics", "Chapter 0 · Reflection and Refraction")`.

---

## Scene 1 — Rays, reflection and the plane mirror (Lesson 0.1)

**Narration:**

- **Beat a:** Light is a wave, but mirrors and lenses are millions of times bigger than its wavelength, so light travels in straight lines, called rays. Two laws and one sign convention build this whole chapter.
- **Beat b:** First, reflection. Where the ray meets the mirror, draw the normal, at right angles to the surface. The angle of reflection equals the angle of incidence, both measured from the normal.
- **Beat c:** Put a point object in front of a flat mirror. The reflected rays spread apart. Trace them back, and they seem to come from one point behind the mirror, as far behind as the object is in front. The image is virtual, upright, and the same size.
- **Beat d:** To see your head, light reflects halfway between your head and your eye. To see your feet, halfway between your feet and your eye. So a mirror half your height is enough, however far back you stand.

**Visuals:**

- **Beat a:** A red sine wave labelled $\lambda \approx 400$ to $700$ nm morphs into a beam of three parallel ray arrows. Caption: "rays: straight lines, when everything is much bigger than the wavelength". Then "Two laws and one sign convention" over a row: $r = i$, $n_1\sin i = n_2\sin r$, "+ one sign convention".
- **Beat b:** Clear. A hatched horizontal mirror, an incident ray at 40° to a dashed normal, arcs $i$ and $r$, the reflected ray. $r = i$ on the right with "angles from the normal, never from the surface".
- **Beat c:** Clear. A vertical hatched mirror, point object O. Two rays hit the mirror and reflect outwards (diverging). Purple dashed back-extensions meet at the amber image I behind the mirror. Double arrows mark distance $x$ on each side; "virtual, upright, same size" and $v = -u$ at the top right.
- **Beat d:** Clear. A stick figure (head T, eye E, feet F) facing a faint wall. The ray from the head reflects at the level midway between head and eye; the ray from the feet at the level midway between feet and eye. That stretch of wall turns into a thick mirror with a brace $\frac H2$. On the right: top edge $\frac{H+e}{2}$, bottom edge $\frac e2$, length $\frac H2$ (green); note "eye height and distance cancel".

---

## Scene 2 — Spherical mirrors and the sign convention (Lesson 0.2)

**Narration:**

- **Beat a:** Now curve the mirror. A concave mirror is a piece of a sphere, with its middle at the pole P and the sphere's centre at C. Rays parallel to the axis reflect and cross at the focus F.
- **Beat b:** Each ray reflects about the radius, the normal. Rays close to the axis cross halfway to C, so f equals R over two. Rays far from the axis cross nearer the mirror: spherical aberration. So f equals R over two is for paraxial rays only.
- **Beat c:** Now the signs. In the New Cartesian convention, light travels left to right and distances are measured from the pole: along the light positive, against it negative, and heights up positive.
- **Beat d:** So a real object always has u negative. A concave mirror has C and F in front, so f is negative. A convex mirror has them behind, so f is positive.

**Visuals:**

- **Beat a:** A concave spherical arc (radius 4.5) on a principal axis; P, then C appear. Three paraxial rays parallel to the axis reflect (exact reflection about the radius) and cross at F, which flashes.
- **Beat b:** A dashed radius CM shows the normal at one hit point. $f = \frac R2$ appears bottom left. A purple ray far from the axis (height 3, exact reflection) crosses the axis visibly nearer the mirror; labels "spherical aberration" and "paraxial rays only".
- **Beat c:** Clear. Header "New Cartesian sign convention". An axis with a hatched mirror at P, a big red arrow "incident light" pointing right, a green arrow to the right marked +, a red arrow to the left marked −, and a green upward arrow "heights up: +".
- **Beat d:** On the left, in turn: "real object: $u < 0$" (the − arrow pulses), "concave (C, F in front): $f < 0$" (teal), "convex (C, F behind): $f > 0$" (purple).

---

## Scene 3 — The mirror formula and magnification (Lesson 0.3)

**Narration:**

- **Beat a:** From the object's tip, one ray parallel to the axis reflects through F. Another, to the pole, reflects symmetrically. Where they cross is the image.
- **Beat b:** Similar triangles in this picture give the mirror formula: one over v plus one over u equals one over f, and the magnification m is minus v over u. Put every quantity in with its sign: negative v means a real image in front, negative m means inverted.
- **Beat c:** Slide the object in. Far away, the image is small and inverted, near F. At C, the image meets the object, same size. Between C and F, it grows and races outwards.
- **Beat d:** Cross F, and the image jumps behind the mirror: virtual, upright and magnified. That is a shaving mirror. So a concave mirror does not always make a real image.
- **Beat e:** Try one. An object thirty centimetres from a concave mirror of radius forty: u is minus thirty, f is minus twenty. So one over v is minus one sixtieth, v is minus sixty, and m is minus two: real, inverted, twice as tall.

**Visuals:**

- **Beat a:** A gently curved concave mirror at the right ($f = 15$ cm, scale 1 unit = 10 cm), F and C marked. An object arrow at $u = -40$ cm; the parallel ray (reflecting through F) and the pole ray (reflecting symmetrically) meet at the tip of an amber inverted image, which flashes. The whole diagram is driven by a `ValueTracker` for $u$ and rebuilt with `always_redraw`.
- **Beat b:** $\frac1v + \frac1u = \frac1f$ and $m = -\frac vu$ at the top left, then "$v<0$: real, in front" and "$m<0$: inverted" beneath.
- **Beat c:** Live readouts $u$, $v$ (cm) and $m$ along the top. The object moves out to $u = -65$ cm (small image near F), in to $u = -30$ cm ("at C: same size"), then to $u = -21$ cm (large inverted image far out).
- **Beat d:** The object crosses F; the diagram jumps to $u = -9$ cm. The reflected rays now diverge and purple dashed extensions meet at an upright magnified image behind the mirror ("virtual, upright, magnified"). The quote "a concave mirror always makes a real image" appears and is struck through.
- **Beat e:** Clear. Worked example: $u = -30$ cm, $R = -40$ cm $\Rightarrow f = -20$ cm; $\frac1v = -\frac1{20} + \frac1{30} = -\frac1{60}$; $v = -60$ cm, $m = -2$ (green); "real, inverted, twice as tall".

---

## Scene 4 — Refraction and Snell's law (Lesson 0.4)

**Narration:**

- **Beat a:** Now let light cross into a new material. It slows down, and the refractive index n is c over v. Water is about four thirds, glass about one point five, diamond two point four two.
- **Beat b:** The slowdown bends the ray. Snell's law: n one sine i equals n two sine r, with both angles from the normal. Raise the index of the lower medium and the ray bends harder towards the normal.
- **Beat c:** Coming out of the denser medium, it bends away from the normal instead. Light does not always bend towards the normal.
- **Beat d:** For example, light meets glass of index root two at forty five degrees. Sine r is one half, so r is thirty degrees.
- **Beat e:** The frequency is set by the source, so it never changes. The speed and the wavelength both shrink by n: six hundred nanometres becomes four hundred and fifty in water, and the colour stays the same.

**Visuals:**

- **Beat a:** Air above, tinted glass below, a dashed normal. A red incident ray at 50° and a teal refracted ray with arcs $i$ and $r$; a live $n_2$ readout. $n = \frac cv$ and "water ≈ 4/3, glass ≈ 1.5, diamond 2.42" on the right.
- **Beat b:** $n_1\sin i = n_2\sin r$ replaces it. $n_2$ sweeps 1.5 → 2.4 → 1.5 and the refracted ray swings towards the normal (exact Snell). Caption "into denser: towards the normal".
- **Beat c:** The tint moves to the top half: glass ($n_1 = 1.5$) above, air below. A ray at 30° leaves at 48.6°, bending away. Caption "into rarer: away from the normal".
- **Beat d:** A boxed example: $1\cdot\sin45^\circ = \sqrt2\sin r$, then $\sin r = \frac12 \Rightarrow r = 30^\circ$ (green).
- **Beat e:** Clear. A travelling wave crosses from air into water ($n = 4/3$); crests bunch closer in the water while staying continuous at the boundary. Bottom row: "$\nu$ unchanged", $v \to \frac vn,\ \lambda \to \frac\lambda n$, "600 nm → 450 nm".

---

## Scene 5 — Apparent depth (Lesson 0.5)

**Narration:**

- **Beat a:** That is why a pool looks shallow. Light from a coin bends away from the normal as it leaves the water, and your eye traces it straight back, to a point higher up.
- **Beat b:** Looking nearly straight down, the angles are small, and Snell's law gives the apparent depth: d prime equals d over n. A coin under twenty centimetres of water seems fifteen centimetres down.
- **Beat c:** In general, d prime is d times the observer's index over the object's, and layers add: three centimetres of glass on four of water looks like two plus three, five.
- **Beat d:** Flip it round: a bird six metres above a pond looks eight metres up to a fish. Farther, not nearer.

**Visuals:**

- **Beat a:** A water tank with a gold coin at depth $d$. A vertical ray goes straight up; an oblique ray (15° in water) refracts away from the normal (exact Snell, $n = 4/3$) into an eye. Its purple dashed back-extension meets the vertical at the amber image of the coin, higher up. Braces "$d = 20$ cm" and $d'$.
- **Beat b:** Right column: $d' = \frac dn$ with "looking nearly straight down", then $20 \div \frac43 = 15$ cm (green).
- **Beat c:** $d' = d\,\frac{n_{\text{observer}}}{n_{\text{object}}}$, then $\frac{3}{1.5} + \frac{4}{4/3} = 2 + 3 = 5$ cm with "glass on water: layers add".
- **Beat d:** Clear. A pond with a fish below and a bird 6 m above ("real: 6 m above"). An amber copy of the bird rises higher ("seen by the fish: 8 m above"). $d' = d\,\frac{n_{\text{obs}}}{n_{\text{obj}}} = 6\times\frac43 = 8$ m.

---

## Scene 6 — Total internal reflection (Lesson 0.6)

**Narration:**

- **Beat a:** Now send light from glass into air, and tilt it. The refracted ray swings towards the surface and fades, while the reflected ray brightens.
- **Beat b:** At the critical angle, the refracted ray just skims the surface. Set r to ninety degrees in Snell's law: sine theta c equals n two over n one. For glass in air, that is forty one point eight degrees.
- **Beat c:** Tilt past it, and no light gets out. Everything reflects: total internal reflection. It needs light going from denser to rarer, and incidence above the critical angle. Air into glass can never do it.
- **Beat d:** Diamond's critical angle is only twenty four degrees, so light bounces around inside and sparkles. Optical fibres trap light the same way.
- **Beat e:** A lamp four metres under water lights only a circle on the surface, of radius h tan theta c, which is h over root of n squared minus one: about four point five metres.

**Visuals:**

- **Beat a:** Glass ($n_1 = 1.5$) above, air below. A `ValueTracker` incidence angle drives the incident, reflected and refracted rays (exact Snell); live $i$ and $r$ readouts. $i$ sweeps 25° → 38°; the refracted ray fades while the reflected ray brightens.
- **Beat b:** $i$ reaches 41.8°, the refracted ray lies along the surface. $n_1\sin\theta_c = n_2\sin90^\circ$, then $\sin\theta_c = \frac{n_2}{n_1} \Rightarrow \theta_c = 41.8^\circ$.
- **Beat c:** $i$ goes to 55°: the refracted ray is gone and the $r$ readout is replaced by "no refracted ray". "total internal reflection" with "1. denser to rarer" and "2. i greater than the critical angle".
- **Beat d:** Clear. "diamond: $\theta_c \approx 24.4^\circ$" with "most light inside is trapped and bounces out through the top". Below, a straight fibre core with a ray zig-zagging along it by TIR; caption "optical fibre: total internal reflection at every wall".
- **Beat e:** Clear. A pool cross-section with a lamp at depth $h$. Rays inside $\theta_c$ refract out; the purple edge rays meet the surface at exactly $\theta_c$ and graze; a steeper ray reflects back down. The lit disc is a thick gold segment with brace $R$. At the top: $R = h\tan\theta_c = \frac{h}{\sqrt{n^2-1}} = \frac{4}{\sqrt7/3} \approx 4.54$ m.

---

## Scene 7 — Refraction at a spherical surface (Lesson 0.7)

**Narration:**

- **Beat a:** Last, curve the boundary. Snell's law with small angles gives one formula for every curved surface: n two over v, minus n one over u, equals n two minus n one, over R, where n one is the medium the light is leaving.
- **Beat b:** The sign of R comes from where the centre lies, measured along the light. A fish sits ten centimetres inside a bowl of radius fifteen. Light goes from water to air, and the centre is on the incident side, so R is minus fifteen.
- **Beat c:** The formula gives v equal to minus nine centimetres and magnification one point two: the fish looks slightly nearer and twenty percent fatter. Let R go to infinity, and you get apparent depth back.

**Visuals:**

- **Beat a:** A glass rod with a convex hemispherical end (P, C marked; $n_1 = 1$, $n_2 = 1.5$). Three rays from O converge to I inside the glass; a dashed radius shows the normal. The formula at the top, the lesson's example "$u = -40$, $R = +10 \Rightarrow v = +60$ cm" and "$n_1$ = the medium the light leaves" at the bottom (geometry drawn to that scale).
- **Beat b:** Clear. A round bowl with a fish 10 cm from the right-hand wall P, an eye outside on the right, and an arrow "light: water to air". C and P appear; a purple radius labelled $R = -15$ cm. Right column: $n_1 = \frac43,\ n_2 = 1,\ u = -10$.
- **Beat c:** $\frac1v = \frac1{45} - \frac2{15} = -\frac19$; $v = -9$ cm (amber). Rays from the fish refract away from the normal at the wall; purple dashed extensions meet at a faint amber fish image, 1.2 times larger and slightly nearer. $m = \frac{n_1v}{n_2u} = 1.2$ (green). Bottom: "$R\to\infty$: $\frac{n_2}{v} = \frac{n_1}{u}$ (apparent depth)".

---

## Scene 8 — Recap and next (Lesson 0.8)

**Narration:**

- **Beat a:** To recap. Rays obey r equals i, and a plane mirror image sits as far behind as the object is in front. One over v plus one over u equals one over f, with every sign from the convention.
- **Beat b:** Snell's law bends light at a boundary, with the frequency fixed. Apparent depth and the critical angle both fall out of it. And one formula handles any curved surface.
- **Beat c:** Try the mastery quiz. Then chapter one puts two curved surfaces together to make a lens, and builds microscopes and telescopes.

**Visuals:** Title "Chapter 0 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $r = i,\ v = -u$: plane mirror: virtual, upright, same size
2. $\frac1v + \frac1u = \frac1f,\ m = -\frac vu$: every sign from the convention
3. $n_1\sin i = n_2\sin r$: frequency fixed, wavelength shrinks
4. $d' = \frac dn,\ \sin\theta_c = \frac{n_2}{n_1}$: apparent depth and TIR
5. $\frac{n_2}{v} - \frac{n_1}{u} = \frac{n_2-n_1}{R}$: any curved surface

Last, "Next: Chapter 1 · Lenses, Prisms and Optical Instruments" appears at the bottom.
