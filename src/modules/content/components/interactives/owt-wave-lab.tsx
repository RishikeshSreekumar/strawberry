"use client";

import { useId, useState } from "react";
import type { z } from "zod";
import type { owtWaveLabSchema } from "../../schemas/blocks";
import {
  ArrowMarker,
  PlayButton,
  Readouts,
  ToggleGroup,
  clamp,
  fmt,
  sci,
  spanRange,
  tidy,
  useClock,
  type Range,
} from "./owt-common";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof owtWaveLabSchema>;
type Mode = Config["mode"];
type Key = NonNullable<Config["sliders"]>[number];
type Params = Record<Key, number>;
type Dir = "right" | "left";

const G = 10;
const W = 480;
const TWO_PI = 2 * Math.PI;

const LABEL: Record<Key, [string, string]> = {
  amplitude: ["A", "m"],
  omega: ["\\omega", "rad/s"],
  phase: ["\\phi", "π rad"],
  damping: ["\\gamma", "s⁻¹"],
  mass: ["m", "kg"],
  length: ["L", "m"],
  angleAmplitude: ["\\theta_0", "°"],
  wavelength: ["\\lambda", "m"],
  frequency: ["f", "Hz"],
  amplitude2: ["A_2", "m"],
  wavelength2: ["\\lambda_2", "m"],
  phase2: ["\\phi_2", "π rad"],
  harmonic: ["n", ""],
  stringLength: ["L", "m"],
  waveSpeed: ["v", "m/s"],
  f1: ["f_1", "Hz"],
  f2: ["f_2", "Hz"],
  sourceSpeed: ["v_s", "m/s"],
  observerSpeed: ["v_o", "m/s"],
};

const DEFAULT_SLIDERS: Record<Mode, Key[]> = {
  shm: ["amplitude", "omega"],
  traveling: ["amplitude", "wavelength", "frequency"],
  superposition: ["phase2", "amplitude2"],
  standing: ["harmonic"],
  beats: ["f1", "f2"],
  doppler: ["sourceSpeed"],
};

/** Fixed default ranges; used when the initial value lies inside them. */
const BASE: Partial<Record<Key, Range>> = {
  amplitude: { min: 0.02, max: 0.3, step: 0.01 },
  amplitude2: { min: 0.02, max: 0.3, step: 0.01 },
  omega: { min: 1, max: 20, step: 0.5 },
  phase: { min: -1, max: 1, step: 1 / 12 },
  phase2: { min: 0, max: 2, step: 1 / 12 },
  damping: { min: 0, max: 2, step: 0.05 },
  mass: { min: 0.1, max: 5, step: 0.1 },
  length: { min: 0.1, max: 4, step: 0.1 },
  angleAmplitude: { min: 2, max: 30, step: 1 },
  wavelength: { min: 0.2, max: 3, step: 0.1 },
  wavelength2: { min: 0.2, max: 3, step: 0.1 },
  frequency: { min: 0.2, max: 5, step: 0.1 },
  f1: { min: 1, max: 30, step: 0.5 },
  f2: { min: 1, max: 30, step: 0.5 },
};

function initialParams(cfg: Config): Params {
  return {
    amplitude: cfg.amplitude,
    omega: cfg.omega,
    phase: cfg.phase / Math.PI,
    damping: cfg.damping,
    mass: cfg.mass,
    length: cfg.length,
    angleAmplitude: cfg.angleAmplitude,
    wavelength: cfg.wavelength,
    frequency: cfg.frequency,
    amplitude2: cfg.amplitude2 ?? cfg.amplitude,
    wavelength2: cfg.wavelength2 ?? cfg.wavelength,
    phase2: cfg.phase2 / Math.PI,
    harmonic: cfg.harmonic,
    stringLength: cfg.stringLength,
    waveSpeed: cfg.waveSpeed,
    f1: cfg.f1,
    f2: cfg.f2,
    sourceSpeed: cfg.sourceSpeed,
    observerSpeed: cfg.observerSpeed,
  };
}

function rangeFor(cfg: Config, key: Key, init: number): Range {
  const override = cfg.ranges?.[key];
  if (override) return override;
  if (key === "harmonic") return { min: 1, max: cfg.maxHarmonic, step: 1 };
  if (key === "sourceSpeed" || key === "observerSpeed") return spanRange(0, 1.5 * cfg.waveSpeed);
  const base = BASE[key];
  if (base && init >= base.min - 1e-9 && init <= base.max + 1e-9) return base;
  if (key === "phase" || key === "phase2") return { min: -2, max: 2, step: 1 / 12 };
  return spanRange(init * 0.25, init * 2.5);
}

/** Zigzag spring from x0 to x1 at height y. */
function springPath(x0: number, x1: number, y: number, coils = 12, amp = 8): string {
  const lead = 8;
  let d = `M ${x0} ${y} L ${x0 + lead} ${y}`;
  const span = x1 - x0 - 2 * lead;
  for (let i = 0; i < coils * 2; i++) {
    const x = x0 + lead + (span * (i + 0.5)) / (coils * 2);
    d += ` L ${x.toFixed(2)} ${(y + (i % 2 === 0 ? -amp : amp)).toFixed(2)}`;
  }
  d += ` L ${x1 - lead} ${y} L ${x1} ${y}`;
  return d;
}

