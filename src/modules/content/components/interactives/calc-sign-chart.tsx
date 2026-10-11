"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import type { calcSignChartSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  fmt,
  numericDerivative,
  numericSecondDerivative,
  type RealFn,
  safeFn,
  signChanges,
  signOf,
  tangentAt,
} from "./calc-shared";
import { FunctionPlot, type Point } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof calcSignChartSchema>;

const DEFAULT_CAPTION =
  "Scan x across the graph. Where f′ changes sign f has a turning point; where f″ changes sign the bending flips at a point of inflection.";

type Marker = { x: number; kind: "max" | "min" | "stationary" | "corner-max" | "corner-min" | "corner" | "inflection" };

type Row = {
  label: string;
  /** Breakpoints (sorted) including the window ends. */
  cuts: number[];
  /** Sign on each sub-interval between consecutive cuts (0 = undefined there). */
  signs: (-1 | 0 | 1)[];
  /** Interior cut labels. */
  marks: { x: number; label: string }[];
};

const CHART_W = 400;
const ROW_H = 34;

function buildRow(g: RealFn, label: string, cuts: number[]): Row {
  const signs = cuts.slice(0, -1).map((a, i) => {
    const b = cuts[i + 1];
    // Majority vote of a few interior samples (robust to a stray zero).
    let total = 0;
    for (const t of [0.25, 0.5, 0.75]) total += signOf(g(a + (b - a) * t));
    return total > 0 ? 1 : total < 0 ? -1 : 0;
  });
  return { label, cuts, signs, marks: cuts.slice(1, -1).map((x) => ({ x, label: fmt(x) })) };
}

