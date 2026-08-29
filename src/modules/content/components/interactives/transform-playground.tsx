"use client";

import { useState } from "react";
import type { z } from "zod";
import type { transformPlaygroundSchema } from "../../schemas/blocks";
import { FunctionPlot } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof transformPlaygroundSchema>;

export function TransformPlayground({ config }: { config: Config }) {
  const [env, setEnv] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.params.map((p) => [p.name, p.initial])),
  );

  return (
    <InteractiveFrame title="Transform">
      <div className="text-center">
        <Latex latex={`y = ${config.exprLatex}`} display />
      </div>
      <FunctionPlot
        window={config.window}
        curves={[
          { expr: config.baseExpr, className: "stroke-muted-foreground/40", dashed: true },
          { expr: config.expr, env },
        ]}
      />
      <div className="space-y-2">
        {config.params.map((p) => (
          <SliderRow
            key={p.name}
            label={<Latex latex={p.name} />}
            value={env[p.name]}
            min={p.min}
            max={p.max}
            step={p.step}
            onChange={(v) => setEnv((prev) => ({ ...prev, [p.name]: v }))}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        The dashed curve is the original <Latex latex={config.baseLatex} />.
        Move the sliders and watch how the formula moves the graph.
      </p>
    </InteractiveFrame>
  );
}
