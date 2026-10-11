"use client";

import { useState } from "react";
import type { z } from "zod";
import type { emWaveLabSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { sciLatex, sigText } from "./em-format";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex } from "./vec-canvas-2d";

type Config = z.infer<typeof emWaveLabSchema>;
type Mode = Config["mode"];
type Readout = NonNullable<Config["readouts"]>[number];
type V2 = [number, number];

const C = 3e8;
const EPS0 = 8.85e-12;
const H_PLANCK = 6.63e-34;
const E_CHARGE = 1.6e-19;
const DEG = Math.PI / 180;
const W = 400;

const DEFAULT_READOUTS: Record<Mode, Readout[]> = {
  wave: ["fields", "equation", "speed"],
  spectrum: ["band", "photon", "uses"],
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  wave:
    "Drag ωt and watch the pattern slide along x. E (blue) and B (orange, drawn as cB) rise and fall together, at right angles to each other and to the direction of travel.",
  spectrum:
    "Slide along the spectrum. Every band is the same kind of wave travelling at c; only the wavelength (and so the frequency and photon energy) changes.",
};

const UNIT_SCALE = { nm: 1e-9, um: 1e-6, mm: 1e-3, cm: 1e-2, m: 1 } as const;
const UNIT_TEXT = { nm: "nm", um: "μm", mm: "mm", cm: "cm", m: "m" } as const;

type Line = { key: string; latex: string; note?: string };

