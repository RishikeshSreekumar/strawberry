"use client";

import { useState } from "react";
import type { z } from "zod";
import type { limitExplorerSchema } from "../../schemas/blocks";
import { evaluateAt } from "../../lib/math-eval";
import { FunctionPlot, formatNumber, type Point } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof limitExplorerSchema>;

/** Distances from the target, tightening step by step. */
const APPROACH_HS = [1, 0.5, 0.1, 0.01, 0.001];
/** Growing inputs for the x → ∞ mode. */
const INFINITY_XS = [1, 2, 5, 10, 100, 1000, 10000];

function safeEval(expr: string, x: number): number {
  try {
    const y = evaluateAt(expr, x);
    return Number.isFinite(y) ? y : NaN;
  } catch {
    return NaN;
  }
}

/** Format a table value, keeping enough decimals to show convergence. */
function fmt(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) >= 1e5) return value.toExponential(0);
  return String(Number(value.toFixed(5)));
}

export function LimitExplorer({ config }: { config: Config }) {
  const [step, setStep] = useState(0);
  if (config.target === "infinity") {
    return <InfinityView config={config} step={step} setStep={setStep} />;
  }
  return (
    <PointView
      config={config}
      target={config.target}
      step={step}
      setStep={setStep}
    />
  );
}

function PointView({
  config,
  target,
  step,
  setStep,
}: {
  config: Config;
  target: number;
  step: number;
  setStep: (n: number) => void;
}) {
  const h = APPROACH_HS[step];
  const xLeft = target - h;
  const xRight = target + h;
  const yLeft = safeEval(config.expr, xLeft);
  const yRight = safeEval(config.expr, xRight);

  // Numeric estimate of the limit, used only to place the open circle.
  const limitEst =
    (safeEval(config.expr, target - 1e-7) + safeEval(config.expr, target + 1e-7)) / 2;

  const points: Point[] = [];
  if (Number.isFinite(yLeft)) {
    points.push({ x: xLeft, y: yLeft, label: `x = ${formatNumber(xLeft, 3)}` });
  }
  if (Number.isFinite(yRight)) {
    points.push({
      x: xRight,
      y: yRight,
      className: "fill-plot-secondary stroke-plot-secondary",
      label: `x = ${formatNumber(xRight, 3)}`,
    });
  }
  if (config.hole && Number.isFinite(limitEst)) {
    points.push({ x: target, y: limitEst, open: true });
  }
  if (config.valueAtTarget !== undefined) {
    points.push({
      x: target,
      y: config.valueAtTarget,
      className: "fill-callout-warning stroke-callout-warning",
    });
  }

  return (
    <InteractiveFrame title="Approach, don't arrive">
      <div className="text-center">
        <Latex latex={`f(x) = ${config.exprLatex}`} display />
      </div>
      <FunctionPlot
        window={config.window}
        curves={[{ expr: config.expr, excluded: config.hole ? [target] : [] }]}
        points={points}
      />
      <SliderRow
        label="closer…"
        value={step}
        min={0}
        max={APPROACH_HS.length - 1}
        step={1}
        onChange={setStep}
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-sm tabular-nums">
          <thead>
            <tr>
              <th className="border-b-2 px-2 py-1 font-semibold">
                <Latex latex={`x \\to ${formatNumber(target)}^-`} />
              </th>
              <th className="border-b-2 px-2 py-1 font-semibold">
                <Latex latex="f(x)" />
              </th>
              <th className="border-b-2 px-2 py-1 font-semibold">
                <Latex latex={`x \\to ${formatNumber(target)}^+`} />
              </th>
              <th className="border-b-2 px-2 py-1 font-semibold">
                <Latex latex="f(x)" />
              </th>
            </tr>
          </thead>
          <tbody>
            {APPROACH_HS.map((hh, i) => {
              const active = i === step;
              const revealed = i <= step;
              return (
                <tr
                  key={hh}
                  className={
                    active
                      ? "bg-plot/10 font-medium"
                      : revealed
                        ? ""
                        : "opacity-30"
                  }
                >
                  <td className="border-b px-2 py-1">{fmt(target - hh)}</td>
                  <td className="border-b px-2 py-1">
                    {revealed ? fmt(safeEval(config.expr, target - hh)) : "?"}
                  </td>
                  <td className="border-b px-2 py-1">{fmt(target + hh)}</td>
                  <td className="border-b px-2 py-1">
                    {revealed ? fmt(safeEval(config.expr, target + hh)) : "?"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Slide right to tighten the squeeze from both sides. The question is
        never &quot;what is f at {formatNumber(target)}?&quot; — it is &quot;what are the
        outputs closing in on?&quot;
      </p>
    </InteractiveFrame>
  );
}

function InfinityView({
  config,
  step,
  setStep,
}: {
  config: Config;
  step: number;
  setStep: (n: number) => void;
}) {
  const x = INFINITY_XS[step];
  const y = safeEval(config.expr, x);
  const { xmin, xmax } = config.window;

  return (
    <InteractiveFrame title="What happens far out?">
      <div className="text-center">
        <Latex latex={`f(x) = ${config.exprLatex}`} display />
      </div>
      <FunctionPlot
        window={config.window}
        curves={[{ expr: config.expr }]}
        segments={
          config.asymptote !== undefined
            ? [
                {
                  x1: xmin,
                  y1: config.asymptote,
                  x2: xmax,
                  y2: config.asymptote,
                  className: "stroke-callout-warning",
                },
              ]
            : []
        }
        points={
          Number.isFinite(y) && x <= xmax
            ? [{ x, y, label: `x = ${fmt(x)}` }]
            : []
        }
      />
      <SliderRow
        label="farther…"
        value={step}
        min={0}
        max={INFINITY_XS.length - 1}
        step={1}
        onChange={setStep}
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-sm tabular-nums">
          <thead>
            <tr>
              <th className="border-b-2 px-2 py-1 font-semibold">
                <Latex latex="x" />
              </th>
              <th className="border-b-2 px-2 py-1 font-semibold">
                <Latex latex="f(x)" />
              </th>
            </tr>
          </thead>
          <tbody>
            {INFINITY_XS.map((xx, i) => (
              <tr
                key={xx}
                className={
                  i === step
                    ? "bg-plot/10 font-medium"
                    : i <= step
                      ? ""
                      : "opacity-30"
                }
              >
                <td className="border-b px-2 py-1">{fmt(xx)}</td>
                <td className="border-b px-2 py-1">
                  {i <= step ? fmt(safeEval(config.expr, xx)) : "?"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        The point runs off the right edge of the picture, but the table keeps
        going. Watch what the outputs settle toward.
      </p>
    </InteractiveFrame>
  );
}
