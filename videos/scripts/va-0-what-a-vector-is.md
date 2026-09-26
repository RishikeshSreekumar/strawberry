# What a Vector Is — Explainer Script

- **Course:** Vector Algebra
- **Chapter:** Chapter 0 · What a Vector Is (id: `va-0-what-a-vector-is`)
- **Scene class:** `VaCh0Video` in `videos/scenes/va-0-what-a-vector-is.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees why some quantities need a direction as well as a size, and that a vector is a *free* arrow: only its length and direction matter, not where it is drawn. They can name the parts of an arrow, tell apart zero, unit, equal, negative, collinear and co-initial vectors, add arrows tip to tail (triangle, parallelogram and polygon laws), and subtract and scale them, all without coordinates. They avoid the chapter's named traps: "3 plus 4 is always 7", "a vector lives at one place", "parallel means same direction", "equal vectors start at the same point", "the size of a sum is the sum of the sizes", and "a minus b points from a to b".

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: first vector a = PRIMARY (strawberry red), second vector b = SECONDARY (teal), sums and results = PURPLE, highlights = deep gold `#D19A00`, warnings = PRIMARY with a cross mark. Arrows are Manim `Arrow(..., buff=0)` with stroke 6. Maths uses `MathTex`; vector names are `\vec a`, `\vec b`. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("a plus b", "vector A B").

---

## Scene 0 — Title card

**Narration:** Chapter zero. What a vector is.

**Visuals:** kicker "Vector Algebra", title "Chapter 0 · What a Vector Is".

---

## Scene 1 — Hook: three plus four (Lesson 0.1)

**Narration:**

- **Beat a:** You leave home and walk three kilometres east. Then you walk four more. How far are you from home? The tempting answer is seven.
- **Beat b:** But watch what happens as the second leg turns. Pointing the same way, you are seven away. At right angles, five. Turned all the way back, just one.
- **Beat c:** The lengths never changed. The directions decided the answer. That is the whole reason vectors exist.

**Visuals:**

- **Beat a:** A house dot labelled "home" at the left. A red arrow 3 units long pointing right, labelled "3 km". A teal arrow of length 4 from its tip, also pointing right, labelled "4 km". A card `3 + 4 = 7 ?` appears top right.
- **Beat b:** A `ValueTracker` angle turns the teal leg about the tip of the red leg (0 → 90° → 180°). An `always_redraw` purple arrow runs from home to the teal tip, with a live readout "distance from home = d km". Pause at 0 (7), 90° (5, right-angle marker), 180° (1).
- **Beat c:** Card "Same lengths, different directions → different answers". Distance range `1 \le d \le 7` shown.

---

## Scene 2 — Scalars and vectors (Lesson 0.1)

**Narration:**

- **Beat a:** A scalar is completely described by one number and a unit: mass, time, temperature, distance, speed. A vector needs a number and a direction: displacement, velocity, force, weight.
- **Beat b:** Run one full lap of a four hundred metre track. The distance is four hundred metres, but you end where you started, so the displacement is zero.
- **Beat c:** A warning. Electric current flows along a wire, yet it is a scalar, because currents at a junction add like plain numbers whatever the angle. The real test for a vector is: do two of them combine by the arrow rule?

**Visuals:**

- **Beat a:** Two column headers "Scalar" (MUTED) and "Vector" (PURPLE). Word chips fade in under each column: mass, time, temperature, distance, speed | displacement, velocity, force, weight.
- **Beat b:** Columns shrink away. An oval track; a dot runs one full lap leaving a red trace. Labels "distance = 400 m" and "displacement = 0" (the start and finish dots coincide).
- **Beat c:** A card with the current example: "Current: 2 A + 3 A = 5 A at any angle → scalar" and the test "Vector ⇔ combines by the arrow rule".

---

## Scene 3 — Anatomy of an arrow (Lesson 0.2)

**Narration:**

- **Beat a:** Draw a vector as an arrow. It starts at the initial point, A, the tail, and ends at the terminal point, B, the tip. We write it as vector A B, or give it one letter, vector a.
- **Beat b:** Its length is the magnitude, written with bars. A magnitude is a distance, so it is never negative. Reverse the arrow and you get vector B A: same length, opposite direction, a different vector.
- **Beat c:** Now slide the arrow somewhere else without turning or stretching it. Is it still the same vector? Yes. Walk three kilometres north east is the same instruction wherever you start. A vector is only its magnitude and direction. That is a free vector.

**Visuals:**

- **Beat a:** A red arrow from A (-3, -1) to B (1, 1.5). Dots and labels A, B; small grey labels "initial point (tail)" and "terminal point (tip)". Then `\overrightarrow{AB} = \vec a` above.
- **Beat b:** A `Brace` along the arrow labelled `|\vec a|`. Card `|\vec a| \ge 0`. A teal copy is created with reversed head labelled `\overrightarrow{BA}`; line `|\overrightarrow{AB}| = |\overrightarrow{BA}|` but `\overrightarrow{AB} \ne \overrightarrow{BA}`.
- **Beat c:** Clear, then the red arrow slides to three different places (leaving faint ghosts). A readout "length 3.0, angle 34°" stays fixed. Callout "Free vector: magnitude + direction only".

