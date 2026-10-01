"use client";

import { useId, useState } from "react";
import type { z } from "zod";
import type { owtThermoLabSchema } from "../../schemas/blocks";
import {
  ArrowMarker,
  PlayButton,
  Readouts,
  ToggleGroup,
  clamp,
  fmt,
  niceCeil,
  niceStep,
  sci,
  signed,
  spanRange,
  tidy,
  useClock,
  type Range,
} from "./owt-common";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof owtThermoLabSchema>;
type Key = NonNullable<Config["sliders"]>[number];
type Params = Record<Key, number>;
type Gas = Config["gas"];
type ProcessKind = Config["process"];

const R = 8.314;
const KB = 1.380649e-23;
const W = 480;

const LABEL: Record<Key, [string, string]> = {
  finalVolume: ["V_B", "L"],
  finalPressure: ["p_B", "kPa"],
  polytropicN: ["n", ""],
  coldTemperature: ["T_C", "K"],
  compressionRatio: ["r", ""],
  pressureRatio: ["p_3/p_2", ""],
  temperature: ["T", "K"],
  volume: ["V", "L"],
};

const PROCESS_NAME: Record<ProcessKind, string> = {
  isothermal: "isothermal",
  isobaric: "isobaric",
  isochoric: "isochoric",
  adiabatic: "adiabatic",
  polytropic: "polytropic",
};

type State = { p: number; v: number };
type Segment = { kind: ProcessKind; from: State; to: State; n?: number; label?: string };

function gamma(gas: Gas): number {
  return gas === "monatomic" ? 5 / 3 : 7 / 5;
}
/** Cv / R. */
function cvR(gas: Gas): number {
  return gas === "monatomic" ? 1.5 : 2.5;
}

/** Exponent e in pV^e = const for a process. */
function exponent(seg: Segment, gas: Gas): number {
  switch (seg.kind) {
    case "isothermal":
      return 1;
    case "isobaric":
      return 0;
    case "adiabatic":
      return gamma(gas);
    case "polytropic":
      return seg.n ?? 1.5;
    case "isochoric":
      return Infinity;
  }
}

/** p at volume V along a process through state s with exponent e. */
function pAlong(s: State, e: number, v: number): number {
  return s.p * (s.v / v) ** e;
}

/** W by the gas, ΔU and Q (J, since kPa·L = J). */
function energetics(seg: Segment, gas: Gas) {
  const { from: a, to: b } = seg;
  const dU = cvR(gas) * (b.p * b.v - a.p * a.v);
  let work: number;
  if (seg.kind === "isochoric") work = 0;
  else {
    const e = exponent(seg, gas);
    if (Math.abs(e) < 1e-12) work = a.p * (b.v - a.v);
    else if (Math.abs(e - 1) < 1e-9) work = a.p * a.v * Math.log(b.v / a.v);
    else work = (a.p * a.v - b.p * b.v) / (e - 1);
  }
  return { W: work, dU, Q: dU + work };
}

function segmentPoints(seg: Segment, gas: Gas, n = 80): State[] {
  if (seg.kind === "isochoric" || Math.abs(seg.from.v - seg.to.v) < 1e-12) return [seg.from, seg.to];
  const e = exponent(seg, gas);
  const out: State[] = [];
  for (let i = 0; i <= n; i++) {
    const v = seg.from.v + ((seg.to.v - seg.from.v) * i) / n;
    out.push({ v, p: pAlong(seg.from, e, v) });
  }
  return out;
}

function temperatureOf(s: State, moles: number): number {
  return (s.p * s.v) / (moles * R);
}

function endState(kind: ProcessKind, a: State, gas: Gas, par: Params): State {
  switch (kind) {
    case "isochoric":
      return { v: a.v, p: par.finalPressure };
    case "isobaric":
      return { v: par.finalVolume, p: a.p };
    case "isothermal":
      return { v: par.finalVolume, p: pAlong(a, 1, par.finalVolume) };
    case "adiabatic":
      return { v: par.finalVolume, p: pAlong(a, gamma(gas), par.finalVolume) };
    case "polytropic":
      return { v: par.finalVolume, p: pAlong(a, par.polytropicN, par.finalVolume) };
  }
}

