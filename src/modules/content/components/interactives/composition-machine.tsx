"use client";

import { useState } from "react";
import type { z } from "zod";
import type { compositionMachineSchema } from "../../schemas/blocks";
import { evaluateAt } from "../../lib/math-eval";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof compositionMachineSchema>;

function Stage({
  label,
  latex,
}: {
  label: string;
  latex: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-md border-2 border-plot/60 bg-background px-4 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Latex latex={latex} />
    </div>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border bg-background px-4 py-2 font-semibold tabular-nums">
      {children}
    </div>
  );
}

export function CompositionMachine({ config }: { config: Config }) {
  const [x, setX] = useState(config.initial);
  const inner = evaluateAt(config.innerExpr, x);
  const outer = evaluateAt(config.outerExpr, inner);
  const g = config.innerLabel;
  const f = config.outerLabel;

  return (
    <InteractiveFrame title="Composition">
      <SliderRow
        label={<Latex latex="x" />}
        value={x}
        min={config.min}
        max={config.max}
        step={config.step}
        onChange={setX}
      />
      <div className="flex flex-col items-center gap-2 py-2">
        <Value>{formatNumber(x)}</Value>
        <span className="text-muted-foreground">↓</span>
        <Stage label={`${g} first`} latex={`${g}(x) = ${config.innerLatex}`} />
        <span className="text-muted-foreground">↓</span>
        <Value>{formatNumber(inner)}</Value>
        <span className="text-muted-foreground">↓</span>
        <Stage label={`then ${f}`} latex={`${f}(x) = ${config.outerLatex}`} />
        <span className="text-muted-foreground">↓</span>
        <Value>{formatNumber(outer)}</Value>
      </div>
      <div className="text-center">
        <Latex
          latex={`${f}(${g}(${formatNumber(x)})) = ${f}(${formatNumber(inner)}) = ${formatNumber(outer)}`}
          display
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        The output of {g} becomes the input of {f}. That chain is composition.
      </p>
    </InteractiveFrame>
  );
}
