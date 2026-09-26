"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import type { vecCanvas2dSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof vecCanvas2dSchema>;
type Mode = Config["mode"];
type Handle = "a" | "b" | "c" | "tail";
type Readout = NonNullable<Config["readouts"]>[number];
type V2 = [number, number];

// ---------- shared vector drawing helpers (also used by vec-space-3d) ----------

/** Literal class names per role so Tailwind can see them. */
export const VEC_COLORS = {
  a: { stroke: "stroke-primary", fill: "fill-primary" },
  b: { stroke: "stroke-callout-info", fill: "fill-callout-info" },
  c: { stroke: "stroke-callout-definition", fill: "fill-callout-definition" },
  result: { stroke: "stroke-callout-tip", fill: "fill-callout-tip" },
  aux: { stroke: "stroke-callout-warning", fill: "fill-callout-warning" },
  muted: { stroke: "stroke-muted-foreground", fill: "fill-muted-foreground" },
} as const;
export type VecColor = keyof typeof VEC_COLORS;

export const fmt = (v: number) => formatNumber(v, 2);

const UNIT_LATEX = ["\\hat i", "\\hat j", "\\hat k"];

/** 3\hat i - 2\hat j (+ z\hat k): the component form CBSE writes. */
export function compLatex(v: readonly number[]): string {
  let out = "";
  v.forEach((raw, i) => {
    const x = Number(raw.toFixed(2));
    if (x === 0) return;
    const abs = Math.abs(x);
    const coef = abs === 1 ? "" : formatNumber(abs, 2);
    if (out === "") out = `${x < 0 ? "-" : ""}${coef}${UNIT_LATEX[i]}`;
    else out += `${x < 0 ? " - " : " + "}${coef}${UNIT_LATEX[i]}`;
  });
  return out || "\\vec 0";
}

/** (3,\, -2) */
export function tupleLatex(v: readonly number[]): string {
  return `(${v.map(fmt).join(",\\,")})`;
}

/** Simplest surd for sqrt(n) when n is a whole number, e.g. 50 -> 5\sqrt{2}. */
export function surdLatex(n: number): string | null {
  if (!Number.isInteger(n) || n < 0) return null;
  const root = Math.round(Math.sqrt(n));
  if (root * root === n) return String(root);
  for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
    if (n % (k * k) === 0) return `${k}\\sqrt{${n / (k * k)}}`;
  }
  return `\\sqrt{${n}}`;
}

/** Length of v: exact surd when the components are whole numbers, plus a decimal. */
export function magLatex(v: readonly number[]): string {
  const sq = v.reduce((s, x) => s + x * x, 0);
  const whole = v.every((x) => Math.abs(x - Math.round(x)) < 1e-9);
  const exact = whole ? surdLatex(Math.round(sq)) : null;
  const dec = fmt(Math.sqrt(sq));
  if (exact === null || exact === dec) return dec;
  return `${exact} \\approx ${dec}`;
}

/** k·name with the 1 / -1 / sign cases written the way people write them. */
function coefName(k: number, name: string): string {
  const r = Number(k.toFixed(2));
  if (r === 1) return name;
  if (r === -1) return `-${name}`;
  return `${fmt(r)}${name}`;
}

/** KaTeX label placed inside an SVG, centred on (x, y) in viewBox units. */
export function SvgLatex({
  x,
  y,
  latex,
  className,
}: {
  x: number;
  y: number;
  latex: string;
  className?: string;
}) {
  return (
    <foreignObject
      x={x - 60}
      y={y - 12}
      width={120}
      height={24}
      pointerEvents="none"
      style={{ overflow: "visible" }}
    >
      <div
        className={`flex h-full w-full items-center justify-center text-[12px] leading-none ${
          className ?? "text-foreground"
        }`}
      >
        <Latex latex={latex} />
      </div>
    </foreignObject>
  );
}

/** Arrow between two points in screen (viewBox) coordinates. */
export function ArrowSvg({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 2.5,
  dashed = false,
  opacity,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: VecColor;
  width?: number;
  dashed?: boolean;
  opacity?: number;
}) {
  const c = VEC_COLORS[color];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1) {
    return <circle cx={x1} cy={y1} r={3.5} className={c.fill} opacity={opacity} />;
  }
  const head = Math.min(8 + width * 1.2, len * 0.5);
  const half = head * 0.5;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x2 - ux * head;
  const by = y2 - uy * head;
  return (
    <g opacity={opacity}>
      <line
        x1={x1}
        y1={y1}
        x2={bx + ux * 1}
        y2={by + uy * 1}
        className={c.stroke}
        strokeWidth={width}
        strokeDasharray={dashed ? "6 4" : undefined}
        strokeLinecap="round"
      />
      <polygon
        points={`${x2},${y2} ${bx - uy * half},${by + ux * half} ${bx + uy * half},${by - ux * half}`}
        className={c.fill}
      />
    </g>
  );
}

// ---------- 2D vector arithmetic ----------

const add = (p: V2, q: V2): V2 => [p[0] + q[0], p[1] + q[1]];
const sub = (p: V2, q: V2): V2 => [p[0] - q[0], p[1] - q[1]];
const mul = (k: number, p: V2): V2 => [k * p[0], k * p[1]];
const dot = (p: V2, q: V2) => p[0] * q[0] + p[1] * q[1];
const len = (p: V2) => Math.hypot(p[0], p[1]);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const same = (p: V2, q: V2) => Math.abs(p[0] - q[0]) < 1e-9 && Math.abs(p[1] - q[1]) < 1e-9;