function buildCycle(cfg: Config, gas: Gas, par: Params): Segment[] {
  const A = { p: cfg.initial.p, v: cfg.initial.v };
  const g = gamma(gas);
  if (cfg.cycle === "rectangle") {
    const v2 = Math.max(par.finalVolume, A.v * 1.01);
    const p2 = Math.max(par.finalPressure, A.p * 1.01);
    const s1 = A;
    const s2 = { v: A.v, p: p2 };
    const s3 = { v: v2, p: p2 };
    const s4 = { v: v2, p: A.p };
    return [
      { kind: "isochoric", from: s1, to: s2, label: "1→2" },
      { kind: "isobaric", from: s2, to: s3, label: "2→3" },
      { kind: "isochoric", from: s3, to: s4, label: "3→4" },
      { kind: "isobaric", from: s4, to: s1, label: "4→1" },
    ];
  }
  if (cfg.cycle === "carnot") {
    const TH = temperatureOf(A, cfg.moles);
    const TC = Math.min(par.coldTemperature, 0.98 * TH);
    const ratio = (TH / TC) ** (1 / (g - 1));
    const VB = Math.max(par.finalVolume, A.v * 1.01);
    const B = { v: VB, p: pAlong(A, 1, VB) };
    const C = { v: VB * ratio, p: pAlong(B, g, VB * ratio) };
    const D = { v: A.v * ratio, p: pAlong(A, g, A.v * ratio) };
    return [
      { kind: "isothermal", from: A, to: B, label: "A→B" },
      { kind: "adiabatic", from: B, to: C, label: "B→C" },
      { kind: "isothermal", from: C, to: D, label: "C→D" },
      { kind: "adiabatic", from: D, to: A, label: "D→A" },
    ];
  }
  // Otto: 1 → 2 adiabatic compression, 2 → 3 isochoric heating, 3 → 4 adiabatic expansion, 4 → 1 isochoric cooling.
  const r = par.compressionRatio;
  const s1 = A;
  const s2 = { v: A.v / r, p: A.p * r ** g };
  const s3 = { v: s2.v, p: s2.p * par.pressureRatio };
  const s4 = { v: A.v, p: s3.p * r ** -g };
  return [
    { kind: "adiabatic", from: s1, to: s2, label: "1→2" },
    { kind: "isochoric", from: s2, to: s3, label: "2→3" },
    { kind: "adiabatic", from: s3, to: s4, label: "3→4" },
    { kind: "isochoric", from: s4, to: s1, label: "4→1" },
  ];
}

// ---------- p–V diagram ----------

type Shade = { points: State[]; className: string };

