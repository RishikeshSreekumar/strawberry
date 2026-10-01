"use client";

import { useEffect, useId, useState } from "react";
import type { z } from "zod";
import type { mfeMotionLabSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex } from "./vec-canvas-2d";

type Config = z.infer<typeof mfeMotionLabSchema>;
type Mode = Config["mode"];
type SliderKey = keyof Config["sliders"];

// ---------- helpers shared with mfe-force-lab ----------

export type MfeRange = { min: number; max: number; step: number; initial: number };

/** Two-decimal display that never prints NaN or "-0". */
export function f2(v: number, decimals = 2): string {
  if (!Number.isFinite(v)) return "\\infty";
  return formatNumber(Math.abs(v) < 1e-9 ? 0 : v, decimals);
}

/** LaTeX units. */
export const U = {
  m: "\\text{m}",
  s: "\\text{s}",
  ms: "\\text{m/s}",
  ms2: "\\text{m/s}^2",
  N: "\\text{N}",
  J: "\\text{J}",
  kg: "\\text{kg}",
  deg: "^\\circ",
  rad: "\\text{rad/s}",
} as const;

/** "name = value unit" in LaTeX. */
export function q(name: string, value: number, unit = "", decimals = 2): string {
  const v = f2(value, decimals);
  if (!unit) return `${name} = ${v}`;
  return unit === U.deg ? `${name} = ${v}${unit}` : `${name} = ${v}\\,${unit}`;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round a raw step up to 1, 2 or 5 times a power of ten. */
export function niceStep(raw: number): number {
  if (!(raw > 0) || !Number.isFinite(raw)) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const r = raw / p;
  return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * p;
}

export function niceTicks(lo: number, hi: number, target = 5): number[] {
  const step = niceStep((hi - lo) / target);
  const out: number[] = [];
  for (let v = Math.ceil(lo / step - 1e-9) * step; v <= hi + 1e-9 && out.length < 40; v += step) {
    out.push(Math.abs(v) < step * 1e-6 ? 0 : v);
  }
  return out;
}

/** Pad [lo, hi] a little and snap outward to nice ticks; never returns an empty span. */
export function niceExtent(lo: number, hi: number, target = 4): [number, number] {
  let a = Math.min(lo, hi);
  let b = Math.max(lo, hi);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return [-1, 1];
  if (b - a < 1e-9) {
    a -= 1;
    b += 1;
  }
  const step = niceStep((b - a) / target);
  return [Math.floor(a / step - 1e-9) * step, Math.ceil(b / step + 1e-9) * step];
}

/** Slider, or a fixed readout when min === max. */
export function ParamSlider({
  label,
  unit,
  range,
  value,
  onChange,
}: {
  label: string;
  unit?: string;
  range: MfeRange;
  value: number;
  onChange: (v: number) => void;
}) {
  if (range.min === range.max) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="w-16 shrink-0 font-medium">
          <Latex latex={label} />
        </span>
        <span className="tabular-nums text-muted-foreground">
          {f2(value)}
          {unit ? ` ${unit}` : ""} (fixed)
        </span>
      </div>
    );
  }
  return (
    <SliderRow
      label={<Latex latex={label} />}
      value={value}
      min={range.min}
      max={range.max}
      step={range.step}
      unit={unit}
      onChange={onChange}
    />
  );
}

export type ReadoutItem = { latex: string; note?: string };

export function Readouts({ items }: { items: ReadoutItem[] }) {
  return (
    <div className="grid gap-x-6 gap-y-1.5 rounded-md border bg-background p-3 text-sm sm:grid-cols-2">
      {items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-2">
          <span className="overflow-x-auto">
            <Latex latex={it.latex} />
          </span>
          {it.note && <span className="text-xs text-muted-foreground">{it.note}</span>}
        </div>
      ))}
    </div>
  );
}

export function Notes({ notes }: { notes: string[] }) {
  return (
    <>
      {notes.map((n) => (
        <p key={n} className="text-sm font-medium text-callout-warning">
          {n}
        </p>
      ))}
    </>
  );
}

