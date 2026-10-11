"use client";

import { useRef, useState } from "react";
import type { PlotWindow } from "../../schemas/blocks";
import { add, footOn, lineDir, scale, tidy, type Line, type P } from "./con-geometry";
import { SvgLatex, VEC_COLORS, type VecColor } from "./vec-canvas-2d";

/**
 * Shared xy-plane canvas for the con interactives: equal-aspect grid, axes
 * with sparse tick labels and optional draggable handles (pointer and arrow
 * keys, snapped to a grid step). The caller draws the scene in world
 * coordinates with the helpers below.
 */

export const CON_W = 360;

export type ConScales = {
  W: number;
  H: number;
  /** Pixels per unit. */
  u: number;
  win: PlotWindow;
  sx: (x: number) => number;
  sy: (y: number) => number;
  pt: (p: P) => [number, number];
};

const LIMIT = 1e4;
const clampCoord = (v: number) => (Number.isFinite(v) ? Math.max(-LIMIT, Math.min(LIMIT, v)) : 0);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function conScales(win: PlotWindow, width = CON_W): ConScales {
  const u = width / (win.xmax - win.xmin);
  const H = u * (win.ymax - win.ymin);
  const sx = (x: number) => clampCoord((x - win.xmin) * u);
  const sy = (y: number) => clampCoord(H - (y - win.ymin) * u);
  return { W: width, H, u, win, sx, sy, pt: (p) => [sx(p[0]), sy(p[1])] };
}

export type ConHandle = {
  id: string;
  pos: P;
  color: VecColor;
  /** Plain-text name for the accessible label, e.g. "Q". */
  name: string;
};

export function ConCanvas({
  win,
  handles = [],
  snap = 0.5,
  onMove,
  ariaLabel,
  axes = true,
  children,
}: {
  win: PlotWindow;
  handles?: ConHandle[];
  snap?: number;
  onMove?: (id: string, p: P) => void;
  ariaLabel: string;
  /** Draw the grid, axes and tick labels. */
  axes?: boolean;
  children: (s: ConScales) => React.ReactNode;
}) {
  const s = conScales(win);
  const { W, H, u, sx, sy } = s;
  const [dragging, setDragging] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const quantise = (v: number) => tidy(Math.round(v / snap) * snap, 6);
  const move = (id: string, p: P) =>
    onMove?.(id, [clamp(quantise(p[0]), win.xmin, win.xmax), clamp(quantise(p[1]), win.ymin, win.ymax)]);

  function worldFromEvent(e: React.PointerEvent<SVGSVGElement>): P {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    return [win.xmin + px / u, win.ymin + (H - py) / u];
  }

  const span = Math.max(win.xmax - win.xmin, win.ymax - win.ymin);
  const gridStep = span > 16 ? 2 : 1;
  const labelStep = span > 10 ? 2 * gridStep : gridStep;
  const xs: number[] = [];
  const ys: number[] = [];
  if (axes) {
    for (let x = Math.ceil(win.xmin / gridStep) * gridStep; x <= win.xmax; x += gridStep) xs.push(x);
    for (let y = Math.ceil(win.ymin / gridStep) * gridStep; y <= win.ymax; y += gridStep) ys.push(y);
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${tidy(H, 2)}`}
      className="mx-auto w-full max-w-md select-none overflow-hidden rounded-md border bg-background"
      role="group"
      aria-label={ariaLabel}
      onPointerMove={(e) => {
        if (dragging) move(dragging, worldFromEvent(e));
      }}
      onPointerUp={() => setDragging(null)}
      onPointerCancel={() => setDragging(null)}
    >
      {xs.map((x) => (
        <line key={`gx${x}`} x1={sx(x)} y1={0} x2={sx(x)} y2={H} className="stroke-border" strokeWidth={0.6} />
      ))}
      {ys.map((y) => (
        <line key={`gy${y}`} x1={0} y1={sy(y)} x2={W} y2={sy(y)} className="stroke-border" strokeWidth={0.6} />
      ))}
      {axes && win.ymin <= 0 && win.ymax >= 0 && (
        <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-foreground/40" strokeWidth={1} />
      )}
      {axes && win.xmin <= 0 && win.xmax >= 0 && (
        <line x1={sx(0)} y1={0} x2={sx(0)} y2={H} className="stroke-foreground/40" strokeWidth={1} />
      )}
      {xs
        .filter((x) => x !== 0 && x % labelStep === 0)
        .map((x) => (
          <text
            key={`tx${x}`}
            x={sx(x)}
            y={clamp(sy(0) + 12, 10, H - 3)}
            textAnchor="middle"
            className="fill-muted-foreground text-[9px]"
          >
            {x}
          </text>
        ))}
      {ys
        .filter((y) => y !== 0 && y % labelStep === 0)
        .map((y) => (
          <text
            key={`ty${y}`}
            x={clamp(sx(0) - 5, 12, W - 3)}
            y={sy(y) + 3}
            textAnchor="end"
            className="fill-muted-foreground text-[9px]"
          >
            {y}
          </text>
        ))}
      {axes && (
        <>
          <text x={W - 4} y={clamp(sy(0) - 5, 10, H - 3)} textAnchor="end" className="fill-muted-foreground text-[9px] italic">
            x
          </text>
          <text x={clamp(sx(0) + 5, 3, W - 20)} y={10} className="fill-muted-foreground text-[9px] italic">
            y
          </text>
        </>
      )}

      {children(s)}

      {handles.map((h) => {
        const hx = sx(h.pos[0]);
        const hy = sy(h.pos[1]);
        const col = VEC_COLORS[h.color];
        return (
          <g
            key={`h-${h.id}`}
            tabIndex={0}
            role="button"
            aria-label={`Move ${h.name}, now at (${tidy(h.pos[0])}, ${tidy(h.pos[1])}). Use arrow keys.`}
            className={`group outline-none ${dragging === h.id ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ touchAction: "none" }}
            onPointerDown={(e) => {
              e.preventDefault();
              svgRef.current?.setPointerCapture(e.pointerId);
              setDragging(h.id);
            }}
            onKeyDown={(e) => {
              const delta: Record<string, P> = {
                ArrowLeft: [-snap, 0],
                ArrowRight: [snap, 0],
                ArrowUp: [0, snap],
                ArrowDown: [0, -snap],
              };
              const d = delta[e.key];
              if (!d) return;
              e.preventDefault();
              move(h.id, [h.pos[0] + d[0], h.pos[1] + d[1]]);
            }}
          >
            <circle cx={hx} cy={hy} r={16} fill="transparent" />
            <circle
              cx={hx}
              cy={hy}
              r={11}
              fill="none"
              className="stroke-transparent group-focus-visible:stroke-foreground"
              strokeWidth={1.5}
            />
            <circle cx={hx} cy={hy} r={6.5} className={`${col.fill} ${col.stroke} stroke-2 opacity-90`} />
          </g>
        );
      })}
    </svg>
  );
}