function PVDiagram({
  segments,
  gas,
  labels,
  shades,
  isotherms,
  moles,
  vMax,
  pMax,
}: {
  segments: { seg: Segment; className: string }[];
  gas: Gas;
  labels: { s: State; text: string }[];
  shades: Shade[];
  isotherms: number[];
  moles: number;
  vMax: number;
  pMax: number;
}) {
  const H = 300;
  const L = 52;
  const B = 34;
  const T = 12;
  const RT = 16;
  const sx = (v: number) => L + (v / vMax) * (W - L - RT);
  const sy = (p: number) => H - B - (p / pMax) * (H - B - T);
  const markerId = useId().replace(/:/g, "");
  const vStep = niceStep(vMax / 5);
  const pStep = niceStep(pMax / 5);
  const vTicks: number[] = [];
  for (let v = vStep; v <= vMax + 1e-9; v += vStep) vTicks.push(tidy(v));
  const pTicks: number[] = [];
  for (let p = pStep; p <= pMax + 1e-9; p += pStep) pTicks.push(tidy(p));
  const poly = (pts: State[]) => pts.map((s) => `${sx(s.v).toFixed(2)},${sy(s.p).toFixed(2)}`).join(" ");
  const path = (pts: State[]) => pts.map((s, i) => `${i ? "L" : "M"} ${sx(s.v).toFixed(2)} ${sy(s.p).toFixed(2)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img">
      <defs>
        <ArrowMarker id={`${markerId}a`} className="fill-plot" />
      </defs>
      {vTicks.map((v) => (
        <g key={`v${v}`}>
          <line x1={sx(v)} y1={T} x2={sx(v)} y2={H - B} className="stroke-border" strokeWidth={0.5} />
          <text x={sx(v)} y={H - B + 12} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {v}
          </text>
        </g>
      ))}
      {pTicks.map((p) => (
        <g key={`p${p}`}>
          <line x1={L} y1={sy(p)} x2={W - RT} y2={sy(p)} className="stroke-border" strokeWidth={0.5} />
          <text x={L - 4} y={sy(p) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
            {p}
          </text>
        </g>
      ))}
      <line x1={L} y1={H - B} x2={W - RT} y2={H - B} className="stroke-foreground/60" />
      <line x1={L} y1={T} x2={L} y2={H - B} className="stroke-foreground/60" />
      <text x={W - RT} y={H - 6} textAnchor="end" className="fill-muted-foreground text-[10px]">
        V (L)
      </text>
      <text x={6} y={T + 8} className="fill-muted-foreground text-[10px]">
        p (kPa)
      </text>
      {isotherms.map((Tk) => {
        const c = moles * R * Tk;
        const vStart = Math.max(c / pMax, vMax / 400);
        const pts: State[] = [];
        for (let i = 0; i <= 80; i++) {
          const v = vStart + ((vMax - vStart) * i) / 80;
          pts.push({ v, p: c / v });
        }
        const end = pts[pts.length - 1];
        return (
          <g key={`iso${Tk}`}>
            <path d={path(pts)} fill="none" className="stroke-muted-foreground/35" strokeDasharray="3 4" />
            <text x={sx(end.v) - 2} y={sy(end.p) - 4} textAnchor="end" className="fill-muted-foreground text-[8px]">
              {`${fmt(Tk, 0)} K`}
            </text>
          </g>
        );
      })}
      {shades.map((s, i) => (
        <polygon key={i} points={poly(s.points)} className={s.className} stroke="none" />
      ))}
      {segments.map(({ seg, className }, i) => {
        const pts = segmentPoints(seg, gas);
        const m = Math.floor(pts.length / 2);
        const a = pts.length > 2 ? pts[m - 1] : { v: seg.from.v + (seg.to.v - seg.from.v) * 0.4, p: seg.from.p + (seg.to.p - seg.from.p) * 0.4 };
        const b = pts.length > 2 ? pts[m + 1] : { v: seg.from.v + (seg.to.v - seg.from.v) * 0.6, p: seg.from.p + (seg.to.p - seg.from.p) * 0.6 };
        return (
          <g key={i}>
            <path d={path(pts)} fill="none" className={className} strokeWidth={2.2} />
            <line
              x1={sx(a.v)}
              y1={sy(a.p)}
              x2={sx(b.v)}
              y2={sy(b.p)}
              className={className}
              strokeWidth={2.2}
              markerEnd={`url(#${markerId}a)`}
            />
          </g>
        );
      })}
      {labels.map((l) => (
        <g key={l.text}>
          <circle cx={sx(l.s.v)} cy={sy(l.s.p)} r={4} className="fill-foreground" />
          <text x={sx(l.s.v) + 6} y={sy(l.s.p) - 6} className="fill-foreground text-[10px] font-medium">
            {l.text}
          </text>
        </g>
      ))}
    </svg>
  );
}

