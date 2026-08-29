"use client";

import { useState } from "react";
import type { z } from "zod";
import type { piecewiseExplorerSchema } from "../../schemas/blocks";
import { evaluateAt } from "../../lib/math-eval";
import { FunctionPlot, formatNumber, type Point } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof piecewiseExplorerSchema>;

export function PiecewiseExplorer({ config }: { config: Config }) {
  const [x, setX] = useState(config.initial);
  const b = config.breakpoint;
  const rightOwnsBreak = config.breakBelongsTo === "right";
  const usesRight = rightOwnsBreak ? x >= b : x > b;
  const activeExpr = usesRight ? config.rightExpr : config.leftExpr;
  const y = evaluateAt(activeExpr, x);

  const leftEnd = evaluateAt(config.leftExpr, b);
  const rightEnd = evaluateAt(config.rightExpr, b);
  const breakPoints: Point[] = [
    { x: b, y: leftEnd, open: rightOwnsBreak, className: rightOwnsBreak ? "stroke-plot" : undefined },
    { x: b, y: rightEnd, open: !rightOwnsBreak, className: !rightOwnsBreak ? "stroke-plot-secondary" : "fill-plot-secondary stroke-plot-secondary" },
  ];

  const leftCond = rightOwnsBreak ? `x < ${b}` : `x \\le ${b}`;
  const rightCond = rightOwnsBreak ? `x \\ge ${b}` : `x > ${b}`;

  return (
    <InteractiveFrame title="Which rule is active?">
      <FunctionPlot
        window={config.window}
        curves={[
          {
            expr: config.leftExpr,
            xmax: b,
            className: usesRight ? "stroke-plot/30" : "stroke-plot",
          },
          {
            expr: config.rightExpr,
            xmin: b,
            className: usesRight ? "stroke-plot-secondary" : "stroke-plot-secondary/30",
          },
        ]}
        points={[
          ...breakPoints,
          {
            x,
            y,
            className: usesRight ? "fill-plot-secondary stroke-plot-secondary" : "fill-plot stroke-plot",
            label: `(${formatNumber(x)}, ${formatNumber(y)})`,
          },
        ]}
      />
      <SliderRow
        label={<Latex latex="x" />}
        value={x}
        min={config.window.xmin}
        max={config.window.xmax}
        step={0.5}
        onChange={setX}
      />
      <div className="grid grid-cols-2 gap-2 text-center text-sm">
        <div
          className={`rounded-md border p-3 ${
            !usesRight
              ? "border-plot bg-plot/10"
              : "bg-background opacity-50"
          }`}
        >
          {!usesRight && <span className="mr-1 text-plot">✓</span>}
          <Latex latex={`${leftCond}: \\; ${config.leftLatex}`} />
        </div>
        <div
          className={`rounded-md border p-3 ${
            usesRight
              ? "border-plot-secondary bg-plot-secondary/10"
              : "bg-background opacity-50"
          }`}
        >
          {usesRight && <span className="mr-1 text-plot-secondary">✓</span>}
          <Latex latex={`${rightCond}: \\; ${config.rightLatex}`} />
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        One function, two rules. The closed circle shows which rule owns
        x = {b}; the open circle is a value the other rule approaches but never
        takes.
      </p>
    </InteractiveFrame>
  );
}
