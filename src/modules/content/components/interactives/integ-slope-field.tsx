"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import { compileExpression } from "../../lib/math-eval";
import type { integSlopeFieldSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { fmt, snap } from "./calc-shared";
import { FunctionPlot, makeScales, type Point } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof integSlopeFieldSchema>;
type Slope = (x: number, y: number) => number;

const DEFAULT_CAPTION =
  "Each dash has the slope the equation demands at that point. Drag the starting point: the solution curve threads the dashes, and a different start gives a different member of the family.";

function slopeFn(expr: string): Slope {
  let evaluate: (env: Record<string, number>) => number;
  try {
    evaluate = compileExpression(expr);
  } catch {
    return () => NaN;
  }
  return (x, y) => {
    try {
      const v = evaluate({ x, y });
      return Number.isFinite(v) ? v : NaN;
    } catch {
      return NaN;
    }
  };
}

/**
 * RK4 from (x0, y0) towards `dir` (+1 or -1) until the curve leaves a band
 * around the window or the slope is undefined. Returns the visited points.
 */
function trace(F: Slope, x0: number, y0: number, dir: 1 | -1, win: Config["window"]): { x: number; y: number }[] {
  const pts = [{ x: x0, y: y0 }];
  const h = (dir * (win.xmax - win.xmin)) / 600;
  const band = (win.ymax - win.ymin) * 1.5;
  let x = x0;
  let y = y0;
  for (let i = 0; i < 700; i++) {
    const k1 = F(x, y);
    const k2 = F(x + h / 2, y + (h / 2) * k1);
    const k3 = F(x + h / 2, y + (h / 2) * k2);
    const k4 = F(x + h, y + h * k3);
    const ny = y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    const nx = x + h;
    if (!Number.isFinite(ny) || nx < win.xmin || nx > win.xmax || ny < win.ymin - band || ny > win.ymax + band) break;
    // A near-vertical tangent ends the solution y(x); stop instead of jumping across.
    if (Math.abs(ny - y) > (win.ymax - win.ymin) / 15) break;
    x = nx;
    y = ny;
    pts.push({ x, y });
  }
  return pts;
}

function solutionPath(F: Slope, x0: number, y0: number, win: Config["window"], sc: ReturnType<typeof makeScales>) {
  const back = trace(F, x0, y0, -1, win).reverse();
  const fwd = trace(F, x0, y0, 1, win).slice(1);
  const all = [...back, ...fwd];
  if (all.length < 2) return "";
  return all.map((p, i) => `${i ? "L" : "M"} ${sc.sx(p.x).toFixed(2)} ${sc.sy(p.y).toFixed(2)}`).join(" ");
}

export function IntegSlopeField({ config }: { config: Config }) {
  const { window: win } = config;
  const [x0, setX0] = useState(config.x0.initial);
  const [y0, setY0] = useState(config.y0.initial);
  const F = useMemo(() => slopeFn(config.expr), [config.expr]);
  const sc = useMemo(() => makeScales(win), [win]);

  const dashes = useMemo(() => {
    const out: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const n = config.grid;
    // Half-length of a dash in SVG pixels.
    const half = Math.min(400, 300) / n / 2.6;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = win.xmin + ((i + 0.5) * (win.xmax - win.xmin)) / n;
        const y = win.ymin + ((j + 0.5) * (win.ymax - win.ymin)) / n;
        const m = F(x, y);
        if (!Number.isFinite(m)) continue;
        // Slope in screen space (y axis flipped, axes scaled differently).
        const kx = 400 / (win.xmax - win.xmin);
        const ky = 300 / (win.ymax - win.ymin);
        const angle = Math.atan2(-m * ky, kx);
        const cx = sc.sx(x);
        const cy = sc.sy(y);
        out.push({
          x1: cx - half * Math.cos(angle),
          y1: cy - half * Math.sin(angle),
          x2: cx + half * Math.cos(angle),
          y2: cy + half * Math.sin(angle),
        });
      }
    }
    return out;
  }, [F, config.grid, win, sc]);

  const extra = useMemo(
    () => config.curves.map((c) => solutionPath(F, c.x, c.y, win, sc)),
    [F, config.curves, win, sc],
  );
  const main = solutionPath(F, x0, y0, win, sc);
  const slopeHere = F(x0, y0);
  const points: Point[] =
    x0 >= win.xmin && x0 <= win.xmax && y0 >= win.ymin && y0 <= win.ymax
      ? [{ x: x0, y: y0, label: `(${fmt(x0)}, ${fmt(y0)})` }]
      : [];

  return (
    <InteractiveFrame title="Slope field">
      <div className="text-center">
        <Latex latex={`\\frac{dy}{dx} = ${config.exprLatex}`} display />
      </div>
      <FunctionPlot window={win} points={points}>
        {dashes.map((d, i) => (
          <line key={i} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} strokeWidth={1.2} className="stroke-muted-foreground" />
        ))}
        {extra.map((d, i) => (
          <path key={`c${i}`} d={d} fill="none" strokeWidth={1.5} strokeDasharray="5 4" className="stroke-plot-secondary" />
        ))}
        <path d={main} fill="none" strokeWidth={2.5} className="stroke-plot" />
      </FunctionPlot>
      <SliderRow
        label={<Latex latex="x_0" />}
        value={x0}
        min={config.x0.min}
        max={config.x0.max}
        step={config.x0.step}
        onChange={(v) => setX0(snap(v, config.x0.min, config.x0.step))}
      />
      <SliderRow
        label={<Latex latex="y_0" />}
        value={y0}
        min={config.y0.min}
        max={config.y0.max}
        step={config.y0.step}
        onChange={(v) => setY0(snap(v, config.y0.min, config.y0.step))}
      />
      <p className="rounded-md border bg-background p-3 text-center text-sm">
        {Number.isFinite(slopeHere) ? (
          <Latex latex={`\\left.\\frac{dy}{dx}\\right|_{(${fmt(x0)},\\, ${fmt(y0)})} = ${fmt(slopeHere, 3)}`} />
        ) : (
          <span>The slope is undefined at this starting point, so no solution curve passes through it.</span>
        )}
      </p>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION} />
      </p>
    </InteractiveFrame>
  );
}
