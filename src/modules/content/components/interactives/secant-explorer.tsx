"use client";

import { useState } from "react";
import type { z } from "zod";
import type { secantExplorerSchema } from "../../schemas/blocks";
import { evaluateAt } from "../../lib/math-eval";
import { FunctionPlot, formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof secantExplorerSchema>;

export function SecantExplorer({ config }: { config: Config }) {
  const [x2, setX2] = useState(config.initial);
  const x1 = config.x1;
  const y1 = evaluateAt(config.expr, x1);
  const y2 = evaluateAt(config.expr, x2);
  const collapsed = Math.abs(x2 - x1) < 1e-9;
  const slope = collapsed ? NaN : (y2 - y1) / (x2 - x1);

  // Extend the secant across the window.
  const { xmin, xmax } = config.window;
  const line = collapsed
    ? []
    : [
        {
          x1: xmin,
          y1: y1 + slope * (xmin - x1),
          x2: xmax,
          y2: y1 + slope * (xmax - x1),
          className: "stroke-callout-warning",
        },
      ];

  return (
    <InteractiveFrame title="Average rate of change">
      <div className="text-center">
        <Latex latex={`f(x) = ${config.exprLatex}`} display />
      </div>
      <FunctionPlot
        window={config.window}
        curves={[{ expr: config.expr }]}
        segments={line}
        points={[
          { x: x1, y: y1, label: `x₁ = ${formatNumber(x1)}` },
          ...(collapsed
            ? []
            : [
                {
                  x: x2,
                  y: y2,
                  className: "fill-callout-warning stroke-callout-warning",
                  label: `x₂ = ${formatNumber(x2)}`,
                },
              ]),
        ]}
      />
      <SliderRow
        label={<Latex latex="x_2" />}
        value={x2}
        min={config.min}
        max={config.max}
        step={config.step}
        onChange={setX2}
      />
      <div className="rounded-md border bg-background p-4 text-center">
        {collapsed ? (
          <>
            <Latex
              latex={`\\frac{f(${formatNumber(x1)}) - f(${formatNumber(x1)})}{${formatNumber(x1)} - ${formatNumber(x1)}} = \\frac{0}{0} \\;\\; ?!`}
              display
            />
            <p className="mt-1 text-sm font-medium text-callout-warning">
              Both points are the same point — the slope formula breaks. To fix
              this, we need a way to get arbitrarily close without touching.
              That idea is called a limit.
            </p>
          </>
        ) : (
          <Latex
            latex={`\\text{slope} = \\frac{f(${formatNumber(x2)}) - f(${formatNumber(x1)})}{${formatNumber(x2)} - ${formatNumber(x1)}} = \\frac{${formatNumber(y2)} - ${formatNumber(y1)}}{${formatNumber(x2 - x1)}} = ${formatNumber(slope, 3)}`}
            display
          />
        )}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Slide x₂ toward x₁ and watch the secant line — and its slope — settle
        toward something. Then try landing exactly on x₁.
      </p>
    </InteractiveFrame>
  );
}