function samplePath(n: number, fx: (i: number) => [number, number]): string {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const [x, y] = fx(i);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    d += `${d ? " L" : "M"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

/** A thin time-series strip with a cursor at `t`. */
function TimeStrip({
  label,
  unit,
  fn,
  tMax,
  t,
  className = "stroke-plot",
  height = 90,
  extra,
}: {
  label: string;
  unit: string;
  fn: (t: number) => number;
  tMax: number;
  t?: number;
  className?: string;
  height?: number;
  extra?: { fn: (t: number) => number; className: string; dashed?: boolean }[];
}) {
  const left = 44;
  const right = W - 10;
  const mid = height / 2;
  const n = 600;
  let peak = 0;
  for (let i = 0; i <= n; i++) peak = Math.max(peak, Math.abs(fn((tMax * i) / n)));
  for (const e of extra ?? []) for (let i = 0; i <= n; i += 4) peak = Math.max(peak, Math.abs(e.fn((tMax * i) / n)));
  const yMax = peak > 1e-12 ? peak * 1.1 : 1;
  const sx = (tt: number) => left + (tt / tMax) * (right - left);
  const sy = (v: number) => mid - (v / yMax) * (mid - 8);
  const path = (f: (t: number) => number) => samplePath(n, (i) => [sx((tMax * i) / n), sy(f((tMax * i) / n))]);
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full rounded-md border bg-background" role="img">
      <line x1={left} y1={mid} x2={right} y2={mid} className="stroke-foreground/40" />
      <line x1={left} y1={4} x2={left} y2={height - 4} className="stroke-foreground/40" />
      <text x={6} y={mid + 3} className="fill-foreground text-[10px] font-medium">
        {label}
      </text>
      <text x={left - 3} y={sy(peak) + 3} textAnchor="end" className="fill-muted-foreground text-[8px]">
        {sci(peak, 2)}
      </text>
      <text x={right} y={height - 3} textAnchor="end" className="fill-muted-foreground text-[8px]">
        {`t (s), ${unit}`}
      </text>
      {(extra ?? []).map((e, i) => (
        <path
          key={i}
          d={path(e.fn)}
          fill="none"
          strokeWidth={1.2}
          strokeDasharray={e.dashed ? "4 3" : undefined}
          className={e.className}
        />
      ))}
      <path d={path(fn)} fill="none" strokeWidth={2} className={className} />
      {t !== undefined && (
        <>
          <line x1={sx(t)} y1={4} x2={sx(t)} y2={height - 4} className="stroke-callout-warning/70" strokeDasharray="3 3" />
          <circle cx={sx(t)} cy={sy(fn(t))} r={3.5} className="fill-callout-warning stroke-callout-warning" />
        </>
      )}
    </svg>
  );
}

export function OwtWaveLab({ config }: { config: Config }) {
  const init = initialParams(config);
  const sliderKeys =
    config.sliders ??
    (config.mode === "shm" && config.oscillator === "pendulum" ? (["length", "angleAmplitude"] as Key[]) : DEFAULT_SLIDERS[config.mode]);
  const ranges = Object.fromEntries(
    (Object.keys(init) as Key[]).map((k) => [k, rangeFor(config, k, init[k])]),
  ) as Record<Key, Range>;
  const [p, setP] = useState<Params>(() => {
    const out = { ...init };
    for (const k of sliderKeys) out[k] = clamp(out[k], ranges[k].min, ranges[k].max);
    return out;
  });
  const set = (k: Key) => (v: number) => setP((prev) => ({ ...prev, [k]: tidy(v) }));

  const sliders = sliderKeys.map((k) => (
    <SliderRow
      key={k}
      label={<Latex latex={LABEL[k][0]} />}
      value={Number(p[k].toFixed(3))}
      min={ranges[k].min}
      max={ranges[k].max}
      step={ranges[k].step}
      onChange={set(k)}
      unit={LABEL[k][1]}
    />
  ));

  switch (config.mode) {
    case "shm":
      return <ShmView config={config} p={p} ranges={ranges} sliders={sliders} />;
    case "traveling":
    case "superposition":
      return <TravelingView config={config} p={p} ranges={ranges} sliders={sliders} />;
    case "standing":
      return <StandingView config={config} p={p} ranges={ranges} sliders={sliders} />;
    case "beats":
      return <BeatsView config={config} p={p} sliders={sliders} />;
    case "doppler":
      return <DopplerView config={config} p={p} sliders={sliders} />;
  }
}

type ViewProps = { config: Config; p: Params; ranges: Record<Key, Range>; sliders: React.ReactNode };

function TimeControl({
  clock,
  max,
  unit,
}: {
  clock: ReturnType<typeof useClock>;
  max: number;
  unit: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <SliderRow
          label={<Latex latex="t" />}
          value={Number(clock.t.toFixed(2))}
          min={0}
          max={max}
          step={0.01}
          onChange={clock.setT}
          unit={unit}
        />
      </div>
      <PlayButton playing={clock.playing} onClick={clock.toggle} />
    </div>
  );
}

// ---------- SHM ----------

function ShmView({ config, p, ranges, sliders }: ViewProps) {
  const periods = config.periodsShown;
  const clock = useClock({ max: periods, rate: 0.5 });
  const isPend = config.oscillator === "pendulum";

  const w0 = isPend ? Math.sqrt(G / p.length) : p.omega;
  const gamma = Math.min(p.damping, 0.95 * w0);
  const wd = Math.sqrt(w0 * w0 - gamma * gamma);
  const T = TWO_PI / wd;
  const phi = p.phase * Math.PI;
  const theta0 = (p.angleAmplitude * Math.PI) / 180;
  const A = isPend ? p.length * theta0 : p.amplitude;
  const k = p.mass * w0 * w0;

  const x = (t: number) => A * Math.exp(-gamma * t) * Math.cos(wd * t + phi);
  const v = (t: number) =>
    A * Math.exp(-gamma * t) * (-gamma * Math.cos(wd * t + phi) - wd * Math.sin(wd * t + phi));
  const a = (t: number) => -w0 * w0 * x(t) - 2 * gamma * v(t);
  const thetaDeg = (t: number) => (x(t) / p.length) * (180 / Math.PI);

  const tNow = clock.t * T;
  const xNow = x(tNow);
  const vNow = v(tNow);
  const aNow = a(tNow);
  const KE = 0.5 * p.mass * vNow * vNow;
  const PE = 0.5 * k * xNow * xNow;
  const E0 = 0.5 * k * A * A;

  const markerId = useId().replace(/:/g, "");
  // Picture
  const SCALE = 100;
  const CX = 260;
  const aMax = isPend ? 1 : Math.max(ranges.amplitude.max, p.amplitude);
  const circleH = config.showReferenceCircle && !isPend ? 2 * SCALE + 30 : 0;
  const rowY = circleH + 40;
  const H = isPend ? 210 : circleH + 80;
  const blockX = CX + (xNow / aMax) * SCALE;
  const env = Math.exp(-gamma * tNow);
  const rPx = (A / aMax) * SCALE * env;
  const cy = SCALE + 15;
  const ang = wd * tNow + phi;
  const pX = CX + rPx * Math.cos(ang);
  const pY = cy - rPx * Math.sin(ang);

  const pendAngle = isPend ? xNow / p.length : 0;
  const LPX = 160;
  const bob = { x: CX + LPX * Math.sin(pendAngle), y: 20 + LPX * Math.cos(pendAngle) };

  const eq = isPend
    ? `\\theta(t) = ${fmt(p.angleAmplitude, 1)}^\\circ ${gamma > 0 ? `e^{-${fmt(gamma, 2)}t}` : ""}\\cos(${fmt(wd, 2)}t ${phi >= 0 ? "+" : "-"} ${fmt(Math.abs(p.phase), 2)}\\pi)`
    : `x(t) = ${fmt(A, 3)}${gamma > 0 ? `\\,e^{-${fmt(gamma, 2)}t}` : ""}\\cos(${fmt(wd, 2)}t ${phi >= 0 ? "+" : "-"} ${fmt(Math.abs(p.phase), 2)}\\pi)`;

  const graphs = config.graphs.map((g) => {
    if (g === "x")
      return isPend ? (
        <TimeStrip key={g} label="θ" unit="θ in °" fn={thetaDeg} tMax={periods * T} t={tNow} />
      ) : (
        <TimeStrip key={g} label="x" unit="x in m" fn={x} tMax={periods * T} t={tNow} />
      );
    if (g === "v")
      return <TimeStrip key={g} label="v" unit="v in m/s" fn={v} tMax={periods * T} t={tNow} className="stroke-plot-secondary" />;
    return <TimeStrip key={g} label="a" unit="a in m/s²" fn={a} tMax={periods * T} t={tNow} className="stroke-callout-tip" />;
  });

  const rows: [string, string][] = [
    ["T", `${fmt(T, 3)}\\ \\text{s}`],
    ["f", `${fmt(1 / T, 3)}\\ \\text{Hz}`],
    isPend ? ["\\omega = \\sqrt{g/L}", `${fmt(w0, 3)}\\ \\text{rad/s}`] : ["k = m\\omega^2", `${fmt(k, 2)}\\ \\text{N/m}`],
    [isPend ? "s = L\\theta" : "x", `${fmt(xNow, 3)}\\ \\text{m}`],
    ["v", `${fmt(vNow, 3)}\\ \\text{m/s}`],
    ["a", `${fmt(aNow, 3)}\\ \\text{m/s}^2`],
  ];
  if (config.showEnergy) {
    rows.push(["KE", `${sci(KE, 3)}\\ \\text{J}`], ["PE", `${sci(PE, 3)}\\ \\text{J}`]);
  }

  const bar = (label: string, val: number, cls: string, i: number) => {
    const wFull = 150;
    const len = E0 > 0 ? clamp(val / E0, 0, 1.05) * wFull : 0;
    return (
      <g key={label} transform={`translate(0 ${i * 16})`}>
        <text x={0} y={10} className="fill-muted-foreground text-[9px]">
          {label}
        </text>
        <rect x={34} y={2} width={wFull} height={10} className="fill-muted stroke-border" />
        <rect x={34} y={2} width={len} height={10} className={cls} />
      </g>
    );
  };

  return (
    <InteractiveFrame title={isPend ? "Simple pendulum" : "Spring–block oscillator"}>
      <div className="text-center">
        <Latex latex={eq} display />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img">
        <defs>
          <ArrowMarker id={`${markerId}v`} className="fill-plot-secondary" />
        </defs>
        {isPend ? (
          <>
            <line x1={CX - 50} y1={20} x2={CX + 50} y2={20} className="stroke-foreground" strokeWidth={3} />
            <line x1={CX} y1={20} x2={CX} y2={20 + LPX + 10} className="stroke-muted-foreground/40" strokeDasharray="3 3" />
            {[-1, 1].map((s) => (
              <line
                key={s}
                x1={CX}
                y1={20}
                x2={CX + (LPX + 10) * Math.sin(s * theta0)}
                y2={20 + (LPX + 10) * Math.cos(s * theta0)}
                className="stroke-muted-foreground/30"
                strokeDasharray="2 3"
              />
            ))}
            <line x1={CX} y1={20} x2={bob.x} y2={bob.y} className="stroke-foreground" strokeWidth={1.5} />
            <circle cx={bob.x} cy={bob.y} r={12} className="fill-plot stroke-plot" />
          </>
        ) : (
          <>
            {config.showReferenceCircle && (
              <g>
                <circle cx={CX} cy={cy} r={Math.max(rPx, 0.5)} fill="none" className="stroke-plot/40" strokeDasharray="4 3" />
                <line x1={CX - SCALE - 10} y1={cy} x2={CX + SCALE + 10} y2={cy} className="stroke-foreground/30" />
                <line x1={CX} y1={cy} x2={pX} y2={pY} className="stroke-plot" strokeWidth={2} />
                <circle cx={pX} cy={pY} r={4} className="fill-plot stroke-plot" />
                <line x1={pX} y1={pY} x2={blockX} y2={rowY - 14} className="stroke-callout-tip/70" strokeDasharray="3 3" />
                <text x={CX + 6} y={cy - 6} className="fill-muted-foreground text-[9px]">
                  ωt + φ
                </text>
              </g>
            )}
            <rect x={14} y={rowY - 28} width={16} height={46} className="fill-muted stroke-foreground/60" />
            <line x1={14} y1={rowY + 18} x2={W - 10} y2={rowY + 18} className="stroke-foreground/60" />
            {[-1, 1].map((s) => (
              <line
                key={s}
                x1={CX + (s * A * SCALE) / aMax}
                y1={rowY - 26}
                x2={CX + (s * A * SCALE) / aMax}
                y2={rowY + 18}
                className="stroke-muted-foreground/40"
                strokeDasharray="2 3"
              />
            ))}
            <line x1={CX} y1={rowY - 30} x2={CX} y2={rowY + 18} className="stroke-foreground/40" strokeDasharray="4 3" />
            <text x={CX} y={rowY + 32} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              x = 0
            </text>
            <path d={springPath(30, blockX - 20, rowY)} fill="none" className="stroke-foreground/70" strokeWidth={1.5} />
            <rect x={blockX - 20} y={rowY - 14} width={40} height={32} rx={3} className="fill-plot/80 stroke-plot" />
            {Math.abs(vNow) > 1e-6 && (
              <line
                x1={blockX}
                y1={rowY + 2}
                x2={blockX + clamp((vNow / (aMax * Math.max(w0, 1))) * 50, -60, 60)}
                y2={rowY + 2}
                className="stroke-plot-secondary"
                strokeWidth={2}
                markerEnd={`url(#${markerId}v)`}
              />
            )}
          </>
        )}
        {config.showEnergy && (
          <g transform={`translate(${W - 200} 8)`}>
            {bar("KE", KE, "fill-plot-secondary", 0)}
            {bar("PE", PE, "fill-callout-tip", 1)}
            {bar("E", KE + PE, "fill-plot", 2)}
          </g>
        )}
      </svg>
      <div className="space-y-2">{graphs}</div>
      <TimeControl clock={clock} max={periods} unit="T" />
      <div className="space-y-2">{sliders}</div>
      <Readouts rows={rows} />
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          (isPend
            ? "Small swings: the bob obeys the same cosine as a spring, with ω = √(g/L). Notice that the mass slider (if shown) never changes the period."
            : "Press Play or drag t. The dashed cursor on each graph is this instant; watch where v and a are largest.")}
      </p>
    </InteractiveFrame>
  );
}

