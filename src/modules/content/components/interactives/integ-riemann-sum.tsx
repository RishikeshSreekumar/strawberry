"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import type { integRiemannSumSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { fmt, safeFn, snap } from "./calc-shared";
import { FunctionPlot, makeScales, type Point } from "./function-plot";
import { clampY, pill, riemann, type RiemannMethod, simpson } from "./integ-shared";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof integRiemannSumSchema>;

const DEFAULT_CAPTION =
  "Slide n up. Left, right and midpoint sums are different guesses for the same area; as the strips get thinner they all close in on the definite integral.";
const ACCUMULATE_CAPTION =
  "Drag the upper limit x. The shaded area A(x) grows at the rate f(x): where f is tall it grows fast, where f is negative it shrinks. That is the Fundamental Theorem: A′(x) = f(x).";

const METHOD_LABEL: Record<RiemannMethod, string> = {
  left: "Left",
  right: "Right",
  midpoint: "Midpoint",
  trapezoid: "Trapezoid",
};

/** Polygon for the region between y = 0 and y = part(f(x)) on [lo, hi]. */
function regionPath(
  f: (x: number) => number,
  lo: number,
  hi: number,
  part: (v: number) => number,
  scales: ReturnType<typeof makeScales>,
  win: Config["window"],
): string {
  if (!(hi > lo)) return "";
  const samples = 160;
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = lo + ((hi - lo) * i) / samples;
    const v = f(x);
    const y = Number.isFinite(v) ? clampY(part(v), win.ymin, win.ymax) : 0;
    pts.push(`${scales.sx(x).toFixed(2)} ${scales.sy(y).toFixed(2)}`);
  }
  return `M ${scales.sx(lo).toFixed(2)} ${scales.sy(0).toFixed(2)} L ${pts.join(" L ")} L ${scales
    .sx(hi)
    .toFixed(2)} ${scales.sy(0).toFixed(2)} Z`;
}

