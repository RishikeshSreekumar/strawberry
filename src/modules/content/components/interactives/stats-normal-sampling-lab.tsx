"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import type { statsNormalSamplingLabSchema } from "../../schemas/blocks";
import { fmt, mulberry32, niceStep, normalPdf, phi, randNormal, snapTo, ticks } from "./stats-math";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof statsNormalSamplingLabSchema>;
type Population = Config["population"];
type Confidence = Config["confidence"];
type Interval = { mean: number; lo: number; hi: number; covers: boolean };

const W = 400;
const PADL = 14;
const PADR = 14;
const BIMODAL_S = Math.sqrt(1 - 0.81);
const Z_STAR: Record<Confidence, number> = { 0.9: 1.645, 0.95: 1.96, 0.99: 2.576 };
const MAX_MEANS = 20000;

const POP_LABEL: Record<Population, string> = {
  normal: "Normal population",
  uniform: "Uniform population",
  "right-skewed": "Right-skewed population",
  bimodal: "Bimodal population",
};

/** Standardised population density (mean 0, SD 1). */
function popDensity(pop: Population, z: number): number {
  switch (pop) {
    case "normal":
      return normalPdf(z);
    case "uniform":
      return Math.abs(z) <= Math.sqrt(3) ? 1 / (2 * Math.sqrt(3)) : 0;
    case "right-skewed":
      return z >= -1 ? Math.exp(-(z + 1)) : 0;
    case "bimodal":
      return 0.5 * normalPdf(z, 0.9, BIMODAL_S) + 0.5 * normalPdf(z, -0.9, BIMODAL_S);
  }
}

/** One standardised draw (mean 0, SD 1). */
function popDraw(pop: Population, rng: () => number): number {
  switch (pop) {
    case "normal":
      return randNormal(rng);
    case "uniform":
      return Math.sqrt(3) * (2 * rng() - 1);
    case "right-skewed":
      return -Math.log(Math.max(rng(), 1e-12)) - 1;
    case "bimodal":
      return (rng() < 0.5 ? -0.9 : 0.9) + BIMODAL_S * randNormal(rng);
  }
}

function useRng(seed: number | undefined) {
  const ref = useRef<(() => number) | null>(null);
  return () => {
    if (!ref.current) ref.current = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 31));
    return ref.current;
  };
}

function zLatex(z: number) {
  return fmt(z, 2);
}

// ======================= area mode =======================

