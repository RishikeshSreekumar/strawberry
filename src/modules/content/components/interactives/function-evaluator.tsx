"use client";

import { useState } from "react";
import type { z } from "zod";
import type { functionEvaluatorSchema } from "../../schemas/blocks";
import { evaluateAt } from "../../lib/math-eval";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof functionEvaluatorSchema>;

export function FunctionEvaluator({ config }: { config: Config }) {
  const [x, setX] = useState(config.initial);
  const y = evaluateAt(config.expr, x);
  const name = config.name;
  // Substitute the chosen value into the displayed formula.
  const substituted = config.exprLatex.replaceAll("x", `(${x})`);

  return (
    <InteractiveFrame title="Evaluate">
      <div className="text-center">
        <Latex latex={`${name}(x) = ${config.exprLatex}`} display />
      </div>
      <SliderRow
        label={<Latex latex="x" />}
        value={x}
        min={config.min}
        max={config.max}
        step={config.step}
        onChange={setX}
      />
      <div className="space-y-1 rounded-md border bg-background p-4 text-center">
        <Latex latex={`${name}(${x}) = ${substituted}`} display />
        <Latex latex={`${name}(${x}) = ${formatNumber(y)}`} display />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <Latex latex={`${name}(${x})`} /> means &ldquo;the output of{" "}
        <Latex latex={name} /> when the input is {x}&rdquo; — not{" "}
        <Latex latex={`${name} \\times ${x}`} />.
      </p>
    </InteractiveFrame>
  );
}
