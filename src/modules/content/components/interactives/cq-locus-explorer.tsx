"use client";

import { useState } from "react";
import type { z } from "zod";
import type { cqLocusExplorerSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  cabs,
  cadd,
  carg,
  cdiv,
  cfromPolar,
  cmul,
  cscale,
  csub,
  cxLatex,
  numLatex,
  shiftLatex,
  tidy,
  type C,
} from "./cq-format";
import { arcPoints, PlaneCanvas, PlaneDot, PlanePath, ReadoutRow, type PlaneHandle, type PlaneScales } from "./cq-plane";
import { SvgLatex, type VecColor } from "./vec-canvas-2d";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof cqLocusExplorerSchema>;
type Locus = Config["locus"];
type HandleId = "a" | "b" | "p" | "probe";
type Range = { min: number; max: number; step: number; initial: number };

const DEFAULT_K: Record<Locus, Range | null> = {
  circle: { min: 0.5, max: 4, step: 0.5, initial: 2 },
  bisector: null,
  ellipse: { min: 2, max: 7, step: 0.5, initial: 4 },
  hyperbola: { min: -1.75, max: 1.75, step: 0.25, initial: 1 },
  apollonius: { min: 0.25, max: 3, step: 0.25, initial: 2 },
  arc: null,
};

const HANDLE_COLOR: Record<HandleId, VecColor> = { a: "a", b: "b", p: "c", probe: "aux" };
const HANDLE_NAME: Record<HandleId, string> = { a: "point a", b: "point b", p: "test point P", probe: "point q" };

const DEFAULT_CAPTION: Record<Locus, string> = {
  circle: "Every point at distance k from a: a circle. Drag P and watch |z − a| against k.",
  bisector: "Equal distances from a and b: the perpendicular bisector of the segment ab.",
  ellipse: "Distances to a and b that add up to k: an ellipse with foci a and b, provided k > |a − b|.",
  hyperbola: "A fixed difference of distances: one branch of a hyperbola with foci a and b, provided |k| < |a − b|.",
  apollonius: "A fixed ratio of distances k ≠ 1: the circle of Apollonius. At k = 1 it straightens into the bisector.",
  arc: "A fixed angle θ subtended by the segment ab: an arc of a circle through a and b.",
};

/** Sampled curve(s) of the locus; `closed` when the locus is a closed curve. */
type Curve = { pieces: C[][]; closed: boolean; message?: string };