export function IntegRiemannSum({ config }: { config: Config }) {
  const { window: win, a, b } = config;
  const [n, setN] = useState(config.n.initial);
  const [method, setMethod] = useState<RiemannMethod>(config.methods[0]);
  const upperStep = (b - a) / 100;
  const [upper, setUpper] = useState(a + (b - a) / 2);

  const f = useMemo(() => safeFn(config.expr, config.excluded), [config.expr, config.excluded]);
  const exact = useMemo(
    () => (config.exact !== undefined ? config.exact : simpson(f, a, b)),
    [config.exact, f, a, b],
  );
  const scales = makeScales(win);
  const aTex = config.aLatex ?? fmt(a, 3);
  const bTex = config.bLatex ?? fmt(b, 3);

  if (config.accumulate) {
    const area = simpson(f, a, upper, 400);
    const fx = f(upper);
    const h = 1e-3;
    const rate = (simpson(f, a, upper + h, 400) - area) / h;
    const points: Point[] =
      Number.isFinite(fx) && fx >= win.ymin && fx <= win.ymax ? [{ x: upper, y: fx, label: `f(x) = ${fmt(fx)}` }] : [];
    return (
      <InteractiveFrame title="Area so far">
        <div className="text-center">
          <Latex latex={`A(x) = \\int_{${aTex}}^{x} ${config.exprLatex.replace(/\bx\b/g, "t")}\\,dt`} display />
        </div>
        <FunctionPlot window={win} curves={[{ expr: config.expr, excluded: config.excluded }]} points={points}>
          <path d={regionPath(f, a, upper, (v) => Math.max(v, 0), scales, win)} className="fill-plot/25" />
          <path d={regionPath(f, a, upper, (v) => Math.min(v, 0), scales, win)} className="fill-callout-warning/30" />
          <line
            x1={scales.sx(upper)}
            y1={0}
            x2={scales.sx(upper)}
            y2={300}
            className="stroke-plot"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        </FunctionPlot>
        <SliderRow
          label={<Latex latex="x" />}
          value={upper}
          min={a}
          max={b}
          step={upperStep}
          onChange={(v) => setUpper(snap(v, a, upperStep))}
        />
        <div className="grid gap-2 text-sm sm:grid-cols-3">
          <div className="rounded-md border bg-background p-3 text-center">
            <p className="mb-1 text-xs text-muted-foreground">Signed area so far</p>
            <Latex latex={`A(${fmt(upper)}) \\approx ${fmt(area, 4)}`} />
          </div>
          <div className="rounded-md border bg-background p-3 text-center">
            <p className="mb-1 text-xs text-muted-foreground">Height at x</p>
            <Latex latex={`f(${fmt(upper)}) = ${fmt(fx, 4)}`} />
          </div>
          <div className="rounded-md border bg-background p-3 text-center">
            <p className="mb-1 text-xs text-muted-foreground">Growth rate of A</p>
            <Latex latex={`\\frac{A(x + h) - A(x)}{h} \\approx ${fmt(rate, 3)}`} />
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          <RichText text={config.caption ?? ACCUMULATE_CAPTION} />
        </p>
      </InteractiveFrame>
    );
  }

  const { strips, total } = riemann(f, a, b, n, method);
  const error = total - exact;
  const sampleX = (s: { x1: number; x2: number }) =>
    method === "left" ? s.x1 : method === "right" ? s.x2 : (s.x1 + s.x2) / 2;

  return (
    <InteractiveFrame title="Riemann sums">
      <div className="text-center">
        <Latex latex={`\\int_{${aTex}}^{${bTex}} ${config.exprLatex}\\,dx`} display />
      </div>
      {config.methods.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {config.methods.map((m) => (
            <button key={m} type="button" onClick={() => setMethod(m)} className={pill(m === method)}>
              {METHOD_LABEL[m]}
            </button>
          ))}
        </div>
      )}
      <FunctionPlot window={win} curves={[{ expr: config.expr, excluded: config.excluded }]}>
        {strips.map((s, i) => {
          if (!Number.isFinite(s.h1) || !Number.isFinite(s.h2)) return null;
          const h1 = clampY(s.h1, win.ymin, win.ymax);
          const h2 = clampY(s.h2, win.ymin, win.ymax);
          const positive = s.h1 + s.h2 >= 0;
          const d = `M ${scales.sx(s.x1).toFixed(2)} ${scales.sy(0).toFixed(2)} L ${scales.sx(s.x1).toFixed(2)} ${scales
            .sy(h1)
            .toFixed(2)} L ${scales.sx(s.x2).toFixed(2)} ${scales.sy(h2).toFixed(2)} L ${scales
            .sx(s.x2)
            .toFixed(2)} ${scales.sy(0).toFixed(2)} Z`;
          return (
            <path
              key={i}
              d={d}
              strokeWidth={1}
              className={positive ? "fill-plot/20 stroke-plot" : "fill-callout-warning/25 stroke-callout-warning"}
            />
          );
        })}
        {method !== "trapezoid" &&
          n <= 40 &&
          strips.map((s, i) =>
            Number.isFinite(s.h1) && s.h1 >= win.ymin && s.h1 <= win.ymax ? (
              <circle
                key={`p${i}`}
                cx={scales.sx(sampleX(s))}
                cy={scales.sy(s.h1)}
                r={2.5}
                className="fill-callout-definition"
              />
            ) : null,
          )}
      </FunctionPlot>
      <SliderRow
        label={<Latex latex="n" />}
        value={n}
        min={config.n.min}
        max={config.n.max}
        step={1}
        onChange={(v) => setN(Math.round(v))}
      />
      <div className="grid gap-2 text-sm sm:grid-cols-3">
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">
            {METHOD_LABEL[method]} sum, {n} strip{n === 1 ? "" : "s"}
          </p>
          <Latex latex={`S_{${n}} = ${fmt(total, 4)}`} />
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Exact integral</p>
          <Latex latex={config.exactLatex ? `${config.exactLatex} \\approx ${fmt(exact, 4)}` : fmt(exact, 4)} />
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Error</p>
          <Latex latex={`S_{${n}} - I = ${fmt(error, 4)}`} />
        </div>
      </div>
      <p className="rounded-md border bg-background p-3 text-sm">
        Strip width <Latex latex={`\\Delta x = \\frac{${bTex} - ${a < 0 ? `(${aTex})` : aTex}}{${n}} = ${fmt((b - a) / n, 4)}`} />.
        Shaded blue strips count positive, orange strips (below the axis) count negative.
      </p>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION} />
      </p>
    </InteractiveFrame>
  );
}
