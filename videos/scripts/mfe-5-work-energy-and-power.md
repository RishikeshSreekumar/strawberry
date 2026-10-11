# Work, Energy and Power — Explainer Script

- **Course:** Mechanics I: Motion, Forces and Energy
- **Chapter:** Chapter 5 · Work, Energy and Power (id: `mfe-5-work-energy-and-power`)
- **Target runtime:** about 4.5 minutes (roughly 800 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mfe-5-work-energy-and-power.py`, class `MfeCh5Video`

**Learning goal.** The learner defines work as the part of the force along the displacement times the distance, $W = \vec F\cdot\vec s = Fs\cos\theta$, reads its sign from the angle, and adds the work of every force to get the work of the net force. For a varying force they take the signed area under $F$-$x$, so a spring does $\tfrac12kx^2$ (not $kx\cdot x$) and the second stretch costs more. They derive the work-energy theorem from $F = mv\frac{dv}{dx}$ and use it where times are not needed (stopping distances, the bullet in wood). They separate conservative from non-conservative forces, store conservative work as $U$ ($\Delta U = -W$), use $K + U = $ const for the loop-the-loop ($h \ge \tfrac52R$), read $U(x)$ graphs (allowed region, turning points, force $= -dU/dx$, stable minima and unstable maxima), and use $P = \vec F\cdot\vec v$ with $F = P/v$ for top speeds.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Each lesson scene has a small muted bold header in the top-left. Colour roles: force = PRIMARY (red), displacement and kinetic energy = SECONDARY (teal), component along the path and work areas = ACCENT (amber), potential energy = PURPLE, friction = GREEN. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** derivatives and integrals are spoken in words ("v d v by d x", "the integral of F d x"); the course names are read "Mechanics One" and "Mechanics Two". Where the variable $a$ is spoken ("a t squared", "m a", "a c"), the scene spells it `[[char LTRL]]a[[char NORM]]` (via `say_fix` and the `SAY_A` phrase list) so `say` does not read it as the article.

---

## Title card

**Narration:** Chapter five. Work, energy and power.

**Visuals:** `title_card("Motion, Forces and Energy", "Chapter 5 · Work, Energy and Power")`.

---

## Scene 1 — Work done by a constant force (Lesson 5.1)

**Narration:**

- **Beat a:** Carry a heavy bag along a level corridor at a steady pace. You arrive tired, yet you did no work on the bag. In physics, work is not effort.
- **Beat b:** Work is the part of the force along the displacement, times the distance: F dot s, or F s cos theta. The sign carries meaning. Below ninety degrees the force helps, and the work is positive. At ninety it is zero. Beyond ninety, the force takes energy away, and the work is negative.
- **Beat c:** Pull a two kilogram block five metres up a rough slope with a rope. The tension does a hundred and twenty five joules, gravity minus sixty, the normal force zero, and friction minus twenty. The total, forty five joules, is just the net force times the distance.

**Visuals:**

- **Beat a:** A bag held by a red upward force $F$ moves right along a floor while a teal displacement arrow $\vec s$ grows beneath it. $W_{\text{you on bag}} = 0$, "work is not effort".
- **Beat b:** Boxed $W = \vec F\cdot\vec s = Fs\cos\theta$. A teal $\vec s$ along the ground and a red $\vec F$ driven by an angle tracker; a dashed drop line and a thick amber shadow of $\vec F$ on $\vec s$. Live readouts of θ and $\cos\theta$ (signed). The force swings from 35° to 90° (shadow vanishes) to 145° (shadow behind the tail, readout negative) as three sign notes appear.
- **Beat c:** A rough 37° wedge with a block: purple $T$ up the slope, red $mg$, teal $N$, green $f$ down the slope; givens on top. Rows: $W_T = 125$ J, $W_g = -60$ J, $W_N = 0$, $W_f = -20$ J, $W_{\text{total}} = 45$ J $= (9\text{ N})(5\text{ m})$.

---

## Scene 2 — Work done by a variable force (Lesson 5.2)

**Narration:**

- **Beat a:** When the force changes along the path, chop the path into thin strips. Each strip does F delta x of work, a sliver of area under the force against position graph. Add them up and take the limit: work is the integral of F d x, the signed area under the curve.
- **Beat b:** A spring pushes with k x, a straight line through the origin, so its work is a triangle: one half k x squared. Not k x times x, because the force grows from zero. That is why the second stretch costs more. With k of five hundred, zero to two centimetres takes point one joules, but two to four takes point three.

**Visuals:**

- **Beat a:** $F$-$x$ axes with the red curve $F = 3x^2 + 2$. Amber Riemann rectangles on $[1, 2]$ get thinner ($\Delta x$ = 0.25, 0.1, 0.02) and become the shaded area. $W \approx \sum F\,\Delta x$, $W = \int_{x_1}^{x_2}F\,dx$ ("the signed area under F-x"), $\int_1^2(3x^2 + 2)\,dx = 9$ J.
- **Beat b:** A straight line $F = kx$ (x in cm). The amber triangle from 0 to 2 cm and $W_{\text{spring}} = \tfrac12kx^2$; a dashed red rectangle $kx\cdot x$ appears and is crossed out ("not $kx\cdot x$"). The purple trapezium from 2 to 4 cm: 0 → 2 cm: 0.1 J, 2 → 4 cm: 0.3 J, "k = 500 N/m: three times as much".

---

## Scene 3 — The work-energy theorem (Lesson 5.3)

**Narration:**

- **Beat a:** Now the payoff. Write Newton's second law with a equals v d v by d x. Multiply by d x, and integrate. The total work done by all the forces equals the change in one half m v squared, the kinetic energy. It needs only the start and the end, never the time, and it holds for any force.
- **Beat b:** A car brakes from twenty metres per second on a road with mu of point five. Only friction does work: minus mu m g d equals minus one half m v squared, so it skids forty metres. Double the speed, and it skids four times as far.
- **Beat c:** A bullet that loses half its speed in three centimetres of wood has lost three quarters of its kinetic energy. A constant force removes energy evenly with distance, so the last quarter lasts just one more centimetre.

**Visuals:**

- **Beat a:** $F = ma = mv\frac{dv}{dx}$; $\int_{x_1}^{x_2}F\,dx = \int_u^v mv\,dv = \tfrac12mv^2 - \tfrac12mu^2$; boxed $W_{\text{all}} = \Delta K$, $K = \tfrac12mv^2$; "start and end only: no time, any force".
- **Beat b:** "braking from 20 m/s, μk = 0.5". A car slides to a stop leaving a skid mark; a brace labelled $d$. $-\mu mg\,d = 0 - \tfrac12mv^2 \Rightarrow d = \frac{v^2}{2\mu g} = 40$ m; "double the speed: four times the distance".
- **Beat c:** A wooden block; a bullet penetrates 3 cm (amber track, "3 cm: $v \to \tfrac v2$"), then 1 cm more (teal track, "+1 cm"). Four energy cells, three amber and one teal: "$K$: $\tfrac34$ lost in 3 cm, $\tfrac14$ left"; "half the speed = a quarter of the energy".

---

## Scene 4 — Conservative forces and mechanical energy (Lesson 5.4)

**Narration:**

- **Beat a:** Lift a book to a shelf by any route, and gravity does the same work, minus m g h. Drag it across a rough floor by a longer route, and friction does more negative work. Gravity cares only about the endpoints. It is conservative.
- **Beat b:** For a conservative force, store its work as potential energy: delta U equals minus W. Gravity gives m g h, and a spring one half k x squared. If only conservative forces do work, K plus U stays constant.
- **Beat c:** Now the loop-the-loop takes two lines. At the top of the loop the ball needs v squared at least g R. Energy from the release point: m g h equals m g times two R, plus one half m v squared. So h must be at least five halves R.

**Visuals:**

- **Beat a:** Points A and B joined by a dashed straight path and a wiggly path (purple). "$W_g = -mgh$ on every path", "gravity: conservative"; "$W_f \propto$ path length", "friction: not conservative".
- **Beat b:** $\Delta U = -W_{\text{cons}}$; $U_g = mgh$, $U_s = \tfrac12kx^2$; $W_{\text{nc}} = \Delta(K + U)$; "only conservative forces: $K + U$ = constant".
- **Beat c:** A smooth ramp from height $h = \tfrac52R$ into a vertical loop of radius $R$. A red ball runs the whole track while two live bars, $U$ (purple) and $K$ (teal), trade off under a dashed total-energy line $E$. Right: top: $mg \le \frac{mv^2}{R}$; $mgh = mg(2R) + \tfrac12mv^2$; $h \ge \tfrac52R$ in green.

---

## Scene 5 — Potential energy curves and equilibrium (Lesson 5.5)

**Narration:**

- **Beat a:** Every one dimensional motion under a conservative force is a roller coaster, with the graph of U as the track. Draw a line at the total energy. The kinetic energy is the gap between the line and the curve, so the particle stays where U is below E, and turns round where they meet.
- **Beat b:** The force is minus the slope, so it always points downhill. Where the curve is flat, the force is zero. A valley is stable, a hilltop unstable: here, the wells at plus and minus root two are stable, and the hump at zero is not. And where U is zero, the force need not be: at x equals two, it is minus sixteen newtons.

**Visuals:**

- **Beat a:** The double well $U = x^4 - 4x^2$ and a dashed red line $E = -2$ J. A ball rolls back and forth in the right well with a teal bar marking the gap $K$; green allowed intervals and red turning-point dots appear on the $E$ line. $K = E - U \ge 0$, "allowed only where U ≤ E", "turning points: K = 0".
- **Beat b:** $F = -\frac{dU}{dx}$, "force points downhill"; red arrows on the curve point towards the valleys. "$\frac{dU}{dx} = 0$: minimum: stable, maximum: unstable"; the wells are labelled "stable", the hump "unstable". A dot at $x = 2$ with "$U(2) = 0$, yet $F = -16$ N" and "force is the slope, not the value".

---

## Scene 6 — Power (Lesson 5.6)

**Narration:**

- **Beat a:** Power is the rate of doing work. Over a small step, d W is F dot d s, so P equals F dot v. A car cruising at twenty metres per second against five hundred newtons of resistance delivers ten kilowatts.
- **Beat b:** At full throttle the power is fixed, so the driving force is P over v: big at low speed, small at high speed. The top speed is where P over v has fallen to the resistance. A thousand kilogram car with thirty kilowatts climbs a one in twenty slope. Gravity adds m g over twenty, five hundred newtons, to five hundred of resistance, so it tops out at thirty metres per second. More power does not mean more force.

**Visuals:**

- **Beat a:** $P = \frac{dW}{dt} = \vec F\cdot\frac{d\vec s}{dt} = \vec F\cdot\vec v$; $500\text{ N}\times20\text{ m/s} = 10$ kW ("cruising car: drive force = resistance"); $1\text{ kWh} = 3.6\times10^6$ J (energy, not power).
- **Beat b:** $F$ against $v$ axes with the red curve $F = P/v$ for $P = 2$ kW, "big push at low speed, small push at high speed". A green dashed resistance line at 100 N meets the curve at the "top speed" (20 m/s). Right: top speed $\frac{P}{v_{\max}} = F_{\text{resist}}$; "1000 kg, 30 kW, 1 in 20:", then $\tfrac{mg}{20} = 500$ N (slope) + 500 N (resistance), and $v_{\max} = \frac{30\,000}{500 + 500} = 30$ m/s; "more power does not mean more force".

---

## Scene 7 — Recap and course close (Lesson 5.7)

**Narration:**

- **Beat a:** To recap. Work is the force along the path times the distance, and for a varying force, the area under F against x. The total work equals the change in kinetic energy.
- **Beat b:** Conservative forces store their work as potential energy, so K plus U is conserved. The force is minus the slope of U. And power is F dot v.
- **Beat c:** That completes Mechanics One. You now hold both great tools: Newton's laws for how a body moves, and energy for how fast it ends up. Try the mastery quiz. Then Mechanics Two adds momentum conservation, and carries all three into rotation and gravitation.

**Visuals:** Title "Chapter 5 in six lines". Six numbered rows:

1. $W = \vec F\cdot\vec s = Fs\cos\theta$: only the part along the path
2. $W = \int F\,dx$: area under F-x; spring ½kx²
3. $W_{\text{all}} = \Delta K$: the integral of F = mv dv/dx
4. $\Delta U = -W_{\text{cons}}$, $E = K + U$: conservative forces store work
5. $F = -\frac{dU}{dx}$: downhill force; minima are stable
6. $P = \vec F\cdot\vec v$: top speed: P = F_resist × v

Last, "Next: Mechanics II · Momentum, Rotation and Gravitation" appears at the bottom.
