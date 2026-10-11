"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import type { tdgSpaceViewerSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  add,
  clamp,
  cross,
  dec,
  dist,
  dot,
  evalPlane,
  footOnLine,
  footOnPlane,
  isZero,
  len,
  linearLatex,
  linePair,
  mul,
  niceDir,
  normalOf,
  numLatex,
  perpendicularTo,
  planeLatex,
  planeMeet,
  ptLatex,
  rootLatex,
  sqrtLatex,
  sub,
  symmetricLatex,
  toDeg,
  toRad,
  unit,
  vectorFormLatex,
  type Plane,
  type V3,
} from "./tdg-geometry";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex, type VecColor } from "./vec-canvas-2d";

type Config = z.infer<typeof tdgSpaceViewerSchema>;
type Mode = Config["mode"];
type Show = NonNullable<Config["show"]>[number];
type SliderName = Config["sliders"][number]["name"];

const DEFAULT_SHOW: Record<Mode, Show[]> = {
  points: ["box"],
  line: ["general-point"],
  "two-lines": ["shortest-distance"],
  plane: ["normal", "foot"],
  "two-planes": ["intersection"],
  "line-plane": ["intersection"],
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  points: "Drag to rotate. Each coordinate is a signed distance from a coordinate plane; the dashed path walks along x, then y, then up z.",
  line: "Drag to rotate. Move λ and the point runs along the line; the dashed segment from P meets the line at a right angle.",
  "two-lines": "Drag to rotate until the two lines look as if they cross, then rotate again: skew lines only seem to meet. The short segment is the common perpendicular.",
  plane: "Drag to rotate. The arrow is the normal; P's foot is where the perpendicular from P pierces the plane.",
  "two-planes": "Drag to rotate. Look along the line of intersection and the angle between the planes appears as a plain angle between two edges.",
  "line-plane": "Drag to rotate. The line pierces the plane where its general point satisfies the plane's equation.",
};

const SLIDER_LABELS: Record<SliderName, string> = {
  px: "P_x",
  py: "P_y",
  pz: "P_z",
  d: "d",
};

const SIZE = 340;
const C = SIZE / 2;

type Readout = { key: string; latex: string; note?: string };