function underCurve(pts: State[]): State[] {
  const first = pts[0];
  const last = pts[pts.length - 1];
  return [...pts, { v: last.v, p: 0 }, { v: first.v, p: 0 }];
}

// ---------- main ----------

function defaultRange(cfg: Config, key: Key): Range {
  const { p: pA, v: vA } = cfg.initial;
  const TA = (pA * vA) / (cfg.moles * R);
  const cyc = cfg.mode === "cycle";
  switch (key) {
    case "finalVolume":
      return cyc ? spanRange(vA * 1.2, vA * 4) : spanRange(vA / 4, vA * 3);
    case "finalPressure":
      return cyc ? spanRange(pA * 1.2, pA * 4) : spanRange(pA / 4, pA * 3);
    case "polytropicN":
      return { min: -1, max: 3, step: 0.1 };
    case "coldTemperature":
      return spanRange(TA * 0.1, TA * 0.9);
    case "compressionRatio":
      return { min: 1.5, max: 12, step: 0.5 };
    case "pressureRatio":
      return { min: 1.2, max: 5, step: 0.1 };
    case "temperature":
      return { min: 50, max: 1200, step: 10 };
    case "volume":
      return spanRange(cfg.volume / 2, cfg.volume * 2);
  }
}

export function OwtThermoLab({ config }: { config: Config }) {
  const { p: pA, v: vA } = config.initial;
  const TA = (pA * vA) / (config.moles * R);
  const keys: Key[] = [
    "finalVolume",
    "finalPressure",
    "polytropicN",
    "coldTemperature",
    "compressionRatio",
    "pressureRatio",
    "temperature",
    "volume",
  ];
  const ranges = Object.fromEntries(keys.map((k) => [k, config.ranges?.[k] ?? defaultRange(config, k)])) as Record<Key, Range>;
  const [par, setPar] = useState<Params>(() => {
    const raw: Params = {
      finalVolume: config.finalVolume ?? 2 * vA,
      finalPressure: config.finalPressure ?? 2 * pA,
      polytropicN: config.polytropicN,
      coldTemperature: config.coldTemperature ?? TA / 2,
      compressionRatio: config.compressionRatio,
      pressureRatio: config.pressureRatio,
      temperature: config.temperature,
      volume: config.volume,
    };
    for (const k of keys) raw[k] = clamp(raw[k], ranges[k].min, ranges[k].max);
    return raw;
  });
  const [gas, setGas] = useState<Gas>(config.gas);
  const [proc, setProc] = useState<ProcessKind>(config.process);

  let sliderKeys: Key[];
  if (config.mode === "process") {
    const endKey: Key = proc === "isochoric" ? "finalPressure" : "finalVolume";
    const extra = (config.sliders ?? (proc === "polytropic" ? ["polytropicN"] : [])).filter(
      (k) => k !== "finalVolume" && k !== "finalPressure",
    );
    sliderKeys = [endKey, ...extra];
  } else if (config.mode === "compare") sliderKeys = config.sliders ?? ["finalVolume"];
  else if (config.mode === "cycle")
    sliderKeys =
      config.sliders ??
      (config.cycle === "rectangle"
        ? ["finalVolume", "finalPressure"]
        : config.cycle === "carnot"
          ? ["finalVolume", "coldTemperature"]
          : ["compressionRatio", "pressureRatio"]);
  else sliderKeys = config.sliders ?? ["temperature", "volume"];

  const sliders = (
    <div className="space-y-2">
      {sliderKeys.map((k) => (
        <SliderRow
          key={k}
          label={<Latex latex={LABEL[k][0]} />}
          value={Number(par[k].toFixed(3))}
          min={ranges[k].min}
          max={ranges[k].max}
          step={ranges[k].step}
          onChange={(v) => setPar((prev) => ({ ...prev, [k]: tidy(v) }))}
          unit={LABEL[k][1]}
        />
      ))}
    </div>
  );

  const gasToggle = config.gasToggle && (
    <ToggleGroup
      label="Gas"
      options={[
        { value: "monatomic", label: "monatomic (γ = 5/3)" },
        { value: "diatomic", label: "diatomic (γ = 7/5)" },
      ]}
      value={gas}
      onChange={setGas}
    />
  );

  if (config.mode === "kinetic") {
    return <KineticView config={config} gas={gas} par={par} ranges={ranges} sliders={sliders} gasToggle={gasToggle} />;
  }

  const A: State = { p: pA, v: vA };

  if (config.mode === "process") {
    const B = endState(proc, A, gas, par);
    const seg: Segment = { kind: proc, from: A, to: B, n: par.polytropicN };
    const e = energetics(seg, gas);
    // Stable window: include the end state at both ends of the slider range.
    const endKey: Key = proc === "isochoric" ? "finalPressure" : "finalVolume";
    const extremes = [ranges[endKey].min, ranges[endKey].max].map((x) => endState(proc, A, gas, { ...par, [endKey]: x }));
    const all = [A, B, ...extremes, ...segmentPoints(seg, gas, 20)];
    const vMax = niceCeil(Math.max(...all.map((s) => s.v)) * 1.1);
    const pMax = niceCeil(Math.min(Math.max(...all.map((s) => s.p)), 8 * Math.max(A.p, B.p)) * 1.15);
    const TB = temperatureOf(B, config.moles);
    const wTex: Record<ProcessKind, string> = {
      isothermal: "W = nRT\\ln\\frac{V_B}{V_A}",
      isobaric: "W = p\\,(V_B - V_A)",
      isochoric: "W = 0",
      adiabatic: "W = \\frac{p_AV_A - p_BV_B}{\\gamma - 1}",
      polytropic: "W = \\frac{p_AV_A - p_BV_B}{n - 1}",
    };
    const rows: [string, string][] = [
      ["T_A", `${fmt(TA, 1)}\\ \\text{K}`],
      ["T_B", `${fmt(TB, 1)}\\ \\text{K}`],
      ["p_B", `${fmt(B.p, 2)}\\ \\text{kPa}`],
      ["V_B", `${fmt(B.v, 2)}\\ \\text{L}`],
      [wTex[proc], `${signed(e.W)}\\ \\text{J}`],
      ["\\Delta U = nC_V\\Delta T", `${signed(e.dU)}\\ \\text{J}`],
      ["Q = \\Delta U + W", `${signed(e.Q)}\\ \\text{J}`],
    ];
    if (proc === "polytropic" && Math.abs(par.polytropicN - 1) > 1e-9) {
      rows.push(["C = C_V + \\frac{R}{1 - n}", `${fmt((cvR(gas) + 1 / (1 - par.polytropicN)) * R, 2)}\\ \\text{J/(mol K)}`]);
    }
    return (
      <InteractiveFrame title={`${PROCESS_NAME[proc]} process`}>
        <PVDiagram
          segments={[{ seg, className: "stroke-plot" }]}
          gas={gas}
          labels={[
            { s: A, text: "A" },
            { s: B, text: "B" },
          ]}
          shades={
            proc === "isochoric"
              ? []
              : [{ points: underCurve(segmentPoints(seg, gas)), className: e.W >= 0 ? "fill-plot/15" : "fill-callout-warning/20" }]
          }
          isotherms={config.showIsotherms ? uniqueTemps([TA, TB]) : []}
          moles={config.moles}
          vMax={vMax}
          pMax={pMax}
        />
        {config.processToggle && (
          <ToggleGroup
            label="Process"
            options={(Object.keys(PROCESS_NAME) as ProcessKind[]).map((k) => ({ value: k, label: PROCESS_NAME[k] }))}
            value={proc}
            onChange={setProc}
          />
        )}
        {gasToggle}
        {sliders}
        <Readouts rows={rows} />
        <p className="text-center text-xs text-muted-foreground">
          {config.caption ??
            "Shaded area = work done by the gas (blue when it expands, orange when it is compressed). Sign convention: ΔU = Q − W, with W done by the gas."}
        </p>
      </InteractiveFrame>
    );
  }

  if (config.mode === "compare") {
    const g = gamma(gas);
    const Bi: State = { v: par.finalVolume, p: pAlong(A, 1, par.finalVolume) };
    const Ba: State = { v: par.finalVolume, p: pAlong(A, g, par.finalVolume) };
    const iso: Segment = { kind: "isothermal", from: A, to: Bi };
    const adi: Segment = { kind: "adiabatic", from: A, to: Ba };
    const ei = energetics(iso, gas);
    const ea = energetics(adi, gas);
    const lo = ranges.finalVolume.min;
    const hi = ranges.finalVolume.max;
    const vMax = niceCeil(Math.max(hi, vA) * 1.1);
    const pMax = niceCeil(Math.max(pA, pAlong(A, g, lo), pAlong(A, 1, lo)) * 1.1);
    const rows: [string, string][] = [
      ["p_B\\ (\\text{isothermal})", `${fmt(Bi.p, 2)}\\ \\text{kPa}`],
      ["p_B\\ (\\text{adiabatic})", `${fmt(Ba.p, 2)}\\ \\text{kPa}`],
      ["T_B\\ (\\text{isothermal})", `${fmt(TA, 1)}\\ \\text{K}`],
      ["T_B\\ (\\text{adiabatic})", `${fmt(temperatureOf(Ba, config.moles), 1)}\\ \\text{K}`],
      ["W_{\\text{iso}}", `${signed(ei.W)}\\ \\text{J}`],
      ["W_{\\text{adi}}", `${signed(ea.W)}\\ \\text{J}`],
      ["\\text{slope at A: } \\frac{(dp/dV)_{\\text{adi}}}{(dp/dV)_{\\text{iso}}} = \\gamma", fmt(g, 3)],
    ];
    return (
      <InteractiveFrame title="Isothermal vs adiabatic">
        <PVDiagram
          segments={[
            { seg: iso, className: "stroke-plot" },
            { seg: adi, className: "stroke-callout-warning" },
          ]}
          gas={gas}
          labels={[
            { s: A, text: "A" },
            { s: Bi, text: "B (iso)" },
            { s: Ba, text: "B (adi)" },
          ]}
          shades={[
            { points: underCurve(segmentPoints(iso, gas)), className: "fill-plot/10" },
            { points: underCurve(segmentPoints(adi, gas)), className: "fill-callout-warning/15" },
          ]}
          isotherms={config.showIsotherms ? uniqueTemps([TA, temperatureOf(Ba, config.moles)]) : []}
          moles={config.moles}
          vMax={vMax}
          pMax={pMax}
        />
        {gasToggle}
        {sliders}
        <Readouts rows={rows} />
        <p className="text-center text-xs text-muted-foreground">
          {config.caption ??
            "Blue: isothermal (pV = const). Orange: adiabatic (pV^γ = const), always steeper through the same point by the factor γ."}
        </p>
      </InteractiveFrame>
    );
  }

  // cycle
  const segs = buildCycle(config, gas, par);
  const legs = segs.map((s) => ({ seg: s, ...energetics(s, gas) }));
  const netW = legs.reduce((acc, l) => acc + l.W, 0);
  const qIn = legs.reduce((acc, l) => acc + Math.max(0, l.Q), 0);
  const qOut = legs.reduce((acc, l) => acc + Math.min(0, l.Q), 0);
  const eta = qIn > 0 ? netW / qIn : NaN;
  const outline = segs.flatMap((s) => segmentPoints(s, gas));
  const vMax = niceCeil(Math.max(...outline.map((s) => s.v)) * 1.1);
  const pMax = niceCeil(Math.max(...outline.map((s) => s.p)) * 1.1);
  const names = config.cycle === "carnot" ? ["A", "B", "C", "D"] : ["1", "2", "3", "4"];
  const temps = segs.map((s) => temperatureOf(s.from, config.moles));
  const g = gamma(gas);
  const theory =
    config.cycle === "carnot"
      ? ["\\eta_{\\text{Carnot}} = 1 - T_C/T_H", fmt(1 - temps[2] / temps[0], 4)]
      : config.cycle === "otto"
        ? ["\\eta_{\\text{Otto}} = 1 - r^{1-\\gamma}", fmt(1 - par.compressionRatio ** (1 - g), 4)]
        : null;
  const rows: [string, string][] = [
    ["W_{\\text{net}} = \\oint p\\,dV", `${signed(netW)}\\ \\text{J}`],
    ["Q_{\\text{in}}", `${fmt(qIn, 1)}\\ \\text{J}`],
    ["Q_{\\text{out}}", `${fmt(qOut, 1)}\\ \\text{J}`],
    ["\\eta = W_{\\text{net}}/Q_{\\text{in}}", Number.isFinite(eta) ? fmt(eta, 4) : "—"],
  ];
  if (theory) rows.push(theory as [string, string]);

  return (
    <InteractiveFrame title={`${config.cycle === "rectangle" ? "Rectangular" : config.cycle === "carnot" ? "Carnot" : "Otto"} cycle`}>
      <PVDiagram
        segments={segs.map((s) => ({ seg: s, className: "stroke-plot" }))}
        gas={gas}
        labels={segs.map((s, i) => ({ s: s.from, text: `${names[i]} (${fmt(temps[i], 0)} K)` }))}
        shades={[{ points: outline, className: "fill-plot/15" }]}
        isotherms={config.showIsotherms && config.cycle !== "carnot" ? uniqueTemps(temps) : []}
        moles={config.moles}
        vMax={vMax}
        pMax={pMax}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm tabular-nums">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="py-1 pr-2 font-medium">Step</th>
              <th className="py-1 pr-2 font-medium">Process</th>
              <th className="py-1 pr-2 text-right font-medium">Q (J)</th>
              <th className="py-1 pr-2 text-right font-medium">W (J)</th>
              <th className="py-1 text-right font-medium">ΔU (J)</th>
            </tr>
          </thead>
          <tbody>
            {legs.map((l, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-1 pr-2">{`${names[i]}→${names[(i + 1) % 4]}`}</td>
                <td className="py-1 pr-2">{PROCESS_NAME[l.seg.kind]}</td>
                <td className="py-1 pr-2 text-right">{signed(l.Q)}</td>
                <td className="py-1 pr-2 text-right">{signed(l.W)}</td>
                <td className="py-1 text-right">{signed(l.dU)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {gasToggle}
      {sliders}
      <Readouts rows={rows} />
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "Clockwise loop: the enclosed area is the net work done by the gas per cycle. Over a full cycle ΔU = 0, so W_net = Q_in + Q_out."}
      </p>
    </InteractiveFrame>
  );
}

function uniqueTemps(ts: number[]): number[] {
  const out: number[] = [];
  for (const t of ts) if (Number.isFinite(t) && t > 0 && !out.some((o) => Math.abs(o - t) < 0.5)) out.push(t);
  return out;
}

// ---------- kinetic theory ----------

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bounce u inside [0, len] (mirror images). */
function reflect(u: number, len: number): number {
  if (len <= 0) return 0;
  const m = ((u % (2 * len)) + 2 * len) % (2 * len);
  return m <= len ? m : 2 * len - m;
}

function KineticView({
  config,
  gas,
  par,
  ranges,
  sliders,
  gasToggle,
}: {
  config: Config;
  gas: Gas;
  par: Params;
  ranges: Record<Key, Range>;
  sliders: React.ReactNode;
  gasToggle: React.ReactNode;
}) {
  const clock = useClock({ max: 3600, rate: 1 });
  const [molecules] = useState(() => {
    const rnd = mulberry32(config.seed);
    return Array.from({ length: config.particles }, () => {
      const u = Math.max(rnd(), 1e-9);
      // 2D Maxwell (Rayleigh) speed with unit rms.
      const s = Math.sqrt(-Math.log(u));
      const ang = rnd() * 2 * Math.PI;
      return { x0: rnd(), y0: rnd(), s, cos: Math.cos(ang), sin: Math.sin(ang) };
    });
  });

  const T = par.temperature;
  const V = par.volume;
  const M = config.molarMass / 1000;
  const vrms = Math.sqrt((3 * R * T) / M);
  const vavg = Math.sqrt((8 * R * T) / (Math.PI * M));
  const vmp = Math.sqrt((2 * R * T) / M);
  const P = (config.moles * R * T) / V; // kPa, since V in L
  const f = gas === "monatomic" ? 3 : 5;
  const U = (f / 2) * config.moles * R * T;
  const keAvg = 1.5 * KB * T;

  const H = 220;
  const top = 20;
  const boxH = 180;
  const left = 20;
  const vMaxRange = Math.max(ranges.volume.max, V);
  const boxW = 60 + 360 * (V / vMaxRange);
  const rDot = 3.5;
  const pxPerSec = clamp(70 * (vrms / 1368), 3, 400);
  const t = clock.t;

  return (
    <InteractiveFrame title="Kinetic theory of gases">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img">
        <rect x={left} y={top} width={boxW} height={boxH} fill="none" className="stroke-foreground/70" strokeWidth={2} />
        <rect x={left + boxW} y={top - 6} width={8} height={boxH + 12} className="fill-muted-foreground/60" />
        <line x1={left + boxW + 8} y1={top + boxH / 2} x2={W - 10} y2={top + boxH / 2} className="stroke-muted-foreground/60" strokeWidth={3} />
        {molecules.map((m, i) => {
          const span = boxW - 2 * rDot;
          const spanY = boxH - 2 * rDot;
          const x = left + rDot + reflect(m.x0 * span + m.s * m.cos * pxPerSec * t, span);
          const y = top + rDot + reflect(m.y0 * spanY + m.s * m.sin * pxPerSec * t, spanY);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={rDot}
              className={m.s > 1.5 ? "fill-callout-warning" : "fill-plot"}
            />
          );
        })}
        <text x={left + 4} y={top - 6} className="fill-muted-foreground text-[9px]">
          {`V = ${fmt(V, 1)} L, T = ${fmt(T, 0)} K (orange: fastest molecules)`}
        </text>
      </svg>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">Molecule speeds scale as √(T/M).</span>
        <PlayButton playing={clock.playing} onClick={clock.toggle} />
      </div>
      {gasToggle}
      {sliders}
      <Readouts
        rows={[
          ["v_{\\text{rms}} = \\sqrt{3RT/M}", `${fmt(vrms, 0)}\\ \\text{m/s}`],
          ["v_{\\text{avg}} = \\sqrt{8RT/\\pi M}", `${fmt(vavg, 0)}\\ \\text{m/s}`],
          ["v_{\\text{mp}} = \\sqrt{2RT/M}", `${fmt(vmp, 0)}\\ \\text{m/s}`],
          ["\\overline{KE} = \\tfrac32 k_BT", `${sci(keAvg, 3)}\\ \\text{J}`],
          ["p = nRT/V", `${fmt(P, 2)}\\ \\text{kPa}`],
          [`U = \\tfrac{${f}}{2}nRT`, `${fmt(U, 1)}\\ \\text{J}`],
        ]}
      />
      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "Heat the gas and every molecule speeds up by √T; squeeze the box and the same molecules hit the walls more often, so the pressure rises."}
      </p>
    </InteractiveFrame>
  );
}
