"use client";

/**
 * Small pieces shared by the Mechanics II (mrg) labs: a user-started
 * playback clock with a scrubber, a time-series mini graph, readout lines
 * and toggle buttons. Everything renders deterministically on the server
 * (the clock starts at 0 and only moves after Play is pressed).
 */

import { useEffect, useId, useState } from "react";
import { formatNumber } from "./function-plot";
import { Latex, SliderRow } from "./ui";

export const G = 10;

export const fmt = (v: number, d = 2) => formatNumber(Math.abs(v) < 1e-9 ? 0 : v, d);

/** Wrap negative numbers in brackets for substituted formulas: (-3). */
export const br = (v: number, d = 2) => (v < -1e-9 ? `(${fmt(v, d)})` : fmt(v, d));

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export type Range = { min: number; max: number; step: number; initial: number };

/** A slider for a schema range with a LaTeX label and unit. */
export function RangeSlider({
  latex,
  range,
  value,
  onChange,
  unit,
}: {
  latex: string;
  range: Range;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
}) {
  return (
    <SliderRow
      label={<Latex latex={latex} />}
      value={value}
      min={range.min}
      max={range.max}
      step={range.step}
      onChange={onChange}
      unit={unit}
    />
  );
}

/**
 * Progress p in [0, 1] driven by a Play button (requestAnimationFrame) or a
 * scrubber. `seconds` is the wall-clock length of a full run.
 */