function sampleLocus(locus: Locus, a: C, b: C, k: number, theta: number, diag: number): Curve {
  const d = cabs(csub(b, a));
  const m = cscale(0.5, cadd(a, b));
  const dir: C = d > 1e-9 ? cscale(1 / d, csub(b, a)) : [1, 0];
  const normal: C = [-dir[1], dir[0]];
  const local = (x: number, y: number): C => cadd(m, cadd(cscale(x, dir), cscale(y, normal)));
  const line = (): C[] => [local(0, -diag), local(0, diag)];

  if (locus === "circle") {
    if (k <= 0) return { pieces: [[a]], closed: false, message: "k = 0: the locus is the single point a." };
    return { pieces: [arcPoints(a, k, 0, 2 * Math.PI, 180)], closed: true };
  }
  if (locus === "bisector") {
    if (d < 1e-9) return { pieces: [], closed: false, message: "a = b: every point is equidistant." };
    return { pieces: [line()], closed: false };
  }
  if (locus === "ellipse") {
    if (k < d - 1e-9) return { pieces: [], closed: false, message: `No point: k must be at least |a − b| = ${tidy(d)}.` };
    if (k <= d + 1e-9) return { pieces: [[a, b]], closed: false, message: "k = |a − b|: the locus is the segment ab itself." };
    const A = k / 2;
    const B = Math.sqrt(A * A - (d / 2) ** 2);
    const pts: C[] = [];
    for (let i = 0; i <= 180; i++) {
      const t = (2 * Math.PI * i) / 180;
      pts.push(local(A * Math.cos(t), B * Math.sin(t)));
    }
    return { pieces: [pts], closed: true };
  }
  if (locus === "hyperbola") {
    if (d < 1e-9) return { pieces: [], closed: false, message: "a = b: the difference is always 0." };
    if (Math.abs(k) < 1e-9) return { pieces: [line()], closed: false, message: "k = 0: the branch flattens into the bisector." };
    if (Math.abs(k) >= d - 1e-9) {
      return {
        pieces: Math.abs(k) <= d + 1e-9 ? [k > 0 ? [b, local(d / 2 + diag, 0)] : [a, local(-d / 2 - diag, 0)]] : [],
        closed: false,
        message:
          Math.abs(k) <= d + 1e-9
            ? "|k| = |a − b|: the locus is a ray along the line ab."
            : `No point: |k| must be less than |a − b| = ${tidy(d)}.`,
      };
    }
    const A = Math.abs(k) / 2;
    const B = Math.sqrt((d / 2) ** 2 - A * A);
    const T = Math.min(8, Math.asinh((2 * diag) / Math.max(B, 1e-6)));
    const side = k > 0 ? 1 : -1; // |z − a| > |z − b|: the branch nearer b
    const pts: C[] = [];
    for (let i = 0; i <= 200; i++) {
      const t = -T + (2 * T * i) / 200;
      pts.push(local(side * A * Math.cosh(t), B * Math.sinh(t)));
    }
    return { pieces: [pts], closed: false };
  }
  if (locus === "apollonius") {
    if (d < 1e-9) return { pieces: [], closed: false, message: "a = b: choose two different points." };
    if (Math.abs(k - 1) < 1e-9) return { pieces: [line()], closed: false, message: "k = 1: the circle becomes the perpendicular bisector." };
    if (k <= 0) return { pieces: [[a]], closed: false, message: "k = 0: only the point a." };
    const centre = cscale(1 / (1 - k * k), csub(a, cscale(k * k, b)));
    const radius = (k * d) / Math.abs(1 - k * k);
    return { pieces: [arcPoints(centre, radius, 0, 2 * Math.PI, 180)], closed: true };
  }
  // arc: z = (a − t e^{iθ} b)/(1 − t e^{iθ}), t > 0 traces exactly the points with arg((z − a)/(z − b)) = θ.
  if (d < 1e-9) return { pieces: [], closed: false, message: "a = b: choose two different points." };
  const e = cfromPolar(1, theta);
  const pieces: C[][] = [];
  let cur: C[] = [];
  for (let i = 0; i <= 400; i++) {
    const t = Math.exp(-7 + (14 * i) / 400);
    const te = cscale(t, e);
    const z = cdiv(csub(a, cmul(te, b)), csub([1, 0], te));
    if (!z || cabs(csub(z, m)) > 4 * diag) {
      if (cur.length > 1) pieces.push(cur);
      cur = [];
      continue;
    }
    cur.push(z);
  }
  if (cur.length > 1) pieces.push(cur);
  return { pieces, closed: false };
}

