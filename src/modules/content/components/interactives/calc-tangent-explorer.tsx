"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import type { calcTangentExplorerSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { fmt, numericDerivative, safeFn, signChanges, snap, tangentAt } from "./calc-shared";
import { FunctionPlot, type Point, type Segment } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof calcTangentExplorerSchema>;

const DEFAULT_CAPTION =
  "Drag x₀ along the curve. The tangent's slope is f′(x₀); where the left and right slopes disagree the curve has a corner and no derivative.";

/** A line through (x0, y0) with slope m, clipped to the window's x-range. */
function lineThrough(
  x0: number,
  y0: number,
  m: number,
  from: number,
  to: number,
  className: string,
): Segment[] {
  if (![x0, y0, m, from, to].every(Number.isFinite)) return [];
  return [{ x1: from, y1: y0 + m * (from - x0), x2: to, y2: y0 + m * (to - x0), className }];
}

/** Signed, tidy LaTeX for "y = m(x - x0) + y0". */
function tangentLatex(m: number, x0: number, y0: number): string {
  const c = y0 - m * x0;
  const mPart = Math.abs(m) < 5e-4 ? "" : `${fmt(m, 3)}x`;
  const cPart =
    Math.abs(c) < 5e-4 ? "" : `${mPart && c > 0 ? " + " : c < 0 ? (mPart ? " - " : "-") : ""}${fmt(Math.abs(c), 3)}`;
  return `y = ${mPart}${cPart}` + (mPart || cPart ? "" : "0");
}