/** Direction angle from +x, in [0, 360). */
function directionDeg(v: V2): number {
  const d = (Math.atan2(v[1], v[0]) * 180) / Math.PI;
  return (d + 360) % 360;
}

function angleBetweenDeg(p: V2, q: V2): number | null {
  const l = len(p) * len(q);
  if (l < 1e-12) return null;
  return (Math.acos(clamp(dot(p, q) / l, -1, 1)) * 180) / Math.PI;
}

const DEFAULT_DRAGGABLE: Record<Mode, Handle[]> = {
  free: ["tail", "a"],
  add: ["a", "b"],
  subtract: ["a", "b"],
  scale: ["a"],
  position: ["a", "b"],
  components: ["a"],
  section: ["a", "b"],
  triangle: ["a", "b", "c"],
  combination: ["a", "b"],
  dot: ["a", "b"],
};

const DEFAULT_READOUTS: Record<Mode, Readout[]> = {
  free: ["components", "magnitude", "angle"],
  add: ["components", "magnitude", "sum"],
  subtract: ["components", "magnitude"],
  scale: ["components", "magnitude"],
  position: ["components", "magnitude"],
  components: ["components", "magnitude", "angle"],
  section: ["components", "ratio"],
  triangle: ["components", "ratio"],
  combination: ["components", "sum"],
  dot: ["dot", "angle", "projection"],
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  free: "Drag the hollow tail: the arrow slides but its length and direction never change. Drag the tip to make a different vector.",
  add: "Drag either tip. The green arrow runs from the first tail to the last tip.",
  subtract: "a − b is the arrow from the tip of b to the tip of a: end minus start.",
  scale: "Slide k through zero and watch the arrow shrink, vanish and flip.",
  position: "Drag A and B. The arrow from A to B is always b − a: tip minus tail.",
  components: "Every arrow is some steps along x plus some steps along y.",
  section: "Change m and n. The nearer point gets the bigger weight.",
  triangle: "Drag the vertices. The medians always meet at one point, two-thirds of the way down each.",
  combination: "Change x and y: can you reach every point on the grid?",
  dot: "Drag b around a. The shadow of b on a, times |a|, is the dot product; it changes sign at 90°.",
};

const W = 400;