export function CqLocusExplorer({ config }: { config: Config }) {
  const locus = config.locus;
  const kRange = config.k ?? DEFAULT_K[locus];
  const [a, setA] = useState<C>(config.a);
  const [b, setB] = useState<C>(config.b);
  const [p, setP] = useState<C>(config.p);
  const [q, setQ] = useState<C>(config.probe ?? [0, 0]);
  const [k, setK] = useState(kRange?.initial ?? 1);
  const [thetaDeg, setThetaDeg] = useState(config.theta.initial);

  const win = config.window;
  const diag = Math.hypot(win.xmax - win.xmin, win.ymax - win.ymin);
  const theta = (thetaDeg * Math.PI) / 180;
  const curve = sampleLocus(locus, a, b, k, theta, diag);
  const usesB = locus !== "circle";

  const pos: Record<HandleId, C> = { a, b, p, probe: q };
  const setters: Record<HandleId, (v: C) => void> = { a: setA, b: setB, p: setP, probe: setQ };
  const handles: PlaneHandle[] = config.draggable
    .filter((id) => (id === "b" ? usesB : id === "probe" ? Boolean(config.probe) : true))
    .map((id) => ({ id, pos: pos[id], color: HANDLE_COLOR[id], name: HANDLE_NAME[id], hollow: id === "p" }));

  // ---------- value of the defining quantity at P ----------
  const pa = cabs(csub(p, a));
  const pb = cabs(csub(p, b));
  const tol = 0.06;
  let equation = "";
  let atP = "";
  let status = "";
  const za = shiftLatex(a);
  const zb = shiftLatex(b);
  if (locus === "circle") {
    equation = `|${za}| = ${numLatex(k)}`;
    atP = `|P - a| = ${numLatex(pa)}`;
    status = Math.abs(pa - k) < tol ? "P is on the circle" : pa < k ? "P is inside the circle" : "P is outside the circle";
  } else if (locus === "bisector") {
    equation = `|${za}| = |${zb}|`;
    atP = `|P - a| = ${numLatex(pa)},\\ |P - b| = ${numLatex(pb)}`;
    status = Math.abs(pa - pb) < tol ? "P is on the bisector" : pa < pb ? "P is nearer a" : "P is nearer b";
  } else if (locus === "ellipse") {
    equation = `|${za}| + |${zb}| = ${numLatex(k)}`;
    atP = `|P - a| + |P - b| = ${numLatex(pa + pb)}`;
    status = Math.abs(pa + pb - k) < tol ? "P is on the ellipse" : pa + pb < k ? "P is inside" : "P is outside";
  } else if (locus === "hyperbola") {
    equation = `|${za}| - |${zb}| = ${numLatex(k)}`;
    atP = `|P - a| - |P - b| = ${numLatex(pa - pb)}`;
    status = Math.abs(pa - pb - k) < tol ? "P is on the branch" : "P is not on the branch";
  } else if (locus === "apollonius") {
    equation = `|${za}| = ${numLatex(k)}\\,|${zb}|`;
    atP = pb > 1e-9 ? `\\dfrac{|P - a|}{|P - b|} = ${numLatex(pa / pb)}` : "\\text{undefined at } P = b";
    status = pb > 1e-9 && Math.abs(pa / pb - k) < tol / 2 ? "P is on the circle" : "P is not on the locus";
  } else {
    const w = cdiv(csub(p, a), csub(p, b));
    const argW = w ? carg(w) : null;
    equation = `\\arg\\left(\\dfrac{${za}}{${zb}}\\right) = ${tidy(thetaDeg, 1)}^\\circ`;
    atP = argW === null ? "\\text{undefined at } P = a \\text{ or } b" : `\\arg\\dfrac{P - a}{P - b} = ${tidy((argW * 180) / Math.PI, 1)}^\\circ`;
    status = argW !== null && Math.abs(argW - theta) < 0.04 ? "P is on the arc" : "P is not on the arc";
  }

  // ---------- nearest / farthest points from q ----------
  let nearest: { z: C; d: number } | null = null;
  let farthest: { z: C; d: number } | null = null;
  const bounded = curve.closed || locus === "arc";
  if (config.probe && curve.pieces.length > 0) {
    if (locus === "circle" && k > 0) {
      const dq = cabs(csub(a, q));
      const u: C = dq > 1e-9 ? cscale(1 / dq, csub(q, a)) : [1, 0];
      nearest = { z: cadd(a, cscale(k, u)), d: Math.abs(dq - k) };
      farthest = { z: csub(a, cscale(k, u)), d: dq + k };
    } else {
      // Densify straight pieces, then take the extreme sample points.
      const samples: C[] = [];
      for (const piece of curve.pieces) {
        for (let i = 0; i < piece.length - 1; i++) {
          for (let j = 0; j < 40; j++) {
            const t = j / 40;
            samples.push(cadd(piece[i], cscale(t, csub(piece[i + 1], piece[i]))));
          }
        }
        samples.push(piece[piece.length - 1]);
      }
      for (const zz of samples) {
        const dd = cabs(csub(zz, q));
        if (!nearest || dd < nearest.d) nearest = { z: zz, d: dd };
        if (!farthest || dd > farthest.d) farthest = { z: zz, d: dd };
      }
      if (!bounded) farthest = null;
    }
  }
  const qName = q[0] === 0 && q[1] === 0 ? "|z|" : `|${shiftLatex(q)}|`;

  const scene = (s: PlaneScales) => (
    <>
      {curve.pieces.map((piece, i) => (
        <PlanePath
          key={`c${i}`}
          s={s}
          pts={piece}
          color="result"
          closed={curve.closed}
          width={2.5}
          fillOpacity={config.shade && curve.closed ? 0.12 : undefined}
        />
      ))}
      {[...(usesB ? [b] : []), a].map((z, i) => (
        <SvgLatex
          key={`lab${i}`}
          x={s.pt(z)[0] + 14}
          y={s.pt(z)[1] + 14}
          latex={usesB && i === 0 ? "b" : "a"}
          className={usesB && i === 0 ? "text-callout-info" : "text-primary"}
        />
      ))}
      {!config.draggable.includes("a") && <PlaneDot s={s} z={a} color="a" r={5} />}
      {usesB && !config.draggable.includes("b") && <PlaneDot s={s} z={b} color="b" r={5} />}
      <PlanePath s={s} pts={[p, a]} color="muted" dashed width={1} />
      {usesB && <PlanePath s={s} pts={[p, b]} color="muted" dashed width={1} />}
      {!config.draggable.includes("p") && <PlaneDot s={s} z={p} color="c" r={5} />}
      <SvgLatex x={s.pt(p)[0] + 14} y={s.pt(p)[1] - 14} latex="P" className="text-callout-definition" />
      {config.probe && (
        <>
          {!config.draggable.includes("probe") && <PlaneDot s={s} z={q} color="aux" r={5} />}
          <SvgLatex x={s.pt(q)[0] - 14} y={s.pt(q)[1] + 14} latex="q" className="text-callout-warning" />
          {nearest && (
            <>
              <PlanePath s={s} pts={[q, nearest.z]} color="aux" width={1.5} />
              <PlaneDot s={s} z={nearest.z} color="aux" r={4.5} />
            </>
          )}
          {farthest && (
            <>
              <PlanePath s={s} pts={[q, farthest.z]} color="aux" dashed width={1.5} />
              <PlaneDot s={s} z={farthest.z} color="aux" r={4.5} />
            </>
          )}
        </>
      )}
      {locus === "apollonius" && curve.closed && Math.abs(k - 1) > 1e-9 && (
        <PlaneDot s={s} z={cscale(1 / (1 - k * k), csub(a, cscale(k * k, b)))} color="muted" r={3} />
      )}
    </>
  );

  return (
    <InteractiveFrame title="Locus explorer">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-3">
          <PlaneCanvas
            win={win}
            handles={handles}
            snap={config.snap}
            onMove={(id, value) => setters[id as HandleId](value)}
            ariaLabel="Argand plane showing a locus with a draggable test point"
          >
            {scene}
          </PlaneCanvas>
          {kRange && (
            <SliderRow label={<Latex latex="k" />} value={k} min={kRange.min} max={kRange.max} step={kRange.step} onChange={setK} />
          )}
          {locus === "arc" && (
            <SliderRow
              label={<Latex latex="\theta" />}
              value={thetaDeg}
              min={config.theta.min}
              max={config.theta.max}
              step={config.theta.step}
              onChange={setThetaDeg}
              unit="°"
            />
          )}
        </div>
        <div className="w-full space-y-2 text-sm sm:w-64">
          <div className="rounded-md border bg-background p-3 text-center">
            <Latex latex={equation} />
            {curve.message && <p className="mt-1 text-xs text-muted-foreground">{curve.message}</p>}
          </div>
          <div className="space-y-1 rounded-md border bg-background p-3">
            <ReadoutRow label="a">
              <Latex latex={cxLatex(a)} />
            </ReadoutRow>
            {usesB && (
              <ReadoutRow label="b">
                <Latex latex={cxLatex(b)} />
              </ReadoutRow>
            )}
            <ReadoutRow label="P">
              <Latex latex={cxLatex(p)} />
            </ReadoutRow>
            <div className="pt-1 text-center">
              <Latex latex={atP} />
            </div>
            <p className="text-center text-xs font-medium">{status}</p>
            {locus === "apollonius" && curve.closed && Math.abs(k - 1) > 1e-9 && (
              <ReadoutRow label="centre, radius">
                <Latex
                  latex={`${cxLatex(cscale(1 / (1 - k * k), csub(a, cscale(k * k, b))))},\\ ${numLatex(
                    (k * cabs(csub(b, a))) / Math.abs(1 - k * k),
                  )}`}
                />
              </ReadoutRow>
            )}
          </div>
          {config.probe && (
            <div className="space-y-1 rounded-md border bg-background p-3">
              <ReadoutRow label={<Latex latex={`\\min ${qName}`} />}>
                <Latex latex={nearest ? `${numLatex(nearest.d)} \\text{ at } ${cxLatex(nearest.z)}` : "\\text{no locus}"} />
              </ReadoutRow>
              <ReadoutRow label={<Latex latex={`\\max ${qName}`} />}>
                <Latex
                  latex={
                    farthest
                      ? `${numLatex(farthest.d)} \\text{ at } ${cxLatex(farthest.z)}`
                      : nearest
                        ? "\\text{unbounded}"
                        : "\\text{no locus}"
                  }
                />
              </ReadoutRow>
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION[locus]} />
      </p>
    </InteractiveFrame>
  );
}
