"use client";

import { useState } from "react";
import type { z } from "zod";
import type { mrgRollingLabSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex } from "./ui";
import {
  G,
  MiniGraph,
  PlaybackBar,
  RangeSlider,
  ReadoutBox,
  ReadoutLine,
  clamp,
  fmt,
  usePlayback,
  type Series,
} from "./mrg-shared";

type Config = z.infer<typeof mrgRollingLabSchema>;
type RaceBody = Config["bodies"][number];
type Body = Config["body"];

/** k²/R² and display data per body. Literal class names so Tailwind sees them. */
const BODIES: Record<RaceBody, { k2: number; label: string; k2Latex: string; stroke: string; fill: string; bg: string }> = {
  ring: { k2: 1, label: "Ring", k2Latex: "1", stroke: "stroke-primary", fill: "fill-primary/25", bg: "bg-primary" },
  disc: { k2: 0.5, label: "Disc", k2Latex: "\\tfrac12", stroke: "stroke-callout-info", fill: "fill-callout-info/25", bg: "bg-callout-info" },
  "solid-sphere": { k2: 0.4, label: "Solid sphere", k2Latex: "\\tfrac25", stroke: "stroke-callout-tip", fill: "fill-callout-tip/25", bg: "bg-callout-tip" },
  "hollow-sphere": { k2: 2 / 3, label: "Hollow sphere", k2Latex: "\\tfrac23", stroke: "stroke-callout-definition", fill: "fill-callout-definition/25", bg: "bg-callout-definition" },
  "sliding-block": { k2: 0, label: "Sliding block", k2Latex: "\\text{—}", stroke: "stroke-callout-warning", fill: "fill-callout-warning/25", bg: "bg-callout-warning" },
};

const W = 400;

export function MrgRollingLab({ config }: { config: Config }) {
  switch (config.mode) {
    case "velocities":
      return <VelocitiesLab config={config} />;
    case "incline":
      return <InclineLab config={config} />;
    case "slip-to-roll":
      return <SlipLab config={config} />;
  }
}

/** A wheel (circle + spokes) centred at (cx, cy) in screen units, turned by `turn` radians clockwise. */
function Wheel({ cx, cy, r, turn, stroke, fill, marker = true }: { cx: number; cy: number; r: number; turn: number; stroke: string; fill: string; marker?: boolean }) {
  const spokes = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  // Screen y points down, so a clockwise turn adds to the screen angle.
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className={`${fill} ${stroke}`} strokeWidth={1.5} />
      {spokes.map((a) => (
        <line key={a} x1={cx} y1={cy} x2={cx + r * Math.cos(a + turn)} y2={cy + r * Math.sin(a + turn)} className={stroke} strokeWidth={1} opacity={0.6} />
      ))}
      {marker && <circle cx={cx + r * Math.cos(Math.PI / 2 + turn)} cy={cy + r * Math.sin(Math.PI / 2 + turn)} r={3} className="fill-callout-warning" />}
    </g>
  );
}