export function CalcTangentExplorer({ config }: { config: Config }) {
  const [x0, setX0] = useState(config.x0.initial);
  const [h, setH] = useState(config.secant?.initial ?? 0.5);
  const { window: win } = config;

  const f = useMemo(() => safeFn(config.expr, config.excluded), [config.expr, config.excluded]);
  const fp = useMemo(
    () => (config.derivExpr ? safeFn(config.derivExpr, config.excluded) : numericDerivative(f)),
    [config.derivExpr, config.excluded, f],
  );

  const y0 = f(x0);
  const t = tangentAt(f, x0);
  const span = win.xmax - win.xmin;

  const segments: Segment[] = [];
  if (t.kind === "smooth") {
    segments.push(...lineThrough(x0, y0, t.slope, win.xmin, win.xmax, "stroke-callout-tip"));
  } else if (t.kind === "corner") {
    segments.push(...lineThrough(x0, y0, t.left, Math.max(win.xmin, x0 - span / 3), x0, "stroke-callout-tip"));
    segments.push(...lineThrough(x0, y0, t.right, x0, Math.min(win.xmax, x0 + span / 3), "stroke-callout-definition"));
  } else if (t.kind === "vertical" && Number.isFinite(y0)) {
    segments.push({ x1: x0, y1: win.ymin, x2: x0, y2: win.ymax, className: "stroke-callout-tip" });
  }

  // Secant through x0 and x0 + h.
  const secant = config.secant;
  const x1 = x0 + h;
  const y1 = f(x1);
  const secantSlope = secant && Math.abs(h) > 1e-12 ? (y1 - y0) / h : NaN;
  if (secant && Number.isFinite(secantSlope)) {
    segments.push(...lineThrough(x0, y0, secantSlope, win.xmin, win.xmax, "stroke-callout-warning"));
  }

  // Mean value theorem chord.
  const chord = config.chord;
  const chordData = useMemo(() => {
    if (!chord) return null;
    const fa = f(chord.a);
    const fb = f(chord.b);
    const m = (fb - fa) / (chord.b - chord.a);
    if (!Number.isFinite(m)) return { fa, fb, m, cs: [] as number[] };
    const cs = signChanges((x) => fp(x) - m, chord.a, chord.b, 800)
      .filter((p) => p.zero && p.x > chord.a + 1e-6 && p.x < chord.b - 1e-6)
      .map((p) => p.x);
    return { fa, fb, m, cs };
  }, [chord, f, fp]);
  const chordPoints: Point[] = [];
  if (chord && chordData && Number.isFinite(chordData.fa) && Number.isFinite(chordData.fb)) {
    segments.push({
      x1: chord.a,
      y1: chordData.fa,
      x2: chord.b,
      y2: chordData.fb,
      className: "stroke-callout-warning",
    });
    chordPoints.push(
      { x: chord.a, y: chordData.fa, className: "fill-callout-warning stroke-callout-warning", label: "a" },
      { x: chord.b, y: chordData.fb, className: "fill-callout-warning stroke-callout-warning", label: "b" },
    );
    for (const c of chordData.cs) {
      const fc = f(c);
      if (!Number.isFinite(fc)) continue;
      chordPoints.push({ x: c, y: fc, open: true, className: "stroke-callout-definition", label: `c ≈ ${fmt(c)}` });
    }
  }

  const inView = (p: Point) =>
    Number.isFinite(p.x) && Number.isFinite(p.y) && p.y >= win.ymin && p.y <= win.ymax && p.x >= win.xmin && p.x <= win.xmax;
  const points: Point[] = [
    ...chordPoints,
    ...(secant && Number.isFinite(y1)
      ? [{ x: x1, y: y1, className: "fill-callout-warning stroke-callout-warning", label: "x₀ + h" }]
      : []),
    ...(Number.isFinite(y0) ? [{ x: x0, y: y0, label: `x₀ = ${fmt(x0)}` }] : []),
  ].filter(inView);

  // Derivative panel.
  const derivWin = config.derivWindow
    ? { xmin: win.xmin, xmax: win.xmax, ymin: config.derivWindow.ymin, ymax: config.derivWindow.ymax }
    : { xmin: win.xmin, xmax: win.xmax, ymin: win.ymin, ymax: win.ymax };
  const slopeHere = t.kind === "smooth" ? t.slope : NaN;
  const derivPoints: Point[] =
    Number.isFinite(slopeHere) && slopeHere >= derivWin.ymin && slopeHere <= derivWin.ymax
      ? [{ x: x0, y: slopeHere, className: "fill-callout-tip stroke-callout-tip", label: `f′(x₀) = ${fmt(slopeHere)}` }]
      : [];

  let verdict: React.ReactNode;
  if (t.kind === "undefined") {
    verdict = <span>f is not defined at x₀ = {fmt(x0)}, so there is nothing to differentiate.</span>;
  } else if (t.kind === "corner") {
    verdict = (
      <span>
        <strong>Corner.</strong> Left slope ≈ {fmt(t.left, 3)}, right slope ≈ {fmt(t.right, 3)}. LHD ≠ RHD, so f is
        not differentiable at x₀ (though it is continuous here).
      </span>
    );
  } else if (t.kind === "vertical") {
    verdict = (
      <span>
        <strong>Vertical tangent / cusp.</strong> The difference quotients grow without bound as h → 0, so f′(x₀) does
        not exist as a number.
      </span>
    );
  } else {
    verdict = (
      <span>
        LHD ≈ {fmt(t.left, 3)} and RHD ≈ {fmt(t.right, 3)} agree, so f′(x₀) ≈ {fmt(t.slope, 3)}.
      </span>
    );
  }

  return (
    <InteractiveFrame title="Tangent explorer">
      <div className="text-center">
        <Latex latex={`f(x) = ${config.exprLatex}`} display />
      </div>
      <FunctionPlot window={win} curves={[{ expr: config.expr, excluded: config.excluded }]} segments={segments} points={points} />
      <SliderRow
        label={<Latex latex="x_0" />}
        value={x0}
        min={config.x0.min}
        max={config.x0.max}
        step={config.x0.step}
        onChange={(v) => setX0(snap(v, config.x0.min, config.x0.step))}
      />
      {secant && (
        <SliderRow
          label={<Latex latex="h" />}
          value={h}
          min={secant.min}
          max={secant.max}
          step={secant.step}
          onChange={(v) => setH(snap(v, secant.min, secant.step))}
        />
      )}
      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Point</p>
          <Latex latex={`f(${fmt(x0)}) = ${fmt(y0, 3)}`} />
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Tangent line</p>
          {t.kind === "smooth" && Number.isFinite(y0) ? (
            <Latex latex={tangentLatex(t.slope, x0, y0)} />
          ) : t.kind === "vertical" ? (
            <Latex latex={`x = ${fmt(x0)}`} />
          ) : (
            <span className="text-muted-foreground">no single tangent</span>
          )}
        </div>
        {secant && (
          <div className="rounded-md border bg-background p-3 text-center sm:col-span-2">
            <p className="mb-1 text-xs text-muted-foreground">Secant slope (orange)</p>
            <Latex
              latex={
                Number.isFinite(secantSlope)
                  ? `\\frac{f(x_0 + h) - f(x_0)}{h} = ${fmt(secantSlope, 4)}`
                  : "h = 0 \\text{ gives } \\tfrac{0}{0}"
              }
            />
          </div>
        )}
        {chord && chordData && (
          <div className="rounded-md border bg-background p-3 text-center sm:col-span-2">
            <p className="mb-1 text-xs text-muted-foreground">Chord from a to b</p>
            <Latex
              latex={`\\frac{f(${fmt(chord.b)}) - f(${fmt(chord.a)})}{${fmt(chord.b)} - (${fmt(chord.a)})} = ${fmt(chordData.m, 3)}`}
            />
            <p className="mt-1 text-xs">
              {chordData.cs.length
                ? `Tangent parallel to the chord at c ≈ ${chordData.cs.map((c) => fmt(c, 3)).join(", ")}.`
                : "No interior point has a tangent parallel to the chord: check the theorem's conditions."}
              {t.kind === "smooth" && Number.isFinite(chordData.m) && Math.abs(t.slope - chordData.m) < 0.02
                ? " Your tangent is parallel to the chord right now."
                : ""}
            </p>
          </div>
        )}
      </div>
      <p className="rounded-md border bg-background p-3 text-sm">{verdict}</p>
      {config.showDerivative && config.derivExpr && (
        <div className="space-y-1">
          <div className="text-center text-sm">
            <Latex latex={`f'(x) = ${config.derivLatex ?? "\\text{slope of } f"}`} />
          </div>
          <FunctionPlot
            window={derivWin}
            curves={[{ expr: config.derivExpr, excluded: config.excluded, className: "stroke-callout-tip" }]}
            points={derivPoints}
          />
          <p className="text-center text-xs text-muted-foreground">
            Lower graph: the height of f′ at x₀ is the slope of the tangent above it.
          </p>
        </div>
      )}
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION} />
      </p>
    </InteractiveFrame>
  );
}
