"use client";

import { useState } from "react";
import type { z } from "zod";
import type { unitCircleSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof unitCircleSchema>;

const SIZE = 300;
const C = SIZE / 2;
const R = 110;

/** Normalise into [0, 360) — the coterminal representative. */
function normalise(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function quadrantOf(deg: number): string {
  const a = normalise(deg);
  if (a === 0 || a === 90 || a === 180 || a === 270) return "on an axis";
  if (a < 90) return "I";
  if (a < 180) return "II";
  if (a < 270) return "III";
  return "IV";
}

/** The acute angle between the terminal side and the x-axis. */
function referenceAngle(deg: number): number {
  const a = normalise(deg);
  if (a <= 90) return a;
  if (a <= 180) return 180 - a;
  if (a <= 270) return a - 180;
  return 360 - a;
}

/** Radians as a tidy multiple of pi where one exists, else a decimal. */
function radianLabel(deg: number): string {
  const twelfths = (deg * 12) / 180;
  if (Number.isInteger(twelfths)) {
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
    const g = gcd(twelfths, 12) || 1;
    const num = twelfths / g;
    const den = 12 / g;
    if (num === 0) return "0";
    const top = `${num === 1 ? "" : num === -1 ? "-" : num}\\pi`;
    return den === 1 ? top : `\\frac{${top}}{${den}}`;
  }
  return formatNumber((deg * Math.PI) / 180, 3);
}

export function UnitCircle({ config }: { config: Config }) {
  const [angle, setAngle] = useState(config.initialAngle);

  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const tanDefined = Math.abs(cos) > 1e-9;

  const px = C + R * cos;
  const py = C - R * sin;
  const ref = referenceAngle(angle);

  // Arc from the positive x-axis around to the terminal side. Drawn in
  // whole turns plus a remainder so multiple rotations stay visible.
  const turns = Math.floor(Math.abs(angle) / 360);
  const arcR = 34 + turns * 6;
  const sweep = angle >= 0 ? 0 : 1;
  const largeArc = Math.abs(normalise(angle)) > 180 ? 1 : 0;
  const arcEndX = C + arcR * Math.cos(rad);
  const arcEndY = C - arcR * Math.sin(rad);

  return (
    <InteractiveFrame title="Unit circle">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-sm rounded-md border bg-background"
        role="img"
      >
        <line x1={0} y1={C} x2={SIZE} y2={C} className="stroke-foreground/40" strokeWidth={1} />
        <line x1={C} y1={0} x2={C} y2={SIZE} className="stroke-foreground/40" strokeWidth={1} />
        <circle cx={C} cy={C} r={R} fill="none" className="stroke-plot/50" strokeWidth={1.5} />

        {config.showTriangle && (
          <>
            <line x1={C} y1={C} x2={px} y2={C} className="stroke-callout-info" strokeWidth={2} />
            <line x1={px} y1={C} x2={px} y2={py} className="stroke-callout-tip" strokeWidth={2} />
          </>
        )}

        <path
          d={`M ${C + arcR} ${C} A ${arcR} ${arcR} 0 ${largeArc} ${sweep} ${arcEndX} ${arcEndY}`}
          fill="none"
          className="stroke-callout-warning"
          strokeWidth={2}
        />
        {config.showReferenceAngle && ref > 0.5 && (
          <path
            d={`M ${px > C ? C + 18 : C - 18} ${C} A 18 18 0 0 ${sin > 0 === px > C ? 0 : 1} ${
              C + 18 * Math.cos(rad)
            } ${C - 18 * Math.sin(rad)}`}
            fill="none"
            className="stroke-plot-secondary"
            strokeWidth={2.5}
          />
        )}

        <line x1={C} y1={C} x2={px} y2={py} className="stroke-plot" strokeWidth={2} />
        <circle cx={px} cy={py} r={5} className="fill-plot stroke-plot" strokeWidth={2} />
        {config.showCoordinates && (
          <text
            x={px + (cos >= 0 ? 8 : -8)}
            y={py + (sin >= 0 ? -8 : 16)}
            textAnchor={cos >= 0 ? "start" : "end"}
            className="fill-foreground text-[10px] font-medium"
          >
            ({formatNumber(cos, 3)}, {formatNumber(sin, 3)})
          </text>
        )}
      </svg>

      <SliderRow
        label={<Latex latex="\theta" />}
        value={angle}
        min={config.minAngle}
        max={config.maxAngle}
        step={config.step}
        onChange={setAngle}
        unit="&#176;"
      />

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 rounded-md border bg-background p-3 text-sm">
        <div className="flex justify-between gap-2">
          <Latex latex="\cos\theta = x" />
          <span className="tabular-nums">{formatNumber(cos, 3)}</span>
        </div>
        <div className="flex justify-between gap-2">
          <Latex latex="\sin\theta = y" />
          <span className="tabular-nums">{formatNumber(sin, 3)}</span>
        </div>
        {config.showTangent && (
          <div className="flex justify-between gap-2">
            <Latex latex="\tan\theta = y/x" />
            <span className="tabular-nums">
              {tanDefined ? formatNumber(sin / cos, 3) : "undefined"}
            </span>
          </div>
        )}
        {config.showRadians && (
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">in radians</span>
            <Latex latex={radianLabel(angle)} />
          </div>
        )}
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">quadrant</span>
          <span>{quadrantOf(angle)}</span>
        </div>
        {config.showReferenceAngle && (
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground">reference angle</span>
            <span className="tabular-nums">{formatNumber(ref, 1)}&#176;</span>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <span className="text-muted-foreground">coterminal with</span>
          <span className="tabular-nums">{formatNumber(normalise(angle), 1)}&#176;</span>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          "The blue leg is cos, the green leg is sin, and the point is (cos, sin). Drag past 90°, past 360°, and into negatives."}
      </p>
    </InteractiveFrame>
  );
}
