# Rotational Kinematics and Moment of Inertia — Explainer Script

- **Course:** Momentum, Rotation and Gravitation (Mechanics II)
- **Chapter:** Chapter 2 · Rotational Kinematics and Moment of Inertia (id: `mrg-2-rotational-kinematics-moment-of-inertia`)
- **Target runtime:** about 5.5 minutes (roughly 950 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mrg-2-rotational-kinematics-moment-of-inertia.py`, class `MrgCh2Video`

**Learning goal.** The learner describes a rigid rotation with one angle: $\omega = d\theta/dt$, $\alpha = d\omega/dt$, $v = r\omega$ (fan at 1200 rpm, 0.5 m ⇒ 62.8 m/s), $a_t = r\alpha$, $a_c = \omega^2r$. They reuse the linear kinematics equations with $\theta, \omega, \alpha$ and remember they give radians (600 rpm to rest in 10 s ⇒ $\alpha = -2\pi$, $100\pi$ rad = 50 revolutions). They derive $I = \sum mr^2$ from kinetic energy and see that it depends on the axis (1 kg and 3 kg on a 4 m rod: 48, 16, 12 kg m²). They know the standard results (rod $ML^2/12$ and $ML^2/3$, ring $MR^2$, disc $\tfrac12MR^2$, spheres $\tfrac23$ and $\tfrac25MR^2$; $k^2/R^2$ = 1, ⅔, ½, ⅖), the parallel axis theorem (cross term vanishes about the COM) and the perpendicular axis theorem (laminas only; disc about a tangent in its plane $\tfrac54MR^2$), and add or subtract pieces about one axis (disc with an off-centre hole: $\tfrac{13}{32}MR^2$; quarter disc of mass $M$: still $\tfrac12MR^2$).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: bodies and masses = PRIMARY (red), second mass and velocity arrows = SECONDARY (teal), axes of rotation = ACCENT (amber, drawn as a circled dot for an axis out of the screen), centripetal acceleration and removed pieces = PURPLE, highlights = gold, correct = GREEN. Rotations are driven by `ValueTracker` angles. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** symbols are spoken as words ("omega nought", "M L squared over twelve", "k squared over R squared"); "rpm" is always said as "revolutions per minute".

---

## Title card

**Narration:** Chapter two. Rotational kinematics and moment of inertia.

**Visuals:** `title_card("Momentum, Rotation & Gravitation", "Chapter 2 · Rotational Kinematics and Moment of Inertia")`.

---

## Scene 1 — One angle for the whole body (Lesson 2.1)

**Narration:**

- **Beat a:** Stand at the centre of a spinning merry go round and you barely move. Stand at the edge and the wind whips past. Yet every point turns through the same angle in the same time. One angle, theta, describes the whole body.
- **Beat b:** So the whole body has one angular velocity, omega, the rate of change of theta, and one angular acceleration, alpha. A point at distance r moves along an arc r theta, so its speed is r omega: zero on the axis, largest at the rim.
- **Beat c:** A fan turning at twelve hundred revolutions per minute has omega equal to forty pi radians per second. Its blade tip, half a metre out, moves at sixty two point eight metres per second.
- **Beat d:** A point on a turning body has two accelerations: r alpha, along its path, and omega squared r, towards the axis.

**Visuals:**

- **Beat a:** A platform (disc) with an axis marker at its centre and a red reference radius carrying three dots. It turns once, then a dashed start line and an angle arc $\theta$ show the turn.
- **Beat b:** $\omega = \frac{d\theta}{dt}$, $\alpha = \frac{d\omega}{dt}$; $s = r\theta$, $v = r\omega$ (teal). Teal velocity arrows on the three dots, longer further out, rotate with the disc.
- **Beat c:** $\omega = 1200\times\frac{2\pi}{60} = 40\pi$ rad/s; $v = r\omega = 0.5\times40\pi \approx 62.8$ m/s (green). The disc keeps turning.
- **Beat d:** At a rim point: an amber tangential arrow and a purple arrow towards the axis. $a_t = r\alpha$ (amber), $a_c = \omega^2r$ (purple), $a = r\sqrt{\alpha^2+\omega^4}$.

---

## Scene 2 — Equations of rotational kinematics (Lesson 2.2)

**Narration:**

- **Beat a:** With constant angular acceleration, the equations are the ones you already know from straight line motion, with every letter swapped: theta for distance, omega for velocity, alpha for acceleration.
- **Beat b:** A wheel at six hundred revolutions per minute coasts uniformly to rest in ten seconds. Omega nought is twenty pi radians per second, so alpha is minus two pi. The angle turned is the average speed, ten pi, times ten seconds: a hundred pi radians.
- **Beat c:** And here is the trap: the equations give radians, not turns. Divide by two pi. The wheel makes fifty revolutions.

**Visuals:**

- **Beat a:** Header "Constant α: the same equations, new letters". Two columns, "straight line" and "rotation": $v = u+at \to \omega = \omega_0+\alpha t$, $s = ut+\frac12at^2 \to \theta = \omega_0t+\frac12\alpha t^2$, $v^2 = u^2+2as \to \omega^2 = \omega_0^2+2\alpha\theta$ (each rotation formula transforms out of its linear twin). Footer $s\to\theta$, $v\to\omega$, $a\to\alpha$.
- **Beat b:** Clear. A spoked wheel spins and slows to a stop. Right: $\omega_0 = 600\times\frac{2\pi}{60} = 20\pi$ rad/s; $\alpha = \frac{0-20\pi}{10} = -2\pi$ rad/s²; $\theta = \frac{\omega_0+\omega}{2}t = 100\pi$ rad.
- **Beat c:** $n = \frac{100\pi}{2\pi} = 50$ revolutions (green).

---

## Scene 3 — Moment of inertia (Lesson 2.3)

**Narration:**

- **Beat a:** Twist a metre rule at its centre: easy. Tape heavy stones to its ends: much harder. Slide them in close: easy again. For rotation, where the mass sits matters as much as how much there is.
- **Beat b:** Add up the kinetic energy of every particle. Each moves at r omega, so K is one half, times the sum of m r squared, times omega squared. That sum is the moment of inertia, I. It plays the role of mass for rotation.
- **Beat c:** Put one kilogram and three kilograms on the ends of a light four metre rod. About the one kilogram mass, I is forty eight. About the midpoint, sixteen. About the centre of mass, twelve: the smallest of all. An I without its axis means nothing.

**Visuals:**

- **Beat a:** A rule twists back and forth about an axis marker at its centre. Two red stones appear at the ends ("hard"), then slide in close ("easy").
- **Beat b:** $K = \sum\frac12m_i(r_i\omega)^2 = \frac12\big(\sum m_ir_i^2\big)\omega^2$, then boxed $I = \sum m_ir_i^2$, $K = \frac12I\omega^2$ (red).
- **Beat c:** Clear. A light rod with a teal 1 kg ball and a red 3 kg ball; an amber axis marker slides along it. Below, a graph of $I(x) = x^2 + 3(4-x)^2$ with a tracking dot and a live readout "$I =$ 48 → 16 → 12 kg m²". At $x = 3$ m a COM marker appears and the minimum flashes; "every I needs its axis".

---

## Scene 4 — Standard bodies (Lesson 2.4)

**Narration:**

- **Beat a:** For a continuous body, the sum becomes an integral of r squared d m. Slice it so every piece sits at a known distance from the axis. A rod about its centre gives M L squared over twelve. About its end, M L squared over three: four times bigger.
- **Beat b:** A ring has all its mass at the rim: M R squared. A disc is a set of thin rings, and it gives one half M R squared. Stack discs into a solid sphere for two fifths M R squared. A hollow sphere gives two thirds.
- **Beat c:** Write each one as M k squared. The ratio k squared over R squared, one, two thirds, one half, two fifths, measures how much mass sits near the rim. In chapter four these numbers decide who wins every rolling race.

**Visuals:**

- **Beat a:** $I = \int r^2\,dm$. A red rod with a dashed amber axis through its centre and a slice $dm = \frac ML dx$. $I_{\text{centre}} = \frac{ML^2}{12}$; then an axis at the end and $I_{\text{end}} = \frac{ML^2}{3}$.
- **Beat b:** Four bodies in a row with labels: ring $MR^2$; disc (nested rings draw in) $\frac12MR^2$; solid sphere $\frac25MR^2$; hollow sphere (outline with an equator ellipse) $\frac23MR^2$.
- **Beat c:** Clear. $I = Mk^2$ and $\frac{k^2}{R^2}$; a bar chart 1, ⅔, ½, ⅖ for ring, hollow sphere, disc, solid sphere; "more mass near the rim → bigger".

---

## Scene 5 — Parallel and perpendicular axis theorems (Lesson 2.5)

**Narration:**

- **Beat a:** Two theorems move you to new axes. Parallel axis: the moment of inertia about any axis is I about a parallel axis through the centre of mass, plus M d squared. The cross term vanishes, because measured from the centre of mass, the mass weighted positions add to zero.
- **Beat b:** So a rod about its end is M L squared over twelve, plus M times L over two, squared: M L squared over three, as before. And the axis through the centre of mass always gives the smallest I.
- **Beat c:** Perpendicular axis, for flat bodies only: I z equals I x plus I y. For a disc every diameter is alike, so each has a quarter M R squared. Shift that to a tangent in the disc's plane, and you get five quarters M R squared.
- **Beat d:** It fails for a sphere, which has thickness. That theorem is for flat bodies only.

**Visuals:**

- **Beat a:** A lamina with a COM marker ("through COM") and a parallel axis marker a distance $d$ away. $I = \sum m|\vec r-\vec d|^2 = I_{cm} - 2\vec d\cdot\underbrace{\sum m\vec r}_{=\vec 0} + Md^2$, then $I = I_{cm} + Md^2$ (red).
- **Beat b:** The theorem moves to the top. A rod with dashed axes at its centre (amber) and end; brace $\frac L2$. $I_{\text{end}} = \frac{ML^2}{12} + M\left(\frac L2\right)^2 = \frac{ML^2}{3}$; "the COM axis gives the smallest I".
- **Beat c:** Clear. A disc with in-plane $x$ and $y$ axes and a $z$ axis marker out of the screen. $I_z = I_x + I_y$ ("laminas only"); $2I_d = \frac12MR^2 \Rightarrow I_d = \frac14MR^2$; a dashed tangent line and $I_{\text{tangent}} = \frac14MR^2 + MR^2 = \frac54MR^2$ (green).
- **Beat d:** A teal sphere with a red cross: "not for a sphere".

---

## Scene 6 — Composite, cut and hollowed bodies (Lesson 2.6)

**Narration:**

- **Beat a:** About one fixed axis, moments of inertia simply add, and a removed piece subtracts. Cut a hole of radius R over two, touching the rim, out of a disc of mass M.
- **Beat b:** The full disc has one half M R squared. The missing piece has a quarter of the mass. About its own centre it has M R squared over thirty two; the parallel axis theorem moves it to the centre, giving three over thirty two. What remains: thirteen over thirty two, times M R squared.
- **Beat c:** And a quarter disc of mass M, about the old centre, still has one half M R squared. Its mass is spread from zero to R, exactly like a whole disc's.

**Visuals:**

- **Beat a:** Header "About one axis: pieces add, holes subtract". A red disc with an axis marker at $O$; a hole of radius $R/2$ touching the rim is punched out.
- **Beat b:** $I_{\text{full}} = \frac12MR^2 = \frac{16}{32}MR^2$; a dashed $\frac R2$ from $O$ to the hole's centre and $I_{\text{hole}} = \frac12\cdot\frac M4\left(\frac R2\right)^2 + \frac M4\left(\frac R2\right)^2 = \frac3{32}MR^2$; $I_{\text{rem}} = \frac{13}{32}MR^2$ (green).
- **Beat c:** Clear. A disc made of four quarter sectors about an axis marker; three fade, leaving one. $I = \frac12MR^2$ (red), "mass M, same spread of distances", and "not $\frac14\cdot\frac12MR^2$" in red.

---

## Scene 7 — Recap and next (Lesson 2.7)

**Narration:**

- **Beat a:** To recap. A rigid body turns through one angle. Every point shares omega, and its speed is r omega. The rotational equations match the linear ones, in radians.
- **Beat b:** The moment of inertia, the sum of m r squared, depends on the axis. Integrate for the standard bodies, then use the parallel and perpendicular axis theorems, and add or subtract pieces about one axis.
- **Beat c:** Try the mastery quiz. Then chapter three asks what makes a body spin in the first place: torque.

**Visuals:** Title "Chapter 2 in six lines". Six numbered rows, formula left and muted note right:

1. $v = r\omega$, $a_t = r\alpha$, $a_c = \omega^2r$: one ω for the whole body
2. $\omega^2 = \omega_0^2 + 2\alpha\theta$: linear equations, in radians
3. $I = \sum mr^2$: depends on the axis
4. $MR^2$, $\frac12MR^2$, $\frac25MR^2$: ring, disc, solid sphere
5. $I = I_{cm} + Md^2$: one axis must pass through the COM
6. $I_z = I_x + I_y$: flat bodies only

Last, "Next: Chapter 3 · Torque and Rotational Dynamics" appears at the bottom.
