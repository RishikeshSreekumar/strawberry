"use client";

import { useState } from "react";
import type { z } from "zod";
import type { slcLineExplorerSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  acuteAngle,
  add,
  deg,
  dist,
  distToLine,
  evalLine,
  EPS,
  footOn,
  imageIn,
  intersect,
  lineDir,
  lineFrom,
  lineLatex,
  lineThrough,
  mid,
  niceLine,
  normLen,
  num,
  ptLatex,
  rootLatex,
  same,
  scale,
  slopeOf,
  sub,
  termsLatex,
  tidy,
  type Line,
  type P,
} from "./slc-geometry";
import {
  SlcCanvas,
  SlcCircle,
  SlcDot,
  SlcLabel,
  SlcLine,
  SlcPolygon,
  SlcReadout,
  SlcSegment,
  type SlcHandle,
  type SlcScales,
} from "./slc-plane";
import type { VecColor } from "./vec-canvas-2d";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof slcLineExplorerSchema>;
type Mode = Config["mode"];
type Show = NonNullable<Config["show"]>[number];
type HandleId = "a" | "b" | "c" | "d" | "p";

const DEFAULT_DRAGGABLE: Record<Mode, HandleId[]> = {
  section: ["a", "b"],
  triangle: ["a", "b", "c"],
  line: ["a", "b"],
  "point-line": ["a", "b", "p"],
  "two-lines": ["a", "b", "c", "d"],
  family: ["a", "b", "c", "d"],
  pair: [],
};

const DEFAULT_SHOW: Record<Mode, Show[]> = {
  section: ["external"],
  triangle: ["centroid", "circumcentre", "orthocentre", "euler-line"],
  line: ["forms", "intercepts"],
  "point-line": ["foot", "image"],
  "two-lines": [],
  family: ["family-fan"],
  pair: [],
};

const HANDLE_COLOR: Record<HandleId, VecColor> = { a: "a", b: "a", c: "b", d: "b", p: "c" };

const DEFAULT_CAPTION: Record<Mode, string> = {
  section:
    "Drag A and B and change m and n. The internal point always lies between A and B, nearer the end with the larger share of the ratio; the external point lies outside, beyond the end that carries the larger number.",
  triangle:
    "Drag the vertices. The centroid, circumcentre and orthocentre always lie on one line (the Euler line), with the centroid two thirds of the way from the orthocentre to the circumcentre.",
  line: "Drag A and B. Every form of the equation describes the same line: watch them all change together.",
  "point-line":
    "Drag P across the line: the sign of L(P) flips exactly when P changes sides, and the distance is |L(P)| divided by the length of the normal (a, b).",
  "two-lines": "Drag the four points. The angle between the lines is read from their slopes or from their normals.",
  family:
    "Every value of λ gives a line through the meeting point of L₁ and L₂. Slide λ and the line swings about that point.",
  pair: "One second-degree equation, two lines through the origin. They are real only when h² ≥ ab.",
};

const NAMES: Record<HandleId, string> = { a: "A", b: "B", c: "C", d: "D", p: "P" };

/** Weighted point (Σ wᵢ Pᵢ) / Σ wᵢ, or null when the weights cancel. */
function weighted(points: P[], w: number[]): P | null {
  const total = w.reduce((s, v) => s + v, 0);
  if (Math.abs(total) < EPS) return null;
  let x = 0;
  let y = 0;
  points.forEach((p, i) => {
    x += w[i] * p[0];
    y += w[i] * p[1];
  });
  return [x / total, y / total];
}

/** Circumcentre of ABC, or null when collinear. */
function circumcentre(A: P, B: P, C: P): P | null {
  const d = 2 * (A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]));
  if (Math.abs(d) < EPS) return null;
  const a2 = A[0] ** 2 + A[1] ** 2;
  const b2 = B[0] ** 2 + B[1] ** 2;
  const c2 = C[0] ** 2 + C[1] ** 2;
  return [
    (a2 * (B[1] - C[1]) + b2 * (C[1] - A[1]) + c2 * (A[1] - B[1])) / d,
    (a2 * (C[0] - B[0]) + b2 * (A[0] - C[0]) + c2 * (B[0] - A[0])) / d,
  ];
}

/** A number for use after an operator: negatives in brackets. */
const paren = (v: number) => (tidy(v) < 0 ? `(${num(v)})` : num(v));

/** Slope as LaTeX: a tidy decimal, or "undefined" for a vertical line. */
function slopeLatex(L: Line): string {
  const m = slopeOf(L);
  return m === null ? "\\text{undefined (vertical)}" : num(m);
}

