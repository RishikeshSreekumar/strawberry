"use client";

import { useState } from "react";
import type { z } from "zod";
import type { linearSystemLinesSchema } from "../../schemas/blocks";
import { FunctionPlot, formatNumber, makeScales } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof linearSystemLinesSchema>;
type Line = { a: number; b: number; c: number };
type Coef = Config["adjustable"][number];

const EPS = 1e-9;
const fmt = (v: number) => {
  const s = formatNumber(Math.abs(v) < 5e-4 ? 0 : v, 2);
  return s === "-0" ? "0" : s;
};
const paren = (v: number) => (v < -EPS ? `(${fmt(v)})` : fmt(v));

/** 2x - 3y = 4, dropping zero terms and unit coefficients. */
function eqLatex(l: Line): string {
  const term = (k: number, v: string, first: boolean) => {
    if (Math.abs(k) < EPS) return "";
    const abs = Math.abs(k);
    const coef = Math.abs(abs - 1) < EPS ? "" : fmt(abs);
    if (first) return `${k < 0 ? "-" : ""}${coef}${v}`;
    return ` ${k < 0 ? "-" : "+"} ${coef}${v}`;
  };
  let lhs = term(l.a, "x", true);
  lhs += term(l.b, "y", lhs === "");
  if (lhs === "") lhs = "0";
  return `${lhs} = ${fmt(l.c)}`;
}

const det2 = (p: number, q: number, r: number, s: number) => p * s - q * r;

type Status =
  | { kind: "unique"; x: number; y: number }
  | { kind: "none"; reason: string }
  | { kind: "infinite"; reason: string };

function solve(l1: Line, l2: Line): Status {
  const D = det2(l1.a, l1.b, l2.a, l2.b);
  const Dx = det2(l1.c, l1.b, l2.c, l2.b);
  const Dy = det2(l1.a, l1.c, l2.a, l2.c);
  if (Math.abs(D) > EPS) return { kind: "unique", x: Dx / D, y: Dy / D };
  const empty = (l: Line) => Math.abs(l.a) < EPS && Math.abs(l.b) < EPS;
  // An equation 0x + 0y = c: impossible if c != 0, no restriction if c = 0.
  if ((empty(l1) && Math.abs(l1.c) > EPS) || (empty(l2) && Math.abs(l2.c) > EPS)) {
    return { kind: "none", reason: "One equation reads 0 = (non-zero): nothing satisfies it." };
  }
  if (empty(l1) && empty(l2)) return { kind: "infinite", reason: "Both equations read 0 = 0: every point of the plane works." };
  if (empty(l1) || empty(l2)) return { kind: "infinite", reason: "One equation reads 0 = 0, so every point of the other line works." };
  if (Math.abs(Dx) > EPS || Math.abs(Dy) > EPS) {
    return { kind: "none", reason: "Same slope, different lines: parallel lines never meet." };
  }
  return { kind: "infinite", reason: "One equation is a multiple of the other: the same line twice, so every point on it is a solution." };
}

/** Endpoints of the line ax + by = c far outside the window (the SVG clips). */
function lineEnds(l: Line, far: number): [number, number, number, number] | null {
  const n2 = l.a * l.a + l.b * l.b;
  if (n2 < EPS) return null;
  const px = (l.a * l.c) / n2;
  const py = (l.b * l.c) / n2;
  const len = Math.sqrt(n2);
  const dx = -l.b / len;
  const dy = l.a / len;
  return [px - dx * far, py - dy * far, px + dx * far, py + dy * far];
}

const COEF_LABEL: Record<Coef, string> = {
  a1: "a_1",
  b1: "b_1",
  c1: "c_1",
  a2: "a_2",
  b2: "b_2",
  c2: "c_2",
};

