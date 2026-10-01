"use client";

import { useState } from "react";
import type { z } from "zod";
import type { ompQuantumLabSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof ompQuantumLabSchema>;
type Mode = Config["mode"];
type Range = Config["wavelength"];
type Particle = Config["particle"];

const W = 400;
/** hc in eV·nm, the JEE shortcut. */
const HC = 1240;
/** h/e in V per 10^14 Hz (h/e = 4.136 × 10^-15 V·s). */
const H_OVER_E_14 = 0.4136;
const PLANCK = 6.626e-34;
const E_CHARGE = 1.602e-19;

const fmt = (v: number, d = 2) => formatNumber(v, d);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** 1.23 \times 10^{-10} */
function sci(v: number, digits = 3): string {
  if (!Number.isFinite(v) || v === 0) return fmt(v);
  const exp = Math.floor(Math.log10(Math.abs(v)));
  const mant = v / 10 ** exp;
  const m = Number(mant.toFixed(digits - 1));
  if (Math.abs(m) >= 10) return `${fmt(m / 10, digits - 1)} \\times 10^{${exp + 1}}`;
  return exp === 0 ? fmt(m, digits - 1) : `${fmt(m, digits - 1)} \\times 10^{${exp}}`;
}

/** Approximate display colour of light of wavelength λ (nm). Outside 380–750 nm: a neutral tint. */
export function wavelengthColor(nm: number): string {
  if (nm < 380) return "rgb(139, 92, 246)";
  if (nm > 750) return "rgb(127, 29, 29)";
  let r = 0;
  let g = 0;
  let b = 0;
  if (nm < 440) {
    r = (440 - nm) / 60;
    b = 1;
  } else if (nm < 490) {
    g = (nm - 440) / 50;
    b = 1;
  } else if (nm < 510) {
    g = 1;
    b = (510 - nm) / 20;
  } else if (nm < 580) {
    r = (nm - 510) / 70;
    g = 1;
  } else if (nm < 645) {
    r = 1;
    g = (645 - nm) / 65;
  } else {
    r = 1;
  }
  const to = (c: number) => Math.round(255 * clamp(c, 0, 1) ** 0.8);
  return `rgb(${to(r)}, ${to(g)}, ${to(b)})`;
}

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => String(n).split("").map((c) => SUP[c] ?? c).join("");

function region(nm: number): string {
  if (nm < 380) return "ultraviolet";
  if (nm > 750) return "infrared";
  return "visible";
}

const TITLES: Record<Mode, string> = {
  photoelectric: "Photoelectric effect",
  "einstein-graph": "Einstein's photoelectric equation",
  "de-broglie": "de Broglie wavelength",
  "bohr-levels": "Bohr energy levels",
};

const CAPTIONS: Record<Mode, string> = {
  photoelectric:
    "Change the colour, the brightness and the collector voltage. Brightness changes how many electrons come out; colour changes how fast the fastest ones are. (Simplified model: emitted energies spread evenly from 0 to K_max.)",
  "einstein-graph": "Every metal gives a straight line of the same slope h/e. Only the threshold frequency, where the line leaves the axis, depends on the metal.",
  "de-broglie": "Raise the accelerating voltage: more momentum, shorter wavelength. Switch particle to see how mass and charge enter.",
  "bohr-levels": "Pick two levels. The photon carries away exactly the energy gap, so its wavelength is fixed by the pair of levels.",
};

const LINE_CLASSES = [
  "stroke-plot",
  "stroke-callout-info",
  "stroke-callout-tip",
  "stroke-callout-warning",
  "stroke-callout-definition",
  "stroke-primary",
];

function Slider({ label, range, value, onChange, unit }: { label: string; range: Range; value: number; onChange: (v: number) => void; unit?: string }) {
  if (range.min === range.max) return null;
  return <SliderRow label={<Latex latex={label} />} value={value} min={range.min} max={range.max} step={range.step} onChange={onChange} unit={unit} />;
}

function Readouts({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">{children}</div>;
}

function Footer({ caption, onReset }: { caption: string; onReset: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs text-muted-foreground">{caption}</p>
      <button type="button" onClick={onReset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
        Reset
      </button>
    </div>
  );
}

function Choice<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; text: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md border px-3 py-1 ${value === o.value ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
        >
          {o.text}
        </button>
      ))}
    </div>
  );
}