function AreaMode({ config }: { config: Config }) {
  const mu0 = config.mu;
  const s0 = config.sigma;
  const xmin = config.window?.xmin ?? mu0 - (config.paramSliders ? 5 : 4) * s0;
  const xmax = config.window?.xmax ?? mu0 + (config.paramSliders ? 5 : 4) * s0;
  const step = niceStep(s0 / 100);
  const init = config.bounds ?? { a: mu0 - s0, b: mu0 + s0 };

  const [mu, setMu] = useState(mu0);
  const [sigma, setSigma] = useState(s0);
  const [a, setA] = useState<number | null>(init.a);
  const [b, setB] = useState<number | null>(init.b);
  const [lastA, setLastA] = useState(init.a ?? mu0 - s0);
  const [lastB, setLastB] = useState(init.b ?? mu0 + s0);
  const [drag, setDrag] = useState<"a" | "b" | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const H = 230;
  const TOP = 14;
  const AX = 180;
  const sx = (x: number) => PADL + ((x - xmin) / (xmax - xmin)) * (W - PADL - PADR);
  const peak = 1 / ((config.paramSliders ? s0 / 2 : s0) * Math.sqrt(2 * Math.PI));
  const yMax = peak * 1.1;
  const sy = (v: number) => AX - (v / yMax) * (AX - TOP);
  const fromPx = (px: number) => Math.max(xmin, Math.min(xmax, snapTo(xmin + ((px - PADL) / (W - PADL - PADR)) * (xmax - xmin), step)));

  const za = a === null ? -Infinity : (a - mu) / sigma;
  const zb = b === null ? Infinity : (b - mu) / sigma;
  const area = Math.max(0, phi(zb) - phi(za));

  const curve: string[] = [];
  for (let j = 0; j <= 240; j++) {
    const x = xmin + ((xmax - xmin) * j) / 240;
    curve.push(`${sx(x)},${sy(normalPdf(x, mu, sigma))}`);
  }
  const lo = Math.max(xmin, a ?? -Infinity);
  const hi = Math.min(xmax, b ?? Infinity);
  let shade = "";
  if (hi > lo) {
    const pts: string[] = [`${sx(lo)},${AX}`];
    for (let j = 0; j <= 120; j++) {
      const x = lo + ((hi - lo) * j) / 120;
      pts.push(`${sx(x)},${sy(normalPdf(x, mu, sigma))}`);
    }
    pts.push(`${sx(hi)},${AX}`);
    shade = pts.join(" ");
  }

  const setBound = (k: "a" | "b", v: number) => {
    if (k === "a") {
      const nv = b === null ? v : Math.min(v, b);
      setA(nv);
      setLastA(nv);
    } else {
      const nv = a === null ? v : Math.max(v, a);
      setB(nv);
      setLastB(nv);
    }
  };

  const toSvgX = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return ((clientX - r.left) / r.width) * W;
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = toSvgX(e.clientX);
    if (px === null) return;
    const cands: ("a" | "b")[] = [];
    if (a !== null) cands.push("a");
    if (b !== null) cands.push("b");
    if (!cands.length) return;
    const k = cands.reduce((best, c) => {
      const d = Math.abs(sx((c === "a" ? a : b)!) - px);
      const bd = Math.abs(sx((best === "a" ? a : b)!) - px);
      return d < bd ? c : best;
    });
    svgRef.current?.setPointerCapture?.(e.pointerId);
    setDrag(k);
    setBound(k, fromPx(px));
  };

  const xT = ticks(xmin, xmax, 8);
  const sigmaMarks = [-3, -2, -1, 0, 1, 2, 3].map((k) => mu + k * sigma).filter((x) => x >= xmin && x <= xmax);

  const target = config.targetArea;
  const hit = target !== undefined && Math.abs(area - target) < 0.0025;

  const boundLatex = (k: "a" | "b") => {
    const v = k === "a" ? a : b;
    const z = k === "a" ? za : zb;
    if (v === null) return `${k} = ${k === "a" ? "-\\infty" : "+\\infty"},\\ \\Phi = ${k === "a" ? 0 : 1}`;
    return `z_${k} = \\frac{${fmt(v)} - ${fmt(mu)}}{${fmt(sigma)}} = ${zLatex(z)},\\quad \\Phi(${zLatex(z)}) = ${fmt(phi(z), 4)}`;
  };
  const probLatex =
    a === null && b === null
      ? "P(-\\infty < X < \\infty) = 1"
      : a === null
        ? `P(X < ${fmt(b!)}) = \\Phi(${zLatex(zb)}) = ${fmt(area, 4)}`
        : b === null
          ? `P(X > ${fmt(a)}) = 1 - \\Phi(${zLatex(za)}) = ${fmt(area, 4)}`
          : `P(${fmt(a)} < X < ${fmt(b)}) = \\Phi(${zLatex(zb)}) - \\Phi(${zLatex(za)}) = ${fmt(area, 4)}`;

  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none rounded-md border bg-background select-none"
        role="group"
        aria-label={`Normal curve with mean ${fmt(mu)} and standard deviation ${fmt(sigma)}; shaded area ${fmt(area, 4)}`}
        onPointerDown={onPointerDown}
        onPointerMove={(e) => {
          if (!drag) return;
          const px = toSvgX(e.clientX);
          if (px !== null) setBound(drag, fromPx(px));
        }}
        onPointerUp={() => setDrag(null)}
        onPointerCancel={() => setDrag(null)}
      >
        {sigmaMarks.map((x, i) => (
          <line key={i} x1={sx(x)} x2={sx(x)} y1={TOP} y2={AX} className="stroke-foreground/10" pointerEvents="none" />
        ))}
        {shade && <polygon points={shade} className="fill-plot/35" pointerEvents="none" />}
        <polyline points={curve.join(" ")} className="fill-none stroke-plot" strokeWidth={2.2} pointerEvents="none" />
        <line x1={PADL} x2={W - PADR} y1={AX} y2={AX} className="stroke-foreground/50" />
        {xT.map((t) => (
          <g key={t} pointerEvents="none">
            <line x1={sx(t)} x2={sx(t)} y1={AX} y2={AX + 3} className="stroke-foreground/50" />
            <text x={sx(t)} y={AX + 13} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
              {fmt(t, 3)}
            </text>
          </g>
        ))}
        {config.showZ &&
          sigmaMarks.map((x, i) => (
            <text key={`z${i}`} x={sx(x)} y={AX + 25} textAnchor="middle" className="fill-callout-info text-[8.5px] tabular-nums" pointerEvents="none">
              {`z=${fmt((x - mu) / sigma, 1)}`}
            </text>
          ))}
        {config.xLabel && (
          <text x={W / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {config.xLabel}
          </text>
        )}
        <text x={sx(Math.min(xmax, Math.max(xmin, (lo + hi) / 2)))} y={sy(normalPdf(mu, mu, sigma)) + (hi > lo ? 34 : -4)} textAnchor="middle" className="fill-foreground text-[11px] font-semibold" pointerEvents="none">
          {fmt(area, 4)}
        </text>
        {(["a", "b"] as const).map((k) => {
          const v = k === "a" ? a : b;
          if (v === null || v < xmin || v > xmax) return null;
          return (
            <g
              key={k}
              tabIndex={0}
              role="slider"
              aria-label={`Bound ${k}`}
              aria-valuenow={v}
              aria-valuemin={xmin}
              aria-valuemax={xmax}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setBound(k, snapTo(v + step, step));
                } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  e.preventDefault();
                  setBound(k, snapTo(v - step, step));
                }
              }}
              className="cursor-ew-resize outline-none"
            >
              <line x1={sx(v)} x2={sx(v)} y1={TOP} y2={AX} className="stroke-callout-warning" strokeWidth={1.8} />
              <path d={`M ${sx(v)} ${AX} l -7 11 h 14 z`} className="fill-callout-warning" />
              <text x={sx(v)} y={TOP + 8} textAnchor="middle" className="fill-callout-warning text-[10px] font-semibold">
                {k}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="space-y-2">
        {config.paramSliders && (
          <>
            <SliderRow label={<Latex latex="\mu" />} value={mu} min={mu0 - 2 * s0} max={mu0 + 2 * s0} step={niceStep(s0 / 10)} onChange={setMu} />
            <SliderRow label={<Latex latex="\sigma" />} value={sigma} min={niceStep(s0 / 20) * Math.ceil(s0 / 2 / niceStep(s0 / 20))} max={2 * s0} step={niceStep(s0 / 20)} onChange={setSigma} />
          </>
        )}
        {a !== null && <SliderRow label={<Latex latex="a" />} value={a} min={xmin} max={xmax} step={step} onChange={(v) => setBound("a", v)} />}
        {b !== null && <SliderRow label={<Latex latex="b" />} value={b} min={xmin} max={xmax} step={step} onChange={(v) => setBound("b", v)} />}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <button type="button" aria-pressed={a === null} onClick={() => setA(a === null ? Math.min(lastA, b ?? Infinity) : null)} className={`rounded-md border px-3 py-1 ${a === null ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}>
          a = −∞
        </button>
        <button type="button" aria-pressed={b === null} onClick={() => setB(b === null ? Math.max(lastB, a ?? -Infinity) : null)} className={`rounded-md border px-3 py-1 ${b === null ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}>
          b = +∞
        </button>
        {config.showSigmaPresets &&
          [1, 2, 3].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                const na = snapTo(mu - k * sigma, step);
                const nb = snapTo(mu + k * sigma, step);
                setA(na);
                setB(nb);
                setLastA(na);
                setLastB(nb);
              }}
              className="rounded-md border bg-background px-3 py-1"
            >
              {`μ ± ${k}σ`}
            </button>
          ))}
      </div>

      <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        {config.showZ && (
          <>
            <span className="overflow-x-auto">
              <Latex latex={boundLatex("a")} />
            </span>
            <span className="overflow-x-auto">
              <Latex latex={boundLatex("b")} />
            </span>
          </>
        )}
        <span className="overflow-x-auto font-medium">
          <Latex latex={probLatex} />
        </span>
        {target !== undefined && (
          <span className={hit ? "font-medium text-callout-tip" : "text-muted-foreground"}>
            Target area <strong className="tabular-nums">{fmt(target, 4)}</strong>
            {hit ? " ✓ hit!" : ` · off by ${fmt(Math.abs(area - target), 4)}: keep dragging`}
          </span>
        )}
        {hit && (b !== null || a !== null) && (
          <span className="overflow-x-auto text-muted-foreground">
            <Latex
              latex={
                b !== null
                  ? `b = \\mu + z_b\\sigma = ${fmt(mu)} + (${zLatex(zb)})(${fmt(sigma)}) = ${fmt(b)}`
                  : `a = \\mu + z_a\\sigma = ${fmt(mu)} + (${zLatex(za)})(${fmt(sigma)}) = ${fmt(a!)}`
              }
            />
          </span>
        )}
      </div>
    </>
  );
}

