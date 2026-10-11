# Atoms and Nuclei — Explainer Script

- **Course:** Optics and Modern Physics
- **Chapter:** Chapter 4 · Atoms and Nuclei (id: `omp-4-atoms-and-nuclei`)
- **Target runtime:** about 6 minutes (roughly 1,050 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/omp-4-atoms-and-nuclei.py`, class `OmpCh4Video`

**Learning goal.** The learner sees why rare back-scattering forces a tiny, heavy, positive nucleus, and gets the distance of closest approach from energy conservation. They see why a classical orbiting electron should spiral in, and how Bohr's quantised angular momentum (a standing de Broglie wave round the orbit) gives $r_n \propto n^2/Z$, $v_n \propto Z/n$ and $E_n = -13.6\,Z^2/n^2$ eV, with $K = -E$ and $U = 2E$. They read every spectral line as a jump between two levels ($\lambda = 1240/\Delta E$ nm), group lines into Lyman, Balmer and Paschen series, find a series limit, and count lines (six for a gas from $n = 4$, at most three for one atom). They know an X-ray tube's cut-off $\lambda_{\min} = 1240/V$ nm depends only on voltage, while the $K_\alpha$, $K_\beta$ peaks belong to the target. In the nucleus they use $R = R_0A^{1/3}$ (constant density), mass defect and $BE = \Delta m\times931.5$ MeV, and read the BE/A curve to see why both fission and fusion release energy. They use $N = N_0e^{-\lambda t}$ and $T_{1/2} = 0.693/\lambda$, count alphas and betas in a decay chain, and compare fission and fusion energy per nucleon.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: nucleus and protons = PRIMARY (red), neutrons = SECONDARY (teal), alpha particles and photons = ACCENT (amber), electrons = PURPLE, highlights = gold, results = GREEN, wrong = red cross. Series colours on the energy ladder: Lyman = PURPLE (UV), Balmer = PRIMARY (visible), Paschen = ACCENT (IR). Nuclei are hex-packed clusters of red and teal discs. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Units are spoken in full ("electron volts", "mega electron volts", "femtometres", "becquerel"). Isotopes are read as "uranium two thirty five", "lead two oh six". Symbols are spoken as words ("lambda", "h over two pi", "N nought, e to the minus lambda t", "root nu"). No lone "a" appears as a letter, so the LTRL trick is not needed.

---

## Title card

**Narration:** Chapter four. Atoms and nuclei.

**Visuals:** `title_card("Optics and Modern Physics", "Chapter 4 · Atoms and Nuclei")`.

---

## Scene 1 — Rutherford's nucleus (Lesson 4.1)

**Narration:**

- **Beat a:** Geiger and Marsden fired alpha particles at a thin gold foil. Almost all went straight through, but one in eight thousand bounced back.
- **Beat b:** Rutherford compared it to a shell bouncing off tissue paper. Spread out charge could only nudge an alpha, so the charge and nearly all the mass must sit in a tiny nucleus.
- **Beat c:** Most alphas pass far from any nucleus and barely bend. The rare one aimed almost straight at it is turned right round.
- **Beat d:** How close does a head on alpha get? All its kinetic energy becomes Coulomb potential energy. For five mega electron volt alphas on gold, that is about forty five femtometres, far outside the nucleus.
- **Beat e:** But an orbiting electron is accelerating, so classical physics says it should radiate and spiral in within ten to the minus eleven seconds. Real atoms are stable, and glow in sharp lines.

**Visuals:**

- **Beat a:** An "alpha source" box on the left and a vertical amber "gold foil" strip. Nine amber beams fan from the source through the foil, two slightly kinked. "almost all go straight through" at the top. A red path returns from the foil up and to the left, with "about 1 in 8000 bounces back".
- **Beat b:** Clear. Header "a tiny, heavy, positive nucleus" and a red nucleus dot marked "+".
- **Beat c:** Nine alpha trajectories, computed by integrating a repulsive inverse-square force, sweep past the nucleus at different impact parameters: wide ones barely bend, close ones swing through large angles, and the nearly head-on one (red) turns straight back. Caption: "far away: barely bent / head-on: turned right round".
- **Beat d:** Clear. A track with a nucleus ($Ze$) on the right. An amber alpha ($2e,\ K$) slides in from the left, decelerating, and stops; a brace marks $r_0$. Top: $K = \frac{1}{4\pi\varepsilon_0}\frac{2Ze^2}{r_0}$ and $r_0 = \frac{2\times79\times1.44\ \text{MeV fm}}{5\ \text{MeV}} \approx 45$ fm. Green note: "gold nucleus: radius about 7 fm".
- **Beat e:** Clear. A purple electron spirals into a red nucleus along a tightening spiral. Right column: "classical prediction:", "spirals in within $\sim10^{-11}$ s", then a red cross and "real atoms: stable, sharp lines".

---

## Scene 2 — The Bohr model (Lesson 4.2)

**Narration:**

- **Beat a:** Bohr's fix was to forbid most orbits. In the allowed ones the electron does not radiate, and angular momentum comes in whole units of h over two pi. Light leaves only when the electron jumps down.
- **Beat b:** Why those orbits? The electron is a wave of wavelength h over m v, and a whole number of wavelengths must fit round the orbit. That is exactly m v r equals n h over two pi.
- **Beat c:** Add Coulomb force equals centripetal force: the radius grows as n squared over Z, the speed as Z over n, and the energy is minus thirteen point six, Z squared over n squared, electron volts.
- **Beat d:** The energy is negative because the electron is bound: hydrogen needs thirteen point six electron volts to ionise. Kinetic energy is minus E, potential energy two E, so a higher orbit has less kinetic energy but more total energy.

**Visuals:**

- **Beat a:** Left: orbits $n = 1, 2, 3$ with radii in the ratio 1 : 4 : 9 around a red nucleus. Right: "Bohr, 1913" and the three postulates appear in turn: "1. Stationary orbits: no radiation", "2. $mvr = n\frac{h}{2\pi}$", "3. $h\nu = E_i - E_f$". The electron circles on $n = 2$, jumps to $n = 1$, and an amber photon squiggle $h\nu$ leaves.
- **Beat b:** Clear. A dashed circle with a purple wave of four wavelengths wrapped round it. Right: $\lambda = \frac{h}{mv}$, $2\pi r = n\lambda$, "n = 4: four wavelengths fit", then $\Rightarrow mvr = n\frac{h}{2\pi}$ in green.
- **Beat c:** Clear. Top: $\frac{mv^2}{r} = \frac{kZe^2}{r^2}$ + $mvr = \frac{nh}{2\pi}$. Then $r_n = 0.529\frac{n^2}{Z}$ Å, $v_n = 2.19\times10^6\frac{Z}{n}$ m/s, and boxed in red $E_n = -13.6\frac{Z^2}{n^2}$ eV.
- **Beat d:** Clear. $E_1 = -13.6$ eV $\Rightarrow$ 13.6 eV to ionise; "negative = bound; zero = free, at rest, far away"; $K = -E,\ U = 2E$ in red; "higher orbit: $K\downarrow$ $E\uparrow$"; "less kinetic energy, more total energy (like a satellite)".

---

## Scene 3 — Line spectra of hydrogen (Lesson 4.3)

**Narration:**

- **Beat a:** Each spectral line is one jump between two levels. From level three to two, the gap is one point eight nine electron volts. Twelve forty over that is six fifty six nanometres: the red line.
- **Beat b:** Group the jumps by where they land: down to level one is Lyman, ultraviolet; down to two, Balmer, visible; down to three, Paschen, infrared.
- **Beat c:** The Balmer lines crowd towards a limit: a jump from infinity, three point four electron volts, or three sixty five nanometres.
- **Beat d:** A gas excited to level four shows every pair of levels: six lines. One atom takes one route down, so at most three photons. And a cold gas absorbs only from level one: just the Lyman lines.

**Visuals:**

- **Beat a:** Left: hydrogen's energy ladder drawn to scale in energy ($n = 1$ at $-13.6$ up to $\infty$ at 0; levels 5, 6, 8 faint), with $n$ labels and energies. A red arrow $3\to2$. Right: $h\nu = 13.6(\tfrac14-\tfrac19) = 1.89$ eV, then $\lambda = \frac{1240}{1.89}$ nm $\approx 656$ nm in red.
- **Beat b:** Purple Lyman arrows ($2,3,4\to1$), red Balmer arrows ($4,5,6\to2$) and amber Paschen arrows ($4,5\to3$) grow in turn, with a colour-matched legend on the right.
- **Beat c:** A dark spectrum strip (350–700 nm) with the Balmer lines at 656, 486, 434 and 410 nm in their colours, then fainter lines crowding towards a dashed limit at 365 nm. Below: $n = \infty\to2:\ \lambda = \frac{1240}{3.4} \approx 365$ nm.
- **Beat d:** Right panel and series arrows clear. Six grey arrows, one for each pair of levels 1–4, with "gas: $\frac{n(n-1)}{2} = \frac{4\cdot3}{2} = 6$ lines". Then one green path $4\to3\to2\to1$ with "one atom: at most $n-1 = 3$". Then "cold gas absorbs only from n = 1: the Lyman lines" in purple.

---

## Scene 4 — X-rays (Lesson 4.4)

**Narration:**

- **Beat a:** X-rays run the photoelectric effect backwards. Electrons from a hot filament are slammed into a metal target by tens of kilovolts. The filament current sets the intensity, the voltage sets the penetrating power.
- **Beat b:** Stopping electrons gives a continuous spread of photons. The most energetic takes an electron's whole energy, e V: a sharp cut-off at lambda min equals twelve forty over V nanometres. At thirty kilovolts, point zero four one nanometres.
- **Beat c:** On top sit sharp K alpha and K beta peaks, from electrons falling into the target's innermost shell. Double the voltage: the cut-off halves, but the peaks stay put. They are fingerprints of the target, with root nu proportional to Z minus one.

**Visuals:**

- **Beat a:** A tube outline with a zigzag "filament (cathode)" and a slanted "metal target (anode)", wired to a supply "$V \sim 20$–$100$ kV" (short negative plate on the filament side, long positive plate on the target side). Purple electrons accelerate across and amber X-ray squiggles leave the target. Two chains at the bottom: "filament current → how many electrons → intensity" and "voltage V → energy per electron → penetrating power".
- **Beat b:** Clear. Axes of intensity against $\lambda$ (nm, 0 to 0.12). A smooth continuous spectrum that starts at zero at a teal dashed $\lambda_{\min}$. Right: $eV = \frac{hc}{\lambda_{\min}}$, $\lambda_{\min} = \frac{1240}{V}$ nm (teal), "30 kV: $\lambda_{\min} \approx 0.041$ nm".
- **Beat c:** Purple-labelled $K_\beta$ (0.063 nm) and $K_\alpha$ (0.071 nm) spikes appear on the curve. "voltage doubled": the curve morphs so its cut-off slides to 0.021 nm while the spikes stay fixed. Right: "cut-off: voltage only" (teal), "peaks: the target only" (purple), $\sqrt\nu \propto (Z-1)$.

---

## Scene 5 — Nuclear size and binding energy (Lesson 4.5)

**Narration:**

- **Beat a:** A nucleus has a radius of one point two femtometres times A to the one third, so volume and mass both grow as A: every nucleus has the same huge density, about two point three times ten to the seventeen kilograms per cubic metre.
- **Beat b:** Weigh helium four. Its two protons and two neutrons, weighed separately, are heavier by point oh three oh four atomic mass units. That missing mass is the binding energy: twenty eight point three mega electron volts.
- **Beat c:** Plot binding energy per nucleon against mass number. It climbs steeply, peaks near iron fifty six at about eight point eight mega electron volts, then sinks slowly to seven point six for uranium.
- **Beat d:** Any move towards the peak releases energy: fusion climbs the steep left side, fission the gentle right. Split a nucleus of two hundred and forty at seven point six into two halves at eight point five, and you release two hundred and sixteen mega electron volts.

**Visuals:**

- **Beat a:** Two packed nucleon clusters with radii in the ratio 3 : 4, labelled $^{27}$Al: 3.6 fm and $^{64}$Cu: 4.8 fm. Below: $R = R_0A^{1/3},\ R_0 = 1.2$ fm, then $\rho = \frac{A\,m_u}{\frac43\pi R_0^3A} \approx 2.3\times10^{17}$ kg/m³, and in green "A cancels: the same density in every nucleus".
- **Beat b:** Clear. Four separate discs "$2p + 2n$: 4.032980 u", a red ">", and a packed helium nucleus "$^4$He: 4.002603 u". Then $\Delta m = 0.030377$ u, $BE = \Delta m\times931.5$ MeV $\approx 28.3$ MeV, and $BE/A \approx 7.07$ MeV per nucleon in green.
- **Beat c:** Clear. Axes BE/A (MeV, 0–10) against A (0–240). The red curve rises steeply, with gold dots and labels "$^{56}$Fe: 8.8" at the peak and "U: 7.6" at the right end.
- **Beat d:** A green curved arrow "fusion" climbs the left side; a teal curved arrow "fission" runs from uranium towards the peak. Right: "towards the peak = energy out", $240\times7.6 \to 2\times120\times8.5$, and $Q = 2040 - 1824 = 216$ MeV in green.

---

## Scene 6 — Radioactivity and half-life (Lesson 4.6)

**Narration:**

- **Beat a:** Some nuclei decay on their own. Alpha decay removes a helium nucleus: mass number drops by four, Z by two. Beta minus turns a neutron into a proton, so Z rises by one. Gamma just sheds energy.
- **Beat b:** No one can say when one nucleus will decay, but each has the same chance per second, lambda. So N equals N nought, e to the minus lambda t, and the half life is point six nine three over lambda.
- **Beat c:** Each half life removes half of what is left, so after two, a quarter remains, not nothing. Eight hundred to fifty becquerel in twenty days is four halvings: a half life of five days.
- **Beat d:** To count a decay chain, start with alpha, the only one that changes the mass number. Uranium two thirty eight to lead two oh six loses thirty two: eight alphas. They lower Z to seventy six, but lead is eighty two: six beta decays. And heat never changes lambda.

**Visuals:**

- **Beat a:** Header "Nuclei that fall apart on their own". Three rows: alpha ${}^A_Z\text{X}\to{}^{A-4}_{Z-2}\text{Y}+{}^4_2\text{He}$; beta minus $n\to p+e^-+\bar\nu$ $(Z+1,\ A$ same$)$; gamma "excited nucleus → same nucleus + $\gamma$".
- **Beat b:** Clear. Axes $N/N_0$ against $t/T_{1/2}$ (0–5). Right: $\frac{dN}{dt} = -\lambda N$, then $N = N_0e^{-\lambda t}$ in red as the decay curve is drawn, then $T_{1/2} = \frac{\ln2}{\lambda} = \frac{0.693}{\lambda}$.
- **Beat c:** Dashed drop lines and gold dots mark $\frac12$, $\frac14$, $\frac18$ at 1, 2, 3 half-lives. The right column is replaced by $800\to50$ Bq in 20 days, $\frac{800}{50} = 16 = 2^4$, and $T_{1/2} = \frac{20}{4} = 5$ days in green.
- **Beat d:** Clear. ${}^{238}_{92}\text{U}\longrightarrow{}^{206}_{82}\text{Pb}$; $\Delta A = 32 \Rightarrow 32/4 = 8\ \alpha$ (amber); $Z:\ 92-16 = 76,\ 82-76 = 6\ \beta^-$ (purple); muted "heat, pressure, chemistry: $\lambda$ unchanged (MeV vs eV)".

---

## Scene 7 — Fission and fusion (Lesson 4.7)

**Narration:**

- **Beat a:** In fission, a slow neutron enters uranium two thirty five. The nucleus stretches and tears into two fragments, such as barium and krypton, plus three neutrons and about two hundred mega electron volts.
- **Beat b:** Those neutrons split more nuclei. More than one new fission per fission, and the reaction runs away; exactly one keeps a reactor steady. A moderator slows neutrons, and control rods absorb the spare ones.
- **Beat c:** Fusion joins light nuclei, but they must beat their repulsion, which takes millions of kelvin. Two deuterons make helium four, releasing about twenty four mega electron volts.
- **Beat d:** That is less per event than fission, but about six mega electron volts per nucleon, against less than one. The Sun runs on it.

**Visuals:**

- **Beat a:** A teal neutron flies into a large packed uranium cluster, which stretches into a dumb-bell and splits into two smaller clusters labelled Ba and Kr while three neutrons fly off to the right. Top: ${}^{235}_{92}\text{U} + {}^1_0n \to {}^{141}_{56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,{}^1_0n$ + about 200 MeV.
- **Beat b:** Clear. A branching tree, 1 → 3 → 9 nuclei joined by teal neutron lines, with "$1\to3\to9\to\cdots$". Right column in turn: "more than 1 new fission each: runaway" (red), "exactly 1: steady (a reactor)" (green), "moderator: light nuclei slow neutrons / by collisions, not by absorbing them", "control rods: absorb spare neutrons".
- **Beat c:** Clear. Two deuterons (one red, one teal disc each) with red repulsion arrows and "Coulomb barrier: millions of kelvin"; they slide together and merge into a helium-4 cluster. Right: ${}^2\text{H} + {}^2\text{H} \to {}^4\text{He}$ and $Q = 28.3 - 2\times2.22 \approx 23.9$ MeV in green.
- **Beat d:** "fusion: $\frac{23.9}{4} \approx 6$ MeV per nucleon" (green) over "fission: $\frac{200}{236} \approx 0.85$ MeV per nucleon" (teal). Then a small sun disc and "Sun: $4\,{}^1\text{H}\to{}^4\text{He} + 2e^+ + 2\nu + 26.7$ MeV".

---

## Scene 8 — Recap and next (Lesson 4.8)

**Narration:**

- **Beat a:** To recap. Back scattering revealed a tiny, heavy nucleus. Quantised angular momentum gives hydrogen's levels: minus thirteen point six, Z squared over n squared.
- **Beat b:** Every line and every X-ray cut-off is twelve forty over an energy gap. Missing mass is binding energy, and fission and fusion both climb towards iron. Decay halves what is left, on a fixed clock.
- **Beat c:** Try the mastery quiz. Then chapter five packs atoms into a crystal, where levels spread into bands, and uses the gap to build diodes, solar cells and transistors.

**Visuals:** Title "Chapter 4 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $r_0 = \frac{2Ze^2}{4\pi\varepsilon_0K}$: back-scattering: a tiny nucleus
2. $E_n = -13.6\frac{Z^2}{n^2}$ eV: quantised angular momentum
3. $\lambda = \frac{1240}{\Delta E}$ nm, $\lambda_{\min} = \frac{1240}{V}$: lines and cut-offs are energy gaps
4. $BE = \Delta m\times931.5$ MeV: climb towards the iron peak
5. $N = N_0e^{-\lambda t}$, $T_{1/2} = \frac{0.693}{\lambda}$: random nuclei, steady halving

Last, "Next: Chapter 5 · Semiconductor Electronics" appears at the bottom.