export function OmpQuantumLab({ config }: { config: Config }) {
  const { mode } = config;
  return (
    <InteractiveFrame title={TITLES[mode]}>
      {mode === "photoelectric" ? (
        <PhotoelectricView config={config} />
      ) : mode === "einstein-graph" ? (
        <EinsteinGraphView config={config} />
      ) : mode === "de-broglie" ? (
        <DeBroglieView config={config} />
      ) : (
        <BohrView config={config} />
      )}
    </InteractiveFrame>
  );
}

// ---------- photoelectric experiment ----------

/** Photocurrent in µA (saturation 10 µA at 100 % intensity). */
function photocurrent(V: number, V0: number, intensity: number, emits: boolean): number {
  if (!emits) return 0;
  const sat = (10 * intensity) / 100;
  if (V >= 0) return sat;
  if (V0 <= 0) return 0;
  return sat * Math.max(0, 1 + V / V0);
}

function PhotoelectricView({ config }: { config: Config }) {
  const [lambda, setLambda] = useState(config.wavelength.initial);
  const [intensity, setIntensity] = useState(config.intensity.initial);
  const [V, setV] = useState(config.voltage.initial);
  const [metalIdx, setMetalIdx] = useState(config.initialMetal);
  const metal = config.metals[metalIdx] ?? config.metals[0];
  const phi = metal.workFunction;
  const E = HC / lambda;
  const emits = E > phi;
  const Kmax = emits ? E - phi : 0;
  const V0 = Kmax;
  const I = photocurrent(V, V0, intensity, emits);
  const lambda0 = HC / phi;
  const colour = wavelengthColor(lambda);

  // Apparatus.
  const H = 190;
  const ex = 110;
  const cx = 300;
  const plateTop = 70;
  const plateBot = 160;
  const count = emits ? Math.round((intensity / 100) * 6) : 0;
  const electrons = Array.from({ length: count }, (_, k) => {
    const ke = (Kmax * (k + 1)) / count;
    const y = plateTop + 10 + ((plateBot - plateTop - 20) * (k + 0.5)) / count;
    const reach = V >= 0 ? 1 : ke / -V;
    return { y, reach: Math.min(1, reach), arrives: reach >= 1 };
  });
  const beams = Math.max(1, Math.round((intensity / 100) * 5));

  // I–V graph.
  const GH = 170;
  const pad = { l: 34, r: 10, t: 12, b: 24 };
  const vmin = config.voltage.min;
  const vmax = config.voltage.max > vmin ? config.voltage.max : vmin + 1;
  const imax = Math.max(1, (10 * config.intensity.max) / 100) * 1.15;
  const gx = (v: number) => pad.l + ((v - vmin) / (vmax - vmin)) * (W - pad.l - pad.r);
  const gy = (i: number) => GH - pad.b - (i / imax) * (GH - pad.t - pad.b);
  const pts: string[] = [];
  for (let k = 0; k <= 200; k++) {
    const v = vmin + ((vmax - vmin) * k) / 200;
    pts.push(`${k === 0 ? "M" : "L"} ${gx(v).toFixed(2)} ${gy(photocurrent(v, V0, intensity, emits)).toFixed(2)}`);
  }
  const zeroX = vmin <= 0 && vmax >= 0 ? gx(0) : null;

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Photoelectric tube">
        <rect x={70} y={45} width={270} height={135} rx={40} className="fill-muted/40 stroke-border" strokeWidth={1.5} />
        {Array.from({ length: beams }, (_, k) => {
          const x0 = 10 + k * 14;
          return (
            <line key={k} x1={x0} y1={8} x2={ex - 4} y2={plateTop + 12 + k * 12} stroke={colour} strokeWidth={3} strokeDasharray="7 5" opacity={0.85} />
          );
        })}
        <text x={8} y={36} className="fill-muted-foreground text-[10px]">
          {fmt(lambda, 0)} nm ({region(lambda)})
        </text>
        <rect x={ex - 6} y={plateTop} width={6} height={plateBot - plateTop} className="fill-foreground/70" />
        <rect x={cx} y={plateTop} width={6} height={plateBot - plateTop} className="fill-foreground/70" />
        <text x={ex - 3} y={plateBot + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          {metal.name}
        </text>
        <text x={cx + 3} y={plateBot + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
          collector
        </text>
        {electrons.map((el, k) => {
          const x2 = ex + 4 + el.reach * (cx - ex - 10);
          return (
            <g key={k}>
              <line x1={ex + 2} y1={el.y} x2={x2} y2={el.y} className="stroke-callout-info" strokeWidth={1.5} strokeDasharray={el.arrives ? undefined : "3 3"} />
              {el.arrives ? (
                <polygon points={`${x2},${el.y} ${x2 - 6},${el.y - 3} ${x2 - 6},${el.y + 3}`} className="fill-callout-info" />
              ) : (
                <path d={`M ${x2} ${el.y} q 8 0 8 5 q 0 5 -8 5`} fill="none" className="stroke-callout-info" strokeWidth={1.2} />
              )}
              <circle cx={x2} cy={el.y} r={3} className="fill-callout-info" />
            </g>
          );
        })}
        <text x={(ex + cx) / 2} y={H - 4} textAnchor="middle" className="fill-foreground text-[11px]">
          V = {fmt(V, 1)} V · I = {fmt(I, 2)} µA
        </text>
      </svg>

      {config.metals.length > 1 && (
        <Choice label="Metal" options={config.metals.map((m, k) => ({ value: k, text: `${m.name} (${fmt(m.workFunction)} eV)` }))} value={metalIdx} onChange={setMetalIdx} />
      )}
      <Slider label="\lambda" range={config.wavelength} value={lambda} onChange={setLambda} unit="nm" />
      <Slider label="I_{\text{light}}" range={config.intensity} value={intensity} onChange={setIntensity} unit="%" />
      <Slider label="V" range={config.voltage} value={V} onChange={setV} unit="V" />

      <svg viewBox={`0 0 ${W} ${GH}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Photocurrent against collector voltage">
        <line x1={pad.l} y1={GH - pad.b} x2={W - pad.r} y2={GH - pad.b} className="stroke-foreground/40" />
        {zeroX !== null && <line x1={zeroX} y1={pad.t} x2={zeroX} y2={GH - pad.b} className="stroke-foreground/40" />}
        <text x={W - pad.r} y={GH - 4} textAnchor="end" className="fill-muted-foreground text-[9px]">
          V (volt)
        </text>
        <text x={4} y={pad.t + 6} className="fill-muted-foreground text-[9px]">
          I (µA)
        </text>
        {[vmin, vmax].map((v) => (
          <text key={v} x={gx(v)} y={GH - pad.b + 12} textAnchor={v === vmin ? "start" : "end"} className="fill-muted-foreground text-[9px]">
            {fmt(v, 1)}
          </text>
        ))}
        <path d={pts.join(" ")} fill="none" className="stroke-plot" strokeWidth={2} />
        {emits && -V0 >= vmin && (
          <>
            <circle cx={gx(-V0)} cy={gy(0)} r={3} className="fill-callout-warning" />
            <text x={gx(-V0)} y={gy(0) - 6} textAnchor="middle" className="fill-callout-warning text-[9px]">
              −V₀
            </text>
          </>
        )}
        <circle cx={gx(clamp(V, vmin, vmax))} cy={gy(I)} r={4.5} className="fill-primary" />
      </svg>

      <Readouts>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <Latex latex={`E = \\frac{hc}{\\lambda} = \\frac{1240}{${fmt(lambda, 0)}} = ${fmt(E, 2)}\\text{ eV}`} />
          <Latex latex={`\\phi = ${fmt(phi)}\\text{ eV}`} />
          <Latex latex={`\\lambda_0 = \\frac{1240}{\\phi} = ${fmt(lambda0, 0)}\\text{ nm}`} />
        </div>
        {emits ? (
          <Latex latex={`K_{\\max} = E - \\phi = ${fmt(Kmax, 2)}\\text{ eV} \\;\\Rightarrow\\; V_0 = ${fmt(V0, 2)}\\text{ V}`} />
        ) : (
          <p className="font-medium">
            E &lt; φ (λ longer than λ₀): no electrons at all, however bright the light.
          </p>
        )}
        {emits && V < 0 && V > -V0 && <p className="text-muted-foreground">Retarding field: only electrons with K &gt; e|V| reach the collector.</p>}
        {emits && V <= -V0 && <p className="font-medium">|V| ≥ V₀: even the fastest electrons turn back. Current is zero.</p>}
      </Readouts>
      <Footer
        caption={config.caption ?? CAPTIONS.photoelectric}
        onReset={() => {
          setLambda(config.wavelength.initial);
          setIntensity(config.intensity.initial);
          setV(config.voltage.initial);
          setMetalIdx(config.initialMetal);
        }}
      />
    </>
  );
}

// ---------- V0 (or K_max) against frequency ----------

function EinsteinGraphView({ config }: { config: Config }) {
  const [nu, setNu] = useState(config.frequency.initial);
  const [sel, setSel] = useState(config.initialMetal);
  const metal = config.metals[sel] ?? config.metals[0];
  const isK = config.graphY === "kmax";
  const H = 250;
  const pad = { l: 36, r: 12, t: 12, b: 26 };
  const fmin = 0;
  const fmax = Math.max(config.frequency.max, 1);
  const phiMax = Math.max(...config.metals.map((m) => m.workFunction));
  const ymax = Math.max(1, H_OVER_E_14 * fmax - Math.min(...config.metals.map((m) => m.workFunction))) + 0.3;
  const ymin = -phiMax - 0.3;
  const gx = (f: number) => pad.l + ((f - fmin) / (fmax - fmin)) * (W - pad.l - pad.r);
  const gy = (y: number) => pad.t + ((ymax - y) / (ymax - ymin)) * (H - pad.t - pad.b);
  const y0 = H_OVER_E_14 * nu - metal.workFunction;
  const nu0 = metal.workFunction / H_OVER_E_14;
  const yLabel = isK ? "K_max (eV)" : "V₀ (V)";

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Stopping potential against frequency">
        <line x1={pad.l} y1={gy(0)} x2={W - pad.r} y2={gy(0)} className="stroke-foreground/50" />
        <line x1={gx(0)} y1={pad.t} x2={gx(0)} y2={H - pad.b} className="stroke-foreground/50" />
        {Array.from({ length: Math.floor(fmax / 2) + 1 }, (_, k) => k * 2)
          .filter((f) => f > 0)
          .map((f) => (
            <text key={f} x={gx(f)} y={gy(0) + 12} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {f}
            </text>
          ))}
        {[Math.ceil(ymin), Math.floor(ymax)].map((v) =>
          v !== 0 ? (
            <text key={v} x={pad.l - 4} y={gy(v) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
              {v}
            </text>
          ) : null,
        )}
        <text x={W - pad.r} y={gy(0) - 5} textAnchor="end" className="fill-muted-foreground text-[9px]">
          ν (10¹⁴ Hz)
        </text>
        <text x={pad.l + 4} y={pad.t + 8} className="fill-muted-foreground text-[9px]">
          {yLabel}
        </text>
        {config.metals.map((m, k) => {
          const n0 = m.workFunction / H_OVER_E_14;
          const active = k === sel;
          const cls = LINE_CLASSES[k % LINE_CLASSES.length];
          return (
            <g key={m.name + k} opacity={active ? 1 : 0.35}>
              <line x1={gx(0)} y1={gy(-m.workFunction)} x2={gx(Math.min(n0, fmax))} y2={gy(H_OVER_E_14 * Math.min(n0, fmax) - m.workFunction)} className={cls} strokeWidth={1.2} strokeDasharray="4 3" />
              {n0 < fmax && (
                <line x1={gx(n0)} y1={gy(0)} x2={gx(fmax)} y2={gy(H_OVER_E_14 * fmax - m.workFunction)} className={cls} strokeWidth={active ? 2.5 : 1.5} />
              )}
              {active && (
                <>
                  <circle cx={gx(0)} cy={gy(-m.workFunction)} r={3} className="fill-foreground" />
                  <text x={gx(0) + 5} y={gy(-m.workFunction) + 12} className="fill-muted-foreground text-[9px]">
                    −φ/e
                  </text>
                  {n0 < fmax && (
                    <text x={gx(n0)} y={gy(0) - 5} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                      ν₀
                    </text>
                  )}
                </>
              )}
            </g>
          );
        })}
        <line x1={gx(nu)} y1={pad.t} x2={gx(nu)} y2={H - pad.b} className="stroke-muted-foreground" strokeDasharray="2 3" />
        {y0 > 0 && <circle cx={gx(nu)} cy={gy(y0)} r={4.5} className="fill-primary" />}
      </svg>

      {config.metals.length > 1 && (
        <Choice label="Metal" options={config.metals.map((m, k) => ({ value: k, text: m.name }))} value={sel} onChange={setSel} />
      )}
      <Slider label="\nu\ (10^{14}\,\text{Hz})" range={config.frequency} value={nu} onChange={setNu} />

      <Readouts>
        <Latex latex={`${isK ? "K_{\\max}" : "eV_0"} = h\\nu - \\phi \\quad\\Rightarrow\\quad ${isK ? "\\text{slope} = h" : "\\text{slope} = \\tfrac{h}{e} = 4.14 \\times 10^{-15}\\ \\text{V s}"}`} />
        <Latex latex={`\\nu_0 = \\frac{\\phi}{h} = \\frac{${fmt(metal.workFunction)}\\text{ eV}}{4.14 \\times 10^{-15}\\text{ eV s}} = ${fmt(nu0, 2)} \\times 10^{14}\\text{ Hz}`} />
        {y0 > 0 ? (
          <Latex latex={`\\text{at } \\nu = ${fmt(nu, 1)} \\times 10^{14}\\text{ Hz}: \\; ${isK ? "K_{\\max}" : "V_0"} = ${fmt(y0, 2)}\\ ${isK ? "\\text{eV}" : "\\text{V}"}`} />
        ) : (
          <p className="font-medium">Below ν₀ for {metal.name}: no emission, so no stopping potential to measure.</p>
        )}
      </Readouts>
      <Footer
        caption={config.caption ?? CAPTIONS["einstein-graph"]}
        onReset={() => {
          setNu(config.frequency.initial);
          setSel(config.initialMetal);
        }}
      />
    </>
  );
}

// ---------- de Broglie wavelength ----------

const PARTICLES: Record<Particle, { name: string; latex: string; mass: number; q: number }> = {
  electron: { name: "Electron", latex: "e^-", mass: 9.11e-31, q: 1 },
  proton: { name: "Proton", latex: "p", mass: 1.673e-27, q: 1 },
  alpha: { name: "Alpha", latex: "\\alpha", mass: 6.645e-27, q: 2 },
};

const debroglie = (p: Particle, V: number) => PLANCK / Math.sqrt(2 * PARTICLES[p].mass * PARTICLES[p].q * E_CHARGE * V);

function DeBroglieView({ config }: { config: Config }) {
  const [particle, setParticle] = useState<Particle>(config.particle);
  const [V, setV] = useState(config.acceleratingVoltage.initial);
  const P = PARTICLES[particle];
  const lambda = debroglie(particle, V);
  const K = P.q * V; // eV
  const p = Math.sqrt(2 * P.mass * K * E_CHARGE);
  const lambda0 = debroglie(config.particle, config.acceleratingVoltage.initial);
  const cycles = (6 * lambda0) / lambda;

  // Wave panel.
  const H = 110;
  const drawable = cycles <= 60;
  const path: string[] = [];
  if (drawable) {
    const n = 600;
    for (let k = 0; k <= n; k++) {
      const x = 20 + ((W - 40) * k) / n;
      const env = Math.sin((Math.PI * k) / n) ** 0.5;
      const y = H / 2 - 30 * env * Math.sin((2 * Math.PI * cycles * k) / n);
      path.push(`${k === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
  }

  // Log scale strip: 1e-14 m … 1e-9 m.
  const LH = 70;
  const lo = -14;
  const hi = -9;
  const lx = (m: number) => 20 + ((clamp(Math.log10(m), lo, hi) - lo) / (hi - lo)) * (W - 40);
  const refs = [
    { m: 1e-10, text: "atom ~1 Å" },
    { m: 1e-14, text: "nucleus" },
  ];

  const inPm = lambda * 1e12;

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Matter wave">
        {drawable ? (
          <path d={path.join(" ")} fill="none" className="stroke-plot" strokeWidth={1.8} />
        ) : (
          <text x={W / 2} y={H / 2} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            Wavelength too short to draw at this scale ({fmt(cycles, 0)} waves across the panel).
          </text>
        )}
        <text x={20} y={H - 6} className="fill-muted-foreground text-[9px]">
          {P.name} at {fmt(V, 0)} V: {fmt(cycles, 1)} wavelengths across the panel
        </text>
      </svg>

      <svg viewBox={`0 0 ${W} ${LH}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Wavelengths on a logarithmic scale">
        <line x1={20} y1={40} x2={W - 20} y2={40} className="stroke-foreground/40" />
        {Array.from({ length: hi - lo + 1 }, (_, k) => lo + k).map((e) => (
          <g key={e}>
            <line x1={lx(10 ** e)} y1={36} x2={lx(10 ** e)} y2={44} className="stroke-foreground/40" />
            <text x={lx(10 ** e)} y={56} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              10{sup(e)} m
            </text>
          </g>
        ))}
        {refs.map((r) => (
          <text key={r.text} x={lx(r.m)} y={66} textAnchor="middle" className="fill-muted-foreground text-[8px]">
            {r.text}
          </text>
        ))}
        {(Object.keys(PARTICLES) as Particle[]).map((key, k) => {
          const l = debroglie(key, V);
          const active = key === particle;
          return (
            <g key={key} opacity={active ? 1 : 0.45}>
              <circle cx={lx(l)} cy={40} r={active ? 5 : 3.5} className={active ? "fill-primary" : "fill-muted-foreground"} />
              <text x={lx(l)} y={24 - (k % 2) * 10} textAnchor="middle" className="fill-foreground text-[9px]">
                {PARTICLES[key].name}
              </text>
            </g>
          );
        })}
      </svg>

      {config.allowParticleChange && (
        <Choice
          label="Particle"
          options={(Object.keys(PARTICLES) as Particle[]).map((k) => ({ value: k, text: PARTICLES[k].name }))}
          value={particle}
          onChange={setParticle}
        />
      )}
      <Slider label="V" range={config.acceleratingVoltage} value={V} onChange={setV} unit="V" />

      <Readouts>
        <Latex latex={`K = qV = ${fmt(K, 0)}\\text{ eV}, \\quad p = \\sqrt{2mK} = ${sci(p)}\\ \\text{kg m/s}`} />
        <div className="overflow-x-auto">
          <Latex latex={`\\lambda = \\frac{h}{\\sqrt{2mqV}} = ${sci(lambda)}\\text{ m} = ${inPm >= 100 ? `${fmt(lambda * 1e10, 3)}\\text{ \\AA}` : `${fmt(inPm, 3)}\\text{ pm}`}`} />
        </div>
        {particle === "electron" && (
          <Latex latex={`\\text{shortcut: } \\lambda = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA} = \\frac{12.27}{\\sqrt{${fmt(V, 0)}}} = ${fmt(12.27 / Math.sqrt(V), 3)}\\text{ \\AA}`} />
        )}
      </Readouts>
      <Footer
        caption={config.caption ?? CAPTIONS["de-broglie"]}
        onReset={() => {
          setParticle(config.particle);
          setV(config.acceleratingVoltage.initial);
        }}
      />
    </>
  );
}

// ---------- Bohr levels, transitions and orbits ----------

const SERIES = ["Lyman", "Balmer", "Paschen", "Brackett", "Pfund", "Humphreys"];
const MAX_N = 7;

function BohrView({ config }: { config: Config }) {
  const [Z, setZ] = useState(config.atomicNumber);
  const [upper, setUpper] = useState(config.upperLevel);
  const [lower, setLower] = useState(config.lowerLevel);
  const emission = config.transition === "emission";
  const En = (n: number) => (-13.6 * Z * Z) / (n * n);
  const dE = En(upper) - En(lower);
  const lambda = HC / dE;
  const series = SERIES[lower - 1] ?? `n = ${lower}`;
  const lines = (upper * (upper - 1)) / 2;

  // Level diagram.
  const H = 260;
  const top = 18;
  const bottom = H - 20;
  const E1 = En(1);
  const ly = (E: number) => top + (E / E1) * (bottom - top);
  const x0 = 46;
  const x1 = 170;
  const arrowX = 104;
  const yU = ly(En(upper));
  const yL = ly(En(lower));
  const [fromY, toY] = emission ? [yU, yL] : [yL, yU];
  const dir = toY > fromY ? 1 : -1;

  // Orbits.
  const ocx = 320;
  const ocy = H / 2;
  const R = 70;
  const outer = Math.max(upper, 2);
  const rOf = (n: number) => (R * n * n) / (outer * outer);
  const wave = (n: number) => {
    const pts: string[] = [];
    const amp = Math.min(5, rOf(n) * 0.35);
    for (let k = 0; k <= 240; k++) {
      const t = (2 * Math.PI * k) / 240;
      const r = rOf(n) + amp * Math.sin(n * t);
      pts.push(`${k === 0 ? "M" : "L"} ${(ocx + r * Math.cos(t)).toFixed(2)} ${(ocy + r * Math.sin(t)).toFixed(2)}`);
    }
    return pts.join(" ") + " Z";
  };

  // Spectrum strip for the series ending on `lower`.
  const SH = 64;
  const seriesLambda = (ni: number) => HC / (En(ni) - En(lower));
  const limit = HC / (0 - En(lower));
  const first = seriesLambda(lower + 1);
  const smin = limit * 0.97;
  const smax = first * 1.03;
  const sx = (l: number) => 20 + ((l - smin) / (smax - smin)) * (W - 40);
  const seriesLines = Array.from({ length: 8 }, (_, k) => lower + 1 + k).map((ni) => ({ ni, l: seriesLambda(ni) }));

  const setLowerSafe = (v: number) => {
    setLower(v);
    if (upper <= v) setUpper(Math.min(MAX_N, v + 1));
  };
  const setUpperSafe = (v: number) => {
    setUpper(v);
    if (lower >= v) setLower(Math.max(1, v - 1));
  };

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Energy levels and orbits">
        {Array.from({ length: MAX_N }, (_, k) => k + 1).map((n) => {
          const y = ly(En(n));
          const active = n === upper || n === lower;
          return (
            <g key={n}>
              <line x1={x0} y1={y} x2={x1} y2={y} className={active ? "stroke-foreground" : "stroke-muted-foreground"} strokeWidth={active ? 2 : 1} />
              {(n <= 4 || active) && (
                <>
                  <text x={x0 - 6} y={y + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
                    n={n}
                  </text>
                  <text x={x1 + 4} y={y + 3} className="fill-muted-foreground text-[9px]">
                    {fmt(En(n), 2)} eV
                  </text>
                </>
              )}
            </g>
          );
        })}
        <line x1={x0} y1={ly(0) - 4} x2={x1} y2={ly(0) - 4} className="stroke-muted-foreground" strokeDasharray="3 3" strokeWidth={1} />
        <text x={x1 + 4} y={ly(0) - 1} className="fill-muted-foreground text-[9px]">
          0 eV
        </text>
        <line x1={arrowX} y1={fromY} x2={arrowX} y2={toY - dir * 8} className="stroke-callout-warning" strokeWidth={2.5} />
        <polygon points={`${arrowX},${toY} ${arrowX - 5},${toY - dir * 9} ${arrowX + 5},${toY - dir * 9}`} className="fill-callout-warning" />
        <path
          d={`M ${arrowX + 8} ${(yU + yL) / 2} q 6 -6 12 0 t 12 0 t 12 0`}
          fill="none"
          stroke={wavelengthColor(lambda)}
          strokeWidth={2}
        />
        {config.showOrbits && (
          <g>
            {Array.from({ length: outer }, (_, k) => k + 1).map((n) =>
              n === upper || n === lower ? (
                <path key={n} d={wave(n)} fill="none" className={n === upper ? "stroke-plot" : "stroke-callout-info"} strokeWidth={1.4} />
              ) : (
                <circle key={n} cx={ocx} cy={ocy} r={rOf(n)} fill="none" className="stroke-muted-foreground/60" strokeWidth={0.8} strokeDasharray="2 3" />
              ),
            )}
            <circle cx={ocx} cy={ocy} r={2.5} className="fill-foreground" />
          </g>
        )}
      </svg>

      <svg viewBox={`0 0 ${W} ${SH}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label={`${series} series`}>
        <rect x={20} y={10} width={W - 40} height={28} className="fill-foreground/85" rx={3} />
        {seriesLines.map(({ ni, l }) =>
          l >= smin && l <= smax ? (
            <line
              key={ni}
              x1={sx(l)}
              y1={10}
              x2={sx(l)}
              y2={38}
              stroke={l >= 380 && l <= 750 ? wavelengthColor(l) : "rgb(160,160,170)"}
              strokeWidth={ni === upper ? 3 : 1.2}
              opacity={ni === upper ? 1 : 0.7}
            />
          ) : null,
        )}
        <line x1={sx(limit)} y1={6} x2={sx(limit)} y2={42} className="stroke-muted-foreground" strokeDasharray="2 2" />
        <text x={sx(limit)} y={52} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          limit {fmt(limit, 1)} nm
        </text>
        <text x={W - 20} y={60} textAnchor="end" className="fill-muted-foreground text-[9px]">
          {series} series ({region(first)}{region(limit) !== region(first) ? ` to ${region(limit)}` : ""})
        </text>
      </svg>

      <Choice label="Atom" options={[1, 2, 3].map((z) => ({ value: z, text: z === 1 ? "H" : z === 2 ? "He⁺" : "Li²⁺" }))} value={Z} onChange={setZ} />
      <SliderRow label={<Latex latex="n_{\text{upper}}" />} value={upper} min={2} max={MAX_N} step={1} onChange={setUpperSafe} />
      <SliderRow label={<Latex latex="n_{\text{lower}}" />} value={lower} min={1} max={MAX_N - 1} step={1} onChange={setLowerSafe} />

      <Readouts>
        <Latex latex={`E_n = -\\frac{13.6\\,Z^2}{n^2}\\text{ eV}: \\quad E_{${upper}} = ${fmt(En(upper), 2)}\\text{ eV}, \\; E_{${lower}} = ${fmt(En(lower), 2)}\\text{ eV}`} />
        <Latex latex={`\\Delta E = ${fmt(dE, 2)}\\text{ eV} \\;\\Rightarrow\\; \\lambda = \\frac{1240}{\\Delta E} = ${fmt(lambda, 1)}\\text{ nm}`} />
        <p>
          {emission ? "Emitted" : "Absorbed"}: {series} series, {region(lambda)}.
          {emission && ` From n = ${upper}, a crowd of atoms can emit ${lines} different lines.`}
        </p>
        <Latex latex={`r_{${upper}} = 0.529\\,\\frac{n^2}{Z}\\text{ \\AA} = ${fmt((0.529 * upper * upper) / Z, 3)}\\text{ \\AA}, \\quad v_{${upper}} = 2.19 \\times 10^6\\,\\frac{Z}{n}\\text{ m/s} = ${sci((2.19e6 * Z) / upper)}\\text{ m/s}`} />
      </Readouts>
      <Footer
        caption={config.caption ?? CAPTIONS["bohr-levels"]}
        onReset={() => {
          setZ(config.atomicNumber);
          setUpper(config.upperLevel);
          setLower(config.lowerLevel);
        }}
      />
    </>
  );
}
