"use client";

import { useState } from "react";
import type { z } from "zod";
import type { conConicExplorerSchema, PlotWindow } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  coneSection,
  dist,
  focusDirectrixCurve,
  focusDirectrixPoint,
  nameByEccentricity,
  num,
  ptLatex,
  type ConeSectionName,
  type P,
} from "./con-geometry";
import { ConCanvas, ConDot, ConLabel, ConLine, ConPath, ConReadout, ConSegment, type ConScales } from "./con-plane";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof conConicExplorerSchema>;
type SliderKey = NonNullable<Config["sliders"]>[number];

const DEFAULT_CAPTION: Record<Config["mode"], string> = {
  "focus-directrix":
    "Slide e. The focus S and the size (semi-latus rectum ℓ) stay put while the curve turns from a circle (e = 0) into an ellipse, a parabola (e = 1) and a hyperbola. For every P on the curve, PS is e times PM.",
  cone: "Tilt the cutting plane. Steeper than the cone's side gives a closed curve, parallel to a side gives a parabola, and steeper than the side still cuts both nappes in a hyperbola. Move the plane through the vertex to see the degenerate sections.",
};

const SECTION_NOTE: Record<ConeSectionName, string> = {
  circle: "β = 90°: the plane is perpendicular to the axis.",
  ellipse: "α < β < 90°: the plane cuts every generator of one nappe.",
  parabola: "β = α: the plane is parallel to one generator.",
  hyperbola: "β < α: the plane cuts both nappes (as β nears α the second cut moves off the picture).",
  point: "Through the vertex with β > α: only the vertex is cut.",
  line: "Through the vertex with β = α: the plane touches the cone along a generator.",
  "pair of lines": "Through the vertex with β < α: two generators are cut.",
};

const NAME_LATEX: Record<string, string> = {
  circle: "\\text{circle}",
  ellipse: "\\text{ellipse}",
  parabola: "\\text{parabola}",
  hyperbola: "\\text{hyperbola}",
};

function FocusDirectrixScene({
  s,
  e,
  l,
  thetaDeg,
  show,
}: {
  s: ConScales;
  e: number;
  l: number;
  thetaDeg: number;
  show: Config["show"];
}) {
  const win = s.win;
  const R = 3 * Math.hypot(win.xmax - win.xmin, win.ymax - win.ymin);
  const pieces = focusDirectrixCurve(e, l, R);
  const P = focusDirectrixPoint(e, l, thetaDeg);
  const S: P = [0, 0];
  const dx = e > 1e-9 ? -l / e : null;
  const conic = e > 1e-9 && Math.abs(e - 1) > 1e-9;
  const x0 = conic ? (e * l) / (1 - e * e) : null;
  const S2: P | null = x0 === null ? null : [2 * x0, 0];
  const dx2 = x0 !== null && dx !== null ? 2 * x0 - dx : null;
  return (
    <>
      {show.includes("directrix") && dx !== null && <ConLine s={s} L={[1, 0, -dx]} color="aux" dashed />}
      {show.includes("second-focus") && dx2 !== null && <ConLine s={s} L={[1, 0, -dx2]} color="aux" dashed opacity={0.6} />}
      {show.includes("latus-rectum") && <ConSegment s={s} p={[0, l]} q={[0, -l]} color="result" width={1.6} />}
      {pieces.map((pts, i) => (
        <ConPath key={i} s={s} pts={pts} color="a" closed={e < 1 && pieces.length === 1 && i === 0} />
      ))}
      {P && show.includes("distances") && (
        <>
          <ConSegment s={s} p={P} q={S} color="b" />
          {dx !== null && <ConSegment s={s} p={P} q={[dx, P[1]]} color="aux" />}
          {dx !== null && <ConDot s={s} p={[dx, P[1]]} color="aux" r={3.5} />}
          {dx !== null && <ConLabel s={s} p={[dx, P[1]]} latex="M" dx={-12} />}
        </>
      )}
      <ConDot s={s} p={S} color="b" r={4.5} />
      <ConLabel s={s} p={S} latex="S" dx={10} dy={12} className="text-callout-info" />
      {show.includes("second-focus") && S2 && (
        <>
          <ConDot s={s} p={S2} color="b" r={4} hollow />
          <ConLabel s={s} p={S2} latex="S'" dx={10} dy={12} className="text-callout-info" />
        </>
      )}
      {show.includes("centre") && x0 !== null && (
        <>
          <ConDot s={s} p={[x0, 0]} color="muted" r={3} />
          <ConLabel s={s} p={[x0, 0]} latex="C" dx={0} dy={12} />
        </>
      )}
      {P && (
        <>
          <ConDot s={s} p={P} color="c" r={5} />
          <ConLabel s={s} p={P} latex="P" className="text-callout-definition" />
        </>
      )}
    </>
  );
}

