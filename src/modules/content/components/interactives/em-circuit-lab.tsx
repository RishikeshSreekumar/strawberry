"use client";

import { useId, useState } from "react";
import type { z } from "zod";
import type { emCircuitLabSchema } from "../../schemas/blocks";
import { niceStep, niceTicks, sciLatex, sigText } from "./em-format";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex, type VecColor } from "./vec-canvas-2d";

type Config = z.infer<typeof emCircuitLabSchema>;
type Mode = Config["mode"];
type Readout = NonNullable<Config["readouts"]>[number];
type SliderName = NonNullable<Config["sliders"]>[number];

const DEFAULT_READOUTS: Record<Mode, Readout[]> = {
  rc: ["tau", "instant", "energy"],
  lr: ["tau", "instant", "energy"],
  "ac-element": ["reactance", "impedance", "phase", "power"],
  lcr: ["reactance", "impedance", "phase", "power", "resonance"],
  resonance: ["resonance", "quality", "impedance"],
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  rc: "Change R or C and watch τ = RC stretch or squeeze the curve. After one τ the capacitor has 63% of its final charge.",
  lr: "The inductor fights every change in current. Change L or R and watch τ = L/R: after one τ the current is 63% of the way there.",
  "ac-element":
    "Drag ωt to spin the phasors; each waveform is the vertical projection of its phasor. Change f and watch the current's amplitude.",
  lcr: "Phasors: V_R is in step with the current, V_L leads it by 90°, V_C lags it by 90°. The source voltage is their vector sum.",
  resonance:
    "Sweep f through f₀ = 1/(2π√LC): the current peaks where X_L = X_C. Lower R and the peak grows taller and sharper.",
};

// ---------- small SVG plot ----------

type PlotCurve = { fn: (x: number) => number; className: string; dashed?: boolean };

const PW = 400;

