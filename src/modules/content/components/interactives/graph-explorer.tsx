"use client";

import { useState } from "react";
import type { z } from "zod";
import type { graphExplorerSchema } from "../../schemas/blocks";
import { evaluateAt } from "../../lib/math-eval";
import { FunctionPlot, formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof graphExplorerSchema>;

export function GraphExplorer({ config }: { config: Config }) {
  const [x, setX] = useState(config.initial);
  const isExcluded = config.excluded.some((ex) => Math.abs(x - ex) < 1e-9);
  const y = isExcluded ? NaN : evaluateAt(config.expr, x);
  const tableXs = [x - 2, x - 1, x, x + 1, x + 2].map(
    (v) => Math.round(v * 100) / 100,
  );

  return (
    <InteractiveFrame title="Explore the graph">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <FunctionPlot
            window={config.window}
            curves={[{ expr: config.expr, excluded: config.excluded }]}
            points={
              Number.isFinite(y) &&
              y >= config.window.ymin &&
              y <= config.window.ymax
                ? [{ x, y, label: `(${formatNumber(x)}, ${formatNumber(y)})` }]
                : []
            }
          />
          <div className="mt-3">
            <SliderRow
              label={<Latex latex="x" />}
              value={x}
              min={config.window.xmin}
              max={config.window.xmax}
              step={0.5}
              onChange={setX}
            />
          </div>
        </div>
        <div className="w-full space-y-3 sm:w-52">
          <div className="rounded-md border bg-background p-3 text-center">
            <p className="mb-1 text-xs text-muted-foreground">Formula</p>
            <Latex latex={`f(x) = ${config.exprLatex}`} />
          </div>
          <div className="rounded-md border bg-background p-3">
            <p className="mb-1 text-center text-xs text-muted-foreground">Table</p>
            <table className="w-full text-center text-sm tabular-nums">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="font-medium">x</th>
                  <th className="font-medium">f(x)</th>
                </tr>
              </thead>
              <tbody>
                {tableXs.map((tx) => {
                  const excluded = config.excluded.some(
                    (ex) => Math.abs(tx - ex) < 1e-9,
                  );
                  return (
                    <tr
                      key={tx}
                      className={tx === x ? "font-semibold text-plot" : ""}
                    >
                      <td>{formatNumber(tx)}</td>
                      <td>
                        {excluded ? "✗" : formatNumber(evaluateAt(config.expr, tx))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {isExcluded && (
            <p className="rounded-md border border-callout-warning/40 bg-callout-warning/5 p-2 text-xs">
              The function refuses this input — x = {formatNumber(x)} is not in
              the domain.
            </p>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Formula, table and graph are three views of the same function.
      </p>
    </InteractiveFrame>
  );
}
