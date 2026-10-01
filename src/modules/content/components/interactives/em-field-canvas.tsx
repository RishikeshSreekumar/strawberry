"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import type { emFieldCanvasSchema } from "../../schemas/blocks";
import { K_COULOMB, directionDeg, niceStep, sciLatex, sigText } from "./em-format";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex, type VecColor } from "./vec-canvas-2d";

type Config = z.infer<typeof emFieldCanvasSchema>;
type Mode = Config["mode"];
type Readout = NonNullable<Config["readouts"]>[number];
type V2 = [number, number];
type Charge = { q: number; pos: V2 };
type Handle = { kind: "charge"; i: number } | { kind: "probe" } | { kind: "probeB" };
type Layer = "lines" | "vectors" | "equipotentials";

const W = 400;
const MICRO = 1e-6;

const DEFAULT_READOUTS: Record<Mode, Readout[]> = {
  "field-lines": ["field", "potential"],
  "field-vectors": ["field", "components", "superposition"],
  equipotentials: ["potential", "field"],
  force: ["force"],
  work: ["work"],
};

const DEFAULT_LAYERS: Record<Mode, Record<Layer, boolean> & { probe: boolean }> = {
  "field-lines": { lines: true, vectors: false, equipotentials: false, probe: true },
  "field-vectors": { lines: false, vectors: true, equipotentials: false, probe: true },
  equipotentials: { lines: false, vectors: false, equipotentials: true, probe: true },
  force: { lines: false, vectors: false, equipotentials: false, probe: false },
  work: { lines: false, vectors: false, equipotentials: true, probe: true },
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  "field-lines":
    "Drag the charges. Lines leave + charges and end on − charges; where lines crowd, the field is strong. Drag P to read the field there.",
  "field-vectors":
    "Each arrow shows the direction of E at that point (fainter = weaker). Drag P: the net field is the vector sum of one arrow per charge.",
  equipotentials:
    "Each curve joins points at the same potential. Turn on field lines: they cross every equipotential at right angles.",
  force:
    "Dashed arrows are the Coulomb forces from each other charge (drawn to scale); the solid arrow is their vector sum.",
  work:
    "Drag A and B. The work done by the field on q₀ depends only on V_A − V_B, not on the path taken between them.",
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function EmFieldCanvas({ config }: { config: Config }) {
  const { window: win, mode } = config;
  const width = win.xmax - win.xmin;
  const u = W / width;
  const H = (win.ymax - win.ymin) * u;
  const sx = (x: number) => (x - win.xmin) * u;
  const sy = (y: number) => H - (y - win.ymin) * u;
  const scale = config.unit === "cm" ? 0.01 : 1;
  const unitText = config.unit === "cm" ? "\\text{ cm}" : "\\text{ m}";

  const initialCharges = (): Charge[] => config.charges.map((c) => ({ q: c.q, pos: [c.pos[0], c.pos[1]] }));
  const [charges, setCharges] = useState<Charge[]>(initialCharges);
  const [probe, setProbe] = useState<V2>(config.probe);
  const [probeB, setProbeB] = useState<V2>(config.probeB);
  const [dragging, setDragging] = useState<Handle | null>(null);
  const defaults = DEFAULT_LAYERS[mode];
  const [layers, setLayers] = useState<Record<Layer, boolean>>({
    lines: config.showLines ?? defaults.lines,
    vectors: config.showVectors ?? defaults.vectors,
    equipotentials: config.showEquipotentials ?? defaults.equipotentials,
  });
  const showProbe = config.showProbe ?? defaults.probe;
  const svgRef = useRef<SVGSVGElement>(null);

  const readouts = config.readouts ?? DEFAULT_READOUTS[mode];
  const names = config.charges.map((c, i) => c.label ?? `q_{${i + 1}}`);
  const qmax = Math.max(...charges.map((c) => Math.abs(c.q)), 1e-9);

  // ---------- physics (SI) ----------
  /** Field (N/C) and potential (V) at p; per-charge parts for superposition. */
  function fieldAt(p: V2, skip = -1) {
    let ex = 0;
    let ey = 0;
    let v = 0;
    let singular = false;
    const parts: { e: V2; mag: number; r: number }[] = [];
    charges.forEach((c, i) => {
      if (i === skip) {
        parts.push({ e: [0, 0], mag: 0, r: 0 });
        return;
      }
      const dx = (p[0] - c.pos[0]) * scale;
      const dy = (p[1] - c.pos[1]) * scale;
      const r = Math.hypot(dx, dy);
      if (r < 1e-9) {
        if (c.q !== 0) singular = true;
        parts.push({ e: [0, 0], mag: 0, r: 0 });
        return;
      }
      const kq = K_COULOMB * c.q * MICRO;
      const mag = kq / (r * r);
      const e: V2 = [(mag * dx) / r, (mag * dy) / r];
      ex += e[0];
      ey += e[1];
      v += kq / r;
      parts.push({ e, mag: Math.abs(mag), r });
    });
    return { e: [ex, ey] as V2, v, parts, singular };
  }

  /** Unnormalised field direction in grid units (for tracing only). */
  function dirAt(p: V2): V2 {
    let ex = 0;
    let ey = 0;
    for (const c of charges) {
      const dx = p[0] - c.pos[0];
      const dy = p[1] - c.pos[1];
      const r2 = dx * dx + dy * dy;
      if (r2 < 1e-12) continue;
      const f = c.q / (r2 * Math.sqrt(r2));
      ex += f * dx;
      ey += f * dy;
    }
    return [ex, ey];
  }

  // ---------- field lines ----------
  const h = width / 250;
  const r0 = width / 60;
  const margin = width * 0.05;
  function traceLine(start: V2, sign: number, from: number): V2[] {
    const pts: V2[] = [start];
    let p = start;
    for (let step = 0; step < 1500; step++) {
      const d1 = dirAt(p);
      const l1 = Math.hypot(d1[0], d1[1]);
      if (!(l1 > 1e-12)) break;
      const mid: V2 = [p[0] + (0.5 * h * sign * d1[0]) / l1, p[1] + (0.5 * h * sign * d1[1]) / l1];
      const d2 = dirAt(mid);
      const l2 = Math.hypot(d2[0], d2[1]);
      if (!(l2 > 1e-12)) break;
      p = [p[0] + (h * sign * d2[0]) / l2, p[1] + (h * sign * d2[1]) / l2];
      pts.push(p);
      if (p[0] < win.xmin - margin || p[0] > win.xmax + margin || p[1] < win.ymin - margin || p[1] > win.ymax + margin) break;
      const hit = charges.findIndex(
        (c, i) => c.q !== 0 && (i !== from || step > 10) && Math.hypot(p[0] - c.pos[0], p[1] - c.pos[1]) < r0,
      );
      if (hit >= 0) {
        pts.push(charges[hit].pos);
        break;
      }
    }
    return pts;
  }

  const fieldLines: { pts: V2[]; forward: boolean }[] = [];
  if (layers.lines) {
    const pos = charges.reduce((s, c) => s + Math.max(c.q, 0), 0);
    const neg = charges.reduce((s, c) => s + Math.max(-c.q, 0), 0);
    const fromPositive = pos >= neg;
    charges.forEach((c, i) => {
      if (c.q === 0 || c.q > 0 !== fromPositive) return;
      const n = clamp(Math.round(Math.abs(c.q) * config.linesPerMicroC), 1, 32);
      for (let k = 0; k < n; k++) {
        const t = (2 * Math.PI * k) / n + (i * 0.37) / n;
        const start: V2 = [c.pos[0] + r0 * Math.cos(t), c.pos[1] + r0 * Math.sin(t)];
        fieldLines.push({ pts: [c.pos, ...traceLine(start, fromPositive ? 1 : -1, i)], forward: fromPositive });
      }
    });
  }

  // ---------- equipotentials (marching squares) ----------
  const levels: number[] = (() => {
    if (config.potentialLevels) return config.potentialLevels;
    const hasPos = charges.some((c) => c.q > 0);
    const hasNeg = charges.some((c) => c.q < 0);
    const out: number[] = [];
    for (const f of [0.5, 1, 1.6, 2.6, 4]) {
      const r = ((f * width) / 10) * scale;
      const val = Number(((K_COULOMB * qmax * MICRO) / r).toPrecision(2));
      if (hasPos) out.push(val);
      if (hasNeg) out.push(-val);
    }
    if (hasPos && hasNeg) out.push(0);
    return out;
  })();

  const contourPaths: { level: number; d: string }[] = [];
  if (layers.equipotentials) {
    const nx = 90;
    const ny = Math.max(10, Math.round((nx * H) / W));
    const gx = (i: number) => win.xmin + (width * i) / nx;
    const gy = (j: number) => win.ymin + ((win.ymax - win.ymin) * j) / ny;
    const grid: number[][] = [];
    for (let j = 0; j <= ny; j++) {
      const row: number[] = [];
      for (let i = 0; i <= nx; i++) {
        const p: V2 = [gx(i), gy(j)];
        const near = charges.some((c) => c.q !== 0 && Math.hypot(p[0] - c.pos[0], p[1] - c.pos[1]) < r0 * 0.5);
        row.push(near ? NaN : fieldAt(p).v);
      }
      grid.push(row);
    }
    for (const level of levels) {
      let d = "";
      for (let j = 0; j < ny; j++) {
        for (let i = 0; i < nx; i++) {
          const corners: [V2, number][] = [
            [[gx(i), gy(j)], grid[j][i]],
            [[gx(i + 1), gy(j)], grid[j][i + 1]],
            [[gx(i + 1), gy(j + 1)], grid[j + 1][i + 1]],
            [[gx(i), gy(j + 1)], grid[j + 1][i]],
          ];
          if (corners.some(([, v]) => !Number.isFinite(v))) continue;
          const cross: V2[] = [];
          for (let e = 0; e < 4; e++) {
            const [pa, va] = corners[e];
            const [pb, vb] = corners[(e + 1) % 4];
            if ((va - level) * (vb - level) < 0) {
              const t = (level - va) / (vb - va);
              cross.push([pa[0] + t * (pb[0] - pa[0]), pa[1] + t * (pb[1] - pa[1])]);
            }
          }
          for (let s = 0; s + 1 < cross.length; s += 2) {
            d += `M${sx(cross[s][0]).toFixed(1)} ${sy(cross[s][1]).toFixed(1)}L${sx(cross[s + 1][0]).toFixed(1)} ${sy(cross[s + 1][1]).toFixed(1)}`;
          }
        }
      }
      if (d) contourPaths.push({ level, d });
    }
  }

  // ---------- field-arrow grid ----------
  const arrowGrid: { p: V2; dir: V2; w: number }[] = [];
  if (layers.vectors) {
    const s = niceStep(width / 12);
    const samples: { p: V2; e: V2; m: number }[] = [];
    for (let x = Math.ceil(win.xmin / s) * s; x <= win.xmax + 1e-9; x += s) {
      for (let y = Math.ceil(win.ymin / s) * s; y <= win.ymax + 1e-9; y += s) {
        const p: V2 = [x, y];
        if (charges.some((c) => c.q !== 0 && Math.hypot(x - c.pos[0], y - c.pos[1]) < s * 0.6)) continue;
        const f = fieldAt(p);
        const m = Math.hypot(f.e[0], f.e[1]);
        if (!(m > 0) || f.singular) continue;
        samples.push({ p, e: f.e, m });
      }
    }
    const logs = samples.map((q) => Math.log10(q.m));
    const lo = Math.min(...logs);
    const hi = Math.max(...logs);
    samples.forEach((q, idx) => {
      const w = hi - lo > 1e-9 ? 0.2 + (0.8 * (logs[idx] - lo)) / (hi - lo) : 1;
      arrowGrid.push({ p: q.p, dir: [q.e[0] / q.m, q.e[1] / q.m], w });
    });
  }
  const gridArrowLen = niceStep(width / 12) * 0.7;

  // ---------- derived readout quantities ----------
  const P = fieldAt(probe);
  const Emag = Math.hypot(P.e[0], P.e[1]);
  const B = fieldAt(probeB);
  const q0 = config.testCharge;
  const target = clamp(config.forceOn, 0, charges.length - 1);
  const forceParts = charges.map((c, i) => {
    if (i === target) return null;
    const tq = charges[target];
    const dx = (tq.pos[0] - c.pos[0]) * scale;
    const dy = (tq.pos[1] - c.pos[1]) * scale;
    const r = Math.hypot(dx, dy);
    if (r < 1e-9) return { f: [0, 0] as V2, mag: 0, r: 0, repel: false, coincident: true };
    const mag = (K_COULOMB * c.q * tq.q * MICRO * MICRO) / (r * r);
    return { f: [(mag * dx) / r, (mag * dy) / r] as V2, mag: Math.abs(mag), r, repel: mag > 0, coincident: false };
  });
  const netF: V2 = forceParts.reduce<V2>((s, f) => (f ? [s[0] + f.f[0], s[1] + f.f[1]] : s), [0, 0]);
  const coincident = forceParts.some((f) => f?.coincident);

  // ---------- drawing helpers ----------
  const arrowPx = (from: V2, vec: V2, px: number, color: VecColor, opts: { dashed?: boolean; width?: number; key?: string } = {}) => {
    const m = Math.hypot(vec[0], vec[1]);
    if (!(m > 0) || !Number.isFinite(px)) return null;
    const x1 = sx(from[0]);
    const y1 = sy(from[1]);
    return (
      <ArrowSvg
        key={opts.key}
        x1={x1}
        y1={y1}
        x2={x1 + (vec[0] / m) * px}
        y2={y1 - (vec[1] / m) * px}
        color={color}
        dashed={opts.dashed}
        width={opts.width}
      />
    );
  };
  /** Log-scaled arrow length for a single field arrow. */
  const eRef = (K_COULOMB * qmax * MICRO) / ((width * scale) / 2) ** 2;
  const logPx = (m: number) => clamp(24 + 16 * Math.log10(m / eRef), 14, 80);

  const scene: React.ReactNode[] = [];
  contourPaths.forEach(({ level, d }) => {
    scene.push(
      <path
        key={`eq${level}`}
        d={d}
        fill="none"
        strokeWidth={1.3}
        className={
          Math.abs(level) < 1e-12
            ? "stroke-muted-foreground"
            : level > 0
              ? "stroke-destructive/60"
              : "stroke-callout-info/70"
        }
      />,
    );
  });
  fieldLines.forEach(({ pts, forward }, idx) => {
    scene.push(
      <polyline
        key={`fl${idx}`}
        points={pts.map((p) => `${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" ")}
        fill="none"
        className="stroke-plot"
        strokeWidth={1.2}
        opacity={0.75}
      />,
    );
    const mi = Math.floor(pts.length / 2);
    if (pts.length > 6 && mi + 1 < pts.length) {
      const a = pts[mi];
      const b = pts[mi + 1];
      let dx = sx(b[0]) - sx(a[0]);
      let dy = sy(b[1]) - sy(a[1]);
      const l = Math.hypot(dx, dy);
      if (l > 1e-9) {
        dx /= l;
        dy /= l;
        if (!forward) {
          dx = -dx;
          dy = -dy;
        }
        const cx = sx(a[0]);
        const cy = sy(a[1]);
        scene.push(
          <polygon
            key={`fh${idx}`}
            points={`${cx + dx * 5},${cy + dy * 5} ${cx - dx * 4 - dy * 4},${cy - dy * 4 + dx * 4} ${cx - dx * 4 + dy * 4},${cy - dy * 4 - dx * 4}`}
            className="fill-plot"
            opacity={0.85}
          />,
        );
      }
    }
  });
  arrowGrid.forEach(({ p, dir, w }) => {
    const half = gridArrowLen / 2;
    scene.push(
      <g key={`ga${p[0]},${p[1]}`} opacity={w}>
        <ArrowSvg
          x1={sx(p[0] - dir[0] * half)}
          y1={sy(p[1] - dir[1] * half)}
          x2={sx(p[0] + dir[0] * half)}
          y2={sy(p[1] + dir[1] * half)}
          color="muted"
          width={1.6}
        />
      </g>,
    );
  });

  // Probe and its field arrow(s).
  const superpose = readouts.includes("superposition");
  if (mode !== "force" && showProbe && !P.singular) {
    if (superpose) {
      const mags = [Emag, ...P.parts.map((q) => q.mag)];
      const pxPer = 80 / Math.max(...mags, 1e-30);
      P.parts.forEach((q, i) =>
        scene.push(arrowPx(probe, q.e, q.mag * pxPer, "aux", { dashed: true, width: 2, key: `ep${i}` })),
      );
      scene.push(arrowPx(probe, P.e, Emag * pxPer, "result", { width: 3, key: "enet" }));
    } else if (mode !== "work") {
      scene.push(arrowPx(probe, P.e, logPx(Emag), "result", { width: 3, key: "enet" }));
    }
  }
  if (mode === "work" && showProbe) {
    const ax = sx(probe[0]);
    const ay = sy(probe[1]);
    const bx = sx(probeB[0]);
    const by = sy(probeB[1]);
    const mx = (ax + bx) / 2 - (by - ay) * 0.5;
    const my = (ay + by) / 2 + (bx - ax) * 0.5;
    scene.push(
      <line key="path1" x1={ax} y1={ay} x2={bx} y2={by} className="stroke-callout-tip" strokeWidth={2} strokeDasharray="6 4" />,
      <path key="path2" d={`M${ax} ${ay} Q${mx} ${my} ${bx} ${by}`} fill="none" className="stroke-callout-definition" strokeWidth={2} strokeDasharray="6 4" />,
    );
  }
  if (mode === "force") {
    const tq = charges[target];
    const mags = [Math.hypot(netF[0], netF[1]), ...forceParts.map((f) => f?.mag ?? 0)];
    const pxPer = 90 / Math.max(...mags, 1e-30);
    forceParts.forEach((f, i) => {
      if (f && !f.coincident) scene.push(arrowPx(tq.pos, f.f, f.mag * pxPer, "aux", { dashed: true, width: 2, key: `fp${i}` }));
    });
    if (!coincident) {
      scene.push(arrowPx(tq.pos, netF, Math.hypot(netF[0], netF[1]) * pxPer, "result", { width: 3, key: "fnet" }));
    }
  }

  // ---------- interaction ----------
  const quantise = (v: number) => Math.round(v / config.snap) * config.snap;
  function moveHandle(hd: Handle, world: V2) {
    const p: V2 = [
      Number(clamp(quantise(world[0]), win.xmin, win.xmax).toFixed(6)),
      Number(clamp(quantise(world[1]), win.ymin, win.ymax).toFixed(6)),
    ];
    if (hd.kind === "probe") setProbe(p);
    else if (hd.kind === "probeB") setProbeB(p);
    else setCharges((prev) => prev.map((c, i) => (i === hd.i ? { ...c, pos: p } : c)));
  }
  function worldFromEvent(e: React.PointerEvent<SVGSVGElement>): V2 {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    return [win.xmin + px / u, win.ymin + (H - py) / u];
  }
  function reset() {
    setCharges(initialCharges());
    setProbe(config.probe);
    setProbeB(config.probeB);
  }

  const handles: { hd: Handle; p: V2; label: string; key: string }[] = [];
  charges.forEach((c, i) => {
    if (config.charges[i].draggable) handles.push({ hd: { kind: "charge", i }, p: c.pos, label: `charge ${i + 1}`, key: `c${i}` });
  });
  if (showProbe && mode !== "force") {
    handles.push({ hd: { kind: "probe" }, p: probe, label: mode === "work" ? "point A" : "probe point P", key: "p" });
    if (mode === "work") handles.push({ hd: { kind: "probeB" }, p: probeB, label: "point B", key: "pb" });
  }
  const isDragging = (hd: Handle) =>
    dragging !== null &&
    dragging.kind === hd.kind &&
    (hd.kind !== "charge" || (dragging.kind === "charge" && dragging.i === hd.i));

  // ---------- readouts ----------
  const lines: { key: string; latex: string; note?: string }[] = [];
  const posLatex = (p: V2) => `(${sigText(p[0])},\\,${sigText(p[1])})${unitText}`;
  if (mode !== "force" && mode !== "work") {
    if (P.singular) {
      lines.push({ key: "sing", latex: `P \\text{ sits on a charge: } \\vec E \\text{ and } V \\text{ are undefined there}` });
    } else {
      if (readouts.includes("field")) {
        lines.push({
          key: "E",
          latex: `\\lvert\\vec E_P\\rvert = ${sciLatex(Emag)}\\ \\text{N/C}`,
          note: Emag > 0 ? `pointing at ${sigText(directionDeg(P.e[0], P.e[1]))}° from +x` : "zero field: a neutral point",
        });
      }
      if (readouts.includes("components")) {
        lines.push({ key: "Ec", latex: `E_x = ${sciLatex(P.e[0])},\\quad E_y = ${sciLatex(P.e[1])}\\ \\text{N/C}` });
      }
      if (readouts.includes("superposition")) {
        P.parts.forEach((q, i) => {
          if (charges[i].q === 0) return;
          lines.push({
            key: `sp${i}`,
            latex: `E_{${i + 1}} = \\frac{k\\lvert ${names[i]}\\rvert}{r_{${i + 1}}^2} = \\frac{(9\\times 10^{9})(${sigText(Math.abs(charges[i].q))}\\times 10^{-6})}{(${sigText(q.r)})^2} = ${sciLatex(q.mag)}\\ \\text{N/C}`,
            note: charges[i].q > 0 ? "away from the + charge" : "towards the − charge",
          });
        });
        if (charges.length > 1) {
          lines.push({ key: "spn", latex: `\\vec E_P = ${charges.map((_, i) => `\\vec E_{${i + 1}}`).join(" + ")}\\ \\text{(vector sum, green arrow)}` });
        }
      }
      if (readouts.includes("potential")) {
        lines.push({
          key: "V",
          latex: `V_P = \\sum \\frac{k q_i}{r_i} = ${sciLatex(P.v)}\\ \\text{V}`,
          note: "a scalar: signs add, directions don't matter",
        });
      }
      if (readouts.includes("force")) {
        lines.push({
          key: "F0",
          latex: `\\lvert\\vec F\\rvert = \\lvert q_0\\rvert\\,\\lvert\\vec E_P\\rvert = (${sigText(Math.abs(q0))}\\times 10^{-6})(${sciLatex(Emag)}) = ${sciLatex(Math.abs(q0) * MICRO * Emag)}\\ \\text{N}`,
          note: q0 < 0 ? "opposite to E (negative test charge)" : "along E",
        });
      }
    }
    lines.push({ key: "Ppos", latex: `P = ${posLatex(probe)}` });
  }
  if (mode === "force") {
    const tq = charges[target];
    if (coincident) {
      lines.push({ key: "coin", latex: `\\text{Two charges coincide: the force is undefined}` });
    } else {
      forceParts.forEach((f, i) => {
        if (!f || charges[i].q === 0) return;
        lines.push({
          key: `f${i}`,
          latex: `F_{${i + 1}\\to ${target + 1}} = \\frac{k\\lvert ${names[i]}\\,${names[target]}\\rvert}{r^2} = \\frac{(9\\times 10^{9})(${sigText(Math.abs(charges[i].q))}\\times 10^{-6})(${sigText(Math.abs(tq.q))}\\times 10^{-6})}{(${sigText(f.r)})^2} = ${sciLatex(f.mag)}\\ \\text{N}`,
          note: f.mag === 0 ? undefined : f.repel ? "repulsion" : "attraction",
        });
      });
      const nm = Math.hypot(netF[0], netF[1]);
      lines.push({
        key: "fnet",
        latex: `\\vec F_{\\text{net}} = (${sciLatex(netF[0])},\\ ${sciLatex(netF[1])})\\ \\text{N},\\quad \\lvert\\vec F_{\\text{net}}\\rvert = ${sciLatex(nm)}\\ \\text{N}`,
        note: nm > 0 ? `at ${sigText(directionDeg(netF[0], netF[1]))}° from +x` : "balanced: net force zero",
      });
    }
  }
  if (mode === "work" && readouts.includes("work")) {
    if (P.singular || B.singular) {
      lines.push({ key: "wsing", latex: `\\text{A or B sits on a charge: potential undefined}` });
    } else {
      const w = q0 * MICRO * (P.v - B.v);
      lines.push({ key: "VA", latex: `V_A = ${sciLatex(P.v)}\\ \\text{V},\\qquad V_B = ${sciLatex(B.v)}\\ \\text{V}` });
      lines.push({
        key: "W",
        latex: `W_{\\text{field}} = q_0(V_A - V_B) = (${sigText(q0)}\\times 10^{-6})(${sciLatex(P.v - B.v)}) = ${sciLatex(w)}\\ \\text{J}`,
        note: "same along both dashed paths",
      });
      lines.push({
        key: "U",
        latex: `\\Delta U = -W_{\\text{field}} = ${sciLatex(-w)}\\ \\text{J} = W_{\\text{external}}\\ \\text{(slow move)}`,
      });
    }
    lines.push({ key: "AB", latex: `A = ${posLatex(probe)},\\quad B = ${posLatex(probeB)}` });
  }
  if (mode !== "work" && readouts.includes("work")) {
    // Work readout outside work mode: from P to infinity.
    if (!P.singular) {
      lines.push({ key: "Winf", latex: `W_{P\\to\\infty} = q_0 V_P = ${sciLatex(q0 * MICRO * P.v)}\\ \\text{J}` });
    }
  }
  if (readouts.includes("dipole") && charges.length === 2 && Math.abs(charges[0].q + charges[1].q) < 1e-12 && charges[0].q !== 0) {
    const d = Math.hypot(charges[0].pos[0] - charges[1].pos[0], charges[0].pos[1] - charges[1].pos[1]) * scale;
    lines.push({
      key: "dip",
      latex: `p = q\\,(2a) = (${sigText(Math.abs(charges[0].q))}\\times 10^{-6})(${sigText(d)}) = ${sciLatex(Math.abs(charges[0].q) * MICRO * d)}\\ \\text{C m}`,
      note: "points from − to +",
    });
  }

  // ---------- grid ----------
  const gridStep = niceStep(width / 10);
  const xs: number[] = [];
  for (let x = Math.ceil(win.xmin / gridStep) * gridStep; x <= win.xmax + 1e-9; x += gridStep) xs.push(Number(x.toFixed(6)));
  const ys: number[] = [];
  for (let y = Math.ceil(win.ymin / gridStep) * gridStep; y <= win.ymax + 1e-9; y += gridStep) ys.push(Number(y.toFixed(6)));

  const layerNames: Record<Layer, string> = { lines: "Field lines", equipotentials: "Equipotentials", vectors: "Field arrows" };

  return (
    <InteractiveFrame title="Electric field">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-md select-none rounded-md border bg-background"
        role="group"
        aria-label="Point charges with draggable handles"
        onPointerMove={(e) => {
          if (dragging) moveHandle(dragging, worldFromEvent(e));
        }}
        onPointerUp={() => setDragging(null)}
        onPointerCancel={() => setDragging(null)}
      >
        {xs.map((x) => (
          <line key={`gx${x}`} x1={sx(x)} y1={0} x2={sx(x)} y2={H} className="stroke-border" strokeWidth={0.5} />
        ))}
        {ys.map((y) => (
          <line key={`gy${y}`} x1={0} y1={sy(y)} x2={W} y2={sy(y)} className="stroke-border" strokeWidth={0.5} />
        ))}
        {scene}
        {mode === "work" && showProbe && (
          <>
            <SvgLatex x={sx(probe[0]) - 12} y={sy(probe[1]) + 14} latex="A" />
            <SvgLatex x={sx(probeB[0]) + 12} y={sy(probeB[1]) + 14} latex="B" />
          </>
        )}
        {mode !== "work" && mode !== "force" && showProbe && (
          <SvgLatex x={sx(probe[0]) - 12} y={sy(probe[1]) + 14} latex="P" />
        )}
        {charges.map((c, i) => {
          const cls = c.q > 0 ? "fill-destructive" : c.q < 0 ? "fill-callout-info" : "fill-muted-foreground";
          const ring = mode === "force" && i === target;
          return (
            <g key={`ch${i}`} pointerEvents="none">
              {ring && <circle cx={sx(c.pos[0])} cy={sy(c.pos[1])} r={16} fill="none" className="stroke-callout-tip" strokeWidth={2} />}
              <circle cx={sx(c.pos[0])} cy={sy(c.pos[1])} r={11} className={cls} />
              <text x={sx(c.pos[0])} y={sy(c.pos[1]) + 4.5} textAnchor="middle" className="fill-background text-[14px] font-bold">
                {c.q > 0 ? "+" : c.q < 0 ? "−" : "0"}
              </text>
              <SvgLatex
                x={sx(c.pos[0])}
                y={sy(c.pos[1]) - 22}
                latex={`${names[i]} = ${c.q > 0 ? "+" : ""}${sigText(c.q)}\\,\\mu\\text{C}`}
              />
            </g>
          );
        })}
        {handles.map(({ hd, p, label, key }) => {
          const hx = sx(p[0]);
          const hy = sy(p[1]);
          const isCharge = hd.kind === "charge";
          return (
            <g
              key={`h-${key}`}
              tabIndex={0}
              role="button"
              aria-label={`Move ${label}, now at (${sigText(p[0])}, ${sigText(p[1])}). Use arrow keys.`}
              className={`group outline-none ${isDragging(hd) ? "cursor-grabbing" : "cursor-grab"}`}
              style={{ touchAction: "none" }}
              onPointerDown={(e) => {
                e.preventDefault();
                svgRef.current?.setPointerCapture(e.pointerId);
                setDragging(hd);
              }}
              onKeyDown={(e) => {
                const delta: Record<string, V2> = {
                  ArrowLeft: [-config.snap, 0],
                  ArrowRight: [config.snap, 0],
                  ArrowUp: [0, config.snap],
                  ArrowDown: [0, -config.snap],
                };
                const d = delta[e.key];
                if (!d) return;
                e.preventDefault();
                moveHandle(hd, [p[0] + d[0], p[1] + d[1]]);
              }}
            >
              <circle cx={hx} cy={hy} r={18} fill="transparent" />
              <circle
                cx={hx}
                cy={hy}
                r={isCharge ? 14 : 10}
                fill="none"
                className="stroke-transparent group-focus-visible:stroke-foreground"
                strokeWidth={1.5}
              />
              {!isCharge && <circle cx={hx} cy={hy} r={5.5} className="fill-background stroke-foreground stroke-2" />}
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Layers">
        {(["lines", "equipotentials", "vectors"] as const).map((layer) => (
          <button
            key={layer}
            type="button"
            aria-pressed={layers[layer]}
            onClick={() => setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }))}
            className={`rounded-md border px-3 py-1 ${layers[layer] ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
          >
            {layerNames[layer]}
          </button>
        ))}
      </div>

      {config.chargeSlider && (
        <div className="space-y-2">
          {charges.map((c, i) => (
            <SliderRow
              key={`qs${i}`}
              label={<Latex latex={names[i]} />}
              value={c.q}
              min={config.chargeSlider!.min}
              max={config.chargeSlider!.max}
              step={config.chargeSlider!.step}
              unit="μC"
              onChange={(v) => setCharges((prev) => prev.map((x, j) => (j === i ? { ...x, q: v } : x)))}
            />
          ))}
        </div>
      )}

      {lines.length > 0 && (
        <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
          {lines.map((l) => (
            <div key={l.key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="overflow-x-auto">
                <Latex latex={l.latex} />
              </span>
              {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
            </div>
          ))}
          {mode === "work" && readouts.includes("work") && (
            <p className="text-xs text-muted-foreground">
              Test charge <Latex latex={`q_0 = ${sigText(q0)}\\,\\mu\\text{C}`} />.
            </p>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {config.caption ?? DEFAULT_CAPTIONS[mode]}
          {mode !== "force" && !superpose && showProbe && mode !== "work" && " (The arrow at P is log-scaled.)"}
          {` Grid squares are ${sigText(gridStep)} ${config.unit}; k = 9 × 10⁹ N m² C⁻².`}
        </p>
        <button type="button" onClick={reset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
          Reset
        </button>
      </div>
    </InteractiveFrame>
  );
}
