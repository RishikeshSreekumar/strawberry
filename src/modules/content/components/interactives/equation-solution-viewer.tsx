"use client";

import { useState } from "react";
import type { z } from "zod";
import type { equationSolutionViewerSchema } from "../../schemas/blocks";
import { compileExpression } from "../../lib/math-eval";
import { FunctionPlot, formatNumber, makeScales } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof equationSolutionViewerSchema>;

/**
 * Sample densely, keep every sign change of f(x) - level, and bisect it.
 * Sign changes straddling an excluded point are asymptote crossings, not
 * solutions, so they are dropped.
 */
function solutionsIn(
  expr: string,
  level: number,
  lo: number,
  hi: number,
  excluded: number[],
): number[] {
  const f = compileExpression(expr);
  const g = (x: number) => f({ x }) - level;
  const steps = 2000;
  const found: number[] = [];
  let prevX = lo;
  let prevY = g(lo);
  for (let i = 1; i <= steps; i++) {
    const x = lo + ((hi - lo) * i) / steps;
    const y = g(x);
    const jumpsAsymptote = excluded.some((e) => e > prevX && e <= x);
    if (
      Number.isFinite(prevY) &&
      Number.isFinite(y) &&
      !jumpsAsymptote &&
      prevY * y <= 0
    ) {
      let a = prevX;
      let b = x;
      for (let k = 0; k < 60; k++) {
        const m = (a + b) / 2;
        if (g(a) * g(m) <= 0) b = m;
        else a = m;
      }
      const root = (a + b) / 2;
      if (!found.some((r) => Math.abs(r - root) < 1e-6)) found.push(root);
    }
    prevX = x;
    prevY = y;
  }
  return found;
}

/** Radians as a multiple of pi where one is close enough to be meant. */
function asMultipleOfPi(x: number): string {
  const k = (x * 12) / Math.PI;
  const rounded = Math.round(k);
  if (Math.abs(k - rounded) > 1e-4 || rounded === 0) return formatNumber(x, 3);
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
  const g = gcd(rounded, 12) || 1;
  const num = rounded / g;
  const den = 12 / g;
  const top = `${num === 1 ? "" : num === -1 ? "-" : num}\\pi`;
  return den === 1 ? top : `\\frac{${top}}{${den}}`;
}

export function EquationSolutionViewer({ config }: { config: Config }) {
  const [level, setLevel] = useState(config.initialLevel);

  const lo = config.intervalMin ?? config.window.xmin;
  const hi = config.intervalMax ?? config.window.xmax;
  const roots = solutionsIn(config.expr, level, lo, hi, config.excluded);
  const { sx } = makeScales(config.window);

  return (
    <InteractiveFrame title="Solutions">
      <div className="text-center">
        <Latex latex={`${config.exprLatex} = ${formatNumber(level, 2)}`} display />
      </div>
      <FunctionPlot
        window={config.window}
        xAxis="radians"
        curves={[{ expr: config.expr, excluded: config.excluded }]}
        segments={[
          {
            x1: config.window.xmin,
            y1: level,
            x2: config.window.xmax,
            y2: level,
            className: "stroke-callout-warning",
          },
        ]}
        points={roots.map((r) => ({ x: r, y: level, className: "fill-plot-secondary stroke-plot-secondary" }))}
      >
        {/* interval markers */}
        <line x1={sx(lo)} y1={0} x2={sx(lo)} y2={300} className="stroke-plot-secondary/40" strokeDasharray="4 4" />
        <line x1={sx(hi)} y1={0} x2={sx(hi)} y2={300} className="stroke-plot-secondary/40" strokeDasharray="4 4" />
      </FunctionPlot>
      <SliderRow
        label="value"
        value={level}
        min={config.minLevel}
        max={config.maxLevel}
        step={config.levelStep}
        onChange={setLevel}
      />
      <div className="rounded-md border bg-background p-3 text-sm">
        <p className="mb-1 text-muted-foreground">
          {roots.length} solution{roots.length === 1 ? "" : "s"} in [{formatNumber(lo, 2)},{" "}
          {formatNumber(hi, 2)}]
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          {roots.map((r, i) => (
            <span key={i} className="tabular-nums">
              <Latex latex={`x \\approx ${asMultipleOfPi(r)}`} />
            </span>
          ))}
          {roots.length === 0 && <span className="text-muted-foreground">none — the line misses the curve</span>}
        </p>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "Drag the line. Every crossing is a solution, and the pattern of crossings repeats with the period."}
      </p>
    </InteractiveFrame>
  );
}
