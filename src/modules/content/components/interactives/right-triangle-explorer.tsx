"use client";

import { useState } from "react";
import type { z } from "zod";
import type { rightTriangleExplorerSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof rightTriangleExplorerSchema>;

const W = 400;
const H = 260;
const PAD = 34;

const RATIO_LATEX: Record<"sin" | "cos" | "tan", string> = {
  sin: "\\sin",
  cos: "\\cos",
  tan: "\\tan",
};

const RATIO_WORDS: Record<"sin" | "cos" | "tan", string> = {
  sin: "\\dfrac{\\text{opposite}}{\\text{hypotenuse}}",
  cos: "\\dfrac{\\text{adjacent}}{\\text{hypotenuse}}",
  tan: "\\dfrac{\\text{opposite}}{\\text{adjacent}}",
};

/**
 * Drag the angle and, separately, the size. The side lengths respond to
 * both; the ratios respond only to the angle — which is the whole point
 * of Chapter 0.
 */
export function RightTriangleExplorer({ config }: { config: Config }) {
  const [angle, setAngle] = useState(config.initialAngle);
  const [scale, setScale] = useState(config.initialScale);

  const rad = (angle * Math.PI) / 180;
  const hyp = scale;
  const adj = hyp * Math.cos(rad);
  const opp = hyp * Math.sin(rad);

  const ratioValue = { sin: Math.sin(rad), cos: Math.cos(rad), tan: Math.tan(rad) };

  // Fit the largest triangle in the allowed range, so growing the size
  // slider visibly grows the drawing instead of rescaling the viewport.
  const maxRad = (config.maxAngle * Math.PI) / 180;
  const px = (W - 2 * PAD) / config.maxScale;
  const py = (H - 2 * PAD) / (config.maxScale * Math.sin(maxRad));
  const unitPx = Math.min(px, py);

  const x0 = PAD;
  const y0 = H - PAD;
  const x1 = x0 + adj * unitPx;
  const y1 = y0;
  const x2 = x1;
  const y2 = y0 - opp * unitPx;

  const unit = config.unit ? ` ${config.unit}` : "";

  return (
    <InteractiveFrame title="Right triangle">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-md rounded-md border bg-background"
        role="img"
      >
        {/* the ghost of the largest triangle: same shape, different size */}
        <polygon
          points={`${x0},${y0} ${x0 + config.maxScale * Math.cos(rad) * unitPx},${y0} ${
            x0 + config.maxScale * Math.cos(rad) * unitPx
          },${y0 - config.maxScale * Math.sin(rad) * unitPx}`}
          className="fill-plot/5 stroke-plot/25"
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        <polygon
          points={`${x0},${y0} ${x1},${y1} ${x2},${y2}`}
          className="fill-plot/10 stroke-plot"
          strokeWidth={2}
        />
        {/* right-angle marker at the lower-right vertex */}
        <polyline
          points={`${x1 - 10},${y1} ${x1 - 10},${y1 - 10} ${x1},${y1 - 10}`}
          fill="none"
          className="stroke-foreground/50"
          strokeWidth={1.5}
        />
        {/* angle arc at the origin vertex */}
        <path
          d={`M ${x0 + 30} ${y0} A 30 30 0 0 0 ${x0 + 30 * Math.cos(rad)} ${
            y0 - 30 * Math.sin(rad)
          }`}
          fill="none"
          className="stroke-callout-warning"
          strokeWidth={2}
        />
        <text
          x={x0 + 40}
          y={y0 - 12}
          className="fill-foreground text-[11px] font-medium"
        >
          {formatNumber(angle, 0)}&#176;
        </text>
        {/* side labels */}
        <text
          x={(x0 + x1) / 2}
          y={y0 + 16}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px]"
        >
          adjacent = {formatNumber(adj)}
          {unit}
        </text>
        <text
          x={x1 + 6}
          y={(y1 + y2) / 2}
          className="fill-muted-foreground text-[10px]"
        >
          opposite = {formatNumber(opp)}
          {unit}
        </text>
        <text
          x={(x0 + x2) / 2 - 30}
          y={(y0 + y2) / 2 - 6}
          className="fill-muted-foreground text-[10px]"
        >
          hyp = {formatNumber(hyp)}
          {unit}
        </text>
      </svg>

      <div className="space-y-2">
        <SliderRow
          label={<Latex latex={config.angleLabel} />}
          value={angle}
          min={config.minAngle}
          max={config.maxAngle}
          step={1}
          onChange={setAngle}
          unit="&#176;"
        />
        {config.showScale && (
          <SliderRow
            label="size"
            value={scale}
            min={config.minScale}
            max={config.maxScale}
            step={0.5}
            onChange={setScale}
            unit={config.unit || undefined}
          />
        )}
      </div>

      <div className="space-y-1 rounded-md border bg-background p-3 text-sm">
        {config.ratios.map((r) => (
          <div key={r} className="flex items-center justify-between gap-3">
            <Latex latex={`${RATIO_LATEX[r]} ${config.angleLabel} = ${RATIO_WORDS[r]}`} />
            <span className="tabular-nums">{formatNumber(ratioValue[r], 3)}</span>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "Move the size slider: every length changes, and every ratio stays put. Move the angle: only then do the ratios move."}
      </p>
    </InteractiveFrame>
  );
}
