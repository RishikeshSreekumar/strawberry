"use client";

import { useId, useRef, useState } from "react";
import type { z } from "zod";
import { compileExpression } from "../../lib/math-eval";
import type { statsDistributionBuilderSchema } from "../../schemas/blocks";
import { fmt, niceStep, snapTo, summarize, ticks, type Summary } from "./stats-math";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof statsDistributionBuilderSchema>;
type View = Config["view"];
type Stat = Config["stats"][number];
type Drag = { kind: "point"; s: number; i: number } | { kind: "center" } | { kind: "level" } | null;

const W = 400;
const PADL = 38;
const PADR = 14;
const STRIP = 22; // marker-label strip at the top of a panel

const SET_STYLE = [
  { fill: "fill-plot", stroke: "stroke-plot", soft: "fill-plot/25", swatch: "bg-plot" },
  { fill: "fill-plot-secondary", stroke: "stroke-plot-secondary", soft: "fill-plot-secondary/25", swatch: "bg-plot-secondary" },
] as const;

const MARKER_STYLE = {
  mean: { stroke: "stroke-callout-warning", fill: "fill-callout-warning", label: "x̄" },
  median: { stroke: "stroke-callout-tip", fill: "fill-callout-tip", label: "M" },
  mode: { stroke: "stroke-callout-definition", fill: "fill-callout-definition", label: "Mo" },
  q1: { stroke: "stroke-callout-info", fill: "fill-callout-info", label: "Q₁" },
  q3: { stroke: "stroke-callout-info", fill: "fill-callout-info", label: "Q₃" },
} as const;
type MarkerKind = keyof typeof MARKER_STYLE;

const STAT_LATEX: Record<Stat, string> = {
  mean: "\\text{Mean } \\bar{x}",
  median: "\\text{Median } M",
  mode: "\\text{Mode}",
  q1: "Q_1",
  q3: "Q_3",
  iqr: "\\text{IQR} = Q_3 - Q_1",
  range: "\\text{Range}",
  sd: "\\text{SD } \\sigma",
  variance: "\\text{Variance } \\sigma^2",
  "md-mean": "\\text{MD about } \\bar{x}",
  "md-median": "\\text{MD about } M",
};

const VIEW_LABEL: Record<View, string> = { dotplot: "Dot plot", histogram: "Histogram", ogive: "Ogive", boxplot: "Box plot" };

function statValue(stat: Stat, s: Summary): string {
  switch (stat) {
    case "mean":
      return fmt(s.mean);
    case "median":
      return fmt(s.median);
    case "mode":
      return s.modes ? s.modes.map((m) => fmt(m)).join(", ") : "none";
    case "q1":
      return fmt(s.q1);
    case "q3":
      return fmt(s.q3);
    case "iqr":
      return fmt(s.q3 - s.q1);
    case "range":
      return fmt(s.max - s.min);
    case "sd":
      return fmt(s.sd);
    case "variance":
      return fmt(s.variance);
    case "md-mean":
      return fmt(s.mdMean);
    case "md-median":
      return fmt(s.mdMedian);
  }
}

