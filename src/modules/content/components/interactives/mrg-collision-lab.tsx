"use client";

import { useState } from "react";
import type { z } from "zod";
import type { mrgCollisionLabSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex } from "./ui";
import {
  G,
  MiniGraph,
  PlaybackBar,
  RangeSlider,
  ReadoutBox,
  ReadoutLine,
  ToggleButton,
  br,
  clamp,
  fmt,
  usePlayback,
  type Series,
} from "./mrg-shared";

type Config = z.infer<typeof mrgCollisionLabSchema>;
type Mode = Config["mode"];
type Control = NonNullable<Config["controls"]>[number];
type ReadoutKey = NonNullable<Config["readouts"]>[number];

const DEFAULT_CONTROLS: Record<Mode, Control[]> = {
  collision: ["m1", "m2", "u1", "u2", "e"],
  explosion: ["m1", "m2", "v0", "energy"],
  wall: ["m1", "u1", "e", "contactTime"],
};

const DEFAULT_READOUTS: Record<Mode, ReadoutKey[]> = {
  collision: ["velocities", "momentum", "energy"],
  explosion: ["velocities", "momentum", "energy", "com"],
  wall: ["impulse", "velocities"],
};

const CAPTIONS: Record<Mode, string> = {
  collision:
    "Press Play, or drag the time slider. The bumper squeezes until both carts share one velocity, then pushes back e times as hard as it was squeezed. The total momentum line never moves.",
  explosion:
    "The spring pushes the carts apart with equal and opposite forces. Each cart's momentum changes, the total does not, and the centre of mass glides on as if nothing happened.",
  wall: "The shaded area under the force-time curve is the impulse. Change the contact time: the area stays the same, the peak force does not.",
};

const W = 400;
const TRACK_H = 150;
const TRACK_Y = 112;
/** Time shown before contact and after it ends, seconds. */
const LEAD = 1.2;
const SAMPLES = 160;

const labelOf: Record<Control, string> = {
  m1: "m_1",
  m2: "m_2",
  u1: "u_1",
  u2: "u_2",
  e: "e",
  v0: "v_0",
  energy: "E",
  contactTime: "\\Delta t",
};
const unitOf: Record<Control, string> = {
  m1: "kg",
  m2: "kg",
  u1: "m/s",
  u2: "m/s",
  e: "",
  v0: "m/s",
  energy: "J",
  contactTime: "ms",
};

export function MrgCollisionLab({ config }: { config: Config }) {
  return config.mode === "wall" ? <WallLab config={config} /> : <CartsLab config={config} />;
}

/** Slider values for every quantity, plus the rendered slider rows. */
function useParams(config: Config) {
  const [values, setValues] = useState<Record<Control, number>>({
    m1: config.m1.initial,
    m2: config.m2.initial,
    u1: config.u1.initial,
    u2: config.u2.initial,
    e: config.e.initial,
    v0: config.v0.initial,
    energy: config.energy.initial,
    contactTime: config.contactTime.initial,
  });
  const controls = config.controls ?? DEFAULT_CONTROLS[config.mode];
  const sliders = (
    <div className="space-y-2">
      {controls.map((c) => (
        <RangeSlider
          key={c}
          latex={labelOf[c]}
          range={config[c]}
          value={values[c]}
          unit={unitOf[c]}
          onChange={(v) => setValues((old) => ({ ...old, [c]: v }))}
        />
      ))}
    </div>
  );
  return { values, sliders };
}

// ---------- carts: collision and explosion ----------

