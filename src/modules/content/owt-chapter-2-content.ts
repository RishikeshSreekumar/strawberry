import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Oscillations, Waves and Thermal Physics Chapter 2 — Sound Waves.
 * The string toolkit carried to air: sound as a displacement wave and a
 * pressure wave, its speed (Newton and Laplace), intensity and decibels,
 * organ pipes and the resonance tube, beats, and the Doppler effect.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "sound-as-a-pressure-wave",
  title: "2.1 · Sound Is Squeezed Air",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hold a candle in front of a loudspeaker playing a deep bass note and the flame flickers in time with the music. Nothing solid touches it; the air itself is being pushed and pulled. The speaker cone moves forward and squeezes the air in front of it, moves back and leaves the air thinned out, over and over. Each layer of air pushes on the next, and the pattern of squeezes travels outward at about 340 m/s. That travelling pattern is sound.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Sound wave",
      content:
        "Sound in a fluid is a **longitudinal** mechanical wave: layers of the medium oscillate back and forth **along** the direction of travel.\n**Compressions** are regions where layers crowd together (pressure above normal); **rarefactions** are regions where they spread apart (pressure below normal).\nThe same wave can be described by the **displacement** $s(x, t)$ of each layer from its rest position, or by the **excess pressure** $\\Delta p(x, t)$ above the undisturbed pressure.",
    },
    {
      type: "text",
      content:
        "**From displacement to pressure.** Take a thin slab of air between $x$ and $x + dx$, with cross-section $A$. When the wave passes, its left face moves by $s(x)$ and its right face by $s(x + dx)$. The slab's volume changes by $A[s(x + dx) - s(x)] = A\\,\\dfrac{\\partial s}{\\partial x}dx$, so the fractional volume change is $\\dfrac{\\Delta V}{V} = \\dfrac{\\partial s}{\\partial x}$. The bulk modulus $B$ links pressure change to fractional volume change, $\\Delta p = -B\\,\\dfrac{\\Delta V}{V}$ (squeeze it, pressure rises). Therefore",
    },
    { type: "math", latex: "\\Delta p = -B\\,\\frac{\\partial s}{\\partial x}" },
    {
      type: "text",
      content: "For a sinusoidal displacement wave $s = s_0\\sin(kx - \\omega t)$:",
    },
    {
      type: "math",
      latex: "\\Delta p = -Bks_0\\cos(kx - \\omega t), \\qquad \\Delta p_0 = Bks_0 = \\rho v\\omega s_0 \\quad (\\text{using } B = \\rho v^2 \\text{ from 2.2})",
    },
    {
      type: "text",
      content:
        "The pressure wave has the same $k$ and $\\omega$ as the displacement wave but is shifted by a quarter cycle: a cosine instead of a sine. Where the displacement is zero, its slope is steepest, so neighbouring layers are moving towards or away from each other the most: that is where the pressure change is largest. Where the displacement is largest, the layers on either side have shifted by the same amount, nothing is squeezed, and the pressure is normal.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Displacement and pressure are 90° apart",
      content:
        "Pressure is $\\pi/2$ out of phase with displacement: **pressure nodes sit at displacement antinodes, and pressure antinodes at displacement nodes.**\nPressure amplitude $\\Delta p_0 = Bks_0 = \\dfrac{2\\pi B}{\\lambda}s_0$.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "standing",
        boundary: "open-open",
        stringLength: 0.5,
        waveSpeed: 340,
        harmonic: 1,
        maxHarmonic: 4,
        sliders: ["harmonic"],
        caption:
          "A preview of 2.4: air in a pipe open at both ends. Each dot is a layer of air. Watch where the dots swing most and where they bunch up most.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: in the fundamental, the dots near the open ends swing back and forth the most (displacement antinodes), yet they never crowd together there, because the air outside keeps the pressure at atmospheric. The dots in the middle barely move, but the dots on either side of them rush together and apart, so the middle is where the pressure swings most. Displacement antinode and pressure node coincide, exactly as $\\Delta p = -B\\,\\partial s/\\partial x$ says.",
    },
    {
      type: "table",
      headers: ["Range", "Frequency", "Examples"],
      rows: [
        ["Infrasound", "below 20 Hz", "earthquakes, elephants' calls, wind over mountains"],
        ["Audible", "20 Hz to 20 kHz", "speech (roughly 100 Hz to 4 kHz), music"],
        ["Ultrasound", "above 20 kHz", "bats, dolphins, SONAR, medical scans, cleaning baths"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (pressure amplitude, JEE Main).** A 1 kHz sound in air has displacement amplitude $10^{-6}$ m. Take $B = 1.4 \\times 10^5$ Pa and $v = 340$ m/s. Find the pressure amplitude.\n\n1. $k = \\dfrac{2\\pi f}{v} = \\dfrac{2\\pi \\times 1000}{340} \\approx 18.5$ rad/m. *Why this step:* the pressure amplitude depends on how fast the displacement varies in space, which is set by $k$.\n2. $\\Delta p_0 = Bks_0 = 1.4 \\times 10^5 \\times 18.5 \\times 10^{-6} \\approx 2.6$ Pa.\n3. Compare with atmospheric pressure $\\approx 10^5$ Pa: the wave changes the pressure by about 26 parts in a million, and the air moves by a thousandth of a millimetre. A fairly loud sound is a tiny disturbance.\n\n**Worked example 2 (wavelengths you can hear).** With $v = 340$ m/s, find the wavelengths at the limits of hearing.\n\n1. $\\lambda = v/f$: at 20 Hz, $\\lambda = 17$ m; at 20 kHz, $\\lambda = 1.7$ cm.\n2. Audible sound spans wavelengths from a room's length down to a fingertip, which is why low notes bend round buildings and high notes cast sharp acoustic shadows.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (reading a pressure equation).** A sound wave in air is $\\Delta p = 0.02\\sin(1000t - 3x)$ Pa (SI). Take $B = 1.4 \\times 10^5$ Pa. Find the speed and the displacement amplitude.\n\n1. $v = \\omega/k = 1000/3 \\approx 333$ m/s.\n2. $s_0 = \\dfrac{\\Delta p_0}{Bk} = \\dfrac{0.02}{1.4 \\times 10^5 \\times 3} \\approx 4.8 \\times 10^{-8}$ m. *Why this step:* the same relation works both ways; a faint sound moves air by less than a molecule's mean free path.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"maximum pressure is where the air moves most\"",
      content:
        "Pressure changes where neighbouring layers move **differently**, not where they move far. If every layer in a region shifts right by the same amount, nothing is squeezed. So the pressure swings are largest at displacement nodes (layers on either side move towards, then away from, a still layer) and zero at displacement antinodes.",
    },
    {
      type: "quiz",
      id: "owt2-1-q1",
      variant: "concept",
      question: "In a sound wave, at a point where the displacement of the air is momentarily zero and its slope $\\partial s/\\partial x$ is largest in size, the excess pressure is:",
      options: [
        { text: "equal to the displacement amplitude times $B$", feedback: "Units alone rule this out; pressure depends on the *slope* $\\partial s/\\partial x$, which is dimensionless." },
        { text: "largest in size (a compression or rarefaction)", correct: true, feedback: "$\\Delta p = -B\\,\\partial s/\\partial x$ is set by the slope, which is steepest there." },
        { text: "zero, because the air there has not moved", feedback: "The air there is not displaced, but its neighbours are squeezing towards or away from it." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-1-q2",
      variant: "practice",
      question: "A 680 Hz sound in air ($v = 340$ m/s, $B = 1.4 \\times 10^5$ Pa) has displacement amplitude $5 \\times 10^{-7}$ m. What is its pressure amplitude?",
      options: [
        { text: "about 0.14 Pa", feedback: "You used $k = 1/\\lambda = 2$ instead of $k = 2\\pi/\\lambda = 4\\pi$ rad/m." },
        { text: "about 1.76 Pa", feedback: "That corresponds to $\\lambda = 0.25$ m. Recheck: $\\lambda = v/f = 340/680 = 0.5$ m." },
        { text: "about 0.88 Pa", correct: true, feedback: "$k = 2\\pi \\times 680/340 = 4\\pi \\approx 12.57$ rad/m; $\\Delta p_0 = 1.4 \\times 10^5 \\times 12.57 \\times 5 \\times 10^{-7} \\approx 0.88$ Pa." },
        { text: "about 0.44 Pa", feedback: "That has an extra factor of $\\tfrac12$. The pressure amplitude is simply $\\Delta p_0 = Bks_0$." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-1-q3",
      variant: "concept",
      question: "Which statement about sound in air is correct?",
      options: [
        { text: "Air layers oscillate perpendicular to the direction of travel.", feedback: "That describes a transverse wave; fluids cannot sustain transverse sound because they have no shear stiffness." },
        { text: "Air layers oscillate along the direction the sound travels.", correct: true, feedback: "Sound in a fluid is longitudinal." },
        { text: "Air molecules travel from the source to your ear at the speed of sound.", feedback: "The pattern travels; each layer only oscillates about its rest position." },
        { text: "Sound can travel through a vacuum if it is loud enough.", feedback: "Sound is a mechanical wave and needs a medium, however loud it is." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-1-q4",
      variant: "practice",
      question: "A bat emits ultrasound at 68 kHz. What is its wavelength in air ($v = 340$ m/s)?",
      options: [
        { text: "5 mm", correct: true, feedback: "$\\lambda = 340/68000 = 0.005$ m. Short wavelengths let bats resolve small insects." },
        { text: "5 cm", feedback: "Check the powers of ten: $340/68000 = 5 \\times 10^{-3}$ m." },
        { text: "0.2 mm", feedback: "That is $f/v$ in the wrong units; $\\lambda = v/f$." },
        { text: "200 m", feedback: "That is $f/v$. The wavelength is $v/f$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "speed-of-sound",
  title: "2.2 · How Fast Sound Travels",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "In a thunderstorm you see the lightning first and hear the thunder later: roughly 3 seconds per kilometre. Sound is about a million times slower than light, and its speed depends on what it travels through: about 340 m/s in air, 1500 m/s in water, 5000 m/s in steel. Why?",
    },
    {
      type: "text",
      content:
        "**Stiffness over inertia.** On a string, $v = \\sqrt{T/\\mu}$: a restoring stiffness divided by an inertia, under a square root. For sound, the stiffness is how strongly a fluid resists being squeezed, its bulk modulus $B$ (pressure per fractional volume change), and the inertia is the density $\\rho$. Repeating the string derivation with a slab of fluid (or simply checking units: Pa / (kg/m³) = m²/s²) gives",
    },
    { type: "math", latex: "v = \\sqrt{\\frac{B}{\\rho}} \\quad (\\text{fluids}), \\qquad v = \\sqrt{\\frac{Y}{\\rho}} \\quad (\\text{a thin solid rod, } Y = \\text{Young's modulus})" },
    {
      type: "text",
      content:
        "**Newton's attempt.** For a gas, what is $B$? Newton assumed the compressions happen at constant temperature, so Boyle's law $pV = $ const holds. Differentiating, $p\\,dV + V\\,dp = 0$, so $B = -V\\dfrac{dp}{dV} = p$. For air at 0 °C, $p = 1.013 \\times 10^5$ Pa and $\\rho = 1.293$ kg/m³:",
    },
    { type: "math", latex: "v_{\\text{Newton}} = \\sqrt{\\frac{1.013 \\times 10^5}{1.293}} \\approx 280 \\text{ m/s}" },
    {
      type: "text",
      content:
        "The measured value is 331 m/s, about 18% higher. **Laplace's correction:** the compressions and rarefactions alternate hundreds of times a second, far too quickly for heat to flow between them, so the process is **adiabatic**, not isothermal. For an adiabatic process $pV^\\gamma = $ const (derived in 5.3), which gives $B = \\gamma p$. With $\\gamma = 1.4$ for air, $280\\sqrt{1.4} \\approx 331$ m/s. ✓",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Speed of sound in an ideal gas",
      content:
        "$v = \\sqrt{\\dfrac{\\gamma p}{\\rho}} = \\sqrt{\\dfrac{\\gamma RT}{M}}$, using $p/\\rho = RT/M$ for an ideal gas ($M$ = molar mass in kg/mol, $T$ in kelvin).\n**Temperature:** $v \\propto \\sqrt T$. **Pressure:** at fixed $T$, no effect ($p/\\rho$ is constant). **Humidity:** water vapour ($M = 0.018$) is lighter than air ($M \\approx 0.029$), so moist air carries sound slightly faster. **Molar mass:** lighter gases are faster.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "331*sqrt((273 + x)/273)",
        exprLatex: "v = 331\\sqrt{\\frac{273 + t}{273}}",
        min: -20,
        max: 60,
        step: 1,
        initial: 20,
        inputLabel: "Air temperature",
        outputLabel: "Speed of sound (m/s)",
        inputUnit: "°C",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 331 m/s at 0 °C, about 343 m/s at 20 °C, about 354 m/s at 40 °C. Near room temperature the speed rises by roughly 0.6 m/s per degree, because $\\sqrt{1 + t/273} \\approx 1 + t/546$ and $331/546 \\approx 0.61$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (two gases).** Compare the speed of sound in hydrogen and oxygen at the same temperature.\n\n1. Both are diatomic, so $\\gamma = 1.4$ for both. *Why this step:* $\\gamma$ sits inside the formula, so check it is the same before cancelling.\n2. $v \\propto 1/\\sqrt M$: $\\dfrac{v_{H_2}}{v_{O_2}} = \\sqrt{\\dfrac{32}{2}} = 4$. Sound is four times faster in hydrogen.\n\n**Worked example 2 (JEE Main).** At what temperature is the speed of sound in air double its value at 0 °C?\n\n1. $v \\propto \\sqrt T$, so doubling $v$ needs $T$ four times as large. *Why this step:* the temperature must be absolute (kelvin) for the proportionality to hold.\n2. $T = 4 \\times 273 = 1092$ K, which is $1092 - 273 = 819$ °C. Not 0 × 4 = 0 °C, and not 2 × 273 K.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (echo).** A girl claps her hands 170 m from a cliff. When does she hear the echo? ($v = 340$ m/s)\n\n1. The sound goes to the cliff and back: distance 340 m. *Why this step:* echo problems always involve the round trip.\n2. $t = 340/340 = 1$ s.\n\n**Worked example 4 (depth sounding).** A ship's SONAR sends an ultrasonic pulse straight down and receives the echo 0.8 s later. Sound travels at 1500 m/s in sea water. How deep is the sea?\n\n1. One-way time $0.4$ s.\n2. Depth $= 1500 \\times 0.4 = 600$ m.\n\n**Worked example 5 (a solid).** Estimate the speed of sound along a steel rail ($Y = 2 \\times 10^{11}$ Pa, $\\rho = 7800$ kg/m³).\n\n1. $v = \\sqrt{Y/\\rho} = \\sqrt{2.56 \\times 10^7} \\approx 5060$ m/s, about 15 times the speed in air. Put your ear to a rail and you hear a distant train through the steel well before the air.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"sound travels faster at higher pressure\"",
      content:
        "Raise the pressure of a gas at constant temperature and its density rises in exactly the same proportion, so $\\gamma p/\\rho$ does not change. The speed of sound on a mountain top and at sea level differs only because the *temperature* differs. What does matter: temperature (up), molar mass (down), and $\\gamma$.",
    },
    {
      type: "quiz",
      id: "owt2-2-q1",
      variant: "practice",
      question: "The speed of sound in a gas is 300 m/s at 27 °C. At what temperature will it be 450 m/s?",
      options: [
        { text: "40.5 °C", feedback: "That scales the Celsius temperature by 1.5. Use kelvin and square the speed ratio." },
        { text: "177 °C", feedback: "That scales the absolute temperature by 1.5 ($450$ K). Speed goes as $\\sqrt T$, so $T$ must scale by $1.5^2$." },
        { text: "675 °C", feedback: "675 is in kelvin. Subtract 273." },
        { text: "402 °C", correct: true, feedback: "$(450/300)^2 = 2.25$, so $T = 2.25 \\times 300 = 675$ K $= 402$ °C." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-2-q2",
      variant: "concept",
      question: "The pressure of the air in a closed room is doubled while its temperature is held fixed. The speed of sound:",
      options: [
        { text: "doubles", feedback: "Speed does not depend on pressure at constant temperature." },
        { text: "decreases by $\\sqrt2$", feedback: "The density effect exactly cancels the pressure effect; it does not overpower it." },
        { text: "stays the same", correct: true, feedback: "$p$ and $\\rho$ both double, so $\\sqrt{\\gamma p/\\rho}$ is unchanged." },
        { text: "increases by $\\sqrt2$", feedback: "That ignores the density, which doubles along with the pressure." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-2-q3",
      variant: "concept",
      question: "Why did Newton's formula $v = \\sqrt{p/\\rho}$ underestimate the speed of sound in air?",
      options: [
        { text: "Sound speed depends on frequency, and he used the wrong frequency.", feedback: "Sound in air is essentially non-dispersive: all audible frequencies travel at the same speed." },
        { text: "He assumed the compressions were isothermal; they are adiabatic, so the effective stiffness is $\\gamma p$, not $p$.", correct: true, feedback: "The oscillations are too fast for heat to flow, so compressed regions warm up and push back harder." },
        { text: "He used the wrong density of air.", feedback: "The density was fine; the stiffness (bulk modulus) was too small by a factor $\\gamma$." },
        { text: "He forgot that sound is transverse.", feedback: "Sound in air is longitudinal, and Newton treated it so." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-2-q4",
      variant: "practice",
      question: "At the same temperature, what is the ratio of the speed of sound in helium ($\\gamma = 5/3$, $M = 4$ g/mol) to that in argon ($\\gamma = 5/3$, $M = 40$ g/mol)?",
      options: [
        { text: "$\\sqrt{10} \\approx 3.16$", correct: true, feedback: "Same $\\gamma$, so $v \\propto 1/\\sqrt M$: $\\sqrt{40/4} = \\sqrt{10}$." },
        { text: "$10$", feedback: "Speed goes as $1/\\sqrt M$, not $1/M$." },
        { text: "$1/\\sqrt{10}$", feedback: "Helium is lighter, so sound is faster in it." },
        { text: "$1$", feedback: "Both are monatomic, so $\\gamma$ cancels, but the molar masses differ tenfold." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-2-q5",
      variant: "practice",
      question: "A man stands between two parallel cliffs and fires a gun. He hears echoes after 1.5 s and 2.5 s. How far apart are the cliffs? ($v = 340$ m/s)",
      options: [
        { text: "1360 m", feedback: "Echo times are round trips; halve them before multiplying by $v$." },
        { text: "340 m", feedback: "That is the distance of neither cliff. Find each distance as $vt/2$ and add them." },
        { text: "170 m", feedback: "That is $v \\times (2.5 - 1.5)/2$, the *difference* of the two distances. The separation is their sum." },
        { text: "680 m", correct: true, feedback: "Distances $340 \\times 0.75 = 255$ m and $340 \\times 1.25 = 425$ m; total 680 m." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "intensity-and-loudness",
  title: "2.3 · Intensity and the Decibel Scale",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Your ear handles a whisper and a rock concert without complaint, although the concert delivers about ten million times more power to each square centimetre of eardrum. To describe such a huge range, acousticians measure loudness on a logarithmic scale: the decibel. First, though, we need the physical quantity underneath it, the intensity.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Intensity",
      content:
        "The **intensity** $I$ of a wave is the average power it carries per unit area perpendicular to its direction of travel. Units: W/m².",
    },
    {
      type: "text",
      content:
        "**Deriving the intensity.** Each layer of air of mass $dm$ performs SHM of amplitude $s_0$ and carries energy $\\tfrac12\\,dm\\,\\omega^2s_0^2$ (from 0.3). So the energy per unit volume is $u = \\tfrac12\\rho\\omega^2s_0^2$, and this energy moves at speed $v$. The energy crossing unit area per second is $u v$:",
    },
    {
      type: "math",
      latex: "I = \\tfrac12\\rho v\\omega^2 s_0^2 = 2\\pi^2\\rho v f^2 s_0^2 = \\frac{\\Delta p_0^2}{2\\rho v}",
    },
    {
      type: "text",
      content:
        "The last form uses $\\Delta p_0 = \\rho v\\omega s_0$ from 2.1. It is the one microphones use, since they respond to pressure. Either way, **intensity goes as amplitude squared**, exactly as for a string.",
    },
    {
      type: "text",
      content:
        "**A point source.** A small source emitting power $P$ equally in all directions spreads it over spheres of area $4\\pi r^2$. With no absorption, the same power crosses every sphere, so",
    },
    { type: "math", latex: "I = \\frac{P}{4\\pi r^2} \\qquad\\Longrightarrow\\qquad I \\propto \\frac{1}{r^2}, \\quad s_0 \\propto \\frac{1}{r}" },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "10/x^2",
        exprLatex: "I = \\frac{10}{r^2}",
        window: { xmin: 0.5, xmax: 6, ymin: 0, ymax: 12 },
        initial: 2,
        excluded: [0],
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $r = 1$ the intensity is 10, at $r = 2$ it is 2.5, at $r = 3$ about 1.1. Each doubling of distance divides the intensity by four. The curve drops steeply close to the source and flattens far away.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Sound intensity level (decibels)",
      content:
        "$\\beta = 10\\log_{10}\\dfrac{I}{I_0}$ dB, where $I_0 = 10^{-12}$ W/m² is the threshold of hearing at 1 kHz.\nMultiplying $I$ by 10 adds 10 dB; by 100 adds 20 dB; by 2 adds $10\\log_{10}2 \\approx 3$ dB.\nDifference of levels: $\\beta_2 - \\beta_1 = 10\\log_{10}\\dfrac{I_2}{I_1}$.",
    },
    {
      type: "table",
      headers: ["Sensation", "Physical quantity", "Notes"],
      rows: [
        ["Pitch", "frequency", "higher $f$, higher pitch"],
        ["Loudness", "intensity (and frequency response of the ear)", "roughly logarithmic in $I$: hence decibels"],
        ["Quality (timbre)", "the mix of overtones and their amplitudes", "why a flute and a violin on the same note sound different"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A sound level rises from 60 dB to 80 dB. By what factor has the intensity increased?\n\n1. $80 - 60 = 20 = 10\\log_{10}(I_2/I_1)$, so $\\log_{10}(I_2/I_1) = 2$.\n2. $I_2/I_1 = 10^2 = 100$. *Why this step:* each 10 dB is a factor of 10, so 20 dB is $10 \\times 10$.\n3. The pressure amplitude rises by $\\sqrt{100} = 10$.\n\n**Worked example 2 (JEE Main).** A small source radiates 1 W of sound uniformly. Find the intensity and the intensity level 10 m away.\n\n1. $I = \\dfrac{1}{4\\pi \\times 10^2} \\approx 7.96 \\times 10^{-4}$ W/m².\n2. $\\beta = 10\\log_{10}\\dfrac{7.96 \\times 10^{-4}}{10^{-12}} = 10\\log_{10}(7.96 \\times 10^8) = 10 \\times 8.90 \\approx 89$ dB. *Why this step:* $\\log_{10}(7.96 \\times 10^8) = 8 + \\log_{10}7.96 = 8 + 0.90$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (two machines).** One machine produces 70 dB at a point. What level do two identical machines produce there?\n\n1. Intensities from independent sources add (no steady interference): $I_{\\text{total}} = 2I$. *Why this step:* decibels are logarithms, so they cannot be added directly; go back to intensities.\n2. $\\beta = 70 + 10\\log_{10}2 \\approx 73$ dB, not 140 dB.\n\n**Worked example 4 (moving away).** You hear a source at 80 dB from 2 m. What level do you hear at 8 m?\n\n1. Distance ×4, so intensity $\\div 16$.\n2. $\\Delta\\beta = 10\\log_{10}(1/16) = -12.0$ dB, so about 68 dB. Each doubling of distance costs about 6 dB.\n\n**Worked example 5 (from pressure to intensity).** The 1 kHz wave of 2.1 had $\\Delta p_0 \\approx 2.6$ Pa. With $\\rho = 1.29$ kg/m³ and $v = 340$ m/s:\n\n1. $I = \\dfrac{2.6^2}{2 \\times 1.29 \\times 340} = \\dfrac{6.76}{877} \\approx 7.7 \\times 10^{-3}$ W/m².\n2. $\\beta = 10\\log_{10}(7.7 \\times 10^9) \\approx 99$ dB: a displacement of a thousandth of a millimetre is already as loud as a pneumatic drill.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"double the intensity doubles the decibels\"",
      content:
        "The decibel scale is logarithmic. Doubling the intensity adds only about 3 dB (70 dB becomes 73 dB, not 140 dB). To go from 70 dB to 140 dB the intensity must increase ten-million-fold.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"doubling the distance halves the intensity\"",
      content:
        "Doubling the distance halves the **amplitude**, and intensity goes as amplitude squared, so the intensity falls to a **quarter** (the energy spreads over four times the area). Halving is what happens to the amplitude, not to $I$.",
    },
    {
      type: "quiz",
      id: "owt2-3-q1",
      variant: "practice",
      question: "A sound level changes from 40 dB to 70 dB. By what factor does the intensity change?",
      options: [
        { text: "1.75", feedback: "$70/40$ compares the levels, not the intensities." },
        { text: "$\\sqrt{1000}$", feedback: "That is the factor for the pressure amplitude. The intensity factor is 1000." },
        { text: "1000", correct: true, feedback: "30 dB is three factors of 10: $10^3$." },
        { text: "30", feedback: "Decibel differences are logarithms: 30 dB means $10^{30/10}$." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-3-q2",
      variant: "practice",
      question: "Ten identical violins each playing alone produce 60 dB at a listener. What level do all ten produce together?",
      options: [
        { text: "66 dB", feedback: "That would be four violins. $10\\log_{10}10 = 10$ dB." },
        { text: "70 dB", correct: true, feedback: "Ten times the intensity adds $10\\log_{10}10 = 10$ dB." },
        { text: "600 dB", feedback: "Decibels do not add; intensities do." },
        { text: "63 dB", feedback: "+3 dB is for doubling. Ten times is +10 dB." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-3-q3",
      variant: "practice",
      question: "The pressure amplitude of a sound is doubled. By how much does its intensity level change?",
      options: [
        { text: "about +6 dB", correct: true, feedback: "$I \\propto \\Delta p_0^2$ goes up 4 times: $10\\log_{10}4 \\approx 6$ dB." },
        { text: "about +3 dB", feedback: "That is for doubling the intensity. Doubling the amplitude quadruples it." },
        { text: "+20 dB", feedback: "20 dB is a factor of 100 in intensity." },
        { text: "It doubles.", feedback: "Decibels are logarithmic; a fixed intensity factor adds a fixed number of dB." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-3-q4",
      variant: "practice",
      question: "A point source gives an intensity of $9 \\times 10^{-6}$ W/m² at 1 m. What is the intensity at 3 m?",
      options: [
        { text: "$3 \\times 10^{-6}$ W/m²", feedback: "That divides by 3, which is how the *amplitude* falls." },
        { text: "$8.1 \\times 10^{-5}$ W/m²", feedback: "Intensity falls with distance; you multiplied." },
        { text: "$3.3 \\times 10^{-7}$ W/m²", feedback: "That divides by 27, as if $I \\propto 1/r^3$." },
        { text: "$1 \\times 10^{-6}$ W/m²", correct: true, feedback: "$I \\propto 1/r^2$: divide by 9." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-3-q5",
      variant: "concept",
      question: "A flute and a violin play the same note at the same loudness. What makes them sound different?",
      options: [
        { text: "Different speeds of sound from each instrument", feedback: "All sounds travel at the same speed in the same air." },
        { text: "Different intensities", feedback: "The question fixes the loudness to be the same." },
        { text: "The mix of overtones in each (their quality or timbre)", correct: true, feedback: "Same fundamental and intensity, different overtone content." },
        { text: "Different frequencies of the fundamental", feedback: "Same note means the same fundamental frequency." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "organ-pipes-and-resonance",
  title: "2.4 · Organ Pipes and the Resonance Tube",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Blow across the mouth of an empty bottle and it hoots; pour in some water and the note rises. A flute, an organ pipe and a bottle all trap sound in a tube, where waves bounce off the ends and superpose into standing waves exactly as on a string. The only new question is what the ends of an air column do.",
    },
    {
      type: "text",
      content:
        "**The two kinds of end.** At a **closed end** the air is stopped by the wall, so its displacement is zero: a **displacement node** (and, from 2.1, a pressure antinode: the air there is squeezed and stretched the most). At an **open end** the air opens into the atmosphere, which holds the pressure at atmospheric: a **pressure node**, and therefore a **displacement antinode**. Now repeat the string argument with these end conditions.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Pipe harmonics",
      content:
        "**Open at both ends** (antinode–antinode): $L = n\\dfrac{\\lambda}{2}$, so $f_n = \\dfrac{nv}{2L}$, $n = 1, 2, 3, \\ldots$: all harmonics.\n**Closed at one end** (node–antinode): $L = (2n - 1)\\dfrac{\\lambda}{4}$, so $f = \\dfrac{(2n - 1)v}{4L}$: odd harmonics only, fundamental $v/4L$.\nA closed pipe's fundamental is an octave below that of an open pipe of the same length.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "standing",
        boundary: "closed-open",
        stringLength: 0.5,
        waveSpeed: 340,
        harmonic: 1,
        maxHarmonic: 4,
        sliders: ["harmonic", "stringLength"],
        caption:
          "A 0.5 m pipe closed at the left end, v = 340 m/s. Count the displacement nodes (N) and antinodes (A) for each mode, and read the frequency.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the closed end is always N and the open end always A. The modes are 170, 510, 850, 1190 Hz: $1, 3, 5, 7$ times 170 Hz. Each step adds one more half-wavelength (one N and one A) inside the pipe. Shortening the pipe raises every frequency, which is why the bottle's note rises as water shortens its air column.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "standing",
        boundary: "open-open",
        stringLength: 0.5,
        waveSpeed: 340,
        harmonic: 1,
        maxHarmonic: 4,
        sliders: ["harmonic", "stringLength"],
        caption:
          "The same pipe open at both ends. Now both ends are displacement antinodes.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 340, 680, 1020, 1360 Hz, every whole multiple of 340 Hz. The fundamental is double the closed pipe's, and the even harmonics that were missing are back.",
    },
    {
      type: "text",
      content:
        "**Why only odd harmonics in a closed pipe?** The pipe must hold a node at one end and an antinode at the other. Node to antinode is $\\lambda/4$; the next possibility is $\\lambda/4 + \\lambda/2 = 3\\lambda/4$, then $5\\lambda/4$. Adding half-wavelengths keeps the numerator odd. An even harmonic would need an antinode or a node at *both* ends, which a closed pipe cannot provide.",
    },
    {
      type: "text",
      content:
        "**End correction.** The antinode at an open end actually sits a little outside the pipe, because the air just beyond the mouth still moves with the column. For a pipe of radius $r$ the effective extra length is $e \\approx 0.6r$. So a closed pipe behaves as if its length were $L + e$, and an open pipe $L + 2e$.",
    },
    {
      type: "text",
      content:
        "**The resonance-column experiment.** A tube dipping into water acts as a closed pipe whose length you set by raising or lowering it. Hold a tuning fork of frequency $f$ over the top and find the lengths $\\ell_1$ and $\\ell_2$ at which the sound swells (first and second resonance):",
    },
    {
      type: "math",
      latex:
        "\\ell_1 + e = \\frac{\\lambda}{4}, \\quad \\ell_2 + e = \\frac{3\\lambda}{4} \\quad\\Longrightarrow\\quad \\lambda = 2(\\ell_2 - \\ell_1), \\quad v = 2f(\\ell_2 - \\ell_1), \\quad e = \\frac{\\ell_2 - 3\\ell_1}{2}",
    },
    {
      type: "text",
      content:
        "Subtracting cancels the unknown end correction, which is why the method is so accurate.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (JEE Main).** A pipe 85 cm long is closed at one end. Find its fundamental and the next two frequencies it can produce ($v = 340$ m/s, ignore end correction).\n\n1. Closed pipe: $f_1 = \\dfrac{v}{4L} = \\dfrac{340}{4 \\times 0.85} = 100$ Hz. *Why this step:* node to antinode is a quarter wavelength, so $\\lambda = 4L = 3.4$ m.\n2. Only odd harmonics: $3f_1 = 300$ Hz and $5f_1 = 500$ Hz.\n\n**Worked example 2 (unison).** The first overtone of a closed pipe 30 cm long is in unison with the fundamental of an open pipe. How long is the open pipe?\n\n1. First overtone of the closed pipe: $\\dfrac{3v}{4 \\times 0.30}$. Fundamental of the open pipe: $\\dfrac{v}{2L_o}$.\n2. Set equal: $\\dfrac{3}{1.2} = \\dfrac{1}{2L_o}$, so $L_o = \\dfrac{1.2}{6} = 0.20$ m. *Why this step:* \"in unison\" means equal frequencies; $v$ cancels since both pipes are in the same air.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (resonance tube).** With a 512 Hz fork, resonances occur at 16 cm and 50 cm. Find the speed of sound and the end correction.\n\n1. $\\lambda = 2(50 - 16) = 68$ cm. *Why this step:* successive resonances of a closed pipe are half a wavelength apart, and the end correction cancels in the difference.\n2. $v = f\\lambda = 512 \\times 0.68 \\approx 348$ m/s.\n3. $e = \\dfrac{50 - 3 \\times 16}{2} = 1$ cm. Check: $\\ell_1 + e = 17$ cm $= \\lambda/4$. ✓\n\n**Worked example 4 (closing an open pipe).** An open pipe has fundamental 300 Hz. One end is closed. What is the new fundamental?\n\n1. Open: $v/2L = 300$ Hz, so $v/4L = 150$ Hz.\n2. Closing one end drops the fundamental by an octave, to 150 Hz, and removes the even harmonics.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a closed pipe has all harmonics\"",
      content:
        "A closed pipe produces $f_1$, $3f_1$, $5f_1$, ... only. If a problem gives two adjacent resonances of a closed pipe, they differ by $2f_1$, not $f_1$. This is also why a closed pipe sounds 'hollow' (like a clarinet) next to an open one (like a flute).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the closed end is a pressure node\"",
      content:
        "The closed end is a **displacement** node, so it is a pressure **antinode**: the air piles up against the wall and thins out there, swinging the pressure most. The open end, held at atmospheric pressure, is the pressure node. Always say which kind of node you mean.",
    },
    {
      type: "quiz",
      id: "owt2-4-q1",
      variant: "practice",
      question: "A pipe closed at one end has a fundamental of 200 Hz. Which frequency can it **not** produce?",
      options: [
        { text: "1400 Hz", feedback: "1400 Hz is the 7th harmonic, allowed." },
        { text: "400 Hz", correct: true, feedback: "400 Hz is the 2nd harmonic. A closed pipe has only odd harmonics: 200, 600, 1000, ... Hz." },
        { text: "600 Hz", feedback: "600 Hz is the 3rd harmonic, the first overtone of a closed pipe." },
        { text: "1000 Hz", feedback: "1000 Hz is the 5th harmonic, allowed." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-4-q2",
      variant: "practice",
      question: "An open pipe is 1 m long and $v = 340$ m/s. What is the frequency of its second overtone (ignore end correction)?",
      options: [
        { text: "510 Hz", correct: true, feedback: "$f_1 = 340/2 = 170$ Hz; the second overtone of an open pipe is the 3rd harmonic, 510 Hz." },
        { text: "340 Hz", feedback: "That is the first overtone (2nd harmonic)." },
        { text: "425 Hz", feedback: "That is the 5th harmonic of a 1 m closed pipe ($5 \\times 85$ Hz)." },
        { text: "255 Hz", feedback: "That is the 3rd harmonic of a closed 1 m pipe. This pipe is open." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-4-q3",
      variant: "practice",
      question: "In a resonance-tube experiment with a 500 Hz fork, the first two resonances are at 16.5 cm and 50.5 cm. What is the end correction?",
      options: [
        { text: "1 cm", feedback: "That is $\\ell_2 - 3\\ell_1$ without dividing by 2." },
        { text: "0", feedback: "Then $\\ell_2$ would be exactly $3\\ell_1 = 49.5$ cm, not 50.5 cm." },
        { text: "17 cm", feedback: "17 cm is $\\lambda/4$, the corrected first length, not the correction itself." },
        { text: "0.5 cm", correct: true, feedback: "$\\lambda = 2 \\times 34 = 68$ cm, so $\\lambda/4 = 17$ cm $= \\ell_1 + e$, giving $e = 0.5$ cm. (Formula: $(50.5 - 49.5)/2$.)" },
      ],
    },
    {
      type: "quiz",
      id: "owt2-4-q4",
      variant: "concept",
      question: "At the closed end of an organ pipe sounding a steady note:",
      options: [
        { text: "both the displacement and the pressure variation are zero", feedback: "Pressure and displacement nodes never coincide; they are a quarter wavelength apart." },
        { text: "both are largest", feedback: "Where the air cannot move, neighbouring air piles up against it: displacement zero, pressure swing largest." },
        { text: "the displacement is zero and the pressure variation is largest", correct: true, feedback: "Closed end: displacement node, pressure antinode." },
        { text: "the displacement is largest and the pressure variation is zero", feedback: "That describes an open end." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-4-q5",
      variant: "practice",
      question: "An open pipe and a closed pipe have the same fundamental frequency. What is the ratio $L_{\\text{open}} : L_{\\text{closed}}$?",
      options: [
        { text: "$4 : 1$", feedback: "Compare $2L$ with $4L$: the ratio is 2, not 4." },
        { text: "$2 : 1$", correct: true, feedback: "$v/2L_o = v/4L_c$ gives $L_o = 2L_c$." },
        { text: "$1 : 2$", feedback: "The closed pipe needs to be *shorter* to reach the same pitch, since its fundamental is $v/4L$." },
        { text: "$1 : 1$", feedback: "Equal lengths give the closed pipe half the open pipe's fundamental." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "beats",
  title: "2.5 · Beats",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Strike two tuning forks that are almost, but not quite, identical, say 256 Hz and 260 Hz. You do not hear two notes. You hear one note whose loudness throbs: loud, soft, loud, soft, four times a second. Piano tuners listen for exactly this wobble and adjust a string until it disappears.",
    },
    {
      type: "text",
      content:
        "**The derivation.** At your ear the two tones add. Take equal amplitudes and use the sum-to-product identity from trigonometry, $\\sin P + \\sin Q = 2\\cos\\frac{P - Q}{2}\\sin\\frac{P + Q}{2}$:",
    },
    {
      type: "math",
      latex: "y = A\\sin 2\\pi f_1 t + A\\sin 2\\pi f_2 t = \\underbrace{2A\\cos\\big(\\pi(f_1 - f_2)t\\big)}_{\\text{slow envelope}}\\;\\sin\\big(\\pi(f_1 + f_2)t\\big)",
    },
    {
      type: "text",
      content:
        "The fast factor oscillates at the average frequency $\\frac{f_1 + f_2}{2}$ (258 Hz): that is the pitch you hear. The slow factor is an envelope that swells and shrinks. The envelope $\\cos(\\pi\\Delta f\\,t)$ has frequency $\\Delta f/2$, but loudness depends on the *size* of the envelope, and $|\\cos|$ peaks twice per cosine cycle (at $+1$ and at $-1$). So the sound gets loud $|f_1 - f_2|$ times a second.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Beats",
      content:
        "When two sounds of slightly different frequencies $f_1$ and $f_2$ superpose, the loudness waxes and wanes periodically.\n**Beat frequency** $f_{\\text{beat}} = |f_1 - f_2|$ (loud moments per second). **Heard pitch** $\\dfrac{f_1 + f_2}{2}$.\nThe ear separates beats only up to about 10 per second; with larger differences you hear two separate tones or roughness.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "beats",
        f1: 10,
        f2: 12,
        sliders: ["f1", "f2"],
        caption:
          "Slowed-down tones of 10 Hz and 12 Hz, and their sum with its dashed envelope. Count the loud bulges per second.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: two loud bulges per second, matching $|12 - 10| = 2$. Bring $f_2$ closer to $f_1$ and the bulges spread apart; make them equal and the beats disappear completely. Notice that the dashed envelope completes one full cosine cycle for every *two* bulges.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "beats",
        f1: 256,
        f2: 260,
        sliders: ["f1", "f2"],
        ranges: {
          f1: { min: 250, max: 270, step: 1 },
          f2: { min: 250, max: 270, step: 1 },
        },
        caption:
          "Real tuning-fork numbers: 256 Hz and 260 Hz. The individual oscillations are now a blur, but the envelope still pulses 4 times a second.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the beat readout is $|256 - 260| = 4$ Hz. Move $f_2$ to 252 Hz and it is still 4 Hz: the beat frequency alone cannot tell you which fork is higher. That ambiguity is what the tuning-fork tricks below resolve.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Method: which fork is higher?",
      content:
        "**Loading** a fork with wax (or attaching anything) adds mass and **lowers** its frequency. **Filing** a prong removes mass and **raises** it. Try both candidate frequencies: see which one makes the beat frequency change the way the problem says.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (JEE Main).** Fork A (256 Hz) gives 4 beats/s with fork B. When B is loaded with a little wax, the beat rate rises to 6/s. Find B's original frequency.\n\n1. Candidates: $f_B = 256 \\pm 4$, i.e. 252 Hz or 260 Hz.\n2. Wax lowers $f_B$. If $f_B = 260$, lowering it moves it *towards* 256 and the beats would fall. If $f_B = 252$, lowering it to 250 gives 6 beats. *Why this step:* test each candidate against the direction of change.\n3. $f_B = 252$ Hz.\n\n**Worked example 2 (filing).** A fork of unknown frequency gives 5 beats/s with a 300 Hz fork. After it is filed slightly, the beats drop to 3/s. Find its original frequency.\n\n1. Candidates: 295 Hz or 305 Hz.\n2. Filing raises the frequency. From 295 Hz a small rise (to 297 Hz) gives 3 beats. ✓ From 305 Hz a rise would increase the beats. ✗\n3. Original frequency 295 Hz.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (piano tuning).** A tuner hears 2 beats/s between a piano string and a 440 Hz fork. Tightening the string slightly makes the beats slower. What was the string's frequency?\n\n1. Candidates: 438 Hz or 442 Hz.\n2. Tightening raises the frequency ($f \\propto \\sqrt T$, from 1.6). Moving towards 440 Hz reduces the beats, so the string was below: 438 Hz.\n3. The tuner keeps tightening until the beats vanish.\n\n**Worked example 4 (beats from two pipes).** Two open pipes of lengths 50 cm and 51 cm sound their fundamentals together. How many beats per second are heard? ($v = 340$ m/s, ignore end corrections)\n\n1. $f_1 = 340/(2 \\times 0.50) = 340$ Hz and $f_2 = 340/(2 \\times 0.51) \\approx 333.3$ Hz.\n2. $f_{\\text{beat}} \\approx 6.7$ Hz. *Why this step:* compute each frequency, then subtract; a small length difference gives a small, countable beat rate.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"beat frequency is half the difference\"",
      content:
        "The envelope $\\cos(\\pi\\Delta f\\,t)$ does have frequency $\\Delta f/2$, but the ear hears loudness, which peaks whenever the envelope is at $+1$ **or** $-1$. That happens twice per envelope cycle, so the number of loud moments per second is the full difference $|f_1 - f_2|$.",
    },
    {
      type: "quiz",
      id: "owt2-5-q1",
      variant: "practice",
      question: "Two tuning forks of 384 Hz and 387 Hz are sounded together. What do you hear?",
      options: [
        { text: "A tone of 385.5 Hz whose loudness pulses 3 times a second", correct: true, feedback: "Pitch is the average, beat frequency the difference." },
        { text: "A tone of 385.5 Hz pulsing 1.5 times a second", feedback: "1.5 Hz is the envelope's cosine frequency; loudness peaks twice per cycle, giving 3 beats/s." },
        { text: "A tone of 3 Hz", feedback: "3 Hz is the beat rate, far below hearing; the pitch you hear is near 385 Hz." },
        { text: "Two clearly separate tones of 384 Hz and 387 Hz", feedback: "Frequencies this close fuse into one tone with beats." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-5-q2",
      variant: "practice",
      question: "Fork P (512 Hz) gives 6 beats/s with fork Q. Q is loaded with wax and the beats drop to 2/s. What was Q's original frequency?",
      options: [
        { text: "506 Hz", feedback: "Lowering 506 Hz moves it further from 512 Hz, so the beats would increase." },
        { text: "514 Hz", feedback: "514 Hz is Q *after* waxing. The question asks for the original." },
        { text: "510 Hz", feedback: "That would give 2 beats before waxing, not 6." },
        { text: "518 Hz", correct: true, feedback: "Wax lowers Q. From 518 Hz a drop to 514 Hz gives 2 beats. From 506 Hz a drop would increase the beats." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-5-q3",
      variant: "practice",
      question: "Two sources of 200 Hz and 205 Hz sound together. How long is it between successive loud moments?",
      options: [
        { text: "5 s", feedback: "5 is the number of beats per second; the time between them is $1/5$ s." },
        { text: "0.005 s", feedback: "That is the period of the 200 Hz tone itself." },
        { text: "0.2 s", correct: true, feedback: "5 beats per second, so one every $1/5$ s." },
        { text: "0.4 s", feedback: "That is the envelope's cosine period. Loudness peaks twice in it." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-5-q4",
      variant: "practice",
      question: "A fork of unknown frequency gives 4 beats/s with a 250 Hz fork. When the unknown fork's prong is filed, the beats increase. What was its frequency?",
      options: [
        { text: "It cannot be decided.", feedback: "The direction of the change in beats decides it." },
        { text: "254 Hz", correct: true, feedback: "Filing raises the frequency; starting at 254 Hz moves it further from 250 Hz, increasing the beats." },
        { text: "246 Hz", feedback: "Raising 246 Hz brings it closer to 250 Hz, so the beats would decrease." },
        { text: "250 Hz", feedback: "Then there would be no beats at the start." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "doppler-effect",
  title: "2.6 · The Doppler Effect",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "An ambulance races past with its siren on. As it approaches, the siren sounds high; the instant it passes, the pitch drops sharply, 'neee-yowww'. The siren itself never changed. What changed is how often its pressure crests reach your ear, because the source was moving. This is the **Doppler effect**, and the same physics lets police radar measure speeds and astronomers measure how fast galaxies recede.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-wave-lab",
        mode: "doppler",
        waveSpeed: 340,
        sourceFrequency: 500,
        sourceSpeed: 40,
        observerSpeed: 0,
        sliders: ["sourceSpeed", "observerSpeed"],
        caption:
          "Wavefronts from a 500 Hz source moving right; v = 340 m/s. Press Play and compare the spacing of the crests ahead of the source and behind it.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: each wavefront is a circle centred on where the source was when it emitted that crest. Because the source keeps moving, the circles crowd together ahead of it and spread apart behind. The observer ahead reads a shorter wavelength and higher frequency; the one behind, longer and lower. Give the observer a speed towards the source and their frequency rises further, even though the wavelength they meet is unchanged. Push $v_s$ past 340 m/s and the fronts pile into a cone: a shock wave.",
    },
    {
      type: "text",
      content:
        "**Moving source.** The source emits a crest every $T = 1/f$ seconds. In that time the previous crest has moved $vT$ ahead, but the source has also moved $v_sT$ in the same direction. So the crests ahead are only $(v - v_s)T$ apart:",
    },
    { type: "math", latex: "\\lambda' = \\frac{v - v_s}{f} \\qquad\\Longrightarrow\\qquad f' = \\frac{v}{\\lambda'} = f\\,\\frac{v}{v - v_s} \\quad (\\text{source approaching})" },
    {
      type: "text",
      content:
        "**Moving observer.** Now the air and the source are still, so the wavelength is the ordinary $\\lambda = v/f$. An observer moving towards the source at $v_o$ meets crests at the relative speed $v + v_o$, so the rate of meeting crests is",
    },
    { type: "math", latex: "f' = \\frac{v + v_o}{\\lambda} = f\\,\\frac{v + v_o}{v} \\quad (\\text{observer approaching})" },
    {
      type: "text",
      content:
        "The two effects are physically different (the source changes the wavelength in the air; the observer changes the rate of meeting crests without changing the wavelength), and they combine by multiplication:",
    },
    { type: "math", latex: "f' = f\\,\\frac{v + v_o}{v - v_s}" },
    {
      type: "callout",
      variant: "definition",
      title: "Sign convention",
      content:
        "Use $f' = f\\,\\dfrac{v + v_o}{v - v_s}$ with $v_o$ and $v_s$ **positive when each moves towards the other** (the choice that raises the frequency) and negative when moving away. All speeds are relative to the **air**.\nCheck every answer: approaching must give $f' > f$, receding $f' < f$.",
    },
    {
      type: "text",
      content:
        "**Extensions.** *Wind:* the sound moves at $v + w$ relative to the ground if the wind $w$ blows from source to observer; replace $v$ by $v \\pm w$. *Angle:* only the velocity component along the line joining source and observer counts: use $v_s\\cos\\theta$. *Reflection from a moving wall:* do it in two steps: the wall first receives the sound as an observer, then re-emits that frequency as a moving source. *Sonic boom:* when $v_s \\ge v$ the formula breaks down; the wavefronts pile up into a cone of half-angle $\\sin\\theta = v/v_s$, heard as a boom.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (ambulance, JEE Main).** An ambulance siren of 500 Hz moves at 20 m/s past a stationary listener. What frequencies are heard before and after it passes? ($v = 340$ m/s)\n\n1. Approaching: $f' = 500 \\times \\dfrac{340}{340 - 20} = 500 \\times \\dfrac{340}{320} = 531.25$ Hz.\n2. Receding: $v_s = -20$: $f' = 500 \\times \\dfrac{340}{360} \\approx 472.2$ Hz. *Why this step:* moving away is the same formula with the sign of $v_s$ flipped.\n3. The pitch drops by about 59 Hz as it passes, roughly two semitones.\n\n**Worked example 2 (cyclist and car).** A car sounding a 400 Hz horn approaches a cyclist at 20 m/s while the cyclist rides towards the car at 10 m/s. What does the cyclist hear?\n\n1. Both move towards each other: $v_o = +10$, $v_s = +20$.\n2. $f' = 400 \\times \\dfrac{340 + 10}{340 - 20} = 400 \\times \\dfrac{350}{320} = 437.5$ Hz.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (bat and wall).** A bat flies towards a wall at 10 m/s emitting 40 kHz. What frequency does it hear in the echo? ($v = 340$ m/s)\n\n1. The wall as observer (at rest) receives $f_1 = 40 \\times \\dfrac{340}{340 - 10} = 40 \\times \\dfrac{340}{330}$ kHz. *Why this step:* a reflector is first an observer, then a source.\n2. The wall re-emits $f_1$ as a stationary source; the bat is an observer moving towards it: $f_2 = f_1 \\times \\dfrac{340 + 10}{340}$.\n3. Combine: $f_2 = 40 \\times \\dfrac{350}{330} \\approx 42.4$ kHz. The bat reads its closing speed from this 2.4 kHz shift.\n\n**Worked example 4 (beats between direct and reflected sound, JEE Advanced).** A train moves away from a stationary listener towards a cliff at 5 m/s, sounding a 680 Hz whistle. The listener hears the whistle directly and also its echo from the cliff. What beat frequency does the listener hear? ($v = 340$ m/s)\n\n1. Direct sound, source receding: $f_1 = 680 \\times \\dfrac{340}{345} \\approx 670.1$ Hz.\n2. Echo: the cliff receives the whistle from a source approaching it, $f_2 = 680 \\times \\dfrac{340}{335} \\approx 690.1$ Hz, and reflects it unchanged towards the listener (cliff and listener are both at rest). *Why this step:* the reflected wave carries the frequency the cliff received.\n3. Beats: $690.1 - 670.1 \\approx 20$ per second. For slow sources this is about $2fv_s/v = 2 \\times 680 \\times 5/340 = 20$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"moving the observer or the source at the same speed gives the same shift\"",
      content:
        "With $v = 340$ m/s and a speed of 34 m/s: a source approaching a still listener gives $f' = f \\times 340/306 = 1.111f$, while a listener approaching a still source gives $f' = f \\times 374/340 = 1.100f$. Different, because a moving source changes the wavelength in the air and a moving observer does not. (For light, which needs no medium, only the relative speed matters; for sound, the air is a preferred frame.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the pitch rises steadily as the source approaches\"",
      content:
        "For a source moving straight at you at constant speed, $f' = fv/(v - v_s)$ is **constant**: a steady high pitch that suddenly drops to a steady low pitch as it passes. What does change as it approaches is the *loudness*. The gliding pitch you hear from a passing car happens because it passes to one side, so the component of its velocity along your line of sight changes smoothly from $+v_s$ to $-v_s$.",
    },
    {
      type: "quiz",
      id: "owt2-6-q1",
      variant: "practice",
      question: "A source of 600 Hz moves away from a stationary observer at 40 m/s. What frequency is heard? ($v = 340$ m/s)",
      options: [
        { text: "about 537 Hz", correct: true, feedback: "$600 \\times \\frac{340}{340 + 40} = 600 \\times \\frac{340}{380} \\approx 536.8$ Hz." },
        { text: "680 Hz", feedback: "That is the approaching value, $600 \\times 340/300$. Receding lowers the frequency." },
        { text: "about 529 Hz", feedback: "That is $600 \\times (340 - 40)/340$, the formula for a *receding observer*. Here the source moves." },
        { text: "600 Hz", feedback: "Relative motion along the line of sight always shifts the frequency." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-6-q2",
      variant: "practice",
      question: "A listener moves at 20 m/s towards a stationary 340 Hz source. What frequency does she hear? ($v = 340$ m/s)",
      options: [
        { text: "about 361.25 Hz", feedback: "That uses the moving-source formula, $340 \\times 340/320$. The source is still here." },
        { text: "320 Hz", feedback: "Moving towards the source raises the frequency." },
        { text: "340 Hz", feedback: "The listener meets crests more often, so the frequency rises." },
        { text: "360 Hz", correct: true, feedback: "$340 \\times \\frac{340 + 20}{340} = 360$ Hz." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-6-q3",
      variant: "practice",
      question: "A car approaches a stationary wall at 20 m/s, sounding a 500 Hz horn. What frequency does the driver hear in the echo? ($v = 340$ m/s)",
      options: [
        { text: "529.4 Hz", feedback: "That applies only the observer shift $360/340$. The source is moving too." },
        { text: "500 Hz", feedback: "The echo is shifted twice: once on the way to the wall, once on the way back." },
        { text: "562.5 Hz", correct: true, feedback: "$f'' = 500 \\times \\frac{340 + 20}{340 - 20} = 500 \\times \\frac{360}{320} = 562.5$ Hz." },
        { text: "531.25 Hz", feedback: "That is the frequency the wall receives. The driver, moving towards the wall, hears it shifted up again." },
      ],
      hint: "Treat the wall first as an observer, then as a stationary source.",
    },
    {
      type: "quiz",
      id: "owt2-6-q4",
      variant: "concept",
      question: "A train approaches a station along a straight track at constant speed, whistling. What does a person standing on the track (well ahead) hear?",
      options: [
        { text: "A pitch lower than the whistle's", feedback: "Lower pitch is heard only after the train has passed and is receding." },
        { text: "A constant pitch higher than the whistle's, getting louder", correct: true, feedback: "With constant velocity along the line of sight, $f' = fv/(v - v_s)$ does not change; only the loudness grows." },
        { text: "A pitch that rises steadily as the train gets closer", feedback: "The Doppler shift depends on velocity, not distance." },
        { text: "The true pitch of the whistle", feedback: "An approaching source is always heard higher." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-6-q5",
      variant: "practice",
      question: "A source moves at 30 m/s along a road. An observer stands beside the road so that, at some instant, the source's velocity makes $60^\\circ$ with the line joining it to the observer, approaching. The source frequency is 660 Hz. What frequency is heard from sound emitted at that instant? ($v = 330$ m/s)",
      options: [
        { text: "about 691 Hz", correct: true, feedback: "Only the component $30\\cos 60^\\circ = 15$ m/s counts: $660 \\times \\frac{330}{315} \\approx 691.4$ Hz." },
        { text: "726 Hz", feedback: "That uses the full 30 m/s. Only the component along the line of sight matters." },
        { text: "660 Hz", feedback: "The source has a velocity component towards the observer, so there is a shift." },
        { text: "about 631 Hz", feedback: "That is $660 \\times 330/345$, the receding value. The source is approaching (the angle is less than $90^\\circ$), so the frequency must rise." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below comes from the string picture carried into air: stiffness over inertia for the speed, boundaries choosing the wavelengths, superposition for beats, and crests bunched or spread by motion.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 2 in 8 lines",
      content:
        "1. Sound is longitudinal; $\\Delta p = -B\\,\\partial s/\\partial x$, so pressure is $90^\\circ$ out of phase with displacement and $\\Delta p_0 = Bks_0$.\n2. $v = \\sqrt{B/\\rho}$; for a gas the compressions are adiabatic, $B = \\gamma p$, so $v = \\sqrt{\\gamma RT/M}$: $\\propto\\sqrt T$, independent of $p$.\n3. $I = \\Delta p_0^2/2\\rho v \\propto s_0^2f^2$; point source $I = P/4\\pi r^2$.\n4. $\\beta = 10\\log_{10}(I/I_0)$: ×10 is +10 dB, ×2 is +3 dB.\n5. Closed end = displacement node, open end = displacement antinode (plus end correction $\\approx 0.6r$).\n6. Open pipe $nv/2L$ (all harmonics), closed pipe $(2n - 1)v/4L$ (odd only); resonance tube $v = 2f(\\ell_2 - \\ell_1)$.\n7. Beats: $f_{\\text{beat}} = |f_1 - f_2|$; wax lowers a fork, filing raises it.\n8. Doppler: $f' = f\\dfrac{v + v_o}{v - v_s}$ (towards positive, speeds relative to air); reflectors are observer then source.",
    },
    {
      type: "quiz",
      id: "owt2-7-q1",
      variant: "mastery",
      question: "A sound wave in air ($B = 1.4 \\times 10^5$ Pa) has wavelength 0.5 m and pressure amplitude 14 Pa. What is its displacement amplitude?",
      options: [
        { text: "$5 \\times 10^{-5}$ m", feedback: "That uses $k = 2$ (i.e. $1/\\lambda$). $k = 2\\pi/\\lambda = 4\\pi$ rad/m." },
        { text: "$10^{-4}$ m", feedback: "That is $\\Delta p_0/B$ without dividing by $k$." },
        { text: "about $1.3 \\times 10^{-6}$ m", feedback: "Check $k$: that value corresponds to $k = 24\\pi$, i.e. $\\lambda \\approx 8$ cm." },
        { text: "about $8 \\times 10^{-6}$ m", correct: true, feedback: "$k = 2\\pi/0.5 = 4\\pi$; $s_0 = \\frac{14}{1.4 \\times 10^5 \\times 4\\pi} = \\frac{10^{-4}}{4\\pi} \\approx 7.96 \\times 10^{-6}$ m." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q2",
      variant: "mastery",
      question: "At the same temperature, what is the ratio of the speed of sound in helium ($\\gamma = 5/3$, $M = 4$ g/mol) to that in hydrogen ($\\gamma = 7/5$, $M = 2$ g/mol)?",
      options: [
        { text: "$\\sqrt{\\dfrac{42}{25}} \\approx 1.30$", feedback: "That is inverted: helium is heavier, so sound is slower in it despite its larger $\\gamma$." },
        { text: "$\\dfrac{25}{42} \\approx 0.60$", feedback: "Take the square root: $v \\propto \\sqrt{\\gamma/M}$." },
        { text: "$\\dfrac{5}{\\sqrt{42}} \\approx 0.77$", correct: true, feedback: "$\\sqrt{\\frac{(5/3)/4}{(7/5)/2}} = \\sqrt{\\frac{5/12}{7/10}} = \\sqrt{\\frac{50}{84}} = \\sqrt{\\frac{25}{42}}$." },
        { text: "$\\dfrac{1}{\\sqrt2} \\approx 0.71$", feedback: "That compares molar masses only; the $\\gamma$ values differ." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q3",
      variant: "mastery",
      question: "The intensity level at a point rises from 50 dB to 70 dB. By what factor does the pressure amplitude increase?",
      options: [
        { text: "1.4", feedback: "$70/50 = 1.4$ compares the levels, not the amplitudes." },
        { text: "10", correct: true, feedback: "+20 dB is ×100 in intensity, and $\\Delta p_0 \\propto \\sqrt I$." },
        { text: "100", feedback: "That is the intensity factor. Pressure amplitude goes as its square root." },
        { text: "20", feedback: "Decibels are logarithms; 20 dB is not a factor of 20." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q4",
      variant: "mastery",
      question: "An open pipe has its second harmonic at 400 Hz. One end is now closed. What is the frequency of the first overtone of the closed pipe?",
      options: [
        { text: "300 Hz", correct: true, feedback: "Open: $2v/2L = 400$, so $v/2L = 200$ and $v/4L = 100$ Hz. The closed pipe's first overtone is $3 \\times 100 = 300$ Hz." },
        { text: "200 Hz", feedback: "200 Hz is the closed pipe's second harmonic, which does not exist." },
        { text: "600 Hz", feedback: "That is the open pipe's third harmonic. Closing one end halves the fundamental first." },
        { text: "100 Hz", feedback: "100 Hz is the closed pipe's fundamental, not its first overtone." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q5",
      variant: "mastery",
      question: "With a 500 Hz fork, a resonance tube resonates at 16.2 cm and 50.2 cm. Find the speed of sound and the end correction.",
      options: [
        { text: "170 m/s, 0.8 cm", feedback: "Successive resonances are $\\lambda/2$ apart, so $\\lambda = 68$ cm, not 34 cm." },
        { text: "340 m/s, 1.6 cm", feedback: "$\\ell_2 - 3\\ell_1 = 1.6$ cm must be halved: $e = 0.8$ cm." },
        { text: "324 m/s, 0", feedback: "That uses $\\lambda = 4\\ell_1$, ignoring the end correction." },
        { text: "340 m/s, 0.8 cm", correct: true, feedback: "$\\lambda = 2 \\times 34 = 68$ cm, $v = 500 \\times 0.68 = 340$ m/s; $e = (50.2 - 48.6)/2 = 0.8$ cm." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q6",
      variant: "mastery",
      question: "A pipe 42.5 cm long, closed at one end, is in unison with the fundamental of a 1 m wire fixed at both ends with $\\mu = 1$ g/m. What is the tension in the wire? ($v_{\\text{sound}} = 340$ m/s)",
      options: [
        { text: "0.4 N", feedback: "That is $\\mu v = 0.001 \\times 400$. The tension is $\\mu v^2 = 0.001 \\times 160000$." },
        { text: "640 N", feedback: "That uses $v = 800$ m/s. The pipe's fundamental is $v/4L$, which is 200 Hz, so the wire speed is $2 \\times 1 \\times 200$." },
        { text: "160 N", correct: true, feedback: "Pipe: $340/(4 \\times 0.425) = 200$ Hz. Wire: $v = 2Lf = 400$ m/s, so $T = \\mu v^2 = 0.001 \\times 160000 = 160$ N." },
        { text: "40 N", feedback: "That uses $v = 200$ m/s on the wire. For a fixed–fixed wire $\\lambda = 2L$, so $v = 2Lf = 400$ m/s." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q7",
      variant: "mastery",
      question: "Fork P (512 Hz) gives 5 beats/s with fork Q. When Q is filed, the beats become 7/s. What was Q's frequency?",
      options: [
        { text: "505 Hz", feedback: "That would give 7 beats before filing, not 5." },
        { text: "517 Hz", correct: true, feedback: "Filing raises Q. From 517 Hz a rise to 519 Hz gives 7 beats. From 507 Hz a rise would reduce the beats." },
        { text: "507 Hz", feedback: "Raising 507 Hz moves it towards 512 Hz, so the beats would fall." },
        { text: "519 Hz", feedback: "That is Q after filing." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q8",
      variant: "mastery",
      question: "A source moves at $v/10$ (with $v$ the speed of sound) straight past a stationary observer. What is the ratio of the frequency heard while it approaches to that heard while it recedes?",
      options: [
        { text: "$11/9$", correct: true, feedback: "$\\frac{v/(v - v/10)}{v/(v + v/10)} = \\frac{1.1}{0.9} = \\frac{11}{9}$." },
        { text: "$10/9$", feedback: "That is only the approaching factor over the true frequency." },
        { text: "$1.21$", feedback: "That squares the observer-style factor $1.1$; for a moving source the factors are $\\frac{1}{0.9}$ and $\\frac{1}{1.1}$." },
        { text: "$1$", feedback: "The pitch drops noticeably as the source passes." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q9",
      variant: "mastery",
      question: "A stationary source of 1000 Hz sends sound towards a car approaching it at 20 m/s. A detector beside the source picks up the sound reflected from the car. What frequency does it detect? ($v = 340$ m/s)",
      options: [
        { text: "about 1059 Hz", feedback: "That is only the first step, what the car receives." },
        { text: "about 1118 Hz", feedback: "That uses $1 + 2u/v$, the small-speed approximation. The exact answer is $\\frac{v + u}{v - u} = \\frac{360}{320}$." },
        { text: "about 889 Hz", feedback: "An approaching reflector raises the frequency." },
        { text: "1125 Hz", correct: true, feedback: "The car hears $1000 \\times 360/340$ as an observer, then re-emits as a source approaching: $\\times 340/320$. Total $1000 \\times 360/320 = 1125$ Hz." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q10",
      variant: "mastery",
      question: "A whistle of 400 Hz is whirled in a horizontal circle at a constant speed of 20 m/s. A listener stands far away in the plane of the circle. What are the highest and lowest frequencies heard? ($v = 340$ m/s)",
      options: [
        { text: "425 Hz and 400 Hz", feedback: "400 Hz is heard when the velocity is perpendicular to the line of sight; that is neither extreme." },
        { text: "400 Hz throughout, since the distance to the listener hardly changes", feedback: "The Doppler shift depends on the velocity component along the line of sight, which swings between $+20$ and $-20$ m/s." },
        { text: "425 Hz and about 378 Hz", correct: true, feedback: "Max when moving straight towards: $400 \\times 340/320 = 425$ Hz. Min when moving straight away: $400 \\times 340/360 \\approx 377.8$ Hz." },
        { text: "about 423.5 Hz and 376.5 Hz", feedback: "That is $400(1 \\pm 20/340)$, the moving-observer form. The whistle is the moving source: $400 \\times \\frac{340}{340 \\mp 20}$." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q11",
      variant: "mastery",
      question: "Two identical open pipes each sound 300 Hz at 27 °C. One pipe is warmed to 33 °C. About how many beats per second are now heard?",
      options: [
        { text: "0", feedback: "The warmer pipe has faster sound, so its frequency rises." },
        { text: "3", correct: true, feedback: "$f \\propto v \\propto \\sqrt T$: $300\\sqrt{306/300} = 300\\sqrt{1.02} \\approx 303$ Hz, so about 3 beats/s." },
        { text: "6", feedback: "That uses $f \\propto T$. Frequency goes as $\\sqrt T$, so a 2% rise in $T$ gives about 1% in $f$." },
        { text: "About 67", feedback: "That scales $f$ with the Celsius temperature ratio $33/27$ ($300 \\to 367$ Hz). Use kelvin and a square root." },
      ],
    },
    {
      type: "quiz",
      id: "owt2-7-q12",
      variant: "mastery",
      question: "A bat flying at 5 m/s towards a wall emits 34 kHz. What beat frequency does it hear between its emitted sound and the echo? ($v = 340$ m/s)",
      options: [
        { text: "about 1.01 kHz", correct: true, feedback: "Echo: $34 \\times \\frac{345}{335} \\approx 35.01$ kHz. Beats with its own 34 kHz: about 1.01 kHz (≈ $2fv_b/v = 1$ kHz)." },
        { text: "0.5 kHz", feedback: "That counts only one Doppler step. The sound is shifted going to the wall and again coming back." },
        { text: "about 35.0 kHz", feedback: "That is the echo frequency itself; the beat frequency is its difference from 34 kHz." },
        { text: "No beats: the echo has the same frequency.", feedback: "The bat moves towards the wall, so the echo is shifted up." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Chapter 3 leaves waves for matter in bulk: the moduli that made $v = \\sqrt{B/\\rho}$ and $\\sqrt{Y/\\rho}$ work, fluids that press and flow, and the surface skins of liquids.",
    },
  ]),
};

export const owtChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
