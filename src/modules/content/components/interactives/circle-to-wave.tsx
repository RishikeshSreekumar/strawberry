"use client";

import { useState } from "react";
import type { z } from "zod";
import type { circleToWaveSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof circleToWaveSchema>;

const H = 220;
const MID = H / 2;
const R = 80;
const CX = 100;
const GRAPH_X = 210;
const GRAPH_W = 260;
const W = GRAPH_X + GRAPH_W + 20;
/** Vertical clip for tangent, which leaves the picture near the asymptotes. */
const CLIP = 2.4;

const FN: Record<Config["fn"], (t: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
};

const LABEL: Record<Config["fn"], string> = {
  sin: "\\sin\\theta",
  cos: "\\cos\\theta",
  tan: "\\tan\\theta",
};

/**
 * The unwrapping picture: the circle's coordinate on the left is carried
 * horizontally to a graph whose x-axis is the angle itself.
 */
export function CircleToWave({ config }: { config: Config }) {
  const [angle, setAngle] = useState(config.initialAngle);

  const value = FN[config.fn](angle);
  const px = CX + R * Math.cos(angle);
  const py = MID - R * Math.sin(angle);

  const tx = (t: number) => GRAPH_X + (t / config.maxRadians) * GRAPH_W;
  const ty = (v: number) => MID - (Math.max(-CLIP, Math.min(CLIP, v)) / CLIP) * (R + 10);

  // Trace up to the current angle, breaking where tangent blows past the clip.
  const steps = 300;
  let path = "";
  let pen = false;
  for (let i = 0; i <= steps; i++) {
    const t = (angle * i) / steps;
    const v = FN[config.fn](t);
    if (!Number.isFinite(v) || Math.abs(v) > CLIP) {
      pen = false;
      continue;
    }
    path += `${pen ? " L" : " M"} ${tx(t).toFixed(2)} ${ty(v).toFixed(2)}`;
    pen = true;
  }

  const heightSource = config.fn === "cos" ? Math.cos(angle) : Math.sin(angle);
  const traceY = ty(value);

  return (
    <InteractiveFrame title="Circle to wave">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-md border bg-background"
        role="img"
      >
        {/* circle side */}
        <line x1={CX - R - 12} y1={MID} x2={CX + R + 12} y2={MID} className="stroke-foreground/40" />
        <line x1={CX} y1={MID - R - 12} x2={CX} y2={MID + R + 12} className="stroke-foreground/40" />
        <circle cx={CX} cy={MID} r={R} fill="none" className="stroke-plot/50" strokeWidth={1.5} />
        <line x1={CX} y1={MID} x2={px} y2={py} className="stroke-plot" strokeWidth={2} />
        <circle cx={px} cy={py} r={4} className="fill-plot stroke-plot" />
        {/* the coordinate being plotted, carried across to the graph */}
        <line
          x1={config.fn === "cos" ? px : px}
          y1={config.fn === "cos" ? MID : py}
          x2={config.fn === "cos" ? px : CX}
          y2={config.fn === "cos" ? py : py}
          className="stroke-callout-tip"
          strokeWidth={2}
        />
        <line
          x1={px}
          y1={py}
          x2={tx(angle)}
          y2={traceY}
          className="stroke-muted-foreground/40"
          strokeWidth={1}
          strokeDasharray="3 3"
        />

        {/* graph side */}
        <line x1={GRAPH_X} y1={MID} x2={GRAPH_X + GRAPH_W} y2={MID} className="stroke-foreground/40" />
        <line x1={GRAPH_X} y1={MID - R - 12} x2={GRAPH_X} y2={MID + R + 12} className="stroke-foreground/40" />
        <path d={path} fill="none" className="stroke-plot" strokeWidth={2} />
        {Number.isFinite(value) && Math.abs(value) <= CLIP && (
          <circle cx={tx(angle)} cy={traceY} r={4} className="fill-plot stroke-plot" />
        )}
        <text x={GRAPH_X + GRAPH_W - 4} y={MID + 14} textAnchor="end" className="fill-muted-foreground text-[9px]">
          &#952;
        </text>
      </svg>

      <SliderRow
        label={<Latex latex="\theta" />}
        value={Number(angle.toFixed(2))}
        min={0}
        max={Number(config.maxRadians.toFixed(2))}
        step={0.05}
        onChange={setAngle}
        unit="rad"
      />

      <div className="flex justify-between rounded-md border bg-background p-3 text-sm">
        <Latex latex={`${LABEL[config.fn]} = `} />
        <span className="tabular-nums">
          {Number.isFinite(value) && Math.abs(value) < 1e6 ? formatNumber(value, 3) : "→ ±∞"}
        </span>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          `Drag the angle: the green segment on the circle is the value being plotted, and the graph records it against θ. Height ${formatNumber(heightSource, 2)}.`}
      </p>
    </InteractiveFrame>
  );
}