// ---------- Traveling & superposition ----------

function TravelingView({ config, p, ranges, sliders }: ViewProps) {
  const sup = config.mode === "superposition";
  const clock = useClock({ max: 4, rate: 0.5 });
  const [dir1, setDir1] = useState<Dir>(config.direction);
  const [dir2, setDir2] = useState<Dir>(config.direction2 ?? config.direction);
  const markerId = useId().replace(/:/g, "");

  const k1 = TWO_PI / p.wavelength;
  const w = TWO_PI * p.frequency;
  const s1 = dir1 === "right" ? 1 : -1;
  const phi1 = p.phase * Math.PI;
  const k2 = TWO_PI / p.wavelength2;
  // Wave 2 shares the frequency only when it shares the wavelength (same medium, same speed).
  const w2 = w * (p.wavelength / p.wavelength2);
  const s2 = dir2 === "right" ? 1 : -1;
  const phi2 = p.phase2 * Math.PI;

  const T = 1 / p.frequency;
  const t = clock.t * T;
  const y1 = (x: number, tt: number) => p.amplitude * Math.sin(k1 * x - s1 * w * tt + phi1);
  const y2 = (x: number, tt: number) => p.amplitude2 * Math.sin(k2 * x - s2 * w2 * tt + phi2);
  const yS = (x: number, tt: number) => y1(x, tt) + (sup ? y2(x, tt) : 0);

  const xMax = config.xMax ?? 3 * config.wavelength;
  const H = sup ? 220 : 200;
  const mid = H / 2;
  const left = 30;
  const right = W - 20;
  const aScale = sup
    ? Math.max(ranges.amplitude.max, p.amplitude) + Math.max(ranges.amplitude2.max, p.amplitude2)
    : Math.max(ranges.amplitude.max, p.amplitude);
  const sx = (x: number) => left + (x / xMax) * (right - left);
  const sy = (y: number) => mid - (y / aScale) * (mid - 25);
  const N = 400;
  const curve = (f: (x: number) => number) => samplePath(N, (i) => [sx((xMax * i) / N), sy(f((xMax * i) / N))]);

  const probeX = clamp(config.probeX ?? config.wavelength / 4, 0, xMax);
  const yP = y1(probeX, t);
  const vP = -s1 * p.amplitude * w * Math.cos(k1 * probeX - s1 * w * t + phi1);
  const vMaxScale = Math.max(ranges.amplitude.max, p.amplitude) * TWO_PI * Math.max(ranges.frequency.max, p.frequency);
  const speed = p.frequency * p.wavelength;

  const sign = (s: number) => (s > 0 ? "-" : "+");
  const phaseTex = (ph: number) => (Math.abs(ph) < 1e-9 ? "" : `${ph > 0 ? "+" : "-"} ${fmt(Math.abs(ph / Math.PI), 2)}\\pi`);
  const eq1 = `y_1 = ${fmt(p.amplitude, 3)}\\sin(${fmt(k1, 2)}x ${sign(s1)} ${fmt(w, 2)}t ${phaseTex(phi1)})`;
  const eq2 = `y_2 = ${fmt(p.amplitude2, 3)}\\sin(${fmt(k2, 2)}x ${sign(s2)} ${fmt(w2, 2)}t ${phaseTex(phi2)})`;

  const rows: [string, string][] = [];
  if (!sup) {
    rows.push(
      ["k = 2\\pi/\\lambda", `${fmt(k1, 3)}\\ \\text{rad/m}`],
      ["\\omega = 2\\pi f", `${fmt(w, 3)}\\ \\text{rad/s}`],
      ["v = f\\lambda", `${fmt(speed, 3)}\\ \\text{m/s}`],
      ["T", `${fmt(T, 3)}\\ \\text{s}`],
      [`y_P\\ (x = ${fmt(probeX, 2)})`, `${fmt(yP, 3)}\\ \\text{m}`],
      ["v_P = \\partial y/\\partial t", `${fmt(vP, 3)}\\ \\text{m/s}`],
      ["\\text{max particle speed } A\\omega", `${fmt(p.amplitude * w, 3)}\\ \\text{m/s}`],
    );
  } else {
    const sameLambda = Math.abs(p.wavelength - p.wavelength2) < 1e-9;
    const dphi = phi2 - phi1;
    if (sameLambda && s1 === s2) {
      const Ares = Math.sqrt(p.amplitude ** 2 + p.amplitude2 ** 2 + 2 * p.amplitude * p.amplitude2 * Math.cos(dphi));
      const c = Math.cos(dphi);
      rows.push(
        ["\\Delta\\phi = \\phi_2 - \\phi_1", `${fmt(dphi / Math.PI, 3)}\\pi`],
        ["A_{\\text{res}} = \\sqrt{A_1^2 + A_2^2 + 2A_1A_2\\cos\\Delta\\phi}", `${fmt(Ares, 3)}\\ \\text{m}`],
        ["I_{\\text{res}}/I_1 = (A_{\\text{res}}/A_1)^2", fmt((Ares / p.amplitude) ** 2, 3)],
        [
          "\\text{interference}",
          Math.abs(c - 1) < 1e-6 ? "\\text{fully constructive}" : Math.abs(c + 1) < 1e-6 ? "\\text{destructive}" : "\\text{partial}",
        ],
      );
    } else if (sameLambda) {
      rows.push(
        ["\\text{pattern}", "\\text{standing wave}"],
        ["\\text{node spacing } \\lambda/2", `${fmt(p.wavelength / 2, 3)}\\ \\text{m}`],
      );
    } else {
      rows.push(
        ["\\lambda_1,\\ \\lambda_2", `${fmt(p.wavelength, 2)},\\ ${fmt(p.wavelength2, 2)}\\ \\text{m}`],
        ["\\text{shape}", "\\text{not a sinusoid (it changes as it moves)}"],
      );
    }
    rows.push(["v = f\\lambda", `${fmt(speed, 3)}\\ \\text{m/s}`]);
  }

  const dirOptions: { value: Dir; label: string }[] = [
    { value: "right", label: "→ +x" },
    { value: "left", label: "← −x" },
  ];

  return (
    <InteractiveFrame title={sup ? "Superposition of two waves" : "Travelling wave on a string"}>
      <div className="space-y-1 text-center">
        <Latex latex={eq1} display />
        {sup && <Latex latex={`${eq2},\\quad y = y_1 + y_2`} display />}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img">
        <defs>
          <ArrowMarker id={`${markerId}p`} className="fill-callout-warning" />
          <ArrowMarker id={`${markerId}w`} className="fill-muted-foreground" />
        </defs>
        <line x1={left} y1={mid} x2={right} y2={mid} className="stroke-foreground/30" />
        {!sup && config.showGhost && (
          <path d={curve((x) => y1(x, 0))} fill="none" className="stroke-muted-foreground/40" strokeWidth={1.5} strokeDasharray="5 4" />
        )}
        {sup && (
          <>
            <path d={curve((x) => y1(x, t))} fill="none" className="stroke-plot-secondary/80" strokeWidth={1.5} />
            <path d={curve((x) => y2(x, t))} fill="none" className="stroke-callout-tip/80" strokeWidth={1.5} />
          </>
        )}
        <path d={curve((x) => yS(x, t))} fill="none" className="stroke-plot" strokeWidth={sup ? 2.5 : 2} />
        {!sup && (
          <>
            <circle cx={sx(probeX)} cy={sy(yP)} r={5} className="fill-callout-warning stroke-callout-warning" />
            {Math.abs(vP) > 1e-9 && (
              <line
                x1={sx(probeX)}
                y1={sy(yP)}
                x2={sx(probeX)}
                y2={sy(yP) - clamp((vP / vMaxScale) * 70, -70, 70)}
                className="stroke-callout-warning"
                strokeWidth={2}
                markerEnd={`url(#${markerId}p)`}
              />
            )}
            <text x={sx(probeX) + 8} y={sy(yP) + 14} className="fill-foreground text-[9px]">
              P
            </text>
            {p.wavelength <= xMax && (
              <g>
                <line x1={sx(0)} y1={H - 10} x2={sx(p.wavelength)} y2={H - 10} className="stroke-muted-foreground" />
                <line x1={sx(0)} y1={H - 14} x2={sx(0)} y2={H - 6} className="stroke-muted-foreground" />
                <line x1={sx(p.wavelength)} y1={H - 14} x2={sx(p.wavelength)} y2={H - 6} className="stroke-muted-foreground" />
                <text x={sx(p.wavelength / 2)} y={H - 13} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  λ
                </text>
              </g>
            )}
          </>
        )}
        <line
          x1={s1 > 0 ? right - 80 : right - 20}
          y1={14}
          x2={s1 > 0 ? right - 20 : right - 80}
          y2={14}
          className="stroke-muted-foreground"
          strokeWidth={1.5}
          markerEnd={`url(#${markerId}w)`}
        />
        <text x={right - 86} y={18} textAnchor="end" className="fill-muted-foreground text-[9px]">
          {sup ? "wave 1" : `v = ${fmt(speed, 2)} m/s`}
        </text>
        {sup && (
          <>
            <line
              x1={s2 > 0 ? right - 80 : right - 20}
              y1={30}
              x2={s2 > 0 ? right - 20 : right - 80}
              y2={30}
              className="stroke-callout-tip"
              strokeWidth={1.5}
              markerEnd={`url(#${markerId}w)`}
            />
            <text x={right - 86} y={34} textAnchor="end" className="fill-muted-foreground text-[9px]">
              wave 2
            </text>
          </>
        )}
        <text x={right} y={mid + 14} textAnchor="end" className="fill-muted-foreground text-[9px]">
          x (m)
        </text>
      </svg>
      <TimeControl clock={clock} max={4} unit="T" />
      <div className="flex flex-wrap gap-4">
        <ToggleGroup label={sup ? "Wave 1" : "Direction"} options={dirOptions} value={dir1} onChange={setDir1} />
        {sup && <ToggleGroup label="Wave 2" options={dirOptions} value={dir2} onChange={setDir2} />}
      </div>
      <div className="space-y-2">{sliders}</div>
      <Readouts rows={rows} />
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          (sup
            ? "Thin curves are the two waves; the thick curve is their sum, point by point. Slide the phase of wave 2 and watch the sum grow and vanish."
            : "The shape moves along the string, but P only moves up and down. The dashed curve is the string at t = 0.")}
      </p>
    </InteractiveFrame>
  );
}

