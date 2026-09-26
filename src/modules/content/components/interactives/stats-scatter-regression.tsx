"use client";

import { useId, useRef, useState } from "react";
import type { z } from "zod";
import type { statsScatterRegressionSchema } from "../../schemas/blocks";
import { fmt, niceStep, snapTo, ticks } from "./stats-math";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof statsScatterRegressionSchema>;
type Pt = { x: number; y: number };
type Drag = { kind: "point"; i: number } | { kind: "handle"; k: 0 | 1 } | null;

const W = 400;
const H = 300;
const PADL = 38;
const PADR = 12;
const PADT = 12;
const PADB = 32;

function bivariate(pts: Pt[]) {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p.x, 0) / n;
  const my = pts.reduce((s, p) => s + p.y, 0) / n;
  let sxx = 0;
  let syy = 0;
  let sxy = 0;
  for (const p of pts) {
    sxx += (p.x - mx) ** 2;
    syy += (p.y - my) ** 2;
    sxy += (p.x - mx) * (p.y - my);
  }
  const varX = sxx / n;
  const varY = syy / n;
  const cov = sxy / n;
  const r = varX > 1e-12 && varY > 1e-12 ? cov / Math.sqrt(varX * varY) : NaN;
  const byx = varX > 1e-12 ? cov / varX : NaN;
  const bxy = varY > 1e-12 ? cov / varY : NaN;
  const a = my - byx * mx;
  return { n, mx, my, varX, varY, cov, r, byx, bxy, a };
}

const sse = (pts: Pt[], m: number, c: number) => pts.reduce((s, p) => s + (p.y - (m * p.x + c)) ** 2, 0);

/** "3 + 0.5x" style, handling signs. */
function lineLatex(lhs: string, slope: number, intercept: number, v = "x") {
  const b = fmt(slope);
  const a = fmt(intercept);
  if (a === "0") return `${lhs} = ${b}${v}`;
  return `${lhs} = ${a} ${slope < 0 ? "-" : "+"} ${fmt(Math.abs(slope))}${v}`;
}