export function LinearSystemLines({ config }: { config: Config }) {
  const [l1, setL1] = useState<Line>(config.line1);
  const [l2, setL2] = useState<Line>(config.line2);
  const win = config.window;
  const { sx, sy } = makeScales(win);

  const get = (k: Coef) => (k[1] === "1" ? l1 : l2)[k[0] as "a" | "b" | "c"];
  const set = (k: Coef, v: number) => {
    const key = k[0] as "a" | "b" | "c";
    if (k[1] === "1") setL1((l) => ({ ...l, [key]: v }));
    else setL2((l) => ({ ...l, [key]: v }));
  };

  const D = det2(l1.a, l1.b, l2.a, l2.b);
  const Dx = det2(l1.c, l1.b, l2.c, l2.b);
  const Dy = det2(l1.a, l1.c, l2.a, l2.c);
  const status = solve(l1, l2);
  const far = 4 * Math.max(win.xmax - win.xmin, win.ymax - win.ymin) + Math.abs(l1.c) + Math.abs(l2.c);
  const e1 = lineEnds(l1, far);
  const e2 = lineEnds(l2, far);
  const coincident = status.kind === "infinite" && e1 && e2;
  const inView =
    status.kind === "unique" &&
    status.x >= win.xmin &&
    status.x <= win.xmax &&
    status.y >= win.ymin &&
    status.y <= win.ymax;

  const badge =
    status.kind === "unique"
      ? { text: "Unique solution", cls: "border-callout-tip bg-callout-tip/10 text-callout-tip" }
      : status.kind === "none"
        ? { text: "No solution (inconsistent)", cls: "border-callout-warning bg-callout-warning/10 text-callout-warning" }
        : { text: "Infinitely many solutions", cls: "border-callout-info bg-callout-info/10 text-callout-info" };

  const clampX = (v: number) => Math.min(Math.max(v, 16), 384);
  const clampY = (v: number) => Math.min(Math.max(v, 12), 288);

  return (
    <InteractiveFrame title="Two equations, two lines">
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1 w-5 shrink-0 rounded bg-primary" aria-hidden />
          <Latex latex={eqLatex(l1)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-1 w-5 shrink-0 rounded bg-callout-info" aria-hidden />
          <Latex latex={eqLatex(l2)} />
        </div>
      </div>

      <div className="flex justify-center">
        <FunctionPlot window={win}>
          {e1 && (
            <line
              x1={sx(e1[0])}
              y1={sy(e1[1])}
              x2={sx(e1[2])}
              y2={sy(e1[3])}
              className="stroke-primary"
              strokeWidth={coincident ? 5 : 2.5}
              strokeOpacity={coincident ? 0.45 : 1}
            />
          )}
          {e2 && (
            <line
              x1={sx(e2[0])}
              y1={sy(e2[1])}
              x2={sx(e2[2])}
              y2={sy(e2[3])}
              className="stroke-callout-info"
              strokeWidth={2.5}
              strokeDasharray={coincident ? "8 6" : undefined}
            />
          )}
          {status.kind === "unique" && inView && (
            <g>
              <circle cx={sx(status.x)} cy={sy(status.y)} r={5.5} className="fill-callout-tip stroke-background" strokeWidth={2} />
              <text
                x={clampX(sx(status.x) + 8)}
                y={clampY(sy(status.y) - 9)}
                textAnchor={sx(status.x) > 300 ? "end" : "start"}
                className="fill-foreground text-[11px] font-medium"
              >
                ({fmt(status.x)}, {fmt(status.y)})
              </text>
            </g>
          )}
        </FunctionPlot>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.cls}`} role="status">
          {badge.text}
        </span>
        {status.kind === "unique" && !inView && (
          <span className="text-xs text-muted-foreground">
            They meet at ({fmt(status.x)}, {fmt(status.y)}), outside this view.
          </span>
        )}
      </div>
      {status.kind !== "unique" && <p className="text-sm text-muted-foreground">{status.reason}</p>}

      {config.showCramer && (
        <div className="space-y-1.5 overflow-x-auto rounded-md border bg-background p-3 text-sm">
          <Latex
            latex={`D = \\begin{vmatrix} ${fmt(l1.a)} & ${fmt(l1.b)} \\\\ ${fmt(l2.a)} & ${fmt(l2.b)} \\end{vmatrix} = ${paren(l1.a)}${paren(l2.b)} - ${paren(l1.b)}${paren(l2.a)} = ${fmt(D)}`}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            <Latex
              latex={`D_x = \\begin{vmatrix} ${fmt(l1.c)} & ${fmt(l1.b)} \\\\ ${fmt(l2.c)} & ${fmt(l2.b)} \\end{vmatrix} = ${fmt(Dx)}`}
            />
            <Latex
              latex={`D_y = \\begin{vmatrix} ${fmt(l1.a)} & ${fmt(l1.c)} \\\\ ${fmt(l2.a)} & ${fmt(l2.c)} \\end{vmatrix} = ${fmt(Dy)}`}
            />
          </div>
          <div>
            {status.kind === "unique" ? (
              <Latex
                latex={`x = \\frac{D_x}{D} = \\frac{${fmt(Dx)}}{${fmt(D)}} = ${fmt(status.x)}, \\quad y = \\frac{D_y}{D} = \\frac{${fmt(Dy)}}{${fmt(D)}} = ${fmt(status.y)}`}
              />
            ) : (
              <span className="text-muted-foreground">
                <Latex latex="D = 0" />: Cramer&apos;s rule can&apos;t divide by it — the lines have the same slope.{" "}
                {Math.abs(Dx) > EPS || Math.abs(Dy) > EPS ? (
                  <>
                    Here <Latex latex="D_x" /> or <Latex latex="D_y" /> is non-zero, so there is no solution.
                  </>
                ) : (
                  <>
                    Here <Latex latex="D_x = D_y = 0" /> too — check the equations themselves to decide.
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      )}

      {config.adjustable.length > 0 && (
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {config.adjustable.map((k) => (
            <SliderRow
              key={k}
              label={<Latex latex={COEF_LABEL[k]} />}
              value={get(k)}
              min={config.sliderMin}
              max={config.sliderMax}
              step={config.step}
              onChange={(v) => set(k, v)}
            />
          ))}
        </div>
      )}

      {config.presets && config.presets.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Preset systems">
          {config.presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setL1(p.line1);
                setL2(p.line2);
              }}
              className="rounded-md border bg-background px-2.5 py-1 text-xs"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {config.caption ??
            "Each equation is a line; a solution is a point on both. Move the coefficients: the lines cross once, run parallel, or lie on top of each other."}
        </p>
        <button
          type="button"
          onClick={() => {
            setL1(config.line1);
            setL2(config.line2);
          }}
          className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs"
        >
          Reset
        </button>
      </div>
    </InteractiveFrame>
  );
}