---

## Scene 4 — Types of vectors (Lesson 0.3)

**Narration:**

- **Beat a:** A few kinds get names. The zero vector has length zero, a single dot. A unit vector has length exactly one. Co-initial vectors share a starting point.
- **Beat b:** Equal vectors have the same length and the same direction. They do not need to start at the same point: opposite sides of a parallelogram are equal. The negative of a has the same length, pointing the opposite way.
- **Beat c:** Collinear, or parallel, vectors lie along the same or parallel lines. Their lengths can differ, and they can point opposite ways. So parallel does not mean same direction. Equal vectors are collinear, but collinear vectors need not be equal.

**Visuals:**

- **Beat a:** Three panels in a row, each with a caption: a dot labelled `\vec 0`; a unit arrow with a brace "1" labelled `\hat a`; three arrows fanning from one point, "co-initial".
- **Beat b:** A parallelogram ABCD, with `\overrightarrow{AB}` and `\overrightarrow{DC}` highlighted red: `\overrightarrow{AB} = \overrightarrow{DC}`. Next to it, `\vec a` and `-\vec a` side by side.
- **Beat c:** Three arrows on parallel rails: long right, short right, medium left, all tagged "collinear". A cross over "parallel ⇒ same direction". Nested sets: "equal ⊂ collinear".

---

## Scene 5 — Adding arrows (Lesson 0.4)

**Narration:**

- **Beat a:** To add two vectors, place them tip to tail. Slide b so its tail sits on the tip of a. The sum runs from the first tail to the last tip. That is the triangle law.
- **Beat b:** Or put both tails together and complete the parallelogram. Its diagonal is the same sum. And since the parallelogram has both routes, a then b and b then a, addition is commutative.
- **Beat c:** Chain more arrows the same way. If the chain comes back to where it started, the sum is the zero vector. That is the polygon law.
- **Beat d:** One trap. The size of a sum is not the sum of the sizes. The length of a plus b is at most the length of a plus the length of b, with equality only when they point the same way, and at least the difference of the lengths.

**Visuals:**

- **Beat a:** Red `\vec a` from O, teal `\vec b` elsewhere. `\vec b` slides to the tip of `\vec a`. Purple sum from O to the final tip labelled `\vec a + \vec b`. Title "Triangle law".
- **Beat b:** Fade to the parallelogram: both from O, dashed copies complete it, purple diagonal. `\vec a + \vec b = \vec b + \vec a`.
- **Beat c:** A pentagon of four coloured arrows plus the closing arrow, labels A-E. `\overrightarrow{AB} + \overrightarrow{BC} + \overrightarrow{CD} + \overrightarrow{DE} + \overrightarrow{EA} = \vec 0`.
- **Beat d:** Crossed-out `|\vec a + \vec b| = |\vec a| + |\vec b|`, then the correct bound `\big||\vec a| - |\vec b|\big| \le |\vec a + \vec b| \le |\vec a| + |\vec b|`.

---

## Scene 6 — Subtraction and scalar multiples (Lesson 0.5)

**Narration:**

- **Beat a:** Multiply a by a number k. For k bigger than one it stretches. Between zero and one it shrinks. At zero it collapses to the zero vector, and for negative k it flips round and points the other way.
- **Beat b:** Subtraction is adding the negative: a minus b is a plus negative b. Draw a and b from one point. Then a minus b is the arrow from the tip of b to the tip of a. Not from a to b. Check it: b plus a minus b lands on the tip of a.
- **Beat c:** And two vectors are collinear exactly when one is a scalar multiple of the other: b equals lambda times a.

**Visuals:**

- **Beat a:** Red arrow `\vec a` from O, and a purple arrow `k\vec a` on a parallel rail below whose length follows a `ValueTracker` k through 2, 0.5, 0, -1.5. Live `k = ...` readout.
- **Beat b:** `\vec a` (red) and `\vec b` (teal) from O. Purple arrow from tip of b to tip of a labelled `\vec a - \vec b`. Card "from the tip of b to the tip of a". Then `\vec b + (\vec a - \vec b) = \vec a`.
- **Beat c:** `\vec b = \lambda \vec a \iff \vec a \parallel \vec b` (for non-zero a).

---

## Scene 7 — Recap (Lesson 0.6)

**Narration:** A vector is a magnitude and a direction, and it can be drawn anywhere. Add tip to tail. Subtract by going from the tip of b to the tip of a. Scale by stretching and flipping. And no coordinates needed yet. Next chapter, we pin arrows to a grid and turn them into numbers.

**Visuals:** A checklist of four cards, ticks appearing one by one; ends with "Next: Vectors in Coordinates".
