"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import {
  seqClosedSum,
  seqCompile,
  seqFmt,
  seqSumToInfinity,
  seqTable,
  seqTerm,
  type SeqParams,
} from "../../lib/seq";
import type { seqProgressionLabSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof seqProgressionLabSchema>;
type Kind = Config["kinds"][number];
type Choice = { type: "kind"; kind: Kind } | { type: "series"; index: number };

const KIND_LABEL: Record<Kind, string> = {
  ap: "AP",
  gp: "GP",
  hp: "HP",
  agp: "AGP",
};

const DEFAULT_CAPTION =
  "Stems are the terms t_k; the joined dots are the partial sums S_k = t_1 + ... + t_k. For a GP or AGP with |r| < 1 the partial sums settle onto the dashed line, the sum to infinity.";

const W = 400;
const H = 260;
const PAD_L = 40;
const PAD_R = 12;
const PAD_T = 12;
const PAD_B = 22;

/** LaTeX for a number, or "undefined" in text. */
const num = (v: number, decimals = 4) => (Number.isFinite(v) ? seqFmt(v, decimals) : "\\text{undefined}");

/** Plain-text tick label. */
function tickLabel(v: number): string {
  if (Math.abs(v) < 1e-12) return "0";
  if (Math.abs(v) >= 1e5 || Math.abs(v) < 1e-3) return v.toExponential(1);
  return String(Number(v.toPrecision(4)));
}

/** A "nice" tick spacing (1, 2 or 5 times a power of ten) for a span. */
function niceStep(span: number, target = 5): number {
  const raw = span / target;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

/** Signed term for a LaTeX expression: "+ 3" / "- 3". */
const signed = (v: number) => (v < 0 ? `- ${seqFmt(-v)}` : `+ ${seqFmt(v)}`);
const paren = (v: number) => (v < 0 ? `(${seqFmt(v)})` : seqFmt(v));

function termLatex(kind: Kind, p: SeqParams): string {
  switch (kind) {
    case "ap":
      return `t_k = a + (k - 1)d = ${seqFmt(p.a)} ${signed(p.d)}(k - 1)`;
    case "gp":
      return `t_k = ar^{k-1} = ${seqFmt(p.a)} \\cdot ${paren(p.r)}^{k-1}`;
    case "hp":
      return `t_k = \\dfrac{1}{a + (k - 1)d} = \\dfrac{1}{${seqFmt(p.a)} ${signed(p.d)}(k - 1)}`;
    case "agp":
      return `t_k = [a + (k - 1)d]\\,r^{k-1} = [${seqFmt(p.a)} ${signed(p.d)}(k - 1)]\\cdot ${paren(p.r)}^{k-1}`;
  }
}

function sumFormulaLatex(kind: Kind): string {
  switch (kind) {
    case "ap":
      return "S_n = \\tfrac{n}{2}[2a + (n - 1)d]";
    case "gp":
      return "S_n = \\dfrac{a(1 - r^n)}{1 - r}";
    case "hp":
      return "\\text{no closed form: add the terms}";
    case "agp":
      return "S_n = \\dfrac{a - [a + (n-1)d]r^n}{1 - r} + \\dfrac{dr(1 - r^{n-1})}{(1 - r)^2}";
  }
}

export function SeqProgressionLab({ config }: { config: Config }) {
  const choices: Choice[] = useMemo(
    () => [
      ...config.kinds.map((kind): Choice => ({ type: "kind", kind })),
      ...config.series.map((_, index): Choice => ({ type: "series", index })),
    ],
    [config.kinds, config.series],
  );
  const [ci, setCi] = useState(0);
  const [a, setA] = useState(config.a.initial);
  const [d, setD] = useState(config.d.initial);
  const [r, setR] = useState(config.r.initial);
  const [n, setN] = useState(config.n.initial);

  const choice = choices[Math.min(ci, choices.length - 1)];
  const p: SeqParams = { a, d, r };
  const series = choice.type === "series" ? config.series[choice.index] : null;
  const kind = choice.type === "kind" ? choice.kind : null;

  const term = useMemo(
    () => (series ? seqCompile(series.expr) : (k: number) => seqTerm(kind ?? "ap", { a, d, r }, k)),
    [series, kind, a, d, r],
  );
  const { terms, sums } = seqTable(term, n);
  const tn = terms[n - 1];
  const sn = sums[n - 1];
  const closed = kind ? seqClosedSum(kind, p, n) : NaN;
  const limit = series ? (series.limit ?? NaN) : kind ? seqSumToInfinity(kind, p) : NaN;
  const drawLimit = config.showLimit && Number.isFinite(limit);

  const showTerms = config.view !== "sums";
  const showSums = config.view !== "terms";

  // y-window from everything drawn, always including 0.
  const values = [
    0,
    ...(showTerms ? terms : []),
    ...(showSums ? sums : []),
    ...(drawLimit ? [limit] : []),
  ].filter(Number.isFinite);
  let ymin = Math.min(...values);
  let ymax = Math.max(...values);
  if (ymax - ymin < 1e-9) {
    ymin -= 1;
    ymax += 1;
  }
  const padY = (ymax - ymin) * 0.08;
  ymin -= padY;
  ymax += padY;

  const sx = (k: number) => PAD_L + ((k - 0.5) / n) * (W - PAD_L - PAD_R);
  const sy = (y: number) => PAD_T + ((ymax - y) / (ymax - ymin)) * (H - PAD_T - PAD_B);

  const step = niceStep(ymax - ymin);
  const yTicks: number[] = [];
  for (let y = Math.ceil(ymin / step) * step; y <= ymax + 1e-9; y += step) yTicks.push(y);
  const kEvery = n <= 12 ? 1 : n <= 30 ? 5 : 10;
  const kTicks = Array.from({ length: n }, (_, i) => i + 1).filter((k) => k === 1 || k % kEvery === 0);

  const sumPoints = sums
    .map((s, i) => ({ k: i + 1, s }))
    .filter((pt) => Number.isFinite(pt.s));
  const sumPath = sumPoints
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${sx(pt.k).toFixed(2)} ${sy(pt.s).toFixed(2)}`)
    .join(" ");

  const usesD = kind === "ap" || kind === "hp" || kind === "agp";
  const usesR = kind === "gp" || kind === "agp";
  const firstFew = terms.slice(0, Math.min(n, 6)).map((t) => num(t, 3));

  const pill = (active: boolean) =>
    `rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
      active ? "border-plot bg-plot/10 text-plot" : "bg-background text-muted-foreground hover:text-foreground"
    }`;

  let limitNote: React.ReactNode;
  if (series) {
    limitNote = Number.isFinite(limit) ? (
      <Latex latex={`S_\\infty = ${series.limitLatex ?? seqFmt(limit)},\\quad S_\\infty - S_n = ${num(limit - sn)}`} />
    ) : (
      <span className="text-muted-foreground">Watch whether S_n levels off or keeps growing.</span>
    );
  } else if (kind === "gp" || kind === "agp") {
    limitNote = Number.isFinite(limit) ? (
      <Latex
        latex={
          kind === "gp"
            ? `|r| < 1:\\ S_\\infty = \\dfrac{a}{1 - r} = ${num(limit)}`
            : `|r| < 1:\\ S_\\infty = \\dfrac{a}{1 - r} + \\dfrac{dr}{(1 - r)^2} = ${num(limit)}`
        }
      />
    ) : (
      <span className="text-muted-foreground">|r| ≥ 1, so the partial sums do not settle: no sum to infinity.</span>
    );
  } else if (kind === "hp") {
    limitNote = (
      <span className="text-muted-foreground">
        The reciprocals 1/t_k form an AP, so S_n has no closed form; an HP with positive terms never converges.
      </span>
    );
  } else {
    limitNote = (
      <span className="text-muted-foreground">
        {d === 0 && a === 0
          ? "Every term is 0."
          : "S_n is quadratic in n (or linear if d = 0), so an AP has no sum to infinity unless every term is 0."}
      </span>
    );
  }

  return (
    <InteractiveFrame title="Progression lab">
      {choices.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {choices.map((c, i) => (
            <button key={i} type="button" onClick={() => setCi(i)} className={pill(i === ci)}>
              {c.type === "kind" ? KIND_LABEL[c.kind] : config.series[c.index].label}
            </button>
          ))}
        </div>
      )}
      <div className="overflow-x-auto text-center">
        <Latex latex={series ? `t_k = ${series.latex}` : termLatex(kind ?? "ap", p)} display />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md rounded-md border bg-background" role="img">
        {yTicks.map((y) => (
          <g key={`y${y}`}>
            <line x1={PAD_L} y1={sy(y)} x2={W - PAD_R} y2={sy(y)} className="stroke-border" strokeWidth={0.5} />
            <text x={PAD_L - 4} y={sy(y) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
              {tickLabel(y)}
            </text>
          </g>
        ))}
        <line x1={PAD_L} y1={sy(0)} x2={W - PAD_R} y2={sy(0)} className="stroke-foreground/50" strokeWidth={1} />
        {kTicks.map((k) => (
          <text key={`k${k}`} x={sx(k)} y={H - 6} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {k}
          </text>
        ))}
        {drawLimit && (
          <line
            x1={PAD_L}
            y1={sy(limit)}
            x2={W - PAD_R}
            y2={sy(limit)}
            className="stroke-callout-tip"
            strokeDasharray="5 4"
            strokeWidth={1.5}
          />
        )}
        {showTerms &&
          terms.map((t, i) =>
            Number.isFinite(t) ? (
              <g key={`t${i}`}>
                <line x1={sx(i + 1)} y1={sy(0)} x2={sx(i + 1)} y2={sy(t)} className="stroke-plot" strokeWidth={2} />
                <circle cx={sx(i + 1)} cy={sy(t)} r={n > 30 ? 2 : 3} className="fill-plot stroke-plot" />
              </g>
            ) : null,
          )}
        {showSums && sumPoints.length > 0 && (
          <>
            <path d={sumPath} fill="none" className="stroke-callout-warning" strokeWidth={1.5} />
            {sumPoints.map((pt) => (
              <circle
                key={`s${pt.k}`}
                cx={sx(pt.k)}
                cy={sy(pt.s)}
                r={n > 30 ? 2 : 3}
                className="fill-background stroke-callout-warning"
                strokeWidth={1.5}
              />
            ))}
          </>
        )}
      </svg>
      <p className="text-center text-xs text-muted-foreground">
        {showTerms && <span className="text-plot">● terms t_k</span>}
        {showTerms && showSums && "   "}
        {showSums && <span className="text-callout-warning">○ partial sums S_k</span>}
        {drawLimit && <span className="text-callout-tip">{"   "}- - S∞</span>}
      </p>

      {!series && (
        <SliderRow label={<Latex latex="a" />} value={a} min={config.a.min} max={config.a.max} step={config.a.step} onChange={setA} />
      )}
      {usesD && (
        <SliderRow label={<Latex latex="d" />} value={d} min={config.d.min} max={config.d.max} step={config.d.step} onChange={setD} />
      )}
      {usesR && (
        <SliderRow label={<Latex latex="r" />} value={r} min={config.r.min} max={config.r.max} step={config.r.step} onChange={setR} />
      )}
      <SliderRow
        label={<Latex latex="n" />}
        value={n}
        min={config.n.min}
        max={config.n.max}
        step={1}
        onChange={(v) => setN(Math.round(v))}
      />

      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">First terms</p>
          <div className="overflow-x-auto">
            <Latex latex={`${firstFew.join(",\\ ")}${n > 6 ? ",\\ \\dots" : ""}`} />
          </div>
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">n-th term</p>
          <Latex latex={`t_{${n}} = ${num(tn)}`} />
          {kind === "hp" && (
            <p className="mt-1 text-xs text-muted-foreground">
              <Latex latex={`\\tfrac{1}{t_{${n}}} = a + (n-1)d = ${num(a + (n - 1) * d)}`} />
            </p>
          )}
        </div>
        <div className="rounded-md border bg-background p-3 text-center sm:col-span-2">
          <p className="mb-1 text-xs text-muted-foreground">Partial sum</p>
          <div className="overflow-x-auto">
            <Latex latex={`S_{${n}} = ${num(sn)}`} />
            {kind && kind !== "hp" && (
              <>
                <span className="text-muted-foreground">{"  from  "}</span>
                <Latex latex={`${sumFormulaLatex(kind)} = ${num(closed)}`} />
              </>
            )}
          </div>
        </div>
        <div className="rounded-md border bg-background p-3 text-center text-xs sm:col-span-2">{limitNote}</div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION} />
      </p>
    </InteractiveFrame>
  );
}
