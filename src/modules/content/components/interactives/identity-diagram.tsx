"use client";

import { useState } from "react";
import type { z } from "zod";
import type { identityDiagramSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof identityDiagramSchema>;

const W = 400;
const H = 300;
const OX = 40;
const OY = H - 40;
const SCALE = 300;

/**
 * The construction: OP = 1 at angle a+b; Q on the a-ray with PQ perpendicular
 * to it, so OQ = cos b and QP = sin b. Projecting both onto the axes turns
 * the height of P into sin a cos b + cos a sin b, and its horizontal position
 * into cos a cos b - sin a sin b.
 */
export function IdentityDiagram({ config }: { config: Config }) {
  const [alphaDeg, setAlpha] = useState(config.initialAlpha);
  const [betaDeg, setBeta] = useState(config.initialBeta);

  const a = (alphaDeg * Math.PI) / 180;
  const b = (betaDeg * Math.PI) / 180;

  const cosB = Math.cos(b);
  const sinB = Math.sin(b);

  // Q sits on the a-ray at distance cos b; P is one unit out along a+b.
  const Q = { x: cosB * Math.cos(a), y: cosB * Math.sin(a) };
  const P = { x: Math.cos(a + b), y: Math.sin(a + b) };
  const R = { x: Q.x, y: 0 };
  const S = { x: P.x, y: 0 };
  const T = { x: P.x, y: Q.y };

  const px = (p: { x: number; y: number }) => OX + p.x * SCALE;
  const py = (p: { x: number; y: number }) => OY - p.y * SCALE;
  const O = { x: 0, y: 0 };

  const sumSin = Math.sin(a) * cosB + Math.cos(a) * sinB;
  const sumCos = Math.cos(a) * cosB - Math.sin(a) * sinB;

  return (
    <InteractiveFrame title="Angle sum construction">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-md rounded-md border bg-background"
        role="img"
      >
        <line x1={OX} y1={OY} x2={W - 8} y2={OY} className="stroke-foreground/40" />
        <line x1={OX} y1={OY} x2={OX} y2={8} className="stroke-foreground/40" />

        {/* the two rays */}
        <line x1={px(O)} y1={py(O)} x2={px(Q)} y2={py(Q)} className="stroke-callout-info" strokeWidth={2} />
        <line x1={px(O)} y1={py(O)} x2={px(P)} y2={py(P)} className="stroke-plot" strokeWidth={2} />
        {/* the two right triangles */}
        <line x1={px(Q)} y1={py(Q)} x2={px(P)} y2={py(P)} className="stroke-callout-tip" strokeWidth={2} />
        <line x1={px(Q)} y1={py(Q)} x2={px(R)} y2={py(R)} className="stroke-callout-info/70" strokeWidth={1.5} />
        <line x1={px(P)} y1={py(P)} x2={px(S)} y2={py(S)} className="stroke-plot/60" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={px(Q)} y1={py(Q)} x2={px(T)} y2={py(T)} className="stroke-muted-foreground" strokeWidth={1.5} strokeDasharray="4 3" />

        <circle cx={px(P)} cy={py(P)} r={4} className="fill-plot stroke-plot" />
        <circle cx={px(Q)} cy={py(Q)} r={3.5} className="fill-callout-info stroke-callout-info" />

        <text x={px(O) - 12} y={py(O) + 14} className="fill-foreground text-[10px]">O</text>
        <text x={px(P) + 6} y={py(P) - 4} className="fill-foreground text-[10px]">P</text>
        <text x={px(Q) + 6} y={py(Q) + 12} className="fill-foreground text-[10px]">Q</text>
        <text x={px(R) - 4} y={py(R) + 13} className="fill-muted-foreground text-[10px]">R</text>
        <text x={px(S) - 4} y={py(S) + 13} className="fill-muted-foreground text-[10px]">S</text>

        {/* segment labels: each one is a product of two ratios */}
        <text x={(px(O) + px(Q)) / 2 - 30} y={(py(O) + py(Q)) / 2 - 6} className="fill-muted-foreground text-[9px]">
          OQ = cos&#946;
        </text>
        <text x={(px(Q) + px(P)) / 2 + 4} y={(py(Q) + py(P)) / 2 - 4} className="fill-muted-foreground text-[9px]">
          QP = sin&#946;
        </text>
        <text x={px(Q) + 6} y={(py(Q) + py(R)) / 2} className="fill-muted-foreground text-[9px]">
          QR = cos&#946;&#183;sin&#945;
        </text>
        <text x={px(P) + 6} y={(py(P) + py(T)) / 2} className="fill-muted-foreground text-[9px]">
          PT = sin&#946;&#183;cos&#945;
        </text>
        <text x={px(O) + 4} y={py(O) - 6} className="fill-callout-warning text-[9px]">
          &#945; = {formatNumber(alphaDeg, 0)}&#176;, &#946; = {formatNumber(betaDeg, 0)}&#176;
        </text>
      </svg>

      <div className="space-y-2">
        <SliderRow label={<Latex latex="\alpha" />} value={alphaDeg} min={10} max={55} step={1} onChange={setAlpha} unit="&#176;" />
        <SliderRow label={<Latex latex="\beta" />} value={betaDeg} min={10} max={55} step={1} onChange={setBeta} unit="&#176;" />
      </div>

      <div className="space-y-1 rounded-md border bg-background p-3 text-sm">
        {(config.highlight === "sin" || config.highlight === "both") && (
          <div className="flex items-center justify-between gap-3">
            <Latex latex="\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta" />
            <span className="tabular-nums">{formatNumber(sumSin, 3)}</span>
          </div>
        )}
        {(config.highlight === "cos" || config.highlight === "both") && (
          <div className="flex items-center justify-between gap-3">
            <Latex latex="\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta" />
            <span className="tabular-nums">{formatNumber(sumCos, 3)}</span>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "The height of P is QR + PT; its horizontal position is OR minus the width QT. Read the two results straight off the labelled segments."}
      </p>
    </InteractiveFrame>
  );
}