export function CaptionRow({ caption, onReset }: { caption: string; onReset: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs text-muted-foreground">{caption}</p>
      <button type="button" onClick={onReset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
        Reset
      </button>
    </div>
  );
}

export type PlotSeries = { pts: [number, number][]; className?: string; dashed?: boolean; width?: number };
export type PlotFill = { pts: [number, number][]; className: string };
export type PlotMarker = { x: number; y: number; className?: string; r?: number };
export type PlotSegment = { x1: number; y1: number; x2: number; y2: number; className?: string; dashed?: boolean };

/** Small axis-labelled plot with its own nice ticks (not tied to integer grids). */
export function MfePlot({
  xmin,
  xmax,
  ymin,
  ymax,
  xLabel,
  yLabel,
  height = 130,
  series = [],
  fills = [],
  markers = [],
  segments = [],
}: {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  xLabel: string;
  yLabel: string;
  height?: number;
  series?: PlotSeries[];
  fills?: PlotFill[];
  markers?: PlotMarker[];
  segments?: PlotSegment[];
}) {
  const clipId = useId().replace(/:/g, "");
  const W = 400;
  const padL = 40;
  const padR = 10;
  const padT = 8;
  const padB = 20;
  const pw = W - padL - padR;
  const ph = height - padT - padB;
  const xs = xmax - xmin || 1;
  const ys = ymax - ymin || 1;
  const sx = (x: number) => padL + ((x - xmin) / xs) * pw;
  const sy = (y: number) => padT + ph - ((y - ymin) / ys) * ph;
  const path = (pts: [number, number][]) =>
    pts
      .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]))
      .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p[0]).toFixed(2)} ${sy(p[1]).toFixed(2)}`)
      .join(" ");
  const xt = niceTicks(xmin, xmax, 6);
  const yt = niceTicks(ymin, ymax, 4);
  const y0 = ymin <= 0 && ymax >= 0 ? sy(0) : sy(ymin);
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full rounded-md border bg-background" role="img" aria-label={`${yLabel} against ${xLabel}`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={padL} y={padT} width={pw} height={ph} />
        </clipPath>
      </defs>
      {xt.map((x) => (
        <line key={`gx${x}`} x1={sx(x)} y1={padT} x2={sx(x)} y2={padT + ph} className="stroke-border" strokeWidth={0.5} />
      ))}
      {yt.map((y) => (
        <line key={`gy${y}`} x1={padL} y1={sy(y)} x2={padL + pw} y2={sy(y)} className="stroke-border" strokeWidth={0.5} />
      ))}
      <line x1={padL} y1={y0} x2={padL + pw} y2={y0} className="stroke-foreground/50" strokeWidth={1} />
      <line x1={padL} y1={padT} x2={padL} y2={padT + ph} className="stroke-foreground/50" strokeWidth={1} />
      {xt.map((x) => (
        <text key={`tx${x}`} x={sx(x)} y={height - 6} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          {f2(x)}
        </text>
      ))}
      {yt.map((y) => (
        <text key={`ty${y}`} x={padL - 4} y={sy(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
          {f2(y)}
        </text>
      ))}
      <text x={padL + 4} y={padT + 10} className="fill-foreground text-[10px] font-medium">
        {yLabel}
      </text>
      <text x={padL + pw - 2} y={Math.min(y0 - 4, padT + ph - 4)} textAnchor="end" className="fill-foreground text-[10px] font-medium">
        {xLabel}
      </text>
      <g clipPath={`url(#${clipId})`}>
        {fills.map((f, i) =>
          f.pts.length > 2 ? <path key={`f${i}`} d={`${path(f.pts)} Z`} className={f.className} stroke="none" /> : null,
        )}
        {series.map((s, i) => (
          <path
            key={`s${i}`}
            d={path(s.pts)}
            fill="none"
            strokeWidth={s.width ?? 2}
            strokeDasharray={s.dashed ? "5 4" : undefined}
            className={s.className ?? "stroke-plot"}
          />
        ))}
        {segments.map((s, i) => (
          <line
            key={`l${i}`}
            x1={sx(s.x1)}
            y1={sy(s.y1)}
            x2={sx(s.x2)}
            y2={sy(s.y2)}
            strokeWidth={1.5}
            strokeDasharray={s.dashed ? "4 3" : undefined}
            className={s.className ?? "stroke-callout-warning"}
          />
        ))}
        {markers.map((m, i) => (
          <circle key={`m${i}`} cx={sx(m.x)} cy={sy(m.y)} r={m.r ?? 4.5} className={m.className ?? "fill-plot"} />
        ))}
      </g>
    </svg>
  );
}

/** Time scrubber with a play button: t runs from 0 to tMax. */
export function useScrubber(tMax: number, initial = 0) {
  const [t, setT] = useState(initial);
  const [play, setPlay] = useState<{ from: number } | null>(null);
  const safeMax = Number.isFinite(tMax) && tMax > 0 ? tMax : 0;
  useEffect(() => {
    if (!play || safeMax <= 0) return;
    // Whole run takes between 3 and 8 seconds of wall time.
    const rate = safeMax / clamp(safeMax, 3, 8);
    let pos = play.from;
    let last: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      if (last !== null) pos = Math.min(safeMax, pos + ((now - last) / 1000) * rate);
      last = now;
      setT(pos);
      if (pos >= safeMax) {
        setPlay(null);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [play, safeMax]);
  const tc = clamp(t, 0, safeMax);
  const toggle = () => {
    if (play) {
      setPlay(null);
      return;
    }
    const reduce =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(safeMax);
      return;
    }
    setPlay({ from: tc >= safeMax - 1e-9 ? 0 : tc });
  };
  const reset = () => {
    setPlay(null);
    setT(initial);
  };
  return { t: tc, setT: (v: number) => { setPlay(null); setT(v); }, playing: play !== null, toggle, reset, tMax: safeMax };
}

export function ScrubberRow({ s }: { s: ReturnType<typeof useScrubber> }) {
  const step = s.tMax > 0 ? Number(niceStep(s.tMax / 200).toPrecision(3)) : 0.01;
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={s.toggle}
        disabled={s.tMax <= 0}
        className="w-14 shrink-0 rounded-md border bg-background px-2 py-1 text-xs"
      >
        {s.playing ? "Pause" : "Play"}
      </button>
      <div className="flex-1">
        <SliderRow
          label={<Latex latex="t" />}
          value={Number(s.t.toFixed(2))}
          min={0}
          max={Number(s.tMax.toFixed(2))}
          step={step}
          unit="s"
          onChange={s.setT}
        />
      </div>
    </div>
  );
}

// ---------- the motion lab ----------

