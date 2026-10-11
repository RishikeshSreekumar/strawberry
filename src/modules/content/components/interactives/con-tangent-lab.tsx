"use client";

import { useState } from "react";
import type { z } from "zod";
import type { conTangentLabSchema, PlotWindow } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  conicAsymptotes,
  conicDirectrices,
  conicEccentricity,
  conicFoci,
  conicMatrix,
  conicPoint,
  conicValue,
  dist,
  latusRecta,
  lineConicIntersections,
  lineLatex,
  lineThrough,
  midpointChordLine,
  num,
  perpendicularThrough,
  polarLine,
  ptLatex,
  sampleConic,
  tidy,
  type ConicKind,
  type Line,
  type P,
} from "./con-geometry";
import { ConCanvas, ConCircle, ConDot, ConLabel, ConLine, ConPath, ConReadout, ConSegment } from "./con-plane";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof conTangentLabSchema>;
type Range = { min: number; max: number; step: number; initial: number };

const DEFAULTS: Record<ConicKind, { a: Range; b: Range; t: Range; window: PlotWindow }> = {
  parabola: {
    a: { min: 0.5, max: 3, step: 0.25, initial: 1 },
    b: { min: 0.5, max: 3, step: 0.25, initial: 1 },
    t: { min: -3, max: 3, step: 0.1, initial: 1 },
    window: { xmin: -4, xmax: 8, ymin: -6, ymax: 6 },
  },
  ellipse: {
    a: { min: 1, max: 6, step: 0.5, initial: 4 },
    b: { min: 1, max: 5, step: 0.5, initial: 2.5 },
    t: { min: -180, max: 180, step: 5, initial: 50 },
    window: { xmin: -7, xmax: 7, ymin: -5, ymax: 5 },
  },
  hyperbola: {
    a: { min: 0.5, max: 4, step: 0.5, initial: 2 },
    b: { min: 0.5, max: 4, step: 0.5, initial: 1.5 },
    t: { min: -180, max: 180, step: 5, initial: 30 },
    window: { xmin: -8, xmax: 8, ymin: -6, ymax: 6 },
  },
  rectangular: {
    a: { min: 0.5, max: 4, step: 0.5, initial: 2 },
    b: { min: 0.5, max: 4, step: 0.5, initial: 2 },
    t: { min: -4, max: 4, step: 0.1, initial: 1 },
    window: { xmin: -7, xmax: 7, ymin: -6, ymax: 6 },
  },
};

const TITLE: Record<ConicKind, string> = {
  parabola: "Parabola lab",
  ellipse: "Ellipse lab",
  hyperbola: "Hyperbola lab",
  rectangular: "Rectangular hyperbola lab",
};

const DEFAULT_CAPTION: Record<ConicKind, string> = {
  parabola:
    "Slide t to move P = (at², 2at). The tangent at P is the polar of P (T = 0) and the normal is perpendicular to it; watch where the normal meets the parabola again.",
  ellipse:
    "Slide the eccentric angle θ to move P = (a cos θ, b sin θ) and watch the tangent T = 0 and the normal turn with it.",
  hyperbola:
    "Slide θ to move P = (a sec θ, b tan θ) along both branches. Far out, the tangent at P is almost an asymptote.",
  rectangular: "Slide t to move P = (ct, c/t) on xy = c². The asymptotes are the coordinate axes.",
};

function equationLatex(kind: ConicKind, a: number, b: number): string {
  switch (kind) {
    case "parabola":
      return `y^2 = ${num(4 * a)}x`;
    case "ellipse":
      return `\\frac{x^2}{${num(a * a)}} + \\frac{y^2}{${num(b * b)}} = 1`;
    case "hyperbola":
      return `\\frac{x^2}{${num(a * a)}} - \\frac{y^2}{${num(b * b)}} = 1`;
    case "rectangular":
      return `xy = ${num(a * a)}`;
  }
}

function paramLatex(kind: ConicKind, t: number): string {
  if (kind === "parabola" || kind === "rectangular") return `t = ${num(t)}`;
  return `\\theta = ${num(t)}^\\circ`;
}

