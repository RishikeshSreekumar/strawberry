"use client";

import { useId, useState } from "react";
import type { z } from "zod";
import type { emMagnetLabSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { niceTicks, sciLatex, sigText } from "./em-format";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex } from "./vec-canvas-2d";

type Config = z.infer<typeof emMagnetLabSchema>;
type Mode = Config["mode"];
type Readout = NonNullable<Config["readouts"]>[number];
type V2 = [number, number];

/** μ₀/4π in SI. */
const MU0_4PI = 1e-7;
const DEG = Math.PI / 180;
const W = 400;

const DEFAULT_READOUTS: Record<Mode, Readout[]> = {
  field: ["probe", "axial-equatorial", "neutral"],
  torque: ["torque", "energy", "period"],
  hysteresis: ["loop", "point"],
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  field:
    "Move P with the r and θ sliders. Outside the magnet the lines run from N round to S; inside they return from S to N, so every line closes.",
  torque:
    "The field pulls the N pole one way and the S pole the other: a couple. Turn the magnet and watch τ = mB sin θ and U = −mB cos θ.",
  hysteresis:
    "Drag the cycle slider round the loop. At H = 0 the material keeps B_r (retentivity); it takes a reverse field H_c (coercivity) to bring B back to zero.",
};

const UNIT_SCALE = { uT: 1e-6, mT: 1e-3, T: 1 } as const;
const UNIT_TEXT = { uT: "μT", mT: "mT", T: "T" } as const;
const UNIT_LATEX = { uT: "\\mu\\text{T}", mT: "\\text{mT}", T: "\\text{T}" } as const;

// ---------- small shared pieces ----------

type Line = { key: string; latex: string; note?: string };