function FocusDirectrixReadouts({ e, l, thetaDeg }: { e: number; l: number; thetaDeg: number }) {
  const name = nameByEccentricity(e);
  const P = focusDirectrixPoint(e, l, thetaDeg);
  const dx = e > 1e-9 ? -l / e : null;
  const PS = P ? dist(P, [0, 0]) : null;
  const PM = P && dx !== null ? Math.abs(P[0] - dx) : null;
  const farBranch = P !== null && e > 1 && 1 - e * Math.cos((thetaDeg * Math.PI) / 180) < 0;
  return (
    <div className="space-y-1 rounded-md border bg-background p-3">
      <div className="text-center">
        <Latex latex={`e = ${num(e)} \\Rightarrow ${NAME_LATEX[name]}`} />
      </div>
      <ConReadout label="directrix">
        <Latex latex={dx === null ? "\\text{at infinity}" : `x = ${num(dx)}`} />
      </ConReadout>
      <ConReadout label="P">
        <Latex latex={P ? ptLatex(P) : "\\text{at infinity}"} />
      </ConReadout>
      <ConReadout label="PS">
        <Latex latex={PS === null ? "\\infty" : num(PS)} />
      </ConReadout>
      <ConReadout label="PM">
        <Latex latex={PM === null ? (P ? "\\text{no directrix}" : "\\infty") : num(PM)} />
      </ConReadout>
      <div className="pt-1 text-center">
        <Latex
          latex={
            PS !== null && PM !== null && PM > 1e-9
              ? `\\frac{PS}{PM} = ${num(PS / PM)} = e`
              : e < 1e-9
                ? `PS = \\ell = ${num(l)}\\ \\text{always}`
                : "\\text{P has run off to infinity}"
          }
        />
      </div>
      {farBranch && <p className="text-center text-xs text-muted-foreground">P is on the far branch of the hyperbola.</p>}
    </div>
  );
}

/** Side view of the double cone and the cutting plane. */
function ConeScene({ s, alphaDeg, betaDeg, offset }: { s: ConScales; alphaDeg: number; betaDeg: number; offset: number }) {
  const rad = Math.PI / 180;
  const H = 6;
  const ta = Math.tan(alphaDeg * rad);
  const b = betaDeg * rad;
  // The plane's trace: x cos β − y sin β = offset, direction (sin β, cos β).
  const n: P = [Math.cos(b), -Math.sin(b)];
  const foot: P = [offset * n[0], offset * n[1]];
  const d: P = [Math.sin(b), Math.cos(b)];
  const inside: P[][] = [];
  let cur: P[] = [];
  for (let i = 0; i <= 600; i++) {
    const k = -16 + (32 * i) / 600;
    const p: P = [foot[0] + k * d[0], foot[1] + k * d[1]];
    const ok = Math.abs(p[1]) <= H && Math.abs(p[0]) <= Math.abs(p[1]) * ta + 1e-9;
    if (ok) cur.push(p);
    else if (cur.length) {
      inside.push(cur);
      cur = [];
    }
  }
  if (cur.length) inside.push(cur);
  return (
    <>
      <ConSegment s={s} p={[0, -H - 0.3]} q={[0, H + 0.3]} color="muted" dashed width={1} />
      <ConSegment s={s} p={[-H * ta, H]} q={[H * ta, -H]} color="a" />
      <ConSegment s={s} p={[H * ta, H]} q={[-H * ta, -H]} color="a" />
      <ConSegment s={s} p={[-H * ta, H]} q={[H * ta, H]} color="a" width={1} dashed />
      <ConSegment s={s} p={[-H * ta, -H]} q={[H * ta, -H]} color="a" width={1} dashed />
      <ConLine s={s} L={[n[0], n[1], -offset]} color="aux" width={1.4} dashed />
      {inside.map((pts, i) =>
        pts.length > 1 ? (
          <ConPath key={i} s={s} pts={pts} color="c" width={4} />
        ) : (
          <ConDot key={i} s={s} p={pts[0]} color="c" r={4} />
        ),
      )}
      <ConDot s={s} p={[0, 0]} color="muted" r={3} />
      <ConLabel s={s} p={[0, 0]} latex="V" dx={12} dy={0} />
    </>
  );
}

