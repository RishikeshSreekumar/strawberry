# Course — Trigonometry: Angles, Circles, and Waves

**Slug:** `trigonometry` (a second course alongside `calculus`; same block schema, same seed-script pattern.)

**Purpose:** Build intuition for what the trig functions *are* (ratios that depend only on angle → coordinates on a circle → waves in time), and the ability to **derive** every value, identity, and formula from a tiny core — instead of memorizing tables.

**End state:** Given any angle, identity, or triangle, the student can reconstruct the answer from:

```text
similar triangles → unit circle (cos = x, sin = y) → rotation → unwrapped wave
```

They should never need a memorized unit-circle chart or an identity sheet, and they should be able to say *why* radians are the right unit before calculus asks for them.

**Two threads run through every chapter**
1. **Intuition + visualization** — every new object appears first as a picture that moves (draggable angle, unwrapping circle, sliding triangle) before it appears as a formula.
2. **Derivation drill** — each chapter ends with a "reconstruct it" section where the student rebuilds results from the core facts, with the reference values hidden.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | Angles and Ratios: Why Trigonometry Exists | Ratios of a right triangle's sides depend only on the angle |
| 1 | The Unit Circle | Put the triangle on a circle; the ratios become coordinates |
| 2 | Trig Functions as Functions | Unwrap the circle into a wave; graph, transform, invert |
| 3 | Identities: The Derivation Toolkit | Everything follows from Pythagoras + angle sum |
| 4 | Solving Trigonometric Equations | Go backwards: from a value to all angles that produce it |
| 5 | Any Triangle, and the Bridge to Calculus | Sine/cosine laws; sin x / x → 1 as the cliffhanger |

---

## Chapter 0 — Angles and Ratios: Why Trigonometry Exists

**Purpose:** motivate trig as a measuring tool; establish that sin/cos/tan are *ratios fixed by the angle*.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | The Unreachable Measurement | Some lengths can't be measured directly — angles can | Hook: height of a tree from its shadow. Interactive: drag the sun angle, watch shadow/height. Ends with "the ratio never changed" |
| 0.2 | Similar Triangles: The One Fact | Scale a right triangle, and side *ratios* stay fixed | Interactive: scale slider on nested triangles with a live ratio readout. Misconception killed: "sin depends on triangle size" |
| 0.3 | Naming the Ratios | sin, cos, tan = opposite/hypotenuse, adjacent/hypotenuse, opposite/adjacent | Definition callout, SOH-CAH-TOA as a *label*, not a source of truth. Interactive: drag angle, all three ratios update |
| 0.4 | Solving Right Triangles | Two knowns → every remaining side and angle | Worked patterns (find side, find angle), inverse trig introduced only as "which angle gave this ratio". Varied practice: ladder, ramp, elevation/depression |
| 0.5 | Special Angles, Derived | 30°/45°/60° values come from two drawable triangles | Derivation: bisect an equilateral triangle; halve a square. Explicit "don't memorize the table, redraw the triangle" |
| 0.6 | Measuring Angles: Degrees and Radians | An angle is arc length per radius — unit-free | Interactive: unroll the arc onto the radius. Conversion practice. Foreshadow: "radians are why calculus formulas stay clean" |
| — | Chapter 0 Mastery | Can the student produce any right-triangle answer from a drawing? | Mixed diagnostic incl. one non-standard triangle orientation |

## Chapter 1 — The Unit Circle

**Purpose:** extend the ratios past 90°, where triangles run out.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | Lifting the Triangle onto a Circle | On radius 1, cos θ = x and sin θ = y | Interactive: unit-circle explorer — drag the angle, see the triangle, the coordinates, and the ratios agree with Ch 0 |
| 1.2 | Angles Beyond the Triangle | Rotation keeps going: >90°, negative, >360° | Coterminal angles, direction of rotation. Misconception killed: "sin only makes sense for acute angles" |
| 1.3 | Signs and Reference Angles | Any angle reduces to a first-quadrant angle plus a sign | The derivation move that replaces the memorized chart. Heavy practice: give θ, produce the value |
| 1.4 | Pythagoras in Disguise | sin²θ + cos²θ = 1 is x² + y² = 1 | Derived on the interactive; used immediately to find sin from cos |
| 1.5 | The Other Four | tan, sec, csc, cot as slopes and lengths on the circle | tan θ = y/x = slope of the radius. Where each is undefined, and why |
| 1.6 | Rebuild the Whole Circle | Reconstruct every standard value from three facts | Timed derivation drill with the reference table hidden; quadrant + special-triangle recall |
| — | Chapter 1 Mastery | Any angle, any function, any sign — from scratch | |

## Chapter 2 — Trig Functions as Functions