function Readouts({ lines }: { lines: Line[] }) {
  if (lines.length === 0) return null;
  return (
    <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
      {lines.map((l) => (
        <div key={l.key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="overflow-x-auto">
            <Latex latex={l.latex} />
          </span>
          {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
        </div>
      ))}
    </div>
  );
}

function Footer({ text, onReset }: { text: string; onReset: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs text-muted-foreground">
        <RichText text={text} />
      </p>
      <button type="button" onClick={onReset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
        Reset
      </button>
    </div>
  );
}

type Curve = { pts: V2[]; className: string; dashed?: boolean };

/** A small x–y plot of pre-sampled curves. */
function MiniPlot({
  x0,
  x1,
  y0,
  y1,
  xLabel,
  yLabel,
  curves,
  points = [],
  marks = [],
  xTicks,
  height = 220,
}: {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  xLabel: string;
  yLabel: string;
  curves: Curve[];
  points?: { x: number; y: number; className: string }[];
  marks?: { x: number; y: number; latex: string; dx?: number; dy?: number }[];
  xTicks?: number[];
  height?: number;
}) {
  const clipId = `emmag${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const padL = 44;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const X = (x: number) => padL + ((x - x0) / (x1 - x0)) * (W - padL - padR);
  const Y = (y: number) => padT + (1 - (y - y0) / (y1 - y0)) * (height - padT - padB);
  const xt = xTicks ?? niceTicks(x0, x1, 5);
  const yt = niceTicks(y0, y1, 4);
  const d = (pts: V2[]) =>
    pts
      .filter((p) => Number.isFinite(p[0]) && Number.isFinite(p[1]))
      .map((p, i) => `${i === 0 ? "M" : "L"}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`)
      .join("");
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img">
      <defs>
        <clipPath id={clipId}>
          <rect x={padL} y={padT} width={W - padL - padR} height={height - padT - padB} />
        </clipPath>
      </defs>
      {xt.map((x) => (
        <g key={`x${x}`}>
          <line x1={X(x)} y1={padT} x2={X(x)} y2={height - padB} className="stroke-border" strokeWidth={0.5} />
          <text x={X(x)} y={height - padB + 11} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {sigText(x)}
          </text>
        </g>
      ))}
      {yt.map((y) => (
        <g key={`y${y}`}>
          <line x1={padL} y1={Y(y)} x2={W - padR} y2={Y(y)} className="stroke-border" strokeWidth={0.5} />
          <text x={padL - 4} y={Y(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
            {sigText(y)}
          </text>
        </g>
      ))}
      {y0 <= 0 && y1 >= 0 && (
        <line x1={padL} y1={Y(0)} x2={W - padR} y2={Y(0)} className="stroke-foreground/50" strokeWidth={1} />
      )}
      {x0 <= 0 && x1 >= 0 && (
        <line x1={X(0)} y1={padT} x2={X(0)} y2={height - padB} className="stroke-foreground/50" strokeWidth={1} />
      )}
      <text x={(W + padL) / 2} y={height - 3} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {xLabel}
      </text>
      <text x={4} y={padT + 2} className="fill-muted-foreground text-[10px]" dominantBaseline="hanging">
        {yLabel}
      </text>
      <g clipPath={`url(#${clipId})`}>
        {curves.map((c, i) => (
          <path
            key={`c${i}`}
            d={d(c.pts)}
            fill="none"
            strokeWidth={2}
            strokeDasharray={c.dashed ? "5 4" : undefined}
            className={c.className}
          />
        ))}
        {points
          .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
          .map((p, i) => (
            <circle key={`p${i}`} cx={X(p.x)} cy={Y(p.y)} r={4.5} className={p.className} />
          ))}
      </g>
      {marks.map((m, i) => (
        <SvgLatex key={`m${i}`} x={X(m.x) + (m.dx ?? 0)} y={Y(m.y) + (m.dy ?? 0)} latex={m.latex} />
      ))}
    </svg>
  );
}

/** Bisection for a decreasing f on [lo, hi]; NaN when there is no sign change. */
function bisect(f: (x: number) => number, lo: number, hi: number): number {
  let a = lo;
  let b = hi;
  let fa = f(a);
  const fb = f(b);
  if (!(fa > 0 && fb < 0)) return NaN;
  for (let i = 0; i < 200; i++) {
    const mid = (a + b) / 2;
    const fm = f(mid);
    if (fm > 0) {
      a = mid;
      fa = fm;
    } else {
      b = mid;
    }
  }
  return (a + b) / 2;
}

// ---------- field mode ----------

function FieldView({ config }: { config: Config }) {
  const win = config.window;
  const width = win.xmax - win.xmin;
  const u = W / width;
  const H = (win.ymax - win.ymin) * u;
  const sx = (x: number) => (x - win.xmin) * u;
  const sy = (y: number) => H - (y - win.ymin) * u;

  const startAngle = config.angle ?? 30;
  const [m, setM] = useState(config.moment.initial);
  const [r, setR] = useState(config.distance.initial);
  const [theta, setTheta] = useState(startAngle);
  const hasEarth = config.earthField > 0;
  const [earthOn, setEarthOn] = useState(hasEarth);

  const l = config.halfLength; // cm
  const lm = l * 0.01; // m
  const sgn = config.magnetPointing === "north" ? 1 : -1; // m along +y (north) or -y
  const BH = earthOn ? config.earthField * 1e-6 : 0; // T, along +y
  const qm = m / (2 * lm); // pole strength, A m
  const nPole: V2 = [0, sgn * l];
  const sPole: V2 = [0, -sgn * l];

  /** Magnet's field (T) at p (cm), from the two poles. */
  function magnetField(p: V2): V2 {
    let bx = 0;
    let by = 0;
    for (const [pole, s] of [
      [nPole, 1],
      [sPole, -1],
    ] as const) {
      const dx = (p[0] - pole[0]) * 0.01;
      const dy = (p[1] - pole[1]) * 0.01;
      const d2 = dx * dx + dy * dy;
      if (d2 < 1e-14) continue;
      const f = (MU0_4PI * s * qm) / (d2 * Math.sqrt(d2));
      bx += f * dx;
      by += f * dy;
    }
    return [bx, by];
  }
  const netField = (p: V2): V2 => {
    const b = magnetField(p);
    return [b[0], b[1] + BH];
  };

  // ---------- field lines ----------
  const h = width / 260;
  const r0 = width / 70;
  const margin = width * 0.04;
  const out = (p: V2) =>
    p[0] < win.xmin - margin || p[0] > win.xmax + margin || p[1] < win.ymin - margin || p[1] > win.ymax + margin;
  function trace(start: V2, sign: number): V2[] {
    const pts: V2[] = [start];
    let p = start;
    for (let step = 0; step < 1600; step++) {
      const d1 = netField(p);
      const l1 = Math.hypot(d1[0], d1[1]);
      if (!(l1 > 1e-13)) break;
      const mid: V2 = [p[0] + (0.5 * h * sign * d1[0]) / l1, p[1] + (0.5 * h * sign * d1[1]) / l1];
      const d2 = netField(mid);
      const l2 = Math.hypot(d2[0], d2[1]);
      if (!(l2 > 1e-13)) break;
      p = [p[0] + (h * sign * d2[0]) / l2, p[1] + (h * sign * d2[1]) / l2];
      pts.push(p);
      if (out(p)) break;
      if (step > 6 && Math.hypot(p[0] - sPole[0], p[1] - sPole[1]) < r0) {
        pts.push(sPole);
        break;
      }
      if (step > 6 && Math.hypot(p[0] - nPole[0], p[1] - nPole[1]) < r0) {
        pts.push(nPole);
        break;
      }
    }
    return pts;
  }
  const lines: V2[][] = [];
  const nLines = 14;
  for (let k = 0; k < nLines; k++) {
    const t = (2 * Math.PI * (k + 0.5)) / nLines;
    lines.push([nPole, ...trace([nPole[0] + r0 * Math.cos(t), nPole[1] + r0 * Math.sin(t)], 1)]);
  }
  if (BH > 0) {
    const n = 9;
    for (let k = 0; k < n; k++) {
      const x = win.xmin + (width * (k + 0.5)) / n;
      lines.push(trace([x, win.ymin - margin * 0.5], 1));
    }
  }
  const pathOf = (pts: V2[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p[0]).toFixed(1)} ${sy(p[1]).toFixed(1)}`).join("");

  // ---------- probe ----------
  const th = theta * DEG;
  const probe: V2 = [r * Math.sin(th), sgn * r * Math.cos(th)];
  const bMag = magnetField(probe);
  const bNet = netField(probe);
  const rm = r * 0.01;
  const shortB = ((MU0_4PI * m) / rm ** 3) * Math.sqrt(1 + 3 * Math.cos(th) ** 2);
  const exactB = Math.hypot(bMag[0], bMag[1]);
  const netB = Math.hypot(bNet[0], bNet[1]);
  const pLen = 30;
  const probeDir: V2 = netB > 0 ? [bNet[0] / netB, bNet[1] / netB] : [0, 0];

  // ---------- neutral points ----------
  let neutral = NaN;
  let neutralPts: V2[] = [];
  if (BH > 0) {
    if (sgn === 1) {
      neutral = bisect((x) => (MU0_4PI * m) / (x * x + lm * lm) ** 1.5 - BH, 0, 100);
      if (Number.isFinite(neutral)) neutralPts = [[neutral * 100, 0], [-neutral * 100, 0]];
    } else {
      neutral = bisect((x) => (MU0_4PI * 2 * m * x) / (x * x - lm * lm) ** 2 - BH, lm * (1 + 1e-9), 100);
      if (Number.isFinite(neutral)) neutralPts = [[0, neutral * 100], [0, -neutral * 100]];
    }
  }

  const readouts = config.readouts ?? DEFAULT_READOUTS.field;
  const has = (k: Readout) => readouts.includes(k);
  const out2: Line[] = [];
  const muT = (b: number) => `${sciLatex(b * 1e6)}\\ \\mu\\text{T}`;
  if (has("probe")) {
    out2.push({
      key: "probe",
      latex: `\\text{At P } (r = ${sigText(r)}\\text{ cm},\\ \\theta = ${sigText(theta)}^\\circ):\\ B_{\\text{magnet}} = ${muT(exactB)}`,
      note: "exact, from both poles",
    });
    out2.push({
      key: "short",
      latex: `\\text{short magnet: } \\frac{\\mu_0}{4\\pi}\\frac{m}{r^3}\\sqrt{1 + 3\\cos^2\\theta} = ${muT(shortB)}`,
      note: exactB > 0 ? `${sigText((shortB / exactB) * 100)}% of exact` : undefined,
    });
    if (BH > 0) {
      out2.push({ key: "net", latex: `\\text{with Earth's } B_H = ${sigText(config.earthField)}\\ \\mu\\text{T}:\\ B_{\\text{net}} = ${muT(netB)}` });
    }
  }
  if (has("components")) {
    const k = (MU0_4PI * m) / rm ** 3;
    out2.push({
      key: "comp",
      latex: `B_r = \\frac{\\mu_0}{4\\pi}\\frac{2m\\cos\\theta}{r^3} = ${muT(2 * k * Math.cos(th))},\\quad B_\\theta = \\frac{\\mu_0}{4\\pi}\\frac{m\\sin\\theta}{r^3} = ${muT(k * Math.sin(th))}`,
      note: "tan α = ½ tan θ",
    });
  }
  if (has("axial-equatorial")) {
    const ax = (MU0_4PI * 2 * m * rm) / (rm * rm - lm * lm) ** 2;
    const eq = (MU0_4PI * m) / (rm * rm + lm * lm) ** 1.5;
    out2.push({
      key: "ax",
      latex: `B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi}\\frac{2mr}{(r^2 - l^2)^2} = ${muT(ax)},\\quad B_{\\text{eq}} = \\frac{\\mu_0}{4\\pi}\\frac{m}{(r^2 + l^2)^{3/2}} = ${muT(eq)}`,
      note: `ratio ${sigText(ax / eq)} (→ 2 when r ≫ l)`,
    });
  }
  if (has("neutral") && BH > 0) {
    out2.push({
      key: "neutral",
      latex: Number.isFinite(neutral)
        ? `\\text{Neutral points: } ${sigText(neutral * 100)}\\text{ cm from the centre on the ${sgn === 1 ? "equatorial line" : "axis"}}`
        : `\\text{No neutral point outside the magnet}`,
      note: sgn === 1 ? "N pole north: magnet's equatorial field points south" : "N pole south: magnet's axial field points south",
    });
  }

  function reset() {
    setM(config.moment.initial);
    setR(config.distance.initial);
    setTheta(startAngle);
    setEarthOn(hasEarth);
  }

  // magnet body: geometric length ≈ 1.2 × magnetic length
  const bodyHalf = 1.2 * l;
  const bodyW = Math.max(1.2, width / 50);
  const nHalfY0 = sgn === 1 ? 0 : -bodyHalf;
  const sHalfY0 = sgn === 1 ? -bodyHalf : 0;

  return (
    <InteractiveFrame title={hasEarth ? "Bar magnet in the Earth's field" : "Field of a bar magnet"}>
      <div className="overflow-x-auto text-center">
        <Latex
          latex={`\\vec B = \\frac{\\mu_0}{4\\pi}\\frac{m}{r^3}\\sqrt{1 + 3\\cos^2\\theta}\\quad(r \\gg l)`}
          display
        />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Bar magnet field lines">
        <line x1={sx(0)} y1={0} x2={sx(0)} y2={H} className="stroke-muted-foreground/40" strokeWidth={1} strokeDasharray="4 4" />
        <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-muted-foreground/40" strokeWidth={1} strokeDasharray="4 4" />
        <text x={sx(0) + 4} y={12} className="fill-muted-foreground text-[9px]">
          axis
        </text>
        <text x={W - 4} y={sy(0) - 4} textAnchor="end" className="fill-muted-foreground text-[9px]">
          equatorial line
        </text>
        {lines.map((pts, i) => (
          <path key={i} d={pathOf(pts)} fill="none" className="stroke-callout-info/70" strokeWidth={1.2} />
        ))}
        <rect
          x={sx(-bodyW)}
          y={sy(nHalfY0 + bodyHalf)}
          width={2 * bodyW * u}
          height={bodyHalf * u}
          className="fill-callout-warning"
          opacity={0.85}
        />
        <rect
          x={sx(-bodyW)}
          y={sy(sHalfY0 + bodyHalf)}
          width={2 * bodyW * u}
          height={bodyHalf * u}
          className="fill-callout-info"
          opacity={0.85}
        />
        <text x={sx(0)} y={sy(sgn * bodyHalf * 0.55) + 4} textAnchor="middle" className="fill-background text-[11px] font-bold">
          N
        </text>
        <text x={sx(0)} y={sy(-sgn * bodyHalf * 0.55) + 4} textAnchor="middle" className="fill-background text-[11px] font-bold">
          S
        </text>
        {neutralPts.map((p, i) => (
          <g key={`n${i}`}>
            <circle cx={sx(p[0])} cy={sy(p[1])} r={5} fill="none" className="stroke-callout-tip" strokeWidth={2} />
            <text x={sx(p[0]) + 7} y={sy(p[1]) - 6} className="fill-callout-tip text-[9px]">
              neutral
            </text>
          </g>
        ))}
        {BH > 0 && (
          <g>
            <ArrowSvg x1={W - 22} y1={46} x2={W - 22} y2={14} color="aux" width={2} />
            <text x={W - 30} y={40} textAnchor="end" className="fill-muted-foreground text-[9px]">
              B_H (north)
            </text>
          </g>
        )}
        <ArrowSvg
          x1={sx(probe[0])}
          y1={sy(probe[1])}
          x2={sx(probe[0]) + pLen * probeDir[0]}
          y2={sy(probe[1]) - pLen * probeDir[1]}
          color="result"
          width={2.5}
        />
        <circle cx={sx(probe[0])} cy={sy(probe[1])} r={4} className="fill-primary" />
        <SvgLatex x={sx(probe[0]) - 10} y={sy(probe[1]) + 12} latex="P" />
      </svg>
      <div className="space-y-2">
        <SliderRow label={<Latex latex="r" />} value={r} min={config.distance.min} max={config.distance.max} step={config.distance.step} unit="cm" onChange={setR} />
        <SliderRow label={<Latex latex="\theta" />} value={theta} min={0} max={360} step={5} unit="°" onChange={setTheta} />
        <SliderRow label={<Latex latex="m" />} value={m} min={config.moment.min} max={config.moment.max} step={config.moment.step} unit="A m²" onChange={setM} />
      </div>
      {hasEarth && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={earthOn} onChange={(e) => setEarthOn(e.target.checked)} />
          Include the Earth&apos;s horizontal field ({sigText(config.earthField)} μT, pointing up the page)
        </label>
      )}
      <Readouts lines={out2} />
      <Footer
        text={`${config.caption ?? DEFAULT_CAPTIONS.field} Magnetic length 2l = ${sigText(2 * l)} cm; θ is measured from the N direction of the magnet.`}
        onReset={reset}
      />
    </InteractiveFrame>
  );
}

// ---------- torque mode ----------

function TorqueView({ config }: { config: Config }) {
  const startAngle = config.angle ?? 60;
  const [theta, setTheta] = useState(startAngle);
  const [m, setM] = useState(config.moment.initial);
  const [b, setB] = useState(config.fieldStrength.initial);
  const unit = config.fieldUnit;
  const B = b * UNIT_SCALE[unit];
  const th = theta * DEG;
  const mB = m * B;
  const tau = mB * Math.sin(th);
  const U = -mB * Math.cos(th);
  const Wk = mB * (1 - Math.cos(th));
  const T = 2 * Math.PI * Math.sqrt(config.inertia / mB);

  // ---------- picture ----------
  const S = 260;
  const cx = W / 2;
  const cy = S / 2;
  const half = 80;
  const wid = 12;
  const ux = Math.cos(th);
  const uy = -Math.sin(th); // screen y is down
  const px = -uy;
  const py = ux;
  const corner = (a: number, s: number): string =>
    `${(cx + a * ux + s * px).toFixed(1)},${(cy + a * uy + s * py).toFixed(1)}`;
  const nPoly = [corner(0, -wid), corner(half, -wid), corner(half, wid), corner(0, wid)].join(" ");
  const sPoly = [corner(-half, -wid), corner(0, -wid), corner(0, wid), corner(-half, wid)].join(" ");
  const nTip: V2 = [cx + 0.85 * half * ux, cy + 0.85 * half * uy];
  const sTip: V2 = [cx - 0.85 * half * ux, cy - 0.85 * half * uy];
  const fLen = 46;
  // torque sense arc: rotates m towards B (clockwise on screen for 0 < θ < 180)
  const sense = Math.sin(th) > 1e-9 ? -1 : Math.sin(th) < -1e-9 ? 1 : 0;
  const arcR = 108;
  const a0 = th;
  const a1 = th + sense * 30 * DEG;
  const arcPt = (a: number): V2 => [cx + arcR * Math.cos(a), cy - arcR * Math.sin(a)];
  const arcMid = arcPt((a0 + a1) / 2);
  const arcEnd = arcPt(a1);
  const arcStart = arcPt(a0);
  const sweep = sense === -1 ? 1 : 0;

  // ---------- energy and torque plot (in units of mB) ----------
  const N = 180;
  const uPts: V2[] = [];
  const tPts: V2[] = [];
  for (let i = 0; i <= N; i++) {
    const a = (360 * i) / N;
    uPts.push([a, -Math.cos(a * DEG)]);
    tPts.push([a, Math.sin(a * DEG)]);
  }

  const readouts = config.readouts ?? DEFAULT_READOUTS.torque;
  const has = (k: Readout) => readouts.includes(k);
  const lines: Line[] = [];
  const Bl = `${sigText(b)}\\ ${UNIT_LATEX[unit]}`;
  if (has("torque")) {
    lines.push({
      key: "tau",
      latex: `\\tau = mB\\sin\\theta = (${sigText(m)})(${Bl})\\sin ${sigText(theta)}^\\circ = ${sciLatex(Math.abs(tau))}\\ \\text{N m}`,
      note: sense === 0 ? "no torque: equilibrium" : "turns m towards B",
    });
  }
  if (has("energy")) {
    const kind = Math.abs(Math.sin(th)) < 1e-9 ? (Math.cos(th) > 0 ? "stable equilibrium" : "unstable equilibrium") : undefined;
    lines.push({ key: "U", latex: `U = -mB\\cos\\theta = ${sciLatex(U)}\\ \\text{J}`, note: kind });
  }
  if (has("work")) {
    lines.push({
      key: "W",
      latex: `W_{0^\\circ \\to ${sigText(theta)}^\\circ} = mB(1 - \\cos\\theta) = ${sciLatex(Wk)}\\ \\text{J}`,
      note: "work done by an external agent, turning slowly",
    });
  }
  if (has("period")) {
    lines.push({
      key: "T",
      latex: `T = 2\\pi\\sqrt{\\frac{I}{mB}} = 2\\pi\\sqrt{\\frac{${sciLatex(config.inertia)}}{${sciLatex(mB)}}} = ${sciLatex(T)}\\ \\text{s}`,
      note: "small oscillations about θ = 0",
    });
  }

  function reset() {
    setTheta(startAngle);
    setM(config.moment.initial);
    setB(config.fieldStrength.initial);
  }

  return (
    <InteractiveFrame title="Magnet in a uniform field">
      <div className="overflow-x-auto text-center">
        <Latex latex={`\\vec\\tau = \\vec m\\times\\vec B,\\qquad U = -\\vec m\\cdot\\vec B`} display />
      </div>
      <svg viewBox={`0 0 ${W} ${S}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Magnet in a uniform field">
        {[30, 70, 110, 150, 190, 230].map((y) => (
          <g key={y}>
            <line x1={10} y1={y} x2={W - 14} y2={y} className="stroke-muted-foreground/30" strokeWidth={1} />
            <polygon points={`${W - 8},${y} ${W - 16},${y - 4} ${W - 16},${y + 4}`} className="fill-muted-foreground/40" />
          </g>
        ))}
        <SvgLatex x={W - 24} y={16} latex="\vec B" />
        <polygon points={nPoly} className="fill-callout-warning" opacity={0.9} />
        <polygon points={sPoly} className="fill-callout-info" opacity={0.9} />
        <text x={nTip[0]} y={nTip[1] + 4} textAnchor="middle" className="fill-background text-[11px] font-bold">
          N
        </text>
        <text x={sTip[0]} y={sTip[1] + 4} textAnchor="middle" className="fill-background text-[11px] font-bold">
          S
        </text>
        <ArrowSvg x1={nTip[0]} y1={nTip[1]} x2={nTip[0] + fLen} y2={nTip[1]} color="result" width={2} />
        <ArrowSvg x1={sTip[0]} y1={sTip[1]} x2={sTip[0] - fLen} y2={sTip[1]} color="result" width={2} />
        <ArrowSvg x1={cx} y1={cy} x2={cx + (half + 34) * ux} y2={cy + (half + 34) * uy} color="a" width={1.8} dashed />
        <SvgLatex x={cx + (half + 46) * ux} y={cy + (half + 46) * uy} latex="\vec m" />
        {sense !== 0 && (
          <g>
            <path
              d={`M${arcStart[0].toFixed(1)} ${arcStart[1].toFixed(1)}A${arcR} ${arcR} 0 0 ${sweep} ${arcMid[0].toFixed(1)} ${arcMid[1].toFixed(1)}`}
              fill="none"
              className="stroke-callout-warning"
              strokeWidth={2}
            />
            <ArrowSvg x1={arcMid[0]} y1={arcMid[1]} x2={arcEnd[0]} y2={arcEnd[1]} color="aux" width={2} />
            <SvgLatex x={arcEnd[0] + 12} y={arcEnd[1] + 10} latex="\tau" />
          </g>
        )}
      </svg>
      <MiniPlot
        x0={0}
        x1={360}
        y0={-1.2}
        y1={1.2}
        xTicks={[0, 90, 180, 270, 360]}
        xLabel="θ (degrees)"
        yLabel="in units of mB"
        curves={[
          { pts: uPts, className: "stroke-callout-tip" },
          { pts: tPts, className: "stroke-callout-warning" },
        ]}
        points={[
          { x: theta, y: -Math.cos(th), className: "fill-callout-tip" },
          { x: theta, y: Math.sin(th), className: "fill-callout-warning" },
        ]}
        height={190}
      />
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 bg-callout-tip" />U / mB = −cos θ
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 bg-callout-warning" />τ / mB = sin θ
        </span>
      </div>
      <div className="space-y-2">
        <SliderRow label={<Latex latex="\theta" />} value={theta} min={0} max={360} step={5} unit="°" onChange={setTheta} />
        <SliderRow label={<Latex latex="m" />} value={m} min={config.moment.min} max={config.moment.max} step={config.moment.step} unit="A m²" onChange={setM} />
        <SliderRow
          label={<Latex latex="B" />}
          value={b}
          min={config.fieldStrength.min}
          max={config.fieldStrength.max}
          step={config.fieldStrength.step}
          unit={UNIT_TEXT[unit]}
          onChange={setB}
        />
      </div>
      <Readouts lines={lines} />
      <Footer
        text={`${config.caption ?? DEFAULT_CAPTIONS.torque} Moment of inertia I = ${sigText(config.inertia)} kg m².`}
        onReset={reset}
      />
    </InteractiveFrame>
  );
}

// ---------- hysteresis mode ----------

const PRESETS = {
  "soft iron": { br: 1.2, hc: 150 },
  steel: { br: 1.0, hc: 1500 },
} as const;

function loopModel(bs: number, br: number, hc: number, hmax: number) {
  const ratio = Math.min(0.999, Math.max(0.001, br / bs));
  const w = hc / Math.atanh(ratio);
  const gd = (h: number) => Math.tanh((h + hc) / w);
  const ga = (h: number) => Math.tanh((h - hc) / w);
  const gap = gd(hmax) - ga(hmax);
  const s = (h: number) => (h / hmax) ** 4;
  const down = (h: number) => bs * (gd(h) - (gap / 2) * s(h));
  const up = (h: number) => bs * (ga(h) + (gap / 2) * s(h));
  // area ∮H dB = ∫ (B_down − B_up) dH over [−hmax, hmax]
  const n = 800;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const h0 = -hmax + (2 * hmax * i) / n;
    const h1 = -hmax + (2 * hmax * (i + 1)) / n;
    area += 0.5 * (down(h0) - up(h0) + down(h1) - up(h1)) * (h1 - h0);
  }
  return { down, up, area };
}

function HysteresisView({ config }: { config: Config }) {
  const bs = config.saturation;
  const hmax = config.hMax;
  const [br, setBr] = useState(config.retentivity.initial);
  const [hc, setHc] = useState(config.coercivity.initial);
  const [phase, setPhase] = useState(90);
  const model = loopModel(bs, br, hc, hmax);
  const ghost = loopModel(bs, config.retentivity.initial, config.coercivity.initial, hmax);

  const N = 200;
  const branch = (f: (h: number) => number): V2[] =>
    Array.from({ length: N + 1 }, (_, i) => {
      const h = -hmax + (2 * hmax * i) / N;
      return [h, f(h)] as V2;
    });

  const Hraw = hmax * Math.cos(phase * DEG);
  const H = Math.abs(Hraw) < hmax * 1e-9 ? 0 : Hraw;
  const descending = phase <= 180;
  const B = descending ? model.down(H) : model.up(H);
  const stage =
    phase < 4 || phase > 356
      ? "saturation: almost every domain lined up with +H"
      : Math.abs(phase - 180) < 4
        ? "saturation in reverse"
        : Math.abs(H) < hmax * 0.02
          ? "H ≈ 0, yet B stays near ±B_r: retentivity"
          : Math.abs(B) < bs * 0.03
            ? "B ≈ 0 at H ≈ ∓H_c: coercivity"
            : descending
              ? "H falling (upper branch)"
              : "H rising (lower branch)";

  const readouts = config.readouts ?? DEFAULT_READOUTS.hysteresis;
  const has = (k: Readout) => readouts.includes(k);
  const lines: Line[] = [];
  if (has("loop")) {
    lines.push({ key: "br", latex: `B_r = ${sigText(br)}\\ \\text{T},\\quad H_c = ${sigText(hc)}\\ \\text{A/m}` });
    lines.push({
      key: "area",
      latex: `\\oint H\\,dB = ${sciLatex(model.area)}\\ \\text{J/m}^3\\text{ per cycle}`,
      note: `= ${sigText(model.area * config.frequency)} W per m³ at ${sigText(config.frequency)} Hz`,
    });
  }
  if (has("point")) {
    lines.push({ key: "pt", latex: `H = ${sciLatex(H)}\\ \\text{A/m},\\quad B = ${sciLatex(B)}\\ \\text{T}`, note: stage });
  }

  function reset() {
    setBr(config.retentivity.initial);
    setHc(config.coercivity.initial);
    setPhase(90);
  }
  const clampTo = (v: number, r: { min: number; max: number }) => Math.min(r.max, Math.max(r.min, v));

  return (
    <InteractiveFrame title="Hysteresis loop">
      <div className="overflow-x-auto text-center">
        <Latex latex={`B = \\mu_0(H + M),\\qquad \\text{loss per cycle per unit volume} = \\oint H\\,dB`} display />
      </div>
      <MiniPlot
        x0={-hmax}
        x1={hmax}
        y0={-bs * 1.15}
        y1={bs * 1.15}
        xLabel="H (A/m)"
        yLabel="B (T)"
        curves={[
          ...(config.showGhost
            ? [
                { pts: branch(ghost.down), className: "stroke-muted-foreground/50", dashed: true },
                { pts: branch(ghost.up), className: "stroke-muted-foreground/50", dashed: true },
              ]
            : []),
          { pts: branch(model.down), className: "stroke-callout-info" },
          { pts: branch(model.up), className: "stroke-callout-warning" },
        ]}
        points={[
          { x: 0, y: model.down(0), className: "fill-callout-tip" },
          { x: -hc, y: 0, className: "fill-callout-tip" },
          { x: H, y: B, className: "fill-primary" },
        ]}
        marks={[
          { x: 0, y: model.down(0), latex: "B_r", dx: 16, dy: -10 },
          { x: -hc, y: 0, latex: "-H_c", dx: -18, dy: 12 },
        ]}
        height={250}
      />
      <div className="flex flex-wrap justify-center gap-2">
        {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              setBr(clampTo(PRESETS[name].br, config.retentivity));
              setHc(clampTo(PRESETS[name].hc, config.coercivity));
            }}
            className="rounded-md border bg-background px-2 py-1 text-xs"
          >
            {name === "steel" ? "Steel (hard)" : "Soft iron"}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <SliderRow label="cycle" value={phase} min={0} max={360} step={2} unit="°" onChange={setPhase} />
        <SliderRow
          label={<Latex latex="B_r" />}
          value={br}
          min={config.retentivity.min}
          max={config.retentivity.max}
          step={config.retentivity.step}
          unit="T"
          onChange={(v) => setBr(Number(v.toPrecision(10)))}
        />
        <SliderRow
          label={<Latex latex="H_c" />}
          value={hc}
          min={config.coercivity.min}
          max={config.coercivity.max}
          step={config.coercivity.step}
          unit="A/m"
          onChange={setHc}
        />
      </div>
      <Readouts lines={lines} />
      <Footer
        text={`${config.caption ?? DEFAULT_CAPTIONS.hysteresis} Upper branch: H falling; lower branch: H rising. Values are illustrative; real permanent-magnet steels have even larger coercivities.`}
        onReset={reset}
      />
    </InteractiveFrame>
  );
}

export function EmMagnetLab({ config }: { config: Config }) {
  if (config.mode === "torque") return <TorqueView config={config} />;
  if (config.mode === "hysteresis") return <HysteresisView config={config} />;
  return <FieldView config={config} />;
}