// ======================= shared for sampling / intervals =======================

function PopulationStrip({
  pop,
  mu,
  sigma,
  xmin,
  xmax,
  sample,
  sampleMean,
}: {
  pop: Population;
  mu: number;
  sigma: number;
  xmin: number;
  xmax: number;
  sample: number[];
  sampleMean: number | null;
}) {
  const H = 96;
  const TOP = 16;
  const AX = 74;
  const sx = (x: number) => PADL + ((x - xmin) / (xmax - xmin)) * (W - PADL - PADR);
  const pts: [number, number][] = [];
  for (let j = 0; j <= 240; j++) {
    const x = xmin + ((xmax - xmin) * j) / 240;
    pts.push([x, popDensity(pop, (x - mu) / sigma)]);
  }
  const maxD = Math.max(...pts.map((p) => p[1]), 1e-9);
  const sy = (v: number) => AX - (v / maxD) * (AX - TOP);
  const poly = [`${sx(xmin)},${AX}`, ...pts.map(([x, v]) => `${sx(x)},${sy(v)}`), `${sx(xmax)},${AX}`].join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label={`${POP_LABEL[pop]} with mean ${fmt(mu)} and SD ${fmt(sigma)}`}>
      <text x={PADL} y={11} className="fill-muted-foreground text-[9px]">
        {`${POP_LABEL[pop]} · μ = ${fmt(mu)}, σ = ${fmt(sigma)}`}
      </text>
      <polygon points={poly} className="fill-plot-secondary/20 stroke-plot-secondary" strokeWidth={1.5} />
      <line x1={sx(mu)} x2={sx(mu)} y1={TOP} y2={AX} className="stroke-foreground/60" strokeDasharray="4 3" />
      <line x1={PADL} x2={W - PADR} y1={AX} y2={AX} className="stroke-foreground/50" />
      {sample.slice(0, 400).map((x, i) =>
        x >= xmin && x <= xmax ? <circle key={i} cx={sx(x)} cy={AX - 4} r={2.4} className="fill-plot/70" /> : null,
      )}
      {sampleMean !== null && sampleMean >= xmin && sampleMean <= xmax && (
        <g>
          <path d={`M ${sx(sampleMean)} ${AX + 1} l -6 10 h 12 z`} className="fill-callout-warning" />
          <text x={sx(sampleMean)} y={AX + 20} textAnchor="middle" className="fill-callout-warning text-[9px] font-semibold">
            {`x̄ = ${fmt(sampleMean, 2)}`}
          </text>
        </g>
      )}
    </svg>
  );
}

