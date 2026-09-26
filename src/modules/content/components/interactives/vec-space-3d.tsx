"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import type { vecSpace3dSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, compLatex, fmt, magLatex, SvgLatex, type VecColor } from "./vec-canvas-2d";

type Config = z.infer<typeof vecSpace3dSchema>;
type Mode = Config["mode"];
type Readout = NonNullable<Config["readouts"]>[number];
type SliderName = Config["sliders"][number]["name"];
type V3 = [number, number, number];

const add = (p: V3, q: V3): V3 => [p[0] + q[0], p[1] + q[1], p[2] + q[2]];
const sub = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
const mul = (k: number, p: V3): V3 => [k * p[0], k * p[1], k * p[2]];
const dot = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
const cross = (p: V3, q: V3): V3 => [
  p[1] * q[2] - p[2] * q[1],
  p[2] * q[0] - p[0] * q[2],
  p[0] * q[1] - p[1] * q[0],
];
const len = (p: V3) => Math.hypot(p[0], p[1], p[2]);
const unit = (p: V3): V3 => {
  const l = len(p);
  return l < 1e-12 ? [0, 0, 0] : mul(1 / l, p);
};
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const deg = (r: number) => (r * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;
/** Tidy float noise (1e-16 -> 0) so exact surds still appear. */
const tidy = (p: V3): V3 => p.map((x) => (Math.abs(x - Math.round(x)) < 1e-9 ? Math.round(x) : x)) as V3;

function angleBetween(p: V3, q: V3): number | null {
  const l = len(p) * len(q);
  if (l < 1e-12) return null;
  return deg(Math.acos(clamp(dot(p, q) / l, -1, 1)));
}

/** Some unit vector perpendicular to p. */
function perpendicularTo(p: V3): V3 {
  const trial = Math.abs(unit(p)[2]) < 0.9 ? cross(p, [0, 0, 1]) : cross(p, [1, 0, 0]);
  return unit(trial);
}

const DEFAULT_READOUTS: Record<Mode, Readout[]> = {
  components: ["magnitude"],
  "direction-angles": ["direction-cosines"],
  cross: ["cross", "area"],
  triple: ["volume"],
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  components: "Drag to rotate. The arrow is the diagonal of the box: Pythagoras on the floor, then Pythagoras up.",
  "direction-angles": "Drag to rotate. Each angle is measured from one axis; its cosine is that coordinate divided by the length.",
  cross: "Drag to rotate. a × b stands perpendicular to both; its length is the parallelogram's area. Swing b past a and it flips.",
  triple: "Drag to rotate. Tilt a down into the base plane and the box flattens: volume zero means coplanar.",
};

const SLIDER_LABELS: Record<SliderName, { latex: string; unit?: string }> = {
  ax: { latex: "a_x" },
  ay: { latex: "a_y" },
  az: { latex: "a_z" },
  angle: { latex: "\\theta", unit: "°" },
  tilt: { latex: "\\text{tilt}", unit: "°" },
};

const SIZE = 340;
const C = SIZE / 2;

export function VecSpace3d({ config }: { config: Config }) {
  const { mode } = config;
  const [yaw, setYaw] = useState(config.initialView.yaw);
  const [pitch, setPitch] = useState(config.initialView.pitch);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.sliders.map((s) => [s.name, s.initial])),
  );
  const drag = useRef<{ x: number; y: number } | null>(null);

  const readouts = config.readouts ?? DEFAULT_READOUTS[mode];
  const slider = (name: SliderName) => config.sliders.find((s) => s.name === name);
  const val = (name: SliderName) => values[name];

  // ---------- the vectors ----------
  const a0: V3 = [
    slider("ax") ? val("ax") : config.a[0],
    slider("ay") ? val("ay") : config.a[1],
    slider("az") ? val("az") : config.a[2],
  ];
  const b0: V3 = config.b ?? (mode === "triple" ? [4, 0, 0] : [1, 3, 0]);
  const c: V3 = config.c ?? [1, 3, 0];

  let a: V3 = a0;
  let b: V3 = b0;
  if (mode === "cross" && slider("angle")) {
    // Turn b in the plane of a and b, keeping its length.
    const ah = unit(a0);
    const w0 = sub(b0, mul(dot(b0, ah), ah));
    const wh = len(w0) > 1e-9 ? unit(w0) : perpendicularTo(a0);
    const t = rad(val("angle"));
    b = mul(len(b0), add(mul(Math.cos(t), ah), mul(Math.sin(t), wh)));
  }
  const baseNormal = unit(cross(b, c));
  if (mode === "triple" && slider("tilt")) {
    const nh = len(baseNormal) > 1e-9 ? baseNormal : ([0, 0, 1] as V3);
    const h0 = sub(a0, mul(dot(a0, nh), nh));
    const hh = len(h0) > 1e-9 ? unit(h0) : unit(b);
    const t = rad(val("tilt"));
    a = mul(len(a0), add(mul(Math.cos(t), hh), mul(Math.sin(t), nh)));
  }
  a = tidy(a);
  b = tidy(b);

  // ---------- a fixed scale, so sliders never zoom the scene ----------
  const aReach = Math.hypot(
    ...(["ax", "ay", "az"] as const).map((name, i) => {
      const s = slider(name);
      return s ? Math.max(Math.abs(s.min), Math.abs(s.max)) : Math.abs(config.a[i]);
    }),
  );
  const bLen = len(b0);
  const cLen = len(c);
  let reach = aReach;
  let normalScale = 1;
  if (mode === "cross") {
    const maxArea = aReach * bLen;
    const cap = 2 * Math.max(aReach, bLen);
    normalScale = config.showNormal && maxArea > cap ? cap / maxArea : 1;
    reach = Math.max(aReach + bLen, config.showNormal ? maxArea * normalScale : 0);
  } else if (mode === "triple") {
    reach = Math.max(aReach + len(add(b0, c)), bLen, cLen);
  }
  reach = Math.max(reach, 1);
  const s = (C - 26) / reach;

  // ---------- projection (orthographic; right-handed, z up) ----------
  const y = rad(yaw);
  const p = rad(pitch);
  const right: V3 = [-Math.sin(y), Math.cos(y), 0];
  const up: V3 = [-Math.sin(p) * Math.cos(y), -Math.sin(p) * Math.sin(y), Math.cos(p)];
  const P = (q: V3) => [C + s * dot(q, right), C - s * dot(q, up)] as const;

  const O: V3 = [0, 0, 0];
  const arrow = (from: V3, to: V3, color: VecColor, opts: { width?: number; dashed?: boolean; opacity?: number } = {}) => {
    const [x1, y1] = P(from);
    const [x2, y2] = P(to);
    return <ArrowSvg x1={x1} y1={y1} x2={x2} y2={y2} color={color} {...opts} />;
  };
  const seg = (from: V3, to: V3, cls: string, opts: { width?: number; dashed?: boolean } = {}) => {
    const [x1, y1] = P(from);
    const [x2, y2] = P(to);
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
  const label = (at: V3, latex: string, cls?: string, dx = 10, dy = -10) => {
    const [x0, y0] = P(at);
    return <SvgLatex x={x0 + dx} y={y0 + dy} latex={latex} className={cls} />;
  };
  const poly = (pts: V3[], cls: string) => (
    <polygon points={pts.map((q) => P(q).join(",")).join(" ")} className={cls} strokeWidth={1} />
  );
  const arc = (from: V3, to: V3, radius: number, cls: string) => {
    // Arc from direction `from` to direction `to` in their common plane.
    const fh = unit(from);
    const w = sub(to, mul(dot(to, fh), fh));
    const wh = len(w) > 1e-9 ? unit(w) : perpendicularTo(from);
    const theta = angleBetween(from, to) ?? 0;
    const pts: string[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = rad((theta * i) / 24);
      pts.push(P(mul(radius, add(mul(Math.cos(t), fh), mul(Math.sin(t), wh)))).join(","));
    }
    const mid = rad(theta / 2);
    const labelAt = mul(radius * 1.35, add(mul(Math.cos(mid), fh), mul(Math.sin(mid), wh)));
    return { path: <polyline points={pts.join(" ")} fill="none" className={cls} strokeWidth={2} />, labelAt };
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
      {seg([-0.45 * L, 0, 0], [0, 0, 0], "stroke-foreground/30", { dashed: true })}
      {seg([0, -0.45 * L, 0], [0, 0, 0], "stroke-foreground/30", { dashed: true })}
      {seg([0, 0, -0.45 * L], [0, 0, 0], "stroke-foreground/30", { dashed: true })}
      {arrow(O, [L, 0, 0], "muted", { width: 1.2 })}
      {arrow(O, [0, L, 0], "muted", { width: 1.2 })}
      {arrow(O, [0, 0, L], "muted", { width: 1.2 })}
      {label([L, 0, 0], "x", "text-muted-foreground", 0, 12)}
      {label([0, L, 0], "y", "text-muted-foreground", 10, 0)}
      {label([0, 0, L], "z", "text-muted-foreground", 10, 0)}
    </g>
  );

  // ---------- the scene ----------
  const scene: React.ReactNode[] = [];
  const push = (node: React.ReactNode) => scene.push(<g key={scene.length}>{node}</g>);

  if (mode === "components") {
    const [x, yy, z] = a;
    if (config.showBox) {
      const corners = (bits: number[]): V3 => [bits[0] * x, bits[1] * yy, bits[2] * z];
      const edges: [number[], number[]][] = [];
      for (const i of [0, 1]) {
        for (const j of [0, 1]) {
          edges.push([[0, i, j], [1, i, j]], [[i, 0, j], [i, 1, j]], [[i, j, 0], [i, j, 1]]);
        }
      }
      edges.forEach(([u, v]) => push(seg(corners(u), corners(v), "stroke-muted-foreground/60", { dashed: true })));
      push(arrow(O, [x, yy, 0], "b", { width: 2 }));
      push(arrow([x, yy, 0], a, "result", { width: 2 }));
      push(label([x / 2, 0, 0], fmt(x), "text-muted-foreground", 0, 12));
      push(label([0, yy / 2, 0], fmt(yy), "text-muted-foreground", 0, 12));
      push(label([0, 0, z / 2], fmt(z), "text-muted-foreground", -12, 0));
      push(label([x / 2, yy / 2, 0], "\\sqrt{x^2+y^2}", "text-callout-info", 0, 14));
    }
    push(arrow(O, a, "a", { width: 3 }));
    push(label(a, "\\vec r"));
  }

  if (mode === "direction-angles") {
    const r = len(a);
    const feet: V3[] = [[a[0], 0, 0], [0, a[1], 0], [0, 0, a[2]]];
    feet.forEach((f) => push(seg(a, f, "stroke-muted-foreground/70", { dashed: true })));
    if (config.showAngles && r > 1e-9) {
      const axesDirs: V3[] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      const names = ["\\alpha", "\\beta", "\\gamma"];
      const classes = ["stroke-callout-info", "stroke-callout-tip", "stroke-callout-warning"];
      const texts = ["text-callout-info", "text-callout-tip", "text-callout-warning"];
      axesDirs.forEach((e, i) => {
        const { path, labelAt } = arc(e, a, reach * (0.22 + 0.07 * i), classes[i]);
        push(path);
        push(label(labelAt, names[i], texts[i], 0, 0));
      });
    }
    push(arrow(O, a, "a", { width: 3 }));
    push(label(a, "\\vec r"));
  }

  if (mode === "cross") {
    const n = cross(a, b);
    if (config.showParallelogram) {
      push(poly([O, a, add(a, b), b], "fill-callout-info/15 stroke-callout-info/50"));
    }
    push(arrow(O, a, "a", { width: 3 }));
    push(arrow(O, b, "b", { width: 3 }));
    push(label(a, "\\vec a"));
    push(label(b, "\\vec b"));
    if (config.showNormal) {
      const drawn = mul(normalScale, n);
      push(arrow(O, drawn, "result", { width: 3 }));
      if (len(n) > 1e-9) push(label(drawn, "\\vec a\\times\\vec b", "text-callout-tip", 0, -14));
    }
    const theta = angleBetween(a, b);
    if (theta !== null && theta > 0.5) {
      const { path, labelAt } = arc(a, b, Math.min(len(a), len(b)) * 0.35, "stroke-foreground/60");
      push(path);
      push(label(labelAt, "\\theta", undefined, 0, 0));
    }
  }

  if (mode === "triple") {
    const corners: V3[] = [O, b, c, add(b, c)];
    const top = corners.map((q) => add(q, a));
    push(poly([O, b, add(b, c), c], "fill-callout-info/15 stroke-callout-info/60"));
    if (config.showParallelogram) {
      push(poly([top[0], top[1], top[3], top[2]], "fill-callout-tip/10 stroke-callout-tip/50"));
      corners.forEach((q, i) => push(seg(q, top[i], "stroke-muted-foreground/70")));
      push(seg(top[1], top[3], "stroke-muted-foreground/70"));
      push(seg(top[2], top[3], "stroke-muted-foreground/70"));
    }
    const nh = len(baseNormal) > 1e-9 ? baseNormal : ([0, 0, 1] as V3);
    const foot = sub(a, mul(dot(a, nh), nh));
    push(seg(a, foot, "stroke-callout-warning", { width: 2, dashed: true }));
    if (config.showNormal && len(baseNormal) > 1e-9) {
      push(arrow(O, mul(Math.min(reach * 0.5, len(cross(b, c))), baseNormal), "result", { width: 2, opacity: 0.8 }));
      push(label(mul(Math.min(reach * 0.5, len(cross(b, c))), baseNormal), "\\vec b\\times\\vec c", "text-callout-tip", 0, -14));
    }
    push(arrow(O, b, "b", { width: 3 }));
    push(arrow(O, c, "c", { width: 3 }));
    push(arrow(O, a, "a", { width: 3 }));
    push(label(a, "\\vec a"));
    push(label(b, "\\vec b"));
    push(label(c, "\\vec c"));
  }

  // ---------- readouts ----------
  const lines: { key: string; latex: string; note?: string }[] = [];
  const bars = (name: string) => `\\lvert ${name}\\rvert`;

  if (readouts.includes("magnitude")) {
    if (mode === "components" || mode === "direction-angles") {
      const [x, yy, z] = a.map(fmt);
      if (mode === "components") {
        lines.push({
          key: "floor",
          latex: `\\text{floor diagonal} = \\sqrt{${x}^2 + ${yy}^2} = ${magLatex([a[0], a[1]])}`,
        });
      }
      lines.push({
        key: "mag",
        latex: `${bars("\\vec r")} = \\sqrt{x^2+y^2+z^2} = \\sqrt{${x}^2 + ${yy}^2 + ${z}^2} = ${magLatex(a)}`,
      });
    } else {
      lines.push({ key: "maga", latex: `${bars("\\vec a")} = ${magLatex(a)}` });
      lines.push({ key: "magb", latex: `${bars("\\vec b")} = ${magLatex(b)}` });
      if (mode === "triple") lines.push({ key: "magc", latex: `${bars("\\vec c")} = ${magLatex(c)}` });
    }
  }
  if (readouts.includes("direction-cosines")) {
    const r = len(a);
    if (r < 1e-9) {
      lines.push({ key: "dc", latex: "\\vec 0 \\text{ has no direction}" });
    } else {
      const names = [
        ["l", "\\alpha", "x"],
        ["m", "\\beta", "y"],
        ["n", "\\gamma", "z"],
      ];
      names.forEach(([cosName, angName, coord], i) => {
        lines.push({
          key: `dc${i}`,
          latex: `${cosName} = \\cos ${angName} = \\frac{${coord}}{r} = \\frac{${fmt(a[i])}}{${fmt(r)}} = ${fmt(a[i] / r)}`,
          note: `${angName === "\\alpha" ? "α" : angName === "\\beta" ? "β" : "γ"} = ${fmt(deg(Math.acos(clamp(a[i] / r, -1, 1))))}°`,
        });
      });
      const sumSq = a.reduce((acc, v) => acc + (v / r) ** 2, 0);
      lines.push({
        key: "dcsum",
        latex: `l^2 + m^2 + n^2 = ${fmt(sumSq)}`,
        note: `but α + β + γ = ${fmt(a.reduce((acc, v) => acc + deg(Math.acos(clamp(v / r, -1, 1))), 0))}°`,
      });
    }
  }
  const onBase = mode === "triple";
  const crossName = onBase ? "\\vec b\\times\\vec c" : "\\vec a\\times\\vec b";
  const u1: V3 = onBase ? b : a;
  const u2: V3 = onBase ? c : b;
  const crossVec = cross(u1, u2);
  if (readouts.includes("cross")) {
    const row = (v: V3) => v.map(fmt).join(" & ");
    lines.push({
      key: "cross",
      latex: `${crossName} = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ ${row(u1)} \\\\ ${row(u2)} \\end{vmatrix} = ${compLatex(tidy(crossVec))}`,
    });
  }
  if (readouts.includes("area")) {
    const theta = angleBetween(u1, u2);
    const area = len(crossVec);
    const [n1, n2] = mode === "triple" ? ["\\vec b", "\\vec c"] : ["\\vec a", "\\vec b"];
    lines.push({
      key: "area",
      latex: `\\text{area} = ${bars(crossName)} = ${bars(n1)}\\,${bars(n2)}\\sin\\theta = ${magLatex(tidy(crossVec))}`,
      note: theta === null ? undefined : `θ = ${fmt(theta)}°`,
    });
    lines.push({ key: "tri", latex: `\\text{triangle} = \\tfrac12 ${bars(crossName)} = ${fmt(area / 2)}` });
  }
  if (readouts.includes("volume")) {
    const bc = cross(b, c);
    const V = dot(a, bc);
    const area = len(bc);
    const height = area > 1e-9 ? V / area : 0;
    const flat = Math.abs(V) < 1e-6;
    lines.push({
      key: "vol",
      latex: `[\\vec a\\;\\vec b\\;\\vec c] = \\vec a\\cdot(\\vec b\\times\\vec c) = ${fmt(V)}`,
      note: flat ? "zero: a, b, c are coplanar" : V < 0 ? "negative: a is below the base (left-handed order)" : undefined,
    });
    lines.push({
      key: "vol2",
      latex: `\\text{base area}\\times\\text{height} = ${fmt(area)}\\times ${fmt(height)}`,
    });
    lines.push({ key: "tet", latex: `\\text{tetrahedron} = \\tfrac16\\lvert[\\vec a\\;\\vec b\\;\\vec c]\\rvert = ${fmt(Math.abs(V) / 6)}` });
  }
  if (readouts.includes("dot")) {
    const theta = angleBetween(a, b);
    lines.push({
      key: "dot",
      latex: `\\vec a\\cdot\\vec b = ${fmt(dot(a, b))}`,
      note: theta === null ? undefined : `θ = ${fmt(theta)}°`,
    });
  }
  if (normalScale < 1 && mode === "cross" && config.showNormal) {
    lines.push({ key: "scale", latex: `\\text{(normal drawn at } \\times${fmt(normalScale)}\\text{ scale)}` });
  }

  const resetView = () => {
    setYaw(config.initialView.yaw);
    setPitch(config.initialView.pitch);
  };

  return (
    <InteractiveFrame title="3D vectors">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-sm cursor-grab select-none rounded-md border bg-background active:cursor-grabbing"
        style={{ touchAction: "none" }}
        role="img"
        tabIndex={0}
        aria-label="3D vector diagram. Drag or use arrow keys to rotate."
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

      {config.sliders.length > 0 && (
        <div className="space-y-2">
          {config.sliders.map((sl) => (
            <SliderRow
              key={sl.name}
              label={<Latex latex={SLIDER_LABELS[sl.name].latex} />}
              value={values[sl.name]}
              min={sl.min}
              max={sl.max}
              step={sl.step}
              unit={SLIDER_LABELS[sl.name].unit}
              onChange={(v) => setValues((prev) => ({ ...prev, [sl.name]: v }))}
            />
          ))}
        </div>
      )}

      <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="overflow-x-auto">
            <Latex latex={`${mode === "components" || mode === "direction-angles" ? "\\vec r" : "\\vec a"} = ${compLatex(a)}`} />
          </span>
          {(mode === "cross" || mode === "triple") && (
            <span className="overflow-x-auto">
              <Latex latex={`\\vec b = ${compLatex(b)}`} />
            </span>
          )}
          {mode === "triple" && (
            <span className="overflow-x-auto">
              <Latex latex={`\\vec c = ${compLatex(c)}`} />
            </span>
          )}
        </div>
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
        <p className="text-xs text-muted-foreground">{config.caption ?? DEFAULT_CAPTIONS[mode]}</p>
        <button type="button" onClick={resetView} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
          Reset view
        </button>
      </div>
    </InteractiveFrame>
  );
}
