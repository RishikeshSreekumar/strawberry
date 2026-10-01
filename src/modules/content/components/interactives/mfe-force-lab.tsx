"use client";

import { useState } from "react";
import type { z } from "zod";
import type { mfeForceLabSchema } from "../../schemas/blocks";
import {
  CaptionRow,
  f2,
  MfePlot,
  Notes,
  ParamSlider,
  q,
  Readouts,
  U,
  type MfeRange,
  type ReadoutItem,
} from "./mfe-motion-lab";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex, type VecColor } from "./vec-canvas-2d";

type Config = z.infer<typeof mfeForceLabSchema>;
type Mode = Config["mode"];
type SliderKey = keyof Config["sliders"];

const BASE: Record<SliderKey, MfeRange> = {
  m: { min: 1, max: 20, step: 1, initial: 5 },
  m1: { min: 1, max: 10, step: 1, initial: 3 },
  m2: { min: 1, max: 10, step: 1, initial: 5 },
  angle: { min: 0, max: 60, step: 1, initial: 30 },
  muS: { min: 0, max: 1, step: 0.05, initial: 0.5 },
  muK: { min: 0, max: 1, step: 0.05, initial: 0.4 },
  mu: { min: 0, max: 1, step: 0.05, initial: 0.3 },
  force: { min: -100, max: 100, step: 5, initial: 0 },
  a: { min: -10, max: 10, step: 0.5, initial: 2 },
  radius: { min: 10, max: 200, step: 10, initial: 50 },
  speed: { min: 0, max: 40, step: 1, initial: 12 },
  theta: { min: 0, max: 360, step: 5, initial: 90 },
  k: { min: 10, max: 400, step: 10, initial: 100 },
  x0: { min: 0.1, max: 1, step: 0.05, initial: 0.5 },
};

const MODE_OVERRIDES: Record<Mode, Partial<Record<SliderKey, MfeRange>>> = {
  incline: {},
  friction: { force: { min: 0, max: 60, step: 1, initial: 10 } },
  lift: { m: { min: 40, max: 80, step: 5, initial: 60 } },
  atwood: {},
  "table-pulley": { m1: { min: 1, max: 10, step: 1, initial: 4 }, m2: { min: 1, max: 10, step: 1, initial: 2 }, mu: { min: 0, max: 1, step: 0.05, initial: 0.2 } },
  "block-on-block": { m1: { min: 1, max: 10, step: 1, initial: 2 }, m2: { min: 1, max: 10, step: 1, initial: 4 }, force: { min: 0, max: 60, step: 1, initial: 10 } },
  banking: { m: { min: 500, max: 2000, step: 100, initial: 1000 }, angle: { min: 0, max: 45, step: 1, initial: 15 }, mu: { min: 0, max: 1, step: 0.05, initial: 0.2 } },
  "vertical-circle": { m: { min: 0.5, max: 5, step: 0.5, initial: 1 }, radius: { min: 0.5, max: 5, step: 0.5, initial: 1 }, speed: { min: 0, max: 15, step: 0.5, initial: 8 } },
  spring: { m: { min: 0.5, max: 5, step: 0.5, initial: 1 }, mu: { min: 0, max: 0.5, step: 0.05, initial: 0.1 } },
};

const MODE_KEYS: Record<Mode, SliderKey[]> = {
  incline: ["m", "angle", "muS", "muK", "force"],
  friction: ["m", "muS", "muK", "force"],
  lift: ["m", "a"],
  atwood: ["m1", "m2"],
  "table-pulley": ["m1", "m2", "mu"],
  "block-on-block": ["m1", "m2", "mu", "force"],
  banking: ["m", "angle", "radius", "speed", "mu"],
  "vertical-circle": ["m", "radius", "speed", "theta"],
  spring: ["m", "k", "x0", "mu"],
};

const LABELS: Record<SliderKey, string> = {
  m: "m",
  m1: "m_1",
  m2: "m_2",
  angle: "\\theta",
  muS: "\\mu_s",
  muK: "\\mu_k",
  mu: "\\mu",
  force: "F",
  a: "a",
  radius: "R",
  speed: "v",
  theta: "\\theta",
  k: "k",
  x0: "x_0",
};

const UNITS: Record<SliderKey, string> = {
  m: "kg",
  m1: "kg",
  m2: "kg",
  angle: "°",
  muS: "",
  muK: "",
  mu: "",
  force: "N",
  a: "m/s²",
  radius: "m",
  speed: "m/s",
  theta: "°",
  k: "N/m",
  x0: "m",
};

const TITLES: Record<Mode, string> = {
  incline: "Block on an incline",
  friction: "Static and kinetic friction",
  lift: "Weighing scale in a lift",
  atwood: "Atwood machine",
  "table-pulley": "Block on a table, block hanging",
  "block-on-block": "Block on a block",
  banking: "Banked curve",
  "vertical-circle": "Vertical circle",
  spring: "Spring and friction",
};