// ---------- Standing waves ----------

function StandingView({ config, p, ranges, sliders }: ViewProps) {
  const clock = useClock({ max: 4, rate: 0.5 });
  const b = config.boundary;
  const pipe = b === "open-open" || b === "closed-open" || b === "closed-closed";
  const oneSided = b === "fixed-free" || b === "closed-open";
  const cosShape = b === "open-open";
  const n = Math.round(p.harmonic);
  const h = oneSided ? 2 * n - 1 : n;
  const L = p.stringLength;
  const v = p.waveSpeed;
  const lambda = oneSided ? (4 * L) / h : (2 * L) / h;
  const f = v / lambda;
  const f1 = oneSided ? v / (4 * L) : v / (2 * L);
  const k = TWO_PI / lambda;
  const w = TWO_PI * f;
  const t = clock.t / f;
  const shape = (x: number) => (cosShape ? Math.cos(k * x) : Math.sin(k * x));
  const ct = Math.cos(w * t);

  const H = 190;
  const mid = 95;
  const left = 50;
  const right = W - 40;
  const sx = (x: number) => left + (x / L) * (right - left);
  const aMax = Math.max(ranges.amplitude.max, p.amplitude);
  const yPx = (2 * p.amplitude * 55) / (2 * aMax);
  const N = 300;
  const curve = (fy: (x: number) => number) => samplePath(N, (i) => [sx((L * i) / N), mid - fy((L * i) / N)]);

  // Nodes and antinodes of displacement.
  const nodes: number[] = [];
  const antinodes: number[] = [];
  const first = cosShape ? lambda / 4 : 0;
  for (let x = first; x <= L + 1e-9; x += lambda / 2) nodes.push(x);
  for (let x = cosShape ? 0 : lambda / 4; x <= L + 1e-9; x += lambda / 2) antinodes.push(x);

  const endMark = (x: number, kind: "fixed" | "free" | "open" | "closed", key: string) => {
    const px = sx(x);
    if (kind === "fixed")
      return <rect key={key} x={x === 0 ? px - 10 : px} y={mid - 40} width={10} height={80} className="fill-muted stroke-foreground/60" />;
    if (kind === "free")
      return (
        <g key={key}>
          <line x1={px + 6} y1={mid - 70} x2={px + 6} y2={mid + 70} className="stroke-foreground/60" strokeWidth={2} />
          <circle cx={px + 6} cy={mid - yPx * shape(x) * ct} r={5} fill="none" className="stroke-foreground" />
        </g>
      );
    if (kind === "closed")
      return <line key={key} x1={px} y1={mid - 52} x2={px} y2={mid + 52} className="stroke-foreground" strokeWidth={4} />;
    return null;
  };
  const [leftEnd, rightEnd] = (
    {
      "fixed-fixed": ["fixed", "fixed"],
      "fixed-free": ["fixed", "free"],
      "open-open": ["open", "open"],
      "closed-open": ["closed", "open"],
      "closed-closed": ["closed", "closed"],
    } as const
  )[b];

  // Air-particle rows for pipes: longitudinal displacement.
  const dots: { x: number; y: number }[] = [];
  if (pipe) {
    const cols = 36;
    for (const ry of [-36, -18, 0, 18, 36]) {
      for (let i = 0; i <= cols; i++) {
        const x0 = (L * i) / cols;
        const dx = 7 * shape(x0) * ct;
        dots.push({ x: sx(x0) + dx, y: mid + ry });
      }
    }
  }

  const fTex = oneSided ? `f = \\frac{(2n-1)v}{4L}` : `f = \\frac{nv}{2L}`;
  const rows: [string, string][] = [
    ["\\text{harmonic}", `${h}${oneSided ? "\\ (\\text{odd only})" : ""}`],
    ["\\text{overtone}", h === 1 && n === 1 ? "\\text{fundamental}" : `${n - 1}`],
    ["\\lambda", `${fmt(lambda, 3)}\\ \\text{m}`],
    [fTex, `${fmt(f, 2)}\\ \\text{Hz}`],
    ["f_1\\ (\\text{fundamental})", `${fmt(f1, 2)}\\ \\text{Hz}`],
    ["\\text{nodes, antinodes}", `${nodes.length},\\ ${antinodes.length}`],
  ];

  return (
    <InteractiveFrame title={pipe ? "Standing waves in a pipe" : "Standing waves on a string"}>
      <div className="text-center">
        <Latex
          latex={`y = 2A\\,${cosShape ? "\\cos" : "\\sin"}(kx)\\cos(\\omega t),\\quad \\lambda = ${oneSided ? "\\frac{4L}{2n-1}" : "\\frac{2L}{n}"}`}
          display
        />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img">
        {pipe && (
          <>
            <line x1={sx(0)} y1={mid - 52} x2={sx(L)} y2={mid - 52} className="stroke-foreground/70" strokeWidth={2} />
            <line x1={sx(0)} y1={mid + 52} x2={sx(L)} y2={mid + 52} className="stroke-foreground/70" strokeWidth={2} />
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={1.8} className="fill-plot-secondary" />
            ))}
          </>
        )}
        {!pipe && <line x1={sx(0)} y1={mid} x2={sx(L)} y2={mid} className="stroke-foreground/20" />}
        <path d={curve((x) => yPx * shape(x))} fill="none" className="stroke-muted-foreground/50" strokeDasharray="4 3" />
        <path d={curve((x) => -yPx * shape(x))} fill="none" className="stroke-muted-foreground/50" strokeDasharray="4 3" />
        {!pipe && config.showComponents && (
          <>
            <path
              d={curve((x) => (yPx / 2) * (cosShape ? Math.cos(k * x - w * t) : Math.sin(k * x - w * t)))}
              fill="none"
              className="stroke-plot-secondary/70"
              strokeWidth={1.2}
            />
            <path
              d={curve((x) => (yPx / 2) * (cosShape ? Math.cos(k * x + w * t) : Math.sin(k * x + w * t)))}
              fill="none"
              className="stroke-callout-tip/70"
              strokeWidth={1.2}
            />
          </>
        )}
        {!pipe && <path d={curve((x) => yPx * shape(x) * ct)} fill="none" className="stroke-plot" strokeWidth={2.5} />}
        {endMark(0, leftEnd, "l")}
        {endMark(L, rightEnd, "r")}
        {nodes.map((x) => (
          <g key={`n${x}`}>
            <circle cx={sx(x)} cy={mid} r={3} className="fill-callout-warning stroke-callout-warning" />
            <text x={sx(x)} y={H - 16} textAnchor="middle" className="fill-callout-warning text-[10px] font-medium">
              N
            </text>
          </g>
        ))}
        {antinodes.map((x) => (
          <text key={`a${x}`} x={sx(x)} y={H - 4} textAnchor="middle" className="fill-plot text-[10px] font-medium">
            A
          </text>
        ))}
        <text x={left} y={14} className="fill-muted-foreground text-[9px]">
          {pipe ? "dots: air layers (longitudinal); dashed: displacement envelope" : "dashed: envelope ±2A sin kx"}
        </text>
      </svg>
      <TimeControl clock={clock} max={4} unit="T" />
      <div className="space-y-2">{sliders}</div>
      <Readouts rows={rows} />
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          (pipe
            ? "N and A mark displacement nodes and antinodes. A closed end is always a displacement node, an open end an antinode."
            : "Every point oscillates in place; the nodes (N) never move. Step n and count the loops.")}
      </p>
    </InteractiveFrame>
  );
}