function CartsLab({ config }: { config: Config }) {
  const { values, sliders } = useParams(config);
  const [frame, setFrame] = useState(config.frame);
  const playback = usePlayback(3.5);
  const explosion = config.mode === "explosion";
  const readouts = config.readouts ?? DEFAULT_READOUTS[config.mode];

  const { m1, m2, e, energy } = values;
  const M = m1 + m2;
  const mu = (m1 * m2) / M;
  const U1 = explosion ? values.v0 : values.u1;
  const U2 = explosion ? values.v0 : values.u2;
  /** Relative velocity of 1 with respect to 2 (positive = closing in). */
  const w0 = U1 - U2;
  const collides = explosion ? energy > 1e-9 : w0 > 1e-9;
  const wEnd = explosion ? -Math.sqrt((2 * energy) / mu) : -e * w0;
  const vcm = (m1 * U1 + m2 * U2) / M;
  const V1 = collides ? vcm + (m2 / M) * wEnd : U1;
  const V2 = collides ? vcm - (m1 / M) * wEnd : U2;

  // World extents from the instantaneous-collision picture, then block size.
  const ext = (() => {
    let lo = 0;
    let hi = 0;
    for (const t of [-LEAD, LEAD]) {
      for (const [u, v] of [
        [U1, V1],
        [U2, V2],
      ]) {
        const x = (t < 0 ? u : v) * t - (frame === "com" ? vcm * t : 0);
        lo = Math.min(lo, x);
        hi = Math.max(hi, x);
      }
    }
    return { lo, hi };
  })();
  const span0 = Math.max(6, ext.hi - ext.lo);
  const wb = 0.13 * span0;
  const xmin = ext.lo - wb * 1.25;
  const xmax = ext.hi + wb * 1.25;
  const sx = (x: number) => ((x - xmin) / (xmax - xmin)) * W;

  // Constant-force contact: compression (collision) or push (explosion).
  const dW = w0 - wEnd;
  const tau = collides ? (explosion ? 0.25 : Math.min(0.25, (0.7 * wb) / Math.max(w0, 1e-9))) : 0;
  const tc = collides ? (explosion ? tau : tau * (1 + e)) : 0;
  const F = collides && tc > 0 ? (mu * dW) / tc : 0;
  const a1 = -F / m1;
  const a2 = F / m2;

  const state = (t: number) => {
    const tt = clamp(t, 0, tc);
    const v1 = t < 0 ? U1 : U1 + a1 * tt;
    const v2 = t < 0 ? U2 : U2 + a2 * tt;
    const x1c = U1 * tt + 0.5 * a1 * tt * tt;
    const x2c = U2 * tt + 0.5 * a2 * tt * tt;
    const x1 = t < 0 ? U1 * t : t <= tc ? x1c : x1c + V1 * (t - tc);
    const x2 = t < 0 ? U2 * t : t <= tc ? x2c : x2c + V2 * (t - tc);
    const shift = frame === "com" ? vcm * t : 0;
    const dv = frame === "com" ? vcm : 0;
    return { x1: x1 - shift, x2: x2 - shift, v1: v1 - dv, v2: v2 - dv };
  };

  const t0 = -LEAD;
  const t1 = tc + LEAD;
  const t = t0 + playback.p * (t1 - t0);
  const now = state(t);
  const inContact = collides && t >= 0 && t <= tc;

  // ---------- track scene ----------
  const hOf = (m: number) => 18 + 12 * Math.sqrt(m);
  const h1 = hOf(m1);
  const h2 = hOf(m2);
  const overlap = now.x1 > now.x2;
  const mid = (now.x1 + now.x2) / 2;
  const b1L = now.x1 - wb;
  const b1R = overlap ? mid : now.x1;
  const b2L = overlap ? mid : now.x2;
  const b2R = now.x2 + wb;
  const xcm = (m1 * (now.x1 - wb / 2) + m2 * (now.x2 + wb / 2)) / M;
  const velScale = 7;
  const arrow = (xc: number, y: number, v: number, cls: string, fillCls: string, key: string) => {
    const x0 = sx(xc);
    const len = v * velScale;
    if (Math.abs(len) < 2) return null;
    const x2 = x0 + len;
    const dir = Math.sign(len);
    return (
      <g key={key}>
        <line x1={x0} y1={y} x2={x2 - dir * 6} y2={y} className={cls} strokeWidth={2.5} strokeLinecap="round" />
        <polygon points={`${x2},${y} ${x2 - dir * 8},${y - 4.5} ${x2 - dir * 8},${y + 4.5}`} className={fillCls} />
      </g>
    );
  };
  const c1 = (b1L + b1R) / 2;
  const c2 = (b2L + b2R) / 2;

  // Ground ticks every nice metre step (they slide past in the COM frame, which is the point).
  const tickStep = span0 > 24 ? 5 : span0 > 12 ? 2 : 1;
  const ticks: number[] = [];
  for (let x = Math.ceil(xmin / tickStep) * tickStep; x <= xmax; x += tickStep) ticks.push(x);

  // ---------- graph ----------
  const samples: number[] = [];
  for (let i = 0; i <= SAMPLES; i++) samples.push(t0 + ((t1 - t0) * i) / SAMPLES);
  if (collides) samples.push(0, tc);
  samples.sort((p, q) => p - q);
  const series: Series[] = (() => {
    const pts = samples.map((s) => ({ s, ...state(s) }));
    const vcmF = frame === "com" ? 0 : vcm;
    switch (config.graph) {
      case "velocity":
        return [
          { label: "v_1", points: pts.map((q) => [q.s, q.v1] as [number, number]), className: "stroke-primary", swatch: "bg-primary" },
          { label: "v_2", points: pts.map((q) => [q.s, q.v2] as [number, number]), className: "stroke-callout-info", swatch: "bg-callout-info" },
          { label: "v_{cm}", points: [[t0, vcmF], [t1, vcmF]], className: "stroke-callout-tip", swatch: "bg-callout-tip", dashed: true },
        ];
      case "momentum":
        return [
          { label: "p_1", points: pts.map((q) => [q.s, m1 * q.v1] as [number, number]), className: "stroke-primary", swatch: "bg-primary" },
          { label: "p_2", points: pts.map((q) => [q.s, m2 * q.v2] as [number, number]), className: "stroke-callout-info", swatch: "bg-callout-info" },
          { label: "p_1 + p_2", points: pts.map((q) => [q.s, m1 * q.v1 + m2 * q.v2] as [number, number]), className: "stroke-callout-tip", swatch: "bg-callout-tip", dashed: true },
        ];
      case "energy":
        return [
          { label: "K_1", points: pts.map((q) => [q.s, 0.5 * m1 * q.v1 * q.v1] as [number, number]), className: "stroke-primary", swatch: "bg-primary" },
          { label: "K_2", points: pts.map((q) => [q.s, 0.5 * m2 * q.v2 * q.v2] as [number, number]), className: "stroke-callout-info", swatch: "bg-callout-info" },
          {
            label: "K_1 + K_2",
            points: pts.map((q) => [q.s, 0.5 * m1 * q.v1 * q.v1 + 0.5 * m2 * q.v2 * q.v2] as [number, number]),
            className: "stroke-callout-tip",
            swatch: "bg-callout-tip",
            dashed: true,
          },
        ];
      case "none":
        return [];
    }
  })();
  const graphMeta = {
    velocity: { y: "v (m/s)" },
    momentum: { y: "p (kg m/s)" },
    energy: { y: "K (J)" },
    none: { y: "" },
  }[config.graph];

  // ---------- readouts ----------
  const P = m1 * U1 + m2 * U2;
  const Ki = 0.5 * m1 * U1 * U1 + 0.5 * m2 * U2 * U2;
  const Kf = 0.5 * m1 * V1 * V1 + 0.5 * m2 * V2 * V2;
  const lines: React.ReactNode[] = [];
  if (readouts.includes("velocities")) {
    if (explosion) {
      lines.push(
        <ReadoutLine key="v1" latex={`v_1' = v_0 - \\sqrt{\\frac{2E\\,m_2}{m_1(m_1+m_2)}} = ${fmt(V1)}\\ \\text{m/s}`} />,
        <ReadoutLine key="v2" latex={`v_2' = v_0 + \\sqrt{\\frac{2E\\,m_1}{m_2(m_1+m_2)}} = ${fmt(V2)}\\ \\text{m/s}`} />,
        <ReadoutLine key="ratio" latex={`\\frac{\\lvert v_1' - v_0\\rvert}{\\lvert v_2' - v_0\\rvert} = \\frac{m_2}{m_1} = ${fmt(m2 / m1)}`} note="the lighter cart gets the bigger kick" />,
      );
    } else if (!collides) {
      lines.push(<ReadoutLine key="none" latex={`u_1 - u_2 = ${fmt(w0)} \\le 0`} note="cart 1 never catches cart 2: no collision" />);
    } else {
      lines.push(
        <ReadoutLine
          key="v1"
          latex={`v_1' = \\frac{m_1u_1 + m_2u_2 - m_2e(u_1 - u_2)}{m_1 + m_2} = \\frac{${fmt(P)} - ${fmt(m2 * e * w0)}}{${fmt(M)}} = ${fmt(V1)}\\ \\text{m/s}`}
        />,
        <ReadoutLine
          key="v2"
          latex={`v_2' = \\frac{m_1u_1 + m_2u_2 + m_1e(u_1 - u_2)}{m_1 + m_2} = \\frac{${fmt(P)} + ${fmt(m1 * e * w0)}}{${fmt(M)}} = ${fmt(V2)}\\ \\text{m/s}`}
        />,
        <ReadoutLine
          key="e"
          latex={`\\frac{v_2' - v_1'}{u_1 - u_2} = \\frac{${fmt(V2 - V1)}}{${fmt(w0)}} = ${fmt((V2 - V1) / w0)} = e`}
          note="separation speed = e × approach speed"
        />,
      );
    }
    if (frame === "com") {
      lines.push(
        <ReadoutLine
          key="comframe"
          latex={`\\text{COM frame: } ${fmt(U1 - vcm)},\\ ${fmt(U2 - vcm)} \\;\\to\\; ${fmt(V1 - vcm)},\\ ${fmt(V2 - vcm)}\\ \\text{m/s}`}
          note={explosion ? "equal and opposite momenta" : "each velocity reverses and shrinks by e"}
        />,
      );
    }
  }
  if (readouts.includes("momentum")) {
    lines.push(
      <ReadoutLine key="pi" latex={`p_{\\text{before}} = (${fmt(m1)})${br(U1)} + (${fmt(m2)})${br(U2)} = ${fmt(P)}\\ \\text{kg m/s}`} />,
      <ReadoutLine key="pf" latex={`p_{\\text{after}} = (${fmt(m1)})${br(V1)} + (${fmt(m2)})${br(V2)} = ${fmt(m1 * V1 + m2 * V2)}\\ \\text{kg m/s}`} note="no external horizontal force" />,
    );
  }
  if (readouts.includes("energy")) {
    lines.push(<ReadoutLine key="k" latex={`K_{\\text{before}} = ${fmt(Ki)}\\ \\text{J}, \\quad K_{\\text{after}} = ${fmt(Kf)}\\ \\text{J}`} />);
    if (explosion) {
      lines.push(<ReadoutLine key="dk" latex={`K_{\\text{after}} - K_{\\text{before}} = ${fmt(Kf - Ki)}\\ \\text{J} = E`} note="the spring's stored energy" />);
    } else if (collides) {
      lines.push(
        <ReadoutLine
          key="dk"
          latex={`\\Delta K_{\\text{lost}} = \\tfrac12\\,\\frac{m_1m_2}{m_1+m_2}\\,(1 - e^2)(u_1 - u_2)^2 = ${fmt(Ki - Kf)}\\ \\text{J}`}
          note={e >= 1 - 1e-9 ? "elastic: nothing lost" : e <= 1e-9 ? "perfectly inelastic: the most that can be lost" : undefined}
        />,
        <ReadoutLine key="kmin" latex={`K_{\\min} = \\tfrac12(m_1+m_2)v_{cm}^2 = ${fmt(0.5 * M * vcm * vcm)}\\ \\text{J}`} note="at maximum compression" />,
      );
    }
  }
  if (readouts.includes("com")) {
    lines.push(
      <ReadoutLine key="vcm" latex={`v_{cm} = \\frac{m_1u_1 + m_2u_2}{m_1 + m_2} = \\frac{${fmt(P)}}{${fmt(M)}} = ${fmt(vcm)}\\ \\text{m/s}`} note="same before, during and after" />,
    );
  }

  return (
    <InteractiveFrame title={explosion ? "Explosion lab" : "Collision lab"}>
      {config.allowFrameToggle && (
        <div className="flex flex-wrap items-center gap-2">
          <ToggleButton active={frame === "ground"} onClick={() => setFrame("ground")}>
            Ground frame
          </ToggleButton>
          <ToggleButton active={frame === "com"} onClick={() => setFrame("com")}>
            COM frame
          </ToggleButton>
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${TRACK_H}`} className="mx-auto w-full max-w-md select-none rounded-md border bg-background" role="img" aria-label="Two carts on a straight track">
        {ticks.map((x) => (
          <g key={`t${x}`}>
            <line x1={sx(x)} x2={sx(x)} y1={TRACK_Y} y2={TRACK_Y + 5} className="stroke-muted-foreground/60" strokeWidth={1} />
            <text x={sx(x)} y={TRACK_Y + 15} textAnchor="middle" className="fill-muted-foreground text-[8px]">
              {fmt(x, 1)}
            </text>
          </g>
        ))}
        <line x1={0} x2={W} y1={TRACK_Y} y2={TRACK_Y} className="stroke-foreground/60" strokeWidth={1.5} />
        {explosion && t < 0 && collides && (
          <text x={sx(0)} y={TRACK_Y - Math.max(h1, h2) - 22} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            locked, spring compressed
          </text>
        )}
        <rect x={sx(b1L)} y={TRACK_Y - h1} width={Math.max(1, sx(b1R) - sx(b1L))} height={h1} rx={3} className="fill-primary/20 stroke-primary" strokeWidth={1.5} />
        <rect x={sx(b2L)} y={TRACK_Y - h2} width={Math.max(1, sx(b2R) - sx(b2L))} height={h2} rx={3} className="fill-callout-info/20 stroke-callout-info" strokeWidth={1.5} />
        <text x={sx(c1)} y={TRACK_Y - h1 / 2 + 3} textAnchor="middle" className="fill-foreground text-[9px]">
          {fmt(m1)} kg
        </text>
        <text x={sx(c2)} y={TRACK_Y - h2 / 2 + 3} textAnchor="middle" className="fill-foreground text-[9px]">
          {fmt(m2)} kg
        </text>
        {inContact && (
          <text x={sx(mid)} y={TRACK_Y + 26} textAnchor="middle" className="fill-callout-warning text-[9px] font-semibold">
            {explosion ? "spring pushing" : now.v1 - now.v2 > 1e-9 ? "compressing" : "restoring"}
          </text>
        )}
        {arrow(c1, TRACK_Y - h1 - 10, now.v1, "stroke-primary", "fill-primary", "a1")}
        {arrow(c2, TRACK_Y - h2 - 10, now.v2, "stroke-callout-info", "fill-callout-info", "a2")}
        {config.showCom && (
          <g>
            <line x1={sx(xcm)} x2={sx(xcm)} y1={14} y2={TRACK_Y} className="stroke-callout-tip" strokeWidth={1} strokeDasharray="3 3" />
            <polygon points={`${sx(xcm)},${TRACK_Y + 2} ${sx(xcm) - 5},${TRACK_Y + 10} ${sx(xcm) + 5},${TRACK_Y + 10}`} className="fill-callout-tip" />
            <text x={sx(xcm)} y={11} textAnchor="middle" className="fill-callout-tip text-[9px] font-semibold">
              COM
            </text>
          </g>
        )}
        <text x={W - 4} y={TRACK_H - 4} textAnchor="end" className="fill-muted-foreground text-[8px]">
          {frame === "com" ? "seen riding with the COM" : "seen from the ground"} · 1 grid step = {fmt(tickStep)} m · arrow ∝ v
        </text>
      </svg>
      <PlaybackBar playback={playback} timeLabel={`t = ${fmt(t)} s`} />
      <div className="grid grid-cols-2 gap-2 text-center text-sm">
        <span>
          <Latex latex={`v_1 = ${fmt(now.v1)}\\ \\text{m/s}`} />
        </span>
        <span>
          <Latex latex={`v_2 = ${fmt(now.v2)}\\ \\text{m/s}`} />
        </span>
      </div>
      {series.length > 0 && <MiniGraph series={series} t0={t0} t1={t1} cursor={t} xLabel="t (s)" yLabel={graphMeta.y} />}
      {sliders}
      {lines.length > 0 && <ReadoutBox>{lines}</ReadoutBox>}
      <p className="text-center text-xs text-muted-foreground">{config.caption ?? CAPTIONS[config.mode]}</p>
    </InteractiveFrame>
  );
}

// ---------- ball against a wall: impulse ----------

/** Force-time pulse of total area J over duration D: value and running area at fraction s. */
function pulse(shape: Config["pulse"], J: number, D: number, s: number): { f: number; area: number } {
  const q = clamp(s, 0, 1);
  switch (shape) {
    case "rectangle":
      return { f: s < 0 || s > 1 ? 0 : J / D, area: J * q };
    case "triangle": {
      const peak = (2 * J) / D;
      const f = s < 0 || s > 1 ? 0 : peak * (1 - Math.abs(2 * q - 1));
      const area = q <= 0.5 ? 2 * J * q * q : J * (1 - 2 * (1 - q) * (1 - q));
      return { f, area };
    }
    case "half-sine": {
      const peak = (Math.PI * J) / (2 * D);
      return { f: s < 0 || s > 1 ? 0 : peak * Math.sin(Math.PI * q), area: (J * (1 - Math.cos(Math.PI * q))) / 2 };
    }
  }
}

const PEAK_FACTOR: Record<Config["pulse"], { k: number; latex: string }> = {
  rectangle: { k: 1, latex: "\\frac{J}{\\Delta t}" },
  triangle: { k: 2, latex: "\\frac{2J}{\\Delta t}" },
  "half-sine": { k: Math.PI / 2, latex: "\\frac{\\pi J}{2\\,\\Delta t}" },
};

function WallLab({ config }: { config: Config }) {
  const { values, sliders } = useParams(config);
  const playback = usePlayback(4);
  const readouts = config.readouts ?? DEFAULT_READOUTS.wall;
  const m = values.m1;
  const u = Math.abs(values.u1);
  const e = values.e;
  const Dms = values.contactTime;
  const D = Dms / 1000;
  const J = m * u * (1 + e);
  const peak = (PEAK_FACTOR[config.pulse].k * J) / D;

  // Scrubber: 0-0.3 approach (1 s), 0.3-0.7 contact in slow motion, 0.7-1 rebound (1 s).
  const p = playback.p;
  const phase = p < 0.3 ? "before" : p <= 0.7 ? "contact" : "after";
  const s = phase === "contact" ? (p - 0.3) / 0.4 : phase === "before" ? 0 : 1;
  const tReal = phase === "before" ? -1 + p / 0.3 : phase === "contact" ? s * D : D + (p - 0.7) / 0.3;
  const { area: Jnow } = pulse(config.pulse, J, D, s);
  const vNow = phase === "before" ? u : u - Jnow / m;

  // Compression profile (visual only): integral of v during contact, normalised.
  const comp = (() => {
    const N = 100;
    let x = 0;
    let max = 0;
    let atS = 0;
    for (let i = 1; i <= N; i++) {
      const si = i / N;
      const v = u - pulse(config.pulse, J, D, si - 0.5 / N).area / m;
      x = Math.max(0, x + v / N);
      max = Math.max(max, x);
      if (si <= s + 1e-12) atS = x;
    }
    return max > 1e-12 ? atS / max : 0;
  })();

  // Scene: wall at the right, world span from the furthest excursion.
  const R = 0.3;
  const reach = Math.max(u, e * u, 1) + 2 * R + 0.4;
  const xmin = -reach;
  const xmax = 0.35;
  const sx = (x: number) => ((x - xmin) / (xmax - xmin)) * W;
  const ppm = W / (xmax - xmin);
  const squash = phase === "contact" ? 0.35 * comp : 0;
  const rx = R * (1 - squash);
  const ry = R * (1 + 0.5 * squash);
  const cx = phase === "before" ? -R + u * tReal : phase === "contact" ? -rx : -R - e * u * (tReal - D);
  const floorY = TRACK_Y;
  const cy = floorY - ry * ppm;
  const vArrow = vNow * 7;

  const N = 120;
  const fPts: [number, number][] = [];
  if (config.pulse === "rectangle") {
    fPts.push([0, 0], [0, peak], [Dms, peak], [Dms, 0]);
  } else {
    for (let i = 0; i <= N; i++) fPts.push([(Dms * i) / N, pulse(config.pulse, J, D, i / N).f]);
  }
  const series: Series[] = [{ label: "F(t)", points: fPts, className: "stroke-callout-warning", swatch: "bg-callout-warning" }];

  const lines: React.ReactNode[] = [];
  if (readouts.includes("impulse")) {
    lines.push(
      <ReadoutLine key="j" latex={`J = \\lvert\\Delta p\\rvert = m(u + eu) = (${fmt(m)})(${fmt(u)} + ${fmt(e * u)}) = ${fmt(J)}\\ \\text{N s}`} note="area under F against t" />,
      <ReadoutLine key="favg" latex={`F_{\\text{avg}} = \\frac{J}{\\Delta t} = \\frac{${fmt(J)}}{${fmt(D, 3)}} = ${fmt(J / D, 1)}\\ \\text{N}`} note={m > 0 && J > 0 ? `${fmt(J / D / (m * G), 1)} × the weight mg` : undefined} />,
      <ReadoutLine key="fpk" latex={`F_{\\text{peak}} = ${PEAK_FACTOR[config.pulse].latex} = ${fmt(peak, 1)}\\ \\text{N}`} />,
      <ReadoutLine key="jnow" latex={`\\text{impulse so far} = ${fmt(Jnow)}\\ \\text{N s} \\;\\Rightarrow\\; v = u - \\frac{J(t)}{m} = ${fmt(vNow)}\\ \\text{m/s}`} />,
    );
  }
  if (readouts.includes("velocities")) {
    lines.push(
      <ReadoutLine
        key="v"
        latex={`\\text{before: } ${fmt(u)}\\ \\text{m/s towards}, \\quad \\text{after: } e u = ${fmt(e * u)}\\ \\text{m/s away}`}
      />,
      <ReadoutLine key="k" latex={`\\Delta K_{\\text{lost}} = \\tfrac12 m u^2 (1 - e^2) = ${fmt(0.5 * m * u * u * (1 - e * e))}\\ \\text{J}`} />,
    );
  }

  return (
    <InteractiveFrame title="Impulse lab">
      <svg viewBox={`0 0 ${W} ${TRACK_H}`} className="mx-auto w-full max-w-md select-none rounded-md border bg-background" role="img" aria-label="A ball bouncing off a wall">
        <line x1={0} x2={W} y1={floorY} y2={floorY} className="stroke-foreground/60" strokeWidth={1.5} />
        <rect x={sx(0)} y={16} width={W - sx(0)} height={floorY - 16} className="fill-muted-foreground/30 stroke-foreground/60" strokeWidth={1.5} />
        <ellipse cx={sx(cx)} cy={cy} rx={rx * ppm} ry={ry * ppm} className="fill-primary/25 stroke-primary" strokeWidth={1.5} />
        {Math.abs(vArrow) >= 2 && (
          <g>
            <line x1={sx(cx)} y1={cy - ry * ppm - 12} x2={sx(cx) + vArrow - Math.sign(vArrow) * 6} y2={cy - ry * ppm - 12} className="stroke-primary" strokeWidth={2.5} strokeLinecap="round" />
            <polygon
              points={`${sx(cx) + vArrow},${cy - ry * ppm - 12} ${sx(cx) + vArrow - Math.sign(vArrow) * 8},${cy - ry * ppm - 16.5} ${sx(cx) + vArrow - Math.sign(vArrow) * 8},${cy - ry * ppm - 7.5}`}
              className="fill-primary"
            />
          </g>
        )}
        {phase === "contact" && (
          <text x={sx(0) - 6} y={28} textAnchor="end" className="fill-callout-warning text-[9px] font-semibold">
            slow motion: {fmt(Dms)} ms stretched
          </text>
        )}
        <text x={4} y={TRACK_H - 4} className="fill-muted-foreground text-[8px]">
          arrow ∝ velocity of the ball
        </text>
      </svg>
      <PlaybackBar
        playback={playback}
        timeLabel={phase === "contact" ? `t = ${fmt(tReal * 1000, 1)} ms` : phase === "before" ? `${fmt(-tReal)} s to impact` : `${fmt(tReal - D)} s after`}
      />
      <MiniGraph
        series={series}
        t0={0}
        t1={Dms}
        cursor={phase === "contact" ? s * Dms : undefined}
        area={phase === "before" ? undefined : s * Dms}
        xLabel="t (ms)"
        yLabel="F (N)"
      />
      {sliders}
      {lines.length > 0 && <ReadoutBox>{lines}</ReadoutBox>}
      <p className="text-center text-xs text-muted-foreground">{config.caption ?? CAPTIONS.wall}</p>
    </InteractiveFrame>
  );
}
