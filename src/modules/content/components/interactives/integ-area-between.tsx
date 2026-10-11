"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import { compileExpression } from "../../lib/math-eval";
import type { integAreaBetweenSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { fmt, type RealFn, signChanges, snap } from "./calc-shared";
import { FunctionPlot, makeScales, type Point } from "./function-plot";
import { clampY, simpson } from "./integ-shared";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof integAreaBetweenSchema>;

const CAPTION_X =
  "Slide the strip across the region. Its height is top minus bottom, f − g; adding up thin strips of height (f − g) and width dx is the integral. Where the curves cross, top and bottom swap, so split the integral there.";
const CAPTION_Y =
  "Here the strips are horizontal: each has length right minus left, f(y) − g(y), and width dy. Horizontal strips win when the region's left and right boundaries are single curves but its top and bottom are not.";

/** Compile an expression in one variable (x or y); errors give NaN. */
function fnOf(expr: string, variable: "x" | "y"): RealFn {
  let evaluate: (env: Record<string, number>) => number;
  try {
    evaluate = compileExpression(expr);
  } catch {
    return () => NaN;
  }
  return (t: number) => {
    try {
      const v = evaluate({ [variable]: t });
      return Number.isFinite(v) ? v : NaN;
    } catch {
      return NaN;
    }
  };
}

export function IntegAreaBetween({ config }: { config: Config }) {
  const { window: win, a, b, variable } = config;
  const stripStep = (b - a) / 100;
  const [s, setS] = useState(config.strip ?? snap(a + (b - a) / 2, a, stripStep));

  const f = useMemo(() => fnOf(config.f, variable), [config.f, variable]);
  const g = useMemo(() => fnOf(config.g, variable), [config.g, variable]);

  const analysis = useMemo(() => {
    const h: RealFn = (t) => f(t) - g(t);
    const lo = variable === "x" ? win.xmin : win.ymin;
    const hi = variable === "x" ? win.xmax : win.ymax;
    const crossings = signChanges(h, lo, hi, 800)
      .filter((p) => p.zero)
      .map((p) => p.x);
    // Only genuine sign changes split the region; a touching zero (|x² − 1| at ±1) does not.
    const delta = (b - a) / 2000;
    const inside = crossings.filter(
      (c) => c > a + 1e-6 && c < b - 1e-6 && h(c - delta) * h(c + delta) < 0,
    );
    const cuts = [a, ...inside, b];
    const pieces = cuts.slice(0, -1).map((lo2, i) => {
      const hi2 = cuts[i + 1];
      const value = simpson(h, lo2, hi2, 600);
      return { lo: lo2, hi: hi2, value, positive: h((lo2 + hi2) / 2) >= 0 };
    });
    const signed = pieces.reduce((acc, p) => acc + p.value, 0);
    const area = pieces.reduce((acc, p) => acc + Math.abs(p.value), 0);
    return { crossings, inside, pieces, signed, area };
  }, [f, g, a, b, variable, win.xmin, win.xmax, win.ymin, win.ymax]);

  const scales = makeScales(win);
  /** Map (strip variable t, curve value v) to SVG coordinates. */
  const toSvg = (t: number, v: number) =>
    variable === "x"
      ? { X: scales.sx(t), Y: scales.sy(clampY(v, win.ymin, win.ymax)) }
      : { X: scales.sx(clampY(v, win.xmin, win.xmax)), Y: scales.sy(t) };

  const piecePath = (lo: number, hi: number) => {
    const samples = 120;
    const forward: string[] = [];
    const back: string[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = lo + ((hi - lo) * i) / samples;
      const fv = f(t);
      const gv = g(t);
      if (!Number.isFinite(fv) || !Number.isFinite(gv)) continue;
      const p = toSvg(t, fv);
      const q = toSvg(t, gv);
      forward.push(`${p.X.toFixed(2)} ${p.Y.toFixed(2)}`);
      back.unshift(`${q.X.toFixed(2)} ${q.Y.toFixed(2)}`);
    }
    if (forward.length < 2) return "";
    return `M ${forward.join(" L ")} L ${back.join(" L ")} Z`;
  };

  /** A curve x = c(y) drawn by sampling y across the window. */
  const sidewaysPath = (c: RealFn) => {
    const samples = 240;
    let d = "";
    let pen = false;
    for (let i = 0; i <= samples; i++) {
      const y = win.ymin + ((win.ymax - win.ymin) * i) / samples;
      const x = c(y);
      if (!Number.isFinite(x) || x < win.xmin - (win.xmax - win.xmin) || x > win.xmax + (win.xmax - win.xmin)) {
        pen = false;
        continue;
      }
      d += `${pen ? " L" : " M"} ${scales.sx(x).toFixed(2)} ${scales.sy(y).toFixed(2)}`;
      pen = true;
    }
    return d;
  };

  const fs = f(s);
  const gs = g(s);
  const strip =
    Number.isFinite(fs) && Number.isFinite(gs) ? { from: toSvg(s, gs), to: toSvg(s, fs) } : null;

  const points: Point[] = analysis.crossings
    .map((c) => (variable === "x" ? { x: c, y: f(c) } : { x: f(c), y: c }))
    .filter(
      (p) =>
        Number.isFinite(p.x) &&
        Number.isFinite(p.y) &&
        p.x >= win.xmin &&
        p.x <= win.xmax &&
        p.y >= win.ymin &&
        p.y <= win.ymax,
    )
    .map((p) => ({ ...p, open: true, className: "stroke-callout-definition", label: `(${fmt(p.x)}, ${fmt(p.y)})` }));

  const v = variable;
  const aTex = config.aLatex ?? fmt(a, 3);
  const bTex = config.bLatex ?? fmt(b, 3);
  const lengthWord = v === "x" ? "Strip height (top − bottom)" : "Strip length (right − left)";

  return (
    <InteractiveFrame title={v === "x" ? "Area between curves: vertical strips" : "Area between curves: horizontal strips"}>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
        <Latex latex={`${v === "x" ? "y" : "x"} = f(${v}) = ${config.fLatex}`} />
        <Latex latex={`${v === "x" ? "y" : "x"} = g(${v}) = ${config.gLatex}`} />
      </div>
      <FunctionPlot
        window={win}
        curves={variable === "x" ? [{ expr: config.f }, { expr: config.g, className: "stroke-plot-secondary" }] : []}
        points={points}
      >
        {analysis.pieces.map((p, i) => (
          <path key={i} d={piecePath(p.lo, p.hi)} className={p.positive ? "fill-plot/20" : "fill-callout-warning/25"} />
        ))}
        {variable === "y" && (
          <>
            <path d={sidewaysPath(f)} fill="none" strokeWidth={2} className="stroke-plot" />
            <path d={sidewaysPath(g)} fill="none" strokeWidth={2} className="stroke-plot-secondary" />
          </>
        )}
        {strip && (
          <line
            x1={strip.from.X}
            y1={strip.from.Y}
            x2={strip.to.X}
            y2={strip.to.Y}
            strokeWidth={4}
            className="stroke-callout-tip"
          />
        )}
      </FunctionPlot>
      <SliderRow
        label={<Latex latex={`${v} \\text{ strip}`} />}
        value={s}
        min={a}
        max={b}
        step={stripStep}
        onChange={(val) => setS(snap(val, a, stripStep))}
      />
      <div className="grid gap-2 text-sm sm:grid-cols-3">
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">{lengthWord}</p>
          <Latex latex={`f(${fmt(s)}) - g(${fmt(s)}) = ${fmt(fs - gs, 3)}`} />
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Signed integral</p>
          <Latex latex={`\\int_{${aTex}}^{${bTex}} (f - g)\\,d${v} \\approx ${fmt(analysis.signed, 4)}`} />
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Area of the region</p>
          <Latex latex={`\\int_{${aTex}}^{${bTex}} |f - g|\\,d${v} \\approx ${fmt(analysis.area, 4)}`} />
        </div>
      </div>
      <p className="rounded-md border bg-background p-3 text-sm">
        {analysis.inside.length
          ? `The curves cross inside the interval at ${v} ≈ ${analysis.inside.map((c) => fmt(c, 3)).join(", ")}, so f − g changes sign: the signed integral (${fmt(analysis.signed, 3)}) is not the area (${fmt(analysis.area, 3)}). Split the integral at the crossings.`
          : analysis.crossings.length
            ? `The curves meet at ${v} ≈ ${analysis.crossings.map((c) => fmt(c, 3)).join(", ")}. They do not cross inside the interval, so the signed integral and the area agree up to sign.`
            : "The curves do not meet in this window, so f − g keeps one sign on the interval."}
      </p>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? (v === "x" ? CAPTION_X : CAPTION_Y)} />
      </p>
    </InteractiveFrame>
  );
}
