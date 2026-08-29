"use client";

import { useState } from "react";
import type { z } from "zod";
import type { functionMachineSchema } from "../../schemas/blocks";
import { evaluateAt } from "../../lib/math-eval";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof functionMachineSchema>;

export function FunctionMachine({ config }: { config: Config }) {
  const [x, setX] = useState(config.initial);
  const y = evaluateAt(config.expr, x);

  return (
    <InteractiveFrame title="Try it">
      <SliderRow
        label={config.inputLabel}
        value={x}
        min={config.min}
        max={config.max}
        step={config.step}
        onChange={setX}
        unit={config.inputUnit}
      />
      <div className="flex items-center justify-center gap-3 py-2 text-sm">
        <span className="rounded-md border bg-background px-3 py-2 tabular-nums">
          {x}
          {config.inputUnit ? ` ${config.inputUnit}` : ""}
        </span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-md border-2 border-plot/60 bg-background px-3 py-2">
          <Latex latex={config.exprLatex} />
        </span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-md border bg-background px-3 py-2 font-semibold tabular-nums">
          {config.outputPrefix ?? ""}
          {formatNumber(y)}
        </span>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {config.inputLabel} in, {config.outputLabel.toLowerCase()} out — one
        output for every input.
      </p>
    </InteractiveFrame>
  );
}
