"use client";

import { useState } from "react";
import type { z } from "zod";
import { srfCompile } from "../../lib/srf";
import type { PlotWindow, srfGraphLabSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { FunctionPlot, formatNumber, makeScales } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof srfGraphLabSchema>;
type Transform = Config["transforms"][number];
type Fn = (x: number) => number;
type Dot = { x: number; y: number; open: boolean };

const SAMPLES = 480;

const snapX = (x: number) => {
  const s = Math.round(x * 24) / 24;
  return Math.abs(s - x) < 1e-6 ? s : null;
};

/**
 * Sample y = g(x) on [lo, hi] into SVG path pieces. Breaks the pen at
 * jumps (found by bisection, so steep continuous stretches are not broken),
 * at gaps in the domain (whose edges are located by bisection) and far
 * outside the window. Jumps at "nice" x get open and closed dots.
 */
function trace(g: Fn, lo: number, hi: number, window: PlotWindow): { d: string; dots: Dot[] } {
  const { sx, sy } = makeScales(window);
  const height = window.ymax - window.ymin;
  const thr = height / 60;
  const far = (y: number) => y > window.ymax + 3 * height || y < window.ymin - 3 * height;
  const ok = (y: number) => Number.isFinite(y) && !far(y);
  let d = "";
  let pen = false;
  const dots: Dot[] = [];
  const move = (x: number, y: number) => {
    d += ` M ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`;
    pen = true;
  };
  const line = (x: number, y: number) => {
    d += ` L ${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`;
  };
  /** Bisect between a defined and an undefined input for the domain edge. */
  const edge = (good: number, bad: number) => {
    let a = good;
    let b = bad;
    for (let k = 0; k < 40; k++) {
      const m = (a + b) / 2;
      if (ok(g(m))) a = m;
      else b = m;
    }
    return a;
  };

  let x0 = lo;
  let y0 = g(lo);
  if (ok(y0)) move(x0, y0);
  for (let i = 1; i <= SAMPLES; i++) {
    const x = lo + ((hi - lo) * i) / SAMPLES;
    const y = g(x);
    const good = ok(y);
    const prevGood = ok(y0);
    if (good && !prevGood) {
      const ex = edge(x, x0);
      move(ex, g(ex));
      line(x, y);
    } else if (!good && prevGood) {
      const ex = edge(x0, x);
      line(ex, g(ex));
      pen = false;
    } else if (good && prevGood) {
      if (Math.abs(y - y0) > thr) {
        let l = x0;
        let r = x;
        let fl = y0;
        let fr = y;
        let broken = false;
        for (let k = 0; k < 50 && r - l > 1e-11; k++) {
          const m = (l + r) / 2;
          const fm = g(m);
          if (!ok(fm)) {
            broken = true;
            break;
          }
          if (Math.abs(fm - fl) >= Math.abs(fr - fm)) {
            r = m;
            fr = fm;
          } else {
            l = m;
            fl = fm;
          }
        }
        if (broken || Math.abs(fr - fl) > thr / 4) {
          line(l, fl);
          move(r, fr);
          const sxStar = snapX((l + r) / 2);
          if (sxStar !== null && !broken) {
            const v = g(sxStar);
            const inWin = (yy: number) => yy >= window.ymin && yy <= window.ymax;
            for (const lim of [fl, fr]) {
              if (inWin(lim) && !(Number.isFinite(v) && Math.abs(v - lim) < 1e-9)) {
                dots.push({ x: sxStar, y: lim, open: true });
              }
            }
            if (Number.isFinite(v) && inWin(v)) dots.push({ x: sxStar, y: v, open: false });
          }
        }
      }
      if (pen) line(x, y);
      else move(x, y);
    }
    x0 = x;
    y0 = y;
  }
  return { d, dots };
}

/** Parametric (g(t), t): the reflection of y = g(x) in y = x. */
function traceInverse(g: Fn, lo: number, hi: number, window: PlotWindow): string {
  const { sx, sy } = makeScales(window);
  let d = "";
  let last: { px: number; py: number } | null = null;
  for (let i = 0; i <= SAMPLES; i++) {
    const t = lo + ((hi - lo) * i) / SAMPLES;
    const x = g(t);
    if (!Number.isFinite(x) || Math.abs(x) > 1e4) {
      last = null;
      continue;
    }
    const px = sx(x);
    const py = sy(t);
    const jump = last && Math.hypot(px - last.px, py - last.py) > 60;
    d += last && !jump ? ` L ${px.toFixed(2)} ${py.toFixed(2)}` : ` M ${px.toFixed(2)} ${py.toFixed(2)}`;
    last = { px, py };
  }
  return d;
}

const TRANSFORM_LABEL: Record<Transform, string> = {
  none: "y = f(x)",
  abs: "y = |f(x)|",
  "abs-x": "y = f(|x|)",
  floor: "y = [f(x)]",
  frac: "y = {f(x)}",
  neg: "y = −f(x)",
  "neg-x": "y = f(−x)",
  inverse: "y = f⁻¹(x)",
};

const TRANSFORM_LATEX: Record<Transform, string> = {
  none: "y = f(x)",
  abs: "y = \\lvert f(x) \\rvert",
  "abs-x": "y = f(\\lvert x \\rvert)",
  floor: "y = [f(x)]",
  frac: "y = \\{ f(x) \\}",
  neg: "y = -f(x)",
  "neg-x": "y = f(-x)",
  inverse: "y = f^{-1}(x)",
};

function applyTransform(f: Fn, t: Transform): Fn {
  switch (t) {
    case "none":
    case "inverse":
      return f;
    case "abs":
      return (x) => Math.abs(f(x));
    case "abs-x":
      return (x) => f(Math.abs(x));
    case "floor":
      return (x) => {
        const v = f(x);
        const s = Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v;
        return Math.floor(s);
      };
    case "frac":
      return (x) => {
        const v = f(x);
        const s = Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : v;
        return s - Math.floor(s);
      };
    case "neg":
      return (x) => -f(x);
    case "neg-x":
      return (x) => f(-x);
  }
}

/** Solve g(t) = x on [lo, hi] by bisection (g monotonic there), else NaN. */
function invertOn(g: Fn, x: number, lo: number, hi: number): number {
  let a = lo;
  let b = hi;
  let fa = g(a) - x;
  const fb = g(b) - x;
  if (!Number.isFinite(fa) || !Number.isFinite(fb)) {
    // Nudge in from open endpoints (e.g. tan at ±pi/2).
    a = lo + (hi - lo) * 1e-9;
    b = hi - (hi - lo) * 1e-9;
    fa = g(a) - x;
    if (!Number.isFinite(fa) || !Number.isFinite(g(b) - x)) return NaN;
  }
  if (fa === 0) return a;
  if (fa * (g(b) - x) > 0) return NaN;
  for (let k = 0; k < 80; k++) {
    const m = (a + b) / 2;
    const fm = g(m) - x;
    if (!Number.isFinite(fm)) return NaN;
    if (fa * fm <= 0) b = m;
    else {
      a = m;
      fa = fm;
    }
  }
  return (a + b) / 2;
}

const fmt = (v: number) => (Number.isFinite(v) ? formatNumber(v, 3) : "undefined");

export function SrfGraphLab({ config }: { config: Config }) {
  const [fi, setFi] = useState(0);
  const [transform, setTransform] = useState<Transform>(config.transforms[0]);
  const [probe, setProbe] = useState(config.probe ?? 0);

  const fdef = config.functions[fi];
  const f = srfCompile(fdef.expr);
  const w = config.window;
  const branch = fdef.branch;
  const { sx, sy } = makeScales(w);

  const isInverse = transform === "inverse";
  const g = applyTransform(f, transform);

  // Base curve: faint when a transform or a branch is in play.
  const base = trace(f, w.xmin, w.xmax, w);
  const faintBase = transform !== "none" || branch !== undefined;
  const branchTrace = branch ? trace(f, Math.max(branch.min, w.xmin), Math.min(branch.max, w.xmax), w) : null;
  const main = isInverse
    ? null
    : transform === "none"
      ? null
      : trace(g, w.xmin, w.xmax, w);
  const invPath = isInverse
    ? traceInverse(f, branch?.min ?? w.xmin, branch?.max ?? w.xmax, w)
    : "";

  // Probe readout.
  const showProbe = config.probe !== undefined;
  const fx = f(probe);
  let probeY = NaN;
  if (isInverse) probeY = invertOn(f, probe, branch?.min ?? w.xmin, branch?.max ?? w.xmax);
  else probeY = g(probe);
  const probeIn = Number.isFinite(probeY) && probeY >= w.ymin && probeY <= w.ymax;
  const probeStep = w.xmax - w.xmin > 10 ? 0.1 : 0.05;

  const dots = [...(transform === "none" ? (branchTrace ?? base).dots : main?.dots ?? [])];

  const caption =
    config.caption ??
    (isInverse
      ? "The inverse is the mirror image of the highlighted piece in the line y = x: every point (a, b) becomes (b, a)."
      : "Dashed: the original graph. Solid: the transformed graph. Open dots are left out, filled dots are on the graph.");

  const pill = (active: boolean) =>
    `rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
      active ? "border-plot bg-plot/10 text-plot" : "bg-background text-muted-foreground hover:text-foreground"
    }`;

  return (
    <InteractiveFrame title={isInverse ? "Graph lab: inverse functions" : "Graph lab"}>
      {config.functions.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {config.functions.map((fn, i) => (
            <button key={`${fn.label}-${i}`} type="button" onClick={() => setFi(i)} className={pill(i === fi)}>
              {fn.label}
            </button>
          ))}
        </div>
      )}
      {config.transforms.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {config.transforms.map((t) => (
            <button key={t} type="button" onClick={() => setTransform(t)} className={pill(t === transform)}>
              {TRANSFORM_LABEL[t]}
            </button>
          ))}
        </div>
      )}
      <FunctionPlot window={w} xAxis={config.xAxis}>
        {(config.showMirror || isInverse) && (
          <line
            x1={sx(Math.max(w.xmin, w.ymin))}
            y1={sy(Math.max(w.xmin, w.ymin))}
            x2={sx(Math.min(w.xmax, w.ymax))}
            y2={sy(Math.min(w.xmax, w.ymax))}
            className="stroke-muted-foreground"
            strokeDasharray="3 4"
            strokeWidth={1.2}
          />
        )}
        <path
          d={base.d}
          fill="none"
          strokeWidth={faintBase ? 1.5 : 2.2}
          strokeDasharray={faintBase ? "5 4" : undefined}
          className={faintBase ? "stroke-muted-foreground/70" : "stroke-plot"}
        />
        {branchTrace && (
          <path d={branchTrace.d} fill="none" strokeWidth={isInverse || transform === "none" ? 2.6 : 1.8} className={isInverse || transform === "none" ? "stroke-plot" : "stroke-muted-foreground"} />
        )}
        {main && <path d={main.d} fill="none" strokeWidth={2.4} className="stroke-callout-warning" />}
        {isInverse && <path d={invPath} fill="none" strokeWidth={2.6} className="stroke-callout-warning" />}
        {dots.map((p, i) => (
          <circle
            key={i}
            cx={sx(p.x)}
            cy={sy(p.y)}
            r={3.6}
            strokeWidth={1.6}
            className={p.open ? "fill-background stroke-foreground" : "fill-foreground stroke-foreground"}
          />
        ))}
        {showProbe && probeIn && (
          <circle cx={sx(probe)} cy={sy(probeY)} r={5} className="fill-callout-definition stroke-background" strokeWidth={1.5} />
        )}
      </FunctionPlot>

      <div className="space-y-1 rounded-md border bg-background p-3 text-center text-sm">
        <div className="overflow-x-auto">
          <Latex latex={`f(x) = ${fdef.latex}`} />
          {branch && (
            <span className="text-muted-foreground">
              {" "}
              on [{formatNumber(branch.min, 3)}, {formatNumber(branch.max, 3)}]
            </span>
          )}
        </div>
        {transform !== "none" && (
          <div className="overflow-x-auto">
            <Latex latex={TRANSFORM_LATEX[transform]} />
          </div>
        )}
      </div>

      {showProbe && (
        <div className="space-y-2">
          <SliderRow label={<Latex latex="x" />} value={probe} min={w.xmin} max={w.xmax} step={probeStep} onChange={setProbe} />
          <p className="text-center text-sm tabular-nums" aria-live="polite">
            {isInverse ? (
              <>
                f⁻¹({fmt(probe)}) = {fmt(probeY)}
                {Number.isFinite(probeY) && <span className="text-muted-foreground"> ({fmt(probeY / Math.PI)}π)</span>}
              </>
            ) : (
              <>
                f({fmt(probe)}) = {fmt(fx)}
                {transform !== "none" && <> , y = {fmt(probeY)}</>}
              </>
            )}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        <RichText text={caption} />
      </p>
    </InteractiveFrame>
  );
}
