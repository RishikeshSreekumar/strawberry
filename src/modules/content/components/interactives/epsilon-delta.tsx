"use client";

import { useState } from "react";
import type { z } from "zod";
import type { epsilonDeltaSchema } from "../../schemas/blocks";
import { compileExpression } from "../../lib/math-eval";
import { FunctionPlot, formatNumber, makeScales } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof epsilonDeltaSchema>;

/**
 * Largest δ such that every sampled x within δ of the target keeps f(x)
 * within ε of L. Numeric, but plenty for the curated functions we author.
 */
function findDelta(config: Config, epsilon: number): number {
  const evaluate = compileExpression(config.expr);
  const a = config.target;
  const dmax = Math.min(a - config.window.xmin, config.window.xmax - a);
  const CANDIDATES = 120;
  const SAMPLES = 160;
  for (let i = CANDIDATES; i >= 1; i--) {
    const d = (dmax * i) / CANDIDATES;
    let ok = true;
    for (let j = 0; j <= SAMPLES; j++) {
      const x = a - d + (2 * d * j) / SAMPLES;
      if (Math.abs(x - a) < 1e-9) continue;
      let y: number;
      try {
        y = evaluate({ x });
      } catch {
        ok = false;
        break;
      }
      if (!Number.isFinite(y) || Math.abs(y - config.limitValue) >= epsilon) {
        ok = false;
        break;
      }
    }
    if (ok) return d;
  }
  return dmax / CANDIDATES;
}

export function EpsilonDelta({ config }: { config: Config }) {
  const [idx, setIdx] = useState(0);
  const epsilon = config.epsilons[idx];
  const delta = findDelta(config, epsilon);
  const { sx, sy } = makeScales(config.window);
  const a = config.target;
  const L = config.limitValue;

  return (
    <InteractiveFrame title="The guarantee game">
      <div className="text-center">
        <Latex
          latex={`f(x) = ${config.exprLatex}, \\qquad \\lim_{x \\to ${formatNumber(a)}} f(x) = ${formatNumber(L)}`}
          display
        />
      </div>
      <FunctionPlot
        window={config.window}
        curves={[{ expr: config.expr }]}
        points={[{ x: a, y: L, open: true }]}
      >
        {/* ε-band around the limit (the demand) */}
        <rect
          x={0}
          y={sy(L + epsilon)}
          width={400}
          height={sy(L - epsilon) - sy(L + epsilon)}
          className="fill-callout-warning/15"
        />
        <line
          x1={0}
          y1={sy(L + epsilon)}
          x2={400}
          y2={sy(L + epsilon)}
          strokeDasharray="5 4"
          className="stroke-callout-warning"
        />
        <line
          x1={0}
          y1={sy(L - epsilon)}
          x2={400}
          y2={sy(L - epsilon)}
          strokeDasharray="5 4"
          className="stroke-callout-warning"
        />
        {/* δ-window around the target (the answer) */}
        <rect
          x={sx(a - delta)}
          y={0}
          width={sx(a + delta) - sx(a - delta)}
          height={300}
          className="fill-plot/10"
        />
        <line
          x1={sx(a - delta)}
          y1={0}
          x2={sx(a - delta)}
          y2={300}
          strokeDasharray="5 4"
          className="stroke-plot"
        />
        <line
          x1={sx(a + delta)}
          y1={0}
          x2={sx(a + delta)}
          y2={300}
          strokeDasharray="5 4"
          className="stroke-plot"
        />
      </FunctionPlot>
      <SliderRow
        label={<Latex latex="\varepsilon" />}
        value={idx}
        min={0}
        max={config.epsilons.length - 1}
        step={1}
        onChange={setIdx}
      />
      <div className="rounded-md border bg-background p-4 text-center">
        <Latex
          latex={`\\varepsilon = ${formatNumber(epsilon)} \\;\\Rightarrow\\; \\delta = ${formatNumber(delta, 3)} \\text{ works}`}
          display
        />
        <p className="mt-1 text-sm text-muted-foreground">
          Keep x within {formatNumber(delta, 3)} of {formatNumber(a)} and f(x)
          is guaranteed to stay within {formatNumber(epsilon)} of{" "}
          {formatNumber(L)}.
        </p>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Tighten ε (the demanded output tolerance) and watch: a matching input
        window δ always exists. That endless win is what the limit really is.
      </p>
    </InteractiveFrame>
  );
}
