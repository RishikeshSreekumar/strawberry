# Motion in a Straight Line — Explainer Script

- **Course:** Mechanics I: Motion, Forces and Energy
- **Chapter:** Chapter 1 · Motion in a Straight Line (id: `mfe-1-motion-in-a-straight-line`)
- **Target runtime:** about 6.5 minutes (roughly 950 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mfe-1-motion-in-a-straight-line.py`, class `MfeCh1Video`

**Learning goal.** The learner sees one-dimensional kinematics as three linked graphs. They separate displacement (signed change in position) from distance (path length), and average velocity from average speed, including the harmonic-mean trap. Velocity is the slope of the tangent to $x$-$t$, found as the limit of chord slopes. Acceleration is the slope of $v$-$t$, and the area under $v$-$t$ is the displacement, signed. They use the speeding-up rule ($v$ and $a$ with the same sign) and know $v = 0$ does not mean $a = 0$. They derive the constant-acceleration equations from one trapezium, apply them to braking (stopping distance ∝ $u^2$, reaction time) and the bullet classic, treat free fall with one sign convention ($a = -g$ all the way), and switch to calculus ($v = dx/dt$, $a = v\,dv/dx$) when $a$ is not constant.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: position and $x$-$t$ = PRIMARY (red), velocity and $v$-$t$ = SECONDARY (teal), acceleration and distance = ACCENT (amber), displacement = PURPLE, negative area = pink, positive area and correct = GREEN, wrong = red cross. Each scene carries a muted lesson header in the top-left corner (e.g. "1.3 · Acceleration and velocity-time graphs"). Graphs are Manim `Axes` with live `ValueTracker` + `always_redraw` markers. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** graph names are read as "x t graph" and "v t graph"; derivatives as "d x by d t"; "u e to the minus k t". Numbers are spelled the way they should be said. Where the variable $a$ is spoken ("a t squared", "m a", "a c"), the scene spells it `[[char LTRL]]a[[char NORM]]` (via `say_fix` and the `SAY_A` phrase list) so `say` does not read it as the article.

---

## Title card

**Narration:** Chapter one. Motion in a straight line.

**Visuals:** `title_card("Motion, Forces and Energy", "Chapter 1 · Motion in a Straight Line")`.

---

## Scene 1 — Distance and displacement (Lesson 1.1)

**Narration:**

- **Beat a:** You drive five kilometres east, then three kilometres back west. The odometer says eight kilometres. Yet you are only two kilometres from home. Both are right. Eight is the distance. Two kilometres east is the displacement.
- **Beat b:** Displacement is the change in position, and it carries a sign. Distance is the total length of path, never negative. Divide each by the time, and you get two different averages: average velocity, and average speed.
- **Beat c:** And average speed is not the average of the speeds. Ride out at forty kilometres per hour, and back at sixty. The slow leg lasts longer, so the average speed is forty eight, the harmonic mean, not fifty. The average velocity is zero: you ended where you began.

**Visuals:**

- **Beat a:** A number line from −1 to 6 km ("home" at 0, "east is positive →"). A red car drives 0 → 5 → 2 while amber trace lines record the outward and return legs above the line; a live "odometer (distance) = … km" readout counts to 8. A purple displacement arrow from 0 to 2 appears below, labelled "displacement = +2 km".
- **Beat b:** Clear. Three lines: $\Delta x = x_{\text{final}} - x_{\text{initial}}$ (purple, "signed: it has a direction"); distance $=$ total path length $\ge |\Delta x|$ (amber, "never negative, never decreases"); average velocity $\frac{\Delta x}{\Delta t}$ and average speed $\frac{\text{distance}}{\Delta t}$.
- **Beat c:** Clear. A road A–B with a teal arrow "40 km/h" out and a red arrow "60 km/h" back. Green $\bar v = \frac{2v_1v_2}{v_1+v_2} = \frac{2(40)(60)}{100} = 48$ km/h; red $\frac{40+60}{2} = 50$ with a cross; purple "average velocity = 0".

---

## Scene 2 — Velocity as a slope (Lesson 1.2)

**Narration:**

- **Beat a:** A speedometer shows how fast you are going right now. On an x t graph, the average velocity between two times is the slope of the chord joining them. Slide the second point towards the first, and the chord swings round onto the tangent.
- **Beat b:** For x equals five t squared, the chord slopes fall from fifteen, to twelve point five, to ten point five, and close in on ten metres per second. The limit is the instantaneous velocity, d x by d t: the slope of the tangent. Here v equals ten t.
- **Beat c:** Read the graph like this. Steeper means faster. A horizontal tangent means the particle is momentarily at rest, turning round. And the curve is a record of where and when, not a picture of the path. The particle itself only ever moves along a straight line.

**Visuals:**

- **Beat a:** Axes $t$ (0–3.5 s) and $x$ (0–50 m) with the red curve $x = 5t^2$. A fixed point at $t_1 = 1$ and a teal point at $t_2$ joined by an extended teal chord; live readout "chord slope = … m/s". $t_2$ slides 2 → 1.5 → 1.1 → 1.01.
- **Beat b:** On the right, the chord-slope table: $t_2 = 2$: 15, $1.5$: 12.5, $1.1$: 10.5, $1.01$: 10.05. Then $v = \lim_{\Delta t\to0}\frac{\Delta x}{\Delta t} = \frac{dx}{dt}$ and, in green, $v = 10t \Rightarrow v(1) = 10$ m/s.
- **Beat c:** Clear. Axes for $x = 10t - 5t^2$ (0–2 s) with a moving point and a live teal tangent; below, a straight 0–6 m track ("the actual track: a straight line") with a red particle that goes out to 5 m and back in step with the graph. Notes appear on the right: "steeper = faster", "flat tangent = at rest" (flash at the peak), "graph = where, when", "not the path".

---

## Scene 3 — Slopes and areas of v-t (Lesson 1.3)

**Narration:**

- **Beat a:** Go one level down. Acceleration is the slope of the v t graph. And the area under v t gives back the displacement, because each thin strip is v times d t.
- **Beat b:** Start at minus six metres per second, with acceleration plus two. For three seconds the area is below the axis: minus nine metres. Then a positive triangle eats it back. At six seconds the particle is back where it started: displacement zero, distance eighteen metres.
- **Beat c:** Notice that a was positive the whole time, yet the particle first slowed down. The rule: it speeds up when v and a have the same sign, and slows down when they differ. And at three seconds, v is zero but a is still two. Zero velocity never means zero acceleration.

**Visuals:**

- **Beat a:** Axes $t$ (0–8 s), $v$ (−6 to 10 m/s) with the teal line $v = -6 + 2t$. An amber slope triangle ("a = slope = 2"). Green thin strips under the line from 4 to 7 s, labelled $dx = v\,dt$. Right: "$a$ = slope of $v$-$t$", "$\Delta x$ = area under $v$-$t$".
- **Beat b:** Strips clear. A tracker sweeps $t$ from 0 to 6: the area below the axis fills pink (label −9), then the area above fills green (label +9). Live readouts: displacement (purple) and distance (amber), ending at 0 m and 18 m.
- **Beat c:** Readouts clear. The rule card: "speeds up: v and a same sign" (green), "slows down: opposite signs" (red). An amber dot at $(3, 0)$ with an amber tangent of slope 2; "$t = 3$: $v = 0$, $a = 2$" and "zero velocity never means zero acceleration".

---

## Scene 4 — The equations of constant acceleration (Lesson 1.4)

**Narration:**

- **Beat a:** When a is constant, the v t graph is a straight line from u to v. Its slope gives v equals u plus a t. The area under it, a trapezium, is the displacement: s equals u plus v over two, times t.
- **Beat b:** Split the trapezium into a rectangle, u t, and a triangle, one half a t squared: s equals u t plus one half a t squared. Eliminate t, and v squared equals u squared plus two a s. All of these need a constant acceleration.
- **Beat c:** A car at twenty metres per second brakes at five metres per second squared. Zero equals four hundred minus ten s, so it stops in forty metres. At forty metres per second it needs one hundred and sixty. Double the speed, four times the distance. Add half a second of reaction time, and it rolls ten metres before the brakes even bite.
- **Beat d:** A JEE classic. A bullet loses half its speed in three centimetres of wood. Use v squared equals u squared plus two a s twice, and the ratio does all the work: it goes only one centimetre further.

**Visuals:**

- **Beat a:** Unnumbered $t$-$v$ axes; a teal line from $u$ to $v$ over time $t$, dashed drop at $t$. $a = \frac{v-u}{t} \Rightarrow v = u + at$. The purple trapezium fills, with $s = \text{area} = \frac{u+v}{2}t$.
- **Beat b:** The trapezium splits into a teal rectangle ($ut$) and an amber triangle ($\tfrac12 t(at)$, with a brace "at" on the rise). $s = ut + \tfrac12at^2$, then $v^2 = u^2 + 2as$. All four equations are boxed, with "constant a only" beneath.
- **Beat c:** Clear. $0 = u^2 - 2(5)s \Rightarrow s = \frac{u^2}{10}$. Bars to scale: teal 40 m (20 m/s), red 160 m (40 m/s), "double the speed, four times the distance". Then a grey 10 m reaction bar followed by a teal 40 m braking bar: "10 + 40 = 50 m (0.5 s reaction at 20 m/s)".
- **Beat d:** Clear. A wooden block; a bullet enters and stops at an amber dashed line "3 cm: $u \to \frac u2$", with $(\frac u2)^2 = u^2 - 2a(3) \Rightarrow 2a = \frac{u^2}{4}$ per cm. It moves on to a green dashed line "+1 cm", and $0 = \frac{u^2}{4} - 2ax \Rightarrow x = 1$ cm in green.

---

## Scene 5 — Free fall (Lesson 1.5)

**Narration:**

- **Beat a:** Near the Earth every body falls with the same acceleration, g, straight down, whether it is rising, falling, or at rest for an instant. Take up as positive, and a is minus ten, for the whole flight.
- **Beat b:** Throw a ball up at twenty metres per second. It rises for two seconds, to twenty metres, and is back at four seconds, moving down at twenty. At the top v is zero, but a is still minus ten. If a were zero there, the ball would hang in the air.
- **Beat c:** From the top of a twenty five metre tower, the ground is at minus twenty five. So minus twenty five equals twenty t minus five t squared. One equation covers the whole flight. The roots are five and minus one. Reject minus one second: the ball had not been thrown yet.
- **Beat d:** And Galileo's pattern. Dropped from rest, a body falls five, fifteen, twenty five, thirty five metres in successive seconds: the odd numbers, one, three, five, seven.

**Visuals:**

- **Beat a:** A vertical height scale (0–20 m) with ground; a red ball carrying an amber $g$ arrow pointing down. Empty $v$-$t$ axes on the right ($t$ 0–4 s, $v$ −20 to 20). "up = +, a = −10 m/s² always".
- **Beat b:** The ball rises and falls in real proportion ($y = 20t - 5t^2$) with a teal velocity arrow that shrinks, vanishes at the top and regrows downward, while the $v$-$t$ line draws itself from +20 to −20; live $t$ and $v$ readouts. At the top: "top: v = 0, a = −10". Then $t_\uparrow = \frac ug = 2$ s, $H = \frac{u^2}{2g} = 20$ m, $T = \frac{2u}{g} = 4$ s.
- **Beat c:** Clear. A 25 m tower, dashed up-and-down path ("u = 20"). $-25 = 20t - 5t^2$, $t^2 - 4t - 5 = 0$, $(t-5)(t+1) = 0$; green $t = 5$ s; red $t = -1$ s with a cross, "before it was thrown".
- **Beat d:** Clear. Five balls at the positions after 0, 1, 2, 3, 4 s of fall (to scale), with amber braces 5, 15, 25, 35 m. "1 : 3 : 5 : 7" and $s_n = \frac g2(2n-1)$.

---

## Scene 6 — Calculus of kinematics (Lesson 1.6)

**Narration:**

- **Beat a:** When a is not constant, those equations fail. But the definitions never change. Differentiate to go down the chain. Integrate to come back up. Take x equals t cubed, minus six t squared, plus nine t.
- **Beat b:** Differentiate: v equals three, t minus one, t minus three. It is zero at one second and at three seconds, the turning points. The particle goes out to four metres, back to zero, and out to four again. Displacement four metres. Distance twelve.
- **Beat c:** If a depends on position, use the chain rule: a equals v d v by d x. It is the same acceleration, rewritten. For a boat with drag a equals minus k v, the speed decays as u e to the minus k t, and the boat coasts only u over k.

**Visuals:**

- **Beat a:** Boxes $x$ → $v$ → $a$ with $\frac{d}{dt}$ arrows forward and muted $\int dt$ arrows back. Then $x(t) = t^3 - 6t^2 + 9t$ in red.
- **Beat b:** Clear. One set of axes ($t$ 0–4.5 s) with red $x(t)$ and teal $v(t)$; dashed guides at $t = 1$ and $t = 3$ where $v$ crosses zero (teal dots) under the peak and trough of $x$. Right: $v = 3(t-1)(t-3)$; "v = 0 at t = 1, 3 s: turning points"; $x: 0 \to 4 \to 0 \to 4$ m; "displacement 4 m, distance 12 m".
- **Beat c:** Clear. $a = \frac{dv}{dt} = \frac{dv}{dx}\frac{dx}{dt} = v\frac{dv}{dx}$ ("the same acceleration, by the chain rule"); $a = -kv \Rightarrow v = ue^{-kt}$, $x \to \frac uk$; a small decaying curve "speed decays; the boat coasts a finite distance".

---

## Scene 7 — Recap and next (Lesson 1.7)

**Narration:**

- **Beat a:** To recap. Displacement is a signed change in position; distance is path length. Velocity is the slope of x t, and acceleration is the slope of v t.
- **Beat b:** Areas undo slopes. The four equations hold only for constant acceleration. And in free fall, a is minus g the whole way, even at the top.
- **Beat c:** Try the mastery quiz. Then chapter two frees the particle into a plane: split the motion into x and y, solve two straight lines, and let time tie them together.

**Visuals:** Title "Chapter 1 in five lines". Five numbered rows, a formula on the left and a muted note on the right:

1. $\text{distance} \ge |\Delta x|$: average speed = distance / time
2. $v = \frac{dx}{dt}$, $a = \frac{dv}{dt}$: slopes go down the chain
3. $\Delta x$ = area under $v$-$t$: areas come back up
4. $v^2 = u^2 + 2as$: constant a only
5. $a = -g$ (up positive): free fall, rising or falling

Last, "Next: Chapter 2 · Motion in a Plane" appears at the bottom.