export function usePlayback(seconds: number) {
  const [p, setP] = useState(0);
  /** Progress the current run started from; null = paused. */
  const [runFrom, setRunFrom] = useState<number | null>(null);
  const playing = runFrom !== null;

  useEffect(() => {
    if (runFrom === null) return;
    let raf = 0;
    let last: number | null = null;
    let pos = runFrom;
    const step = (now: number) => {
      if (last !== null) pos = Math.min(1, pos + (now - last) / 1000 / seconds);
      last = now;
      setP(pos);
      if (pos >= 1) {
        setRunFrom(null);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [runFrom, seconds]);

  function toggle() {
    if (playing) {
      setRunFrom(null);
      return;
    }
    const reduce =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return;
    }
    setRunFrom(p >= 1 ? 0 : p);
  }

  function scrub(v: number) {
    setRunFrom(null);
    setP(clamp(v, 0, 1));
  }

  function rewind() {
    setRunFrom(null);
    setP(0);
  }

  return { p, playing, toggle, scrub, rewind };
}

/** Play/Pause button + scrubber + a live time label. */
export function PlaybackBar({
  playback,
  timeLabel,
}: {
  playback: ReturnType<typeof usePlayback>;
  timeLabel: string;
}) {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={playback.toggle}
        aria-pressed={playback.playing}
        className="shrink-0 rounded-md border bg-background px-2.5 py-1 text-xs font-medium"
      >
        {playback.playing ? "Pause" : playback.p >= 1 ? "Replay" : "Play"}
      </button>
      <label htmlFor={id} className="sr-only">
        Time
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={1000}
        step={1}
        value={Math.round(playback.p * 1000)}
        onChange={(e) => playback.scrub(Number(e.target.value) / 1000)}
        className="w-full accent-plot"
      />
      <span className="w-28 shrink-0 text-right text-sm tabular-nums text-muted-foreground">{timeLabel}</span>
    </div>
  );
}

export function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
        active ? "border-primary bg-primary text-primary-foreground" : "bg-background"
      }`}
    >
      {children}
    </button>
  );
}

/** One readout row: LaTeX on the left, an optional plain note on the right. */
export function ReadoutLine({ latex, note }: { latex: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <span className="max-w-full overflow-x-auto">
        <Latex latex={latex} />
      </span>
      {note && <span className="text-xs text-muted-foreground">{note}</span>}
    </div>
  );
}

export function ReadoutBox({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">{children}</div>;
}

// ---------- mini time-series graph ----------

export type Series = {
  points: [number, number][];
  /** Tailwind stroke class, e.g. "stroke-primary". */
  className: string;
  /** Tailwind text/fill class for the legend swatch, e.g. "bg-primary". */
  swatch: string;
  label: string;
  dashed?: boolean;
};

const GW = 400;
const GH = 150;
const PAD_L = 34;
const PAD_R = 8;
const PAD_T = 8;
const PAD_B = 18;

/** A step that gives about 4 gridlines over the span. */
function niceStep(span: number): number {
  if (!(span > 0) || !Number.isFinite(span)) return 1;
  const raw = span / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const n = raw / mag;
  return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * mag;
}

export function MiniGraph({
  series,
  t0,
  t1,
  cursor,
  xLabel,
  yLabel,
  area,
}: {
  series: Series[];
  t0: number;
  t1: number;
  cursor?: number;
  xLabel: string;
  yLabel: string;
  /** Filled region under the first series from t0 up to this time. */
  area?: number;
}) {
  let lo = 0;
  let hi = 0;
  for (const s of series) {
    for (const [, y] of s.points) {
      if (Number.isFinite(y)) {
        lo = Math.min(lo, y);
        hi = Math.max(hi, y);
      }
    }
  }
  if (hi - lo < 1e-9) {
    hi += 1;
    lo -= 1;
  }
  const padY = (hi - lo) * 0.08;
  lo -= padY;
  hi += padY;
  const span = t1 - t0 > 1e-12 ? t1 - t0 : 1;
  const px = (t: number) => PAD_L + ((t - t0) / span) * (GW - PAD_L - PAD_R);
  const py = (y: number) => PAD_T + ((hi - y) / (hi - lo)) * (GH - PAD_T - PAD_B);
  const step = niceStep(hi - lo);
  const ticks: number[] = [];
  for (let y = Math.ceil(lo / step) * step; y <= hi + 1e-9; y += step) ticks.push(Number(y.toPrecision(6)));
  const tStep = niceStep(span);
  const tTicks: number[] = [];
  for (let t = Math.ceil(t0 / tStep) * tStep; t <= t1 + 1e-9; t += tStep) tTicks.push(Number(t.toPrecision(6)));

  const path = (pts: [number, number][]) =>
    pts
      .filter(([, y]) => Number.isFinite(y))
      .map(([t, y], i) => `${i === 0 ? "M" : "L"} ${px(t).toFixed(2)} ${py(y).toFixed(2)}`)
      .join(" ");

  let areaPath: string | null = null;
  if (area !== undefined && series[0]) {
    const all = series[0].points;
    const pts = all.filter(([t]) => t <= area + 1e-12);
    const next = all[pts.length];
    const prev = pts[pts.length - 1];
    if (next && prev && next[0] > prev[0] && area > prev[0]) {
      const f = (area - prev[0]) / (next[0] - prev[0]);
      pts.push([area, prev[1] + f * (next[1] - prev[1])]);
    }
    if (pts.length > 1) {
      const last = pts[pts.length - 1];
      areaPath = `M ${px(pts[0][0]).toFixed(2)} ${py(0).toFixed(2)} ${pts
        .map(([t, y]) => `L ${px(t).toFixed(2)} ${py(y).toFixed(2)}`)
        .join(" ")} L ${px(last[0]).toFixed(2)} ${py(0).toFixed(2)} Z`;
    }
  }

  return (
    <div className="space-y-1">
      <svg viewBox={`0 0 ${GW} ${GH}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label={`${yLabel} against ${xLabel}`}>
        {ticks.map((y) => (
          <g key={`y${y}`}>
            <line x1={PAD_L} x2={GW - PAD_R} y1={py(y)} y2={py(y)} className={Math.abs(y) < 1e-9 ? "stroke-foreground/50" : "stroke-border"} strokeWidth={Math.abs(y) < 1e-9 ? 1 : 0.6} />
            <text x={PAD_L - 4} y={py(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
              {formatNumber(y, 2)}
            </text>
          </g>
        ))}
        {tTicks.map((t) => (
          <text key={`t${t}`} x={px(t)} y={GH - 5} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {formatNumber(t, 3)}
          </text>
        ))}
        {areaPath && <path d={areaPath} className="fill-callout-tip/25" />}
        {series.map((s) => (
          <path key={s.label} d={path(s.points)} fill="none" className={s.className} strokeWidth={2} strokeDasharray={s.dashed ? "5 4" : undefined} strokeLinejoin="round" />
        ))}
        {cursor !== undefined && (
          <line x1={px(cursor)} x2={px(cursor)} y1={PAD_T} y2={GH - PAD_B} className="stroke-foreground/60" strokeWidth={1} strokeDasharray="3 3" />
        )}
        <text x={GW - PAD_R} y={GH - PAD_B - 4} textAnchor="end" className="fill-muted-foreground text-[9px]">
          {xLabel}
        </text>
        <text x={PAD_L + 4} y={PAD_T + 9} className="fill-muted-foreground text-[9px]">
          {yLabel}
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {series.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span className={`inline-block h-0.5 w-4 ${s.swatch}`} />
            <Latex latex={s.label} />
          </span>
        ))}
      </div>
    </div>
  );
}
