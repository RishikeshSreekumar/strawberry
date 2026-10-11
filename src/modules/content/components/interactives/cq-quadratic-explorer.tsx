"use client";

import { useState } from "react";
import type { z } from "zod";
import type { cqQuadraticExplorerSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { numLatex, tidy } from "./cq-format";
import { ReadoutRow } from "./cq-plane";
import { FunctionPlot, makeScales } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof cqQuadraticExplorerSchema>;
type Readout = NonNullable<Config["readouts"]>[number];

const DEFAULT_READOUTS: Readout[] = ["discriminant", "roots", "vertex", "sum-product"];
const EPS = 1e-9;

/** ax^2 + bx + c as LaTeX, skipping zero terms and unit coefficients. */
function polyLatex(a: number, b: number, c: number): string {
  const terms: [number, string][] = [
    [tidy(a), "x^2"],
    [tidy(b), "x"],
    [tidy(c), ""],
  ];
  let out = "";
  for (const [coef, pow] of terms) {
    if (coef === 0) continue;
    const abs = Math.abs(coef);
    const body = pow === "" ? String(abs) : `${abs === 1 ? "" : abs}${pow}`;
    if (out === "") out = `${coef < 0 ? "-" : ""}${body}`;
    else out += ` ${coef < 0 ? "-" : "+"} ${body}`;
  }
  return out || "0";
}

/** (x - r) with the sign tidied: (x + 2), (x - 1.5), x. */
function factorLatex(r: number): string {
  const t = tidy(r);
  if (t === 0) return "x";
  return `(x ${t < 0 ? "+" : "-"} ${Math.abs(t)})`;
}

const tick = (ok: boolean) => (ok ? "\\checkmark" : "\\times");

type Condition = { latex: string; ok: boolean };
type Case = { title: string; conditions: Condition[]; actual: boolean };

export function CqQuadraticExplorer({ config }: { config: Config }) {
  const [a, setA] = useState(config.a.initial);
  const [b, setB] = useState(config.b.initial);
  const [c, setC] = useState(config.c.initial);
  const [k1, setK1] = useState(config.markers?.k1.initial ?? 0);
  const [k2, setK2] = useState(config.markers?.k2?.initial ?? 1);

  const readouts = config.readouts ?? DEFAULT_READOUTS;
  const win = config.window;
  const { sx, sy } = makeScales(win);
  const f = (x: number) => a * x * x + b * x + c;

  const isQuadratic = Math.abs(a) > EPS;
  const D = b * b - 4 * a * c;
  const h = isQuadratic ? -b / (2 * a) : NaN;
  const kv = isQuadratic ? -D / (4 * a) : NaN;
  const realRoots: number[] = !isQuadratic
    ? Math.abs(b) > EPS
      ? [-c / b]
      : []
    : D > EPS
      ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((p, q) => p - q)
      : Math.abs(D) <= EPS
        ? [h]
        : [];

  // ----- plot overlays -----
  const inWin = (x: number, y: number) =>
    Number.isFinite(x) && Number.isFinite(y) && x >= win.xmin && x <= win.xmax && y >= win.ymin && y <= win.ymax;
  const points = [
    ...(config.showRoots
      ? realRoots.filter((r) => inWin(r, 0)).map((r) => ({ x: r, y: 0, className: "fill-callout-tip stroke-callout-tip" }))
      : []),
    ...(config.showVertex && isQuadratic && inWin(h, kv)
      ? [{ x: h, y: kv, className: "fill-callout-warning stroke-callout-warning", label: `(${tidy(h)}, ${tidy(kv)})` }]
      : []),
  ];

  // Sign of f along the x-axis, as coloured runs.
  const signRuns: { x0: number; x1: number; positive: boolean }[] = [];
  if (config.showSign) {
    const N = 240;
    for (let i = 0; i < N; i++) {
      const x0 = win.xmin + ((win.xmax - win.xmin) * i) / N;
      const x1 = win.xmin + ((win.xmax - win.xmin) * (i + 1)) / N;
      const v = f((x0 + x1) / 2);
      if (Math.abs(v) < EPS) continue;
      const positive = v > 0;
      const last = signRuns[signRuns.length - 1];
      if (last && last.positive === positive && Math.abs(last.x1 - x0) < 1e-9) last.x1 = x1;
      else signRuns.push({ x0, x1, positive });
    }
  }
  const axisY = win.ymin <= 0 && win.ymax >= 0 ? sy(0) : null;

  // ----- location of roots -----
  const markers = config.markers;
  const hasInterval = Boolean(markers?.k2);
  const lo = Math.min(k1, k2);
  const hi = Math.max(k1, k2);
  const cases: Case[] = [];
  if (markers && isQuadratic) {
    const real = D >= -EPS;
    const r1 = realRoots[0];
    const r2 = realRoots[realRoots.length - 1];
    if (!hasInterval) {
      const afk = a * f(k1);
      cases.push(
        {
          title: "Both roots greater than k",
          conditions: [
            { latex: "D \\ge 0", ok: real },
            { latex: "a\\,f(k) > 0", ok: afk > EPS },
            { latex: "-\\tfrac{b}{2a} > k", ok: h > k1 + EPS },
          ],
          actual: real && r1 > k1 + EPS,
        },
        {
          title: "Both roots less than k",
          conditions: [
            { latex: "D \\ge 0", ok: real },
            { latex: "a\\,f(k) > 0", ok: afk > EPS },
            { latex: "-\\tfrac{b}{2a} < k", ok: h < k1 - EPS },
          ],
          actual: real && r2 < k1 - EPS,
        },
        {
          title: "k lies strictly between the roots",
          conditions: [{ latex: "a\\,f(k) < 0", ok: afk < -EPS }],
          actual: real && r1 < k1 - EPS && r2 > k1 + EPS,
        },
      );
    } else {
      const af1 = a * f(lo);
      const af2 = a * f(hi);
      const inside = (r: number) => r > lo + EPS && r < hi - EPS;
      cases.push(
        {
          title: "Both roots inside the interval",
          conditions: [
            { latex: "D \\ge 0", ok: real },
            { latex: "a\\,f(k_1) > 0", ok: af1 > EPS },
            { latex: "a\\,f(k_2) > 0", ok: af2 > EPS },
            { latex: "k_1 < -\\tfrac{b}{2a} < k_2", ok: h > lo + EPS && h < hi - EPS },
          ],
          actual: real && inside(r1) && inside(r2),
        },
        {
          title: "Exactly one root inside the interval",
          conditions: [{ latex: "f(k_1)\\,f(k_2) < 0", ok: f(lo) * f(hi) < -EPS }],
          actual: real && realRoots.length === 2 && inside(r1) !== inside(r2),
        },
        {
          title: "Interval lies strictly between the roots",
          conditions: [
            { latex: "a\\,f(k_1) < 0", ok: af1 < -EPS },
            { latex: "a\\,f(k_2) < 0", ok: af2 < -EPS },
          ],
          actual: real && r1 < lo - EPS && r2 > hi + EPS,
        },
      );
    }
  }

  // ----- readouts -----
  const sqrtAbsD = Math.sqrt(Math.abs(D));
  let rootsLatex: string;
  let natureText: string;
  if (!isQuadratic) {
    rootsLatex = Math.abs(b) > EPS ? `x = ${numLatex(-c / b)}` : "\\text{no single root}";
    natureText = "a = 0: not a quadratic (the graph is a line)";
  } else if (D > EPS) {
    rootsLatex = `x = ${numLatex(realRoots[0])},\\ ${numLatex(realRoots[1])}`;
    natureText = "D > 0: two distinct real roots";
  } else if (Math.abs(D) <= EPS) {
    rootsLatex = `x = ${numLatex(h)}\\ (\\text{twice})`;
    natureText = "D = 0: equal real roots (the vertex touches the axis)";
  } else {
    const q = sqrtAbsD / (2 * Math.abs(a));
    rootsLatex = `x = ${numLatex(h)} \\pm ${numLatex(q)}\\,i`;
    natureText = "D < 0: complex conjugate roots (the graph misses the axis)";
  }

  const showMarkers = Boolean(markers);
  const markerXs = showMarkers ? (hasInterval ? [k1, k2] : [k1]) : [];

  return (
    <InteractiveFrame title="Quadratic explorer">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-3">
          <FunctionPlot
            window={win}
            curves={[{ expr: "a*x^2 + b*x + c", env: { a, b, c } }]}
            points={points}
          >
            {axisY !== null &&
              signRuns.map((run, i) => (
                <line
                  key={`sign${i}`}
                  x1={sx(run.x0)}
                  y1={axisY}
                  x2={sx(run.x1)}
                  y2={axisY}
                  strokeWidth={5}
                  strokeLinecap="butt"
                  opacity={0.55}
                  className={run.positive ? "stroke-callout-tip" : "stroke-destructive"}
                />
              ))}
            {config.showAxis && isQuadratic && h >= win.xmin && h <= win.xmax && (
              <line
                x1={sx(h)}
                y1={0}
                x2={sx(h)}
                y2={sy(win.ymin)}
                strokeDasharray="4 4"
                strokeWidth={1}
                className="stroke-callout-warning"
              />
            )}
            {markerXs.map((k, i) =>
              k >= win.xmin && k <= win.xmax ? (
                <g key={`k${i}`}>
                  <line
                    x1={sx(k)}
                    y1={0}
                    x2={sx(k)}
                    y2={sy(win.ymin)}
                    strokeDasharray="2 3"
                    strokeWidth={1.5}
                    className="stroke-callout-definition"
                  />
                  <text x={sx(k) + 4} y={12} className="fill-callout-definition text-[10px] font-medium">
                    {hasInterval ? `k${i + 1}` : "k"}
                  </text>
                </g>
              ) : null,
            )}
          </FunctionPlot>
          <div className="space-y-1">
            <SliderRow label={<Latex latex="a" />} value={a} min={config.a.min} max={config.a.max} step={config.a.step} onChange={setA} />
            <SliderRow label={<Latex latex="b" />} value={b} min={config.b.min} max={config.b.max} step={config.b.step} onChange={setB} />
            <SliderRow label={<Latex latex="c" />} value={c} min={config.c.min} max={config.c.max} step={config.c.step} onChange={setC} />
            {markers && (
              <SliderRow
                label={<Latex latex={hasInterval ? "k_1" : "k"} />}
                value={k1}
                min={markers.k1.min}
                max={markers.k1.max}
                step={markers.k1.step}
                onChange={setK1}
              />
            )}
            {markers?.k2 && (
              <SliderRow
                label={<Latex latex="k_2" />}
                value={k2}
                min={markers.k2.min}
                max={markers.k2.max}
                step={markers.k2.step}
                onChange={setK2}
              />
            )}
          </div>
        </div>

        <div className="w-full space-y-3 text-sm sm:w-60">
          <div className="rounded-md border bg-background p-3 text-center">
            <Latex latex={`f(x) = ${polyLatex(a, b, c)}`} />
            <p className="mt-1 text-xs text-muted-foreground">{natureText}</p>
          </div>
          <div className="space-y-1 rounded-md border bg-background p-3">
            {readouts.includes("discriminant") && (
              <ReadoutRow label={<Latex latex="D = b^2 - 4ac" />}>
                <Latex latex={numLatex(D)} />
              </ReadoutRow>
            )}
            {readouts.includes("roots") && (
              <ReadoutRow label="roots">
                <Latex latex={rootsLatex} />
              </ReadoutRow>
            )}
            {readouts.includes("vertex") && isQuadratic && (
              <ReadoutRow label="vertex">
                <Latex latex={`\\left(${numLatex(h)},\\ ${numLatex(kv)}\\right)`} />
              </ReadoutRow>
            )}
            {readouts.includes("sum-product") && isQuadratic && (
              <>
                <ReadoutRow label={<Latex latex="\alpha + \beta = -\tfrac{b}{a}" />}>
                  <Latex latex={numLatex(-b / a)} />
                </ReadoutRow>
                <ReadoutRow label={<Latex latex="\alpha\beta = \tfrac{c}{a}" />}>
                  <Latex latex={numLatex(c / a)} />
                </ReadoutRow>
              </>
            )}
            {readouts.includes("factored") && isQuadratic && (
              <ReadoutRow label="factored">
                <Latex
                  latex={
                    realRoots.length === 2
                      ? `${tidy(a) === 1 ? "" : tidy(a) === -1 ? "-" : tidy(a)}${factorLatex(realRoots[0])}${factorLatex(realRoots[1])}`
                      : realRoots.length === 1
                        ? `${tidy(a) === 1 ? "" : tidy(a) === -1 ? "-" : tidy(a)}${factorLatex(realRoots[0])}^2`
                        : "\\text{no real factors}"
                  }
                />
              </ReadoutRow>
            )}
            {readouts.includes("range") && isQuadratic && (
              <ReadoutRow label="range">
                <Latex latex={a > 0 ? `y \\ge ${numLatex(kv)}` : `y \\le ${numLatex(kv)}`} />
              </ReadoutRow>
            )}
          </div>

          {markers && isQuadratic && (
            <div className="space-y-2 rounded-md border bg-background p-3">
              <p className="text-xs text-muted-foreground">
                {hasInterval ? (
                  <Latex latex={`k_1 = ${numLatex(lo)},\\ k_2 = ${numLatex(hi)},\\ f(k_1) = ${numLatex(f(lo))},\\ f(k_2) = ${numLatex(f(hi))}`} />
                ) : (
                  <Latex latex={`k = ${numLatex(k1)},\\ f(k) = ${numLatex(f(k1))},\\ -\\tfrac{b}{2a} = ${numLatex(h)}`} />
                )}
              </p>
              {cases.map((cs) => {
                const allOk = cs.conditions.every((cond) => cond.ok);
                return (
                  <div key={cs.title} className={`rounded border p-2 ${allOk ? "border-callout-tip/60 bg-callout-tip/5" : ""}`}>
                    <p className="text-xs font-medium">
                      {cs.title}: {allOk ? "conditions hold" : "conditions fail"}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {cs.conditions.map((cond) => (
                        <span key={cond.latex} className={cond.ok ? "text-callout-tip" : "text-muted-foreground"}>
                          <Latex latex={`${cond.latex}\\ ${tick(cond.ok)}`} />
                        </span>
                      ))}
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Roots actually {cs.actual ? "do" : "do not"} satisfy this.
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText
          text={
            config.caption ??
            "Slide a, b and c. The sign of a decides which way the parabola opens; the sign of D decides whether it meets the x-axis twice, once or never."
          }
        />
      </p>
    </InteractiveFrame>
  );
}
