"use client";

import { useState } from "react";
import type { z } from "zod";
import type { triangleSolverSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof triangleSolverSchema>;

const W = 400;
const H = 260;
const OX = 40;
const OY = H - 40;
const UNIT = 22;

const deg = (r: number) => (r * 180) / Math.PI;

export function TriangleSolver({ config }: { config: Config }) {
  const [b, setB] = useState(config.initialB);
  const [c, setC] = useState(config.initialC);
  const [aSide, setASide] = useState(config.initialA);
  const [angleDeg, setAngle] = useState(config.initialAngle);

  const A = (angleDeg * Math.PI) / 180;
  // Vertex A at the origin, side c along the x-axis, side b at angle A.
  const vC = { x: b * Math.cos(A), y: b * Math.sin(A) };

  const px = (p: { x: number; y: number }) => OX + p.x * UNIT;
  const py = (p: { x: number; y: number }) => OY - p.y * UNIT;

  // SSA: the swung side of length aSide reaches the base where
  // x = b cos A ± sqrt(a² - h²), with h = b sin A the altitude.
  const h = b * Math.sin(A);
  const disc = aSide * aSide - h * h;
  const feet =
    disc < 0
      ? []
      : aSide >= b
        ? [vC.x + Math.sqrt(disc)]
        : [vC.x + Math.sqrt(disc), vC.x - Math.sqrt(disc)].filter((x) => x > 0);

  const sas = (() => {
    const a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A));
    const angleB = Math.asin(Math.min(1, (b * Math.sin(A)) / a));
    const angleC = Math.PI - A - angleB;
    return { a, angleB: deg(angleB), angleC: deg(angleC), area: 0.5 * b * c * Math.sin(A) };
  })();

  const solutionCount = config.mode === "ssa" ? feet.length : 1;

  return (
    <InteractiveFrame title={config.mode === "ssa" ? "Ambiguous case" : "Any triangle"}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md rounded-md border bg-background" role="img">
        <line x1={OX - 10} y1={OY} x2={W - 8} y2={OY} className="stroke-foreground/25" />
        {/* the fixed side b, from A at the given angle */}
        <line x1={px({ x: 0, y: 0 })} y1={py({ x: 0, y: 0 })} x2={px(vC)} y2={py(vC)} className="stroke-plot" strokeWidth={2} />
        {/* altitude from C, the threshold length in the SSA discussion */}
        {config.mode === "ssa" && (
          <line
            x1={px(vC)}
            y1={py(vC)}
            x2={px({ x: vC.x, y: 0 })}
            y2={py({ x: vC.x, y: 0 })}
            className="stroke-muted-foreground"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        )}
        {config.mode === "sas" ? (
          <>
            <line x1={px({ x: 0, y: 0 })} y1={py({ x: 0, y: 0 })} x2={px({ x: c, y: 0 })} y2={py({ x: c, y: 0 })} className="stroke-callout-info" strokeWidth={2} />
            <line x1={px(vC)} y1={py(vC)} x2={px({ x: c, y: 0 })} y2={py({ x: c, y: 0 })} className="stroke-callout-tip" strokeWidth={2} />
            <text x={px({ x: c / 2, y: 0 })} y={OY + 15} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              c = {formatNumber(c, 1)}
            </text>
          </>
        ) : (
          feet.map((fx, i) => (
            <g key={i}>
              <line
                x1={px(vC)}
                y1={py(vC)}
                x2={px({ x: fx, y: 0 })}
                y2={py({ x: fx, y: 0 })}
                className={i === 0 ? "stroke-callout-tip" : "stroke-callout-warning"}
                strokeWidth={2}
              />
              <line
                x1={px({ x: 0, y: 0 })}
                y1={py({ x: 0, y: 0 })}
                x2={px({ x: fx, y: 0 })}
                y2={py({ x: fx, y: 0 })}
                className={i === 0 ? "stroke-callout-tip/50" : "stroke-callout-warning/50"}
                strokeWidth={2}
              />
            </g>
          ))
        )}
        <text x={px({ x: 0, y: 0 }) - 12} y={OY + 15} className="fill-foreground text-[10px]">A</text>
        <text x={px(vC) - 4} y={py(vC) - 6} className="fill-foreground text-[10px]">C</text>
        <text x={px({ x: vC.x / 2, y: vC.y / 2 }) - 34} y={py({ x: vC.x / 2, y: vC.y / 2 })} className="fill-muted-foreground text-[10px]">
          b = {formatNumber(b, 1)}
        </text>
        <path
          d={`M ${OX + 26} ${OY} A 26 26 0 0 0 ${OX + 26 * Math.cos(A)} ${OY - 26 * Math.sin(A)}`}
          fill="none"
          className="stroke-callout-warning"
          strokeWidth={2}
        />
      </svg>

      <div className="space-y-2">
        <SliderRow label={<Latex latex="A" />} value={angleDeg} min={10} max={140} step={1} onChange={setAngle} unit="&#176;" />
        <SliderRow label={<Latex latex="b" />} value={b} min={2} max={10} step={0.5} onChange={setB} />
        {config.mode === "sas" ? (
          <SliderRow label={<Latex latex="c" />} value={c} min={2} max={12} step={0.5} onChange={setC} />
        ) : (
          <SliderRow label={<Latex latex="a" />} value={aSide} min={1} max={12} step={0.5} onChange={setASide} />
        )}
      </div>

      <div className="space-y-1 rounded-md border bg-background p-3 text-sm">
        {config.mode === "sas" ? (
          <>
            <div className="flex justify-between gap-3">
              <Latex latex="a = \sqrt{b^2 + c^2 - 2bc\cos A}" />
              <span className="tabular-nums">{formatNumber(sas.a, 2)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">remaining angles</span>
              <span className="tabular-nums">
                B = {formatNumber(sas.angleB, 1)}&#176;, C = {formatNumber(sas.angleC, 1)}&#176;
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <Latex latex="\text{area} = \tfrac12 bc\sin A" />
              <span className="tabular-nums">{formatNumber(sas.area, 2)}</span>
            </div>
            {config.showLawOfSines && (
              <div className="flex justify-between gap-3">
                <Latex latex="\frac{a}{\sin A} = \frac{b}{\sin B}" />
                <span className="tabular-nums">
                  {formatNumber(sas.a / Math.sin(A), 2)} ={" "}
                  {formatNumber(b / Math.sin((sas.angleB * Math.PI) / 180), 2)}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between gap-3">
              <Latex latex="h = b\sin A" />
              <span className="tabular-nums">{formatNumber(h, 2)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">triangles that fit</span>
              <span className="font-medium">{solutionCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {aSide < h
                ? "a is shorter than the altitude — the side cannot reach the base."
                : aSide >= b
                  ? "a is at least as long as b — the swing reaches the base on one side only."
                  : "h < a < b — the swung side meets the base twice."}
            </p>
          </>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          (config.mode === "ssa"
            ? "Swing side a and watch the number of triangles change from 0 to 2 to 1."
            : "Two sides and the angle between them determine the triangle completely.")}
      </p>
    </InteractiveFrame>
  );
}