const BASE: Record<SliderKey, MfeRange> = {
  x0: { min: -20, max: 20, step: 1, initial: 0 },
  u: { min: -20, max: 20, step: 1, initial: 10 },
  a: { min: -10, max: 10, step: 0.5, initial: -2 },
  speed: { min: 5, max: 40, step: 1, initial: 20 },
  angle: { min: 0, max: 90, step: 1, initial: 45 },
  height: { min: 0, max: 50, step: 5, initial: 0 },
  river: { min: 0, max: 10, step: 0.5, initial: 3 },
  boat: { min: 1, max: 10, step: 0.5, initial: 5 },
  heading: { min: -80, max: 80, step: 1, initial: 0 },
  rain: { min: 1, max: 20, step: 1, initial: 10 },
  wind: { min: -10, max: 10, step: 1, initial: 0 },
  man: { min: -10, max: 10, step: 1, initial: 5 },
  radius: { min: 1, max: 10, step: 0.5, initial: 2 },
  tangential: { min: -2, max: 2, step: 0.5, initial: 0 },
};

const MODE_OVERRIDES: Record<Mode, Partial<Record<SliderKey, MfeRange>>> = {
  line: {},
  projectile: {},
  "river-boat": {},
  "rain-man": {},
  circular: { speed: { min: 1, max: 20, step: 1, initial: 4 } },
};

const MODE_KEYS: Record<Mode, SliderKey[]> = {
  line: ["x0", "u", "a"],
  projectile: ["speed", "angle", "height"],
  "river-boat": ["river", "boat", "heading"],
  "rain-man": ["rain", "wind", "man"],
  circular: ["radius", "speed", "tangential"],
};

const LABELS: Record<SliderKey, string> = {
  x0: "x_0",
  u: "u",
  a: "a",
  speed: "u",
  angle: "\\theta",
  height: "h",
  river: "v_w",
  boat: "v_{bw}",
  heading: "\\alpha",
  rain: "v_{\\text{rain}}",
  wind: "v_{\\text{wind}}",
  man: "v_{\\text{man}}",
  radius: "R",
  tangential: "a_t",
};

const UNITS: Record<SliderKey, string> = {
  x0: "m",
  u: "m/s",
  a: "m/s²",
  speed: "m/s",
  angle: "°",
  height: "m",
  river: "m/s",
  boat: "m/s",
  heading: "°",
  rain: "m/s",
  wind: "m/s",
  man: "m/s",
  radius: "m",
  tangential: "m/s²",
};

const CAPTIONS: Record<Mode, string> = {
  line: "Press play or scrub t. The slope of x-t is v; the area under v-t is the displacement; a-t is flat for uniform acceleration.",
  projectile: "Horizontal velocity never changes; only the vertical part feels g. Try two angles that add to 90°.",
  "river-boat": "The boat's velocity relative to the ground is its velocity through the water plus the water's velocity.",
  "rain-man": "Hold the umbrella against the rain's velocity relative to you, not relative to the ground.",
  circular: "Velocity is always along the tangent; the centripetal part of acceleration always points to the centre.",
};

const DEG = Math.PI / 180;