function Plot({
  x0,
  x1,
  y0,
  y1,
  xLabel,
  yLabel,
  curves,
  vlines = [],
  hlines = [],
  points = [],
  height = 210,
}: {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  xLabel: string;
  yLabel: string;
  curves: PlotCurve[];
  vlines?: { x: number; label?: string; className?: string }[];
  hlines?: { y: number; className?: string }[];
  points?: { x: number; y: number; className: string }[];
  height?: number;
}) {
  const clipId = `emclip${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const padL = 40;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const X = (x: number) => padL + ((x - x0) / (x1 - x0)) * (PW - padL - padR);
  const Y = (y: number) => padT + (1 - (y - y0) / (y1 - y0)) * (height - padT - padB);
  const lo = y0 - (y1 - y0) * 0.1;
  const hi = y1 + (y1 - y0) * 0.1;
  const path = (fn: (x: number) => number) => {
    let d = "";
    let pen = false;
    for (let i = 0; i <= 240; i++) {
      const x = x0 + ((x1 - x0) * i) / 240;
      const y = fn(x);
      if (!Number.isFinite(y)) {
        pen = false;
        continue;
      }
      const yy = Math.min(hi, Math.max(lo, y));
      d += `${pen ? "L" : "M"}${X(x).toFixed(1)} ${Y(yy).toFixed(1)}`;
      pen = true;
    }
    return d;
  };
  const xt = niceTicks(x0, x1, 5);
  const yt = niceTicks(y0, y1, 4);
  const inX = (x: number) => Number.isFinite(x) && x >= x0 && x <= x1;
  const inY = (y: number) => Number.isFinite(y) && y >= y0 && y <= y1;
  return (
    <svg viewBox={`0 0 ${PW} ${height}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img">
      <defs>
        <clipPath id={clipId}>
          <rect x={padL} y={padT} width={PW - padL - padR} height={height - padT - padB} />
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
          <line x1={padL} y1={Y(y)} x2={PW - padR} y2={Y(y)} className="stroke-border" strokeWidth={0.5} />
          <text x={padL - 4} y={Y(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
            {sigText(y)}
          </text>
        </g>
      ))}
      {y0 <= 0 && y1 >= 0 && (
        <line x1={padL} y1={Y(0)} x2={PW - padR} y2={Y(0)} className="stroke-foreground/50" strokeWidth={1} />
      )}
      <line x1={padL} y1={padT} x2={padL} y2={height - padB} className="stroke-foreground/50" strokeWidth={1} />
      <text x={(PW + padL) / 2} y={height - 3} textAnchor="middle" className="fill-muted-foreground text-[10px]">
        {xLabel}
      </text>
      <text x={4} y={padT + 2} className="fill-muted-foreground text-[10px]" dominantBaseline="hanging">
        {yLabel}
      </text>
      <g clipPath={`url(#${clipId})`}>
        {hlines.filter((l) => inY(l.y)).map((l, i) => (
          <line
            key={`h${i}`}
            x1={padL}
            y1={Y(l.y)}
            x2={PW - padR}
            y2={Y(l.y)}
            className={l.className ?? "stroke-muted-foreground"}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        {vlines.filter((l) => inX(l.x)).map((l, i) => (
          <g key={`v${i}`}>
            <line
              x1={X(l.x)}
              y1={padT}
              x2={X(l.x)}
              y2={height - padB}
              className={l.className ?? "stroke-muted-foreground"}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            {l.label && (
              <text x={X(l.x) + 3} y={padT + 10} className="fill-muted-foreground text-[10px]">
                {l.label}
              </text>
            )}
          </g>
        ))}
        {curves.map((c, i) => (
          <path
            key={`c${i}`}
            d={path(c.fn)}
            fill="none"
            strokeWidth={2}
            strokeDasharray={c.dashed ? "5 4" : undefined}
            className={c.className}
          />
        ))}
        {points.filter((p) => inX(p.x) && Number.isFinite(p.y)).map((p, i) => (
          <circle key={`p${i}`} cx={X(p.x)} cy={Y(Math.min(hi, Math.max(lo, p.y)))} r={4.5} className={p.className} />
        ))}
      </g>
    </svg>
  );
}

// ---------- phasor diagram ----------

type Phasor = { angleDeg: number; mag: number; color: VecColor; label: string; from?: [number, number]; dashed?: boolean };

function PhasorDiagram({ phasors, maxMag }: { phasors: Phasor[]; maxMag: number }) {
  const S = 220;
  const c = S / 2;
  const R = 86;
  const k = maxMag > 0 ? R / maxMag : 0;
  const tip = (p: Phasor): [number, number] => {
    const a = (p.angleDeg * Math.PI) / 180;
    const f = p.from ?? [0, 0];
    return [f[0] + p.mag * Math.cos(a), f[1] + p.mag * Math.sin(a)];
  };
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="mx-auto w-full max-w-[240px] rounded-md border bg-background" role="img" aria-label="Phasor diagram">
      <circle cx={c} cy={c} r={R} fill="none" className="stroke-border" strokeWidth={1} />
      <line x1={c - R - 8} y1={c} x2={c + R + 8} y2={c} className="stroke-foreground/30" strokeWidth={1} />
      <line x1={c} y1={c - R - 8} x2={c} y2={c + R + 8} className="stroke-foreground/30" strokeWidth={1} />
      {phasors.map((p, i) => {
        const f = p.from ?? [0, 0];
        const t = tip(p);
        if (!Number.isFinite(t[0]) || !Number.isFinite(t[1])) return null;
        const x1 = c + f[0] * k;
        const y1 = c - f[1] * k;
        const x2 = c + t[0] * k;
        const y2 = c - t[1] * k;
        const l = Math.hypot(x2 - x1, y2 - y1) || 1;
        return (
          <g key={i}>
            {!p.from && (
              <line x1={x2} y1={y2} x2={c} y2={y2} className="stroke-muted-foreground/60" strokeWidth={0.8} strokeDasharray="2 3" />
            )}
            <ArrowSvg x1={x1} y1={y1} x2={x2} y2={y2} color={p.color} width={p.dashed ? 1.8 : 2.5} dashed={p.dashed} />
            <SvgLatex x={x2 + ((x2 - x1) / l) * 14} y={y2 + ((y2 - y1) / l) * 12} latex={p.label} />
          </g>
        );
      })}
    </svg>
  );
}