**Purpose:** move from static geometry to functions of a real variable — the form calculus consumes.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | Unwrapping the Circle | Plot the height as the angle advances → the sine wave | Interactive: circle on the left, tracing wave on the right, one shared angle slider |
| 2.2 | Reading the Wave | Period, amplitude, domain, range, even/odd — all read off the circle | cos is sin shifted; symmetry facts derived, not stated |
| 2.3 | Transforming Sinusoids | a·sin(b(x − c)) + d — each parameter has one job | Interactive: four sliders, live graph. Common trap: b changes period as 2π/b, and c shifts by c not bc |
| 2.4 | Tangent and the Asymptotes | tan blows up where cos = 0 | Interactive: tan graph with asymptotes; period π (not 2π) and why |
| 2.5 | Modelling with Waves | Fit a sinusoid to real cyclic data | Ferris wheel height, daylight hours, tides. Given a description → produce the formula |
| 2.6 | Inverse Trig Functions | Inverting needs a restricted domain | Why arcsin's range is [−π/2, π/2]; the classic sin(arcsin x) vs arcsin(sin x) trap |
| — | Chapter 2 Mastery | Graph ↔ formula ↔ situation, in any direction | |

## Chapter 3 — Identities: The Derivation Toolkit

**Purpose:** the "derive anything" chapter. Small core, everything else generated.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | What an Identity Is | True for all valid inputs, unlike an equation | Identity vs equation contrast; the rules of a proof (work one side); verification on the graph |
| 3.2 | The Pythagorean Family | One identity, divided twice, gives all three | Derive 1 + tan² = sec² and 1 + cot² = csc² live |
| 3.3 | Angle Sum and Difference | The one identity worth deriving carefully | Geometric/rotation derivation with a diagram; difference and negative-angle cases follow |
| 3.4 | Double and Half Angle | Special cases of the sum formula | All three forms of cos 2θ derived from sin² + cos² = 1; half-angle by substitution |
| 3.5 | Rewriting Products and Sums | Add/subtract sum formulas to swap products for sums | Kept brief; framed as a consequence, with a beat-frequency application |
| 3.6 | The Derivation Game | Reconstruct any identity from the core set | Drill: given a target, name the path. Explicit "core set" callout: Pythagoras + angle sum + circle symmetry |
| — | Chapter 3 Mastery | Prove unseen identities under time | |

## Chapter 4 — Solving Trigonometric Equations

**Purpose:** go backwards — from an output value to every angle producing it.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | Infinitely Many Answers | Solutions repeat: reference angle + period | Interactive: horizontal line across the wave, all intersections marked. Interval vs general solution (+2πn) |
| 4.2 | Reduce to One Function | Use identities to get a single trig function, then solve | Factoring, quadratic-in-sin patterns, substitution |
| 4.3 | Multiple and Fractional Angles | Solving for 2x or x/2 changes the solution count | The classic error: solving for x before expanding the interval |
| 4.4 | Inverses and Lost Solutions | Calculators return one angle; the equation has many | Extraneous solutions from squaring; domain checks |
| — | Chapter 4 Mastery | Mixed equation set with interval constraints | |

## Chapter 5 — Any Triangle, and the Bridge to Calculus

**Purpose:** finish the geometry story, then hand off to the calculus course.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | Law of Sines | Drop one altitude and the ratio falls out | Full derivation, then applications (surveying, navigation) |
| 5.2 | The Ambiguous Case | Two sides and a non-included angle may fit two triangles | Interactive: swing the third side, watch zero/one/two solutions |
| 5.3 | Law of Cosines | Pythagoras plus a correction term | Derivation; check that it collapses to Pythagoras at 90° |
| 5.4 | Areas and Applications | ½ab·sin C, and Heron as a consequence | Mixed real-world problem set |
| 5.5 | The Small-Angle Surprise | For small θ in radians, sin θ ≈ θ | Interactive: zoom into sin near 0 against y = x; table of sin θ / θ |
| 5.6 | Bridge to Calculus | sin θ / θ → 1 is a limit, and it's why radians win | Cliffhanger into the calculus course's limits/derivatives chapters; degrees would drag a constant through every formula |
| — | Chapter 5 Mastery | Full-course diagnostic | |

---

## Engineering work this course needs

The existing interactive components are calculus-specific. New ones (each needs a schema in `src/modules/content/schemas/blocks.ts` and a renderer case):

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `right-triangle-explorer` | 0.1–0.5 | Draggable angle/side, live ratio readouts, similar-triangle scaling |
| `unit-circle` | 1.1–1.6, 4.1 | Draggable angle; coordinates, quadrant sign, reference angle, optional value labels |
| `circle-to-wave` | 2.1, 2.4 | Circle and unwrapping graph sharing one angle parameter |
| `sinusoid-playground` | 2.3, 2.5 | a/b/c/d sliders over a·sin(b(x−c))+d against the base curve |
| `identity-diagram` | 3.3 | Static-but-labelled angle-sum construction |
| `equation-solution-viewer` | 4.1, 4.3 | Horizontal line across a trig graph, all solutions in an interval marked |
| `triangle-solver` | 5.1–5.4 | General triangle with adjustable sides/angles; ambiguous-case mode |

Also needed: `scripts/seed-trigonometry.ts` (mirrors `seed-chapter-1.ts`) and a `trigonometry` course row, plus radian-aware axis labelling (π/2 ticks) in the plotting utilities.