function Readouts({ lines }: { lines: Line[] }) {
  if (lines.length === 0) return null;
  return (
    <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
      {lines.map((l) => (
        <div key={l.key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="overflow-x-auto">
            <Latex latex={l.latex} />
          </span>
          {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
        </div>
      ))}
    </div>
  );
}

function Footer({ text, onReset }: { text: string; onReset: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs text-muted-foreground">
        <RichText text={text} />
      </p>
      <button type="button" onClick={onReset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
        Reset
      </button>
    </div>
  );
}

/** A wavelength in metres as plain text with a sensible unit. */
function lengthText(m: number): string {
  const a = Math.abs(m);
  if (a >= 1e3) return `${sigText(m / 1e3)} km`;
  if (a >= 1) return `${sigText(m)} m`;
  if (a >= 1e-2) return `${sigText(m * 100)} cm`;
  if (a >= 1e-3) return `${sigText(m * 1e3)} mm`;
  if (a >= 1e-6) return `${sigText(m * 1e6)} μm`;
  if (a >= 1e-9) return `${sigText(m * 1e9)} nm`;
  return `${sigText(m * 1e12)} pm`;
}

// ---------- wave mode ----------

function WaveView({ config }: { config: Config }) {
  const [E0, setE0] = useState(config.amplitude.initial);
  const [lam, setLam] = useState(config.wavelength.initial);
  const [n, setN] = useState(config.refractiveIndex.initial);
  const [wt, setWt] = useState(0);
  const [dir, setDir] = useState<Config["direction"]>(config.direction);
  const [pol, setPol] = useState<Config["polarisation"]>(config.polarisation);

  const unit = config.wavelengthUnit;
  const lam0 = lam * UNIT_SCALE[unit]; // vacuum wavelength, m
  const v = C / n;
  const lamMed = lam0 / n;
  const f = C / lam0;
  const omega = 2 * Math.PI * f;
  const k = (2 * Math.PI) / lamMed;
  const B0 = E0 / v;
  const s = dir === "+x" ? 1 : -1;
  // B̂ = k̂ × Ê: k = ±x; E = y gives B = ±z, E = z gives B = ∓y
  const bSign = pol === "y" ? s : -s;
  const eAxis = pol;
  const bAxis = pol === "y" ? "z" : "y";

  // ---------- picture (oblique projection) ----------
  const Hs = 250;
  const ox = 40;
  const oy = 125;
  const len = 330;
  const zdir: V2 = [-0.62, 0.42]; // screen direction of +z
  const amp = 72;
  const ampB = 72 * 0.8;
  const span = 2; // vacuum wavelengths shown
  const cycles = span * n;
  const phaseAt = (xi: number) => 2 * Math.PI * cycles * xi - s * wt * DEG; // kx ∓ ωt, xi ∈ [0,1]
  const yAxisPt = (x: number, val: number): V2 => [x, oy - val];
  const zAxisPt = (x: number, val: number): V2 => [x + zdir[0] * val, oy + zdir[1] * val];
  const ePt = (x: number, val: number) => (eAxis === "y" ? yAxisPt(x, val) : zAxisPt(x, val));
  const bPt = (x: number, val: number) => (bAxis === "y" ? yAxisPt(x, val) : zAxisPt(x, val));
  const ampE = eAxis === "y" ? amp : amp * 0.8;
  const ampBpx = bAxis === "y" ? amp : ampB;
  // keep small amplitudes visible: the drawing scale is 30–100% of full height
  const eScale = 0.3 + (0.7 * E0) / config.amplitude.max;

  const N = 160;
  const ePath: string[] = [];
  const bPath: string[] = [];
  for (let i = 0; i <= N; i++) {
    const xi = i / N;
    const x = ox + len * xi;
    const sn = Math.sin(phaseAt(xi));
    const pe = ePt(x, ampE * eScale * sn);
    const pb = bPt(x, ampBpx * eScale * sn * bSign);
    ePath.push(`${i === 0 ? "M" : "L"}${pe[0].toFixed(1)} ${pe[1].toFixed(1)}`);
    bPath.push(`${i === 0 ? "M" : "L"}${pb[0].toFixed(1)} ${pb[1].toFixed(1)}`);
  }
  const stems = 32;
  const stemLines: { e: [V2, V2]; b: [V2, V2] }[] = [];
  for (let i = 0; i <= stems; i++) {
    const xi = i / stems;
    const x = ox + len * xi;
    const sn = Math.sin(phaseAt(xi));
    stemLines.push({
      e: [ePt(x, 0), ePt(x, ampE * eScale * sn)],
      b: [bPt(x, 0), bPt(x, ampBpx * eScale * sn * bSign)],
    });
  }
  // probe at 3/8 of a medium wavelength from the start
  const xiP = 0.375 / cycles;
  const xP = ox + len * xiP;
  const snP = Math.sin(phaseAt(xiP));
  const eTip = ePt(xP, ampE * eScale * snP);
  const bTip = bPt(xP, ampBpx * eScale * snP * bSign);
  const zEnd = zAxisPt(ox, 95);
  const yEnd = yAxisPt(ox, 100);

  // ---------- readouts ----------
  const readouts = config.readouts ?? DEFAULT_READOUTS.wave;
  const has = (key: Readout) => readouts.includes(key);
  const lines: Line[] = [];
  const minus = s === 1 ? "-" : "+";
  if (has("fields")) {
    lines.push({
      key: "B0",
      latex: `B_0 = \\frac{E_0}{v} = \\frac{${sigText(E0)}}{${sciLatex(v)}} = ${sciLatex(B0)}\\ \\text{T}`,
      note: n === 1 ? "in vacuum v = c" : `in the medium v = c/n`,
    });
  }
  if (has("equation")) {
    const bSignText = bSign === 1 ? "" : "-";
    lines.push({
      key: "eq",
      latex: `E_${eAxis} = ${sigText(E0)}\\sin(${sciLatex(k)}\\,x ${minus} ${sciLatex(omega)}\\,t)\\ \\text{V/m}`,
    });
    lines.push({
      key: "eqB",
      latex: `B_${bAxis} = ${bSignText}${sciLatex(B0)}\\sin(${sciLatex(k)}\\,x ${minus} ${sciLatex(omega)}\\,t)\\ \\text{T}`,
      note: `travels along ${dir}: E × B points along ${dir}`,
    });
  }
  if (has("speed")) {
    lines.push({
      key: "v",
      latex: `f = \\frac{c}{\\lambda_0} = ${sciLatex(f)}\\ \\text{Hz},\\quad v = \\frac{c}{n} = ${sciLatex(v)}\\ \\text{m/s},\\quad \\lambda = \\frac{\\lambda_0}{n}`,
      note: `λ in medium = ${lengthText(lamMed)}; f does not change`,
    });
  }
  const eps = n * n * EPS0; // non-magnetic medium
  const uAvg = 0.5 * eps * E0 * E0;
  const I = uAvg * v;
  if (has("energy")) {
    lines.push({
      key: "u",
      latex: `\\bar u = \\tfrac12\\varepsilon E_0^2 = ${sciLatex(uAvg)}\\ \\text{J/m}^3`,
      note: "shared equally: u_E = u_B",
    });
  }
  if (has("intensity")) {
    lines.push({ key: "I", latex: `I = \\bar u\\,v = ${sciLatex(I)}\\ \\text{W/m}^2` });
  }
  if (has("pressure")) {
    lines.push({
      key: "p",
      latex:
        n === 1
          ? `p_{\\text{absorb}} = \\frac{I}{c} = ${sciLatex(I / C)}\\ \\text{Pa},\\quad p_{\\text{reflect}} = \\frac{2I}{c} = ${sciLatex((2 * I) / C)}\\ \\text{Pa}`
          : `\\text{Set } n = 1 \\text{ for the radiation pressure on a surface in vacuum}`,
    });
  }

  const sliders = config.sliders ?? ["E0", "lambda", "n", "t"];
  function reset() {
    setE0(config.amplitude.initial);
    setLam(config.wavelength.initial);
    setN(config.refractiveIndex.initial);
    setWt(0);
    setDir(config.direction);
    setPol(config.polarisation);
  }

  const vArrowFrom: V2 = s === 1 ? [ox + len - 60, 26] : [ox + len - 10, 26];
  const vArrowTo: V2 = s === 1 ? [ox + len - 10, 26] : [ox + len - 60, 26];

  return (
    <InteractiveFrame title="Electromagnetic wave">
      <div className="overflow-x-auto text-center">
        <Latex latex={`E_0 = vB_0,\\qquad v = \\frac{1}{\\sqrt{\\mu\\varepsilon}} = \\frac{c}{n},\\qquad \\hat k = \\hat E\\times\\hat B`} display />
      </div>
      <svg viewBox={`0 0 ${W} ${Hs}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Electromagnetic wave">
        <line x1={ox} y1={oy} x2={ox + len + 8} y2={oy} className="stroke-foreground/60" strokeWidth={1} />
        <line x1={ox} y1={oy} x2={yEnd[0]} y2={yEnd[1]} className="stroke-foreground/30" strokeWidth={1} />
        <line x1={ox} y1={oy} x2={zEnd[0]} y2={zEnd[1]} className="stroke-foreground/30" strokeWidth={1} />
        <text x={ox + len + 10} y={oy + 4} className="fill-muted-foreground text-[10px]">
          x
        </text>
        <text x={yEnd[0] + 4} y={yEnd[1] + 4} className="fill-muted-foreground text-[10px]">
          y
        </text>
        <text x={zEnd[0] - 10} y={zEnd[1] + 4} className="fill-muted-foreground text-[10px]">
          z
        </text>
        {stemLines.map((st, i) => (
          <g key={i}>
            <line x1={st.e[0][0]} y1={st.e[0][1]} x2={st.e[1][0]} y2={st.e[1][1]} className="stroke-callout-info/40" strokeWidth={1} />
            <line x1={st.b[0][0]} y1={st.b[0][1]} x2={st.b[1][0]} y2={st.b[1][1]} className="stroke-callout-warning/40" strokeWidth={1} />
          </g>
        ))}
        <path d={ePath.join("")} fill="none" className="stroke-callout-info" strokeWidth={2} />
        <path d={bPath.join("")} fill="none" className="stroke-callout-warning" strokeWidth={2} />
        <ArrowSvg x1={xP} y1={oy} x2={eTip[0]} y2={eTip[1]} color="b" width={2.5} />
        <ArrowSvg x1={xP} y1={oy} x2={bTip[0]} y2={bTip[1]} color="aux" width={2.5} />
        <SvgLatex x={eTip[0] + 10} y={eTip[1] - 6} latex="\vec E" />
        <SvgLatex x={bTip[0] - 12} y={bTip[1] + 8} latex="\vec B" />
        <ArrowSvg x1={vArrowFrom[0]} y1={vArrowFrom[1]} x2={vArrowTo[0]} y2={vArrowTo[1]} color="result" width={2.5} />
        <SvgLatex x={(vArrowFrom[0] + vArrowTo[0]) / 2} y={12} latex="\vec v" />
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setDir(dir === "+x" ? "-x" : "+x")}
          className="rounded-md border bg-background px-2 py-1 text-xs"
        >
          Travel along {dir === "+x" ? "−x" : "+x"} instead
        </button>
        <button
          type="button"
          onClick={() => setPol(pol === "y" ? "z" : "y")}
          className="rounded-md border bg-background px-2 py-1 text-xs"
        >
          Make E oscillate along {pol === "y" ? "z" : "y"}
        </button>
      </div>
      <div className="space-y-2">
        {sliders.includes("t") && (
          <SliderRow label={<Latex latex="\omega t" />} value={wt} min={0} max={720} step={5} unit="°" onChange={setWt} />
        )}
        {sliders.includes("E0") && (
          <SliderRow
            label={<Latex latex="E_0" />}
            value={E0}
            min={config.amplitude.min}
            max={config.amplitude.max}
            step={config.amplitude.step}
            unit="V/m"
            onChange={setE0}
          />
        )}
        {sliders.includes("lambda") && (
          <SliderRow
            label={<Latex latex="\lambda_0" />}
            value={lam}
            min={config.wavelength.min}
            max={config.wavelength.max}
            step={config.wavelength.step}
            unit={UNIT_TEXT[unit]}
            onChange={(x) => setLam(Number(x.toPrecision(10)))}
          />
        )}
        {sliders.includes("n") && (
          <SliderRow
            label={<Latex latex="n" />}
            value={n}
            min={config.refractiveIndex.min}
            max={config.refractiveIndex.max}
            step={config.refractiveIndex.step}
            onChange={(x) => setN(Number(x.toPrecision(10)))}
          />
        )}
      </div>
      <Readouts lines={lines} />
      <Footer
        text={`${config.caption ?? DEFAULT_CAPTIONS.wave} The picture always shows ${sigText(span)} vacuum wavelengths of x; λ₀ is the wavelength in vacuum.`}
        onReset={reset}
      />
    </InteractiveFrame>
  );
}

// ---------- spectrum mode ----------

type Band = {
  name: string;
  lo: number; // log10 λ (m), short end
  hi: number; // long end
  cls: string;
  source: string;
  detect: string;
  uses: string;
};

const BANDS: Band[] = [
  {
    name: "Gamma rays",
    lo: -14,
    hi: -12,
    cls: "fill-callout-warning",
    source: "radioactive decay of nuclei",
    detect: "Geiger tubes, ionisation chambers",
    uses: "cancer radiotherapy, sterilising instruments",
  },
  {
    name: "X-rays",
    lo: -12,
    hi: -9,
    cls: "fill-callout-definition",
    source: "X-ray tubes (fast electrons hitting a metal target); inner-shell electrons",
    detect: "photographic film, Geiger tubes",
    uses: "medical imaging, crystal structure, airport scanners",
  },
  {
    name: "Ultraviolet",
    lo: -9,
    hi: Math.log10(4e-7),
    cls: "fill-primary",
    source: "the Sun, arc lamps, very hot bodies",
    detect: "photocells, photographic film",
    uses: "sterilising water, detecting forged notes, LASIK eye surgery",
  },
  {
    name: "Visible light",
    lo: Math.log10(4e-7),
    hi: Math.log10(7e-7),
    cls: "fill-callout-tip",
    source: "electrons in atoms dropping between energy levels",
    detect: "the eye, photocells, film",
    uses: "vision, photography, optical fibres",
  },
  {
    name: "Infrared",
    lo: Math.log10(7e-7),
    hi: -3,
    cls: "fill-callout-warning",
    source: "hot bodies; vibrating atoms and molecules",
    detect: "thermopiles, bolometers, IR photographic film",
    uses: "remote controls, night vision, physiotherapy, greenhouse effect",
  },
  {
    name: "Microwaves",
    lo: -3,
    hi: -1,
    cls: "fill-callout-info",
    source: "klystron, magnetron and Gunn diode",
    detect: "point-contact diodes",
    uses: "radar, microwave ovens, mobile and satellite links",
  },
  {
    name: "Radio waves",
    lo: -1,
    hi: 4,
    cls: "fill-muted-foreground",
    source: "accelerated electrons in aerials (antennas)",
    detect: "receiver aerials",
    uses: "AM/FM broadcasting, TV, mobile phones",
  },
];

function SpectrumView({ config }: { config: Config }) {
  const [ex, setEx] = useState(config.wavelengthExp.initial);
  const lo = -14;
  const hi = 4;
  const padL = 14;
  const padR = 14;
  const X = (e: number) => padL + ((e - lo) / (hi - lo)) * (W - padL - padR);
  const lam = 10 ** ex;
  const f = C / lam;
  const eV = (H_PLANCK * f) / E_CHARGE;
  const band = BANDS.find((b) => ex >= b.lo && ex < b.hi) ?? BANDS[BANDS.length - 1];

  const readouts = config.readouts ?? DEFAULT_READOUTS.spectrum;
  const has = (k: Readout) => readouts.includes(k);
  const lines: Line[] = [];
  if (has("band")) {
    lines.push({
      key: "band",
      latex: `\\lambda = ${sciLatex(lam)}\\ \\text{m},\\quad f = \\frac{c}{\\lambda} = ${sciLatex(f)}\\ \\text{Hz}`,
      note: `${band.name} (${lengthText(lam)})`,
    });
  }
  if (has("photon")) {
    lines.push({
      key: "E",
      latex: `E_{\\text{photon}} = \\frac{hc}{\\lambda} = ${sciLatex(eV)}\\ \\text{eV}`,
      note: "hc ≈ 1240 eV nm",
    });
  }
  if (has("uses")) {
    lines.push({ key: "src", latex: `\\text{Source: ${band.source}}` });
    lines.push({ key: "det", latex: `\\text{Detected by: ${band.detect}}` });
    lines.push({ key: "use", latex: `\\text{Uses: ${band.uses}}` });
  }
  const ticks = [-12, -9, -6, -3, 0, 3];
  const tickText: Record<number, string> = { [-12]: "1 pm", [-9]: "1 nm", [-6]: "1 μm", [-3]: "1 mm", 0: "1 m", 3: "1 km" };

  return (
    <InteractiveFrame title="The electromagnetic spectrum">
      <div className="overflow-x-auto text-center">
        <Latex latex={`c = f\\lambda = 3\\times 10^8\\ \\text{m/s for every band},\\qquad E = hf = \\frac{hc}{\\lambda}`} display />
      </div>
      <svg viewBox={`0 0 ${W} 120`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Electromagnetic spectrum">
        {BANDS.map((b) => (
          <g key={b.name}>
            <rect x={X(b.lo)} y={34} width={Math.max(1.5, X(b.hi) - X(b.lo))} height={30} className={b.cls} opacity={b === band ? 0.95 : 0.45} />
          </g>
        ))}
        {BANDS.map((b, i) => {
          const mid = (X(b.lo) + X(b.hi)) / 2;
          const narrow = X(b.hi) - X(b.lo) < 30;
          return (
            <text
              key={`t${b.name}`}
              x={mid}
              y={narrow ? (i % 2 === 0 ? 26 : 80) : 53}
              textAnchor="middle"
              className={`text-[9px] ${narrow ? "fill-muted-foreground" : "fill-background font-semibold"}`}
            >
              {b.name === "Visible light" ? "Vis" : b.name === "Ultraviolet" ? "UV" : b.name.split(" ")[0]}
            </text>
          );
        })}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={64} x2={X(t)} y2={70} className="stroke-foreground/60" strokeWidth={1} />
            <text x={X(t)} y={96} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {tickText[t]}
            </text>
          </g>
        ))}
        <text x={padL} y={112} className="fill-muted-foreground text-[9px]">
          ← higher frequency, more energetic photons
        </text>
        <text x={W - padR} y={112} textAnchor="end" className="fill-muted-foreground text-[9px]">
          longer wavelength →
        </text>
        <line x1={X(ex)} y1={20} x2={X(ex)} y2={72} className="stroke-foreground" strokeWidth={2} />
        <polygon points={`${X(ex)},20 ${X(ex) - 5},12 ${X(ex) + 5},12`} className="fill-foreground" />
      </svg>
      <SliderRow
        label={<Latex latex="\log_{10}\lambda" />}
        value={ex}
        min={config.wavelengthExp.min}
        max={config.wavelengthExp.max}
        step={config.wavelengthExp.step}
        onChange={(x) => setEx(Number(x.toPrecision(10)))}
      />
      <Readouts lines={lines} />
      <Footer
        text={`${config.caption ?? DEFAULT_CAPTIONS.spectrum} Band edges follow the usual textbook values; neighbouring bands overlap in practice and are named by their source.`}
        onReset={() => setEx(config.wavelengthExp.initial)}
      />
    </InteractiveFrame>
  );
}

export function EmWaveLab({ config }: { config: Config }) {
  if (config.mode === "spectrum") return <SpectrumView config={config} />;
  return <WaveView config={config} />;
}