export function CalcSignChart({ config }: { config: Config }) {
  const { window: win, excluded } = config;
  const [x, setX] = useState(config.initial);

  const analysis = useMemo(() => {
    const f = safeFn(config.expr, excluded);
    const fp = config.derivExpr ? safeFn(config.derivExpr, excluded) : numericDerivative(f);
    const fpp = config.secondDerivExpr ? safeFn(config.secondDerivExpr, excluded) : numericSecondDerivative(f);
    const lo = config.interval ? Math.max(win.xmin, config.interval.a) : win.xmin;
    const hi = config.interval ? Math.min(win.xmax, config.interval.b) : win.xmax;
    const valid = (c: number) =>
      c > lo + 1e-9 && c < hi - 1e-9 && Number.isFinite(f(c)) && !excluded.some((e) => Math.abs(c - e) < 1e-6);

    // A numeric f′ is smooth even at a corner, so confirm each zero with
    // one-sided difference quotients of f itself.
    const critical = signChanges(fp, lo, hi)
      .filter((p) => valid(p.x))
      .map((p) => ({ ...p, zero: p.zero && tangentAt(f, p.x).kind === "smooth" }));
    const inflect = signChanges(fpp, lo, hi).filter((p) => valid(p.x));
    const gaps = excluded.filter((e) => e > lo && e < hi);

    const firstCuts = [lo, ...[...critical.map((p) => p.x), ...gaps].sort((a, b) => a - b), hi];
    const secondCuts = [lo, ...[...inflect.map((p) => p.x), ...gaps].sort((a, b) => a - b), hi];
    const first = buildRow(fp, "f′", firstCuts);
    const second = buildRow(fpp, "f″", secondCuts);

    const markers: Marker[] = [];
    critical.forEach((p) => {
      const i = firstCuts.indexOf(p.x);
      const before = first.signs[i - 1];
      const after = first.signs[i];
      const corner = !p.zero;
      if (before > 0 && after < 0) markers.push({ x: p.x, kind: corner ? "corner-max" : "max" });
      else if (before < 0 && after > 0) markers.push({ x: p.x, kind: corner ? "corner-min" : "min" });
      else markers.push({ x: p.x, kind: corner ? "corner" : "stationary" });
    });
    inflect.forEach((p) => {
      const i = secondCuts.indexOf(p.x);
      const before = second.signs[i - 1];
      const after = second.signs[i];
      // A corner of f is reported as a critical point, not an inflection.
      const atCorner = critical.some((c) => !c.zero && Math.abs(c.x - p.x) < 1e-3);
      if (!atCorner && before !== 0 && after !== 0 && before !== after) {
        markers.push({ x: p.x, kind: "inflection" });
      }
    });

    // Closed-interval method.
    let table: { x: number; y: number; note: string }[] = [];
    if (config.interval) {
      const { a, b } = config.interval;
      table = [
        { x: a, y: f(a), note: "endpoint" },
        ...critical.map((p) => ({ x: p.x, y: f(p.x), note: p.zero ? "f′ = 0" : "f′ undefined" })),
        { x: b, y: f(b), note: "endpoint" },
      ].filter((r) => Number.isFinite(r.y));
    }
    return { f, fp, fpp, first, second, markers, table, lo, hi };
  }, [config.expr, config.derivExpr, config.secondDerivExpr, config.interval, excluded, win.xmin, win.xmax]);

  const { f, fp, fpp, first, second, markers, table } = analysis;
  const ymaxT = table.length ? Math.max(...table.map((r) => r.y)) : NaN;
  const yminT = table.length ? Math.min(...table.map((r) => r.y)) : NaN;

  const markerClass: Record<Marker["kind"], string> = {
    max: "fill-callout-warning stroke-callout-warning",
    "corner-max": "fill-callout-warning stroke-callout-warning",
    min: "fill-callout-tip stroke-callout-tip",
    "corner-min": "fill-callout-tip stroke-callout-tip",
    stationary: "fill-muted-foreground stroke-muted-foreground",
    corner: "fill-muted-foreground stroke-muted-foreground",
    inflection: "stroke-callout-definition",
  };
  const markerLabel: Record<Marker["kind"], string> = {
    max: "local max",
    "corner-max": "local max (corner)",
    min: "local min",
    "corner-min": "local min (corner)",
    stationary: "f′ = 0, no extremum",
    corner: "f′ undefined",
    inflection: "inflection",
  };

  const inWindow = (px: number, py: number) =>
    Number.isFinite(px) && Number.isFinite(py) && py >= win.ymin && py <= win.ymax && px >= win.xmin && px <= win.xmax;
  const points: Point[] = [];
  for (const m of markers) {
    const y = f(m.x);
    if (inWindow(m.x, y)) {
      points.push({ x: m.x, y, open: m.kind === "inflection", className: markerClass[m.kind], label: markerLabel[m.kind] });
    }
  }
  if (config.interval) {
    for (const r of table) {
      if (r.note === "endpoint" && inWindow(r.x, r.y)) {
        points.push({ x: r.x, y: r.y, className: "fill-foreground stroke-foreground" });
      }
    }
  }
  const yx = f(x);
  if (inWindow(x, yx)) points.push({ x, y: yx, label: `x = ${fmt(x)}` });

  const rows = config.rows.map((r) => (r === "first" ? first : second));
  const sx = (v: number) => ((v - win.xmin) / (win.xmax - win.xmin)) * CHART_W;
  const chartH = rows.length * ROW_H + 18;

  const d1 = fp(x);
  const d2 = fpp(x);
  const s1 = signOf(d1, 1e-6);
  const s2 = signOf(d2, 1e-5);
  const reading = !Number.isFinite(yx)
    ? "f is not defined here."
    : [
        s1 > 0 ? "f′ > 0: rising" : s1 < 0 ? "f′ < 0: falling" : Number.isFinite(d1) ? "f′ = 0: momentarily flat" : "f′ undefined",
        config.rows.includes("second")
          ? s2 > 0
            ? "f″ > 0: concave up (holds water)"
            : s2 < 0
              ? "f″ < 0: concave down (spills water)"
              : "f″ ≈ 0"
          : null,
      ]
        .filter(Boolean)
        .join("; ") + ".";

  return (
    <InteractiveFrame title="Sign chart explorer">
      <div className="text-center">
        <Latex latex={`f(x) = ${config.exprLatex}`} display />
      </div>
      <FunctionPlot
        window={win}
        curves={[
          { expr: config.expr, excluded, className: config.interval ? "stroke-plot/40" : undefined },
          ...(config.interval
            ? [{ expr: config.expr, excluded, xmin: analysis.lo, xmax: analysis.hi }]
            : []),
        ]}
        points={points}
      />
      <svg viewBox={`0 0 ${CHART_W} ${chartH}`} className="w-full max-w-md" role="img" aria-label="Sign chart">
        {rows.map((row, r) => {
          const top = r * ROW_H + 4;
          return (
            <g key={row.label}>
              {row.signs.map((s, i) => {
                const a = sx(row.cuts[i]);
                const b = sx(row.cuts[i + 1]);
                if (!(b - a > 0)) return null;
                return (
                  <g key={i}>
                    <rect
                      x={a}
                      y={top}
                      width={b - a}
                      height={ROW_H - 12}
                      rx={3}
                      className={
                        s > 0 ? "fill-callout-tip/20" : s < 0 ? "fill-callout-warning/20" : "fill-muted"
                      }
                    />
                    <text
                      x={(a + b) / 2}
                      y={top + (ROW_H - 12) / 2 + 4}
                      textAnchor="middle"
                      className="fill-foreground text-[11px] font-semibold"
                    >
                      {b - a > 22 ? `${row.label} ${s > 0 ? "+" : s < 0 ? "−" : "0"}` : s > 0 ? "+" : s < 0 ? "−" : ""}
                    </text>
                  </g>
                );
              })}
              {row.marks.map((m) => (
                <g key={m.x}>
                  <line x1={sx(m.x)} y1={top - 2} x2={sx(m.x)} y2={top + ROW_H - 10} className="stroke-foreground" strokeWidth={1.5} />
                  <text x={sx(m.x)} y={top + ROW_H} textAnchor="middle" className="fill-muted-foreground text-[9px]">
                    {m.label}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
        {Number.isFinite(x) && (
          <line x1={sx(x)} y1={0} x2={sx(x)} y2={chartH - 14} className="stroke-plot" strokeWidth={1} strokeDasharray="3 3" />
        )}
      </svg>
      <SliderRow
        label={<Latex latex="x" />}
        value={x}
        min={win.xmin}
        max={win.xmax}
        step={Math.max(0.01, Number(((win.xmax - win.xmin) / 200).toFixed(2)))}
        onChange={setX}
      />
      <div className="grid gap-2 text-sm sm:grid-cols-3">
        <div className="rounded-md border bg-background p-2 text-center">
          <Latex latex={`f(${fmt(x)}) = ${fmt(yx, 3)}`} />
        </div>
        <div className="rounded-md border bg-background p-2 text-center">
          <Latex latex={`f'(${fmt(x)}) = ${fmt(d1, 3)}`} />
        </div>
        <div className="rounded-md border bg-background p-2 text-center">
          <Latex latex={`f''(${fmt(x)}) = ${fmt(d2, 3)}`} />
        </div>
      </div>
      <p className="rounded-md border bg-background p-3 text-sm">{reading}</p>
      {markers.length > 0 && (
        <ul className="space-y-1 text-sm">
          {markers.map((m) => (
            <li key={`${m.kind}${m.x}`}>
              x = {fmt(m.x, 3)}: {markerLabel[m.kind]}, f = {fmt(f(m.x), 3)}
            </li>
          ))}
        </ul>
      )}
      {config.interval && table.length > 0 && (
        <div className="rounded-md border bg-background p-3">
          <p className="mb-1 text-center text-xs text-muted-foreground">
            Closed-interval method on [{fmt(config.interval.a)}, {fmt(config.interval.b)}]
          </p>
          <table className="w-full text-center text-sm tabular-nums">
            <thead>
              <tr className="text-muted-foreground">
                <th className="font-medium">candidate x</th>
                <th className="font-medium">why</th>
                <th className="font-medium">f(x)</th>
              </tr>
            </thead>
            <tbody>
              {table.map((r) => (
                <tr
                  key={`${r.note}${r.x}`}
                  className={
                    r.y === ymaxT ? "font-semibold text-callout-warning" : r.y === yminT ? "font-semibold text-callout-tip" : ""
                  }
                >
                  <td>{fmt(r.x, 3)}</td>
                  <td>{r.note}</td>
                  <td>
                    {fmt(r.y, 3)}
                    {r.y === ymaxT ? " (abs max)" : r.y === yminT ? " (abs min)" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION} />
      </p>
    </InteractiveFrame>
  );
}