/** Inclination in [0°, 180°). */
function inclination(L: Line): number {
  const m = slopeOf(L);
  if (m === null) return 90;
  let t = deg(Math.atan(m));
  if (t < 0) t = tidy(t + 180, 1);
  return t;
}

/** All the standard forms of the line through p and q. */
function formsOf(L: Line, p: P, q: P): { label: string; latex: string }[] {
  const out: { label: string; latex: string }[] = [];
  const m = slopeOf(L);
  const nice = niceLine(L);
  const x1 = p[0];
  const y1 = p[1];
  if (m !== null) {
    const c = y1 - m * x1;
    out.push({ label: "slope-intercept", latex: `y = ${termsLatex([[m, "x"], [c, ""]])}` });
    out.push({
      label: "point-slope",
      latex: `${termsLatex([[1, "y"], [-y1, ""]])} = ${num(m)}\\left(${termsLatex([[1, "x"], [-x1, ""]])}\\right)`,
    });
  } else {
    out.push({ label: "vertical line", latex: `x = ${num(x1)}` });
  }
  const dx = q[0] - x1;
  const dy = q[1] - y1;
  if (Math.abs(dx) > EPS && Math.abs(dy) > EPS) {
    out.push({
      label: "two-point",
      latex: `\\frac{${termsLatex([[1, "y"], [-y1, ""]])}}{${num(dy)}} = \\frac{${termsLatex([[1, "x"], [-x1, ""]])}}{${num(dx)}}`,
    });
  }
  const xi = Math.abs(nice.a) > EPS ? -nice.c / nice.a : null;
  const yi = Math.abs(nice.b) > EPS ? -nice.c / nice.b : null;
  if (xi !== null && yi !== null && Math.abs(xi) > EPS && Math.abs(yi) > EPS) {
    out.push({ label: "intercept", latex: `\\frac{x}{${num(xi)}} + \\frac{y}{${num(yi)}} = 1` });
  } else {
    out.push({ label: "intercept", latex: "\\text{none (through O or parallel to an axis)}" });
  }
  // Normal form x cos α + y sin α = p with p ≥ 0.
  const n = normLen(nice);
  let ca = nice.a / n;
  let sa = nice.b / n;
  let pp = -nice.c / n;
  if (pp < 0 || (Math.abs(pp) < EPS && (sa < 0 || (Math.abs(sa) < EPS && ca < 0)))) {
    ca = -ca;
    sa = -sa;
    pp = -pp;
  }
  let alpha = deg(Math.atan2(sa, ca));
  if (alpha < 0) alpha = tidy(alpha + 360, 1);
  out.push({
    label: "normal",
    latex: `x\\cos ${alpha}^\\circ + y\\sin ${alpha}^\\circ = ${num(pp)}\\ \\left(${termsLatex([[ca, "x"], [sa, "y"]])} = ${num(pp)}\\right)`,
  });
  // Direction from the first point towards the second, so the second sits at r = AB.
  let theta = deg(Math.atan2(dy, dx));
  if (theta < 0) theta = tidy(theta + 360, 1);
  out.push({
    label: "parametric",
    latex: `(${termsLatex([[x1, ""], [1, `r\\cos ${theta}^\\circ`]])},\\ ${termsLatex([[y1, ""], [1, `r\\sin ${theta}^\\circ`]])})`,
  });
  out.push({
    label: "cos θ, sin θ",
    latex: `${num(Math.cos((theta * Math.PI) / 180))},\\ ${num(Math.sin((theta * Math.PI) / 180))}`,
  });
  out.push({ label: "general", latex: lineLatex(L) });
  return out;
}