export function VecCanvas2d({ config }: { config: Config }) {
  const { window: win, mode } = config;
  const u = W / (win.xmax - win.xmin);
  const H = (win.ymax - win.ymin) * u;
  const sx = (x: number) => (x - win.xmin) * u;
  const sy = (y: number) => H - (y - win.ymin) * u;

  const [a, setA] = useState<V2>(config.a);
  const [b, setB] = useState<V2>(config.b);
  const [c, setC] = useState<V2>(config.c);
  const [tail, setTail] = useState<V2>(config.tail);
  const [k, setK] = useState(config.scalar.initial);
  const [m, setM] = useState(config.ratio.m.initial);
  const [n, setN] = useState(config.ratio.n.initial);
  const [external, setExternal] = useState(config.ratio.external);
  const [cx, setCx] = useState(config.combo.x.initial);
  const [cy, setCy] = useState(config.combo.y.initial);
  const [dragging, setDragging] = useState<Handle | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const draggable = config.draggable ?? DEFAULT_DRAGGABLE[mode];
  const readouts = config.readouts ?? DEFAULT_READOUTS[mode];
  const pointMode = mode === "position" || mode === "section" || mode === "triangle";
  const nameA = config.labels.a ?? (pointMode ? "A" : "\\vec a");
  const nameB = config.labels.b ?? (pointMode ? "B" : "\\vec b");
  const nameC = config.labels.c ?? (pointMode ? "C" : "\\vec c");
  // Position-vector names for point modes: A -> \vec a.
  const posName = (label: string, fallback: string) =>
    /^[A-Z]$/.test(label) ? `\\vec ${label.toLowerCase()}` : fallback;
  const pa = posName(nameA, "\\vec a");
  const pb = posName(nameB, "\\vec b");
  const pc = posName(nameC, "\\vec c");

  const handlePos: Record<Handle, V2> = {
    a: mode === "free" ? add(tail, a) : a,
    b: mode === "add" ? add(a, b) : b,
    c,
    tail,
  };

  const quantise = (v: number) => (config.snap ? Math.round(v) : Math.round(v * 10) / 10);

  function moveHandle(h: Handle, world: V2) {
    const p: V2 = [
      clamp(quantise(world[0]), win.xmin, win.xmax),
      clamp(quantise(world[1]), win.ymin, win.ymax),
    ];
    if (h === "a") setA(mode === "free" ? sub(p, tail) : p);
    else if (h === "b") setB(mode === "add" ? sub(p, a) : p);
    else if (h === "c") setC(p);
    else {
      // Keep the whole arrow on the canvas while its tail slides.
      setTail([
        clamp(quantise(world[0]), Math.max(win.xmin, win.xmin - a[0]), Math.min(win.xmax, win.xmax - a[0])),
        clamp(quantise(world[1]), Math.max(win.ymin, win.ymin - a[1]), Math.min(win.ymax, win.ymax - a[1])),
      ]);
    }
  }

  function worldFromEvent(e: React.PointerEvent<SVGSVGElement>): V2 {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    return [win.xmin + px / u, win.ymin + (H - py) / u];
  }

  function reset() {
    setA(config.a);
    setB(config.b);
    setC(config.c);
    setTail(config.tail);
    setK(config.scalar.initial);
    setM(config.ratio.m.initial);
    setN(config.ratio.n.initial);
    setExternal(config.ratio.external);
    setCx(config.combo.x.initial);
    setCy(config.combo.y.initial);
  }

  // ---------- drawing helpers in world coordinates ----------
  const arrow = (
    from: V2,
    to: V2,
    color: VecColor,
    opts: { width?: number; dashed?: boolean; opacity?: number; key?: string } = {},
  ) => (
    <ArrowSvg
      key={opts.key}
      x1={sx(from[0])}
      y1={sy(from[1])}
      x2={sx(to[0])}
      y2={sy(to[1])}
      color={color}
      width={opts.width}
      dashed={opts.dashed}
      opacity={opts.opacity}
    />
  );
  /** Label beside the middle of an arrow, on its left (side 1) or right (side -1). */
  const arrowLabel = (from: V2, to: V2, latex: string, side = 1, key?: string) => {
    const x1 = sx(from[0]);
    const y1 = sy(from[1]);
    const x2 = sx(to[0]);
    const y2 = sy(to[1]);
    const l = Math.hypot(x2 - x1, y2 - y1) || 1;
    const nx = ((y2 - y1) / l) * side;
    const ny = (-(x2 - x1) / l) * side;
    return <SvgLatex key={key} x={(x1 + x2) / 2 + nx * 14} y={(y1 + y2) / 2 + ny * 14} latex={latex} />;
  };
  const pointLabel = (p: V2, latex: string, key?: string) => (
    <SvgLatex key={key} x={sx(p[0]) + 12} y={sy(p[1]) - 12} latex={latex} />
  );
  const dotAt = (p: V2, color: VecColor, key?: string, r = 4) => (
    <circle key={key} cx={sx(p[0])} cy={sy(p[1])} r={r} className={VEC_COLORS[color].fill} />
  );
  const seg = (p: V2, q: V2, cls: string, opts: { width?: number; dashed?: boolean; key?: string } = {}) => (
    <line
      key={opts.key}
      x1={sx(p[0])}
      y1={sy(p[1])}
      x2={sx(q[0])}
      y2={sy(q[1])}
      className={cls}
      strokeWidth={opts.width ?? 1.5}
      strokeDasharray={opts.dashed ? "5 4" : undefined}
      strokeLinecap="round"
    />
  );

  const O: V2 = [0, 0];
  const origin = (
    <g key="origin">
      <circle cx={sx(0)} cy={sy(0)} r={2.5} className="fill-foreground" />
      <SvgLatex x={sx(0) - 10} y={sy(0) + 12} latex="O" className="text-muted-foreground" />
    </g>
  );

  // ---------- derived quantities ----------
  const sectionP: V2 | null = (() => {
    if (external) {
      if (m === n) return null;
      return mul(1 / (m - n), sub(mul(m, b), mul(n, a)));
    }
    if (m + n === 0) return null;
    return mul(1 / (m + n), add(mul(n, a), mul(m, b)));
  })();
  const centroid: V2 = mul(1 / 3, add(add(a, b), c));
  const comboResult: V2 = add(mul(cx, a), mul(cy, b));
  const parallelAB = Math.abs(a[0] * b[1] - a[1] * b[0]) < 1e-9;
  const aa = dot(a, a);
  const projFoot: V2 = aa > 1e-12 ? mul(dot(a, b) / aa, a) : O;
  const dotValue = dot(a, b);
  const signColor: VecColor = Math.abs(dotValue) < 1e-9 ? "muted" : dotValue > 0 ? "result" : "aux";

  // ---------- the scene ----------
  const scene: React.ReactNode[] = [];
  switch (mode) {
    case "free": {
      const tip = add(tail, a);
      if (!same(tail, O)) {
        scene.push(arrow(O, a, "muted", { dashed: true, opacity: 0.45, key: "ghost" }));
      }
      scene.push(origin);
      scene.push(arrow(tail, tip, "a", { key: "a" }));
      scene.push(arrowLabel(tail, tip, nameA, 1, "la"));
      break;
    }
    case "add": {
      const s = add(a, b);
      if (config.showParallelogram) {
        scene.push(arrow(O, b, "b", { dashed: true, opacity: 0.45, key: "pb" }));
        scene.push(arrow(b, s, "a", { dashed: true, opacity: 0.45, key: "pa" }));
      }
      scene.push(origin);
      scene.push(arrow(O, s, "result", { width: 3, key: "s" }));
      scene.push(arrow(O, a, "a", { key: "a" }));
      scene.push(arrow(a, s, "b", { key: "b" }));
      scene.push(arrowLabel(O, a, nameA, 1, "la"));
      scene.push(arrowLabel(a, s, nameB, 1, "lb"));
      scene.push(arrowLabel(O, s, `${nameA} + ${nameB}`, -1, "ls"));
      break;
    }
    case "subtract": {
      const d = sub(a, b);
      scene.push(arrow(O, d, "aux", { dashed: true, opacity: 0.4, key: "ghost" }));
      scene.push(origin);
      scene.push(arrow(O, a, "a", { key: "a" }));
      scene.push(arrow(O, b, "b", { key: "b" }));
      scene.push(arrow(b, a, "aux", { width: 3, key: "d" }));
      scene.push(arrowLabel(O, a, nameA, -1, "la"));
      scene.push(arrowLabel(O, b, nameB, 1, "lb"));
      scene.push(arrowLabel(b, a, `${nameA} - ${nameB}`, 1, "ld"));
      break;
    }
    case "scale": {
      const ka = mul(k, a);
      scene.push(origin);
      scene.push(arrow(O, ka, "result", { width: 6, opacity: 0.55, key: "ka" }));
      scene.push(arrow(O, a, "a", { key: "a" }));
      scene.push(arrowLabel(O, a, nameA, 1, "la"));
      if (Math.abs(k) > 1e-9) scene.push(arrowLabel(O, ka, coefName(k, nameA), -1, "lka"));
      break;
    }
    case "position": {
      scene.push(origin);
      scene.push(arrow(O, a, "a", { width: 1.5, opacity: 0.8, key: "oa" }));
      scene.push(arrow(O, b, "b", { width: 1.5, opacity: 0.8, key: "ob" }));
      scene.push(arrow(a, b, "result", { width: 3, key: "ab" }));
      scene.push(arrowLabel(O, a, pa, 1, "la"));
      scene.push(arrowLabel(O, b, pb, -1, "lb"));
      scene.push(arrowLabel(a, b, `\\overrightarrow{${nameA}${nameB}}`, 1, "lab"));
      scene.push(pointLabel(a, nameA, "pA"), pointLabel(b, nameB, "pB"));
      break;
    }
    case "components": {
      const foot: V2 = [a[0], 0];
      scene.push(origin);
      scene.push(arrow(O, foot, "b", { key: "x" }));
      scene.push(arrow(foot, a, "result", { key: "y" }));
      scene.push(arrow(O, a, "a", { width: 3, key: "a" }));
      if (Math.abs(a[0]) > 1e-9) scene.push(arrowLabel(O, foot, coefName(a[0], "\\hat i"), a[1] >= 0 ? -1 : 1, "lx"));
      if (Math.abs(a[1]) > 1e-9) scene.push(arrowLabel(foot, a, coefName(a[1], "\\hat j"), a[0] >= 0 ? -1 : 1, "ly"));
      scene.push(arrowLabel(O, a, nameA, a[0] * a[1] >= 0 ? 1 : -1, "la"));
      break;
    }
    case "section": {
      const dir = sub(b, a);
      if (external && len(dir) > 1e-9) {
        const far = 4 * (win.xmax - win.xmin + win.ymax - win.ymin);
        const unit = mul(1 / len(dir), dir);
        scene.push(seg(sub(a, mul(far, unit)), add(a, mul(far, unit)), "stroke-muted-foreground/50", { dashed: true, key: "line" }));
      }
      scene.push(seg(a, b, "stroke-foreground/60", { width: 2, key: "ab" }));
      scene.push(origin);
      scene.push(arrow(O, a, "a", { width: 1.5, dashed: true, opacity: 0.6, key: "oa" }));
      scene.push(arrow(O, b, "b", { width: 1.5, dashed: true, opacity: 0.6, key: "ob" }));
      if (sectionP) {
        scene.push(seg(a, sectionP, "stroke-callout-tip", { width: 4, key: "ap" }));
        scene.push(seg(sectionP, b, "stroke-callout-info", { width: 4, key: "pb" }));
        scene.push(arrow(O, sectionP, "aux", { width: 2, key: "op" }));
        scene.push(arrowLabel(O, sectionP, "\\vec p", -1, "lp"));
        scene.push(arrowLabel(a, sectionP, fmt(m), 1, "lm"));
        scene.push(arrowLabel(sectionP, b, fmt(n), 1, "ln"));
        scene.push(dotAt(sectionP, "aux", "P", 5));
        scene.push(pointLabel(sectionP, "P", "pP"));
      }
      scene.push(pointLabel(a, nameA, "pA"), pointLabel(b, nameB, "pB"));
      break;
    }
    case "triangle": {
      const D = mul(0.5, add(b, c));
      const E = mul(0.5, add(c, a));
      const F = mul(0.5, add(a, b));
      scene.push(
        <polygon
          key="tri"
          points={[a, b, c].map((p) => `${sx(p[0])},${sy(p[1])}`).join(" ")}
          className="fill-callout-definition/5 stroke-foreground/60"
          strokeWidth={2}
        />,
      );
      scene.push(seg(a, D, "stroke-muted-foreground", { dashed: true, key: "md" }));
      scene.push(seg(b, E, "stroke-muted-foreground", { dashed: true, key: "me" }));
      scene.push(seg(c, F, "stroke-muted-foreground", { dashed: true, key: "mf" }));
      scene.push(seg(a, centroid, "stroke-callout-tip", { width: 4, key: "ag" }));
      scene.push(seg(centroid, D, "stroke-callout-warning", { width: 4, key: "gd" }));
      scene.push(origin);
      scene.push(arrow(O, centroid, "result", { width: 1.5, dashed: true, opacity: 0.7, key: "og" }));
      scene.push(dotAt(D, "muted", "D", 3), dotAt(E, "muted", "E", 3), dotAt(F, "muted", "F", 3));
      scene.push(pointLabel(D, "D", "lD"), pointLabel(E, "E", "lE"), pointLabel(F, "F", "lF"));
      scene.push(dotAt(centroid, "result", "G", 5));
      scene.push(pointLabel(centroid, "G", "lG"));
      scene.push(pointLabel(a, nameA, "pA"), pointLabel(b, nameB, "pB"), pointLabel(c, nameC, "pC"));
      break;
    }
    case "combination": {
      if (!parallelAB) {
        const far = 4 * (win.xmax - win.xmin + win.ymax - win.ymin);
        const N = 14;
        for (let i = -N; i <= N; i++) {
          const pa0 = mul(i, a);
          const pb0 = mul(i, b);
          scene.push(seg(sub(pa0, mul(far / (len(b) || 1), b)), add(pa0, mul(far / (len(b) || 1), b)), "stroke-callout-info/20", { width: 1, key: `lb${i}` }));
          scene.push(seg(sub(pb0, mul(far / (len(a) || 1), a)), add(pb0, mul(far / (len(a) || 1), a)), "stroke-primary/20", { width: 1, key: `la${i}` }));
        }
      }
      const xa = mul(cx, a);
      scene.push(origin);
      scene.push(arrow(O, xa, "a", { width: 3, opacity: 0.55, key: "xa" }));
      scene.push(arrow(xa, comboResult, "b", { width: 3, opacity: 0.55, key: "yb" }));
      scene.push(arrow(O, comboResult, "result", { width: 3, key: "r" }));
      scene.push(arrow(O, a, "a", { width: 2, key: "a" }));
      scene.push(arrow(O, b, "b", { width: 2, key: "b" }));
      scene.push(arrowLabel(O, a, nameA, 1, "la"));
      scene.push(arrowLabel(O, b, nameB, -1, "lb"));
      scene.push(pointLabel(comboResult, `${coefName(cx, nameA)} ${cy < 0 ? "-" : "+"} ${coefName(Math.abs(cy), nameB)}`, "lr"));
      break;
    }
    case "dot": {
      if (aa > 1e-12) {
        const far = 4 * (win.xmax - win.xmin + win.ymax - win.ymin) / Math.sqrt(aa);
        scene.push(seg(mul(-far, a), mul(far, a), "stroke-muted-foreground/40", { dashed: true, key: "line" }));
      }
      if (config.showProjection && aa > 1e-12) {
        if (!config.showPerpendicular) {
          scene.push(seg(O, projFoot, VEC_COLORS[signColor].stroke, { width: 7, key: "shadow" }));
        }
        scene.push(seg(b, projFoot, "stroke-muted-foreground", { dashed: true, key: "drop" }));
      }
      scene.push(origin);
      // Angle arc (or right-angle mark) between a and b.
      const theta = angleBetweenDeg(a, b);
      if (theta !== null) {
        const ra = 26;
        const pa0 = Math.atan2(a[1], a[0]);
        let diff = Math.atan2(b[1], b[0]) - pa0;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        if (Math.abs(theta - 90) < 1e-6) {
          const ua: V2 = mul(12 / u / len(a), a);
          const ub: V2 = mul(12 / u / len(b), b);
          scene.push(
            <polyline
              key="right"
              points={[ua, add(ua, ub), ub].map((p) => `${sx(p[0])},${sy(p[1])}`).join(" ")}
              fill="none"
              className="stroke-foreground/70"
              strokeWidth={1.5}
            />,
          );
        } else {
          const pts: string[] = [];
          for (let i = 0; i <= 24; i++) {
            const t = pa0 + (diff * i) / 24;
            pts.push(`${sx(0) + ra * Math.cos(t)},${sy(0) - ra * Math.sin(t)}`);
          }
          scene.push(<polyline key="arc" points={pts.join(" ")} fill="none" className="stroke-foreground/70" strokeWidth={1.5} />);
        }
        const mid = pa0 + diff / 2;
        scene.push(<SvgLatex key="theta" x={sx(0) + 42 * Math.cos(mid)} y={sy(0) - 42 * Math.sin(mid)} latex="\theta" />);
      }
      if (config.showProjection && config.showPerpendicular && aa > 1e-12) {
        scene.push(arrow(O, projFoot, "result", { width: 3, key: "par" }));
        scene.push(arrow(projFoot, b, "c", { width: 3, key: "perp" }));
        scene.push(arrowLabel(O, projFoot, `${nameB}_{\\parallel}`, -1, "lpar"));
        scene.push(arrowLabel(projFoot, b, `${nameB}_{\\perp}`, -1, "lperp"));
      }
      scene.push(arrow(O, a, "a", { key: "a" }));
      scene.push(arrow(O, b, "b", { key: "b" }));
      scene.push(arrowLabel(O, a, nameA, 1, "la"));
      scene.push(arrowLabel(O, b, nameB, 1, "lb"));
      break;
    }
  }

  // ---------- readout rows ----------
  type Row = { name: string; short: string; v: V2 };
  const rows: Row[] = (() => {
    switch (mode) {
      case "free":
      case "components":
        return [{ name: nameA, short: nameA, v: a }];
      case "add":
        return [
          { name: nameA, short: nameA, v: a },
          { name: nameB, short: nameB, v: b },
          { name: `${nameA} + ${nameB}`, short: `${nameA} + ${nameB}`, v: add(a, b) },
        ];
      case "subtract":
        return [
          { name: nameA, short: nameA, v: a },
          { name: nameB, short: nameB, v: b },
          { name: `${nameA} - ${nameB}`, short: `${nameA} - ${nameB}`, v: sub(a, b) },
        ];
      case "scale":
        return [
          { name: nameA, short: nameA, v: a },
          { name: coefName(k, nameA), short: coefName(k, nameA), v: mul(k, a) },
        ];
      case "position": {
        const ab = `\\overrightarrow{${nameA}${nameB}}`;
        return [
          { name: `\\overrightarrow{O${nameA}} = ${pa}`, short: pa, v: a },
          { name: `\\overrightarrow{O${nameB}} = ${pb}`, short: pb, v: b },
          { name: `${ab} = ${pb} - ${pa}`, short: ab, v: sub(b, a) },
        ];
      }
      case "section":
        return [
          { name: pa, short: pa, v: a },
          { name: pb, short: pb, v: b },
          ...(sectionP ? [{ name: "\\vec p", short: "\\vec p", v: sectionP }] : []),
        ];
      case "triangle":
        return [
          { name: pa, short: pa, v: a },
          { name: pb, short: pb, v: b },
          { name: pc, short: pc, v: c },
          { name: "\\vec g", short: "\\vec g", v: centroid },
        ];
      case "combination": {
        const r = `${coefName(cx, nameA)} ${cy < 0 ? "-" : "+"} ${coefName(Math.abs(cy), nameB)}`;
        return [
          { name: nameA, short: nameA, v: a },
          { name: nameB, short: nameB, v: b },
          { name: r, short: r, v: comboResult },
        ];
      }
      case "dot":
        return [
          { name: nameA, short: nameA, v: a },
          { name: nameB, short: nameB, v: b },
        ];
    }
  })();

  const showComponents = readouts.includes("components");
  const showMagnitude = readouts.includes("magnitude");
  const showDirection = readouts.includes("angle") && mode !== "dot";
  const extras: React.ReactNode[] = [];
  const line = (key: string, latex: string, note?: string) => (
    <div key={key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <span className="overflow-x-auto">
        <Latex latex={latex} />
      </span>
      {note && <span className="text-xs text-muted-foreground">{note}</span>}
    </div>
  );

  if (readouts.includes("sum")) {
    if (mode === "combination") {
      extras.push(line("sum", `${rows[2].name} = ${cx < 0 ? `(${fmt(cx)})` : fmt(cx)}${tupleLatex(a)} + ${cy < 0 ? `(${fmt(cy)})` : fmt(cy)}${tupleLatex(b)} = ${tupleLatex(comboResult)}`));
    } else if (mode === "subtract") {
      extras.push(line("sum", `${nameA} - ${nameB} = ${nameA} + (-${nameB}) = ${compLatex(sub(a, b))}`));
    } else {
      const s = len(add(a, b));
      const t = len(a) + len(b);
      const equal = Math.abs(s - t) < 1e-9;
      extras.push(
        line(
          "sum",
          `\\lvert ${nameA} + ${nameB}\\rvert = ${fmt(s)} \\;${equal ? "=" : "<"}\\; \\lvert ${nameA}\\rvert + \\lvert ${nameB}\\rvert = ${fmt(t)}`,
          equal ? "equal: the arrows point the same way" : "shortcut beats the detour",
        ),
      );
    }
  }
  if (readouts.includes("dot")) {
    const theta = angleBetweenDeg(a, b);
    const kind =
      theta === null ? "" : Math.abs(dotValue) < 1e-9 ? "perpendicular" : dotValue > 0 ? "acute angle" : "obtuse angle";
    extras.push(
      line(
        "dot",
        `${pointMode ? pa : nameA}\\cdot ${pointMode ? pb : nameB} = (${fmt(a[0])})(${fmt(b[0])}) + (${fmt(a[1])})(${fmt(b[1])}) = ${fmt(dotValue)}`,
        kind,
      ),
    );
    if (theta !== null) {
      extras.push(
        line(
          "dot2",
          `\\lvert ${nameA}\\rvert\\,\\lvert ${nameB}\\rvert\\cos\\theta = ${fmt(len(a))}\\times ${fmt(len(b))}\\times ${fmt(Math.cos((theta * Math.PI) / 180))} = ${fmt(len(a) * len(b) * Math.cos((theta * Math.PI) / 180))}`,
        ),
      );
    }
  }
  if (readouts.includes("angle") && mode === "dot") {
    const theta = angleBetweenDeg(a, b);
    extras.push(line("angle", theta === null ? "\\theta \\text{ undefined (zero vector)}" : `\\theta = ${fmt(theta)}^\\circ`));
  }
  if (readouts.includes("projection")) {
    if (aa > 1e-12) {
      const scalarProj = dotValue / Math.sqrt(aa);
      extras.push(
        line(
          "proj",
          `\\text{shadow of } ${nameB} \\text{ on } ${nameA} = \\frac{${nameA}\\cdot ${nameB}}{\\lvert ${nameA}\\rvert} = ${fmt(scalarProj)}`,
          scalarProj < -1e-9 ? "negative: the shadow falls backwards" : undefined,
        ),
      );
      extras.push(line("vproj", `${nameB}_{\\parallel} = \\frac{${nameA}\\cdot ${nameB}}{\\lvert ${nameA}\\rvert^2}\\,${nameA} = ${tupleLatex(projFoot)}`));
      if (config.showPerpendicular) {
        extras.push(line("perp", `${nameB}_{\\perp} = ${nameB} - ${nameB}_{\\parallel} = ${tupleLatex(sub(b, projFoot))}`));
      }
    } else {
      extras.push(line("proj", `\\text{no shadow: } ${nameA} = \\vec 0`));
    }
  }
  if (readouts.includes("ratio")) {
    if (mode === "section") {
      if (!sectionP) {
        extras.push(line("ratio", `${nameA}P : P${nameB} = ${fmt(m)} : ${fmt(n)}`, "equal parts externally: no such point (P runs off to infinity)"));
      } else if (external) {
        extras.push(line("ratio", `${nameA}P : P${nameB} = ${fmt(m)} : ${fmt(n)}`, "externally"));
        extras.push(
          line(
            "formula",
            `\\vec p = \\frac{m${pb} - n${pa}}{m - n} = \\frac{${fmt(m)}${tupleLatex(b)} - ${fmt(n)}${tupleLatex(a)}}{${fmt(m - n)}} = ${tupleLatex(sectionP)}`,
          ),
        );
      } else {
        extras.push(line("ratio", `${nameA}P : P${nameB} = ${fmt(m)} : ${fmt(n)}`, m === n ? "midpoint" : "internally"));
        extras.push(
          line(
            "formula",
            `\\vec p = \\frac{n${pa} + m${pb}}{m + n} = \\frac{${fmt(n)}${tupleLatex(a)} + ${fmt(m)}${tupleLatex(b)}}{${fmt(m + n)}} = ${tupleLatex(sectionP)}`,
          ),
        );
      }
    } else if (mode === "triangle") {
      const D = mul(0.5, add(b, c));
      const gd = len(sub(D, centroid));
      extras.push(
        line(
          "ratio",
          gd > 1e-9 ? `${nameA}G : GD = ${fmt(len(sub(centroid, a)))} : ${fmt(gd)} = ${fmt(len(sub(centroid, a)) / gd)} : 1` : `${nameA}G : GD \\text{ undefined}`,
          "the same 2 : 1 on every median",
        ),
      );
      extras.push(line("formula", `\\vec g = \\frac{${pa} + ${pb} + ${pc}}{3} = ${tupleLatex(centroid)}`));
    }
  }

  const notes: string[] = [];
  if (mode === "scale") {
    if (Math.abs(k) < 1e-9) notes.push("k = 0: the arrow collapses to the zero vector.");
    else if (k < 0) notes.push("k < 0: the arrow flips to point the opposite way.");
  }
  if (mode === "combination" && parallelAB) {
    notes.push("a and b are parallel: every combination stays on one line, so most points can't be reached.");
  }
  if (mode === "free" && !same(tail, O)) {
    notes.push("The dashed copy from O is the same vector: same length, same direction.");
  }

  const gridStep = win.xmax - win.xmin > 16 ? 2 : 1;
  const xs: number[] = [];
  for (let x = Math.ceil(win.xmin); x <= Math.floor(win.xmax); x++) if (x % gridStep === 0) xs.push(x);
  const ys: number[] = [];
  for (let y = Math.ceil(win.ymin); y <= Math.floor(win.ymax); y++) if (y % gridStep === 0) ys.push(y);
  const labelStep = gridStep * (win.xmax - win.xmin > 12 ? 2 : 1);

  const handleColor: Record<Handle, VecColor> = {
    a: "a",
    b: "b",
    c: "c",
    tail: "a",
  };
  const handleLabel: Record<Handle, string> = {
    a: pointMode ? "point A" : "tip of vector a",
    b: pointMode ? "point B" : "tip of vector b",
    c: "point C",
    tail: "tail of vector a",
  };

  return (
    <InteractiveFrame title="Vector canvas">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-md select-none rounded-md border bg-background"
        role="group"
        aria-label="Vector diagram with draggable handles"
        onPointerMove={(e) => {
          if (dragging) moveHandle(dragging, worldFromEvent(e));
        }}
        onPointerUp={() => setDragging(null)}
        onPointerCancel={() => setDragging(null)}
      >
        {xs.map((x) => (
          <line key={`gx${x}`} x1={sx(x)} y1={0} x2={sx(x)} y2={H} className="stroke-border" strokeWidth={0.6} />
        ))}
        {ys.map((y) => (
          <line key={`gy${y}`} x1={0} y1={sy(y)} x2={W} y2={sy(y)} className="stroke-border" strokeWidth={0.6} />
        ))}
        {win.ymin <= 0 && win.ymax >= 0 && (
          <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-foreground/40" strokeWidth={1} />
        )}
        {win.xmin <= 0 && win.xmax >= 0 && (
          <line x1={sx(0)} y1={0} x2={sx(0)} y2={H} className="stroke-foreground/40" strokeWidth={1} />
        )}
        {xs
          .filter((x) => x !== 0 && x % labelStep === 0)
          .map((x) => (
            <text key={`tx${x}`} x={sx(x)} y={clamp(sy(0) + 12, 10, H - 3)} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {x}
            </text>
          ))}
        {ys
          .filter((y) => y !== 0 && y % labelStep === 0)
          .map((y) => (
            <text key={`ty${y}`} x={clamp(sx(0) - 5, 10, W - 3)} y={sy(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
              {y}
            </text>
          ))}

        {scene}

        {draggable.map((h) => {
          const p = handlePos[h];
          const hx = sx(p[0]);
          const hy = sy(p[1]);
          const col = VEC_COLORS[handleColor[h]];
          const step = config.snap ? 1 : 0.1;
          return (
            <g
              key={`h-${h}`}
              tabIndex={0}
              role="button"
              aria-label={`Move ${handleLabel[h]}, now at (${fmt(p[0])}, ${fmt(p[1])}). Use arrow keys.`}
              className={`group outline-none ${dragging === h ? "cursor-grabbing" : "cursor-grab"}`}
              style={{ touchAction: "none" }}
              onPointerDown={(e) => {
                e.preventDefault();
                svgRef.current?.setPointerCapture(e.pointerId);
                setDragging(h);
              }}
              onKeyDown={(e) => {
                const delta: Record<string, V2> = {
                  ArrowLeft: [-step, 0],
                  ArrowRight: [step, 0],
                  ArrowUp: [0, step],
                  ArrowDown: [0, -step],
                };
                const d = delta[e.key];
                if (!d) return;
                e.preventDefault();
                moveHandle(h, add(p, d));
              }}
            >
              <circle cx={hx} cy={hy} r={18} fill="transparent" />
              <circle
                cx={hx}
                cy={hy}
                r={12}
                fill="none"
                className="stroke-transparent group-focus-visible:stroke-foreground"
                strokeWidth={1.5}
              />
              <circle
                cx={hx}
                cy={hy}
                r={h === "tail" ? 6 : 7}
                className={`${h === "tail" ? "fill-background" : col.fill} ${col.stroke} stroke-2 opacity-90`}
              />
            </g>
          );
        })}
      </svg>

      {mode === "scale" && (
        <SliderRow
          label={<Latex latex="k" />}
          value={k}
          min={config.scalar.min}
          max={config.scalar.max}
          step={config.scalar.step}
          onChange={setK}
        />
      )}
      {mode === "section" && (
        <div className="space-y-2">
          <SliderRow label={<Latex latex="m" />} value={m} min={config.ratio.m.min} max={config.ratio.m.max} step={config.ratio.m.step} onChange={setM} />
          <SliderRow label={<Latex latex="n" />} value={n} min={config.ratio.n.min} max={config.ratio.n.max} step={config.ratio.n.step} onChange={setN} />
          {config.ratio.allowExternal && (
            <div className="flex gap-2 text-sm" role="group" aria-label="Division type">
              {(["internal", "external"] as const).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  aria-pressed={external === (kind === "external")}
                  onClick={() => setExternal(kind === "external")}
                  className={`rounded-md border px-3 py-1 capitalize ${
                    external === (kind === "external") ? "border-primary bg-primary/10 font-medium" : "bg-background"
                  }`}
                >
                  {kind}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {mode === "combination" && (
        <div className="space-y-2">
          <SliderRow label={<Latex latex="x" />} value={cx} min={config.combo.x.min} max={config.combo.x.max} step={config.combo.x.step} onChange={setCx} />
          <SliderRow label={<Latex latex="y" />} value={cy} min={config.combo.y.min} max={config.combo.y.max} step={config.combo.y.step} onChange={setCy} />
        </div>
      )}

      {(showComponents || showMagnitude || showDirection || extras.length > 0) && (
        <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
          {(showComponents || showMagnitude || showDirection) &&
            rows.map((r) => {
              const theta = len(r.v) > 1e-12 ? directionDeg(r.v) : null;
              return (
                <div key={r.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  {showComponents && (
                    <span className="overflow-x-auto">
                      <Latex latex={`${r.name} = ${compLatex(r.v)}`} />
                    </span>
                  )}
                  <span className="flex flex-wrap gap-x-4 text-muted-foreground">
                    {showMagnitude && <Latex latex={`\\lvert ${r.short}\\rvert = ${magLatex(r.v)}`} />}
                    {showDirection && (
                      <Latex latex={theta === null ? "\\text{no direction}" : `\\text{at } ${fmt(theta)}^\\circ`} />
                    )}
                  </span>
                </div>
              );
            })}
          {extras}
        </div>
      )}

      {notes.map((note) => (
        <p key={note} className="text-sm font-medium text-callout-warning">
          {note}
        </p>
      ))}

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground">{config.caption ?? DEFAULT_CAPTIONS[mode]}</p>
        <button type="button" onClick={reset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
          Reset
        </button>
      </div>
    </InteractiveFrame>
  );
}