// ---------- Beats ----------

function BeatsView({ config, p, sliders }: { config: Config; p: Params; sliders: React.ReactNode }) {
  const f1 = p.f1;
  const f2 = p.f2;
  const df = Math.abs(f1 - f2);
  const A = p.amplitude;
  const duration = config.duration ?? (df > 1e-9 ? Math.min(3 / df, 400 / Math.max(f1, f2)) : 4 / Math.max(f1, f2));
  const y1 = (t: number) => A * Math.sin(TWO_PI * f1 * t);
  const y2 = (t: number) => A * Math.sin(TWO_PI * f2 * t);
  const y = (t: number) => y1(t) + y2(t);
  const envP = (t: number) => 2 * A * Math.abs(Math.cos(Math.PI * df * t));
  const envM = (t: number) => -envP(t);

  const rows: [string, string][] = [
    ["f_{\\text{beat}} = |f_1 - f_2|", `${fmt(df, 3)}\\ \\text{Hz}`],
    ["T_{\\text{beat}}", df > 1e-9 ? `${fmt(1 / df, 3)}\\ \\text{s}` : "\\infty"],
    ["\\text{heard pitch } (f_1+f_2)/2", `${fmt((f1 + f2) / 2, 3)}\\ \\text{Hz}`],
    ["\\text{window}", `${fmt(duration, 3)}\\ \\text{s}`],
  ];

  return (
    <InteractiveFrame title="Beats">
      <div className="text-center">
        <Latex latex={`y = 2A\\cos\\!\\left(\\pi (f_1 - f_2)t\\right)\\sin\\!\\left(\\pi (f_1 + f_2)t\\right)`} display />
      </div>
      <div className="space-y-2">
        <TimeStrip label="y₁" unit={`f₁ = ${fmt(f1, 2)} Hz`} fn={y1} tMax={duration} height={60} className="stroke-plot-secondary" />
        <TimeStrip label="y₂" unit={`f₂ = ${fmt(f2, 2)} Hz`} fn={y2} tMax={duration} height={60} className="stroke-callout-tip" />
        <TimeStrip
          label="y"
          unit="sum"
          fn={y}
          tMax={duration}
          height={120}
          extra={[
            { fn: envP, className: "stroke-callout-warning", dashed: true },
            { fn: envM, className: "stroke-callout-warning", dashed: true },
          ]}
        />
      </div>
      <div className="space-y-2">{sliders}</div>
      <Readouts rows={rows} />
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "The loudness (dashed envelope) swells and fades |f₁ − f₂| times per second. Make the two frequencies equal and the beats vanish."}
      </p>
    </InteractiveFrame>
  );
}