/** A dot (not draggable). */
export function ConDot({ s, p, color, r = 4, hollow = false }: { s: ConScales; p: P; color: VecColor; r?: number; hollow?: boolean }) {
  const [x, y] = s.pt(p);
  const col = VEC_COLORS[color];
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      className={hollow ? `fill-background ${col.stroke}` : col.fill}
      strokeWidth={hollow ? 1.8 : undefined}
    />
  );
}

/** A segment from p to q. */
export function ConSegment({
  s,
  p,
  q,
  color,
  dashed = false,
  width = 2,
}: {
  s: ConScales;
  p: P;
  q: P;
  color: VecColor;
  dashed?: boolean;
  width?: number;
}) {
  const [x1, y1] = s.pt(p);
  const [x2, y2] = s.pt(q);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={VEC_COLORS[color].stroke}
      strokeWidth={width}
      strokeDasharray={dashed ? "5 4" : undefined}
      strokeLinecap="round"
    />
  );
}

/** The whole line L across the window. */
export function ConLine({
  s,
  L,
  color,
  dashed = false,
  width = 1.8,
  opacity,
}: {
  s: ConScales;
  L: Line;
  color: VecColor;
  dashed?: boolean;
  width?: number;
  opacity?: number;
}) {
  const { win } = s;
  const centre: P = [(win.xmin + win.xmax) / 2, (win.ymin + win.ymax) / 2];
  const span = Math.hypot(win.xmax - win.xmin, win.ymax - win.ymin);
  const F = footOn(L, centre);
  const u = lineDir(L);
  const [x1, y1] = s.pt(add(F, scale(-span, u)));
  const [x2, y2] = s.pt(add(F, scale(span, u)));
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={VEC_COLORS[color].stroke}
      strokeWidth={width}
      strokeDasharray={dashed ? "6 4" : undefined}
      opacity={opacity}
    />
  );
}

/** Circle with centre and radius in world units. */
export function ConCircle({
  s,
  centre,
  r,
  color,
  dashed = false,
  width = 1.5,
}: {
  s: ConScales;
  centre: P;
  r: number;
  color: VecColor;
  dashed?: boolean;
  width?: number;
}) {
  const [x, y] = s.pt(centre);
  return (
    <circle
      cx={x}
      cy={y}
      r={clampCoord(Math.max(0, r) * s.u)}
      className={VEC_COLORS[color].stroke}
      fill="none"
      strokeWidth={width}
      strokeDasharray={dashed ? "6 4" : undefined}
    />
  );
}

/** Polyline through world points. */
export function ConPath({
  s,
  pts,
  color,
  closed = false,
  dashed = false,
  width = 2.2,
}: {
  s: ConScales;
  pts: P[];
  color: VecColor;
  closed?: boolean;
  dashed?: boolean;
  width?: number;
}) {
  if (pts.length < 2) return null;
  const d =
    pts
      .map((p, i) => {
        const [x, y] = s.pt(p);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ") + (closed ? " Z" : "");
  return (
    <path
      d={d}
      className={VEC_COLORS[color].stroke}
      fill="none"
      strokeWidth={width}
      strokeDasharray={dashed ? "5 4" : undefined}
      strokeLinejoin="round"
    />
  );
}

/** A KaTeX label offset from p by (dx, dy) pixels. */
export function ConLabel({
  s,
  p,
  latex,
  dx = 10,
  dy = -10,
  className,
}: {
  s: ConScales;
  p: P;
  latex: string;
  dx?: number;
  dy?: number;
  className?: string;
}) {
  const [x, y] = s.pt(p);
  return <SvgLatex x={x + dx} y={y + dy} latex={latex} className={className} />;
}

/** One readout row: a label on the left, a value on the right. */
export function ConReadout({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 text-right tabular-nums [overflow-wrap:anywhere]">{children}</span>
    </div>
  );
}