const CAPTIONS: Record<Mode, string> = {
  incline: "Static friction only supplies what is needed, up to μs N. Push harder than that and the block slides with kinetic friction μk N.",
  friction: "Friction matches your pull until it reaches μs mg; then the block breaks free and friction drops to μk mg.",
  lift: "Switch frames: from the ground, N − mg = ma; inside the lift, add the pseudo force −ma and everything balances.",
  atwood: "The heavier side accelerates down; the string tension sits between the two weights.",
  "table-pulley": "The hanging weight must beat the table friction before anything moves.",
  "block-on-block": "Friction between the blocks can only drag the other block so hard; past that, they slip.",
  banking: "At the design speed the normal force alone supplies the centripetal force; faster or slower needs friction.",
  "vertical-circle": "Slide θ round the circle. Tension is least at the top; if it would go negative the string goes slack.",
  spring: "Slide the block through its first pass. Spring energy turns into kinetic energy and heat; the area under F-x is the work.",
};

const DEG = Math.PI / 180;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Force arrow from (x, y) with screen offset (dx, dy) and a KaTeX label past the tip. */
function force(
  key: string,
  x: number,
  y: number,
  dx: number,
  dy: number,
  color: VecColor,
  label?: string,
  opts: { dashed?: boolean; width?: number } = {},
) {
  const l = Math.hypot(dx, dy);
  if (l < 0.5) return null;
  const ux = dx / l;
  const uy = dy / l;
  return (
    <g key={key}>
      <ArrowSvg x1={x} y1={y} x2={x + dx} y2={y + dy} color={color} dashed={opts.dashed} width={opts.width ?? 2.5} />
      {label && <SvgLatex x={x + dx + ux * 16} y={y + dy + uy * 12} latex={label} />}
    </g>
  );
}

/** Pixels per newton so the largest force is `px` long. */
const fScale = (forces: number[], px = 70) => {
  const mx = Math.max(...forces.map(Math.abs), 1e-9);
  return px / mx;
};

function EnergyBars({ items, total }: { items: { label: string; value: number; className: string }[]; total: number }) {
  const t = total > 1e-9 ? total : 1;
  return (
    <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-3">
          <span className="w-24 shrink-0">
            <Latex latex={it.label} />
          </span>
          <div className="h-3 flex-1 overflow-hidden rounded bg-muted">
            <div className={`h-full ${it.className}`} style={{ width: `${clamp((it.value / t) * 100, 0, 100).toFixed(1)}%` }} />
          </div>
          <span className="w-20 shrink-0 text-right tabular-nums text-muted-foreground">{f2(it.value)} J</span>
        </div>
      ))}
    </div>
  );
}

/** A block drawn as a rectangle centred at (cx, cy), rotated by `rot` degrees. */
function Block({ cx, cy, w, h, rot = 0, label }: { cx: number; cy: number; w: number; h: number; rot?: number; label?: string }) {
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={3} className="fill-muted stroke-foreground/70" strokeWidth={1.5} />
      {label && <SvgLatex x={cx} y={cy} latex={label} />}
    </g>
  );
}

