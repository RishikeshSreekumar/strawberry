"use client";

import { useRef, useState } from "react";
import type { PlotWindow } from "../../schemas/blocks";
import type { C } from "./cq-format";
import { clampCoord, tidy } from "./cq-format";
import { VEC_COLORS, type VecColor } from "./vec-canvas-2d";

/**
 * Shared Argand-plane canvas for the cq interactives: equal-aspect grid,
 * Re/Im axes with sparse tick labels, and draggable handles (pointer and
 * arrow keys) that snap to a grid step. The scene is drawn by the caller
 * with the sx / sy scales.
 */

export const PLANE_W = 360;

export type PlaneScales = {
  W: number;
  H: number;
  /** Pixels per unit. */
  u: number;
  sx: (x: number) => number;
  sy: (y: number) => number;
  /** A complex number to SVG coordinates, clamped to stay finite. */
  pt: (z: C) => [number, number];
};

export function planeScales(win: PlotWindow): PlaneScales {
  const u = PLANE_W / (win.xmax - win.xmin);
  const H = u * (win.ymax - win.ymin);
  const sx = (x: number) => clampCoord((x - win.xmin) * u);
  const sy = (y: number) => clampCoord(H - (y - win.ymin) * u);
  return { W: PLANE_W, H, u, sx, sy, pt: (z) => [sx(z[0]), sy(z[1])] };
}

export type PlaneHandle = {
  id: string;
  pos: C;
  color: VecColor;
  /** Plain-text name for the accessible label, e.g. "z1". */
  name: string;
  hollow?: boolean;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function PlaneCanvas({
  win,
  handles,
  snap,
  onMove,
  ariaLabel,
  children,
}: {
  win: PlotWindow;
  handles: PlaneHandle[];
  snap: number;
  onMove: (id: string, z: C) => void;
  ariaLabel: string;
  children: (s: PlaneScales) => React.ReactNode;
}) {
  const s = planeScales(win);
  const { W, H, u, sx, sy } = s;
  const [dragging, setDragging] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const quantise = (v: number) => tidy(Math.round(v / snap) * snap, 6);
  const move = (id: string, z: C) =>
    onMove(id, [clamp(quantise(z[0]), win.xmin, win.xmax), clamp(quantise(z[1]), win.ymin, win.ymax)]);

  function worldFromEvent(e: React.PointerEvent<SVGSVGElement>): C {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    return [win.xmin + px / u, win.ymin + (H - py) / u];
  }

  const span = Math.max(win.xmax - win.xmin, win.ymax - win.ymin);
  const gridStep = span > 16 ? 2 : 1;
  const labelStep = span > 10 ? 2 * gridStep : gridStep;
  const xs: number[] = [];
  for (let x = Math.ceil(win.xmin / gridStep) * gridStep; x <= win.xmax; x += gridStep) xs.push(x);
  const ys: number[] = [];
  for (let y = Math.ceil(win.ymin / gridStep) * gridStep; y <= win.ymax; y += gridStep) ys.push(y);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${tidy(H, 2)}`}
      className="mx-auto w-full max-w-md select-none rounded-md border bg-background"
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
      {win.ymin <= 0 && win.ymax >= 0 && (
        <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-foreground/40" strokeWidth={1} />
      )}
      {win.xmin <= 0 && win.xmax >= 0 && (
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
            {y === 1 ? "i" : y === -1 ? "-i" : `${y}i`}
          </text>
        ))}
      <text x={W - 4} y={clamp(sy(0) - 5, 10, H - 3)} textAnchor="end" className="fill-muted-foreground text-[9px]">
        Re
      </text>
      <text x={clamp(sx(0) + 5, 3, W - 20)} y={10} className="fill-muted-foreground text-[9px]">
        Im
      </text>

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
              const delta: Record<string, C> = {
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
            <circle
              cx={hx}
              cy={hy}
              r={6.5}
              className={`${h.hollow ? "fill-background" : col.fill} ${col.stroke} stroke-2 opacity-90`}
            />
          </g>
        );
      })}
    </svg>
  );
}

/** A dot (not draggable) at z. */
export function PlaneDot({ s, z, color, r = 4 }: { s: PlaneScales; z: C; color: VecColor; r?: number }) {
  const [x, y] = s.pt(z);
  return <circle cx={x} cy={y} r={r} className={VEC_COLORS[color].fill} />;
}

/** Polyline through complex points (screen-clamped). */
export function PlanePath({
  s,
  pts,
  color,
  closed = false,
  dashed = false,
  width = 2,
  fillOpacity,
}: {
  s: PlaneScales;
  pts: C[];
  color: VecColor;
  closed?: boolean;
  dashed?: boolean;
  width?: number;
  fillOpacity?: number;
}) {
  if (pts.length < 2) return null;
  const d =
    pts
      .map((z, i) => {
        const [x, y] = s.pt(z);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ") + (closed ? " Z" : "");
  const col = VEC_COLORS[color];
  return (
    <path
      d={d}
      className={`${col.stroke} ${fillOpacity ? col.fill : ""}`}
      fill={fillOpacity ? undefined : "none"}
      fillOpacity={fillOpacity}
      strokeWidth={width}
      strokeDasharray={dashed ? "5 4" : undefined}
      strokeLinejoin="round"
    />
  );
}

/**
 * Arc of radius r (units) about centre c from angle t0 to t1 (radians,
 * counter-clockwise when t1 > t0), as a polyline.
 */
export function arcPoints(c: C, r: number, t0: number, t1: number, n = 48): C[] {
  const out: C[] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    out.push([c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]);
  }
  return out;
}

/** One readout row: a label on the left, a value on the right. */
export function ReadoutRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right tabular-nums">{children}</span>
    </div>
  );
}