export function StatsScatterRegression({ config }: { config: Config }) {
  const w = config.window;
  const snapX = config.snap ?? niceStep((w.xmax - w.xmin) / 40);
  const snapY = config.snap ?? niceStep((w.ymax - w.ymin) / 40);
  const hx = [w.xmin + 0.15 * (w.xmax - w.xmin), w.xmin + 0.85 * (w.xmax - w.xmin)] as const;

  const [pts, setPts] = useState<Pt[]>(() => config.points.map((p) => ({ ...p })));
  const [line, setLine] = useState(() => (config.userLine ? { ...config.userLine } : null));
  const [revealed, setRevealed] = useState(config.showLeastSquares === "always");
  const [selected, setSelected] = useState<number | null>(null);
  const [drag, setDrag] = useState<Drag>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const clipId = `ssr-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const sx = (x: number) => PADL + ((x - w.xmin) / (w.xmax - w.xmin)) * (W - PADL - PADR);
  const sy = (y: number) => H - PADB - ((y - w.ymin) / (w.ymax - w.ymin)) * (H - PADT - PADB);
  const fromPx = (px: number, py: number): Pt => ({
    x: Math.max(w.xmin, Math.min(w.xmax, snapTo(w.xmin + ((px - PADL) / (W - PADL - PADR)) * (w.xmax - w.xmin), snapX))),
    y: Math.max(w.ymin, Math.min(w.ymax, snapTo(w.ymin + ((H - PADB - py) / (H - PADT - PADB)) * (w.ymax - w.ymin), snapY))),
  });
  const toSvg = (cx: number, cy: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return { x: ((cx - r.left) / r.width) * W, y: ((cy - r.top) / r.height) * H };
  };

  const st = bivariate(pts);
  const lsOk = Number.isFinite(st.byx);
  const lsVisible = config.showLeastSquares !== "hidden" && revealed && lsOk;
  const hideLsNumbers = config.showLeastSquares === "toggle" && !revealed;

  const movePoint = (i: number, p: Pt) => setPts((all) => all.map((q, j) => (j === i ? p : q)));
  const removePoint = (i: number) => {
    if (pts.length <= 2) return;
    setPts((all) => all.filter((_, j) => j !== i));
    setSelected(null);
  };

  const handleY = (k: 0 | 1) => (line ? line.slope * hx[k] + line.intercept : 0);
  const moveHandle = (k: 0 | 1, y: number) => {
    if (!line) return;
    const other = (1 - k) as 0 | 1;
    const xo = hx[other];
    const yo = handleY(other);
    const slope = (y - yo) / (hx[k] - xo);
    setLine({ slope: Number(slope.toFixed(6)), intercept: Number((yo - slope * xo).toFixed(6)) });
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!config.editable || pts.length >= 60) return;
    const p = toSvg(e.clientX, e.clientY);
    if (!p || p.x < PADL || p.x > W - PADR || p.y < PADT || p.y > H - PADB) return;
    const q = fromPx(p.x, p.y);
    const i = pts.length;
    setPts((all) => [...all, q]);
    setSelected(i);
    svgRef.current?.setPointerCapture?.(e.pointerId);
    setDrag({ kind: "point", i });
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    const p = toSvg(e.clientX, e.clientY);
    if (!p) return;
    const q = fromPx(p.x, p.y);
    if (drag.kind === "point") movePoint(drag.i, q);
    else moveHandle(drag.k, q.y);
  };
  const endDrag = () => setDrag(null);

  const pointKeys = (e: React.KeyboardEvent, i: number) => {
    if (!config.editable) return;
    const p = pts[i];
    const d: Record<string, [number, number]> = { ArrowLeft: [-snapX, 0], ArrowRight: [snapX, 0], ArrowUp: [0, snapY], ArrowDown: [0, -snapY] };
    if (d[e.key]) {
      e.preventDefault();
      movePoint(i, {
        x: Math.max(w.xmin, Math.min(w.xmax, snapTo(p.x + d[e.key][0], snapX))),
        y: Math.max(w.ymin, Math.min(w.ymax, snapTo(p.y + d[e.key][1], snapY))),
      });
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      removePoint(i);
    }
  };

  const lineSeg = (m: number, c: number) => ({ x1: sx(w.xmin), y1: sy(m * w.xmin + c), x2: sx(w.xmax), y2: sy(m * w.xmax + c) });

  // ---------- readouts ----------
  const readouts: React.ReactNode[] = [];
  const has = (k: Config["stats"][number]) => config.stats.includes(k);
  if (config.showMeans || config.showCoDeviation) {
    readouts.push(
      <span key="means">
        <Latex latex={`(\\bar{x}, \\bar{y}) = (${fmt(st.mx)},\\ ${fmt(st.my)})`} />
      </span>,
    );
  }
  if (config.showCoDeviation) {
    let pos = 0;
    let neg = 0;
    pts.forEach((p) => {
      const v = (p.x - st.mx) * (p.y - st.my);
      if (v > 0) pos += v;
      else neg += v;
    });
    readouts.push(
      <span key="codev" className="overflow-x-auto">
        <Latex latex={`\\sum (x_i-\\bar{x})(y_i-\\bar{y}) = \\underbrace{${fmt(pos)}}_{\\text{green}} ${neg < 0 ? "-" : "+"} \\underbrace{${fmt(Math.abs(neg))}}_{\\text{orange}} = ${fmt(pos + neg)}`} />
      </span>,
    );
  }
  if (has("cov")) {
    readouts.push(
      <span key="cov" className="overflow-x-auto">
        <Latex latex={`\\operatorname{Cov}(x, y) = \\tfrac{1}{n}\\sum (x_i-\\bar{x})(y_i-\\bar{y}) = ${fmt(st.cov)}`} />
      </span>,
    );
  }
  if (has("r")) {
    readouts.push(
      <span key="r" className="overflow-x-auto font-medium">
        <Latex
          latex={
            Number.isFinite(st.r)
              ? `r = \\frac{\\operatorname{Cov}(x,y)}{\\sigma_x \\sigma_y} = \\frac{${fmt(st.cov)}}{${fmt(Math.sqrt(st.varX))} \\times ${fmt(Math.sqrt(st.varY))}} = ${fmt(st.r)}`
              : `r \\text{ is undefined (one variable does not vary)}`
          }
        />
      </span>,
    );
  }
  if (has("r2")) {
    readouts.push(
      <span key="r2">
        <Latex latex={`r^2 = ${Number.isFinite(st.r) ? fmt(st.r * st.r) : "\\text{—}"}`} />
      </span>,
    );
  }
  if (has("sse") && line) {
    readouts.push(
      <span key="sse" className="overflow-x-auto">
        <Latex latex={`\\text{SSE (your line)} = \\sum (y_i - \\hat{y}_i)^2 = ${fmt(sse(pts, line.slope, line.intercept))}`} />
      </span>,
    );
  }
  if (has("sse") && lsVisible) {
    readouts.push(
      <span key="sse-ls" className="overflow-x-auto">
        <Latex latex={`\\text{SSE (least squares)} = ${fmt(sse(pts, st.byx, st.a))}`} />
        <span className="text-muted-foreground"> (no line does better)</span>
      </span>,
    );
  }
  if ((has("slope") || has("intercept")) && lsOk) {
    if (hideLsNumbers) {
      readouts.push(
        <span key="ls-hidden" className="text-muted-foreground">
          Show the least-squares line to see its slope and intercept.
        </span>,
      );
    } else {
      if (has("slope"))
        readouts.push(
          <span key="slope" className="overflow-x-auto">
            <Latex latex={`b_{yx} = \\frac{\\operatorname{Cov}(x,y)}{\\sigma_x^2} = \\frac{${fmt(st.cov)}}{${fmt(st.varX)}} = ${fmt(st.byx)}`} />
          </span>,
        );
      if (has("intercept"))
        readouts.push(
          <span key="icpt" className="overflow-x-auto">
            <Latex latex={`a = \\bar{y} - b_{yx}\\bar{x} = ${fmt(st.my)} - (${fmt(st.byx)})(${fmt(st.mx)}) = ${fmt(st.a)}`} />
          </span>,
        );
    }
  }
  if (lsVisible) {
    readouts.push(
      <span key="ls-eq" className="overflow-x-auto">
        <span className="text-callout-tip">y on x: </span>
        <Latex latex={lineLatex("\\hat{y}", st.byx, st.a)} />
      </span>,
    );
    if (config.showXonY && Number.isFinite(st.bxy)) {
      readouts.push(
        <span key="xy-eq" className="overflow-x-auto">
          <span className="text-callout-definition">x on y: </span>
          <Latex latex={lineLatex("\\hat{x}", st.bxy, st.mx - st.bxy * st.my, "y")} />
          <span className="text-muted-foreground"> · </span>
          <Latex latex={`b_{yx} \\cdot b_{xy} = ${fmt(st.byx)} \\times ${fmt(st.bxy)} = ${fmt(st.byx * st.bxy)} = r^2`} />
        </span>,
      );
    }
  }
  if (line) {
    readouts.push(
      <span key="user" className="overflow-x-auto">
        <span className="text-callout-warning">Your line: </span>
        <Latex latex={lineLatex("\\hat{y}", line.slope, line.intercept)} />
      </span>,
    );
  }

  const xT = ticks(w.xmin, w.xmax, 6);
  const yT = ticks(w.ymin, w.ymax, 5);
  const caption =
    config.caption ??
    (line
      ? "Drag the two round handles to move your line. Each orange square is a squared residual; make their total (SSE) as small as you can."
      : config.editable
        ? "Drag points, tap empty space to add one, select a point and press Remove (or Delete) to drop it."
        : "Watch how the summary numbers respond to the pattern.");

  return (
    <InteractiveFrame title="Scatter plot and regression">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none rounded-md border bg-background select-none"
        role="group"
        aria-label={`Scatter plot of ${config.yLabel} against ${config.xLabel}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={PADL} y={PADT} width={W - PADL - PADR} height={H - PADT - PADB} />
          </clipPath>
        </defs>
        {/* grid */}
        <g pointerEvents="none">
          {xT.map((t) => (
            <g key={`x${t}`}>
              <line x1={sx(t)} x2={sx(t)} y1={PADT} y2={H - PADB} className="stroke-foreground/10" />
              <text x={sx(t)} y={H - PADB + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
                {fmt(t, 4)}
              </text>
            </g>
          ))}
          {yT.map((t) => (
            <g key={`y${t}`}>
              <line x1={PADL} x2={W - PADR} y1={sy(t)} y2={sy(t)} className="stroke-foreground/10" />
              <text x={PADL - 4} y={sy(t) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
                {fmt(t, 4)}
              </text>
            </g>
          ))}
          <rect x={PADL} y={PADT} width={W - PADL - PADR} height={H - PADT - PADB} className="fill-none stroke-foreground/40" />
          <text x={(PADL + W - PADR) / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {config.xLabel}
          </text>
          <text transform={`translate(9 ${(PADT + H - PADB) / 2}) rotate(-90)`} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {config.yLabel}
          </text>
        </g>

        <g clipPath={`url(#${clipId})`} pointerEvents="none">
          {/* co-deviation rectangles */}
          {config.showCoDeviation &&
            pts.map((p, i) => {
              const v = (p.x - st.mx) * (p.y - st.my);
              const x1 = sx(st.mx);
              const y1 = sy(st.my);
              return (
                <rect
                  key={`cd${i}`}
                  x={Math.min(x1, sx(p.x))}
                  y={Math.min(y1, sy(p.y))}
                  width={Math.abs(sx(p.x) - x1)}
                  height={Math.abs(sy(p.y) - y1)}
                  className={v >= 0 ? "fill-callout-tip/15 stroke-callout-tip/50" : "fill-callout-warning/15 stroke-callout-warning/60"}
                  strokeWidth={0.8}
                />
              );
            })}
          {/* mean cross-hairs */}
          {(config.showMeans || config.showCoDeviation) && (
            <g>
              <line x1={sx(st.mx)} x2={sx(st.mx)} y1={PADT} y2={H - PADB} className="stroke-foreground/60" strokeDasharray="5 3" />
              <line x1={PADL} x2={W - PADR} y1={sy(st.my)} y2={sy(st.my)} className="stroke-foreground/60" strokeDasharray="5 3" />
              <text x={sx(st.mx) + 3} y={PADT + 9} className="fill-foreground text-[9px]">
                x̄
              </text>
              <text x={W - PADR - 3} y={sy(st.my) - 3} textAnchor="end" className="fill-foreground text-[9px]">
                ȳ
              </text>
              {config.showCoDeviation && (
                <g className="text-[11px] font-bold">
                  <text x={W - PADR - 8} y={PADT + 14} textAnchor="end" className="fill-callout-tip">+</text>
                  <text x={PADL + 8} y={H - PADB - 6} className="fill-callout-tip">+</text>
                  <text x={PADL + 8} y={PADT + 14} className="fill-callout-warning">−</text>
                  <text x={W - PADR - 8} y={H - PADB - 6} textAnchor="end" className="fill-callout-warning">−</text>
                </g>
              )}
            </g>
          )}
          {/* residual squares for the user line */}
          {line &&
            pts.map((p, i) => {
              const yh = line.slope * p.x + line.intercept;
              const side = Math.abs(sy(p.y) - sy(yh));
              const x0 = sx(p.x);
              const right = x0 + side <= W - PADR;
              return (
                <g key={`res${i}`}>
                  <rect
                    x={right ? x0 : x0 - side}
                    y={Math.min(sy(p.y), sy(yh))}
                    width={side}
                    height={side}
                    className="fill-callout-warning/15 stroke-callout-warning/60"
                    strokeWidth={0.8}
                  />
                  <line x1={x0} x2={x0} y1={sy(p.y)} y2={sy(yh)} className="stroke-callout-warning" strokeWidth={1.5} />
                </g>
              );
            })}
          {/* least-squares lines */}
          {lsVisible && <line {...lineSeg(st.byx, st.a)} className="stroke-callout-tip" strokeWidth={2.2} />}
          {lsVisible && config.showXonY && Number.isFinite(st.bxy) && (
            Math.abs(st.bxy) > 1e-9 ? (
              <line {...lineSeg(1 / st.bxy, st.my - st.mx / st.bxy)} className="stroke-callout-definition" strokeWidth={2} strokeDasharray="6 3" />
            ) : (
              <line x1={sx(st.mx)} x2={sx(st.mx)} y1={PADT} y2={H - PADB} className="stroke-callout-definition" strokeWidth={2} strokeDasharray="6 3" />
            )
          )}
          {lsVisible && <circle cx={sx(st.mx)} cy={sy(st.my)} r={3.5} className="fill-foreground" />}
          {/* user line */}
          {line && <line {...lineSeg(line.slope, line.intercept)} className="stroke-callout-warning" strokeWidth={2.2} />}
        </g>

        {/* points */}
        {pts.map((p, i) => {
          const sel = selected === i;
          return (
            <g
              key={`p${i}`}
              tabIndex={0}
              role={config.editable ? "slider" : "img"}
              aria-label={`Point (${fmt(p.x)}, ${fmt(p.y)})`}
              aria-valuetext={`(${fmt(p.x)}, ${fmt(p.y)})`}
              onPointerDown={(e) => {
                e.stopPropagation();
                setSelected(i);
                if (!config.editable) return;
                svgRef.current?.setPointerCapture?.(e.pointerId);
                setDrag({ kind: "point", i });
              }}
              onKeyDown={(e) => pointKeys(e, i)}
              onFocus={() => setSelected(i)}
              className={config.editable ? "cursor-move outline-none" : "outline-none"}
            >
              <circle cx={sx(p.x)} cy={sy(p.y)} r={9} className="fill-transparent" />
              <circle cx={sx(p.x)} cy={sy(p.y)} r={4.2} className={`fill-plot ${sel ? "stroke-foreground" : "stroke-background"}`} strokeWidth={sel ? 2 : 1} />
            </g>
          );
        })}

        {/* user-line handles */}
        {line &&
          ([0, 1] as const).map((k) => {
            const y = handleY(k);
            const cy = Math.max(PADT, Math.min(H - PADB, sy(y)));
            return (
              <g
                key={`h${k}`}
                tabIndex={0}
                role="slider"
                aria-label={`Line handle ${k + 1} at x = ${fmt(hx[k])}`}
                aria-valuenow={Number(y.toFixed(3))}
                aria-valuemin={w.ymin}
                aria-valuemax={w.ymax}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  svgRef.current?.setPointerCapture?.(e.pointerId);
                  setDrag({ kind: "handle", k });
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowRight") {
                    e.preventDefault();
                    moveHandle(k, y + snapY);
                  } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    moveHandle(k, y - snapY);
                  }
                }}
                className="cursor-ns-resize outline-none"
              >
                <circle cx={sx(hx[k])} cy={cy} r={12} className="fill-transparent" />
                <circle cx={sx(hx[k])} cy={cy} r={6.5} className="fill-background stroke-callout-warning" strokeWidth={2.5} />
              </g>
            );
          })}
      </svg>

      <div className="flex flex-wrap gap-2 text-sm">
        {config.showLeastSquares === "toggle" && (
          <button
            type="button"
            aria-pressed={revealed}
            onClick={() => setRevealed((v) => !v)}
            className={`rounded-md border px-3 py-1 ${revealed ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
          >
            {revealed ? "Hide least-squares line" : "Show least-squares line"}
          </button>
        )}
        {line && config.showLeastSquares !== "hidden" && lsOk && (
          <button
            type="button"
            onClick={() => {
              setLine({ slope: Number(st.byx.toFixed(6)), intercept: Number(st.a.toFixed(6)) });
              setRevealed(true);
            }}
            className="rounded-md border bg-background px-3 py-1"
          >
            Snap my line to least squares
          </button>
        )}
        {config.editable && (
          <button
            type="button"
            disabled={selected === null || selected >= pts.length || pts.length <= 2}
            onClick={() => selected !== null && removePoint(selected)}
            className="rounded-md border bg-background px-3 py-1 disabled:opacity-50"
          >
            Remove selected
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setPts(config.points.map((p) => ({ ...p })));
            setLine(config.userLine ? { ...config.userLine } : null);
            setRevealed(config.showLeastSquares === "always");
            setSelected(null);
          }}
          className="rounded-md border bg-background px-3 py-1 text-xs"
        >
          Reset
        </button>
      </div>

      {readouts.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
          <span className="text-xs text-muted-foreground">n = {pts.length}</span>
          {readouts}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">{caption}</p>
    </InteractiveFrame>
  );
}
