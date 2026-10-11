"use client";

import { useState } from "react";
import type { z } from "zod";
import { seqFmt, seqMeans } from "../../lib/seq";
import type { seqMeansLabSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof seqMeansLabSchema>;

const DEFAULT_CAPTION =
  "Lay a and b end to end along a diameter. The radius is the AM, the half-chord standing at the join is the GM, and the piece of the radius cut off by the perpendicular from the join is the HM. A radius is the longest half-chord, so AM ≥ GM ≥ HM, with equality only when a = b.";

const W = 400;
const H = 240;
const MARGIN = 20;
const BASE = H - 28;

const num = (v: number) => (Number.isFinite(v) ? seqFmt(v, 3) : "\\text{undefined}");

export function SeqMeansLab({ config }: { config: Config }) {
  const [a, setA] = useState(config.a.initial);
  const [bFree, setBFree] = useState(config.b.initial);
  const sum0 = config.a.initial + config.b.initial;
  const product0 = config.a.initial * config.b.initial;

  // Under a constraint, b follows a.
  const b =
    config.fixed === "sum" ? sum0 - a : config.fixed === "product" ? product0 / a : bFree;
  const aMin = config.a.min;
  const aMax = config.fixed === "sum" ? Math.max(aMin + config.a.step, sum0 - config.b.min) : config.a.max;

  const { am, gm, hm } = seqMeans(a, b);
  const ok = Number.isFinite(am);

  // Geometry, scaled so the diameter a + b spans the drawing width.
  const s = (W - 2 * MARGIN) / (a + b);
  const xP = MARGIN;
  const xC = MARGIN + a * s;
  const xO = MARGIN + ((a + b) / 2) * s;
  const xQ = W - MARGIN;
  const R = ((a + b) / 2) * s;
  const yD = BASE - (ok ? gm * s : 0);
  // Foot E of the perpendicular from C onto OD: E = D + (HM / AM)(O − D).
  const t = ok ? hm / am : 0;
  const xE = xC + t * (xO - xC);
  const yE = yD + t * (BASE - yD);
  const arc = `M ${xP} ${BASE} A ${R.toFixed(2)} ${R.toFixed(2)} 0 0 1 ${xQ} ${BASE}`;

  const rel = (x: number, y: number) => (Math.abs(x - y) < 1e-9 ? "=" : "\\ge");
  const equal = Math.abs(a - b) < 1e-9;

  let constraint: React.ReactNode = null;
  if (config.fixed === "sum") {
    constraint = (
      <>
        <Latex latex={`a + b = ${num(sum0)}\\ \\text{(fixed)},\\quad ab = G^2 = ${num(a * b)}`} />
        <p className="mt-1 text-xs text-muted-foreground">
          <Latex latex={`ab \\le \\left(\\tfrac{a+b}{2}\\right)^2 = ${num((sum0 * sum0) / 4)}`} />
          {equal ? " — reached now, at a = b." : " — reached only at a = b."}
        </p>
      </>
    );
  } else if (config.fixed === "product") {
    constraint = (
      <>
        <Latex latex={`ab = ${num(product0)}\\ \\text{(fixed)},\\quad a + b = 2A = ${num(a + b)}`} />
        <p className="mt-1 text-xs text-muted-foreground">
          <Latex latex={`a + b \\ge 2\\sqrt{ab} = ${num(2 * Math.sqrt(product0))}`} />
          {equal ? " — reached now, at a = b." : " — reached only at a = b."}
        </p>
      </>
    );
  }

  return (
    <InteractiveFrame title="AM–GM–HM on a semicircle">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md rounded-md border bg-background" role="img">
        <path d={arc} fill="none" className="stroke-muted-foreground" strokeWidth={1.5} />
        <line x1={xP} y1={BASE} x2={xQ} y2={BASE} className="stroke-foreground/60" strokeWidth={1.2} />
        {/* a and b along the diameter */}
        <line x1={xP} y1={BASE + 8} x2={xC} y2={BASE + 8} className="stroke-plot" strokeWidth={3} />
        <line x1={xC} y1={BASE + 8} x2={xQ} y2={BASE + 8} className="stroke-callout-definition" strokeWidth={3} />
        <text x={(xP + xC) / 2} y={BASE + 22} textAnchor="middle" className="fill-plot text-[11px] font-medium">
          a
        </text>
        <text x={(xC + xQ) / 2} y={BASE + 22} textAnchor="middle" className="fill-callout-definition text-[11px] font-medium">
          b
        </text>
        {ok && (
          <>
            {/* AM: the radius OD */}
            <line x1={xO} y1={BASE} x2={xC} y2={yD} className="stroke-callout-warning" strokeWidth={2.4} />
            {/* GM: the half-chord CD */}
            <line x1={xC} y1={BASE} x2={xC} y2={yD} className="stroke-callout-tip" strokeWidth={2.4} />
            {config.showHm && (
              <>
                <line x1={xC} y1={BASE} x2={xE} y2={yE} className="stroke-muted-foreground" strokeWidth={1.2} strokeDasharray="4 3" />
                <line x1={xC} y1={yD} x2={xE} y2={yE} className="stroke-callout-definition" strokeWidth={3.2} />
              </>
            )}
            <circle cx={xO} cy={BASE} r={3} className="fill-foreground" />
            <circle cx={xC} cy={BASE} r={3} className="fill-foreground" />
            <circle cx={xC} cy={yD} r={3.5} className="fill-foreground" />
            <text x={xO + 4} y={BASE - 4} className="fill-foreground text-[10px]">
              O
            </text>
            <text x={xC - 12} y={BASE - 4} className="fill-foreground text-[10px]">
              C
            </text>
            <text x={xC + 5} y={yD - 6} className="fill-foreground text-[10px]">
              D
            </text>
            {config.showHm && (
              <text x={xE + 5} y={yE + 2} className="fill-foreground text-[10px]">
                E
              </text>
            )}
          </>
        )}
      </svg>
      <p className="text-center text-xs text-muted-foreground">
        <span className="text-callout-warning">OD = AM</span>
        {"   "}
        <span className="text-callout-tip">CD = GM</span>
        {config.showHm && (
          <>
            {"   "}
            <span className="text-callout-definition">DE = HM</span>
          </>
        )}
      </p>

      <SliderRow
        label={<Latex latex="a" />}
        value={a}
        min={aMin}
        max={aMax}
        step={config.a.step}
        onChange={(v) => setA(Math.min(aMax, Math.max(aMin, v)))}
      />
      {config.fixed === "none" ? (
        <SliderRow
          label={<Latex latex="b" />}
          value={bFree}
          min={config.b.min}
          max={config.b.max}
          step={config.b.step}
          onChange={setBFree}
        />
      ) : (
        <p className="text-center text-sm">
          <Latex latex={`b = ${num(b)}`} />
          <span className="text-muted-foreground"> (follows a)</span>
        </p>
      )}

      <div className="grid gap-2 text-sm sm:grid-cols-3">
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Arithmetic mean</p>
          <Latex latex={`A = \\tfrac{a+b}{2} = ${num(am)}`} />
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Geometric mean</p>
          <Latex latex={`G = \\sqrt{ab} = ${num(gm)}`} />
        </div>
        <div className="rounded-md border bg-background p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">Harmonic mean</p>
          <Latex latex={`H = \\tfrac{2ab}{a+b} = ${num(hm)}`} />
        </div>
      </div>
      {ok && (
        <div className="space-y-1 rounded-md border bg-background p-3 text-center text-sm">
          <div className="overflow-x-auto">
            <Latex latex={`${num(am)} ${rel(am, gm)} ${num(gm)} ${rel(gm, hm)} ${num(hm)}`} />
            <span className="text-muted-foreground">{equal ? "  (a = b: all three agree)" : "  (strict, since a ≠ b)"}</span>
          </div>
          <div className="overflow-x-auto">
            <Latex latex={`G^2 = ${num(gm * gm)},\\quad AH = ${num(am * hm)}`} />
          </div>
        </div>
      )}
      {constraint && <div className="rounded-md border bg-background p-3 text-center text-sm">{constraint}</div>}
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION} />
      </p>
    </InteractiveFrame>
  );
}