export function SlcLineExplorer({ config }: { config: Config }) {
  const mode = config.mode;
  const [A, setA] = useState<P>(config.a);
  const [B, setB] = useState<P>(config.b);
  const [C, setC] = useState<P>(config.c);
  const [D, setD] = useState<P>(config.d);
  const [Pt, setP] = useState<P>(config.p);
  const [m, setM] = useState(config.m.initial);
  const [n, setN] = useState(config.n.initial);
  const [lambda, setLambda] = useState(config.lambda.initial);
  const [pa, setPa] = useState(config.coef.a.initial);
  const [ph, setPh] = useState(config.coef.h.initial);
  const [pb, setPb] = useState(config.coef.b.initial);

  const show = config.show ?? DEFAULT_SHOW[mode];
  const has = (k: Show) => show.includes(k);
  const draggable = config.draggable ?? DEFAULT_DRAGGABLE[mode];
  const pos: Record<HandleId, P> = { a: A, b: B, c: C, d: D, p: Pt };
  const setters: Record<HandleId, (v: P) => void> = { a: setA, b: setB, c: setC, d: setD, p: setP };
  const handles: SlcHandle[] = draggable.map((id) => ({ id, pos: pos[id], color: HANDLE_COLOR[id], name: NAMES[id] }));

  const O: P = [0, 0];
  const L1 = lineThrough(A, B);
  const L2 = lineThrough(C, D);

  const readouts: { label: string; latex: string }[] = [];
  let scene: (s: SlcScales) => React.ReactNode = () => null;

  const pointLabel = (s: SlcScales, p: P, name: string, cls = "text-foreground") => (
    <SlcLabel s={s} p={p} latex={name} className={cls} />
  );

  // ---------------------------------------------------------------- section
  if (mode === "section") {
    const Pi: P = [(m * B[0] + n * A[0]) / (m + n), (m * B[1] + n * A[1]) / (m + n)];
    const Qe: P | null =
      m === n ? null : [(m * B[0] - n * A[0]) / (m - n), (m * B[1] - n * A[1]) / (m - n)];
    readouts.push(
      { label: "A, B", latex: `${ptLatex(A)},\\ ${ptLatex(B)}` },
      { label: "AB", latex: rootLatex(dist(A, B)) },
      { label: "ratio", latex: `m : n = ${num(m)} : ${num(n)}` },
      {
        label: "internal P",
        latex: `\\left(\\tfrac{${num(m)}\\cdot ${paren(B[0])} + ${num(n)}\\cdot ${paren(A[0])}}{${num(m + n)}},\\ \\tfrac{${num(m)}\\cdot ${paren(B[1])} + ${num(n)}\\cdot ${paren(A[1])}}{${num(m + n)}}\\right) = ${ptLatex(Pi)}`,
      },
      { label: "AP : PB", latex: `${num(dist(A, Pi))} : ${num(dist(Pi, B))}` },
    );
    if (has("external")) {
      readouts.push({
        label: "external Q",
        latex: Qe
          ? `\\left(\\tfrac{m x_2 - n x_1}{m - n},\\ \\tfrac{m y_2 - n y_1}{m - n}\\right) = ${ptLatex(Qe)}`
          : "\\text{none: } m = n \\text{ (Q runs off to infinity)}",
      });
      if (Qe) readouts.push({ label: "AQ : QB", latex: `${num(dist(A, Qe))} : ${num(dist(Qe, B))}` });
    }
    scene = (s) => (
      <>
        {has("external") && L1 && <SlcLine s={s} L={L1} color="muted" dashed width={1} />}
        <SlcSegment s={s} p={A} q={B} color="a" width={2.5} />
        <SlcDot s={s} p={Pi} color="result" r={5} />
        {pointLabel(s, Pi, "P", "text-callout-tip")}
        {has("external") && Qe && (
          <>
            <SlcDot s={s} p={Qe} color="aux" r={5} />
            {pointLabel(s, Qe, "Q", "text-callout-warning")}
          </>
        )}
        {pointLabel(s, A, "A", "text-primary")}
        {pointLabel(s, B, "B", "text-primary")}
      </>
    );
  }

  // --------------------------------------------------------------- triangle
  if (mode === "triangle") {
    const a = dist(B, C);
    const b = dist(C, A);
    const c = dist(A, B);
    const det = A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]);
    const area = Math.abs(det) / 2;
    const degenerate = area < EPS;
    readouts.push(
      { label: "sides a, b, c", latex: `${num(a)},\\ ${num(b)},\\ ${num(c)}` },
      {
        label: "area",
        latex: `\\tfrac12\\left|${num(det)}\\right| = ${num(area)}`,
      },
    );
    let G: P | null = null;
    let I: P | null = null;
    let Oc: P | null = null;
    let H: P | null = null;
    let ex: (P | null)[] = [];
    let R = 0;
    let r = 0;
    if (degenerate) {
      readouts.push({ label: "collinear?", latex: "\\text{yes: area } 0 \\text{, no triangle}" });
    } else {
      G = weighted([A, B, C], [1, 1, 1]);
      I = weighted([A, B, C], [a, b, c]);
      Oc = circumcentre(A, B, C);
      H = Oc ? sub(add(add(A, B), C), scale(2, Oc)) : null;
      ex = [weighted([A, B, C], [-a, b, c]), weighted([A, B, C], [a, -b, c]), weighted([A, B, C], [a, b, -c])];
      R = Oc ? dist(Oc, A) : 0;
      r = area / ((a + b + c) / 2);
      if (has("centroid") && G) readouts.push({ label: "centroid G", latex: ptLatex(G) });
      if (has("incentre") && I) readouts.push({ label: "incentre I", latex: ptLatex(I) });
      if (has("circumcentre") && Oc) readouts.push({ label: "circumcentre O", latex: ptLatex(Oc) });
      if (has("orthocentre") && H) readouts.push({ label: "orthocentre H", latex: ptLatex(H) });
      if (has("excentres"))
        ex.forEach((e, i) => {
          if (e) readouts.push({ label: `excentre I${["₁", "₂", "₃"][i]}`, latex: ptLatex(e) });
        });
      if (has("circumcircle")) readouts.push({ label: "circumradius R", latex: num(R) });
      if (has("incircle")) readouts.push({ label: "inradius r", latex: num(r) });
      if (has("euler-line") && G && Oc && H) {
        readouts.push({
          label: "Euler line",
          latex: same(Oc, H) ? "\\text{O = G = H (equilateral)}" : `HG : GO = ${num(dist(H, G))} : ${num(dist(G, Oc))}`,
        });
      }
    }
    scene = (s) => {
      const footOf = (p: P, q: P, from: P) => {
        const L = lineThrough(p, q);
        return L ? footOn(L, from) : p;
      };
      return (
        <>
          <SlcPolygon s={s} pts={[A, B, C]} color="a" opacity={0.08} />
          <SlcSegment s={s} p={A} q={B} color="a" />
          <SlcSegment s={s} p={B} q={C} color="a" />
          <SlcSegment s={s} p={C} q={A} color="a" />
          {!degenerate && (
            <>
              {has("medians") && (
                <>
                  <SlcSegment s={s} p={A} q={mid(B, C)} color="muted" dashed width={1} />
                  <SlcSegment s={s} p={B} q={mid(C, A)} color="muted" dashed width={1} />
                  <SlcSegment s={s} p={C} q={mid(A, B)} color="muted" dashed width={1} />
                </>
              )}
              {has("altitudes") && (
                <>
                  <SlcSegment s={s} p={A} q={footOf(B, C, A)} color="c" dashed width={1} />
                  <SlcSegment s={s} p={B} q={footOf(C, A, B)} color="c" dashed width={1} />
                  <SlcSegment s={s} p={C} q={footOf(A, B, C)} color="c" dashed width={1} />
                </>
              )}
              {has("circumcircle") && Oc && <SlcCircle s={s} centre={Oc} r={R} color="b" dashed width={1.2} />}
              {has("incircle") && I && <SlcCircle s={s} centre={I} r={r} color="result" dashed width={1.2} />}
              {has("euler-line") && Oc && H && !same(Oc, H) && (() => {
                const L = lineThrough(Oc, H);
                return L ? <SlcLine s={s} L={L} color="aux" dashed width={1} /> : null;
              })()}
              {has("excentres") &&
                ex.map((e, i) =>
                  e ? (
                    <g key={`ex${i}`}>
                      <SlcDot s={s} p={e} color="muted" r={3.5} />
                      <SlcLabel s={s} p={e} latex={`I_${i + 1}`} className="text-muted-foreground" />
                    </g>
                  ) : null,
                )}
              {has("centroid") && G && (
                <>
                  <SlcDot s={s} p={G} color="result" />
                  <SlcLabel s={s} p={G} latex="G" dx={10} dy={12} className="text-callout-tip" />
                </>
              )}
              {has("incentre") && I && (
                <>
                  <SlcDot s={s} p={I} color="result" hollow />
                  <SlcLabel s={s} p={I} latex="I" dx={-10} dy={12} className="text-callout-tip" />
                </>
              )}
              {has("circumcentre") && Oc && (
                <>
                  <SlcDot s={s} p={Oc} color="b" />
                  <SlcLabel s={s} p={Oc} latex="O" className="text-callout-info" />
                </>
              )}
              {has("orthocentre") && H && (
                <>
                  <SlcDot s={s} p={H} color="c" />
                  <SlcLabel s={s} p={H} latex="H" className="text-callout-definition" />
                </>
              )}
            </>
          )}
          {pointLabel(s, A, "A", "text-primary")}
          {pointLabel(s, B, "B", "text-primary")}
          {pointLabel(s, C, "C", "text-primary")}
        </>
      );
    };
  }

  // ------------------------------------------------------------------- line
  if (mode === "line") {
    if (!L1) {
      readouts.push({ label: "line", latex: "\\text{A and B coincide: drag them apart}" });
    } else {
      const nice = niceLine(L1);
      const xi = Math.abs(nice.a) > EPS ? -nice.c / nice.a : null;
      const yi = Math.abs(nice.b) > EPS ? -nice.c / nice.b : null;
      readouts.push(
        { label: "slope m", latex: L1.b === 0 ? slopeLatex(L1) : `\\tfrac{${num(B[1])} - ${paren(A[1])}}{${num(B[0])} - ${paren(A[0])}} = ${slopeLatex(L1)}` },
        { label: "inclination θ", latex: `${inclination(L1)}^\\circ` },
        {
          label: "AB",
          latex: `\\sqrt{(${num(B[0] - A[0])})^2 + (${num(B[1] - A[1])})^2} = ${rootLatex(dist(A, B))}`,
        },
      );
      if (has("intercepts")) {
        readouts.push(
          { label: "x-intercept", latex: xi === null ? "\\text{none}" : num(xi) },
          { label: "y-intercept", latex: yi === null ? "\\text{none}" : num(yi) },
        );
      }
      if (has("forms")) formsOf(L1, A, B).forEach((f) => readouts.push(f));
      else readouts.push({ label: "general", latex: lineLatex(L1) });
    }
    scene = (s) => {
      if (!L1) return pointLabel(s, A, "A = B", "text-primary");
      const nice = niceLine(L1);
      const xi = Math.abs(nice.a) > EPS ? -nice.c / nice.a : null;
      const yi = Math.abs(nice.b) > EPS ? -nice.c / nice.b : null;
      const corner: P = [B[0], A[1]];
      const F = footOn(L1, O);
      return (
        <>
          <SlcLine s={s} L={L1} color="a" />
          {!same(corner, A) && !same(corner, B) && (
            <>
              <SlcSegment s={s} p={A} q={corner} color="aux" dashed width={1.5} />
              <SlcSegment s={s} p={corner} q={B} color="aux" dashed width={1.5} />
              <SlcLabel s={s} p={mid(A, corner)} latex={`\\Delta x = ${num(B[0] - A[0])}`} dx={0} dy={12} className="text-callout-warning" />
              <SlcLabel s={s} p={mid(corner, B)} latex={`\\Delta y = ${num(B[1] - A[1])}`} dx={36} dy={0} className="text-callout-warning" />
            </>
          )}
          {has("forms") && !same(F, O) && (
            <>
              <SlcSegment s={s} p={O} q={F} color="c" dashed width={1.5} />
              <SlcLabel s={s} p={mid(O, F)} latex="p" dx={-8} dy={-8} className="text-callout-definition" />
            </>
          )}
          {has("intercepts") && xi !== null && <SlcDot s={s} p={[xi, 0]} color="result" r={3.5} />}
          {has("intercepts") && yi !== null && <SlcDot s={s} p={[0, yi]} color="result" r={3.5} />}
          {pointLabel(s, A, "A", "text-primary")}
          {pointLabel(s, B, "B", "text-primary")}
        </>
      );
    };
  }

  // ------------------------------------------------------------- point-line
  if (mode === "point-line") {
    if (!L1) {
      readouts.push({ label: "line", latex: "\\text{A and B coincide: drag them apart}" });
    } else {
      const L = niceLine(L1);
      const vP = evalLine(L, Pt);
      const vO = L.c;
      const d = distToLine(L, Pt);
      const F = footOn(L, Pt);
      const Img = imageIn(L, Pt);
      const side =
        Math.abs(vP) < EPS
          ? "\\text{on the line}"
          : Math.abs(vO) < EPS
            ? "\\text{(the line passes through O)}"
            : vP * vO > 0
              ? "\\text{same side as O}"
              : "\\text{opposite side to O}";
      readouts.push(
        { label: "line L", latex: lineLatex(L) },
        { label: "L(P)", latex: num(vP) },
        { label: "L(O)", latex: num(vO) },
        { label: "P is", latex: side },
        { label: "distance", latex: `\\tfrac{|${num(vP)}|}{\\sqrt{${num(L.a * L.a + L.b * L.b)}}} = ${num(d)}` },
      );
      if (has("foot")) readouts.push({ label: "foot F", latex: ptLatex(F) });
      if (has("image")) readouts.push({ label: "image P′", latex: ptLatex(Img) });
    }
    scene = (s) => {
      if (!L1) return pointLabel(s, A, "A = B", "text-primary");
      const F = footOn(L1, Pt);
      const Img = imageIn(L1, Pt);
      return (
        <>
          <SlcLine s={s} L={L1} color="a" />
          <SlcDot s={s} p={O} color="muted" r={3} />
          {has("image") && (
            <>
              <SlcSegment s={s} p={Pt} q={Img} color="muted" dashed width={1} />
              <SlcDot s={s} p={Img} color="c" hollow r={5} />
              <SlcLabel s={s} p={Img} latex="P'" className="text-callout-definition" />
            </>
          )}
          <SlcSegment s={s} p={Pt} q={F} color="result" width={2} />
          {has("foot") && (
            <>
              <SlcDot s={s} p={F} color="result" r={3.5} />
              <SlcLabel s={s} p={F} latex="F" dx={-12} dy={-12} className="text-callout-tip" />
            </>
          )}
          {pointLabel(s, A, "A", "text-primary")}
          {pointLabel(s, B, "B", "text-primary")}
          {pointLabel(s, Pt, "P", "text-callout-definition")}
        </>
      );
    };
  }

  // -------------------------------------------------------------- two-lines
  if (mode === "two-lines") {
    let bis: { L: Line; acute: boolean; origin: boolean }[] = [];
    let X: P | null = null;
    if (!L1 || !L2) {
      readouts.push({ label: "lines", latex: "\\text{each line needs two different points}" });
    } else {
      const N1 = niceLine(L1);
      const N2 = niceLine(L2);
      X = intersect(N1, N2);
      const th = acuteAngle(N1, N2);
      const m1 = slopeOf(N1);
      const m2 = slopeOf(N2);
      readouts.push(
        { label: "L₁", latex: lineLatex(N1) },
        { label: "L₂", latex: lineLatex(N2) },
        { label: "slopes", latex: `${m1 === null ? "\\infty" : num(m1)},\\ ${m2 === null ? "\\infty" : num(m2)}` },
      );
      if (!X) {
        readouts.push({
          label: "meet?",
          latex: Math.abs(N1.c * normLen(N2) - N2.c * normLen(N1)) < 1e-7 ? "\\text{coincident}" : "\\text{parallel (}m_1 = m_2\\text{)}",
        });
        if (Math.abs(N1.a * N2.b - N2.a * N1.b) < EPS) {
          const k = normLen(N1) / normLen(N2);
          readouts.push({
            label: "gap",
            latex: num(Math.abs(N1.c - k * N2.c) / normLen(N1)),
          });
        }
      } else {
        readouts.push(
          { label: "meet at", latex: ptLatex(X) },
          { label: "acute angle", latex: `${deg(th)}^\\circ` },
          { label: "obtuse angle", latex: `${tidy(180 - deg(th), 1)}^\\circ` },
          {
            label: "perpendicular?",
            latex: Math.abs(N1.a * N2.a + N1.b * N2.b) < EPS ? "\\text{yes: } a_1a_2 + b_1b_2 = 0" : "\\text{no}",
          },
        );
        if (m1 !== null && m2 !== null && Math.abs(1 + m1 * m2) > EPS) {
          readouts.push({
            label: "tan θ",
            latex: `\\left|\\tfrac{m_1 - m_2}{1 + m_1m_2}\\right| = ${num(Math.abs((m1 - m2) / (1 + m1 * m2)))}`,
          });
        }
        if (has("bisectors")) {
          const n1 = normLen(N1);
          const n2 = normLen(N2);
          const make = (sgn: number) =>
            lineFrom(N1.a / n1 - (sgn * N2.a) / n2, N1.b / n1 - (sgn * N2.b) / n2, N1.c / n1 - (sgn * N2.c) / n2);
          const cands = [make(1), make(-1)].filter((l): l is Line => l !== null);
          const originOK = Math.abs(N1.c) > EPS && Math.abs(N2.c) > EPS;
          bis = cands.map((L) => {
            // The acute bisector makes half the acute angle (under 45°) with each line.
            const acute = acuteAngle(L, N1) < Math.PI / 4 - 1e-9;
            // The origin's bisector: signed distances keep the signs they have at O.
            const t = add(X as P, lineDir(L));
            const s1 = evalLine(N1, t) / n1;
            const s2 = evalLine(N2, t) / n2;
            const s1o = N1.c / n1;
            const s2o = N2.c / n2;
            const origin = originOK && Math.sign(s1) * Math.sign(s1o) === Math.sign(s2) * Math.sign(s2o);
            return { L, acute, origin };
          });
          bis.forEach((b) => {
            const tags = [
              Math.abs(N1.a * N2.a + N1.b * N2.b) < EPS ? "45^\\circ \\text{ to each}" : b.acute ? "\\text{acute}" : "\\text{obtuse}",
              ...(b.origin ? ["\\text{contains O}"] : []),
            ];
            readouts.push({ label: "bisector", latex: `${lineLatex(b.L)}\\ (${tags.join(",\\ ")})` });
          });
          if (!originOK) readouts.push({ label: "origin", latex: "\\text{O lies on a line: no origin bisector}" });
        }
      }
    }
    scene = (s) => (
      <>
        {L1 && <SlcLine s={s} L={L1} color="a" />}
        {L2 && <SlcLine s={s} L={L2} color="b" />}
        {bis.map((b, i) => (
          <SlcLine key={`bis${i}`} s={s} L={b.L} color={b.acute ? "result" : "aux"} dashed width={1.5} />
        ))}
        {X && <SlcDot s={s} p={X} color="muted" r={3.5} />}
        {pointLabel(s, A, "A", "text-primary")}
        {pointLabel(s, B, "B", "text-primary")}
        {pointLabel(s, C, "C", "text-callout-info")}
        {pointLabel(s, D, "D", "text-callout-info")}
      </>
    );
  }

  // ----------------------------------------------------------------- family
  if (mode === "family") {
    let member: Line | null = null;
    let fan: Line[] = [];
    let X: P | null = null;
    if (!L1 || !L2) {
      readouts.push({ label: "lines", latex: "\\text{each line needs two different points}" });
    } else {
      const N1 = niceLine(L1);
      const N2 = niceLine(L2);
      X = intersect(N1, N2);
      const combo = (k: number) => lineFrom(N1.a + k * N2.a, N1.b + k * N2.b, N1.c + k * N2.c);
      member = combo(lambda);
      fan = [-3, -2, -1, -0.5, 0, 0.5, 1, 2, 3]
        .map(combo)
        .filter((l): l is Line => l !== null);
      const eq = (L: Line) => termsLatex([[L.a, "x"], [L.b, "y"], [L.c, ""]]);
      readouts.push(
        { label: "L₁", latex: `${eq(N1)} = 0` },
        { label: "L₂", latex: `${eq(N2)} = 0` },
        {
          label: `L₁ + λL₂, λ = ${tidy(lambda)}`,
          latex: member ? `${eq(member)} = 0` : "\\text{not a line (}a = b = 0\\text{)}",
        },
        {
          label: "common point",
          latex: X
            ? ptLatex(X)
            : Math.abs(N1.c * normLen(N2) - N2.c * normLen(N1)) < 1e-7
              ? "L_1 \\text{ and } L_2 \\text{ coincide}"
              : "\\text{none: } L_1 \\parallel L_2 \\text{, so every member is parallel to them}",
        },
      );
      if (member && X) readouts.push({ label: "check at the point", latex: `${num(evalLine(member, X))}` });
    }
    scene = (s) => (
      <>
        {has("family-fan") && fan.map((L, i) => <SlcLine key={`fan${i}`} s={s} L={L} color="muted" width={1} opacity={0.35} />)}
        {L1 && <SlcLine s={s} L={L1} color="a" />}
        {L2 && <SlcLine s={s} L={L2} color="b" />}
        {member && <SlcLine s={s} L={member} color="result" width={2.5} />}
        {X && <SlcDot s={s} p={X} color="result" r={4.5} />}
        {pointLabel(s, A, "A", "text-primary")}
        {pointLabel(s, B, "B", "text-primary")}
        {pointLabel(s, C, "C", "text-callout-info")}
        {pointLabel(s, D, "D", "text-callout-info")}
      </>
    );
  }

  // ------------------------------------------------------------------- pair
  if (mode === "pair") {
    const a = pa;
    const h = ph;
    const b = pb;
    const disc = h * h - a * b;
    const dirs: P[] = [];
    let status = "";
    if (Math.abs(a) < EPS && Math.abs(h) < EPS && Math.abs(b) < EPS) {
      status = "\\text{all coefficients zero: no equation}";
    } else if (disc < -EPS) {
      status = "\\text{imaginary lines: only O is real}";
    } else {
      const root = Math.sqrt(Math.max(0, disc));
      if (Math.abs(b) > EPS) {
        // y = mx with b m² + 2h m + a = 0.
        for (const m of [(-h + root) / b, (-h - root) / b]) dirs.push([1, m]);
      } else if (Math.abs(a) > EPS) {
        // x = ky with a k² + 2h k + b = 0, b = 0 here.
        for (const k of [(-h + root) / a, (-h - root) / a]) dirs.push([k, 1]);
      } else {
        dirs.push([1, 0], [0, 1]);
      }
      status = disc < EPS ? "\\text{coincident lines } (h^2 = ab)" : "\\text{two distinct real lines}";
    }
    const lines = dirs.map((d) => lineFrom(d[1], -d[0], 0)).filter((l): l is Line => l !== null);
    readouts.push(
      {
        label: "equation",
        latex: `${termsLatex([[a, "x^2"], [2 * h, "xy"], [b, "y^2"]])} = 0`,
      },
      { label: "h² − ab", latex: num(disc) },
      { label: "lines", latex: status },
    );
    if (Math.abs(b) > EPS && disc >= -EPS && dirs.length) {
      readouts.push(
        { label: "m₁ + m₂", latex: `-\\tfrac{2h}{b} = ${num((-2 * h) / b)}` },
        { label: "m₁ m₂", latex: `\\tfrac{a}{b} = ${num(a / b)}` },
      );
    }
    if (lines.length === 2 && disc > EPS) {
      dirs.forEach((d, i) =>
        readouts.push({
          label: `line ${i + 1}`,
          latex:
            Math.abs(d[0]) < EPS
              ? "x = 0"
              : `y = ${termsLatex([[d[1] / d[0], "x"]])}`,
        }),
      );
      const ang = Math.abs(a + b) < EPS ? 90 : deg(Math.atan((2 * Math.sqrt(disc)) / Math.abs(a + b)));
      readouts.push({
        label: "angle",
        latex:
          Math.abs(a + b) < EPS
            ? "90^\\circ \\ (a + b = 0)"
            : `\\tan\\theta = \\tfrac{2\\sqrt{h^2 - ab}}{|a + b|} = ${num((2 * Math.sqrt(disc)) / Math.abs(a + b))},\\ \\theta = ${ang}^\\circ`,
      });
    }
    let bisectors: Line[] = [];
    if (has("bisectors") && dirs.length === 2 && disc > EPS) {
      const u1 = scale(1 / Math.hypot(...dirs[0]), dirs[0]);
      const u2 = scale(1 / Math.hypot(...dirs[1]), dirs[1]);
      bisectors = [add(u1, u2), sub(u1, u2)]
        .map((d) => lineFrom(d[1], -d[0], 0))
        .filter((l): l is Line => l !== null);
      readouts.push({
        label: "bisectors",
        latex: Math.abs(h) < EPS ? "\\text{the axes } (h = 0)" : `\\tfrac{x^2 - y^2}{${num(a - b)}} = \\tfrac{xy}{${num(h)}}`,
      });
    }
    scene = (s) => (
      <>
        {bisectors.map((L, i) => (
          <SlcLine key={`pb${i}`} s={s} L={L} color="aux" dashed width={1.2} />
        ))}
        {lines.map((L, i) => (
          <SlcLine key={`pl${i}`} s={s} L={L} color={i === 0 ? "a" : "b"} width={2.5} />
        ))}
        <SlcDot s={s} p={O} color="result" r={4} />
      </>
    );
  }

  const ranges = {
    m: config.m,
    n: config.n,
    lambda: config.lambda,
  };

  return (
    <InteractiveFrame title={mode === "pair" ? "Pair of lines" : mode === "triangle" ? "Triangle in coordinates" : "Coordinate plane"}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-3">
          <SlcCanvas
            win={config.window}
            handles={handles}
            snap={config.snap}
            onMove={(id, v) => setters[id as HandleId](v)}
            ariaLabel="Coordinate plane with draggable points"
          >
            {scene}
          </SlcCanvas>
          {mode === "section" && (
            <>
              <SliderRow label={<Latex latex="m" />} value={m} min={ranges.m.min} max={ranges.m.max} step={ranges.m.step} onChange={setM} />
              <SliderRow label={<Latex latex="n" />} value={n} min={ranges.n.min} max={ranges.n.max} step={ranges.n.step} onChange={setN} />
            </>
          )}
          {mode === "family" && (
            <SliderRow
              label={<Latex latex="\lambda" />}
              value={lambda}
              min={ranges.lambda.min}
              max={ranges.lambda.max}
              step={ranges.lambda.step}
              onChange={setLambda}
            />
          )}
          {mode === "pair" && (
            <>
              <SliderRow label={<Latex latex="a" />} value={pa} min={config.coef.a.min} max={config.coef.a.max} step={config.coef.a.step} onChange={setPa} />
              <SliderRow label={<Latex latex="h" />} value={ph} min={config.coef.h.min} max={config.coef.h.max} step={config.coef.h.step} onChange={setPh} />
              <SliderRow label={<Latex latex="b" />} value={pb} min={config.coef.b.min} max={config.coef.b.max} step={config.coef.b.step} onChange={setPb} />
            </>
          )}
        </div>
        <div className="w-full space-y-1 rounded-md border bg-background p-3 text-sm sm:w-72">
          {readouts.map((r, i) => (
            <SlcReadout key={`${r.label}-${i}`} label={r.label}>
              <Latex latex={r.latex} />
            </SlcReadout>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION[mode]} />
      </p>
    </InteractiveFrame>
  );
}
