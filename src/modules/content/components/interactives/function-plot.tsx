"use client";

import type { PlotWindow } from "../../schemas/blocks";
import { compileExpression } from "../../lib/math-eval";

export type Curve = {
  expr: string;
  env?: Record<string, number>;
  /** Restrict sampling to a sub-interval of the window. */
  xmin?: number;
  xmax?: number;
  /** x-values where the function is undefined; the path breaks there. */
  excluded?: number[];
  className?: string;
  dashed?: boolean;
};

export type Point = {
  x: number;
  y: number;
  open?: boolean;
  className?: string;
  label?: string;
};

export type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  className?: string;
};

const W = 400;
const H = 300;
const SAMPLES = 240;

export function makeScales(window: PlotWindow) {
  const sx = (x: number) => ((x - window.xmin) / (window.xmax - window.xmin)) * W;
  const sy = (y: number) => H - ((y - window.ymin) / (window.ymax - window.ymin)) * H;
  return { sx, sy };
}

function curvePath(curve: Curve, window: PlotWindow): string {
  const { sx, sy } = makeScales(window);
  const evaluate = compileExpression(curve.expr);
  const lo = curve.xmin ?? window.xmin;
  const hi = curve.xmax ?? window.xmax;
  const overshoot = (window.ymax - window.ymin) * 2;
  let d = "";
  let pen = false;
  for (let i = 0; i <= SAMPLES; i++) {
    const x = lo + ((hi - lo) * i) / SAMPLES;
    const nearExcluded = curve.excluded?.some(
      (ex) => Math.abs(x - ex) < (hi - lo) / SAMPLES,
    );
    let y: number | null = null;
    if (!nearExcluded) {
      try {
        const value = evaluate({ x, ...curve.env });
        if (Number.isFinite(value) && Math.abs(value) < Math.abs(overshoot) + Math.abs(window.ymax) + Math.abs(window.ymin)) {
          y = value;
        }
      } catch {
        y = null;
      }
    }
    if (y === null) {
      pen = false;
      continue;
    }
    const px = sx(x);
    const py = sy(y);
    d += pen ? ` L ${px.toFixed(2)} ${py.toFixed(2)}` : ` M ${px.toFixed(2)} ${py.toFixed(2)}`;
    pen = true;
  }
  return d;
}

/**
 * Shared SVG function plotter for the interactive blocks: axes, optional
 * grid, sampled curves (with breaks at exclusions), points and segments.
 * Extra SVG overlays can be passed as children (use makeScales to map).
 */
export function FunctionPlot({
  window,
  curves = [],
  points = [],
  segments = [],
  children,
}: {
  window: PlotWindow;
  curves?: Curve[];
  points?: Point[];
  segments?: Segment[];
  children?: React.ReactNode;
}) {
  const { sx, sy } = makeScales(window);
  const xTicks: number[] = [];
  for (let x = Math.ceil(window.xmin); x <= Math.floor(window.xmax); x++) {
    if (x !== 0) xTicks.push(x);
  }
  const yTicks: number[] = [];
  const yStep = window.ymax - window.ymin > 12 ? 2 : 1;
  for (let y = Math.ceil(window.ymin); y <= Math.floor(window.ymax); y += yStep) {
    if (y !== 0) yTicks.push(y);
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-md rounded-md border bg-background"
      role="img"
    >
      {/* grid */}
      {xTicks.map((x) => (
        <line
          key={`gx${x}`}
          x1={sx(x)}
          y1={0}
          x2={sx(x)}
          y2={H}
          className="stroke-border"
          strokeWidth={0.5}
        />
      ))}
      {yTicks.map((y) => (
        <line
          key={`gy${y}`}
          x1={0}
          y1={sy(y)}
          x2={W}
          y2={sy(y)}
          className="stroke-border"
          strokeWidth={0.5}
        />
      ))}
      {/* axes */}
      {window.ymin <= 0 && window.ymax >= 0 && (
        <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-foreground/50" strokeWidth={1} />
      )}
      {window.xmin <= 0 && window.xmax >= 0 && (
        <line x1={sx(0)} y1={0} x2={sx(0)} y2={H} className="stroke-foreground/50" strokeWidth={1} />
      )}
      {/* axis tick labels (sparse) */}
      {xTicks
        .filter((x) => x % (window.xmax - window.xmin > 12 ? 2 : 1) === 0)
        .map((x) => (
          <text
            key={`tx${x}`}
            x={sx(x)}
            y={Math.min(H - 4, Math.max(10, sy(0) + 12))}
            className="fill-muted-foreground text-[9px]"
            textAnchor="middle"
          >
            {x}
          </text>
        ))}
      {curves.map((curve, i) => (
        <path
          key={i}
          d={curvePath(curve, window)}
          fill="none"
          strokeWidth={2}
          strokeDasharray={curve.dashed ? "5 4" : undefined}
          className={curve.className ?? "stroke-plot"}
        />
      ))}
      {segments.map((s, i) => (
        <line
          key={i}
          x1={sx(s.x1)}
          y1={sy(s.y1)}
          x2={sx(s.x2)}
          y2={sy(s.y2)}
          strokeWidth={1.5}
          className={s.className ?? "stroke-callout-warning"}
        />
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={sx(p.x)}
            cy={sy(p.y)}
            r={5}
            strokeWidth={2}
            className={
              p.open
                ? `fill-background ${p.className ?? "stroke-plot"}`
                : (p.className ?? "fill-plot stroke-plot")
            }
          />
          {p.label && (
            <text
              x={sx(p.x) + 8}
              y={sy(p.y) - 8}
              className="fill-foreground text-[10px] font-medium"
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
      {children}
    </svg>
  );
}

export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Number(value.toFixed(decimals));
  return String(rounded);
}
