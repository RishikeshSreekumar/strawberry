"use client";

import { useEffect, useRef, useState } from "react";
import { formatNumber } from "./function-plot";
import { Latex } from "./ui";

/** Shared helpers for the owt (oscillations, waves, thermal) labs. */

export type Range = { min: number; max: number; step: number };

/** A "nice" step (1, 2, 2.5 or 5 × 10^k) close to `raw`. */
export function niceStep(raw: number): number {
  if (!(raw > 0) || !Number.isFinite(raw)) return 1;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const r = raw / mag;
  const f = r < 1.5 ? 1 : r < 2.25 ? 2 : r < 3.5 ? 2.5 : r < 7.5 ? 5 : 10;
  return f * mag;
}

/** Round up to 1, 2, 2.5 or 5 × 10^k, for axis maxima. */
export function niceCeil(v: number): number {
  if (!(v > 0) || !Number.isFinite(v)) return 1;
  const mag = 10 ** Math.floor(Math.log10(v));
  for (const f of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) {
    if (f * mag >= v - 1e-12) return f * mag;
  }
  return 10 * mag;
}

/** A slider range from lo to hi with a nice step, snapped outward. */
export function spanRange(lo: number, hi: number, divisions = 60): Range {
  const step = niceStep((hi - lo) / divisions);
  const min = Math.floor(lo / step + 1e-9) * step;
  const max = Math.ceil(hi / step - 1e-9) * step;
  return { min: tidy(min), max: tidy(max > min ? max : min + step), step };
}

/** Kill floating-point dust (0.30000000000000004 → 0.3). */
export function tidy(v: number, digits = 6): number {
  return Number(v.toPrecision(digits));
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/** Value printed for LaTeX: finite, rounded, "—" otherwise. */
export function fmt(v: number, decimals = 2): string {
  return formatNumber(v, decimals);
}

/** Scientific notation for LaTeX, e.g. 6.21\times10^{-21}. */
export function sci(v: number, digits = 3): string {
  if (!Number.isFinite(v)) return "—";
  if (v === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(v)));
  if (exp >= -2 && exp < 5) return formatNumber(v, Math.max(0, digits - 1 - exp));
  const mant = v / 10 ** exp;
  return `${Number(mant.toFixed(digits - 1))}\\times10^{${exp}}`;
}

/** Signed number with explicit + for LaTeX readouts. */
export function signed(v: number, decimals = 1): string {
  const s = fmt(v, decimals);
  return v > 0 && s !== "0" ? `+${s}` : s;
}

/**
 * A clock that only runs after the user presses Play. `rate` is clock units
 * per real second; with `loop` it wraps to 0 at `max`, otherwise it stops.
 * SSR renders the initial value; no timers exist until Play.
 */
export function useClock({
  initial = 0,
  max,
  rate,
  loop = true,
}: {
  initial?: number;
  max: number;
  rate: number;
  loop?: boolean;
}) {
  const [t, setT] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  }, [t]);

  useEffect(() => {
    if (!playing) return;
    let pos = Math.min(tRef.current, max);
    let last: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      const dt = last === null ? 0 : Math.min(0.1, (now - last) / 1000);
      last = now;
      pos += dt * rate;
      if (pos >= max) {
        if (loop) pos %= max;
        else {
          setT(max);
          setPlaying(false);
          return;
        }
      }
      setT(pos);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, rate, max, loop]);

  function toggle() {
    if (playing) {
      setPlaying(false);
      return;
    }
    const reduce =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(loop ? t : max);
      return;
    }
    if (!loop && t >= max - 1e-9) setT(0);
    setPlaying(true);
  }

  return { t: Math.min(t, max), setT, playing, toggle };
}

export function PlayButton({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={playing}
      className="shrink-0 rounded-md border bg-background px-2.5 py-1 text-xs font-medium"
    >
      {playing ? "Pause" : "Play"}
    </button>
  );
}

export function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md border px-2.5 py-1 text-xs ${
            value === o.value ? "border-primary bg-primary/10 font-medium" : "bg-background"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Grid of KaTeX readouts: [label latex, value latex]. */
export function Readouts({ rows }: { rows: [string, string][] }) {
  return (
    <div className="grid gap-x-4 gap-y-1 rounded-md border bg-background p-3 text-sm sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">
            <Latex latex={label} />
          </span>
          <span className="tabular-nums">
            <Latex latex={value} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Arrowhead marker definitions keyed by id; use markerEnd={`url(#${id})`}. */
export function ArrowMarker({ id, className }: { id: string; className: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" className={className} />
    </marker>
  );
}