const far = (pts: P[], from: P) => pts.filter((p) => dist(p, from) > 1e-6);

export function ConTangentLab({ config }: { config: Config }) {
  const kind = config.conic;
  const def = DEFAULTS[kind];
  const aR = config.a ?? def.a;
  const bR = config.b ?? def.b;
  const tR = config.t ?? def.t;
  const win = config.window ?? def.window;
  const usesB = kind === "ellipse" || kind === "hyperbola";
  const sliders = config.sliders ?? (usesB ? ["a", "b", "t"] : ["a", "t"]);

  const [a, setA] = useState(aR.initial);
  const [bState, setB] = useState(bR.initial);
  const [t, setT] = useState(tR.initial);
  const [q, setQ] = useState<P | null>(config.q ? [config.q[0], config.q[1]] : null);
  const b = usesB ? bState : a;

  const show = new Set(config.show);
  const M = conicMatrix(kind, a, b);
  const e = conicEccentricity(kind, a, b);
  const foci = conicFoci(kind, a, b);
  const directrices = conicDirectrices(kind, a, b);
  const span = Math.max(win.xmax - win.xmin, win.ymax - win.ymin);
  const curve = sampleConic(kind, a, b, span);
  const P = conicPoint(kind, a, b, t);

  const tangent: Line | null = P ? polarLine(M, P) : null;
  const normal: Line | null = P && tangent ? perpendicularThrough(tangent, P) : null;
  const normalAgain = P && normal ? far(lineConicIntersections(M, normal), P) : [];
  const S = foci[0];
  const focalLine = P && S ? lineThrough(P, S) : null;
  const focalOther = P && focalLine ? far(lineConicIntersections(M, focalLine), P) : [];

  // Q: chord of contact, pair of tangents, midpoint chord.
  const S1 = q ? conicValue(M, q) : 0;
  const onCurve = q !== null && Math.abs(S1) < 1e-6;
  const validLine = (L: Line) => Math.hypot(L[0], L[1]) > 1e-9;
  const polarRaw: Line | null = q ? polarLine(M, q) : null;
  const polarQ: Line | null = polarRaw && validLine(polarRaw) ? polarRaw : null;
  const contacts = q && polarQ && !onCurve ? lineConicIntersections(M, polarQ) : [];
  const tangentCount = q === null ? 0 : onCurve ? 1 : contacts.length;
  const midRaw: Line | null = q && !onCurve ? midpointChordLine(M, q) : null;
  const midLine: Line | null = midRaw && validLine(midRaw) ? midRaw : null;
  const atCentre = q !== null && !onCurve && !polarQ;
  const midHits = midLine ? lineConicIntersections(M, midLine) : [];

  const director: { kind: "circle"; r: number } | { kind: "line"; L: Line } | null =
    kind === "parabola"
      ? { kind: "line", L: [1, 0, a] }
      : kind === "ellipse"
        ? { kind: "circle", r: Math.sqrt(a * a + b * b) }
        : kind === "hyperbola" && a > b + 1e-9
          ? { kind: "circle", r: Math.sqrt(a * a - b * b) }
          : null;

  const auxiliary: { kind: "circle"; r: number } | { kind: "line"; L: Line } | null =
    kind === "parabola"
      ? { kind: "line", L: [1, 0, 0] }
      : kind === "ellipse"
        ? { kind: "circle", r: Math.max(a, b) }
        : kind === "hyperbola"
          ? { kind: "circle", r: a }
          : null;

  const qName = "Q";
  const position =
    q === null
      ? ""
      : onCurve
        ? "Q is on the curve: one tangent, the tangent at Q."
        : tangentCount === 2
          ? "Two tangents can be drawn from Q."
          : tangentCount === 1
            ? "Exactly one tangent from Q (Q lies on an asymptote direction)."
            : "No tangent can be drawn from Q.";

  return (
    <InteractiveFrame title={TITLE[kind]}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-3">
          <ConCanvas
            win={win}
            snap={config.snap}
            handles={q ? [{ id: "q", pos: q, color: "aux", name: "point Q" }] : []}
            onMove={(_, p) => setQ(p)}
            ariaLabel={`${TITLE[kind]}: the conic with a point P, its tangent and normal`}
          >
            {(s) => (
              <>
                {show.has("asymptotes") &&
                  conicAsymptotes(kind, a, b).map((L, i) => <ConLine key={`as${i}`} s={s} L={L} color="muted" dashed width={1.2} />)}
                {show.has("directrix") &&
                  directrices.map((L, i) => <ConLine key={`dx${i}`} s={s} L={L} color="aux" dashed width={1.3} />)}
                {show.has("auxiliary-circle") &&
                  auxiliary &&
                  (auxiliary.kind === "circle" ? (
                    <ConCircle s={s} centre={[0, 0]} r={auxiliary.r} color="muted" dashed />
                  ) : (
                    <ConLine s={s} L={auxiliary.L} color="muted" dashed width={1.2} />
                  ))}
                {show.has("director-circle") &&
                  director &&
                  (director.kind === "circle" ? (
                    <ConCircle s={s} centre={[0, 0]} r={director.r} color="result" dashed />
                  ) : (
                    <ConLine s={s} L={director.L} color="result" dashed width={1.3} />
                  ))}
                {curve.map((pts, i) => (
                  <ConPath key={`c${i}`} s={s} pts={pts} color="a" closed={kind === "ellipse"} />
                ))}
                {show.has("latus-rectum") &&
                  latusRecta(kind, a, b).map(([p1, p2], i) => <ConSegment key={`lr${i}`} s={s} p={p1} q={p2} color="result" width={1.6} />)}
                {(show.has("focus") || show.has("focal-radii") || show.has("focal-chord")) &&
                  foci.map((f, i) => (
                    <g key={`f${i}`}>
                      <ConDot s={s} p={f} color="b" r={4} />
                      <ConLabel s={s} p={f} latex={i === 0 ? "S" : "S'"} dx={10} dy={12} className="text-callout-info" />
                    </g>
                  ))}
                {P && show.has("focal-radii") &&
                  foci.map((f, i) => <ConSegment key={`fr${i}`} s={s} p={P} q={f} color="b" width={1.4} dashed={i === 1} />)}
                {P && show.has("focal-chord") && focalOther.length > 0 && (
                  <>
                    <ConSegment s={s} p={P} q={focalOther[0]} color="b" width={1.6} />
                    <ConDot s={s} p={focalOther[0]} color="b" r={3.5} hollow />
                  </>
                )}
                {tangent && show.has("tangent") && <ConLine s={s} L={tangent} color="c" />}
                {normal && show.has("normal") && <ConLine s={s} L={normal} color="result" />}
                {show.has("normal") && normalAgain.length > 0 && <ConDot s={s} p={normalAgain[0]} color="result" r={3.5} hollow />}
                {q && polarQ && show.has("chord-of-contact") && !onCurve && <ConLine s={s} L={polarQ} color="aux" width={1.4} />}
                {q && show.has("pair-of-tangents") &&
                  contacts.map((c, i) => {
                    const L = lineThrough(q, c);
                    return L ? <ConLine key={`pt${i}`} s={s} L={L} color="aux" dashed width={1.3} /> : null;
                  })}
                {q && (show.has("pair-of-tangents") || show.has("chord-of-contact")) &&
                  contacts.map((c, i) => <ConDot key={`ct${i}`} s={s} p={c} color="aux" r={3.5} />)}
                {q && show.has("midpoint-chord") && midHits.length === 2 && (
                  <ConSegment s={s} p={midHits[0]} q={midHits[1]} color="c" width={1.6} dashed />
                )}
                {P && (
                  <>
                    <ConDot s={s} p={P} color="c" r={5} />
                    <ConLabel s={s} p={P} latex="P" className="text-callout-definition" />
                  </>
                )}
                {q && <ConLabel s={s} p={q} latex={qName} dx={-12} dy={-12} className="text-callout-warning" />}
              </>
            )}
          </ConCanvas>
          {sliders.includes("a") && (
            <SliderRow
              label={<Latex latex={kind === "rectangular" ? "c" : "a"} />}
              value={a}
              min={aR.min}
              max={aR.max}
              step={aR.step}
              onChange={setA}
            />
          )}
          {usesB && sliders.includes("b") && (
            <SliderRow label={<Latex latex="b" />} value={bState} min={bR.min} max={bR.max} step={bR.step} onChange={setB} />
          )}
          {sliders.includes("t") && (
            <SliderRow
              label={<Latex latex={kind === "parabola" || kind === "rectangular" ? "t" : "\\theta"} />}
              value={t}
              min={tR.min}
              max={tR.max}
              step={tR.step}
              onChange={setT}
              unit={kind === "parabola" || kind === "rectangular" ? undefined : "°"}
            />
          )}
        </div>
        <div className="w-full space-y-2 text-sm sm:w-64">
          <div className="rounded-md border bg-background p-3 text-center">
            <Latex latex={equationLatex(kind, a, b)} />
            <p className="mt-1 text-xs text-muted-foreground">
              <Latex latex={`e = ${num(e)}`} />
            </p>
          </div>
          <div className="space-y-1 rounded-md border bg-background p-3">
            <ConReadout label="P">
              <Latex latex={P ? `${ptLatex(P)}` : "\\text{at infinity}"} />
            </ConReadout>
            <p className="text-right text-xs text-muted-foreground">
              <Latex latex={paramLatex(kind, t)} />
            </p>
            {tangent && (
              <ConReadout label="tangent">
                <Latex latex={lineLatex(tangent)} />
              </ConReadout>
            )}
            {normal && show.has("normal") && (
              <ConReadout label="normal">
                <Latex latex={lineLatex(normal)} />
              </ConReadout>
            )}
            {show.has("normal") && normalAgain.length > 0 && (
              <ConReadout label="meets again">
                <Latex latex={ptLatex(normalAgain[0])} />
              </ConReadout>
            )}
            {P && show.has("focal-radii") && (
              <>
                <ConReadout label="SP">
                  <Latex latex={num(dist(P, foci[0]))} />
                </ConReadout>
                {foci[1] && (
                  <>
                    <ConReadout label="S'P">
                      <Latex latex={num(dist(P, foci[1]))} />
                    </ConReadout>
                    <ConReadout label={kind === "ellipse" ? "SP + S'P" : "|SP − S'P|"}>
                      <Latex
                        latex={num(
                          kind === "ellipse"
                            ? dist(P, foci[0]) + dist(P, foci[1])
                            : Math.abs(dist(P, foci[0]) - dist(P, foci[1])),
                        )}
                      />
                    </ConReadout>
                  </>
                )}
                {kind === "parabola" && (
                  <ConReadout label="a + x">
                    <Latex latex={num(a + P[0])} />
                  </ConReadout>
                )}
              </>
            )}
            {P && show.has("focal-chord") && focalOther.length > 0 && (
              <ConReadout label="focal chord ends">
                <Latex latex={ptLatex(focalOther[0])} />
              </ConReadout>
            )}
            {!P && (
              <p className="text-center text-xs text-muted-foreground">
                This parameter gives no point on the curve: move the slider.
              </p>
            )}
          </div>
          {q && (
            <div className="space-y-1 rounded-md border bg-background p-3">
              <ConReadout label="Q">
                <Latex latex={ptLatex(q)} />
              </ConReadout>
              <ConReadout label={<Latex latex="S_1" />}>
                <Latex latex={String(tidy(S1, 3))} />
              </ConReadout>
              {show.has("chord-of-contact") && polarQ && !onCurve && (
                <ConReadout label="chord of contact">
                  <Latex latex={lineLatex(polarQ)} />
                </ConReadout>
              )}
              {atCentre && (
                <p className="text-center text-xs text-muted-foreground">
                  Q is the centre: it has no chord of contact, and every chord through it is bisected there.
                </p>
              )}
              {show.has("midpoint-chord") && midLine && (
                <ConReadout label="chord, midpoint Q">
                  <Latex latex={midHits.length === 2 ? lineLatex(midLine) : "\\text{none}"} />
                </ConReadout>
              )}
              <p className="text-center text-xs font-medium">{position}</p>
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION[kind]} />
      </p>
    </InteractiveFrame>
  );
}
