"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import type { probDistributionExplorerSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof probDistributionExplorerSchema>;
type Mode = Config["mode"];
type ParamName = "n" | "p" | "lambda";
type Param = { name: ParamName; min: number; max: number; step: number; initial: number };
type Dist = { values: number[]; probs: number[] };

const DEFAULT_PARAMS: Record<Mode, Param[]> = {
  custom: [],
  binomial: [
    { name: "n", min: 1, max: 30, step: 1, initial: 10 },
    { name: "p", min: 0, max: 1, step: 0.01, initial: 0.5 },
  ],
  geometric: [{ name: "p", min: 0.05, max: 1, step: 0.01, initial: 0.3 }],
  poisson: [{ name: "lambda", min: 0.5, max: 10, step: 0.1, initial: 3 }],
  "binomial-vs-poisson": [
    { name: "n", min: 1, max: 100, step: 1, initial: 10 },
    { name: "lambda", min: 0.5, max: 10, step: 0.1, initial: 2 },
  ],
};

const PARAM_LATEX: Record<ParamName, string> = { n: "n", p: "p", lambda: "\\lambda" };

// ---------- maths ----------

function binom(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let v = 1;
  for (let k = 1; k <= Math.min(r, n - r); k++) v = (v * (n - k + 1)) / k;
  return Math.round(v);
}

function binomPmf(n: number, p: number): Dist {
  const values = Array.from({ length: n + 1 }, (_, k) => k);
  return { values, probs: values.map((k) => binom(n, k) * p ** k * (1 - p) ** (n - k)) };
}

function poissonPmf(lambda: number, maxK: number): Dist {
  const values = Array.from({ length: maxK + 1 }, (_, k) => k);
  const probs: number[] = [];
  let term = Math.exp(-lambda);
  for (let k = 0; k <= maxK; k++) {
    if (k > 0) term *= lambda / k;
    probs.push(term);
  }
  return { values, probs };
}

function geometricPmf(p: number, maxK: number): Dist {
  const values = Array.from({ length: maxK }, (_, i) => i + 1);
  return { values, probs: values.map((k) => (1 - p) ** (k - 1) * p) };
}

function moments(d: Dist) {
  const mean = d.values.reduce((s, x, i) => s + x * d.probs[i], 0);
  const ex2 = d.values.reduce((s, x, i) => s + x * x * d.probs[i], 0);
  return { mean, ex2, variance: ex2 - mean * mean };
}

function fmt(v: number, digits = 4) {
  if (!Number.isFinite(v)) return "\\infty";
  if (v !== 0 && Math.abs(v) < 0.0001) return Number(v.toPrecision(2)).toString();
  return Number(v.toFixed(digits)).toString();
}

function factorialLatex(k: number) {
  return `${k}!`;
}

// ---------- component ----------

const W = 400;
const H = 220;
const PADL = 36;
const PADR = 12;
const PADT = 16;
const PADB = 44;