export function StatsDistributionBuilder({ config }: { config: Config }) {
  const { range } = config;
  const span = range.max - range.min;
  const initialSets = config.compareData ? [config.data, config.compareData] : [config.data];
  const allInt = initialSets.flat().every((x) => Number.isInteger(x));
  const snap = config.snap ?? (allInt ? 1 : niceStep(span / 100));
  const views = config.views ?? [config.view];
  const binStart = config.binStart ?? range.min;

  const [sets, setSets] = useState<number[][]>(() => initialSets.map((d) => [...d]));
  const [view, setView] = useState<View>(config.view);
  const [binW, setBinW] = useState<number>(() => config.binWidth ?? niceStep(span / 8));
  const [selected, setSelected] = useState<{ s: number; i: number } | null>(null);
  const [drag, setDrag] = useState<Drag>(null);
  const [center, setCenter] = useState<number>(() => snapTo(range.min + span / 4, snap));
  const [shift, setShift] = useState(0);
  const [scale, setScale] = useState(1);
  const [level, setLevel] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const clipId = `sdb-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const transformed = shift !== 0 || scale !== 1;
  const canEdit = config.editable && !transformed;
  const shown = sets.map((d) => d.map((x) => Number((shift + scale * x).toFixed(10))));
  const summaries = shown.map((d) => summarize(d));
  const baseSummaries = sets.map((d) => summarize(d));
  const s0 = summaries[0];
  const labels = [config.labels.data, config.labels.compare];
  const inAxis = (x: number) => x >= range.min - 1e-9 && x <= range.max + 1e-9;
  const offAxis = shown.flat().filter((x) => !inAxis(x)).length;

  const sx = (v: number) => PADL + ((v - range.min) / span) * (W - PADL - PADR);
  const pxPerUnit = (W - PADL - PADR) / span;
  const xTicks = ticks(range.min, range.max, 7);

  const stats = config.stats;
  const markerKinds = (["mean", "median", "mode", "q1", "q3"] as const).filter((k) => stats.includes(k));
  const c = config.centerSlider ? center : s0.mean;

  // ---------- geometry per view ----------
  const nSets = sets.length;
  const bottomExtra = (config.showBalance && view === "dotplot" ? 26 : 13) + (config.xLabel ? 14 : 2) + 4;
  let panelTops: number[] = [];
  let panelH = 0;
  let axisY = 0;
  if (view === "dotplot") {
    panelH = config.deviations === "squares" ? 190 : nSets > 1 ? 104 : 140;
    const gap = config.showBalance ? 22 : 10;
    panelTops = sets.map((_, i) => 6 + i * (panelH + gap));
    axisY = panelTops[nSets - 1] + panelH;
  } else if (view === "boxplot") {
    panelH = 84;
    panelTops = sets.map((_, i) => 6 + i * (panelH + 8));
    axisY = panelTops[nSets - 1] + panelH;
  } else {
    panelH = 190;
    panelTops = [6];
    axisY = 6 + panelH;
  }
  const H = axisY + bottomExtra;

  // ---------- bins ----------
  const K = Math.min(200, Math.max(1, Math.ceil((range.max - binStart) / binW - 1e-9)));
  const edges = Array.from({ length: K + 1 }, (_, k) => Number((binStart + k * binW).toFixed(10)));
  const binCounts = shown.map((d) => {
    const counts = new Array<number>(K).fill(0);
    for (const x of d) {
      const k = Math.floor((x - binStart) / binW + 1e-9);
      if (k >= 0 && k < K) counts[k]++;
      else if (k === K && Math.abs(x - edges[K]) < 1e-9) counts[K - 1]++;
    }
    return counts;
  });
  const heightOf = (f: number, n: number) => (config.density ? (config.relative ? f / (n * binW) : f / binW) : f);

  // ---------- pointer helpers ----------
  const toSvg = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return { x: ((clientX - r.left) / r.width) * W, y: ((clientY - r.top) / r.height) * H };
  };
  const valueAt = (px: number) => Math.max(range.min, Math.min(range.max, snapTo(range.min + (px - PADL) / pxPerUnit, snap)));

  const movePoint = (s: number, i: number, v: number) =>
    setSets((all) => all.map((d, si) => (si === s ? d.map((x, j) => (j === i ? Math.max(range.min, Math.min(range.max, v)) : x)) : d)));
  const removePoint = (s: number, i: number) => {
    if (sets[s].length <= 1) return;
    setSets((all) => all.map((d, si) => (si === s ? d.filter((_, j) => j !== i) : d)));
    setSelected(null);
  };

  // ---------- ogive geometry ----------
  const n0 = s0.n;
  const cum: number[] = [0];
  binCounts[0].forEach((f) => cum.push(cum[cum.length - 1] + f));
  const ogTop = 6 + STRIP;
  const oy = (v: number) => axisY - (v / Math.max(1, n0)) * (axisY - ogTop);
  const lvl = level ?? n0 / 2;
  const readLess = (() => {
    for (let k = 0; k < K; k++) {
      if (cum[k + 1] >= lvl - 1e-9 && cum[k + 1] > cum[k]) {
        if (cum[k] > lvl) return edges[k];
        return edges[k] + ((lvl - cum[k]) / (cum[k + 1] - cum[k])) * binW;
      }
    }
    return null;
  })();
  const more = cum.map((v) => n0 - v); // cf "≥ edge k"
  const readMore = (() => {
    for (let k = 0; k < K; k++) {
      if (more[k + 1] <= lvl + 1e-9 && more[k] > more[k + 1]) {
        if (more[k] < lvl) return edges[k];
        return edges[k] + ((more[k] - lvl) / (more[k] - more[k + 1])) * binW;
      }
    }
    return null;
  })();

  // ---------- pointer handlers ----------
  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const p = toSvg(e.clientX, e.clientY);
    if (!p) return;
    if (view === "ogive") {
      svgRef.current?.setPointerCapture?.(e.pointerId);
      setDrag({ kind: "level" });
      setLevel(Math.max(0, Math.min(n0, ((axisY - p.y) / (axisY - ogTop)) * n0)));
      return;
    }
    if (!canEdit || (view !== "dotplot" && view !== "boxplot")) return;
    if (p.x < PADL - 4 || p.x > W - PADR + 4) return;
    const s = panelTops.findIndex((t) => p.y >= t && p.y <= t + panelH);
    if (s < 0 || sets[s].length >= 200) return;
    const v = valueAt(p.x);
    const i = sets[s].length;
    setSets((all) => all.map((d, si) => (si === s ? [...d, v] : d)));
    setSelected({ s, i });
    svgRef.current?.setPointerCapture?.(e.pointerId);
    setDrag({ kind: "point", s, i });
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    const p = toSvg(e.clientX, e.clientY);
    if (!p) return;
    if (drag.kind === "point") movePoint(drag.s, drag.i, valueAt(p.x));
    else if (drag.kind === "center") setCenter(valueAt(p.x));
    else setLevel(Math.max(0, Math.min(n0, Math.round(((axisY - p.y) / (axisY - ogTop)) * n0 * 2) / 2)));
  };
  const endDrag = () => setDrag(null);

  const startPointDrag = (e: React.PointerEvent<SVGGElement>, s: number, i: number) => {
    e.stopPropagation();
    setSelected({ s, i });
    if (!canEdit) return;
    e.currentTarget.ownerSVGElement?.setPointerCapture?.(e.pointerId);
    setDrag({ kind: "point", s, i });
  };
  const pointKeys = (e: React.KeyboardEvent, s: number, i: number) => {
    if (!canEdit) return;
    const x = sets[s][i];
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      movePoint(s, i, snapTo(x + snap, snap));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      movePoint(s, i, snapTo(x - snap, snap));
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      removePoint(s, i);
    }
  };

  // ---------- shared layers ----------
  const markerLayer = (sum: Summary, top: number, bottom: number, key: string) => {
    const items: { kind: MarkerKind; x: number }[] = [];
    for (const k of markerKinds) {
      if (k === "mode") (sum.modes ?? []).forEach((m) => items.push({ kind: k, x: m }));
      else items.push({ kind: k, x: sum[k] });
    }
    const visible = items.filter((m) => inAxis(m.x)).sort((a, b) => sx(a.x) - sx(b.x));
    let lastRow0 = -Infinity;
    return (
      <g key={key} pointerEvents="none">
        {visible.map((m, idx) => {
          const x = sx(m.x);
          const row = x - lastRow0 < 16 ? 1 : 0;
          if (row === 0) lastRow0 = x;
          const st = MARKER_STYLE[m.kind];
          return (
            <g key={`${m.kind}${idx}`}>
              <line
                x1={x}
                x2={x}
                y1={top + (row ? 18 : 10)}
                y2={bottom}
                className={st.stroke}
                strokeWidth={m.kind === "mean" || m.kind === "median" ? 1.8 : 1.2}
                strokeDasharray={m.kind === "mode" || m.kind === "q1" || m.kind === "q3" ? "4 3" : undefined}
              />
              <text x={x} y={top + (row ? 17 : 8)} textAnchor="middle" className={`${st.fill} text-[9px] font-semibold`}>
                {st.label}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const fenceLayer = (sum: Summary, top: number, bottom: number, key: string) =>
    config.showFences ? (
      <g key={key} pointerEvents="none">
        {[
          { v: sum.lowerFence, t: "LF" },
          { v: sum.upperFence, t: "UF" },
        ].map((f) =>
          inAxis(f.v) ? (
            <g key={f.t}>
              <line x1={sx(f.v)} x2={sx(f.v)} y1={top + 10} y2={bottom} className="stroke-destructive/70" strokeDasharray="2 3" />
              <text x={sx(f.v)} y={top + 8} textAnchor="middle" className="fill-destructive text-[8px]">
                {f.t}
              </text>
            </g>
          ) : null,
        )}
      </g>
    ) : null;

  const xAxis = (
    <g pointerEvents="none">
      <line x1={PADL} x2={W - PADR} y1={axisY} y2={axisY} className="stroke-foreground/50" />
      {xTicks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={axisY} y2={axisY + 3} className="stroke-foreground/50" />
          <text
            x={sx(t)}
            y={axisY + (config.showBalance && view === "dotplot" ? 26 : 13)}
            textAnchor="middle"
            className="fill-muted-foreground text-[9px] tabular-nums"
          >
            {fmt(t, 4)}
          </text>
        </g>
      ))}
      {config.xLabel && (
        <text x={(PADL + W - PADR) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          {config.xLabel}
        </text>
      )}
    </g>
  );

  // ---------- dot plot ----------
  const dotLayout = (s: number) => {
    const d = shown[s];
    const counts = new Map<number, number>();
    const pos = d.map((x) => {
      const key = Number(x.toFixed(9));
      const k = counts.get(key) ?? 0;
      counts.set(key, k + 1);
      return k;
    });
    const maxStack = Math.max(1, ...counts.values());
    return { pos, maxStack };
  };

  const renderDotplot = () =>
    sets.map((_, s) => {
      const top = panelTops[s];
      const base = top + panelH;
      const { pos, maxStack } = dotLayout(s);
      const dd = Math.max(3, Math.min(12, (panelH - STRIP - 4) / maxStack));
      const r = dd / 2 - 0.4;
      const sum = summaries[s];
      const dotY = (k: number) => base - dd * (k + 0.5);
      const showDev = s === 0 && config.deviations !== "none";
      const outlier = (x: number) => config.showFences && (x < sum.lowerFence - 1e-9 || x > sum.upperFence + 1e-9);
      return (
        <g key={`p${s}`}>
          <rect x={PADL} y={top} width={W - PADL - PADR} height={panelH} className="fill-transparent" />
          {nSets > 1 && (
            <text x={PADL + 2} y={top + STRIP + 8} className={`${SET_STYLE[s].fill} text-[9px] font-semibold`}>
              {labels[s]}
            </text>
          )}
          {/* SD band */}
          {stats.includes("sd") && sum.sd > 0 && (
            <rect
              x={Math.max(PADL, sx(sum.mean - sum.sd))}
              y={top + STRIP}
              width={Math.max(0, Math.min(W - PADR, sx(sum.mean + sum.sd)) - Math.max(PADL, sx(sum.mean - sum.sd)))}
              height={panelH - STRIP}
              className="fill-callout-warning/10"
              pointerEvents="none"
            />
          )}
          {/* ghost of the untransformed data */}
          {transformed &&
            (() => {
              const counts = new Map<number, number>();
              return sets[s].map((x, i) => {
                const key = Number(x.toFixed(9));
                const k = counts.get(key) ?? 0;
                counts.set(key, k + 1);
                return inAxis(x) ? (
                  <circle key={`g${i}`} cx={sx(x)} cy={dotY(k)} r={r} className="fill-none stroke-muted-foreground/40" pointerEvents="none" />
                ) : null;
              });
            })()}
          {/* deviations */}
          {showDev && (
            <g clipPath={`url(#${clipId})`} pointerEvents="none">
              {shown[0].map((x, i) => {
                if (!inAxis(x)) return null;
                const y = dotY(pos[i]);
                const x1 = sx(c);
                const x2 = sx(x);
                if (config.deviations === "squares") {
                  const side = Math.abs(x - c) * pxPerUnit;
                  return (
                    <rect
                      key={`sq${i}`}
                      x={Math.min(x1, x2)}
                      y={y - side}
                      width={side}
                      height={side}
                      className="fill-callout-info/10 stroke-callout-info/60"
                      strokeWidth={1}
                    />
                  );
                }
                const cls =
                  config.deviations === "absolute" ? "stroke-callout-info" : x >= c ? "stroke-callout-tip" : "stroke-callout-warning";
                return <line key={`dv${i}`} x1={x1} x2={x2} y1={y} y2={y} className={cls} strokeWidth={2} />;
              })}
            </g>
          )}
          {markerLayer(sum, top, base, `m${s}`)}
          {fenceLayer(sum, top, base, `f${s}`)}
          {/* centre a */}
          {s === 0 && config.centerSlider && (
            <g
              className="cursor-ew-resize"
              onPointerDown={(e) => {
                e.stopPropagation();
                e.currentTarget.ownerSVGElement?.setPointerCapture?.(e.pointerId);
                setDrag({ kind: "center" });
              }}
            >
              <line x1={sx(center)} x2={sx(center)} y1={top + 10} y2={base} className="stroke-foreground" strokeDasharray="5 3" strokeWidth={1.5} />
              <rect x={sx(center) - 9} y={top} width={18} height={panelH} className="fill-transparent" />
              <path d={`M ${sx(center)} ${top + 11} l -6 -9 h 12 z`} className="fill-foreground" />
            </g>
          )}
          {/* dots */}
          {shown[s].map((x, i) => {
            if (!inAxis(x)) return null;
            const sel = selected?.s === s && selected.i === i;
            return (
              <g
                key={`d${i}`}
                tabIndex={0}
                role={canEdit ? "slider" : "img"}
                aria-label={`${labels[s]} value ${fmt(x)}`}
                aria-valuenow={canEdit ? x : undefined}
                aria-valuemin={canEdit ? range.min : undefined}
                aria-valuemax={canEdit ? range.max : undefined}
                onPointerDown={(e) => startPointDrag(e, s, i)}
                onKeyDown={(e) => pointKeys(e, s, i)}
                onFocus={() => setSelected({ s, i })}
                className={canEdit ? "cursor-ew-resize outline-none" : "outline-none"}
              >
                <circle cx={sx(x)} cy={dotY(pos[i])} r={Math.max(r, 7)} className="fill-transparent" />
                <circle
                  cx={sx(x)}
                  cy={dotY(pos[i])}
                  r={r}
                  className={`${SET_STYLE[s].fill} ${sel ? "stroke-foreground" : outlier(x) ? "stroke-destructive" : "stroke-background"}`}
                  strokeWidth={sel || outlier(x) ? 2 : 0.8}
                />
              </g>
            );
          })}
          {/* baseline / beam and fulcrum */}
          <line
            x1={PADL}
            x2={W - PADR}
            y1={base}
            y2={base}
            className={config.showBalance ? "stroke-foreground" : "stroke-foreground/40"}
            strokeWidth={config.showBalance ? 2.5 : 1}
          />
          {config.showBalance && inAxis(sum.mean) && (
            <g pointerEvents="none">
              <path d={`M ${sx(sum.mean)} ${base + 1} l -8 13 h 16 z`} className="fill-callout-warning" />
            </g>
          )}
        </g>
      );
    });

  // ---------- box plot ----------
  const renderBoxplot = () =>
    sets.map((_, s) => {
      const top = panelTops[s];
      const sum = summaries[s];
      const rowY = top + 36;
      const boxY = top + 50;
      const boxH = 20;
      const counts = new Map<number, number>();
      const isOut = (x: number) => config.showFences && (x < sum.lowerFence - 1e-9 || x > sum.upperFence + 1e-9);
      const lo = config.showFences ? sum.lowWhisker : sum.min;
      const hi = config.showFences ? sum.highWhisker : sum.max;
      const X = (v: number) => sx(Math.max(range.min, Math.min(range.max, v)));
      return (
        <g key={`b${s}`}>
          <rect x={PADL} y={top} width={W - PADL - PADR} height={panelH} className="fill-transparent" />
          <text x={PADL - 4} y={boxY + boxH / 2 + 3} textAnchor="end" className={`${SET_STYLE[s].fill} text-[8.5px] font-semibold`}>
            {nSets > 1 ? labels[s].slice(0, 7) : ""}
          </text>
          {fenceLayer(sum, top, top + panelH, `f${s}`)}
          {/* whiskers + box */}
          <g pointerEvents="none">
            <line x1={X(lo)} x2={X(sum.q1)} y1={boxY + boxH / 2} y2={boxY + boxH / 2} className="stroke-foreground" />
            <line x1={X(sum.q3)} x2={X(hi)} y1={boxY + boxH / 2} y2={boxY + boxH / 2} className="stroke-foreground" />
            <line x1={X(lo)} x2={X(lo)} y1={boxY + 4} y2={boxY + boxH - 4} className="stroke-foreground" />
            <line x1={X(hi)} x2={X(hi)} y1={boxY + 4} y2={boxY + boxH - 4} className="stroke-foreground" />
            <rect x={X(sum.q1)} y={boxY} width={Math.max(0, X(sum.q3) - X(sum.q1))} height={boxH} className={`${SET_STYLE[s].soft} ${SET_STYLE[s].stroke}`} strokeWidth={1.5} />
            <line x1={X(sum.median)} x2={X(sum.median)} y1={boxY} y2={boxY + boxH} className="stroke-callout-tip" strokeWidth={2.5} />
            {stats.includes("mean") && inAxis(sum.mean) && (
              <path d={`M ${sx(sum.mean)} ${boxY + boxH + 2} l -5 8 h 10 z`} className="fill-callout-warning" />
            )}
            {shown[s].filter(isOut).map((x, i) =>
              inAxis(x) ? <circle key={`o${i}`} cx={sx(x)} cy={boxY + boxH / 2} r={3.5} className="fill-background stroke-destructive" strokeWidth={1.5} /> : null,
            )}
            {[
              { v: sum.q1, t: "Q₁" },
              { v: sum.median, t: "M" },
              { v: sum.q3, t: "Q₃" },
            ].map((l, i) => (
              <text key={l.t} x={X(l.v) + (i === 0 ? -2 : i === 2 ? 2 : 0)} y={boxY + boxH + 11 + (i === 1 ? 9 : 0)} textAnchor={i === 0 ? "end" : i === 2 ? "start" : "middle"} className="fill-muted-foreground text-[8px]">
                {l.t}
              </text>
            ))}
          </g>
          {/* the data strip */}
          {shown[s].map((x, i) => {
            if (!inAxis(x)) return null;
            const key = Number(x.toFixed(9));
            const k = counts.get(key) ?? 0;
            counts.set(key, k + 1);
            const sel = selected?.s === s && selected.i === i;
            return (
              <g
                key={`d${i}`}
                tabIndex={0}
                role={canEdit ? "slider" : "img"}
                aria-label={`${labels[s]} value ${fmt(x)}`}
                aria-valuenow={canEdit ? x : undefined}
                aria-valuemin={canEdit ? range.min : undefined}
                aria-valuemax={canEdit ? range.max : undefined}
                onPointerDown={(e) => startPointDrag(e, s, i)}
                onKeyDown={(e) => pointKeys(e, s, i)}
                onFocus={() => setSelected({ s, i })}
                className={canEdit ? "cursor-ew-resize outline-none" : "outline-none"}
              >
                <circle cx={sx(x)} cy={rowY - Math.min(k, 4) * 6} r={7} className="fill-transparent" />
                <circle
                  cx={sx(x)}
                  cy={rowY - Math.min(k, 4) * 6}
                  r={3}
                  className={`${SET_STYLE[s].fill} ${sel ? "stroke-foreground" : "stroke-background"}`}
                  strokeWidth={sel ? 1.8 : 0.6}
                />
              </g>
            );
          })}
        </g>
      );
    });

  // ---------- histogram ----------
  let curvePts: string | null = null;
  let curveMax = 0;
  if (config.curveExpr) {
    try {
      const f = compileExpression(config.curveExpr);
      const factor = config.density ? (config.relative ? 1 : s0.n) : s0.n * binW;
      const pts: [number, number][] = [];
      for (let j = 0; j <= 240; j++) {
        const x = range.min + (span * j) / 240;
        const y = f({ x }) * factor;
        if (Number.isFinite(y)) {
          pts.push([x, y]);
          curveMax = Math.max(curveMax, y);
        }
      }
      curvePts = pts.map(([x, y]) => `${x},${y}`).join(" ");
    } catch {
      curvePts = null;
    }
  }
  const histMax = Math.max(
    1e-9,
    ...binCounts.flatMap((cs, s) => cs.map((f) => heightOf(f, Math.max(1, summaries[s].n)))),
    curveMax,
  );
  const hTop = 6 + STRIP;
  const yMaxH = histMax * 1.12;
  const hy = (v: number) => axisY - (v / yMaxH) * (axisY - hTop);
  const yTicksH = ticks(0, yMaxH, 4).filter((t) => t <= yMaxH);
  const yTitle = config.density ? (config.relative ? "Relative freq. density" : "Frequency density") : "Frequency";

  const renderHistogram = () => (
    <g>
      {yTicksH.map((t) => (
        <g key={t} pointerEvents="none">
          <line x1={PADL} x2={W - PADR} y1={hy(t)} y2={hy(t)} className={t === 0 ? "stroke-foreground/40" : "stroke-foreground/10"} />
          <text x={PADL - 4} y={hy(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
            {fmt(t, 4)}
          </text>
        </g>
      ))}
      <text transform={`translate(9 ${(hTop + axisY) / 2}) rotate(-90)`} textAnchor="middle" className="fill-muted-foreground text-[8.5px]">
        {yTitle}
      </text>
      {binCounts.map((cs, s) =>
        cs.map((f, k) => {
          const h = heightOf(f, Math.max(1, summaries[s].n));
          const x1 = sx(Math.max(range.min, edges[k]));
          const x2 = sx(Math.min(range.max, edges[k + 1]));
          return (
            <g key={`h${s}-${k}`} pointerEvents="none">
              <rect
                x={x1}
                y={hy(h)}
                width={Math.max(0, x2 - x1)}
                height={Math.max(0, axisY - hy(h))}
                className={s === 0 ? "fill-plot/60 stroke-background" : "fill-none stroke-plot-secondary"}
                strokeWidth={s === 0 ? 1 : 2}
              />
              {s === 0 && K <= 16 && f > 0 && (
                <text x={(x1 + x2) / 2} y={hy(h) - 3} textAnchor="middle" className="fill-foreground text-[8.5px] tabular-nums">
                  {f}
                </text>
              )}
            </g>
          );
        }),
      )}
      {curvePts && (
        <polyline
          points={curvePts
            .split(" ")
            .map((pt) => {
              const [x, y] = pt.split(",").map(Number);
              return `${sx(x)},${Math.max(hTop - 4, hy(y))}`;
            })
            .join(" ")}
          className="fill-none stroke-callout-warning"
          strokeWidth={2}
          pointerEvents="none"
        />
      )}
      {markerLayer(s0, 6, axisY, "mh")}
    </g>
  );

  // ---------- ogive ----------
  const yTicksO = ticks(0, Math.max(1, n0), 5).filter((t) => t <= n0);
  const renderOgive = () => {
    const showLess = config.ogiveType !== "more-than";
    const showMore = config.ogiveType !== "less-than";
    const lessPts = edges.map((e, k) => `${sx(e)},${oy(cum[k])}`).join(" ");
    const morePts = edges.map((e, k) => `${sx(e)},${oy(more[k])}`).join(" ");
    const reads = [showLess ? readLess : null, showMore ? readMore : null].filter((v): v is number => v !== null);
    return (
      <g>
        {yTicksO.map((t) => (
          <g key={t} pointerEvents="none">
            <line x1={PADL} x2={W - PADR} y1={oy(t)} y2={oy(t)} className={t === 0 ? "stroke-foreground/40" : "stroke-foreground/10"} />
            <text x={PADL - 4} y={oy(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
              {fmt(t)}
            </text>
          </g>
        ))}
        <text transform={`translate(9 ${(ogTop + axisY) / 2}) rotate(-90)`} textAnchor="middle" className="fill-muted-foreground text-[8.5px]">
          Cumulative frequency
        </text>
        {markerLayer(s0, 6, axisY, "mo")}
        {showLess && (
          <g pointerEvents="none">
            <polyline points={lessPts} className="fill-none stroke-plot" strokeWidth={2} />
            {edges.map((e, k) => (
              <circle key={`l${k}`} cx={sx(e)} cy={oy(cum[k])} r={2.6} className="fill-plot" />
            ))}
          </g>
        )}
        {showMore && (
          <g pointerEvents="none">
            <polyline points={morePts} className="fill-none stroke-plot-secondary" strokeWidth={2} />
            {edges.map((e, k) => (
              <circle key={`m${k}`} cx={sx(e)} cy={oy(more[k])} r={2.6} className="fill-plot-secondary" />
            ))}
          </g>
        )}
        {/* the level line */}
        <g pointerEvents="none">
          <line x1={PADL} x2={W - PADR} y1={oy(lvl)} y2={oy(lvl)} className="stroke-callout-warning" strokeDasharray="5 3" strokeWidth={1.5} />
          <text x={W - PADR} y={oy(lvl) - 4} textAnchor="end" className="fill-callout-warning text-[9px] font-semibold">
            {`cf = ${fmt(lvl, 2)}`}
          </text>
          {reads.map((x, i) =>
            inAxis(x) ? (
              <g key={i}>
                <line x1={sx(x)} x2={sx(x)} y1={oy(lvl)} y2={axisY} className="stroke-callout-warning" strokeDasharray="2 2" />
                <circle cx={sx(x)} cy={oy(lvl)} r={3.5} className="fill-callout-warning" />
              </g>
            ) : null,
          )}
        </g>
        {showLess && showMore && (
          <g className="text-[9px]" pointerEvents="none">
            <rect x={PADL + 6} y={ogTop} width={10} height={3} className="fill-plot" />
            <text x={PADL + 20} y={ogTop + 4} className="fill-foreground">less than</text>
            <rect x={PADL + 6} y={ogTop + 10} width={10} height={3} className="fill-plot-secondary" />
            <text x={PADL + 20} y={ogTop + 14} className="fill-foreground">more than</text>
          </g>
        )}
      </g>
    );
  };

  // ---------- readouts ----------
  const readouts: React.ReactNode[] = [];
  const cLatex = config.centerSlider ? "a" : "\\bar{x}";
  const devSum = shown[0].reduce((s, x) => s + (x - c), 0);
  const absSum = shown[0].reduce((s, x) => s + Math.abs(x - c), 0);
  const sqSum = shown[0].reduce((s, x) => s + (x - c) ** 2, 0);
  if (config.deviations === "bars") {
    readouts.push(
      <span key="dev">
        <Latex latex={`\\sum (x_i - ${cLatex}) = ${fmt(devSum)}`} />
        {!config.centerSlider && <span className="text-muted-foreground"> (green and orange bars cancel)</span>}
      </span>,
    );
  }
  if (config.deviations === "absolute" || config.centerSlider) {
    readouts.push(
      <span key="abs" className="overflow-x-auto">
        <Latex latex={`\\sum |x_i - ${cLatex}| = ${fmt(absSum)}, \\quad \\tfrac{1}{n}\\sum |x_i - ${cLatex}| = ${fmt(absSum / s0.n)}`} />
      </span>,
    );
  }
  if (config.deviations === "squares" || config.centerSlider) {
    readouts.push(
      <span key="sq" className="overflow-x-auto">
        <Latex latex={`\\sum (x_i - ${cLatex})^2 = ${fmt(sqSum)}, \\quad \\tfrac{1}{n}\\sum (x_i - ${cLatex})^2 = ${fmt(sqSum / s0.n)}`} />
        {config.deviations === "squares" && !config.centerSlider && <span className="text-muted-foreground"> = mean square area = σ²</span>}
      </span>,
    );
  }
  if (view === "ogive") {
    const bits: string[] = [];
    if (config.ogiveType !== "more-than" && readLess !== null) bits.push(`\\text{less-than: } x \\approx ${fmt(readLess)}`);
    if (config.ogiveType !== "less-than" && readMore !== null) bits.push(`\\text{more-than: } x \\approx ${fmt(readMore)}`);
    readouts.push(
      <span key="og" className="overflow-x-auto">
        <Latex latex={`\\text{cf} = ${fmt(lvl, 2)}${bits.length ? ":\\quad " + bits.join(",\\quad ") : ""}`} />
        {Math.abs(lvl - n0 / 2) < 1e-9 && <span className="text-muted-foreground"> (n/2: this reading is the median)</span>}
      </span>,
    );
  }
  if (transformed) {
    const b0 = baseSummaries[0];
    readouts.push(
      <span key="tr" className="overflow-x-auto">
        <Latex
          latex={`y = ${fmt(shift)} + ${scale < 0 ? `(${fmt(scale)})` : fmt(scale)}x:\\quad \\bar{y} = ${fmt(shift)} + ${scale < 0 ? `(${fmt(scale)})` : fmt(scale)}(${fmt(b0.mean)}) = ${fmt(s0.mean)},\\quad \\sigma_y = ${fmt(Math.abs(scale))} \\times ${fmt(b0.sd)} = ${fmt(s0.sd)}`}
        />
      </span>,
    );
  }
  if (offAxis > 0) {
    readouts.push(
      <span key="off" className="text-xs text-callout-warning">
        {offAxis} value{offAxis > 1 ? "s are" : " is"} off the axis (still counted in the statistics).
      </span>,
    );
  }

  // ---------- centre mini-chart ----------
  const centerChart = (() => {
    if (!config.centerSlider) return null;
    const useSq = config.deviations === "squares";
    const f = (a: number) => shown[0].reduce((s, x) => s + (useSq ? (x - a) ** 2 : Math.abs(x - a)), 0);
    const pts: [number, number][] = [];
    for (let j = 0; j <= 120; j++) {
      const a = range.min + (span * j) / 120;
      pts.push([a, f(a)]);
    }
    const maxV = Math.max(1e-9, ...pts.map((p) => p[1]));
    const minV = Math.min(...pts.map((p) => p[1]));
    const CH = 84;
    const cy = (v: number) => CH - 8 - ((v - minV) / (maxV - minV || 1)) * (CH - 22);
    return (
      <svg viewBox={`0 0 ${W} ${CH}`} className="w-full rounded-md border bg-background" role="img" aria-label={`Graph of the sum of ${useSq ? "squared" : "absolute"} deviations against a`}>
        <text x={PADL} y={11} className="fill-muted-foreground text-[9px]">
          {useSq ? "Σ(x − a)² as a moves" : "Σ|x − a| as a moves"}
        </text>
        <polyline points={pts.map(([a, v]) => `${sx(a)},${cy(v)}`).join(" ")} className="fill-none stroke-plot" strokeWidth={2} />
        <line x1={sx(center)} x2={sx(center)} y1={14} y2={CH - 4} className="stroke-foreground/40" strokeDasharray="4 3" />
        <circle cx={sx(center)} cy={cy(f(center))} r={4} className="fill-foreground" />
      </svg>
    );
  })();

  const title = config.compareData ? "Two distributions" : "Distribution builder";
  const caption =
    config.caption ??
    (view === "histogram"
      ? config.density
        ? "Each bar's area is its frequency (the number on top): height = frequency ÷ class width."
        : "Change the class width and watch the shape of the same data change."
      : view === "ogive"
        ? "Drag up and down on the graph to move the cumulative-frequency line and read off x."
        : canEdit
          ? "Drag a dot to change a value, tap empty space to add one; select a dot and press Remove (or Delete) to drop it."
          : transformed
            ? "Reset a to 0 and b to 1 to edit the data again. Faint circles show the original values."
            : "Watch the markers as the data change.");

  return (
    <InteractiveFrame title={title}>
      {views.length > 1 && (
        <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="View">
          {views.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-md border px-3 py-1 ${view === v ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {VIEW_LABEL[v]}
            </button>
          ))}
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none rounded-md border bg-background select-none"
        role="group"
        aria-label={`${VIEW_LABEL[view]} of ${nSets > 1 ? `${labels[0]} and ${labels[1]}` : labels[0]}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={PADL} y={panelTops[0] ?? 0} width={W - PADL - PADR} height={panelH} />
          </clipPath>
        </defs>
        {view === "dotplot" && renderDotplot()}
        {view === "boxplot" && renderBoxplot()}
        {view === "histogram" && renderHistogram()}
        {view === "ogive" && renderOgive()}
        {xAxis}
      </svg>

      {nSets > 1 && (
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {labels.slice(0, nSets).map((l, s) => (
            <span key={l} className="flex items-center gap-1.5">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${SET_STYLE[s].swatch}`} /> {l}
              {view === "histogram" && s === 1 ? " (outline)" : ""}
              {view === "ogive" && s === 1 ? " (not plotted)" : ""}
            </span>
          ))}
        </div>
      )}

      {view === "histogram" && config.curveLatex && (
        <p className="overflow-x-auto text-center text-sm">
          <span className="text-callout-warning">Curve: </span>
          <Latex latex={config.curveLatex} />
        </p>
      )}

      {centerChart}

      <div className="space-y-2">
        {view === "histogram" && config.binSlider && (
          <SliderRow label="Width" value={binW} min={config.binSlider.min} max={config.binSlider.max} step={config.binSlider.step} onChange={setBinW} />
        )}
        {view === "ogive" && (
          <>
            <SliderRow label="cf" value={Number(lvl.toFixed(2))} min={0} max={n0} step={0.5} onChange={setLevel} />
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { t: "n/4", v: n0 / 4 },
                { t: "n/2", v: n0 / 2 },
                { t: "3n/4", v: (3 * n0) / 4 },
              ].map((b) => (
                <button key={b.t} type="button" onClick={() => setLevel(b.v)} className="rounded-md border bg-background px-2.5 py-1">
                  {`cf = ${b.t}`}
                </button>
              ))}
            </div>
          </>
        )}
        {config.centerSlider && view === "dotplot" && (
          <SliderRow label={<Latex latex="a" />} value={center} min={range.min} max={range.max} step={snap} onChange={setCenter} />
        )}
        {config.transform?.shift && (
          <SliderRow label={<Latex latex="+\,a" />} value={shift} min={-span} max={span} step={snap} onChange={setShift} />
        )}
        {config.transform?.scale && <SliderRow label={<Latex latex="\times\,b" />} value={scale} min={-2} max={3} step={0.1} onChange={(v) => setScale(Number(v.toFixed(2)))} />}
      </div>

      {(canEdit || transformed) && (
        <div className="flex flex-wrap gap-2 text-sm">
          {canEdit && (view === "dotplot" || view === "boxplot") && (
            <button
              type="button"
              disabled={!selected || sets[selected.s]?.[selected.i] === undefined || sets[selected.s].length <= 1}
              onClick={() => selected && removePoint(selected.s, selected.i)}
              className="rounded-md border bg-background px-3 py-1 disabled:opacity-50"
            >
              Remove selected
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setSets(initialSets.map((d) => [...d]));
              setShift(0);
              setScale(1);
              setSelected(null);
            }}
            className="rounded-md border bg-background px-3 py-1 text-xs"
          >
            Reset
          </button>
        </div>
      )}

      {(stats.length > 0 || readouts.length > 0) && (
        <div className="space-y-2 rounded-md border bg-background p-3 text-sm" aria-live="polite">
          {stats.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {nSets > 1 && (
                  <thead>
                    <tr className="text-xs text-muted-foreground">
                      <th />
                      {labels.slice(0, nSets).map((l) => (
                        <th key={l} className="px-2 text-right font-medium">
                          {l}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  <tr>
                    <td className="py-0.5 pr-2 text-muted-foreground">
                      <Latex latex="n" />
                    </td>
                    {summaries.map((s, i) => (
                      <td key={i} className="px-2 text-right tabular-nums">
                        {s.n}
                      </td>
                    ))}
                  </tr>
                  {stats.map((st) => (
                    <tr key={st}>
                      <td className="py-0.5 pr-2 text-muted-foreground">
                        <Latex latex={STAT_LATEX[st]} />
                      </td>
                      {summaries.map((s, i) => (
                        <td key={i} className="px-2 text-right font-medium tabular-nums">
                          {statValue(st, s)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {readouts.length > 0 && <div className="flex flex-col gap-1.5">{readouts}</div>}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">{caption}</p>
    </InteractiveFrame>
  );
}