export function ConConicExplorer({ config }: { config: Config }) {
  const [e, setE] = useState(config.e.initial);
  const [l, setL] = useState(config.l.initial);
  const [theta, setTheta] = useState(config.theta.initial);
  const [alpha, setAlpha] = useState(config.alpha.initial);
  const [beta, setBeta] = useState(config.beta.initial);
  const [offset, setOffset] = useState(config.offset.initial);

  const mode = config.mode;
  const sliders: SliderKey[] = config.sliders ?? (mode === "cone" ? ["alpha", "beta", "offset"] : ["e", "theta"]);
  const ranges = { e: config.e, l: config.l, theta: config.theta, alpha: config.alpha, beta: config.beta, offset: config.offset };
  const values = { e, l, theta, alpha, beta, offset };
  const setters = { e: setE, l: setL, theta: setTheta, alpha: setAlpha, beta: setBeta, offset: setOffset };
  const labels: Record<SliderKey, string> = {
    e: "e",
    l: "\\ell",
    theta: "\\theta",
    alpha: "\\alpha",
    beta: "\\beta",
    offset: "d",
  };
  const units: Partial<Record<SliderKey, string>> = { theta: "°", alpha: "°", beta: "°" };

  const section = coneSection(alpha, beta, offset);
  const sectionE = section.e;
  const coneWin: PlotWindow = { xmin: -6, xmax: 6, ymin: -6.5, ymax: 6.5 };
  const curveWin: PlotWindow = config.window;

  return (
    <InteractiveFrame title={mode === "cone" ? "Slicing a double cone" : "Focus, directrix and eccentricity"}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-3">
          {mode === "cone" ? (
            <ConCanvas win={coneWin} axes={false} ariaLabel="Side view of a double cone cut by a plane">
              {(s) => <ConeScene s={s} alphaDeg={alpha} betaDeg={beta} offset={offset} />}
            </ConCanvas>
          ) : (
            <ConCanvas win={curveWin} ariaLabel="A conic drawn from its focus and directrix">
              {(s) => <FocusDirectrixScene s={s} e={e} l={l} thetaDeg={theta} show={config.show} />}
            </ConCanvas>
          )}
          {sliders.map((key) => (
            <SliderRow
              key={key}
              label={<Latex latex={labels[key]} />}
              value={values[key]}
              min={ranges[key].min}
              max={ranges[key].max}
              step={ranges[key].step}
              onChange={setters[key]}
              unit={units[key]}
            />
          ))}
        </div>
        <div className="w-full space-y-2 text-sm sm:w-64">
          {mode === "cone" ? (
            <>
              <div className="space-y-1 rounded-md border bg-background p-3">
                <ConReadout label="semi-vertical angle">
                  <Latex latex={`\\alpha = ${num(alpha)}^\\circ`} />
                </ConReadout>
                <ConReadout label="plane to axis">
                  <Latex latex={`\\beta = ${num(beta)}^\\circ`} />
                </ConReadout>
                <ConReadout label="distance from vertex">
                  <Latex latex={`d = ${num(offset)}`} />
                </ConReadout>
                <div className="pt-1 text-center">
                  <Latex latex={`e = \\frac{\\cos\\beta}{\\cos\\alpha} = ${num(sectionE)}`} />
                </div>
                <p className="text-center font-medium">Section: {section.name}</p>
                <p className="text-center text-xs text-muted-foreground">{SECTION_NOTE[section.name]}</p>
              </div>
              {!section.degenerate && (
                <ConCanvas win={{ xmin: -7, xmax: 9, ymin: -6, ymax: 6 }} ariaLabel="The section drawn from its eccentricity">
                  {(s) => <FocusDirectrixScene s={s} e={sectionE} l={2} thetaDeg={90} show={["directrix"]} />}
                </ConCanvas>
              )}
            </>
          ) : (
            <FocusDirectrixReadouts e={e} l={l} thetaDeg={theta} />
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION[mode]} />
      </p>
    </InteractiveFrame>
  );
}