export function MfeMotionLab({ config }: { config: Config }) {
  const { mode } = config;
  const g = config.g;
  const ranges: Record<SliderKey, MfeRange> = { ...BASE, ...MODE_OVERRIDES[mode] };
  for (const k of Object.keys(config.sliders) as SliderKey[]) {
    const r = config.sliders[k];
    if (r) ranges[k] = r;
  }
  const initialValues = () =>
    Object.fromEntries((Object.keys(ranges) as SliderKey[]).map((k) => [k, ranges[k].initial])) as Record<SliderKey, number>;
  const [p, setP] = useState<Record<SliderKey, number>>(initialValues);
  const set = (k: SliderKey) => (v: number) => setP((prev) => ({ ...prev, [k]: v }));

  // ---------- time span per mode ----------
  const th = p.angle * DEG;
  const vx0 = p.speed * Math.cos(th);
  const vy0 = p.speed * Math.sin(th);
  const flightTime = (vy: number) => {
    const disc = vy * vy + 2 * g * Math.max(0, p.height);
    const T = (vy + Math.sqrt(Math.max(0, disc))) / g;
    return Number.isFinite(T) && T > 0 ? T : 0;
  };
  const Tflight = flightTime(vy0);

  const circStop = p.tangential < 0 ? -p.speed / p.tangential : Infinity;
  const circMax =
    p.tangential === 0
      ? p.speed > 0 && p.radius > 0
        ? (2 * Math.PI * p.radius) / p.speed
        : config.duration
      : Math.min(config.duration, circStop);

  const tMax = mode === "line" ? config.duration : mode === "projectile" ? Tflight : mode === "circular" ? circMax : 0;
  const scrub = useScrubber(tMax);
  const t = scrub.t;

  const reset = () => {
    setP(initialValues());
    scrub.reset();
  };

  let body: React.ReactNode = null;
  let readouts: ReadoutItem[] = [];
  const notes: string[] = [];

  switch (mode) {
    case "line": {
      const { x0, u, a } = p;
      const D = config.duration;
      const xAt = (tt: number) => x0 + u * tt + 0.5 * a * tt * tt;
      const vAt = (tt: number) => u + a * tt;
      const N = 120;
      const ts = Array.from({ length: N + 1 }, (_, i) => (D * i) / N);
      const xPts = ts.map((tt) => [tt, xAt(tt)] as [number, number]);
      const vPts = ts.map((tt) => [tt, vAt(tt)] as [number, number]);
      const [xlo, xhi] = niceExtent(Math.min(...xPts.map((q2) => q2[1])), Math.max(...xPts.map((q2) => q2[1])));
      const [vlo, vhi] = niceExtent(Math.min(0, ...vPts.map((q2) => q2[1])), Math.max(0, ...vPts.map((q2) => q2[1])));
      const [alo, ahi] = niceExtent(Math.min(0, a) - 1, Math.max(0, a) + 1);
      const xt = xAt(t);
      const vt = vAt(t);
      const turn = a !== 0 ? -u / a : NaN;
      const turns = Number.isFinite(turn) && turn > 0 && turn < D;
      const dist = turns && t > turn ? Math.abs(xAt(turn) - x0) + Math.abs(xt - xAt(turn)) : Math.abs(xt - x0);

      // Area under v-t from 0 to t, split where v changes sign.
      const areaPiece = (t0: number, t1: number): [number, number][] => {
        if (t1 - t0 < 1e-9) return [];
        const M = 40;
        const pts: [number, number][] = [[t0, 0]];
        for (let i = 0; i <= M; i++) {
          const tt = t0 + ((t1 - t0) * i) / M;
          pts.push([tt, vAt(tt)]);
        }
        pts.push([t1, 0]);
        return pts;
      };
      const split = turns && t > turn ? turn : t;
      const fills: PlotFill[] = config.showArea
        ? [
            { pts: areaPiece(0, split), className: u >= 0 ? "fill-callout-tip/25" : "fill-callout-warning/25" },
            ...(turns && t > turn ? [{ pts: areaPiece(turn, t), className: u >= 0 ? "fill-callout-warning/25" : "fill-callout-tip/25" }] : []),
          ]
        : [];
      const dT = D * 0.12;
      const tangent: PlotSegment[] = config.showTangent
        ? [{ x1: t - dT, y1: xt - vt * dT, x2: t + dT, y2: xt + vt * dT, className: "stroke-callout-warning" }]
        : [];

      // Track.
      const TW = 400;
      const tx = (x: number) => 20 + ((x - xlo) / (xhi - xlo || 1)) * (TW - 40);
      const vScale = 40 / Math.max(1, Math.abs(ranges.u.max), Math.abs(ranges.u.min), Math.abs(u) + Math.abs(a) * D);
      body = (
        <div className="space-y-2">
          <svg viewBox={`0 0 ${TW} 64`} className="w-full rounded-md border bg-background" role="img" aria-label="Particle on a straight track">
            <line x1={10} y1={40} x2={TW - 10} y2={40} className="stroke-foreground/50" strokeWidth={1.5} />
            {niceTicks(xlo, xhi, 8).map((x) => (
              <g key={x}>
                <line x1={tx(x)} y1={36} x2={tx(x)} y2={44} className="stroke-foreground/40" />
                <text x={tx(x)} y={58} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                  {f2(x)}
                </text>
              </g>
            ))}
            <circle cx={tx(x0)} cy={40} r={3} className="fill-muted-foreground" />
            <circle cx={tx(xt)} cy={40} r={6} className="fill-primary" />
            <ArrowSvg x1={tx(xt)} y1={22} x2={tx(xt) + vt * vScale} y2={22} color="a" width={2} />
            <SvgLatex x={tx(xt)} y={10} latex="\vec v" />
          </svg>
          {config.graphs.includes("x") && (
            <MfePlot
              xmin={0}
              xmax={D}
              ymin={xlo}
              ymax={xhi}
              xLabel="t (s)"
              yLabel="x (m)"
              series={[{ pts: xPts }]}
              segments={tangent}
              markers={[{ x: t, y: xt, className: "fill-primary" }]}
            />
          )}
          {config.graphs.includes("v") && (
            <MfePlot
              xmin={0}
              xmax={D}
              ymin={vlo}
              ymax={vhi}
              xLabel="t (s)"
              yLabel="v (m/s)"
              series={[{ pts: vPts, className: "stroke-callout-info" }]}
              fills={fills}
              markers={[{ x: t, y: vt, className: "fill-callout-info" }]}
            />
          )}
          {config.graphs.includes("a") && (
            <MfePlot
              xmin={0}
              xmax={D}
              ymin={alo}
              ymax={ahi}
              height={100}
              xLabel="t (s)"
              yLabel="a (m/s²)"
              series={[{ pts: [[0, a], [D, a]], className: "stroke-callout-definition" }]}
              markers={[{ x: t, y: a, className: "fill-callout-definition" }]}
            />
          )}
        </div>
      );
      readouts = [
        { latex: `x = x_0 + ut + \\tfrac12 at^2 = ${f2(xt)}\\,${U.m}` },
        { latex: `v = u + at = ${f2(vt)}\\,${U.ms}`, note: config.showTangent ? "slope of x-t" : undefined },
        { latex: q("a", a, U.ms2), note: "slope of v-t" },
        { latex: q("s = x - x_0", xt - x0, U.m), note: config.showArea ? "signed area under v-t" : undefined },
        { latex: q("\\text{distance}", dist, U.m), note: "total path length" },
        { latex: q("v^2 - u^2", vt * vt - u * u, "\\text{m}^2/\\text{s}^2"), note: `= 2as = ${f2(2 * a * (xt - x0))}` },
      ];
      if (turns) notes.push(`The particle turns around at t = ${f2(turn)} s, where v = 0 but a = ${f2(a)} m/s² is not zero.`);
      if (turns && t > turn) notes.push("After turning, distance keeps growing while displacement shrinks.");
      break;
    }

    case "projectile": {
      const h = Math.max(0, p.height);
      // Fixed window for the current speed and height: the widest range over all angles.
      let bestR = 0;
      for (let deg = 0; deg <= 90; deg++) {
        const c = Math.cos(deg * DEG);
        const s = Math.sin(deg * DEG);
        bestR = Math.max(bestR, p.speed * c * flightTime(p.speed * s));
      }
      const peak = h + (p.speed * p.speed) / (2 * g);
      const xspan = Math.max(bestR, 1) * 1.08;
      const yspan = Math.max(peak, 1) * 1.12;
      const scale = Math.min(350 / xspan, 230 / yspan);
      const padL = 36;
      const padB = 22;
      const W = 400;
      const H = Math.max(120, yspan * scale + padB + 8);
      const sx = (x: number) => padL + x * scale;
      const sy = (y: number) => H - padB - y * scale;
      const traj = (vx: number, vy: number, T: number) => {
        const M = 80;
        let d = "";
        for (let i = 0; i <= M; i++) {
          const tt = (T * i) / M;
          const x = vx * tt;
          const y = h + vy * tt - 0.5 * g * tt * tt;
          d += `${i === 0 ? "M" : "L"} ${sx(x).toFixed(2)} ${sy(Math.max(0, y)).toFixed(2)} `;
        }
        return d;
      };
      const R = vx0 * Tflight;
      const Hmax = vy0 > 0 ? h + (vy0 * vy0) / (2 * g) : h;
      const tPeak = vy0 > 0 ? vy0 / g : 0;
      const xt = vx0 * t;
      const yt = Math.max(0, h + vy0 * t - 0.5 * g * t * t);
      const vyt = vy0 - g * t;
      const vt = Math.hypot(vx0, vyt);
      const dirDeg = Math.atan2(vyt, vx0) / DEG;
      const k = 55 / Math.max(1, p.speed);
      const comp = 90 - p.angle;
      const vxc = p.speed * Math.cos(comp * DEG);
      const vyc = p.speed * Math.sin(comp * DEG);
      const Tc = flightTime(vyc);
      const Rc = vxc * Tc;
      const px = sx(xt);
      const py = sy(yt);
      body = (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label="Projectile trajectory">
          {niceTicks(0, xspan, 6).map((x) => (
            <g key={`x${x}`}>
              <line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(yspan)} className="stroke-border" strokeWidth={0.5} />
              <text x={sx(x)} y={H - 8} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                {f2(x)}
              </text>
            </g>
          ))}
          {niceTicks(0, yspan, 4).map((y) => (
            <g key={`y${y}`}>
              <line x1={sx(0)} y1={sy(y)} x2={sx(xspan)} y2={sy(y)} className="stroke-border" strokeWidth={0.5} />
              <text x={padL - 4} y={sy(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
                {f2(y)}
              </text>
            </g>
          ))}
          <line x1={padL} y1={sy(0)} x2={W - 4} y2={sy(0)} className="stroke-foreground/60" strokeWidth={1.5} />
          {h > 0 && <rect x={sx(0) - 8} y={sy(h)} width={8} height={h * scale} className="fill-muted-foreground/30 stroke-muted-foreground" />}
          {config.showComplementary && Math.abs(comp - p.angle) > 1e-9 && (
            <path d={traj(vxc, vyc, Tc)} fill="none" strokeWidth={1.5} strokeDasharray="5 4" className="stroke-callout-definition" />
          )}
          <path d={traj(vx0, vy0, Tflight)} fill="none" strokeWidth={2} className="stroke-plot" />
          {vy0 > 0 && <circle cx={sx(vx0 * tPeak)} cy={sy(Hmax)} r={3} className="fill-callout-warning" />}
          {vy0 > 0 && <SvgLatex x={sx(vx0 * tPeak)} y={sy(Hmax) - 12} latex="H" />}
          <circle cx={sx(R)} cy={sy(0)} r={3} className="fill-callout-warning" />
          <SvgLatex x={sx(R)} y={sy(0) - 12} latex="R" />
          {config.showVectors && (
            <g>
              <ArrowSvg x1={px} y1={py} x2={px + vx0 * k} y2={py} color="b" width={1.5} dashed />
              <ArrowSvg x1={px} y1={py} x2={px} y2={py - vyt * k} color="c" width={1.5} dashed />
              <ArrowSvg x1={px} y1={py} x2={px + vx0 * k} y2={py - vyt * k} color="a" width={2.5} />
            </g>
          )}
          <circle cx={px} cy={py} r={5} className="fill-primary" />
        </svg>
      );
      readouts = [
        { latex: `(x, y) = (${f2(xt)},\\ ${f2(yt)})\\,${U.m}` },
        { latex: `v_x = u\\cos\\theta = ${f2(vx0)}\\,${U.ms}`, note: "never changes" },
        { latex: `v_y = u\\sin\\theta - gt = ${f2(vyt)}\\,${U.ms}` },
        { latex: `\\lvert\\vec v\\rvert = ${f2(vt)}\\,${U.ms}`, note: `at ${f2(dirDeg)}° to the horizontal` },
        { latex: q("T", Tflight, U.s), note: h === 0 ? "T = 2u sin θ / g" : "from y = 0" },
        { latex: q("R", R, U.m), note: h === 0 ? "R = u² sin 2θ / g" : undefined },
        { latex: q("H", Hmax, U.m), note: h === 0 ? "H = u² sin²θ / 2g" : "above the ground" },
      ];
      if (config.showComplementary) readouts.push({ latex: q(`R_{${f2(comp)}^\\circ}`, Rc, U.m), note: "complementary angle (dashed)" });
      if (h === 0 && Math.abs(p.angle - 45) < 1e-9) notes.push("θ = 45°: the largest range for this speed on level ground.");
      if (Math.abs(t - tPeak) < tMax / 100 && vy0 > 0) notes.push("At the top v_y = 0, but the velocity is not zero and a = g still points down.");
      break;
    }

    case "river-boat": {
      const d = config.riverWidth;
      const al = p.heading * DEG;
      const vb = p.boat;
      const uw = p.river;
      const vgx = uw - vb * Math.sin(al);
      const vgy = vb * Math.cos(al);
      const tCross = vgy > 1e-9 ? d / vgy : Infinity;
      const drift = Number.isFinite(tCross) ? vgx * tCross : 0;
      const shown = clamp(drift, -4 * d, 4 * d);
      const xlo = Math.min(0, shown) - 0.3 * d;
      const xhi = Math.max(0, shown) + 0.3 * d;
      const W = 400;
      const scale = Math.min((W - 20) / (xhi - xlo), 170 / d);
      const H = d * scale + 50;
      const sx = (x: number) => 10 + (x - xlo) * scale;
      const sy = (y: number) => H - 25 - y * scale;
      const flows = [0.25, 0.5, 0.75].flatMap((fy) =>
        [0.15, 0.45, 0.75].map((fx) => [xlo + fx * (xhi - xlo), fy * d] as [number, number]),
      );
      const vk = 70 / Math.max(1, vb, uw, Math.hypot(vgx, vgy));
      const TW = 220;
      const TH = 190;
      const ox = TW / 2 - (vgx * vk) / 2;
      const oy = TH - 20;
      body = (
        <div className="grid gap-2 sm:grid-cols-[3fr_2fr]">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label="River crossing">
            <rect x={0} y={sy(d)} width={W} height={d * scale} className="fill-callout-info/10" />
            <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-foreground/60" strokeWidth={2} />
            <line x1={0} y1={sy(d)} x2={W} y2={sy(d)} className="stroke-foreground/60" strokeWidth={2} />
            {flows.map(([fx, fy], i) => (
              <ArrowSvg key={i} x1={sx(fx)} y1={sy(fy)} x2={sx(fx) + 12 + uw * 3} y2={sy(fy)} color="b" width={1} opacity={uw > 0 ? 0.45 : 0} />
            ))}
            <circle cx={sx(0)} cy={sy(d)} r={4} className="fill-muted-foreground" />
            <SvgLatex x={sx(0)} y={sy(d) - 12} latex="\text{opposite}" className="text-muted-foreground" />
            <line x1={sx(0)} y1={sy(0)} x2={sx(shown)} y2={sy(d)} className="stroke-callout-tip" strokeWidth={2.5} strokeDasharray={drift !== shown ? "6 4" : undefined} />
            <circle cx={sx(shown)} cy={sy(d)} r={5} className="fill-callout-tip" />
            <ArrowSvg x1={sx(0)} y1={sy(0)} x2={sx(0) - Math.sin(al) * 40} y2={sy(0) - Math.cos(al) * 40} color="a" width={2.5} />
            <circle cx={sx(0)} cy={sy(0)} r={4} className="fill-primary" />
            <text x={W - 6} y={H - 8} textAnchor="end" className="fill-muted-foreground text-[9px]">
              flow →
            </text>
          </svg>
          <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full rounded-md border bg-background" role="img" aria-label="Velocity triangle">
            <ArrowSvg x1={ox} y1={oy} x2={ox - vb * Math.sin(al) * vk} y2={oy - vgy * vk} color="a" />
            <ArrowSvg x1={ox - vb * Math.sin(al) * vk} y1={oy - vgy * vk} x2={ox + vgx * vk} y2={oy - vgy * vk} color="b" />
            <ArrowSvg x1={ox} y1={oy} x2={ox + vgx * vk} y2={oy - vgy * vk} color="result" width={3} />
            <SvgLatex x={ox - vb * Math.sin(al) * vk * 0.5 - 22} y={oy - vgy * vk * 0.5} latex="\vec v_{bw}" />
            <SvgLatex x={ox + (vgx * vk - vb * Math.sin(al) * vk) / 2} y={oy - vgy * vk - 12} latex="\vec v_w" />
            <SvgLatex x={ox + vgx * vk * 0.5 + 24} y={oy - vgy * vk * 0.5 + 8} latex="\vec v_b" />
          </svg>
        </div>
      );
      const minDriftHeading = uw > vb && uw > 0 ? Math.asin(vb / uw) / DEG : null;
      const zeroDriftHeading = vb > uw ? Math.asin(uw / vb) / DEG : null;
      readouts = [
        { latex: `\\vec v_b = \\vec v_{bw} + \\vec v_w = (${f2(vgx)},\\ ${f2(vgy)})\\,${U.ms}` },
        { latex: q("\\lvert\\vec v_b\\rvert", Math.hypot(vgx, vgy), U.ms) },
        { latex: `t = \\dfrac{d}{v_{bw}\\cos\\alpha} = ${f2(tCross)}\\,${U.s}`, note: "only the across part crosses" },
        { latex: `\\text{drift} = (v_w - v_{bw}\\sin\\alpha)\\,t = ${f2(drift)}\\,${U.m}`, note: drift < -1e-9 ? "lands upstream" : undefined },
        { latex: `t_{\\min} = d / v_{bw} = ${f2(d / vb)}\\,${U.s}`, note: "head straight across (α = 0)" },
        zeroDriftHeading !== null
          ? { latex: `\\sin\\alpha = v_w / v_{bw} \\Rightarrow \\alpha = ${f2(zeroDriftHeading)}^\\circ`, note: "zero drift (shortest path)" }
          : minDriftHeading !== null
            ? { latex: `\\sin\\alpha = v_{bw}/v_w \\Rightarrow \\alpha = ${f2(minDriftHeading)}^\\circ`, note: "least drift: v_bw < v_w, cannot go straight across" }
            : { latex: "\\alpha = 0^\\circ", note: "equal speeds: no heading reaches the opposite point" },
      ];
      if (drift !== shown) notes.push("The landing point is far downstream, off the picture.");
      break;
    }

    case "rain-man": {
      const r = p.rain;
      const w = p.wind;
      const m = p.man;
      const relx = w - m;
      const rely = -r;
      const phi = Math.atan2(Math.abs(relx), r) / DEG;
      const tiltSign = Math.sign(m - w);
      const W = 400;
      const H = 220;
      const gx = 200;
      const gy = 190;
      const rl = Math.hypot(relx, rely) || 1;
      const ux = relx / rl;
      const uy = rely / rl;
      const streaks: [number, number][] = [];
      for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) streaks.push([20 + i * 60 + (j % 2) * 30, 20 + j * 40]);
      const shaftTop: [number, number] = [gx - ux * 70, gy - 60 + uy * 70];
      const vk = 70 / Math.max(1, Math.hypot(w, r), Math.abs(m), rl);
      const TW = 220;
      const TH = 190;
      const ox = 110 - ((w - m) * vk) / 2;
      const oy = 20;
      // Canopy: perpendicular to the shaft, whose screen direction is (-ux, uy).
      const cx = shaftTop[0];
      const cy = shaftTop[1];
      const px2 = -uy * 34;
      const py2 = -ux * 34;
      body = (
        <div className="grid gap-2 sm:grid-cols-[3fr_2fr]">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label="Rain as seen by the moving man">
            {streaks.map(([x, y], i) => (
              <line key={i} x1={x} y1={y} x2={x + ux * 18} y2={y - uy * 18} className="stroke-callout-info/60" strokeWidth={1.5} strokeLinecap="round" />
            ))}
            <line x1={0} y1={gy + 10} x2={W} y2={gy + 10} className="stroke-foreground/60" strokeWidth={1.5} />
            <circle cx={gx} cy={gy - 62} r={8} className="fill-none stroke-foreground" strokeWidth={2} />
            <line x1={gx} y1={gy - 54} x2={gx} y2={gy - 20} className="stroke-foreground" strokeWidth={2} />
            <line x1={gx} y1={gy - 20} x2={gx - 10} y2={gy + 8} className="stroke-foreground" strokeWidth={2} />
            <line x1={gx} y1={gy - 20} x2={gx + 10} y2={gy + 8} className="stroke-foreground" strokeWidth={2} />
            <line x1={gx} y1={gy - 45} x2={cx} y2={cy} className="stroke-foreground" strokeWidth={2} />
            <path
              d={`M ${cx + px2} ${cy + py2} Q ${cx - ux * 22} ${cy + uy * 22} ${cx - px2} ${cy - py2} Z`}
              className="fill-callout-definition/40 stroke-callout-definition"
              strokeWidth={1.5}
            />
            {Math.abs(m) > 1e-9 && <ArrowSvg x1={gx} y1={gy + 2} x2={gx + m * 4} y2={gy + 2} color="a" width={2} />}
          </svg>
          <svg viewBox={`0 0 ${TW} ${TH}`} className="w-full rounded-md border bg-background" role="img" aria-label="Velocity triangle for rain relative to man">
            <ArrowSvg x1={ox} y1={oy} x2={ox + w * vk} y2={oy + r * vk} color="b" />
            <ArrowSvg x1={ox + w * vk} y1={oy + r * vk} x2={ox + relx * vk} y2={oy + r * vk} color="a" dashed />
            <ArrowSvg x1={ox} y1={oy} x2={ox + relx * vk} y2={oy + r * vk} color="result" width={3} />
            <SvgLatex x={ox + w * vk * 0.5 + (w >= relx ? 22 : -22)} y={oy + r * vk * 0.5} latex="\vec v_r" />
            <SvgLatex x={ox + (w + relx) * vk * 0.5} y={oy + r * vk + 12} latex="-\vec v_m" />
            <SvgLatex x={ox + relx * vk * 0.5 + (w >= relx ? -26 : 26)} y={oy + r * vk * 0.5} latex="\vec v_{rm}" />
          </svg>
        </div>
      );
      const dirWord =
        tiltSign === 0 ? "hold it vertical" : m === 0 ? `tilt it ${tiltSign > 0 ? "right" : "left"}` : tiltSign === Math.sign(m) ? "tilt it forward" : "tilt it backward";
      readouts = [
        { latex: `\\vec v_r = (${f2(w)},\\ ${f2(-r)})\\,${U.ms}`, note: "rain, relative to the ground" },
        { latex: `\\vec v_m = (${f2(m)},\\ 0)\\,${U.ms}` },
        { latex: `\\vec v_{rm} = \\vec v_r - \\vec v_m = (${f2(relx)},\\ ${f2(rely)})\\,${U.ms}` },
        { latex: q("\\lvert\\vec v_{rm}\\rvert", rl, U.ms) },
        { latex: `\\tan\\phi = \\dfrac{\\lvert v_{r,x} - v_m\\rvert}{v_{\\text{rain}}} \\Rightarrow \\phi = ${f2(phi)}^\\circ`, note: `umbrella: ${dirWord}` },
      ];
      if (Math.abs(relx) < 1e-9) notes.push("The man keeps pace with the wind: to him the rain falls straight down.");
      break;
    }

    case "circular": {
      const R = p.radius;
      const v0 = p.speed;
      const at = p.tangential;
      const tt = t;
      const v = Math.max(0, v0 + at * tt);
      const s = v0 * tt + 0.5 * at * tt * tt;
      const phi = R > 0 ? s / R : 0;
      const ac = R > 0 ? (v * v) / R : 0;
      const anet = Math.hypot(ac, at);
      const W = 300;
      const C = 150;
      const rp = 105;
      const px = C + rp * Math.cos(phi);
      const py = C - rp * Math.sin(phi);
      const tx = -Math.sin(phi);
      const ty = -Math.cos(phi); // screen coords of the counter-clockwise tangent
      const vref = Math.max(ranges.speed.max, v0 + Math.max(0, at) * config.duration, 1);
      const vl = 70 * (v / vref);
      const ak = anet > 1e-9 ? 55 / anet : 0;
      const inx = -Math.cos(phi);
      const iny = Math.sin(phi);
      const arcEnd = Math.min(phi, 2 * Math.PI - 1e-6);
      let arc = "";
      const M = 90;
      for (let i = 0; i <= M; i++) {
        const q2 = (arcEnd * i) / M;
        arc += `${i === 0 ? "M" : "L"} ${(C + rp * Math.cos(q2)).toFixed(2)} ${(C - rp * Math.sin(q2)).toFixed(2)} `;
      }
      const chord = 2 * R * Math.abs(Math.sin(phi / 2));
      const T = v0 > 0 ? (2 * Math.PI * R) / v0 : Infinity;
      body = (
        <svg viewBox={`0 0 ${W} ${W}`} className="mx-auto w-full max-w-sm rounded-md border bg-background" role="img" aria-label="Particle moving on a circle">
          <circle cx={C} cy={C} r={rp} fill="none" className="stroke-foreground/40" strokeWidth={1.5} />
          <path d={arc} fill="none" className="stroke-callout-tip/60" strokeWidth={4} />
          <line x1={C} y1={C} x2={C + rp} y2={C} className="stroke-muted-foreground" strokeDasharray="3 3" />
          <SvgLatex x={C + rp / 2} y={C + 10} latex={`R = ${f2(R)}\\,\\text{m}`} className="text-muted-foreground" />
          <circle cx={C} cy={C} r={3} className="fill-foreground" />
          <line x1={C + rp} y1={C} x2={px} y2={py} className="stroke-muted-foreground" strokeDasharray="5 4" strokeWidth={1.5} />
          {config.showVectors && (
            <g>
              <ArrowSvg x1={px} y1={py} x2={px + tx * vl} y2={py + ty * vl} color="a" />
              <ArrowSvg x1={px} y1={py} x2={px + inx * ac * ak} y2={py + iny * ac * ak} color="result" />
              {Math.abs(at) > 1e-9 && (
                <>
                  <ArrowSvg x1={px} y1={py} x2={px + tx * at * ak} y2={py + ty * at * ak} color="aux" />
                  <ArrowSvg x1={px} y1={py} x2={px + (inx * ac + tx * at) * ak} y2={py + (iny * ac + ty * at) * ak} color="c" width={1.5} dashed />
                </>
              )}
              <SvgLatex x={px + tx * vl + tx * 12} y={py + ty * vl + ty * 12} latex="\vec v" />
              {ac > 1e-9 && <SvgLatex x={px + inx * ac * ak * 0.6 + 10} y={py + iny * ac * ak * 0.6 - 10} latex="a_c" />}
            </g>
          )}
          <circle cx={px} cy={py} r={6} className="fill-primary" />
        </svg>
      );
      readouts = [
        { latex: q("v", v, U.ms) },
        { latex: `\\omega = v/R = ${f2(R > 0 ? v / R : 0)}\\,${U.rad}` },
        { latex: `a_c = v^2/R = ${f2(ac)}\\,${U.ms2}`, note: "towards the centre" },
        { latex: q("a_t", at, U.ms2), note: at === 0 ? "uniform: speed constant" : "along the tangent" },
        { latex: `\\lvert\\vec a\\rvert = \\sqrt{a_c^2 + a_t^2} = ${f2(anet)}\\,${U.ms2}` },
        at === 0
          ? { latex: `T = 2\\pi R / v = ${f2(T)}\\,${U.s}` }
          : { latex: `\\text{angle of }\\vec a\\text{ with }\\vec v = ${f2(Math.atan2(ac, at) / DEG)}^\\circ` },
        { latex: q("\\text{distance } s", s, U.m), note: "arc length" },
        { latex: q("\\lvert\\text{displacement}\\rvert", chord, U.m), note: "chord, 2R sin(φ/2)" },
      ];
      if (at === 0 && tt > 0 && Math.abs(tt - scrub.tMax) < 1e-6) notes.push("One full revolution: distance 2πR, displacement zero, average velocity zero.");
      if (at < 0 && Number.isFinite(circStop) && tt >= circStop - 1e-6) notes.push("The particle has come to rest.");
      break;
    }
  }

  return (
    <InteractiveFrame title={mode === "line" ? "Motion in a line" : mode === "projectile" ? "Projectile" : mode === "river-boat" ? "River crossing" : mode === "rain-man" ? "Rain and umbrella" : "Circular motion"}>
      {body}
      {tMax > 0 && <ScrubberRow s={scrub} />}
      <div className="space-y-2">
        {MODE_KEYS[mode].map((k) => (
          <ParamSlider key={k} label={LABELS[k]} unit={UNITS[k]} range={ranges[k]} value={p[k]} onChange={set(k)} />
        ))}
      </div>
      <Readouts items={readouts} />
      <Notes notes={notes} />
      <CaptionRow caption={config.caption ?? CAPTIONS[mode]} onReset={reset} />
    </InteractiveFrame>
  );
}