// ---------- Doppler ----------

function DopplerView({ config, p, sliders }: { config: Config; p: Params; sliders: React.ReactNode }) {
  const T_MAX = 2.4;
  const EMIT = 0.12;
  const clock = useClock({ initial: T_MAX, max: T_MAX, rate: 0.8, loop: false });
  const v = p.waveSpeed;
  const vs = p.sourceSpeed;
  const vo = p.observerSpeed;
  const f = config.sourceFrequency;
  const mach = vs / v;

  const H = 260;
  const SC = 160;
  const px = (x: number) => x * SC;
  const py = (y: number) => H / 2 - y * SC;
  const xEnd = 1.8;
  const xs = (tau: number) => xEnd - mach * (T_MAX - tau);
  const t = clock.t;
  const fronts: { cx: number; r: number }[] = [];
  for (let i = 0; i * EMIT <= t + 1e-9; i++) {
    const te = i * EMIT;
    fronts.push({ cx: xs(te), r: t - te });
  }
  const sNow = xs(t);
  const markerId = useId().replace(/:/g, "");

  const subsonic = vs < v;
  const fAhead = subsonic ? (f * (v + vo)) / (v - vs) : NaN;
  const fBehind = (f * (v + vo)) / (v + vs);
  const rows: [string, string][] = [
    ["f_{\\text{ahead}} = f\\,\\frac{v + v_o}{v - v_s}", subsonic ? `${fmt(fAhead, 1)}\\ \\text{Hz}` : "\\text{shock: } v_s \\ge v"],
    ["f_{\\text{behind}} = f\\,\\frac{v + v_o}{v + v_s}", `${fmt(fBehind, 1)}\\ \\text{Hz}`],
    ["\\lambda_{\\text{ahead}} = (v - v_s)/f", subsonic ? `${fmt((v - vs) / f, 3)}\\ \\text{m}` : "—"],
    ["\\lambda_{\\text{behind}} = (v + v_s)/f", `${fmt((v + vs) / f, 3)}\\ \\text{m}`],
    ["f\\ (\\text{source})", `${fmt(f, 1)}\\ \\text{Hz}`],
    ["v_s / v", fmt(mach, 3)],
  ];

  return (
    <InteractiveFrame title="Doppler effect">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img">
        <defs>
          <ArrowMarker id={`${markerId}s`} className="fill-plot" />
        </defs>
        {fronts.map((fr, i) => (
          <circle key={i} cx={px(fr.cx)} cy={py(0)} r={Math.max(px(fr.r), 0.1)} fill="none" className="stroke-plot/50" strokeWidth={1} />
        ))}
        <line x1={0} y1={py(0)} x2={W} y2={py(0)} className="stroke-foreground/15" />
        <circle cx={px(sNow)} cy={py(0)} r={7} className="fill-plot stroke-plot" />
        {vs > 0 && (
          <line
            x1={px(sNow) + 9}
            y1={py(0) - 16}
            x2={px(sNow) + 9 + Math.min(60, 40 * mach + 12)}
            y2={py(0) - 16}
            className="stroke-plot"
            strokeWidth={2}
            markerEnd={`url(#${markerId}s)`}
          />
        )}
        <text x={px(sNow)} y={py(0) + 22} textAnchor="middle" className="fill-foreground text-[9px]">
          S
        </text>
        {[
          { x: 2.85, label: "ahead" },
          { x: 0.15, label: "behind" },
        ].map((o) => (
          <g key={o.label}>
            <rect x={px(o.x) - 6} y={py(0) - 6} width={12} height={12} className="fill-callout-tip stroke-callout-tip" />
            <text x={px(o.x)} y={py(0) + 22} textAnchor="middle" className="fill-foreground text-[9px]">
              {o.label}
            </text>
          </g>
        ))}
      </svg>
      <TimeControl clock={clock} max={T_MAX} unit="(slow motion)" />
      <div className="space-y-2">{sliders}</div>
      <Readouts rows={rows} />
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "Each circle is one crest, centred where the source was when it emitted it. Crests bunch up ahead (higher pitch) and spread out behind. Push v_s past v to see the shock cone."}
      </p>
    </InteractiveFrame>
  );
}