export function MfeForceLab({ config }: { config: Config }) {
  const { mode, g } = config;
  const ranges: Record<SliderKey, MfeRange> = { ...BASE, ...MODE_OVERRIDES[mode] };
  for (const k of Object.keys(config.sliders) as SliderKey[]) {
    const r = config.sliders[k];
    if (r) ranges[k] = r;
  }
  const initialValues = () =>
    Object.fromEntries((Object.keys(ranges) as SliderKey[]).map((k) => [k, ranges[k].initial])) as Record<SliderKey, number>;
  const [p, setP] = useState<Record<SliderKey, number>>(initialValues);
  const set = (k: SliderKey) => (v: number) => setP((prev) => ({ ...prev, [k]: v }));
  const [frame, setFrame] = useState(config.frame);
  const [springX, setSpringX] = useState(-ranges.x0.initial);
  const reset = () => {
    setP(initialValues());
    setFrame(config.frame);
    setSpringX(-ranges.x0.initial);
  };

  let body: React.ReactNode = null;
  let readouts: ReadoutItem[] = [];
  const notes: string[] = [];
  let extra: React.ReactNode = null;

  switch (mode) {
    case "incline": {
      const { m, angle } = p;
      const muS = p.muS;
      const muK = Math.min(p.muK, p.muS);
      if (p.muK > p.muS) notes.push("μk cannot exceed μs; using μk = μs.");
      const th = angle * DEG;
      const W = m * g;
      const N = W * Math.cos(th);
      const Wpar = W * Math.sin(th);
      const F = p.force;
      const fReq = Wpar - F; // up-slope positive
      const fMax = muS * N;
      let f: number;
      let acc = 0;
      let state: string;
      if (Math.abs(fReq) <= fMax + 1e-9) {
        f = fReq;
        state = Math.abs(Math.abs(fReq) - fMax) < 1e-9 && fMax > 0 ? "limiting (on the verge of slipping)" : "static: at rest";
      } else {
        const dir = Math.sign(F - Wpar);
        f = -dir * muK * N;
        acc = (F - Wpar + f) / m;
        state = dir > 0 ? "sliding up the slope" : "sliding down the slope";
      }
      const L = Math.min(300, angle > 0 ? 190 / Math.sin(th) : 300);
      const Hs = 250;
      const bx = 40;
      const by = Hs - 20;
      const topX = bx + L * Math.cos(th);
      const topY = by - L * Math.sin(th);
      const sxv = Math.cos(th);
      const syv = -Math.sin(th);
      const nx = -Math.sin(th);
      const ny = -Math.cos(th);
      const along = 0.5 * L;
      const cx = bx + sxv * along + nx * 17;
      const cy = by + syv * along + ny * 17;
      const k = fScale([W, N, f, F]);
      body = (
        <svg viewBox={`0 0 400 ${Hs}`} className="w-full rounded-md border bg-background" role="img" aria-label="Free-body diagram of a block on an incline">
          <polygon points={`${bx},${by} ${topX},${by} ${topX},${topY}`} className="fill-muted/60 stroke-foreground/60" strokeWidth={1.5} />
          <SvgLatex x={bx + 40} y={by - 10} latex="\theta" />
          <Block cx={cx} cy={cy} w={46} h={32} rot={-angle} />
          {config.showComponents && angle > 0 && (
            <g>
              {force("wpar", cx, cy, -sxv * Wpar * k, -syv * Wpar * k, "muted", "mg\\sin\\theta", { dashed: true, width: 1.5 })}
              {force("wperp", cx, cy, -nx * N * k, -ny * N * k, "muted", "mg\\cos\\theta", { dashed: true, width: 1.5 })}
            </g>
          )}
          {force("w", cx, cy, 0, W * k, "b", "mg")}
          {force("n", cx, cy, nx * N * k, ny * N * k, "c", "N")}
          {force("f", cx, cy, sxv * f * k, syv * f * k, "aux", "f")}
          {force("F", cx, cy, sxv * F * k, syv * F * k, "a", "F")}
        </svg>
      );
      readouts = [
        { latex: `N = mg\\cos\\theta = ${f2(N)}\\,${U.N}`, note: "not mg" },
        { latex: `mg\\sin\\theta = ${f2(Wpar)}\\,${U.N}`, note: "down the slope" },
        { latex: `f_{s,\\max} = \\mu_s N = ${f2(fMax)}\\,${U.N}` },
        { latex: `f = ${f2(Math.abs(f))}\\,${U.N}`, note: `${f > 1e-9 ? "up the slope" : f < -1e-9 ? "down the slope" : "zero"}; ${state}` },
        { latex: q("a", acc, U.ms2), note: acc === 0 ? "at rest" : acc > 0 ? "up the slope" : "down the slope" },
        { latex: `\\tan\\theta_r = \\mu_s \\Rightarrow \\theta_r = ${f2(Math.atan(muS) / DEG)}^\\circ`, note: "angle of repose (F = 0)" },
      ];
      break;
    }

    case "friction": {
      const { m } = p;
      const muS = p.muS;
      const muK = Math.min(p.muK, p.muS);
      if (p.muK > p.muS) notes.push("μk cannot exceed μs; using μk = μs.");
      const W = m * g;
      const fs = muS * W;
      const fk = muK * W;
      const F = Math.max(0, p.force);
      const moving = F > fs + 1e-9;
      const f = moving ? fk : F;
      const acc = moving ? (F - fk) / m : 0;
      const k = fScale([W, F, f], 60);
      const cx = 200;
      const cy = 100;
      body = (
        <svg viewBox="0 0 400 170" className="w-full rounded-md border bg-background" role="img" aria-label="Block pulled along a rough floor">
          <line x1={20} y1={cy + 22} x2={380} y2={cy + 22} className="stroke-foreground/60" strokeWidth={2} />
          {Array.from({ length: 18 }, (_, i) => (
            <line key={i} x1={24 + i * 20} y1={cy + 22} x2={14 + i * 20} y2={cy + 32} className="stroke-foreground/30" />
          ))}
          <Block cx={cx} cy={cy} w={70} h={44} label="m" />
          {force("F", cx + 35, cy, F * k, 0, "a", "F")}
          {force("f", cx - 35, cy + 20, -f * k, 0, "aux", "f")}
          {force("W", cx, cy + 22, 0, Math.min(W * k, 45), "b", "mg")}
          {force("N", cx, cy - 22, 0, -Math.min(W * k, 60), "c", "N")}
        </svg>
      );
      const Fmax = Math.max(ranges.force.max, fs * 1.3, 1);
      const pts: [number, number][] = [[0, 0], [fs, fs]];
      extra = config.showGraph ? (
        <MfePlot
          xmin={0}
          xmax={Fmax}
          ymin={0}
          ymax={Math.max(fs, fk, 1) * 1.25}
          xLabel="applied F (N)"
          yLabel="friction f (N)"
          series={[
            { pts, className: "stroke-callout-warning" },
            { pts: [[fs, fs], [fs, fk]], className: "stroke-callout-warning", dashed: true, width: 1.5 },
            { pts: [[fs, fk], [Fmax, fk]], className: "stroke-callout-warning" },
          ]}
          markers={[{ x: F, y: f, className: "fill-primary" }]}
        />
      ) : null;
      readouts = [
        { latex: `N = mg = ${f2(W)}\\,${U.N}` },
        { latex: `f_{s,\\max} = \\mu_s N = ${f2(fs)}\\,${U.N}` },
        { latex: `f_k = \\mu_k N = ${f2(fk)}\\,${U.N}` },
        { latex: q("f", f, U.N), note: moving ? "kinetic: sliding" : F >= fs - 1e-9 && F > 0 ? "limiting" : "static: equals F" },
        { latex: `a = \\dfrac{F - f}{m} = ${f2(acc)}\\,${U.ms2}` },
      ];
      if (!moving && F > 0) notes.push("The block does not move, so friction is exactly F, not μs mg.");
      break;
    }

    case "lift": {
      const { m, a } = p;
      const Nraw = m * (g + a);
      const N = Math.max(0, Nraw);
      const W = m * g;
      const pseudo = frame === "lift";
      const k = fScale([W, N, m * Math.abs(a)], 70);
      const cx = 200;
      const floorY = 200;
      const bodyY = 150;
      body = (
        <div className="space-y-2">
          <div className="flex gap-2 text-sm" role="group" aria-label="Frame of reference">
            {(["ground", "lift"] as const).map((fr) => (
              <button
                key={fr}
                type="button"
                aria-pressed={frame === fr}
                onClick={() => setFrame(fr)}
                className={`rounded-md border px-3 py-1 ${frame === fr ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
              >
                {fr === "ground" ? "Ground frame" : "Lift frame"}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 400 240" className="w-full rounded-md border bg-background" role="img" aria-label="Person on a scale in a lift">
            <rect x={110} y={20} width={180} height={200} rx={4} className="fill-muted/40 stroke-foreground/60" strokeWidth={2} />
            <line x1={200} y1={0} x2={200} y2={20} className="stroke-foreground/60" strokeWidth={2} />
            <rect x={165} y={floorY - 10} width={70} height={10} className="fill-callout-definition/40 stroke-callout-definition" />
            <Block cx={cx} cy={bodyY} w={44} h={70} label="m" />
            {force("N", cx - 8, bodyY + 35, 0, -N * k, "c", "N")}
            {force("W", cx + 8, bodyY - 35, 0, W * k, "b", "mg")}
            {pseudo && Math.abs(a) > 1e-9 && force("ps", cx + 24, bodyY, 0, a * m * k, "muted", "ma\\,(\\text{pseudo})", { dashed: true })}
            {Math.abs(a) > 1e-9 && force("al", 320, 120, 0, -Math.sign(a) * clamp(Math.abs(a) * 8, 12, 70), "result", "\\vec a")}
          </svg>
        </div>
      );
      readouts = pseudo
        ? [
            { latex: `N - mg - ma = 0`, note: "lift frame: at rest, pseudo force −ma added" },
            { latex: `N = m(g + a) = ${f2(N)}\\,${U.N}` },
          ]
        : [
            { latex: `N - mg = ma`, note: "ground frame: Newton's second law" },
            { latex: `N = m(g + a) = ${f2(N)}\\,${U.N}` },
          ];
      readouts.push(
        { latex: q("mg", W, U.N), note: "true weight, unchanged" },
        { latex: `\\text{scale reads } N/g = ${f2(N / g)}\\,${U.kg}`, note: a > 0 ? "feels heavier" : a < 0 ? "feels lighter" : "normal" },
      );
      if (Nraw <= 1e-9) notes.push(Nraw < -1e-9 ? "The lift accelerates down faster than g: the person leaves the scale (N cannot be negative)." : "Free fall: the scale reads zero. Weightlessness is N = 0, not mg = 0.");
      break;
    }

    case "atwood": {
      const { m1, m2 } = p;
      const acc = ((m2 - m1) * g) / (m1 + m2);
      const T = (2 * m1 * m2 * g) / (m1 + m2);
      const k = fScale([m1 * g, m2 * g, T], 60);
      const px = 200;
      const py = 40;
      const r = 30;
      const y1 = 150 + clamp(-acc * 4, -30, 30);
      const y2 = 150 + clamp(acc * 4, -30, 30);
      const bh = (mm: number) => 24 + mm * 3;
      body = (
        <svg viewBox="0 0 400 260" className="w-full rounded-md border bg-background" role="img" aria-label="Atwood machine">
          <line x1={px} y1={0} x2={px} y2={py} className="stroke-foreground/60" strokeWidth={2} />
          <circle cx={px} cy={py} r={r} className="fill-muted stroke-foreground/70" strokeWidth={2} />
          <line x1={px - r} y1={py} x2={px - r} y2={y1 - bh(m1) / 2} className="stroke-foreground" strokeWidth={1.5} />
          <line x1={px + r} y1={py} x2={px + r} y2={y2 - bh(m2) / 2} className="stroke-foreground" strokeWidth={1.5} />
          <Block cx={px - r} cy={y1} w={40} h={bh(m1)} label="m_1" />
          <Block cx={px + r} cy={y2} w={40} h={bh(m2)} label="m_2" />
          {force("T1", px - r - 36, y1, 0, -T * k, "c", "T")}
          {force("W1", px - r - 36, y1, 0, m1 * g * k, "b", "m_1g")}
          {force("T2", px + r + 36, y2, 0, -T * k, "c", "T")}
          {force("W2", px + r + 36, y2, 0, m2 * g * k, "b", "m_2g")}
          {Math.abs(acc) > 1e-9 && force("a1", px - r - 80, y1, 0, -Math.sign(acc) * 30, "result", "a")}
          {Math.abs(acc) > 1e-9 && force("a2", px + r + 80, y2, 0, Math.sign(acc) * 30, "result", "a")}
        </svg>
      );
      readouts = [
        { latex: "m_2 g - T = m_2 a,\\quad T - m_1 g = m_1 a" },
        { latex: `a = \\dfrac{(m_2 - m_1)g}{m_1 + m_2} = ${f2(Math.abs(acc))}\\,${U.ms2}`, note: acc > 1e-9 ? "m₂ goes down" : acc < -1e-9 ? "m₁ goes down" : "balanced" },
        { latex: `T = \\dfrac{2m_1m_2 g}{m_1 + m_2} = ${f2(T)}\\,${U.N}`, note: "between m₁g and m₂g" },
        { latex: `\\text{pulley support} = 2T = ${f2(2 * T)}\\,${U.N}`, note: `less than (m₁ + m₂)g = ${f2((m1 + m2) * g)} N unless balanced` },
      ];
      break;
    }

    case "table-pulley": {
      const { m1, m2, mu } = p;
      const fMax = mu * m1 * g;
      const moves = m2 * g > fMax + 1e-9;
      const acc = moves ? ((m2 - mu * m1) * g) / (m1 + m2) : 0;
      const T = m2 * (g - acc);
      const f = moves ? fMax : m2 * g;
      const k = fScale([m1 * g, m2 * g, T, f], 55);
      const tableY = 110;
      const edge = 290;
      const bx = 170;
      const hy = 190;
      body = (
        <svg viewBox="0 0 400 260" className="w-full rounded-md border bg-background" role="img" aria-label="Block on a table connected over a pulley to a hanging block">
          <rect x={20} y={tableY} width={edge - 20} height={10} className="fill-muted stroke-foreground/60" />
          <line x1={40} y1={tableY + 10} x2={40} y2={250} className="stroke-foreground/50" strokeWidth={3} />
          <line x1={edge - 20} y1={tableY + 10} x2={edge - 20} y2={250} className="stroke-foreground/50" strokeWidth={3} />
          <circle cx={edge + 12} cy={tableY - 12} r={12} className="fill-muted stroke-foreground/70" strokeWidth={2} />
          <line x1={bx + 30} y1={tableY - 12} x2={edge + 12} y2={tableY - 24} className="stroke-foreground" strokeWidth={1.5} />
          <line x1={edge + 24} y1={tableY - 12} x2={edge + 24} y2={hy - 20} className="stroke-foreground" strokeWidth={1.5} />
          <Block cx={bx} cy={tableY - 20} w={60} h={40} label="m_1" />
          <Block cx={edge + 24} cy={hy} w={40} h={40} label="m_2" />
          {force("T1", bx + 30, tableY - 30, T * k, 0, "c", "T")}
          {force("f1", bx - 30, tableY - 8, -f * k, 0, "aux", "f")}
          {force("N1", bx, tableY - 40, 0, -Math.min(m1 * g * k, 50), "c", "N")}
          {force("T2", edge + 60, hy, 0, -T * k, "c", "T")}
          {force("W2", edge + 60, hy, 0, m2 * g * k, "b", "m_2g")}
        </svg>
      );
      readouts = [
        { latex: `f_{\\max} = \\mu m_1 g = ${f2(fMax)}\\,${U.N}`, note: `vs m₂g = ${f2(m2 * g)} N` },
        { latex: moves ? `a = \\dfrac{(m_2 - \\mu m_1)g}{m_1 + m_2} = ${f2(acc)}\\,${U.ms2}` : "a = 0", note: moves ? "system moves" : "static friction holds it" },
        { latex: q("T", T, U.N), note: moves ? "T = m₂(g − a)" : "T = m₂g" },
        { latex: q("f", f, U.N), note: moves ? "kinetic" : "static, just what is needed" },
      ];
      break;
    }

    case "block-on-block": {
      const { m1, m2, mu } = p;
      const F = Math.max(0, p.force);
      const onBottom = config.pushOn === "bottom";
      const fMax = mu * m1 * g;
      const Fcrit = onBottom ? mu * g * (m1 + m2) : (fMax * (m1 + m2)) / m2;
      const together = F <= Fcrit + 1e-9;
      let a1: number;
      let a2: number;
      let f: number;
      if (together) {
        a1 = a2 = F / (m1 + m2);
        f = onBottom ? m1 * a1 : m2 * a2;
      } else if (onBottom) {
        f = fMax;
        a1 = mu * g;
        a2 = (F - fMax) / m2;
      } else {
        f = fMax;
        a1 = (F - fMax) / m1;
        a2 = fMax / m2;
      }
      const k = fScale([F, f], 60);
      const floorY = 200;
      const b2 = { cx: 200, cy: floorY - 25, w: 180, h: 50 };
      const b1 = { cx: 200, cy: floorY - 50 - 20, w: 70, h: 40 };
      // Friction on top block points forward when the bottom is pushed, backward when the top is pushed.
      const fTop = onBottom ? f : -f;
      body = (
        <svg viewBox="0 0 400 240" className="w-full rounded-md border bg-background" role="img" aria-label="Block resting on another block">
          <line x1={10} y1={floorY} x2={390} y2={floorY} className="stroke-foreground/60" strokeWidth={2} />
          <SvgLatex x={350} y={floorY + 12} latex="\text{smooth}" className="text-muted-foreground" />
          <Block {...b2} label="m_2" />
          <Block {...b1} label="m_1" />
          {onBottom
            ? force("F", b2.cx + b2.w / 2, b2.cy, F * k, 0, "a", "F")
            : force("F", b1.cx + b1.w / 2, b1.cy, F * k, 0, "a", "F")}
          {force("ft", b1.cx - 10, floorY - 50 - 6, fTop * k, 0, "aux", "f")}
          {force("fb", b2.cx + 10, floorY - 50 + 8, -fTop * k, 0, "aux", "f", { dashed: true })}
        </svg>
      );
      readouts = [
        { latex: `f_{\\max} = \\mu m_1 g = ${f2(fMax)}\\,${U.N}` },
        {
          latex: onBottom
            ? `F_{\\text{crit}} = \\mu g (m_1 + m_2) = ${f2(Fcrit)}\\,${U.N}`
            : `F_{\\text{crit}} = \\mu m_1 g\\,\\dfrac{m_1 + m_2}{m_2} = ${f2(Fcrit)}\\,${U.N}`,
          note: "largest F with no slipping",
        },
        { latex: q("a_1", a1, U.ms2), note: "top block" },
        { latex: q("a_2", a2, U.ms2), note: "bottom block" },
        { latex: q("f", f, U.N), note: together ? "static: moving together" : "kinetic: slipping" },
      ];
      if (!together) notes.push(onBottom ? "The bottom block slides out from under the top one: friction can give the top block at most μg." : "The top block slides over the bottom one: friction can drag the bottom block at most μm₁g / m₂.");
      break;
    }

    case "banking": {
      const { m, angle, radius, speed, mu } = p;
      const th = angle * DEG;
      const c = Math.cos(th);
      const s = Math.sin(th);
      const ac = radius > 0 ? (speed * speed) / radius : 0;
      const N = m * (g * c + ac * s);
      const fReq = m * (ac * c - g * s); // + = down the slope
      const holds = Math.abs(fReq) <= mu * N + 1e-9;
      const vOpt = Math.sqrt(Math.max(0, radius * g * Math.tan(th)));
      const vMax = c - mu * s <= 1e-9 ? Infinity : Math.sqrt((radius * g * (s + mu * c)) / (c - mu * s));
      const vMin = s - mu * c <= 0 ? 0 : Math.sqrt((radius * g * (s - mu * c)) / (c + mu * s));
      const f = holds ? fReq : Math.sign(fReq) * mu * N;
      const W = m * g;
      const k = fScale([W, N, f, m * ac], 70);
      const ox = 230;
      const oy = 170;
      const sx = Math.cos(th);
      const sy = -Math.sin(th);
      const nx = -Math.sin(th);
      const ny = -Math.cos(th);
      const cx = ox + nx * 18;
      const cy = oy + ny * 18;
      body = (
        <svg viewBox="0 0 400 240" className="w-full rounded-md border bg-background" role="img" aria-label="Car on a banked road, cross-section">
          <line x1={ox - sx * 170} y1={oy - sy * 170} x2={ox + sx * 150} y2={oy + sy * 150} className="stroke-foreground/70" strokeWidth={3} />
          <line x1={ox - sx * 170} y1={oy - sy * 170} x2={ox + 150} y2={oy - sy * 170} className="stroke-muted-foreground/60" strokeDasharray="4 4" />
          <SvgLatex x={40} y={20} latex="\leftarrow\ \text{centre}" className="text-muted-foreground" />
          <Block cx={cx} cy={cy} w={56} h={30} rot={-angle} />
          {force("W", cx, cy, 0, W * k, "b", "mg")}
          {force("N", cx, cy, nx * N * k, ny * N * k, "c", "N")}
          {Math.abs(f) > 1e-9 && force("f", cx, cy, -sx * f * k, -sy * f * k, "aux", "f")}
          {config.showComponents && (
            <g>
              {force("Nc", cx, cy, nx * N * k, 0, "muted", "N\\sin\\theta", { dashed: true, width: 1.5 })}
              {force("Nv", cx, cy, 0, ny * N * k, "muted", "", { dashed: true, width: 1.5 })}
            </g>
          )}
          {force("need", cx, cy + 50, -m * ac * k, 0, "result", "mv^2/R", { width: 2 })}
        </svg>
      );
      readouts = [
        { latex: `v_{\\text{opt}} = \\sqrt{Rg\\tan\\theta} = ${f2(vOpt)}\\,${U.ms}`, note: "no friction needed" },
        { latex: `v_{\\min} = ${f2(vMin)}\\,${U.ms},\\ v_{\\max} = ${Number.isFinite(vMax) ? `${f2(vMax)}\\,${U.ms}` : "\\infty"}` },
        { latex: `N = m(g\\cos\\theta + \\tfrac{v^2}{R}\\sin\\theta) = ${f2(N)}\\,${U.N}` },
        {
          latex: `f_{\\text{needed}} = m(\\tfrac{v^2}{R}\\cos\\theta - g\\sin\\theta) = ${f2(Math.abs(fReq))}\\,${U.N}`,
          note: fReq > 1e-9 ? "down the slope (too fast for v_opt)" : fReq < -1e-9 ? "up the slope (too slow)" : "zero: design speed",
        },
        { latex: `\\mu N = ${f2(mu * N)}\\,${U.N}`, note: holds ? "friction can supply it" : "not enough grip" },
      ];
      if (!holds) notes.push(fReq > 0 ? "Too fast: the car skids up and outwards." : "Too slow: the car slides down the bank.");
      break;
    }

    case "vertical-circle": {
      const { m, radius: R, speed: u } = p;
      const theta = p.theta;
      const gR = g * R;
      const full = u * u >= 5 * gR - 1e-9;
      let limit = 360; // furthest angle reached on the circle
      let slack = false;
      if (!full) {
        if (u * u > 2 * gR) {
          limit = Math.acos(clamp((2 * gR - u * u) / (3 * gR), -1, 1)) / DEG;
          slack = true;
        } else {
          limit = Math.acos(clamp(1 - (u * u) / (2 * gR), -1, 1)) / DEG;
        }
      }
      const thShown = Math.min(theta, limit);
      const tr = thShown * DEG;
      const v2 = Math.max(0, u * u - 2 * gR * (1 - Math.cos(tr)));
      const v = Math.sqrt(v2);
      const T = Math.max(0, (m * v2) / R + m * g * Math.cos(tr));
      const C = 140;
      const rp = 90;
      const px = C + rp * Math.sin(tr);
      const py = C + rp * Math.cos(tr);
      const k = fScale([T, m * g, (m * u * u) / R + m * g], 60);
      const vk = 50 / Math.max(u, 1);
      // Tangent (direction of increasing θ) in screen coordinates.
      const tx = Math.cos(tr);
      const ty = -Math.sin(tr);
      let para = "";
      if (slack) {
        const ls = limit * DEG;
        const vs = Math.sqrt(Math.max(0, u * u - 2 * gR * (1 - Math.cos(ls))));
        const x0 = R * Math.sin(ls);
        const y0 = -R * Math.cos(ls);
        const vxw = vs * Math.cos(ls);
        const vyw = vs * Math.sin(ls);
        for (let i = 0; i <= 200; i++) {
          const t = (i / 200) * 3 * Math.sqrt(R / g);
          const x = x0 + vxw * t;
          const y = y0 + vyw * t - 0.5 * g * t * t;
          if (i > 2 && Math.hypot(x, y) >= R) break;
          para += `${i === 0 ? "M" : "L"} ${(C + (x / R) * rp).toFixed(2)} ${(C - (y / R) * rp).toFixed(2)} `;
        }
      }
      body = (
        <svg viewBox="0 0 280 280" className="mx-auto w-full max-w-sm rounded-md border bg-background" role="img" aria-label="Bob on a string in a vertical circle">
          <circle cx={C} cy={C} r={rp} fill="none" className="stroke-foreground/30" strokeWidth={1.5} strokeDasharray="4 4" />
          {slack && para && <path d={para} fill="none" className="stroke-callout-warning" strokeWidth={1.5} strokeDasharray="5 4" />}
          <circle cx={C} cy={C} r={3} className="fill-foreground" />
          <line x1={C} y1={C} x2={px} y2={py} className={T > 1e-9 ? "stroke-foreground" : "stroke-foreground/30"} strokeWidth={1.5} strokeDasharray={T > 1e-9 ? undefined : "3 3"} />
          {force("T", px, py, ((C - px) / rp) * T * k, ((C - py) / rp) * T * k, "c", "T")}
          {force("W", px, py, 0, m * g * k, "b", "mg")}
          {v > 1e-9 && force("v", px, py, tx * v * vk, ty * v * vk, "a", "\\vec v", { width: 2 })}
          <circle cx={px} cy={py} r={7} className="fill-primary" />
        </svg>
      );
      if (config.showGraph) {
        const total = 0.5 * m * u * u;
        extra = (
          <EnergyBars
            total={Math.max(total, m * g * 2 * R)}
            items={[
              { label: "\\tfrac12 mv^2", value: 0.5 * m * v2, className: "bg-callout-tip" },
              { label: "mgR(1 - \\cos\\theta)", value: m * g * R * (1 - Math.cos(tr)), className: "bg-callout-info" },
            ]}
          />
        );
      }
      const Ttop = (m * (u * u - 4 * gR)) / R - m * g;
      readouts = [
        { latex: `v^2 = u^2 - 2gR(1 - \\cos\\theta) \\Rightarrow v = ${f2(v)}\\,${U.ms}`, note: `at θ = ${f2(thShown)}°` },
        { latex: `T = \\dfrac{mv^2}{R} + mg\\cos\\theta = ${f2(T)}\\,${U.N}` },
        { latex: `T_{\\text{bottom}} = ${f2((m * u * u) / R + m * g)}\\,${U.N}` },
        { latex: `T_{\\text{top}} = ${full ? f2(Ttop) : "\\text{never reached}"}${full ? `\\,${U.N}` : ""}` },
        { latex: `\\sqrt{5gR} = ${f2(Math.sqrt(5 * gR))}\\,${U.ms}`, note: full ? "u is enough: full circle" : "u is too small for a full circle" },
      ];
      if (!full && slack) notes.push(`The string goes slack at θ = ${f2(limit)}° (above the centre); the bob then falls along the dashed parabola.`);
      if (!full && !slack) notes.push(`The bob swings up to θ = ${f2(limit)}° and back: it oscillates like a pendulum (u ≤ √(2gR)).`);
      if (theta > limit + 1e-9) notes.push("The bob never reaches the angle you picked; it is shown where it gets to.");
      break;
    }

    case "spring": {
      const { m, k: kk, x0, mu } = p;
      const fr = mu * m * g;
      const moves = kk * x0 > fr + 1e-9;
      const xStop = moves ? x0 - (2 * fr) / kk : -x0;
      const x = clamp(springX, -x0, xStop);
      const Us = 0.5 * kk * x * x;
      const heat = fr * (x + x0);
      const KE = Math.max(0, 0.5 * kk * (x0 * x0 - x * x) - heat);
      const v = Math.sqrt((2 * KE) / m);
      const total = 0.5 * kk * x0 * x0;
      const W = 400;
      const wall = 30;
      const nat = 200; // screen x of the natural length
      const px = 150 / Math.max(ranges.x0.max, x0); // px per metre
      const bxs = nat + x * px;
      const coils = 12;
      let zig = `M ${wall} 100`;
      for (let i = 1; i < coils; i++) {
        const xx = wall + ((bxs - 25 - wall) * i) / coils;
        zig += ` L ${xx.toFixed(2)} ${i % 2 ? 88 : 112}`;
      }
      zig += ` L ${bxs - 25} 100`;
      const fk = fScale([kk * x0, fr], 60);
      body = (
        <svg viewBox={`0 0 ${W} 170`} className="w-full rounded-md border bg-background" role="img" aria-label="Block on a spring on a rough floor">
          <rect x={wall - 10} y={60} width={10} height={70} className="fill-muted-foreground/40" />
          <line x1={wall} y1={125} x2={W - 10} y2={125} className="stroke-foreground/60" strokeWidth={2} />
          <line x1={nat} y1={130} x2={nat} y2={150} className="stroke-muted-foreground" strokeDasharray="3 3" />
          <SvgLatex x={nat} y={158} latex="x = 0" className="text-muted-foreground" />
          <path d={zig} fill="none" className="stroke-foreground/70" strokeWidth={1.5} />
          <Block cx={bxs} cy={100} w={50} h={50} label="m" />
          {Math.abs(x) > 1e-9 && force("Fs", bxs, 80, -kk * x * fk, 0, "a", "-kx")}
          {moves && x < xStop - 1e-9 && fr > 0 && force("f", bxs, 118, -fr * fk, 0, "aux", "f")}
          {v > 1e-9 && force("v", bxs, 62, 40, 0, "result", "\\vec v", { width: 2 })}
        </svg>
      );
      if (config.showGraph) {
        const area: [number, number][] = [[-x0, 0], [-x0, kk * x0], [x, -kk * x], [x, 0]];
        extra = (
          <div className="space-y-2">
            <MfePlot
              xmin={-Math.max(ranges.x0.max, x0)}
              xmax={Math.max(ranges.x0.max, x0)}
              ymin={-kk * Math.max(ranges.x0.max, x0)}
              ymax={kk * Math.max(ranges.x0.max, x0)}
              xLabel="x (m)"
              yLabel="spring force (N)"
              series={[
                { pts: [[-Math.max(ranges.x0.max, x0), kk * Math.max(ranges.x0.max, x0)], [Math.max(ranges.x0.max, x0), -kk * Math.max(ranges.x0.max, x0)]], className: "stroke-primary" },
              ]}
              fills={[{ pts: area, className: "fill-callout-tip/25" }]}
              markers={[{ x, y: -kk * x, className: "fill-primary" }]}
            />
            <EnergyBars
              total={total}
              items={[
                { label: "\\tfrac12 kx^2", value: Us, className: "bg-primary" },
                { label: "\\tfrac12 mv^2", value: KE, className: "bg-callout-tip" },
                { label: "\\text{heat } \\mu mg\\,d", value: heat, className: "bg-callout-warning" },
              ]}
            />
          </div>
        );
      }
      readouts = [
        { latex: `W_{\\text{spring}} = \\tfrac12 kx_0^2 - \\tfrac12 kx^2 = ${f2(total - Us)}\\,${U.J}`, note: "area under F-x" },
        { latex: `W_{\\text{friction}} = -\\mu mg(x + x_0) = ${f2(-heat)}\\,${U.J}` },
        { latex: `\\tfrac12 mv^2 = W_{\\text{spring}} + W_{\\text{friction}} = ${f2(KE)}\\,${U.J}`, note: "work-energy theorem" },
        { latex: q("v", v, U.ms) },
        { latex: `v_{\\max}\\text{ at } x = -\\mu mg/k = ${f2(-fr / kk)}\\,${U.m}`, note: "where kx balances friction" },
        { latex: `\\text{stops at } x = x_0 - 2\\mu mg/k = ${f2(xStop)}\\,${U.m}` },
      ];
      if (!moves) notes.push("The spring force kx₀ never beats static friction μmg: the block does not move.");
      const step = moves ? Math.max(0.001, Number(((xStop + x0) / 100).toPrecision(2))) : 0.01;
      extra = (
        <div className="space-y-2">
          {moves && (
            <SliderRow
              label={<Latex latex="x" />}
              value={Number(x.toFixed(3))}
              min={Number((-x0).toFixed(3))}
              max={Number(xStop.toFixed(3))}
              step={step}
              unit="m"
              onChange={setSpringX}
            />
          )}
          {extra}
        </div>
      );
      break;
    }
  }

  return (
    <InteractiveFrame title={TITLES[mode]}>
      {body}
      <div className="space-y-2">
        {MODE_KEYS[mode].map((k) => (
          <ParamSlider key={k} label={LABELS[k]} unit={UNITS[k]} range={ranges[k]} value={p[k]} onChange={set(k)} />
        ))}
      </div>
      {extra}
      <Readouts items={readouts} />
      <Notes notes={notes} />
      <CaptionRow caption={config.caption ?? CAPTIONS[mode]} onReset={reset} />
    </InteractiveFrame>
  );
}