export function ProbDistributionExplorer({ config }: { config: Config }) {
  const mode = config.mode;
  const params: Param[] = DEFAULT_PARAMS[mode].map((d) => config.params.find((p) => p.name === d.name) ?? d);
  const [vals, setVals] = useState<Record<string, number>>(() => Object.fromEntries(params.map((p) => [p.name, p.initial])));
  const [custom, setCustom] = useState<number[]>(() => config.probs ?? []);
  const [view, setView] = useState<"pmf" | "cdf">(config.showCdf ? config.initialView : "pmf");
  const [range, setRange] = useState(config.range ? { a: config.range.a, b: config.range.b } : null);
  const [selected, setSelected] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const n = Math.round(vals.n ?? 10);
  const p = vals.p ?? 0.5;
  const lambda = vals.lambda ?? 2;

  // ----- the distribution(s) -----
  let main: Dist;
  let overlay: Dist | null = null;
  let tail = 0;
  const autoMaxK =
    mode === "geometric"
      ? Math.min(40, Math.max(8, p >= 1 ? 8 : Math.ceil(Math.log(0.002) / Math.log(1 - p))))
      : Math.min(40, Math.ceil(lambda + 4 * Math.sqrt(lambda) + 4));
  const maxK = config.maxK ?? autoMaxK;
  const pOverlay = mode === "binomial-vs-poisson" ? Math.min(1, lambda / n) : 0;

  switch (mode) {
    case "custom":
      main = { values: config.values ?? [], probs: custom };
      break;
    case "binomial":
      main = binomPmf(n, p);
      break;
    case "geometric":
      main = geometricPmf(p, maxK);
      tail = (1 - p) ** maxK;
      break;
    case "poisson":
      main = poissonPmf(lambda, maxK);
      tail = 1 - main.probs.reduce((s, x) => s + x, 0);
      break;
    case "binomial-vs-poisson": {
      const b = binomPmf(n, pOverlay);
      const top = Math.min(n, maxK);
      main = { values: b.values.slice(0, top + 1), probs: b.probs.slice(0, top + 1) };
      overlay = poissonPmf(lambda, maxK);
      break;
    }
  }
  const compare = mode === "custom" ? config.compare ?? null : null;

  // exact moments for the parametric families (truncation would bias them)
  const exact = (() => {
    switch (mode) {
      case "binomial":
        return { mean: n * p, variance: n * p * (1 - p) };
      case "geometric":
        return { mean: 1 / p, variance: (1 - p) / (p * p) };
      case "poisson":
        return { mean: lambda, variance: lambda };
      case "binomial-vs-poisson":
        return { mean: n * pOverlay, variance: n * pOverlay * (1 - pOverlay) };
      default: {
        const m = moments(main);
        return { mean: m.mean, variance: m.variance };
      }
    }
  })();
  const sd = Math.sqrt(Math.max(0, exact.variance));
  const sum = main.probs.reduce((s, x) => s + x, 0);
  const negative = main.probs.some((x) => x < -1e-9);
  const valid = mode !== "custom" || (!negative && Math.abs(sum - 1) < 0.005);

  // ----- scales -----
  const allValues = [...main.values, ...(compare?.values ?? []), ...(overlay?.values ?? [])];
  const sorted = [...new Set(allValues)].sort((a, b) => a - b);
  let gap = 1;
  for (let i = 1; i < sorted.length; i++) gap = Math.min(gap, sorted[i] - sorted[i - 1]);
  const xLo = (sorted[0] ?? 0) - gap * 0.7;
  const xHi = (sorted[sorted.length - 1] ?? 1) + gap * 0.7;
  const sx = (x: number) => PADL + ((x - xLo) / (xHi - xLo || 1)) * (W - PADL - PADR);
  const slotPx = sx(xLo + gap) - sx(xLo);
  const barW = Math.min(36, slotPx * (compare ? 0.42 : 0.7));

  const editable = mode === "custom" && config.editable;
  const [yMaxEdit] = useState(() => Math.min(1, Math.max(0.5, Math.max(...(config.probs ?? [0.5])) * 1.4)));
  const yMin = view === "pmf" && editable ? -0.1 : 0;
  const yMax =
    view === "cdf"
      ? 1.05
      : editable
        ? yMaxEdit
        : Math.max(0.05, ...main.probs, ...(compare?.probs ?? []), ...(overlay?.probs ?? [])) * 1.18;
  const y0 = H - PADB;
  const sy = (v: number) => PADT + (1 - (v - yMin) / (yMax - yMin)) * (y0 - PADT);

  const inRange = (x: number) => !!range && x >= range.a - 1e-9 && x <= range.b + 1e-9;
  const pRange = range ? main.values.reduce((s, x, i) => (inRange(x) ? s + main.probs[i] : s), 0) : 0;

  // ----- dragging (custom editable) -----
  const setBar = (i: number, v: number) => {
    const clamped = Math.max(-0.1, Math.min(1, Math.round(v * 100) / 100));
    setCustom((c) => c.map((x, j) => (j === i ? clamped : x)));
  };
  const probFromEvent = (clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const y = ((clientY - rect.top) / rect.height) * H;
    return yMin + (1 - (y - PADT) / (y0 - PADT)) * (yMax - yMin);
  };

  // ----- ticks -----
  const labelEvery = Math.max(1, Math.ceil(sorted.length / 16));
  const yTicks =
    view === "cdf"
      ? [0, 0.25, 0.5, 0.75, 1]
      : editable
        ? [0, 0.25, 0.5, 0.75, 1].filter((v) => v <= yMax + 1e-9)
        : [0, yMax / 1.18 / 2, yMax / 1.18].map((v) => Number(v.toFixed(3)));

  // ----- the CDF staircase -----
  const cdfSteps: { x1: number; x2: number; F: number }[] = [];
  {
    let F = 0;
    const order = main.values.map((x, i) => [x, main.probs[i]] as const).sort((a, b) => a[0] - b[0]);
    cdfSteps.push({ x1: xLo, x2: order[0]?.[0] ?? xHi, F: 0 });
    order.forEach(([x, pr], i) => {
      F += pr;
      cdfSteps.push({ x1: x, x2: order[i + 1]?.[0] ?? xHi, F });
    });
  }

  // ----- formula for the selected k -----
  const k = selected;
  let formula: string | null = null;
  const q = (v: number) => fmt(1 - v);
  if (config.showFormula) {
    if (mode === "binomial") {
      formula =
        k === null
          ? `P(X = k) = \\binom{${n}}{k}(${fmt(p)})^{k}(${q(p)})^{${n}-k}`
          : `P(X = ${k}) = \\binom{${n}}{${k}}(${fmt(p)})^{${k}}(${q(p)})^{${n - k}} = ${fmt(main.probs[k] ?? 0)}`;
    } else if (mode === "geometric") {
      formula =
        k === null
          ? `P(X = k) = (${q(p)})^{k-1}\\,(${fmt(p)})`
          : `P(X = ${k}) = (${q(p)})^{${k - 1}}\\,(${fmt(p)}) = ${fmt(main.probs[k - 1] ?? 0)}`;
    } else if (mode === "poisson") {
      formula =
        k === null
          ? `P(X = k) = \\frac{e^{-${fmt(lambda)}}\\,${fmt(lambda)}^{k}}{k!}`
          : `P(X = ${k}) = \\frac{e^{-${fmt(lambda)}}\\,${fmt(lambda)}^{${k}}}{${factorialLatex(k)}} = ${fmt(main.probs[k] ?? 0)}`;
    } else if (mode === "binomial-vs-poisson") {
      formula =
        k === null
          ? `\\binom{${n}}{k}\\left(\\tfrac{${fmt(lambda)}}{${n}}\\right)^{k}\\left(1-\\tfrac{${fmt(lambda)}}{${n}}\\right)^{${n}-k} \\;\\approx\\; \\frac{e^{-${fmt(lambda)}}\\,${fmt(lambda)}^{k}}{k!}`
          : `k = ${k}:\\quad ${fmt(main.probs[k] ?? 0)} \\;\\text{vs}\\; ${fmt(overlay?.probs[k] ?? 0)}`;
    }
  }

  // ----- readouts -----
  const readout: React.ReactNode[] = [];
  if (mode === "custom") {
    const ok = Math.abs(sum - 1) < 0.005;
    readout.push(
      <span key="sum" className={ok && !negative ? "" : "font-medium text-callout-warning"}>
        <Latex latex={`\\sum P(X = x) = ${fmt(sum, 3)}`} />
        {negative ? " · a probability cannot be negative" : ok ? " ✓" : " · the probabilities must add up to exactly 1"}
      </span>,
    );
  }
  if (config.showMean) {
    let how = "";
    if (mode === "custom" && main.values.length <= 5)
      how = ` = ${main.values.map((x, i) => `(${fmt(x)})(${fmt(main.probs[i], 3)})`).join(" + ")}`;
    if (mode === "binomial" || mode === "binomial-vs-poisson") how = ` = np = ${n} \\times ${fmt(mode === "binomial" ? p : pOverlay)}`;
    if (mode === "geometric") how = ` = \\tfrac{1}{p} = \\tfrac{1}{${fmt(p)}}`;
    if (mode === "poisson") how = ` = \\lambda`;
    readout.push(
      <span key="mean" className={`overflow-x-auto ${valid ? "" : "opacity-50"}`}>
        <Latex latex={`E[X]${how} = ${fmt(exact.mean)}`} />
      </span>,
    );
  }
  if (config.showSd) {
    let how = "";
    if (mode === "custom") how = ` = E[X^2] - \\mu^2 = ${fmt(moments(main).ex2)} - ${fmt(exact.mean)}^2`;
    if (mode === "binomial") how = ` = npq = ${n} \\times ${fmt(p)} \\times ${q(p)}`;
    if (mode === "binomial-vs-poisson") how = ` = npq`;
    if (mode === "geometric") how = ` = \\tfrac{q}{p^2}`;
    if (mode === "poisson") how = ` = \\lambda`;
    readout.push(
      <span key="var" className={`overflow-x-auto ${valid ? "" : "opacity-50"}`}>
        <Latex latex={`\\operatorname{Var}(X)${how} = ${fmt(exact.variance)}, \\quad \\sigma = ${fmt(sd)}`} />
      </span>,
    );
  }
  if (compare && (config.showMean || config.showSd)) {
    const m = moments(compare);
    readout.push(
      <span key="cmp" className="overflow-x-auto text-muted-foreground">
        {compare.label}: <Latex latex={`E = ${fmt(m.mean)}${config.showSd ? `,\\ \\operatorname{Var} = ${fmt(m.variance)},\\ \\sigma = ${fmt(Math.sqrt(Math.max(0, m.variance)))}` : ""}`} />
      </span>,
    );
  }
  if (mode !== "custom" && main.probs.length > 0) {
    const best = main.probs.reduce((bi, x, i, arr) => (x > arr[bi] + 1e-12 ? i : bi), 0);
    const ties = main.probs.filter((x) => Math.abs(x - main.probs[best]) < 1e-12).length;
    readout.push(
      <span key="mode" className="text-muted-foreground">
        Most likely value: <strong className="text-foreground">{ties > 1 ? main.values.filter((_, i) => Math.abs(main.probs[i] - main.probs[best]) < 1e-12).join(" and ") : main.values[best]}</strong>
        {mode === "binomial" && Math.abs(n * p - Math.round(n * p)) > 1e-9 ? ` (while np = ${fmt(n * p)})` : ""}
      </span>,
    );
  }
  if (range) {
    readout.push(
      <span key="range" className="font-medium">
        <Latex latex={`P(${fmt(range.a)} \\le X \\le ${fmt(range.b)}) = ${fmt(pRange)}`} />
      </span>,
    );
  }
  if (mode === "binomial-vs-poisson" && overlay) {
    const diff = overlay.values.reduce((m, x) => Math.max(m, Math.abs((main.probs[x] ?? 0) - overlay!.probs[x])), 0);
    readout.push(
      <span key="gap" className="text-muted-foreground">
        <Latex latex={`p = \\lambda / n = ${fmt(pOverlay)}`} /> · largest gap between bar and dot: <strong className="text-foreground tabular-nums">{fmt(diff)}</strong>
      </span>,
    );
  }
  if (tail > 0.0005 && (mode === "geometric" || mode === "poisson")) {
    readout.push(
      <span key="tail" className="text-xs text-muted-foreground">
        <Latex latex={`P(X > ${maxK}) = ${fmt(tail)}`} /> is off the right edge.
      </span>,
    );
  }

  const title = {
    custom: "Probability distribution",
    binomial: "Binomial distribution",
    geometric: "Geometric distribution",
    poisson: "Poisson distribution",
    "binomial-vs-poisson": "Binomial vs Poisson",
  }[mode];
  const caption =
    config.caption ??
    {
      custom: editable
        ? "Drag a bar (or tap it and use its slider). A distribution needs every bar at or above 0 and the bars adding up to 1."
        : "The mean is the balance point: put the bars on a see-saw and the wedge is where it balances.",
      binomial: "Slide p away from 1/2 and the hump skews; slide n up and it spreads out but stays centred on np.",
      geometric: "Every bar is q times the one before it: each extra wait needs one more failure.",
      poisson: "Rare events in a fixed window: the mean and the variance are both λ.",
      "binomial-vs-poisson": "Keep λ = np fixed and let n grow: the binomial bars settle onto the Poisson dots.",
    }[mode];

  const rangeStep = sorted.every((x) => Number.isInteger(x)) ? 1 : gap;
  const lo = sorted[0] ?? 0;
  const hi = sorted[sorted.length - 1] ?? 1;

  return (
    <InteractiveFrame title={title}>
      {config.showCdf && (
        <div className="flex gap-2 text-sm" role="group" aria-label="Chart type">
          {(["pmf", "cdf"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-md border px-3 py-1 ${view === v ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {v === "pmf" ? "P(X = x)" : "F(x) = P(X ≤ x)"}
            </button>
          ))}
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none rounded-md border bg-background select-none"
        role="img"
        aria-label={`${title}: ${view === "pmf" ? "probability mass function" : "cumulative distribution function"}`}
        onPointerMove={(e) => {
          if (dragging === null) return;
          const v = probFromEvent(e.clientY);
          if (v !== null) setBar(dragging, v);
        }}
        onPointerUp={() => setDragging(null)}
        onPointerCancel={() => setDragging(null)}
      >
        {/* sigma band */}
        {view === "pmf" && config.showSd && valid && sd > 0 && (
          <g>
            <rect
              x={Math.max(PADL, sx(exact.mean - sd))}
              y={PADT}
              width={Math.max(0, Math.min(W - PADR, sx(exact.mean + sd)) - Math.max(PADL, sx(exact.mean - sd)))}
              height={y0 - PADT}
              className="fill-callout-info/10"
            />
            {[-1, 1].map((s) => {
              const x = sx(exact.mean + s * sd);
              return x >= PADL && x <= W - PADR ? (
                <g key={s}>
                  <line x1={x} x2={x} y1={PADT} y2={y0} className="stroke-callout-info/60" strokeDasharray="3 3" />
                  <text x={x} y={PADT - 4} textAnchor="middle" className="fill-callout-info text-[9px]">
                    {s < 0 ? "μ − σ" : "μ + σ"}
                  </text>
                </g>
              ) : null;
            })}
          </g>
        )}

        {/* grid + axes */}
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={PADL} x2={W - PADR} y1={sy(v)} y2={sy(v)} className={v === 0 ? "stroke-foreground/40" : "stroke-foreground/10"} />
            <text x={PADL - 4} y={sy(v) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {fmt(v, 3)}
            </text>
          </g>
        ))}
        {sorted.map((x, i) =>
          i % labelEvery === 0 ? (
            <text key={x} x={sx(x)} y={y0 + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
              {fmt(x, 2)}
            </text>
          ) : null,
        )}

        {view === "pmf" ? (
          <>
            {/* comparison bars */}
            {compare?.values.map((x, i) => {
              const v = compare.probs[i];
              return (
                <rect
                  key={`c${x}`}
                  x={sx(x) + 1}
                  y={sy(v)}
                  width={barW}
                  height={Math.max(0, sy(0) - sy(v))}
                  className="fill-plot-secondary/35 stroke-plot-secondary"
                />
              );
            })}
            {/* main bars */}
            {main.values.map((x, i) => {
              const v = main.probs[i];
              const top = Math.min(sy(v), sy(0));
              const h = Math.abs(sy(0) - sy(v));
              const cx = compare ? sx(x) - barW - 1 : sx(x) - barW / 2;
              const sel = selected === x;
              const cls = v < 0 ? "fill-destructive/60" : inRange(x) ? "fill-callout-warning/80" : "fill-plot/70";
              return (
                <g
                  key={`m${x}`}
                  onPointerDown={(e) => {
                    setSelected(x);
                    if (editable) {
                      (e.currentTarget.ownerSVGElement ?? e.currentTarget).setPointerCapture?.(e.pointerId);
                      setDragging(i);
                      const pv = probFromEvent(e.clientY);
                      if (pv !== null) setBar(i, pv);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (!editable) return;
                    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
                      e.preventDefault();
                      setBar(i, v + 0.01);
                    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      setBar(i, v - 0.01);
                    }
                  }}
                  onFocus={() => setSelected(x)}
                  tabIndex={0}
                  role={editable ? "slider" : "button"}
                  aria-label={`P(X = ${x})`}
                  aria-valuenow={editable ? v : undefined}
                  aria-valuemin={editable ? -0.1 : undefined}
                  aria-valuemax={editable ? 1 : undefined}
                  className={editable ? "cursor-ns-resize" : "cursor-pointer"}
                >
                  {/* generous hit area */}
                  <rect x={sx(x) - slotPx / 2} y={PADT} width={slotPx} height={y0 - PADT} className="fill-transparent" />
                  <rect x={cx} y={top} width={barW} height={Math.max(h, 0.5)} className={`${cls} ${sel ? "stroke-foreground" : ""}`} strokeWidth={sel ? 1.5 : 0} />
                  {main.values.length <= 12 && barW >= 14 && (
                    <text x={cx + barW / 2} y={Math.min(sy(v), sy(0)) - 3} textAnchor="middle" className="fill-foreground text-[8.5px] tabular-nums">
                      {fmt(v, 3)}
                    </text>
                  )}
                </g>
              );
            })}
            {/* Poisson dots */}
            {overlay?.values.map((x, i) => (
              <circle key={`o${x}`} cx={sx(x)} cy={sy(overlay!.probs[i])} r={3.2} className="fill-callout-warning stroke-background" strokeWidth={1} />
            ))}
            {/* balance-point wedge */}
            {config.showMean && valid && exact.mean >= xLo && exact.mean <= xHi && (
              <g>
                <path d={`M ${sx(exact.mean)} ${y0 + 15} l -7 11 h 14 z`} className="fill-foreground" />
                <text x={sx(exact.mean)} y={y0 + 37} textAnchor="middle" className="fill-foreground text-[9px] font-semibold">
                  {`E[X] = ${fmt(exact.mean, 3)}`}
                </text>
              </g>
            )}
          </>
        ) : (
          <>
            {cdfSteps.map((s, i) => (
              <g key={i}>
                <line x1={sx(s.x1)} x2={sx(s.x2)} y1={sy(s.F)} y2={sy(s.F)} className="stroke-plot" strokeWidth={2} />
                {i > 0 && <circle cx={sx(s.x1)} cy={sy(s.F)} r={3} className="fill-plot" />}
                {i < cdfSteps.length - 1 && <circle cx={sx(s.x2)} cy={sy(s.F)} r={3} className="fill-background stroke-plot" strokeWidth={1.5} />}
              </g>
            ))}
            {range &&
              (() => {
                const below = main.values.reduce((s, x, i) => (x < range.a - 1e-9 ? s + main.probs[i] : s), 0);
                const upto = main.values.reduce((s, x, i) => (x <= range.b + 1e-9 ? s + main.probs[i] : s), 0);
                const x = Math.min(W - PADR - 4, sx(range.b) + 8);
                return (
                  <g>
                    <line x1={x} x2={x} y1={sy(below)} y2={sy(upto)} className="stroke-callout-warning" strokeWidth={3} />
                    <text x={x - 4} y={(sy(below) + sy(upto)) / 2 + 3} textAnchor="end" className="fill-callout-warning text-[9px] font-semibold">
                      {fmt(upto - below, 3)}
                    </text>
                  </g>
                );
              })()}
          </>
        )}

        {/* legend */}
        {(compare || overlay) && view === "pmf" && (
          <g className="text-[9px]">
            <rect x={W - PADR - 118} y={PADT} width={10} height={8} className="fill-plot/70" />
            <text x={W - PADR - 104} y={PADT + 7} className="fill-foreground">
              {config.label ?? (overlay ? `Binomial(${n}, ${fmt(pOverlay, 3)})` : "X")}
            </text>
            {compare && <rect x={W - PADR - 118} y={PADT + 13} width={10} height={8} className="fill-plot-secondary/35 stroke-plot-secondary" />}
            {overlay && <circle cx={W - PADR - 113} cy={PADT + 17} r={3.2} className="fill-callout-warning" />}
            <text x={W - PADR - 104} y={PADT + 20} className="fill-foreground">
              {compare ? compare.label : `Poisson(${fmt(lambda, 2)})`}
            </text>
          </g>
        )}
      </svg>

      {formula && (
        <p className="overflow-x-auto text-center text-sm" aria-live="polite">
          <Latex latex={formula} />
        </p>
      )}
      {!formula && selected !== null && mode === "custom" && (
        <p className="text-center text-sm" aria-live="polite">
          <Latex latex={`P(X = ${fmt(selected)}) = ${fmt(main.probs[main.values.indexOf(selected)] ?? 0)}`} />
        </p>
      )}

      <div className="space-y-2">
        {params.map((prm) => (
          <SliderRow
            key={prm.name}
            label={<Latex latex={PARAM_LATEX[prm.name]} />}
            value={vals[prm.name]}
            min={prm.min}
            max={prm.max}
            step={prm.step}
            onChange={(v) => {
              setVals((s) => ({ ...s, [prm.name]: v }));
              setSelected(null);
            }}
          />
        ))}
        {editable && selected !== null && main.values.includes(selected) && (
          <SliderRow
            label={<Latex latex={`P(${fmt(selected)})`} />}
            value={main.probs[main.values.indexOf(selected)]}
            min={-0.1}
            max={1}
            step={0.01}
            onChange={(v) => setBar(main.values.indexOf(selected), v)}
          />
        )}
        {range && config.range?.adjustable && (
          <>
            <SliderRow label={<Latex latex="a" />} value={range.a} min={lo} max={hi} step={rangeStep} onChange={(a) => setRange((r) => ({ a, b: Math.max(a, r!.b) }))} />
            <SliderRow label={<Latex latex="b" />} value={range.b} min={lo} max={hi} step={rangeStep} onChange={(b) => setRange((r) => ({ a: Math.min(b, r!.a), b }))} />
          </>
        )}
      </div>

      {editable && (
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            disabled={negative || sum <= 0}
            onClick={() => setCustom((c) => c.map((x) => Math.round((x / sum) * 10000) / 10000))}
            className="rounded-md border bg-background px-3 py-1 disabled:opacity-50"
          >
            Rescale to sum 1
          </button>
          <button type="button" onClick={() => setCustom(config.probs ?? [])} className="rounded-md border bg-background px-3 py-1 text-xs">
            Reset
          </button>
        </div>
      )}

      {readout.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
          {readout}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">{config.caption ?? caption}</p>
    </InteractiveFrame>
  );
}
