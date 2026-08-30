"use client";

import { useState } from "react";
import type { z } from "zod";
import type { sinusoidPlaygroundSchema } from "../../schemas/blocks";
import { FunctionPlot, formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof sinusoidPlaygroundSchema>;

/** Round to the nearest 0.001 so slider values print cleanly in LaTeX. */
function tidy(v: number): string {
  return String(Number(v.toFixed(2)));
}

export function SinusoidPlayground({ config }: { config: Config }) {
  const [a, setA] = useState(config.initialA);
  const [b, setB] = useState(config.initialB);
  const [c, setC] = useState(config.initialC);
  const [d, setD] = useState(config.initialD);

  const fn = config.fn;
  const expr = `${a}*${fn}(${b}*(x - (${c}))) + (${d})`;
  const latex = `${a === 1 ? "" : a === -1 ? "-" : tidy(a)}\\${fn}\\!\\left(${
    b === 1 ? "" : tidy(b)
  }\\left(x ${c >= 0 ? "-" : "+"} ${tidy(Math.abs(c))}\\right)\\right) ${
    d >= 0 ? "+" : "-"
  } ${tidy(Math.abs(d))}`;

  const period = b === 0 ? Infinity : (2 * Math.PI) / Math.abs(b);
  const matched =
    config.target !== undefined &&
    Math.abs(a - config.target.a) < 1e-6 &&
    Math.abs(b - config.target.b) < 1e-6 &&
    Math.abs(c - config.target.c) < 1e-6 &&
    Math.abs(d - config.target.d) < 1e-6;

  return (
    <InteractiveFrame title="Sinusoid">
      <div className="text-center">
        <Latex latex={`y = ${latex}`} display />
      </div>
      <FunctionPlot
        window={config.window}
        xAxis="radians"
        curves={[
          ...(config.target
            ? [
                {
                  expr: `${config.target.a}*${fn}(${config.target.b}*(x - (${config.target.c}))) + (${config.target.d})`,
                  className: "stroke-plot-secondary",
                },
              ]
            : []),
          { expr: `${fn}(x)`, className: "stroke-muted-foreground/40", dashed: true },
          { expr },
        ]}
      />
      <div className="space-y-2">
        <SliderRow label={<Latex latex="a" />} value={a} min={-3} max={3} step={0.5} onChange={setA} />
        <SliderRow label={<Latex latex="b" />} value={b} min={0.5} max={4} step={0.5} onChange={setB} />
        <SliderRow label={<Latex latex="c" />} value={c} min={-3} max={3} step={0.25} onChange={setC} />
        <SliderRow label={<Latex latex="d" />} value={d} min={-3} max={3} step={0.5} onChange={setD} />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 rounded-md border bg-background p-3 text-sm">
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">amplitude</span>
          <span className="tabular-nums">{formatNumber(Math.abs(a))}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">period</span>
          <span className="tabular-nums">{formatNumber(period)}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">phase shift</span>
          <span className="tabular-nums">{formatNumber(c)}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">midline</span>
          <span className="tabular-nums">y = {formatNumber(d)}</span>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {config.target
          ? matched
            ? "Matched — the two curves now coincide."
            : "Move the sliders until your curve sits exactly on the purple target."
          : (config.caption ??
            "Dashed is the untransformed curve. Change one slider at a time and name the job it does.")}
      </p>
    </InteractiveFrame>
  );
}