// ======================= sampling mode =======================

function SamplingMode({ config }: { config: Config }) {
  const { mu, sigma, population } = config;
  const xmin = config.window?.xmin ?? mu - 4 * sigma;
  const xmax = config.window?.xmax ?? mu + 4 * sigma;
  const getRng = useRng(config.seed);
  const [n, setN] = useState(config.sampleSize.initial);
  const [means, setMeans] = useState<number[]>([]);
  const [last, setLast] = useState<number[]>([]);

  const drawSample = (rng: () => number) => Array.from({ length: n }, () => mu + sigma * popDraw(population, rng));
  const draw = (count: number) => {
    const rng = getRng();
    const newMeans: number[] = [];
    let sample: number[] = [];
    for (let t = 0; t < count; t++) {
      sample = drawSample(rng);
      newMeans.push(sample.reduce((s, x) => s + x, 0) / n);
    }
    setLast(sample);
    setMeans((m) => [...m, ...newMeans].slice(-MAX_MEANS));
  };

  const se = sigma / Math.sqrt(n);
  const bw = Math.max((xmax - xmin) / 160, niceStep(se / 3));
  const K = Math.ceil((xmax - xmin) / bw);
  const counts = new Array<number>(K).fill(0);
  for (const m of means) {
    const k = Math.floor((m - xmin) / bw);
    if (k >= 0 && k < K) counts[k]++;
  }
  const H = 200;
  const TOP = 14;
  const AX = 170;
  const sx = (x: number) => PADL + ((x - xmin) / (xmax - xmin)) * (W - PADL - PADR);
  const overlayPeak = means.length * bw * normalPdf(mu, mu, se);
  const yMax = Math.max(1, ...counts, overlayPeak) * 1.1;
  const sy = (v: number) => AX - (v / yMax) * (AX - TOP);
  const overlay: string[] = [];
  if (means.length > 0) {
    for (let j = 0; j <= 300; j++) {
      const x = xmin + ((xmax - xmin) * j) / 300;
      overlay.push(`${sx(x)},${sy(means.length * bw * normalPdf(x, mu, se))}`);
    }
  }
  const meanOfMeans = means.length ? means.reduce((s, x) => s + x, 0) / means.length : NaN;
  const sdOfMeans = means.length > 1 ? Math.sqrt(means.reduce((s, x) => s + (x - meanOfMeans) ** 2, 0) / means.length) : NaN;
  const lastMean = last.length ? last.reduce((s, x) => s + x, 0) / last.length : null;

  return (
    <>
      <PopulationStrip pop={population} mu={mu} sigma={sigma} xmin={xmin} xmax={xmax} sample={last} sampleMean={lastMean} />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label={`Histogram of ${means.length} sample means`}>
        <text x={PADL} y={11} className="fill-muted-foreground text-[9px]">
          {`Sample means x̄ (n = ${n}) · ${means.length} sample${means.length === 1 ? "" : "s"}`}
        </text>
        <line x1={sx(mu)} x2={sx(mu)} y1={TOP} y2={AX} className="stroke-foreground/60" strokeDasharray="4 3" />
        {counts.map((c, k) =>
          c > 0 ? (
            <rect key={k} x={sx(xmin + k * bw)} y={sy(c)} width={Math.max(0.5, sx(xmin + (k + 1) * bw) - sx(xmin + k * bw) - 0.3)} height={AX - sy(c)} className="fill-plot/65" />
          ) : null,
        )}
        {overlay.length > 0 && <polyline points={overlay.join(" ")} className="fill-none stroke-callout-warning" strokeWidth={2} />}
        <line x1={PADL} x2={W - PADR} y1={AX} y2={AX} className="stroke-foreground/50" />
        {ticks(xmin, xmax, 8).map((t) => (
          <text key={t} x={sx(t)} y={AX + 13} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
            {fmt(t, 3)}
          </text>
        ))}
        {config.xLabel && (
          <text x={W / 2} y={H - 3} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {config.xLabel}
          </text>
        )}
      </svg>

      <div className="space-y-2">
        <SliderRow
          label={<Latex latex="n" />}
          value={n}
          min={config.sampleSize.min}
          max={config.sampleSize.max}
          step={1}
          onChange={(v) => {
            setN(v);
            setMeans([]);
            setLast([]);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <button type="button" onClick={() => draw(1)} className="rounded-md border bg-background px-3 py-1">
          Draw 1 sample
        </button>
        <button type="button" onClick={() => draw(config.draws)} className="rounded-md border bg-background px-3 py-1">
          {`Draw ${config.draws} samples`}
        </button>
        <button
          type="button"
          onClick={() => {
            setMeans([]);
            setLast([]);
          }}
          className="rounded-md border bg-background px-3 py-1 text-xs"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        <span className="overflow-x-auto">
          <Latex latex={`\\text{Theory: } \\bar{X} \\text{ has mean } \\mu = ${fmt(mu)},\\ \\text{SD } \\tfrac{\\sigma}{\\sqrt{n}} = \\tfrac{${fmt(sigma)}}{\\sqrt{${n}}} = ${fmt(se)}`} />
        </span>
        <span className="overflow-x-auto">
          {means.length === 0 ? (
            <span className="text-muted-foreground">Draw some samples to compare.</span>
          ) : (
            <Latex latex={`\\text{Your ${means.length} means: average } ${fmt(meanOfMeans)},\\ \\text{SD } ${Number.isFinite(sdOfMeans) ? fmt(sdOfMeans) : "\\text{—}"}`} />
          )}
        </span>
      </div>
    </>
  );
}

// ======================= intervals mode =======================

function IntervalsMode({ config }: { config: Config }) {
  const { mu, sigma, population } = config;
  const xmin = config.window?.xmin ?? mu - 3 * sigma;
  const xmax = config.window?.xmax ?? mu + 3 * sigma;
  const getRng = useRng(config.seed);
  const [n, setN] = useState(config.sampleSize.initial);
  const [conf, setConf] = useState<Confidence>(config.confidence);
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [total, setTotal] = useState({ drawn: 0, covered: 0 });
  const [last, setLast] = useState<number[]>([]);

  const zs = Z_STAR[conf];
  const half = (zs * sigma) / Math.sqrt(n);
  const draw = (count: number) => {
    const rng = getRng();
    const fresh: Interval[] = [];
    let sample: number[] = [];
    for (let t = 0; t < count; t++) {
      sample = Array.from({ length: n }, () => mu + sigma * popDraw(population, rng));
      const m = sample.reduce((s, x) => s + x, 0) / n;
      fresh.push({ mean: m, lo: m - half, hi: m + half, covers: m - half <= mu && mu <= m + half });
    }
    setLast(sample);
    setIntervals((iv) => [...iv, ...fresh].slice(-100));
    setTotal((tt) => ({ drawn: tt.drawn + count, covered: tt.covered + fresh.filter((f) => f.covers).length }));
  };
  const reset = () => {
    setIntervals([]);
    setTotal({ drawn: 0, covered: 0 });
    setLast([]);
  };

  const ROW = 2.7;
  const TOP = 16;
  const AX = TOP + 100 * ROW + 6;
  const H = AX + 26;
  const sx = (x: number) => PADL + ((x - xmin) / (xmax - xmin)) * (W - PADL - PADR);
  const clampX = (x: number) => sx(Math.max(xmin, Math.min(xmax, x)));
  const lastMean = last.length ? last.reduce((s, x) => s + x, 0) / last.length : null;
  const pct = total.drawn ? (100 * total.covered) / total.drawn : 0;

  return (
    <>
      <PopulationStrip pop={population} mu={mu} sigma={sigma} xmin={xmin} xmax={xmax} sample={last} sampleMean={lastMean} />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label={`${intervals.length} confidence intervals, ${intervals.filter((i) => i.covers).length} of them cover mu`}>
        <text x={PADL} y={11} className="fill-muted-foreground text-[9px]">
          {`The last ${intervals.length} intervals x̄ ± ${zs}·σ/√n (newest at the top)`}
        </text>
        {intervals
          .slice()
          .reverse()
          .map((iv, r) => {
            const y = TOP + r * ROW + ROW / 2;
            return (
              <g key={r}>
                <line x1={clampX(iv.lo)} x2={clampX(iv.hi)} y1={y} y2={y} className={iv.covers ? "stroke-plot/80" : "stroke-destructive"} strokeWidth={1.7} />
                <circle cx={clampX(iv.mean)} cy={y} r={0.9} className="fill-foreground/70" />
              </g>
            );
          })}
        <line x1={sx(mu)} x2={sx(mu)} y1={TOP - 2} y2={AX} className="stroke-callout-warning" strokeWidth={1.5} />
        <line x1={PADL} x2={W - PADR} y1={AX} y2={AX} className="stroke-foreground/50" />
        {ticks(xmin, xmax, 8).map((t) => (
          <text key={t} x={sx(t)} y={AX + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
            {fmt(t, 3)}
          </text>
        ))}
        <text x={sx(mu)} y={AX + 23} textAnchor="middle" className="fill-callout-warning text-[9px] font-semibold">
          μ
        </text>
      </svg>

      <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Confidence level">
        {([0.9, 0.95, 0.99] as const).map((cl) => (
          <button
            key={cl}
            type="button"
            aria-pressed={conf === cl}
            onClick={() => {
              setConf(cl);
              reset();
            }}
            className={`rounded-md border px-3 py-1 ${conf === cl ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
          >
            {`${Math.round(cl * 100)}%`}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <SliderRow
          label={<Latex latex="n" />}
          value={n}
          min={config.sampleSize.min}
          max={config.sampleSize.max}
          step={1}
          onChange={(v) => {
            setN(v);
            reset();
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <button type="button" onClick={() => draw(1)} className="rounded-md border bg-background px-3 py-1">
          Draw 1 interval
        </button>
        <button type="button" onClick={() => draw(config.draws)} className="rounded-md border bg-background px-3 py-1">
          {`Draw ${config.draws} intervals`}
        </button>
        <button type="button" onClick={reset} className="rounded-md border bg-background px-3 py-1 text-xs">
          Reset
        </button>
      </div>
      <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        <span className="overflow-x-auto">
          <Latex latex={`\\bar{x} \\pm ${zs}\\,\\tfrac{\\sigma}{\\sqrt{n}} = \\bar{x} \\pm ${zs} \\times \\tfrac{${fmt(sigma)}}{\\sqrt{${n}}} = \\bar{x} \\pm ${fmt(half)}`} />
        </span>
        <span>
          {total.drawn === 0 ? (
            <span className="text-muted-foreground">Draw some intervals and count how many catch μ.</span>
          ) : (
            <>
              <strong className="tabular-nums">{total.covered}</strong> of <strong className="tabular-nums">{total.drawn}</strong> intervals cover μ ={" "}
              <strong className="tabular-nums">{fmt(pct, 1)}%</strong>
              <span className="text-muted-foreground">{` (the method promises about ${Math.round(conf * 100)}%)`}</span>
            </>
          )}
        </span>
      </div>
    </>
  );
}

export function StatsNormalSamplingLab({ config }: { config: Config }) {
  const title = { area: "Area under the normal curve", sampling: "Sampling distribution of the mean", intervals: "Confidence intervals" }[config.mode];
  const caption =
    config.caption ??
    {
      area: config.targetArea !== undefined
        ? "Drag a bound (or use its slider) until the shaded area matches the target."
        : "Drag the orange bounds. The shaded area is the probability; the total area under the curve is 1.",
      sampling: "Each sample gives one x̄. Stack many and a bell appears, centred on μ, narrowing as n grows, whatever the population's shape.",
      intervals: "Each line is one sample's interval. Red ones miss μ. The confidence level is about the method, not any single interval.",
    }[config.mode];
  return (
    <InteractiveFrame title={title}>
      {config.mode === "area" && <AreaMode config={config} />}
      {config.mode === "sampling" && <SamplingMode config={config} />}
      {config.mode === "intervals" && <IntervalsMode config={config} />}
      <p className="text-center text-xs text-muted-foreground">{caption}</p>
    </InteractiveFrame>
  );
}