// ---------- the lab ----------

const DEG = Math.PI / 180;

export function EmCircuitLab({ config }: { config: Config }) {
  const { mode } = config;
  const [R, setR] = useState(config.resistance.initial);
  const [Lm, setL] = useState(config.inductance.initial);
  const [Cu, setC] = useState(config.capacitance.initial);
  const [f, setF] = useState(config.frequency.initial);
  const [wt, setWt] = useState(60);

  const E = config.emf;
  const Lh = Lm * 1e-3;
  const Cf = Cu * 1e-6;

  // ---------- transients (rc / lr) ----------
  const transient = mode === "rc" || mode === "lr";
  const tauOf = (r: number, l: number, cap: number) => (mode === "rc" ? r * cap * 1e-6 : (l * 1e-3) / r) * 1e3; // ms
  const tau0 = tauOf(config.resistance.initial, config.inductance.initial, config.capacitance.initial);
  const tStep = niceStep((5 * tau0) / 100);
  const tMax = Math.max(tStep, Math.round((5 * tau0) / tStep) * tStep);
  const [t, setT] = useState(() => Math.min(tMax, Math.round(tau0 / tStep) * tStep));
  const tau = tauOf(R, Lm, Cu);
  const charging = config.process === "charge";

  // ---------- AC ----------
  const w = 2 * Math.PI * f;
  const XL = w * Lh;
  const XC = 1 / (w * Cf);
  const V0 = E;
  const T = 1000 / f; // ms
  const tNow = (wt / 360) * T;
  const f0 = 1 / (2 * Math.PI * Math.sqrt(Lh * Cf));

  const defaultSliders: Record<Mode, SliderName[]> = {
    rc: ["R", "C"],
    lr: ["R", "L"],
    "ac-element": config.element === "R" ? ["R", "f"] : config.element === "L" ? ["L", "f"] : ["C", "f"],
    lcr: ["R", "L", "C", "f"],
    resonance: ["R", "L", "C", "f"],
  };
  const sliders = config.sliders ?? defaultSliders[mode];
  const readouts = config.readouts ?? DEFAULT_READOUTS[mode];
  const has = (r: Readout) => readouts.includes(r);

  function reset() {
    setR(config.resistance.initial);
    setL(config.inductance.initial);
    setC(config.capacitance.initial);
    setF(config.frequency.initial);
    setWt(60);
    setT(Math.min(tMax, Math.round(tau0 / tStep) * tStep));
  }

  const lines: { key: string; latex: string; note?: string }[] = [];
  const push = (key: string, latex: string, note?: string) => lines.push({ key, latex, note });
  let headline = "";
  let visual: React.ReactNode = null;
  let legend: { cls: string; text: string }[] = [];

  if (transient) {
    const x = t / tau;
    const ex = Math.exp(-x);
    const decay = (tt: number, tauMs: number) => Math.exp(-tt / tauMs);
    const grow = (tt: number, tauMs: number) => 1 - Math.exp(-tt / tauMs);
    if (mode === "rc") {
      const I0 = E / R;
      const vc = charging ? E * (1 - ex) : E * ex;
      const i = I0 * ex;
      headline = charging
        ? `V_C = \\mathcal{E}\\left(1 - e^{-t/RC}\\right),\\quad i = \\frac{\\mathcal{E}}{R}\\,e^{-t/RC}`
        : `V_C = V_0\\,e^{-t/RC},\\quad \\lvert i\\rvert = \\frac{V_0}{R}\\,e^{-t/RC}`;
      legend = [
        { cls: "bg-callout-tip", text: charging ? "V_C / ℰ" : "V_C / V₀" },
        { cls: "bg-callout-info", text: "|i| / i_max" },
      ];
      visual = (
        <Plot
          x0={0}
          x1={tMax}
          y0={0}
          y1={1}
          xLabel="t (ms)"
          yLabel="fraction of maximum"
          curves={[
            ...(config.showGhost
              ? [{ fn: (tt: number) => (charging ? grow(tt, tau0) : decay(tt, tau0)), className: "stroke-muted-foreground/50", dashed: true }]
              : []),
            { fn: (tt: number) => decay(tt, tau), className: "stroke-callout-info" },
            { fn: (tt: number) => (charging ? grow(tt, tau) : decay(tt, tau)), className: "stroke-callout-tip" },
          ]}
          vlines={[{ x: tau, label: "t = τ" }, { x: t, className: "stroke-foreground/60" }]}
          hlines={[{ y: charging ? 1 - Math.exp(-1) : Math.exp(-1) }]}
          points={[
            { x: t, y: vc / E, className: "fill-callout-tip" },
            { x: t, y: ex, className: "fill-callout-info" },
          ]}
        />
      );
      if (has("tau")) {
        push("tau", `\\tau = RC = (${sigText(R)}\\ \\Omega)(${sigText(Cu)}\\times 10^{-6}\\ \\text{F}) = ${sciLatex(tau / 1000)}\\ \\text{s}`, `= ${sigText(tau)} ms`);
      }
      if (has("instant")) {
        push("x", `t = ${sigText(t)}\\ \\text{ms} = ${sigText(x)}\\,\\tau`);
        push("vc", `V_C = ${sciLatex(vc)}\\ \\text{V}\\ (${sigText((vc / E) * 100)}\\%),\\quad q = CV_C = ${sciLatex(Cf * vc)}\\ \\text{C}`);
        push("i", `\\lvert i\\rvert = ${sciLatex(i)}\\ \\text{A}`, charging ? "falls as the capacitor fills" : "falls as the capacitor empties");
      }
      if (has("energy")) {
        push("U", `U = \\tfrac12 C V_C^2 = ${sciLatex(0.5 * Cf * vc * vc)}\\ \\text{J}`);
        if (charging) {
          push(
            "Ub",
            `\\text{Full charge: battery gives } Q\\mathcal{E} = C\\mathcal{E}^2 = ${sciLatex(Cf * E * E)}\\ \\text{J}, \\text{ stores } \\tfrac12 C\\mathcal{E}^2 = ${sciLatex(0.5 * Cf * E * E)}\\ \\text{J}`,
            "the other half heats R, whatever R is",
          );
        }
      }
    } else {
      const I0 = E / R;
      const i = charging ? I0 * (1 - ex) : I0 * ex;
      const vl = E * ex;
      headline = charging
        ? `i = \\frac{\\mathcal{E}}{R}\\left(1 - e^{-Rt/L}\\right),\\quad V_L = \\mathcal{E}\\,e^{-Rt/L}`
        : `i = I_0\\,e^{-Rt/L},\\quad \\lvert V_L\\rvert = I_0 R\\,e^{-Rt/L}`;
      legend = [
        { cls: "bg-callout-info", text: charging ? "i / (ℰ/R)" : "i / I₀" },
        { cls: "bg-callout-warning", text: "|V_L| / ℰ" },
      ];
      visual = (
        <Plot
          x0={0}
          x1={tMax}
          y0={0}
          y1={1}
          xLabel="t (ms)"
          yLabel="fraction of maximum"
          curves={[
            ...(config.showGhost
              ? [{ fn: (tt: number) => (charging ? grow(tt, tau0) : decay(tt, tau0)), className: "stroke-muted-foreground/50", dashed: true }]
              : []),
            { fn: (tt: number) => decay(tt, tau), className: "stroke-callout-warning" },
            { fn: (tt: number) => (charging ? grow(tt, tau) : decay(tt, tau)), className: "stroke-callout-info" },
          ]}
          vlines={[{ x: tau, label: "t = τ" }, { x: t, className: "stroke-foreground/60" }]}
          hlines={[{ y: charging ? 1 - Math.exp(-1) : Math.exp(-1) }]}
          points={[
            { x: t, y: i / I0, className: "fill-callout-info" },
            { x: t, y: ex, className: "fill-callout-warning" },
          ]}
        />
      );
      if (has("tau")) {
        push("tau", `\\tau = \\frac{L}{R} = \\frac{${sigText(Lm)}\\times 10^{-3}\\ \\text{H}}{${sigText(R)}\\ \\Omega} = ${sciLatex(tau / 1000)}\\ \\text{s}`, `= ${sigText(tau)} ms`);
      }
      if (has("instant")) {
        push("x", `t = ${sigText(t)}\\ \\text{ms} = ${sigText(x)}\\,\\tau`);
        push("i", `i = ${sciLatex(i)}\\ \\text{A}\\ (${sigText((i / I0) * 100)}\\%\\ \\text{of}\\ ${sciLatex(I0)}\\ \\text{A})`);
        push("vl", `\\lvert V_L\\rvert = \\left\\lvert L\\frac{di}{dt}\\right\\rvert = ${sciLatex(vl)}\\ \\text{V}`, charging ? "biggest at the switch-on instant" : undefined);
      }
      if (has("energy")) push("U", `U = \\tfrac12 L i^2 = ${sciLatex(0.5 * Lh * i * i)}\\ \\text{J}`);
    }
  } else if (mode === "ac-element") {
    const el = config.element;
    const Z = el === "R" ? R : el === "L" ? XL : XC;
    const phiI = el === "R" ? 0 : el === "L" ? -90 : 90; // current phase relative to voltage
    const I0 = V0 / Z;
    const Iref = (() => {
      const w0 = 2 * Math.PI * config.frequency.initial;
      const z0 =
        el === "R"
          ? config.resistance.initial
          : el === "L"
            ? w0 * config.inductance.initial * 1e-3
            : 1 / (w0 * config.capacitance.initial * 1e-6);
      return V0 / z0;
    })();
    const iRel = I0 / Iref;
    headline =
      el === "R"
        ? `v = V_0\\sin\\omega t,\\quad i = \\frac{V_0}{R}\\sin\\omega t`
        : el === "L"
          ? `v = V_0\\sin\\omega t,\\quad i = \\frac{V_0}{\\omega L}\\sin\\!\\left(\\omega t - \\frac{\\pi}{2}\\right)`
          : `v = V_0\\sin\\omega t,\\quad i = \\frac{V_0}{1/\\omega C}\\sin\\!\\left(\\omega t + \\frac{\\pi}{2}\\right)`;
    legend = [
      { cls: "bg-callout-tip", text: `v / V₀ (V₀ = ${sigText(V0)} V)` },
      { cls: "bg-callout-info", text: `i (1 unit = ${sigText(Iref)} A)` },
    ];
    visual = (
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        {config.showWaveforms && (
          <Plot
            x0={0}
            x1={2 * T}
            y0={-2}
            y1={2}
            xLabel="t (ms)"
            yLabel="v, i"
            curves={[
              { fn: (tt: number) => Math.sin(2 * Math.PI * (tt / T)), className: "stroke-callout-tip" },
              { fn: (tt: number) => iRel * Math.sin(2 * Math.PI * (tt / T) + phiI * DEG), className: "stroke-callout-info" },
            ]}
            vlines={[{ x: tNow, className: "stroke-foreground/60" }]}
            points={[
              { x: tNow, y: Math.sin(wt * DEG), className: "fill-callout-tip" },
              { x: tNow, y: iRel * Math.sin((wt + phiI) * DEG), className: "fill-callout-info" },
            ]}
          />
        )}
        {config.showPhasors && (
          <PhasorDiagram
            maxMag={Math.max(1, iRel)}
            phasors={[
              { angleDeg: wt, mag: 1, color: "result", label: "V_0" },
              { angleDeg: wt + phiI, mag: iRel, color: "b", label: "I_0" },
            ]}
          />
        )}
      </div>
    );
    if (has("reactance")) {
      if (el === "R") push("X", `R = ${sigText(R)}\\ \\Omega`, "resistance does not depend on f");
      else if (el === "L") push("X", `X_L = \\omega L = 2\\pi(${sigText(f)})(${sigText(Lm)}\\times 10^{-3}) = ${sciLatex(XL)}\\ \\Omega`, "grows with f");
      else push("X", `X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi(${sigText(f)})(${sigText(Cu)}\\times 10^{-6})} = ${sciLatex(XC)}\\ \\Omega`, "shrinks as f grows");
    }
    if (has("impedance")) {
      push("I", `I_0 = \\frac{V_0}{${el === "R" ? "R" : el === "L" ? "X_L" : "X_C"}} = ${sciLatex(I0)}\\ \\text{A},\\quad I_{\\text{rms}} = \\frac{I_0}{\\sqrt 2} = ${sciLatex(I0 / Math.SQRT2)}\\ \\text{A}`);
    }
    if (has("phase")) {
      push(
        "phi",
        el === "R" ? `\\phi = 0^\\circ` : el === "L" ? `\\text{current lags voltage by } 90^\\circ` : `\\text{current leads voltage by } 90^\\circ`,
        el === "R" ? "in phase" : el === "L" ? "ELI: E before I in L" : "ICE: I before E in C",
      );
    }
    if (has("power")) {
      const P = el === "R" ? (V0 / Math.SQRT2) * (I0 / Math.SQRT2) : 0;
      push("P", `P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi = ${sciLatex(P)}\\ \\text{W}`, el === "R" ? undefined : "cos 90° = 0: energy sloshes back and forth");
    }
    push("wt", `\\omega t = ${sigText(wt)}^\\circ:\\ v = ${sciLatex(V0 * Math.sin(wt * DEG))}\\ \\text{V},\\ i = ${sciLatex(I0 * Math.sin((wt + phiI) * DEG))}\\ \\text{A}`);
  } else {
    // lcr and resonance
    const X = XL - XC;
    const Z = Math.hypot(R, X);
    const phi = Math.atan2(X, R) / DEG; // voltage leads current by phi
    const I0 = V0 / Z;
    const Irms = I0 / Math.SQRT2;
    const Vrms = V0 / Math.SQRT2;
    const Q = (1 / R) * Math.sqrt(Lh / Cf);
    const bw = R / (2 * Math.PI * Lh);
    if (mode === "lcr") {
      headline = `Z = \\sqrt{R^2 + (X_L - X_C)^2},\\quad \\tan\\phi = \\frac{X_L - X_C}{R}`;
      const VR = I0 * R;
      const VL = I0 * XL;
      const VC = I0 * XC;
      const thI = wt - phi;
      const iScale = V0 / R; // current at resonance: the largest possible
      legend = [
        { cls: "bg-callout-tip", text: `v / V₀ (V₀ = ${sigText(V0)} V)` },
        { cls: "bg-callout-info", text: `i / (V₀/R)` },
      ];
      const rTip: [number, number] = [VR * Math.cos(thI * DEG), VR * Math.sin(thI * DEG)];
      visual = (
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          {config.showWaveforms && (
            <Plot
              x0={0}
              x1={2 * T}
              y0={-1.2}
              y1={1.2}
              xLabel="t (ms)"
              yLabel="v, i"
              curves={[
                { fn: (tt: number) => Math.sin(2 * Math.PI * (tt / T)), className: "stroke-callout-tip" },
                { fn: (tt: number) => (I0 / iScale) * Math.sin(2 * Math.PI * (tt / T) - phi * DEG), className: "stroke-callout-info" },
              ]}
              vlines={[{ x: tNow, className: "stroke-foreground/60" }]}
              points={[
                { x: tNow, y: Math.sin(wt * DEG), className: "fill-callout-tip" },
                { x: tNow, y: (I0 / iScale) * Math.sin((wt - phi) * DEG), className: "fill-callout-info" },
              ]}
            />
          )}
          {config.showPhasors && (
            <PhasorDiagram
              maxMag={Math.max(V0, VR, VL, VC)}
              phasors={[
                { angleDeg: thI, mag: VR, color: "a", label: "V_R" },
                { angleDeg: thI + 90, mag: VL, color: "aux", label: "V_L" },
                { angleDeg: thI - 90, mag: VC, color: "c", label: "V_C" },
                { angleDeg: X >= 0 ? thI + 90 : thI - 90, mag: Math.abs(VL - VC), color: "muted", label: "", from: rTip, dashed: true },
                { angleDeg: wt, mag: V0, color: "result", label: "V_0" },
              ]}
            />
          )}
        </div>
      );
    } else {
      headline = `I_{\\text{rms}}(f) = \\frac{V_{\\text{rms}}}{\\sqrt{R^2 + \\left(2\\pi f L - \\frac{1}{2\\pi f C}\\right)^2}}`;
      const irmsAt = (ff: number, r: number) => {
        const ww = 2 * Math.PI * ff;
        return Vrms / Math.hypot(r, ww * Lh - 1 / (ww * Cf));
      };
      const yMax = (1.1 * Vrms) / config.resistance.min;
      const peak = Vrms / R;
      const w0 = 2 * Math.PI * f0;
      const g = R / (2 * Lh);
      const f1 = (-g + Math.sqrt(g * g + w0 * w0)) / (2 * Math.PI);
      const f2 = (g + Math.sqrt(g * g + w0 * w0)) / (2 * Math.PI);
      legend = [
        { cls: "bg-callout-info", text: `I_rms, R = ${sigText(R)} Ω` },
        ...(config.showGhost ? [{ cls: "bg-muted-foreground/50", text: `starting R = ${sigText(config.resistance.initial)} Ω` }] : []),
      ];
      visual = (
        <Plot
          x0={config.frequency.min}
          x1={config.frequency.max}
          y0={0}
          y1={yMax}
          xLabel="f (Hz)"
          yLabel="I_rms (A)"
          curves={[
            ...(config.showGhost
              ? [{ fn: (ff: number) => irmsAt(ff, config.resistance.initial), className: "stroke-muted-foreground/50", dashed: true }]
              : []),
            { fn: (ff: number) => irmsAt(ff, R), className: "stroke-callout-info" },
          ]}
          vlines={[
            { x: f0, label: "f₀" },
            { x: f1, className: "stroke-callout-warning/70" },
            { x: f2, className: "stroke-callout-warning/70" },
          ]}
          hlines={[{ y: peak / Math.SQRT2, className: "stroke-callout-warning/70" }]}
          points={[{ x: f, y: irmsAt(f, R), className: "fill-callout-tip" }]}
        />
      );
      if (has("quality")) {
        push("bw", `\\Delta f = f_2 - f_1 = \\frac{R}{2\\pi L} = ${sciLatex(bw)}\\ \\text{Hz}`, "between the half-power points (orange)");
        push("Q", `Q = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = ${sciLatex(Q)}`, "higher Q = sharper peak");
      }
    }
    if (has("reactance")) {
      push("XL", `X_L = \\omega L = ${sciLatex(XL)}\\ \\Omega,\\quad X_C = \\frac{1}{\\omega C} = ${sciLatex(XC)}\\ \\Omega`);
    }
    if (has("impedance")) {
      push("Z", `Z = \\sqrt{(${sigText(R)})^2 + (${sciLatex(X)})^2} = ${sciLatex(Z)}\\ \\Omega`);
      push("I", `I_{\\text{rms}} = \\frac{V_{\\text{rms}}}{Z} = \\frac{${sciLatex(Vrms)}}{${sciLatex(Z)}} = ${sciLatex(Irms)}\\ \\text{A}`);
      if (mode === "lcr") {
        push(
          "Vs",
          `V_R = ${sciLatex(Irms * R)},\\ V_L = ${sciLatex(Irms * XL)},\\ V_C = ${sciLatex(Irms * XC)}\\ \\text{V (rms)}`,
          "they add as phasors, not as numbers",
        );
      }
    }
    if (has("phase")) {
      const kind = Math.abs(X) < 1e-9 * Math.max(1, Z) ? "at resonance: in phase" : X > 0 ? "inductive: current lags" : "capacitive: current leads";
      push("phi", `\\phi = \\tan^{-1}\\frac{X_L - X_C}{R} = ${sigText(phi)}^\\circ`, kind);
    }
    if (has("power")) {
      const pf = R / Z;
      push("P", `\\cos\\phi = \\frac{R}{Z} = ${sigText(pf)},\\quad P = V_{\\text{rms}} I_{\\text{rms}}\\cos\\phi = I_{\\text{rms}}^2 R = ${sciLatex(Irms * Irms * R)}\\ \\text{W}`);
    }
    if (has("resonance")) {
      push("f0", `f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = ${sciLatex(f0)}\\ \\text{Hz}`, f < f0 ? "f below f₀: X_C wins" : f > f0 ? "f above f₀: X_L wins" : "at resonance");
    }
    if (mode === "lcr" && has("quality")) {
      push("Q", `Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = ${sciLatex(Q)}`);
    }
  }

  const sliderDefs: Record<SliderName, { label: string; value: number; set: (v: number) => void; range: Config["resistance"]; unit: string }> = {
    R: { label: "R", value: R, set: setR, range: config.resistance, unit: "Ω" },
    L: { label: "L", value: Lm, set: setL, range: config.inductance, unit: "mH" },
    C: { label: "C", value: Cu, set: setC, range: config.capacitance, unit: "μF" },
    f: { label: "f", value: f, set: setF, range: config.frequency, unit: "Hz" },
  };

  const title =
    mode === "rc"
      ? "RC circuit"
      : mode === "lr"
        ? "LR circuit"
        : mode === "ac-element"
          ? `AC through ${config.element === "R" ? "a resistor" : config.element === "L" ? "an inductor" : "a capacitor"}`
          : mode === "lcr"
            ? "Series LCR circuit"
            : "Resonance";

  return (
    <InteractiveFrame title={title}>
      <div className="overflow-x-auto text-center">
        <Latex latex={headline} display />
      </div>
      {visual}
      {legend.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {legend.map((l) => (
            <span key={l.text} className="flex items-center gap-1.5">
              <span className={`inline-block h-0.5 w-4 ${l.cls}`} />
              {l.text}
            </span>
          ))}
        </div>
      )}
      <div className="space-y-2">
        {sliders.map((s) => {
          const d = sliderDefs[s];
          return (
            <SliderRow
              key={s}
              label={<Latex latex={d.label} />}
              value={d.value}
              min={d.range.min}
              max={d.range.max}
              step={d.range.step}
              unit={d.unit}
              onChange={d.set}
            />
          );
        })}
        {transient && (
          <SliderRow label={<Latex latex="t" />} value={t} min={0} max={tMax} step={tStep} unit="ms" onChange={(v) => setT(Number(v.toPrecision(10)))} />
        )}
        {(mode === "ac-element" || mode === "lcr") && (
          <SliderRow label={<Latex latex="\omega t" />} value={wt} min={0} max={720} step={5} unit="°" onChange={setWt} />
        )}
      </div>
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
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {config.caption ?? DEFAULT_CAPTIONS[mode]}
          {mode === "rc" || mode === "lr" ? ` Source ℰ = ${sigText(E)} V.` : ` Source peak V₀ = ${sigText(V0)} V.`}
        </p>
        <button type="button" onClick={reset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
          Reset
        </button>
      </div>
    </InteractiveFrame>
  );
}