/** Straight arrow in screen coordinates; nothing when shorter than 2 px. */
function Arrow({ x1, y1, dx, dy, cls, fillCls, width = 2, dashed = false }: { x1: number; y1: number; dx: number; dy: number; cls: string; fillCls: string; width?: number; dashed?: boolean }) {
  const len = Math.hypot(dx, dy);
  if (!(len >= 2)) return null;
  const ux = dx / len;
  const uy = dy / len;
  const head = Math.min(8, len * 0.5);
  const x2 = x1 + dx;
  const y2 = y1 + dy;
  const bx = x2 - ux * head;
  const by = y2 - uy * head;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} className={cls} strokeWidth={width} strokeDasharray={dashed ? "4 3" : undefined} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${bx - uy * head * 0.5},${by + ux * head * 0.5} ${bx + uy * head * 0.5},${by - ux * head * 0.5}`} className={fillCls} />
    </g>
  );
}

// ---------- velocities: translation + rotation ----------

function VelocitiesLab({ config }: { config: Config }) {
  const R = config.radius;
  const [v, setV] = useState(config.v.initial);
  const [omegaFree, setOmega] = useState(config.omega.initial);
  const omega = config.lockRolling ? v / R : omegaFree;
  const k2 = BODIES[config.body].k2;

  const H = 230;
  const groundY = 190;
  const Rpx = 62;
  const cx = W / 2;
  const cy = groundY - Rpx;
  const pxPerM = Rpx / R;
  const maxV = Math.max(Math.abs(config.v.min), Math.abs(config.v.max));
  const maxW = config.lockRolling ? maxV / R : Math.max(Math.abs(config.omega.min), Math.abs(config.omega.max));
  const vScale = 72 / Math.max(0.5, maxV + maxW * R);

  // Rim points (angle from +x, counter-clockwise, world y up).
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const partAngles = new Set([0, 90, 180, 270]);
  const rim = angles.map((deg) => {
    const phi = (deg * Math.PI) / 180;
    const rx = R * Math.cos(phi);
    const ry = R * Math.sin(phi);
    // Clockwise ω: rotation velocity (ω r_y, -ω r_x).
    const rot: [number, number] = [omega * ry, -omega * rx];
    const tot: [number, number] = [v + rot[0], rot[1]];
    return { deg, sxp: cx + rx * pxPerM, syp: cy - ry * pxPerM, rot, tot };
  });

  const vContact = v - omega * R;
  const vTop = v + omega * R;
  const rolling = Math.abs(vContact) < 1e-9;

  // Instantaneous centre: on the vertical through the centre, at r_y = -v/ω.
  const icr = Math.abs(omega) > 1e-9 ? -v / omega : null;
  const icrScreenY = icr === null ? null : cy - icr * pxPerM;

  // Trace of the rim point that touches the ground at t = 0 (cycloid when rolling).
  let trace = "";
  if (config.showTrace) {
    const Tspan = Math.abs(omega) > 1e-9 ? Math.PI / Math.abs(omega) : 1;
    const N = 160;
    for (let i = 0; i <= N; i++) {
      const t = -Tspan + (2 * Tspan * i) / N;
      const phi = -Math.PI / 2 - omega * t;
      const x = v * t + R * Math.cos(phi);
      const y = R + R * Math.sin(phi);
      trace += `${i === 0 ? "M" : "L"} ${(cx + x * pxPerM).toFixed(2)} ${(groundY - y * pxPerM).toFixed(2)} `;
    }
  }

  const status = rolling
    ? "pure rolling: the contact point is momentarily at rest"
    : vContact > 0
      ? "skidding: the contact point slides forward, so kinetic friction acts backwards"
      : "wheel-spin: the contact point slides backwards, so kinetic friction acts forwards";

  const kRot = 0.5 * k2 * omega * omega * R * R;
  const kTr = 0.5 * v * v;
  const kTot = kRot + kTr;

  return (
    <InteractiveFrame title="Rolling: translation + rotation">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md select-none overflow-hidden rounded-md border bg-background" role="img" aria-label="Velocities of points on a wheel">
        <line x1={0} x2={W} y1={groundY} y2={groundY} className="stroke-foreground/60" strokeWidth={1.5} />
        {config.showTrace && <path d={trace} fill="none" className="stroke-callout-warning/60" strokeWidth={1.5} strokeDasharray="4 3" />}
        <Wheel cx={cx} cy={cy} r={Rpx} turn={0} stroke="stroke-foreground/70" fill="fill-muted/40" marker={false} />
        {config.showParts &&
          rim
            .filter((q) => partAngles.has(q.deg))
            .map((q) => (
              <g key={`parts${q.deg}`}>
                <Arrow x1={q.sxp} y1={q.syp} dx={v * vScale} dy={0} cls="stroke-muted-foreground" fillCls="fill-muted-foreground" width={1.5} dashed />
                <Arrow x1={q.sxp} y1={q.syp} dx={q.rot[0] * vScale} dy={-q.rot[1] * vScale} cls="stroke-callout-info" fillCls="fill-callout-info" width={1.5} dashed />
              </g>
            ))}
        {rim.map((q) => (
          <g key={`tot${q.deg}`}>
            <circle cx={q.sxp} cy={q.syp} r={2.5} className="fill-foreground" />
            <Arrow x1={q.sxp} y1={q.syp} dx={q.tot[0] * vScale} dy={-q.tot[1] * vScale} cls="stroke-callout-tip" fillCls="fill-callout-tip" width={2.5} />
          </g>
        ))}
        <circle cx={cx} cy={cy} r={3} className="fill-foreground" />
        <Arrow x1={cx} y1={cy} dx={v * vScale} dy={0} cls="stroke-primary" fillCls="fill-primary" width={2.5} />
        {config.showIcr && icrScreenY !== null && icrScreenY > 4 && icrScreenY < H - 4 && (
          <g>
            <line x1={cx} x2={cx} y1={cy} y2={icrScreenY} className="stroke-callout-definition" strokeDasharray="3 3" strokeWidth={1} />
            <circle cx={cx} cy={icrScreenY} r={5} className="fill-none stroke-callout-definition" strokeWidth={2} />
            <text x={cx + 9} y={icrScreenY + 3} className="fill-callout-definition text-[9px] font-semibold">
              ICR
            </text>
          </g>
        )}
        <text x={4} y={12} className="fill-muted-foreground text-[8px]">
          green: v of each point · grey dashed: v_cm part · blue dashed: ω × r part
        </text>
      </svg>
      <div className="space-y-2">
        <RangeSlider latex="v_{cm}" range={config.v} value={v} onChange={setV} unit="m/s" />
        {!config.lockRolling && <RangeSlider latex="\omega" range={config.omega} value={omegaFree} onChange={setOmega} unit="rad/s" />}
      </div>
      <ReadoutBox>
        <ReadoutLine latex={`R = ${fmt(R)}\\ \\text{m}, \\quad \\omega R = ${fmt(omega * R)}\\ \\text{m/s}`} note={config.lockRolling ? "ω is held at v/R" : "ω > 0 means clockwise"} />
        <ReadoutLine latex={`v_{\\text{contact}} = v_{cm} - \\omega R = ${fmt(vContact)}\\ \\text{m/s}`} note={status} />
        <ReadoutLine latex={`v_{\\text{top}} = v_{cm} + \\omega R = ${fmt(vTop)}\\ \\text{m/s}`} note={rolling ? "twice the centre's speed" : undefined} />
        <ReadoutLine latex={`v_{\\text{front}} = \\sqrt{v_{cm}^2 + (\\omega R)^2} = ${fmt(Math.hypot(v, omega * R))}\\ \\text{m/s}`} />
        {config.showIcr && (
          <ReadoutLine
            latex={icr === null ? `\\omega = 0: \\text{ pure translation, no ICR}` : `\\text{ICR at } ${fmt(Math.abs(icr))}\\ \\text{m} ${icr <= 0 ? "\\text{ below}" : "\\text{ above}"} \\text{ the centre}`}
            note={rolling ? "exactly at the contact point" : undefined}
          />
        )}
        {config.showEnergy && kTot > 1e-12 && (
          <ReadoutLine
            latex={`\\frac{K_{\\text{rot}}}{K} = \\frac{\\tfrac12 I\\omega^2}{\\tfrac12 Mv_{cm}^2 + \\tfrac12 I\\omega^2} = ${fmt(kRot / kTot)}`}
            note={`${BODIES[config.body].label.toLowerCase()}, I = M k², k²/R² = ${fmt(k2, 3)}`}
          />
        )}
      </ReadoutBox>
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "Every point's velocity is the centre's velocity plus ω × r. Find the ω that makes the bottom point stop: that is rolling without slipping."}
      </p>
    </InteractiveFrame>
  );
}

// ---------- incline race ----------

type RaceResult = {
  body: RaceBody;
  a: number;
  /** R times the angular acceleration (0 for the block). */
  alphaR: number;
  rolls: boolean;
  muMin: number | null;
  T: number;
};

function InclineLab({ config }: { config: Config }) {
  const [theta, setTheta] = useState(config.angle.initial);
  const [mu, setMu] = useState(config.mu?.initial ?? 0);
  const L = config.length;
  const bodies = config.bodies.filter((b, i) => config.bodies.indexOf(b) === i);
  const rad = (theta * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const hasMu = config.mu !== undefined;

  const results: RaceResult[] = bodies.map((body) => {
    const k2 = BODIES[body].k2;
    if (body === "sliding-block") {
      const a = hasMu ? Math.max(0, G * (sin - mu * cos)) : G * sin;
      return { body, a, alphaR: 0, rolls: false, muMin: null, T: a > 1e-9 ? Math.sqrt((2 * L) / a) : Infinity };
    }
    const muMin = (Math.tan(rad) * k2) / (1 + k2);
    if (!hasMu || mu >= muMin - 1e-12) {
      const a = (G * sin) / (1 + k2);
      return { body, a, alphaR: a, rolls: true, muMin, T: Math.sqrt((2 * L) / a) };
    }
    const a = G * (sin - mu * cos);
    return { body, a, alphaR: (mu * G * cos) / k2, rolls: false, muMin, T: a > 1e-9 ? Math.sqrt((2 * L) / a) : Infinity };
  });
  const finite = results.map((r) => r.T).filter((T) => Number.isFinite(T));
  const Tmax = finite.length > 0 ? Math.max(...finite) : 1;
  const playback = usePlayback(clamp(Tmax, 1.5, 6));
  const t = playback.p * Tmax;

  // Slope from top-left down to bottom-right, fitted in the box.
  const H = 190;
  const Lpx = Math.min(330 / cos, 140 / Math.max(sin, 1e-6));
  const bx = 380;
  const by = 170;
  const tx = bx - Lpx * cos;
  const ty = by - Lpx * sin;
  const rpx = 13;
  const nX = sin;
  const nY = -cos;

  return (
    <InteractiveFrame title="Incline race">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md select-none rounded-md border bg-background" role="img" aria-label="Bodies racing down an incline">
        <polygon points={`${tx},${ty} ${bx},${by} ${tx},${by}`} className="fill-muted/60 stroke-foreground/60" strokeWidth={1.5} />
        <text x={bx - 38} y={by - 5} className="fill-muted-foreground text-[10px]">
          {fmt(theta, 0)}°
        </text>
        {results.map((r) => {
          const s = Number.isFinite(r.T) ? Math.min(L, 0.5 * r.a * Math.min(t, r.T) ** 2) : 0;
          const px = tx + (s / L) * Lpx * cos;
          const py = ty + (s / L) * Lpx * sin;
          const info = BODIES[r.body];
          if (r.body === "sliding-block") {
            const c = { x: px + nX * rpx, y: py + nY * rpx };
            const deg = (rad * 180) / Math.PI;
            return (
              <rect key={r.body} x={c.x - rpx} y={c.y - rpx} width={2 * rpx} height={2 * rpx} transform={`rotate(${deg} ${c.x} ${c.y})`} className={`${info.fill} ${info.stroke}`} strokeWidth={1.5} />
            );
          }
          // Turned angle: rolled distance / radius (rolling) or ½αR t² / R (slipping), in screen units.
          const tt = Number.isFinite(r.T) ? Math.min(t, r.T) : t;
          const turnDist = r.rolls ? s : 0.5 * r.alphaR * tt * tt;
          const turn = ((turnDist / L) * Lpx) / rpx;
          return <Wheel key={r.body} cx={px + nX * rpx} cy={py + nY * rpx} r={rpx} turn={turn} stroke={info.stroke} fill={info.fill} />;
        })}
      </svg>
      <PlaybackBar playback={playback} timeLabel={`t = ${fmt(t)} s`} />
      <div className="space-y-1.5">
        {results.map((r) => {
          const s = Number.isFinite(r.T) ? Math.min(L, 0.5 * r.a * Math.min(t, r.T) ** 2) : 0;
          const done = Number.isFinite(r.T) && t >= r.T - 1e-9;
          return (
            <div key={r.body} className="flex items-center gap-2 text-xs">
              <span className="w-24 shrink-0">{BODIES[r.body].label}</span>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full ${BODIES[r.body].bg}`} style={{ width: `${((s / L) * 100).toFixed(2)}%` }} />
              </div>
              <span className="w-24 shrink-0 text-right tabular-nums text-muted-foreground">
                {!Number.isFinite(r.T) ? "stays put" : done ? `done, ${fmt(r.T)} s` : `${fmt(s)} m`}
              </span>
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        <RangeSlider latex="\theta" range={config.angle} value={theta} onChange={setTheta} unit="°" />
        {config.mu && <RangeSlider latex="\mu" range={config.mu} value={mu} onChange={setMu} />}
      </div>
      <div className="overflow-x-auto rounded-md border bg-background">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="px-2 py-1.5 text-left font-medium">Body</th>
              <th className="px-2 py-1.5 font-medium">
                <Latex latex="k^2/R^2" />
              </th>
              <th className="px-2 py-1.5 font-medium">
                <Latex latex="a\ (\text{m/s}^2)" />
              </th>
              <th className="px-2 py-1.5 font-medium">
                <Latex latex="t\ (\text{s})" />
              </th>
              <th className="px-2 py-1.5 font-medium">
                <Latex latex="v\ (\text{m/s})" />
              </th>
              {config.showEnergy && (
                <th className="px-2 py-1.5 font-medium">
                  <Latex latex="K_{\text{rot}}/K" />
                </th>
              )}
              {hasMu && (
                <th className="px-2 py-1.5 font-medium">
                  <Latex latex="\mu_{\min}" />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {results.map((r) => {
              const k2 = BODIES[r.body].k2;
              const vEnd = Number.isFinite(r.T) ? r.a * r.T : 0;
              const wR = r.body === "sliding-block" ? 0 : r.alphaR * (Number.isFinite(r.T) ? r.T : 0);
              const kr = 0.5 * k2 * wR * wR;
              const kt = 0.5 * vEnd * vEnd;
              return (
                <tr key={r.body} className="border-b last:border-0 tabular-nums">
                  <td className="px-2 py-1.5">
                    {BODIES[r.body].label}
                    {r.body !== "sliding-block" && hasMu && !r.rolls && <span className="ml-1 text-callout-warning">(slips)</span>}
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <Latex latex={BODIES[r.body].k2Latex} />
                  </td>
                  <td className="px-2 py-1.5 text-center">{fmt(r.a)}</td>
                  <td className="px-2 py-1.5 text-center">{Number.isFinite(r.T) ? fmt(r.T) : "—"}</td>
                  <td className="px-2 py-1.5 text-center">{fmt(vEnd)}</td>
                  {config.showEnergy && <td className="px-2 py-1.5 text-center">{kt + kr > 1e-12 ? fmt(kr / (kt + kr)) : "—"}</td>}
                  {hasMu && <td className="px-2 py-1.5 text-center">{r.muMin === null ? "—" : fmt(r.muMin, 3)}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReadoutBox>
        <ReadoutLine latex={`a = \\frac{g\\sin\\theta}{1 + k^2/R^2}, \\qquad g\\sin\\theta = ${fmt(G * sin)}\\ \\text{m/s}^2`} note="rolling without slipping" />
        {hasMu && <ReadoutLine latex={`\\mu_{\\min} = \\frac{\\tan\\theta\\,(k^2/R^2)}{1 + k^2/R^2}`} note={`below it the body slips; now μ = ${fmt(mu)}`} />}
        <ReadoutLine latex={`\\text{slope length } L = ${fmt(L)}\\ \\text{m}, \\quad t = \\sqrt{2L/a}`} />
      </ReadoutBox>
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ?? "Mass and radius cancel: only the shape (k²/R²) decides the order. The smaller the share of energy locked in spin, the faster the body."}
      </p>
    </InteractiveFrame>
  );
}

// ---------- slipping to pure rolling ----------

function SlipLab({ config }: { config: Config }) {
  const R = config.radius;
  const body: Body = config.body;
  const k2 = BODIES[body].k2;
  const [v0, setV0] = useState(config.v0.initial);
  const [w0, setW0] = useState(config.omega0.initial);
  const [muK, setMuK] = useState(config.muK.initial);
  const playback = usePlayback(4);

  const slip0 = v0 - w0 * R;
  const dir = Math.abs(slip0) < 1e-9 ? 0 : Math.sign(slip0);
  const decel = muK * G;
  const tStar = dir === 0 ? 0 : Math.abs(slip0) / (decel * (1 + 1 / k2));
  const vf = (v0 + k2 * w0 * R) / (1 + k2);
  const Tend = Math.max(1.5, tStar * 1.6, tStar + 1);

  const at = (t: number) => {
    const tt = Math.min(t, tStar);
    const v = v0 - dir * decel * tt;
    const wR = w0 * R + (dir * decel * tt) / k2;
    const x0 = v0 * tt - 0.5 * dir * decel * tt * tt;
    const turn0 = (w0 * R * tt + (0.5 * dir * decel * tt * tt) / k2) / R;
    const extra = Math.max(0, t - tStar);
    return { v: t <= tStar ? v : vf, wR: t <= tStar ? wR : vf, x: x0 + vf * extra, turn: turn0 + (vf / R) * extra };
  };

  const t = playback.p * Tend;
  const now = at(t);
  const slipping = dir !== 0 && t < tStar - 1e-9;

  // World view: fit the whole run.
  const N = 120;
  const pts = Array.from({ length: N + 1 }, (_, i) => (Tend * i) / N).map((s) => ({ s, ...at(s) }));
  const xs = pts.map((q) => q.x);
  const lo = Math.min(0, ...xs) - 2 * R - 0.3;
  const hi = Math.max(0, ...xs) + 2 * R + 0.3;
  const span = Math.max(hi - lo, 12 * R);
  const xmin = (lo + hi) / 2 - span / 2;
  const H = 130;
  const groundY = 105;
  const ppm = W / span;
  const rpx = Math.max(8, Math.min(40, R * ppm));
  const sx = (x: number) => (x - xmin) * ppm;
  const bx = sx(now.x);
  const by = groundY - rpx;
  const vScale = 40 / Math.max(1, Math.abs(v0), Math.abs(w0 * R));

  const series: Series[] = [
    { label: "v_{cm}", points: pts.map((q) => [q.s, q.v] as [number, number]), className: "stroke-primary", swatch: "bg-primary" },
    { label: "\\omega R", points: pts.map((q) => [q.s, q.wR] as [number, number]), className: "stroke-callout-info", swatch: "bg-callout-info" },
  ];

  const Lc = R * (now.v + k2 * now.wR);
  const Ki = v0 * v0 + k2 * w0 * w0 * R * R;
  const Kf = vf * vf * (1 + k2);

  return (
    <InteractiveFrame title="From slipping to rolling">
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md select-none rounded-md border bg-background" role="img" aria-label="A ball skidding on a rough floor">
        <line x1={0} x2={W} y1={groundY} y2={groundY} className="stroke-foreground/60" strokeWidth={1.5} />
        <line x1={sx(0)} x2={sx(0)} y1={groundY} y2={groundY + 6} className="stroke-muted-foreground" strokeWidth={1} />
        <text x={sx(0)} y={groundY + 16} textAnchor="middle" className="fill-muted-foreground text-[8px]">
          start
        </text>
        <Wheel cx={bx} cy={by} r={rpx} turn={now.turn} stroke={BODIES[body].stroke} fill={BODIES[body].fill} />
        <Arrow x1={bx} y1={by} dx={now.v * vScale} dy={0} cls="stroke-primary" fillCls="fill-primary" width={2.5} />
        {slipping && <Arrow x1={bx} y1={groundY + 3} dx={-dir * 26} dy={0} cls="stroke-callout-warning" fillCls="fill-callout-warning" width={2.5} />}
        <text x={bx} y={by - rpx - 8} textAnchor="middle" className={`text-[9px] font-semibold ${slipping ? "fill-callout-warning" : "fill-callout-tip"}`}>
          {slipping ? "slipping: kinetic friction" : "pure rolling: no friction needed"}
        </text>
      </svg>
      <PlaybackBar playback={playback} timeLabel={`t = ${fmt(t)} s`} />
      <MiniGraph series={series} t0={0} t1={Tend} cursor={t} xLabel="t (s)" yLabel="speed (m/s)" />
      <div className="space-y-2">
        <RangeSlider latex="v_0" range={config.v0} value={v0} onChange={setV0} unit="m/s" />
        <RangeSlider latex="\omega_0" range={config.omega0} value={w0} onChange={setW0} unit="rad/s" />
        <RangeSlider latex="\mu_k" range={config.muK} value={muK} onChange={setMuK} />
      </div>
      <ReadoutBox>
        <ReadoutLine latex={`v_0 - \\omega_0 R = ${fmt(slip0)}\\ \\text{m/s}`} note={dir === 0 ? "already rolling" : dir > 0 ? "bottom slides forward: friction backwards" : "bottom slides backwards: friction forwards"} />
        <ReadoutLine
          latex={`t^* = \\frac{\\lvert v_0 - \\omega_0 R\\rvert}{\\mu_k g\\,(1 + R^2/k^2)} = ${fmt(tStar)}\\ \\text{s}`}
          note={`${BODIES[body].label.toLowerCase()}: k²/R² = ${fmt(k2, 3)}, R = ${fmt(R)} m`}
        />
        <ReadoutLine latex={`v_f = \\frac{v_0 + (k^2/R^2)\\,\\omega_0 R}{1 + k^2/R^2} = ${fmt(vf)}\\ \\text{m/s}`} note={vf < -1e-9 ? "negative: the ball comes back" : undefined} />
        <ReadoutLine latex={`\\frac{L_{\\text{contact}}}{M} = R\\left(v_{cm} + \\frac{k^2}{R^2}\\,\\omega R\\right) = ${fmt(Lc)}\\ \\text{m}^2/\\text{s}`} note="constant: friction acts through the contact point" />
        {config.showEnergy && Ki > 1e-12 && <ReadoutLine latex={`\\frac{K_f}{K_i} = ${fmt(Kf / Ki)}`} note="the rest is lost to kinetic friction while slipping" />}
      </ReadoutBox>
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ?? "Friction slows the centre and spins the ball up (or down) until v = ωR. After that it has nothing to do."}
      </p>
    </InteractiveFrame>
  );
}