export function TdgSpaceViewer({ config }: { config: Config }) {
  const { mode } = config;
  const show = new Set<Show>(config.show ?? DEFAULT_SHOW[mode]);
  const [yaw, setYaw] = useState(config.initialView.yaw);
  const [pitch, setPitch] = useState(config.initialView.pitch);
  const [m, setM] = useState(config.m.initial);
  const [n, setN] = useState(config.n.initial);
  const [lambda, setLambda] = useState(config.lambda.initial);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.sliders.map((s) => [s.name, s.initial])),
  );
  const drag = useRef<{ x: number; y: number } | null>(null);

  const slider = (name: SliderName) => config.sliders.find((s) => s.name === name);
  const pick = (name: SliderName, fallback: number) => (slider(name) ? values[name] : fallback);

  // ---------- the objects ----------
  const A = config.a as V3;
  const B = config.b as V3;
  const Cpt = config.c as V3;
  const D = config.d as V3;
  const P: V3 = [pick("px", config.p[0]), pick("py", config.p[1]), pick("pz", config.p[2])];
  const plane: Plane = [config.plane[0], config.plane[1], config.plane[2], pick("d", config.plane[3])];
  const plane2 = config.plane2 as Plane;
  const usesP = mode === "line" || mode === "plane";
  const usesPlane = mode === "plane" || mode === "two-planes" || mode === "line-plane";

  // ---------- a fixed scale, so sliders never zoom the scene ----------
  const pReach = Math.hypot(
    ...(["px", "py", "pz"] as const).map((name, i) => {
      const s = slider(name);
      return s ? Math.max(Math.abs(s.min), Math.abs(s.max)) : Math.abs(config.p[i]);
    }),
  );
  const reachPts: number[] = [3];
  if (mode === "points") {
    reachPts.push(len(A), len(B));
    if (show.has("centroid")) reachPts.push(len(Cpt), len(D));
    if (show.has("section") && show.has("external")) {
      const ext = Math.max(config.m.max, config.n.max);
      reachPts.push(Math.min(len(A) + ext * dist(A, B), 14));
    }
  } else if (mode === "two-lines") {
    reachPts.push(len(A) + 1, len(Cpt) + 1);
  } else {
    reachPts.push(len(A) + (mode === "line" || mode === "line-plane" ? 1 : 0));
  }
  if (mode === "line-plane" && !isZero(B)) {
    const bn = dot(B, normalOf(config.plane as Plane));
    if (Math.abs(bn) > 1e-9) reachPts.push(len(add(A, mul(-evalPlane(config.plane as Plane, A) / bn, B))) + 1);
  }
  if (usesP) reachPts.push(pReach);
  const planeReach = (pl: Plane, dRange?: number) => {
    const nl = len(normalOf(pl));
    return nl < 1e-9 ? 0 : (dRange ?? Math.abs(pl[3])) / nl;
  };
  if (usesPlane) {
    const ds = slider("d");
    reachPts.push(planeReach(plane, ds ? Math.max(Math.abs(ds.min), Math.abs(ds.max)) : undefined) + 1);
    if (mode === "two-planes") reachPts.push(planeReach(plane2) + 1);
  }
  const reach = clamp(Math.max(...reachPts.filter(Number.isFinite)), 3, 14);
  const s = (C - 30) / reach;

  // ---------- projection (orthographic; right-handed, z up) ----------
  const yr = toRad(yaw);
  const pr = toRad(pitch);
  const right: V3 = [-Math.sin(yr), Math.cos(yr), 0];
  const up: V3 = [-Math.sin(pr) * Math.cos(yr), -Math.sin(pr) * Math.sin(yr), Math.cos(pr)];
  const proj = (q: V3) => [C + s * dot(q, right), C - s * dot(q, up)] as const;

  const O: V3 = [0, 0, 0];
  const scene: React.ReactNode[] = [];
  const push = (node: React.ReactNode) => scene.push(<g key={scene.length}>{node}</g>);

  const arrow = (from: V3, to: V3, color: VecColor, opts: { width?: number; dashed?: boolean; opacity?: number } = {}) => {
    const [x1, y1] = proj(from);
    const [x2, y2] = proj(to);
    return <ArrowSvg x1={x1} y1={y1} x2={x2} y2={y2} color={color} {...opts} />;
  };
  const seg = (from: V3, to: V3, cls: string, opts: { width?: number; dashed?: boolean } = {}) => {
    const [x1, y1] = proj(from);
    const [x2, y2] = proj(to);
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={cls}
        strokeWidth={opts.width ?? 1.2}
        strokeDasharray={opts.dashed ? "4 4" : undefined}
        strokeLinecap="round"
      />
    );
  };
  const dotAt = (at: V3, cls: string, r = 4) => {
    const [x, y] = proj(at);
    return <circle cx={x} cy={y} r={r} className={cls} />;
  };
  const label = (at: V3, latex: string, cls?: string, dx = 10, dy = -10) => {
    const [x0, y0] = proj(at);
    return <SvgLatex x={x0 + dx} y={y0 + dy} latex={latex} className={cls} />;
  };
  const poly = (pts: V3[], cls: string) => (
    <polygon points={pts.map((q) => proj(q).join(",")).join(" ")} className={cls} strokeWidth={1} />
  );

  /** The part of the line a + tb inside a ball around O (or a short piece near its closest point). */
  const lineEnds = (a: V3, b: V3, include: V3[] = []): [V3, V3] => {
    const bb = dot(b, b);
    const R = reach * 1.15;
    const t0 = -dot(a, b) / bb;
    const closest = add(a, mul(t0, b));
    const h2 = R * R - dot(closest, closest);
    const half = h2 > 0 ? Math.sqrt(h2 / bb) : (reach * 0.3) / Math.sqrt(bb);
    // Stretch the drawn piece to reach every point that must sit on it.
    let lo = -half;
    let hi = half;
    for (const q of include) {
      const t = dot(sub(q, closest), b) / bb;
      lo = Math.min(lo, t - 0.15 * half);
      hi = Math.max(hi, t + 0.15 * half);
    }
    return [add(closest, mul(lo, b)), add(closest, mul(hi, b))];
  };
  const drawLine = (a: V3, b: V3, cls: string, name: string, width = 2.5, include: V3[] = []) => {
    const [e1, e2] = lineEnds(a, b, [a, ...include]);
    push(seg(e1, e2, cls, { width }));
    push(label(e2, name, undefined, 8, -8));
  };

  /** A square patch of the plane centred at the projection of `near`. */
  const drawPlane = (pl: Plane, near: V3, cls: string, half: number) => {
    const f = footOnPlane(near, pl);
    if (!f) return null;
    const nh = unit(normalOf(pl));
    const u = perpendicularTo(nh);
    const v = cross(nh, u);
    const corner = (i: number, j: number) => add(f.foot, add(mul(i * half, u), mul(j * half, v)));
    push(poly([corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)], cls));
    return f.foot;
  };

  const rightAngle = (at: V3, dir1: V3, dir2: V3) => {
    const k = reach * 0.06;
    const p1 = add(at, mul(k, unit(dir1)));
    const p2 = add(at, mul(k, unit(dir2)));
    const p3 = add(p1, mul(k, unit(dir2)));
    return (
      <g>
        {seg(p1, p3, "stroke-foreground/60", { width: 1 })}
        {seg(p3, p2, "stroke-foreground/60", { width: 1 })}
      </g>
    );
  };

  // ---------- floor grid and axes ----------
  const G = Math.ceil(reach);
  const gStep = G > 8 ? 2 : 1;
  const grid: React.ReactNode[] = [];
  for (let i = -G; i <= G; i += gStep) {
    grid.push(<g key={`gx${i}`}>{seg([i, -G, 0], [i, G, 0], "stroke-border", { width: 0.6 })}</g>);
    grid.push(<g key={`gy${i}`}>{seg([-G, i, 0], [G, i, 0], "stroke-border", { width: 0.6 })}</g>);
  }
  const L = reach * 1.08;
  const axes = (
    <g>
      {seg([-0.45 * L, 0, 0], O, "stroke-foreground/30", { dashed: true })}
      {seg([0, -0.45 * L, 0], O, "stroke-foreground/30", { dashed: true })}
      {seg([0, 0, -0.45 * L], O, "stroke-foreground/30", { dashed: true })}
      {arrow(O, [L, 0, 0], "muted", { width: 1.2 })}
      {arrow(O, [0, L, 0], "muted", { width: 1.2 })}
      {arrow(O, [0, 0, L], "muted", { width: 1.2 })}
      {label([L, 0, 0], "x", "text-muted-foreground", 0, 12)}
      {label([0, L, 0], "y", "text-muted-foreground", 10, 0)}
      {label([0, 0, L], "z", "text-muted-foreground", 10, 0)}
    </g>
  );

  const lines: Readout[] = [];
  const say = (key: string, latex: string, note?: string) => lines.push({ key, latex, note });

  // ---------- points ----------
  if (mode === "points") {
    const box = (q: V3) => {
      const floor: V3 = [q[0], q[1], 0];
      push(seg(q, floor, "stroke-muted-foreground/70", { dashed: true }));
      push(seg(floor, [q[0], 0, 0], "stroke-muted-foreground/70", { dashed: true }));
      push(seg(floor, [0, q[1], 0], "stroke-muted-foreground/70", { dashed: true }));
    };
    if (show.has("box")) {
      box(A);
      box(B);
    }
    if (show.has("centroid")) {
      push(poly([A, B, Cpt], "fill-callout-info/15 stroke-callout-info/60"));
      [A, B, Cpt].forEach((q) => push(seg(q, D, "stroke-muted-foreground/60", { dashed: true })));
      const G3 = mul(1 / 3, add(add(A, B), Cpt));
      const G4 = mul(1 / 4, add(add(A, B), add(Cpt, D)));
      push(seg(D, G3, "stroke-callout-warning/70", { width: 1.2, dashed: true }));
      push(dotAt(Cpt, "fill-callout-info"));
      push(dotAt(D, "fill-callout-definition"));
      push(label(Cpt, "C"));
      push(label(D, "D"));
      push(dotAt(G3, "fill-callout-tip"));
      push(label(G3, "G", "text-callout-tip"));
      push(dotAt(G4, "fill-callout-warning"));
      push(label(G4, "G'", "text-callout-warning"));
      say("g3", `G_{ABC} = \\tfrac{A + B + C}{3} = ${ptLatex(G3)}`);
      say("g4", `G_{ABCD} = \\tfrac{A + B + C + D}{4} = ${ptLatex(G4)}`, "G' divides DG in 3 : 1");
    }
    push(seg(A, B, "stroke-primary", { width: 2.5 }));
    if (show.has("projections")) {
      const cls = ["stroke-callout-info", "stroke-callout-tip", "stroke-callout-warning"];
      for (let i = 0; i < 3; i++) {
        const e1: V3 = [0, 0, 0];
        const e2: V3 = [0, 0, 0];
        e1[i] = A[i];
        e2[i] = B[i];
        push(seg(e1, e2, cls[i], { width: 5 }));
        push(seg(A, e1, "stroke-foreground/20", { dashed: true }));
        push(seg(B, e2, "stroke-foreground/20", { dashed: true }));
      }
      const dlt = sub(B, A);
      say(
        "proj",
        `\\Delta x = ${numLatex(dlt[0])},\\ \\Delta y = ${numLatex(dlt[1])},\\ \\Delta z = ${numLatex(dlt[2])}`,
        "signed projections on the axes",
      );
      say("proj2", `AB^2 = \\Delta x^2 + \\Delta y^2 + \\Delta z^2 = ${numLatex(dot(dlt, dlt))}`);
    }
    if (show.has("section")) {
      const Ps = mul(1 / (m + n), add(mul(m, B), mul(n, A)));
      push(dotAt(Ps, "fill-callout-tip"));
      push(label(Ps, "P", "text-callout-tip", 10, 12));
      say("sec", `P = \\frac{${numLatex(m)}B + ${numLatex(n)}A}{${numLatex(m)} + ${numLatex(n)}} = ${ptLatex(Ps)}`, `AP : PB = ${dec(m)} : ${dec(n)}`);
      if (show.has("external")) {
        if (Math.abs(m - n) < 1e-9) {
          say("ext", "m = n:\\ \\text{no point divides } AB \\text{ externally}");
        } else {
          const Q = mul(1 / (m - n), sub(mul(m, B), mul(n, A)));
          push(seg(m > n ? B : A, Q, "stroke-primary/60", { width: 1.5, dashed: true }));
          push(dotAt(Q, "fill-callout-warning"));
          push(label(Q, "Q", "text-callout-warning", 10, 12));
          say("ext", `Q = \\frac{${numLatex(m)}B - ${numLatex(n)}A}{${numLatex(m)} - ${numLatex(n)}} = ${ptLatex(Q)}`, "external division");
        }
      }
    }
    push(dotAt(A, "fill-primary"));
    push(dotAt(B, "fill-primary"));
    push(label(A, "A"));
    push(label(B, "B"));
    say("pts", `A = ${ptLatex(A)},\\ B = ${ptLatex(B)}`);
    const d2 = dot(sub(B, A), sub(B, A));
    say("ab", `AB = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2} = ${rootLatex(d2)}`);
  }

  // ---------- line ----------
  if (mode === "line") {
    if (isZero(B)) {
      push(dotAt(A, "fill-primary"));
      push(label(A, "A"));
      say("bad", "\\vec b = \\vec 0 \\text{ has no direction: no line}");
    } else {
      const onLine: V3[] = [];
      if (show.has("general-point")) onLine.push(add(A, mul(lambda, B)));
      const fP = footOnLine(P, A, B);
      if (fP && (show.has("foot") || show.has("image"))) onLine.push(fP.foot);
      drawLine(A, B, "stroke-primary", "L", 2.5, onLine);
      push(arrow(A, add(A, mul(Math.min(reach * 0.35, len(B)) / len(B), B)), "b", { width: 2.5 }));
      push(dotAt(A, "fill-primary"));
      push(label(A, "A", undefined, -10, -10));
      say("vec", vectorFormLatex(A, B));
      say("cart", symmetricLatex(A, B));
      const u = unit(B);
      say("dc", `(l, m, n) = \\pm${ptLatex(u)}`, "direction cosines of the line");
      if (show.has("general-point")) {
        const Q = add(A, mul(lambda, B));
        push(dotAt(Q, "fill-callout-tip"));
        push(label(Q, "Q(\\lambda)", "text-callout-tip", 14, 12));
        say("gp", `Q(\\lambda) = ${ptLatex(Q)}`, `λ = ${dec(lambda)}; AQ = |λ||b| = ${dec(Math.abs(lambda) * len(B))}`);
      }
      const f = footOnLine(P, A, B);
      if (f && (show.has("foot") || show.has("image"))) {
        push(dotAt(P, "fill-callout-definition"));
        push(label(P, "P"));
        const distance = dist(P, f.foot);
        push(seg(P, f.foot, "stroke-callout-warning", { width: 2, dashed: true }));
        push(dotAt(f.foot, "fill-callout-warning"));
        push(label(f.foot, "F", "text-callout-warning", 10, 12));
        if (distance > 1e-9) push(rightAngle(f.foot, sub(P, f.foot), B));
        say("foot", `F = ${ptLatex(f.foot)}`, `λ = ${dec(f.lambda)} from (P − A)·b = 0`);
        say("dist", `PF = \\frac{\\lvert (P - A)\\times \\vec b\\rvert}{\\lvert \\vec b\\rvert} = ${rootLatex(distance * distance)}`);
        if (show.has("image")) {
          const img = sub(mul(2, f.foot), P);
          push(seg(f.foot, img, "stroke-callout-definition/60", { width: 1.5, dashed: true }));
          push(dotAt(img, "fill-callout-definition"));
          push(label(img, "P'", "text-callout-definition"));
          say("img", `P' = 2F - P = ${ptLatex(img)}`);
        }
      }
    }
  }

  // ---------- two lines ----------
  if (mode === "two-lines") {
    const pair = linePair(A, B, Cpt, D);
    const feet = pair.kind === "parallel" || pair.kind === "intersecting" || pair.kind === "skew" ? [pair.p, pair.q] : null;
    if (!isZero(B)) drawLine(A, B, "stroke-primary", "L_1", 2.5, feet ? [feet[0]] : []);
    if (!isZero(D)) drawLine(Cpt, D, "stroke-callout-info", "L_2", 2.5, feet ? [feet[1]] : []);
    push(dotAt(A, "fill-primary"));
    push(dotAt(Cpt, "fill-callout-info"));
    push(label(A, "A_1", undefined, -10, -10));
    push(label(Cpt, "A_2", "text-callout-info", -10, -10));
    say("l1", `L_1:\\ ${vectorFormLatex(A, B)}`);
    say("l2", `L_2:\\ ${vectorFormLatex(Cpt, D, "\\mu")}`);
    if (pair.kind === "degenerate") {
      say("bad", "\\text{a zero direction vector gives no line}");
    } else if (pair.kind === "coincident") {
      say("kind", "\\text{the two equations describe the same line}");
    } else {
      const n = cross(B, D);
      if (pair.kind === "parallel") {
        say("kind", "\\vec b_1 \\parallel \\vec b_2:\\ \\text{parallel lines}");
        say("sd", `d = \\frac{\\lvert (\\vec a_2 - \\vec a_1)\\times \\vec b\\rvert}{\\lvert \\vec b\\rvert} = ${rootLatex(pair.distance ** 2)}`);
      } else {
        const triple = dot(sub(Cpt, A), n);
        say("angle", `\\cos\\theta = \\frac{\\lvert \\vec b_1\\cdot\\vec b_2\\rvert}{\\lvert\\vec b_1\\rvert\\lvert\\vec b_2\\rvert}`, `θ = ${dec(pair.angle, 1)}°`);
        say("n", `\\vec b_1\\times\\vec b_2 = ${ptLatex(n)},\\ (\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2) = ${numLatex(triple)}`);
        if (pair.kind === "intersecting") {
          say("kind", "\\text{triple product } 0:\\ \\text{coplanar, so the lines intersect}");
          say("meet", `\\text{meeting point } ${ptLatex(pair.p)}`, `λ = ${dec(pair.lambda)}, μ = ${dec(pair.mu)}`);
          push(dotAt(pair.p, "fill-callout-tip", 5));
        } else {
          say("kind", "\\text{triple product} \\ne 0:\\ \\text{skew lines}");
          say("sd", `SD = \\frac{\\lvert (\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1\\times\\vec b_2)\\rvert}{\\lvert\\vec b_1\\times\\vec b_2\\rvert} = \\frac{${numLatex(Math.abs(triple))}}{${sqrtLatex(dot(n, n))}} = ${rootLatex(pair.distance ** 2)}`);
        }
      }
      if (show.has("shortest-distance") && pair.kind !== "intersecting") {
        push(seg(pair.p, pair.q, "stroke-callout-warning", { width: 3 }));
        push(dotAt(pair.p, "fill-callout-warning"));
        push(dotAt(pair.q, "fill-callout-warning"));
        push(label(pair.p, "P", "text-callout-warning", -10, 12));
        push(label(pair.q, "Q", "text-callout-warning", 10, 12));
        say("feet", `P = ${ptLatex(pair.p)},\\ Q = ${ptLatex(pair.q)}`, "feet of the common perpendicular");
      }
    }
  }

  // ---------- plane ----------
  const half = reach * 0.75;
  if (mode === "plane") {
    const nv = normalOf(plane);
    if (isZero(nv)) {
      say("bad", "a = b = c = 0:\\ \\text{not a plane}");
      push(dotAt(P, "fill-callout-definition"));
      push(label(P, "P"));
    } else {
      const nl = len(nv);
      const centre = drawPlane(plane, mul(0.5, P), "fill-callout-info/15 stroke-callout-info/50", half);
      const f0 = mul(-plane[3] / dot(nv, nv), nv);
      say("eq", planeLatex(plane), `normal n = (${nv.map((v) => dec(v)).join(", ")})`);
      const sgn = plane[3] > 0 ? -1 : 1;
      const p0 = Math.abs(plane[3]) / nl;
      say(
        "normal-form",
        `\\text{normal form: } ${linearLatex(mul(sgn / nl, nv), ["x", "y", "z"])} = ${numLatex(p0)}`,
        `distance from O = ${dec(p0)}`,
      );
      if (show.has("normal") && centre) {
        push(arrow(centre, add(centre, mul(reach * 0.4, unit(nv))), "result", { width: 2.5 }));
        push(label(add(centre, mul(reach * 0.4, unit(nv))), "\\vec n", "text-callout-tip"));
        if (p0 > 1e-9) {
          push(seg(O, f0, "stroke-foreground/50", { width: 1.2, dashed: true }));
          push(dotAt(f0, "fill-foreground", 3));
        }
      }
      if (show.has("intercepts")) {
        if (Math.abs(plane[3]) < 1e-9) {
          say("int", "\\text{the plane passes through } O:\\ \\text{no intercept triangle}");
        } else {
          const pts: V3[] = [];
          const names = ["x", "y", "z"];
          const parts: string[] = [];
          for (let i = 0; i < 3; i++) {
            if (Math.abs(nv[i]) > 1e-9) {
              const q: V3 = [0, 0, 0];
              q[i] = -plane[3] / nv[i];
              pts.push(q);
              push(dotAt(q, "fill-callout-info", 3.5));
              parts.push(`\\frac{${names[i]}}{${numLatex(q[i])}}`);
            }
          }
          if (pts.length === 3) push(poly(pts, "fill-callout-tip/20 stroke-callout-tip"));
          say("int", `${parts.join(" + ")} = 1`, pts.length === 3 ? "intercept form" : "parallel to an axis: that intercept is missing");
        }
      }
      push(dotAt(P, "fill-callout-definition"));
      push(label(P, "P"));
      const vp = evalPlane(plane, P);
      const vo = plane[3];
      const side =
        Math.abs(vp) < 1e-9 ? "P lies on the plane" : Math.abs(vo) < 1e-9 ? "O lies on the plane" : vp * vo > 0 ? "P and O are on the same side" : "P and O are on opposite sides";
      say("val", `P(x_1, y_1, z_1) = ${numLatex(vp)},\\ P(0, 0, 0) = ${numLatex(vo)}`, side);
      say("dist", `\\text{distance} = \\frac{\\lvert ${numLatex(vp)}\\rvert}{${sqrtLatex(dot(nv, nv))}} = ${rootLatex((vp * vp) / dot(nv, nv))}`);
      const f = footOnPlane(P, plane);
      if (f && (show.has("foot") || show.has("image"))) {
        push(seg(P, f.foot, "stroke-callout-warning", { width: 2, dashed: true }));
        push(dotAt(f.foot, "fill-callout-warning"));
        push(label(f.foot, "F", "text-callout-warning", 10, 12));
        say("foot", `F = P + t\\vec n,\\ t = -\\frac{P(x_1, y_1, z_1)}{a^2 + b^2 + c^2} = ${numLatex(f.t)}:\\ F = ${ptLatex(f.foot)}`);
        if (show.has("image")) {
          const img = sub(mul(2, f.foot), P);
          push(seg(f.foot, img, "stroke-callout-definition/60", { width: 1.5, dashed: true }));
          push(dotAt(img, "fill-callout-definition"));
          push(label(img, "P'", "text-callout-definition"));
          say("img", `P' = 2F - P = ${ptLatex(img)}`);
        }
      }
    }
  }

  // ---------- two planes ----------
  if (mode === "two-planes") {
    const n1 = normalOf(plane);
    const n2 = normalOf(plane2);
    say("eq1", `\\Pi_1:\\ ${planeLatex(plane)}`);
    say("eq2", `\\Pi_2:\\ ${planeLatex(plane2)}`);
    if (isZero(n1) || isZero(n2)) {
      say("bad", "\\text{a zero normal does not give a plane}");
    } else {
      const meet = planeMeet(plane, plane2);
      const near = meet ? meet.point : O;
      drawPlane(plane, near, "fill-callout-info/15 stroke-callout-info/50", half);
      drawPlane(plane2, near, "fill-callout-tip/15 stroke-callout-tip/50", half);
      const cosT = Math.abs(dot(n1, n2)) / (len(n1) * len(n2));
      say("ang", `\\cos\\theta = \\frac{\\lvert \\vec n_1\\cdot\\vec n_2\\rvert}{\\lvert\\vec n_1\\rvert\\lvert\\vec n_2\\rvert} = \\frac{${numLatex(Math.abs(dot(n1, n2)))}}{${sqrtLatex(dot(n1, n1))}\\,${sqrtLatex(dot(n2, n2))}}`, `θ = ${dec(toDeg(Math.acos(clamp(cosT, 0, 1))), 1)}°`);
      if (meet) {
        if (show.has("intersection")) {
          const [e1, e2] = lineEnds(meet.point, meet.dir);
          push(seg(e1, e2, "stroke-callout-warning", { width: 3 }));
        }
        say("line", `\\text{line of intersection: } ${symmetricLatex(meet.point, niceDir(meet.dir))}`, "direction n₁ × n₂");
      } else {
        const k = dot(n2, n1) / dot(n1, n1);
        const gap = Math.abs(plane[3] - plane2[3] / k) / len(n1);
        say("par", gap < 1e-9 ? "\\text{the same plane}" : `\\text{parallel planes, gap } \\frac{\\lvert d_1 - d_2\\rvert}{\\lvert\\vec n\\rvert} = ${rootLatex(gap * gap)}`, "match the normals before comparing constants");
      }
    }
  }

  // ---------- line and plane ----------
  if (mode === "line-plane") {
    const nv = normalOf(plane);
    say("eq", `\\Pi:\\ ${planeLatex(plane)}`);
    if (isZero(nv) || isZero(B)) {
      say("bad", "\\text{need a non-zero direction and a non-zero normal}");
      push(dotAt(A, "fill-primary"));
    } else {
      say("vec", `L:\\ ${vectorFormLatex(A, B)}`);
      const bn = dot(B, nv);
      const sinPhi = Math.abs(bn) / (len(B) * len(nv));
      const parallel = Math.abs(bn) < 1e-9;
      const t = parallel ? 0 : -evalPlane(plane, A) / bn;
      const M = add(A, mul(t, B));
      drawPlane(plane, parallel ? A : M, "fill-callout-info/15 stroke-callout-info/50", half);
      drawLine(A, B, "stroke-primary", "L", 2.5, parallel ? [] : [M]);
      push(dotAt(A, "fill-primary"));
      push(label(A, "A", undefined, -10, -10));
      say("sin", `\\sin\\phi = \\frac{\\lvert\\vec b\\cdot\\vec n\\rvert}{\\lvert\\vec b\\rvert\\lvert\\vec n\\rvert} = ${dec(sinPhi, 3)}`, `φ = ${dec(toDeg(Math.asin(clamp(sinPhi, 0, 1))), 1)}°`);
      if (parallel) {
        const gap = Math.abs(evalPlane(plane, A)) / len(nv);
        say("par", gap < 1e-9 ? "\\vec b\\cdot\\vec n = 0 \\text{ and } A \\text{ is on the plane: the line lies in it}" : `\\vec b\\cdot\\vec n = 0:\\ \\text{parallel, at distance } ${rootLatex(gap * gap)}`);
      } else {
        say("meet", `\\lambda = -\\frac{P(\\vec a)}{\\vec b\\cdot\\vec n} = ${numLatex(t)}:\\ M = ${ptLatex(M)}`, "meeting point");
        if (show.has("intersection")) {
          push(dotAt(M, "fill-callout-tip", 5));
          push(label(M, "M", "text-callout-tip", 10, 12));
        }
      }
      if (show.has("projection")) {
        const fa = footOnPlane(A, plane);
        if (fa) {
          push(seg(A, fa.foot, "stroke-foreground/40", { dashed: true }));
          push(dotAt(fa.foot, "fill-callout-warning", 3));
          const bProj = sub(B, mul(bn / dot(nv, nv), nv));
          if (isZero(bProj, 1e-9)) {
            say("proj", "L \\perp \\Pi:\\ \\text{the projection is the single point } " + ptLatex(fa.foot));
          } else {
            const [e1, e2] = lineEnds(fa.foot, bProj);
            push(seg(e1, e2, "stroke-callout-warning", { width: 2, dashed: true }));
            say("proj", `\\text{projection: } ${symmetricLatex(fa.foot, niceDir(bProj))}`, "through the foot of A, along b minus its normal part");
          }
        }
      }
    }
  }

  const resetView = () => {
    setYaw(config.initialView.yaw);
    setPitch(config.initialView.pitch);
  };

  const showSection = mode === "points" && show.has("section");
  const showLambda = mode === "line" && show.has("general-point") && !isZero(B);

  return (
    <InteractiveFrame title="Lines and planes in space">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-sm cursor-grab select-none rounded-md border bg-background active:cursor-grabbing"
        style={{ touchAction: "none" }}
        role="img"
        tabIndex={0}
        aria-label="3D diagram of points, lines and planes. Drag or use arrow keys to rotate."
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerMove={(e) => {
          const last = drag.current;
          if (!last) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const k = (SIZE / rect.width) * 0.6;
          setYaw((v) => v - (e.clientX - last.x) * k);
          setPitch((v) => clamp(v + (e.clientY - last.y) * k, -89, 89));
          drag.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setYaw((v) => v + 5);
          else if (e.key === "ArrowRight") setYaw((v) => v - 5);
          else if (e.key === "ArrowUp") setPitch((v) => clamp(v - 5, -89, 89));
          else if (e.key === "ArrowDown") setPitch((v) => clamp(v + 5, -89, 89));
          else return;
          e.preventDefault();
        }}
      >
        {grid}
        {axes}
        {scene}
        <circle cx={C} cy={C} r={2.5} className="fill-foreground" />
      </svg>

      {(showSection || showLambda || config.sliders.length > 0) && (
        <div className="space-y-2">
          {showSection && (
            <>
              <SliderRow label={<Latex latex="m" />} value={m} min={config.m.min} max={config.m.max} step={config.m.step} onChange={setM} />
              <SliderRow label={<Latex latex="n" />} value={n} min={config.n.min} max={config.n.max} step={config.n.step} onChange={setN} />
            </>
          )}
          {showLambda && (
            <SliderRow
              label={<Latex latex={"\\lambda"} />}
              value={lambda}
              min={config.lambda.min}
              max={config.lambda.max}
              step={config.lambda.step}
              onChange={setLambda}
            />
          )}
          {config.sliders.map((sl) => (
            <SliderRow
              key={sl.name}
              label={<Latex latex={SLIDER_LABELS[sl.name]} />}
              value={values[sl.name]}
              min={sl.min}
              max={sl.max}
              step={sl.step}
              onChange={(v) => setValues((prev) => ({ ...prev, [sl.name]: v }))}
            />
          ))}
        </div>
      )}

      <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
        {lines.map((l) => (
          <div key={l.key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="max-w-full overflow-x-auto">
              <Latex latex={l.latex} />
            </span>
            {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
          </div>
        ))}
      </div>

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          <RichText text={config.caption ?? DEFAULT_CAPTIONS[mode]} />
        </p>
        <button type="button" onClick={resetView} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
          Reset view
        </button>
      </div>
    </InteractiveFrame>
  );
}
