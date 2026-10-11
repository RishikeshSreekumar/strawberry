"use client";

import { useState } from "react";
import type { z } from "zod";
import type { slcCircleLabSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  circleCircle,
  circleGeneralLatex,
  circleRelation,
  circleStandardLatex,
  commonTangents,
  deg,
  dist,
  distToLine,
  EPS,
  footOn,
  intersect,
  lineCircle,
  lineLatex,
  lineThrough,
  niceLine,
  num,
  polarLine,
  power,
  ptLatex,
  radicalAxis,
  rootLatex,
  same,
  sub,
  type Circle,
  type Line,
  type P,
} from "./slc-geometry";
import {
  SlcCanvas,
  SlcCircle,
  SlcDot,
  SlcLabel,
  SlcLine,
  SlcReadout,
  SlcSegment,
  type SlcHandle,
  type SlcScales,
} from "./slc-plane";
import type { VecColor } from "./vec-canvas-2d";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof slcCircleLabSchema>;
type Mode = Config["mode"];
type Show = NonNullable<Config["show"]>[number];
type HandleId = "centre" | "p" | "a" | "b" | "centre2" | "centre3";

const DEFAULT_DRAGGABLE: Record<Mode, HandleId[]> = {
  circle: ["centre", "p"],
  line: ["centre", "a", "b"],
  tangents: ["centre", "p"],
  "two-circles": ["centre", "centre2"],
  "three-circles": ["centre", "centre2", "centre3"],
};

const DEFAULT_SHOW: Record<Mode, Show[]> = {
  circle: ["general-form"],
  line: [],
  tangents: ["tangents", "chord-of-contact", "polar", "midpoint-chord"],
  "two-circles": ["common-tangents", "radical-axis"],
  "three-circles": ["radical-axis"],
};

const HANDLE_COLOR: Record<HandleId, VecColor> = {
  centre: "a",
  p: "c",
  a: "aux",
  b: "aux",
  centre2: "b",
  centre3: "result",
};

const NAMES: Record<HandleId, string> = {
  centre: "the centre C",
  p: "P",
  a: "A",
  b: "B",
  centre2: "the second centre",
  centre3: "the third centre",
};

const DEFAULT_CAPTION: Record<Mode, string> = {
  circle:
    "Drag the centre and P, and change the radius. S₁ is negative inside the circle, zero on it and positive outside: it equals CP² − r².",
  line: "Drag the line. It cuts the circle twice, touches it or misses it exactly as its distance from the centre is less than, equal to or more than the radius.",
  tangents:
    "Drag P outside the circle to see both tangents, the tangent length √S₁ and the chord of contact. Drag P inside: the same equation T = 0 now gives the polar, and the chord with midpoint P appears.",
  "two-circles":
    "Drag the second centre towards the first. The number of common tangents falls from 4 to 3, 2, 1 and 0 as d passes r₁ + r₂ and |r₁ − r₂|.",
  "three-circles":
    "Each pair of circles has a radical axis. The three axes always meet at one point, the radical centre (unless the centres are collinear).",
};

const COLORS: VecColor[] = ["a", "b", "result"];

export function SlcCircleLab({ config }: { config: Config }) {
  const mode = config.mode;
  const [C1, setC1] = useState<P>(config.centre);
  const [r1, setR1] = useState(config.radius.initial);
  const [Pt, setP] = useState<P>(config.p);
  const [A, setA] = useState<P>(config.a);
  const [B, setB] = useState<P>(config.b);
  const [C2, setC2] = useState<P>(config.centre2);
  const [r2, setR2] = useState(config.radius2.initial);
  const [C3, setC3] = useState<P>(config.centre3);
  const [r3, setR3] = useState(config.radius3.initial);
  const [theta, setTheta] = useState(45);

  const show = config.show ?? DEFAULT_SHOW[mode];
  const has = (k: Show) => show.includes(k);
  const draggable = config.draggable ?? DEFAULT_DRAGGABLE[mode];
  const pos: Record<HandleId, P> = { centre: C1, p: Pt, a: A, b: B, centre2: C2, centre3: C3 };
  const setters: Record<HandleId, (v: P) => void> = {
    centre: setC1,
    p: setP,
    a: setA,
    b: setB,
    centre2: setC2,
    centre3: setC3,
  };
  const handles: SlcHandle[] = draggable.map((id) => ({ id, pos: pos[id], color: HANDLE_COLOR[id], name: NAMES[id] }));

  const S: Circle = { centre: C1, r: r1 };
  const S2: Circle = { centre: C2, r: r2 };
  const S3: Circle = { centre: C3, r: r3 };

  const readouts: { label: string; latex: string }[] = [];
  let scene: (s: SlcScales) => React.ReactNode = () => null;

  const label = (s: SlcScales, p: P, latex: string, cls: string, dx = 12, dy = -12) => (
    <SlcLabel s={s} p={p} latex={latex} className={cls} dx={dx} dy={dy} />
  );

  // ----------------------------------------------------------------- circle
  if (mode === "circle") {
    const S1 = power(S, Pt);
    const CP = dist(C1, Pt);
    const where = Math.abs(S1) < EPS ? "\\text{on the circle}" : S1 < 0 ? "\\text{inside}" : "\\text{outside}";
    readouts.push(
      { label: "centre, radius", latex: `${ptLatex(C1)},\\ ${num(r1)}` },
      { label: "equation", latex: circleStandardLatex(S) },
    );
    if (has("general-form")) {
      readouts.push(
        { label: "general form", latex: circleGeneralLatex(S) },
        { label: "g, f, c", latex: `${num(-C1[0])},\\ ${num(-C1[1])},\\ ${num(C1[0] ** 2 + C1[1] ** 2 - r1 * r1)}` },
      );
    }
    readouts.push(
      { label: "S₁ at P", latex: `CP^2 - r^2 = ${num(S1)}` },
      { label: "P is", latex: where },
      { label: "CP", latex: rootLatex(CP) },
      { label: "nearest, farthest", latex: `${num(Math.abs(CP - r1))},\\ ${num(CP + r1)}` },
    );
    const t = (theta * Math.PI) / 180;
    const Q: P = [C1[0] + r1 * Math.cos(t), C1[1] + r1 * Math.sin(t)];
    if (has("parametric")) {
      readouts.push({
        label: `point at θ = ${theta}°`,
        latex: `(h + r\\cos\\theta,\\ k + r\\sin\\theta) = ${ptLatex(Q)}`,
      });
    }
    // With a parametric point the normal is drawn at Q on the circle; otherwise through P.
    const normalAtQ = has("parametric");
    const normalFrom = normalAtQ ? Q : Pt;
    const normal = same(C1, normalFrom) ? null : lineThrough(C1, normalFrom);
    const ends = normal ? lineCircle(normal, S) : [];
    if (has("normal")) {
      readouts.push({
        label: normalAtQ ? "normal at Q" : "normal through P",
        latex: normal ? `${lineLatex(normal)} \\ (\\text{through the centre})` : "\\text{P is the centre: every line through it}",
      });
    }
    scene = (s) => (
      <>
        <SlcCircle s={s} centre={C1} r={r1} color="a" fillOpacity={0.05} />
        {has("normal") && normal && <SlcLine s={s} L={normal} color="c" dashed width={1.2} />}
        {has("normal") && ends.map((e, i) => <SlcDot key={`ne${i}`} s={s} p={e} color={i === 0 ? "result" : "aux"} r={3.5} />)}
        <SlcSegment s={s} p={C1} q={Pt} color="muted" dashed width={1.2} />
        {has("parametric") && (
          <>
            <SlcSegment s={s} p={C1} q={Q} color="result" width={1.5} />
            <SlcDot s={s} p={Q} color="result" r={4.5} />
            {label(s, Q, "Q", "text-callout-tip")}
          </>
        )}
        {label(s, C1, "C", "text-primary")}
        {label(s, Pt, "P", "text-callout-definition")}
      </>
    );
  }

  // ------------------------------------------------------------------- line
  if (mode === "line") {
    const L = lineThrough(A, B);
    let pts: P[] = [];
    if (!L) {
      readouts.push({ label: "line", latex: "\\text{A and B coincide: drag them apart}" });
    } else {
      const N = niceLine(L);
      const d = distToLine(N, C1);
      pts = lineCircle(N, S);
      const rel = Math.abs(d - r1) < 1e-9 ? "d = r:\\ \\text{tangent}" : d < r1 ? "d < r:\\ \\text{secant}" : "d > r:\\ \\text{misses}";
      readouts.push(
        { label: "circle", latex: circleStandardLatex(S) },
        { label: "line", latex: lineLatex(N) },
        { label: "d from centre", latex: rootLatex(d) },
        { label: "radius r", latex: num(r1) },
        { label: "verdict", latex: rel },
        { label: "meeting points", latex: String(pts.length) },
      );
      if (pts.length === 2) {
        readouts.push({
          label: "chord length",
          latex: `2\\sqrt{r^2 - d^2} = ${num(2 * Math.sqrt(Math.max(0, r1 * r1 - d * d)))}`,
        });
      }
      pts.forEach((p, i) => readouts.push({ label: `point ${i + 1}`, latex: ptLatex(p) }));
    }
    scene = (s) => {
      if (!L) return <SlcCircle s={s} centre={C1} r={r1} color="a" />;
      const F = footOn(L, C1);
      return (
        <>
          <SlcCircle s={s} centre={C1} r={r1} color="a" fillOpacity={0.05} />
          <SlcLine s={s} L={L} color="aux" />
          <SlcSegment s={s} p={C1} q={F} color="c" dashed width={1.5} />
          <SlcDot s={s} p={F} color="c" r={3} />
          {pts.length === 2 && <SlcSegment s={s} p={pts[0]} q={pts[1]} color="result" width={3} />}
          {pts.map((p, i) => (
            <SlcDot key={`lp${i}`} s={s} p={p} color="result" r={4} />
          ))}
          {label(s, C1, "C", "text-primary")}
          {label(s, A, "A", "text-callout-warning")}
          {label(s, B, "B", "text-callout-warning")}
        </>
      );
    };
  }

  // --------------------------------------------------------------- tangents
  if (mode === "tangents") {
    const S1 = power(S, Pt);
    const CP = dist(C1, Pt);
    const T = polarLine(S, Pt);
    const outside = S1 > EPS;
    const onCircle = Math.abs(S1) < EPS;
    let touch: P[] = [];
    readouts.push(
      { label: "circle", latex: circleGeneralLatex(S) },
      { label: "P", latex: ptLatex(Pt) },
      {
        label: "S₁",
        latex: `${num(S1)}\\ (${onCircle ? "\\text{on}" : outside ? "\\text{outside}" : "\\text{inside}"})`,
      },
    );
    if (outside) {
      const beta = Math.atan2(Pt[1] - C1[1], Pt[0] - C1[0]);
      const phi = Math.acos(Math.min(1, r1 / CP));
      touch = [beta + phi, beta - phi].map((t) => [C1[0] + r1 * Math.cos(t), C1[1] + r1 * Math.sin(t)] as P);
      const Lt = Math.sqrt(S1);
      readouts.push(
        { label: "tangent length", latex: `\\sqrt{S_1} = ${rootLatex(Lt)}` },
        { label: "angle between tangents", latex: `2\\sin^{-1}\\tfrac{r}{CP} = ${deg(2 * Math.asin(Math.min(1, r1 / CP)))}^\\circ` },
      );
      if (has("chord-of-contact") && T) {
        readouts.push(
          { label: "chord of contact T = 0", latex: lineLatex(T) },
          {
            label: "its length",
            latex: `\\tfrac{2LR}{\\sqrt{L^2 + R^2}} = ${num((2 * Lt * r1) / Math.sqrt(Lt * Lt + r1 * r1))}`,
          },
        );
      }
    } else if (onCircle) {
      if (T) readouts.push({ label: "tangent at P (T = 0)", latex: lineLatex(T) });
    } else {
      readouts.push({ label: "tangents from P", latex: "\\text{none: P is inside}" });
      if (has("polar")) {
        readouts.push({ label: "polar T = 0", latex: T ? lineLatex(T) : "\\text{none: P is the centre}" });
      }
      if (has("midpoint-chord")) {
        const chord = same(Pt, C1) ? null : lineFromNormal(sub(Pt, C1), Pt);
        readouts.push({
          label: "chord with midpoint P (T = S₁)",
          latex: chord ? lineLatex(chord) : "\\text{every diameter}",
        });
        if (chord) {
          readouts.push({ label: "its length", latex: `2\\sqrt{r^2 - CP^2} = ${num(2 * Math.sqrt(Math.max(0, r1 * r1 - CP * CP)))}` });
        }
      }
    }
    if (has("director-circle")) {
      readouts.push({ label: "director circle radius", latex: `r\\sqrt2 = ${num(r1 * Math.SQRT2)}` });
    }
    scene = (s) => {
      const chord = !outside && !onCircle && !same(Pt, C1) ? lineFromNormal(sub(Pt, C1), Pt) : null;
      const chordPts = chord ? lineCircle(chord, S) : [];
      return (
        <>
          {has("director-circle") && <SlcCircle s={s} centre={C1} r={r1 * Math.SQRT2} color="muted" dashed width={1} />}
          <SlcCircle s={s} centre={C1} r={r1} color="a" fillOpacity={0.05} />
          {outside &&
            has("tangents") &&
            touch.map((q, i) => {
              const L = lineThrough(Pt, q);
              return (
                <g key={`tg${i}`}>
                  {L && <SlcLine s={s} L={L} color="b" width={1.5} />}
                  <SlcSegment s={s} p={C1} q={q} color="muted" dashed width={1} />
                  <SlcDot s={s} p={q} color="b" r={3.5} />
                </g>
              );
            })}
          {outside && has("chord-of-contact") && touch.length === 2 && (
            <SlcSegment s={s} p={touch[0]} q={touch[1]} color="result" width={2.5} />
          )}
          {onCircle && T && <SlcLine s={s} L={T} color="b" width={1.5} />}
          {!outside && !onCircle && has("polar") && T && <SlcLine s={s} L={T} color="aux" dashed width={1.5} />}
          {!outside && !onCircle && has("midpoint-chord") && chordPts.length === 2 && (
            <SlcSegment s={s} p={chordPts[0]} q={chordPts[1]} color="result" width={2.5} />
          )}
          <SlcSegment s={s} p={C1} q={Pt} color="muted" dashed width={1} />
          {label(s, C1, "C", "text-primary")}
          {label(s, Pt, "P", "text-callout-definition")}
        </>
      );
    };
  }

  // ------------------------------------------------------------ two-circles
  if (mode === "two-circles") {
    const d = dist(C1, C2);
    const rel = circleRelation(S, S2);
    const tangents = has("common-tangents") ? commonTangents(S, S2) : [];
    const axis = radicalAxis(S, S2);
    const meet = circleCircle(S, S2);
    readouts.push(
      { label: "S₁ = 0", latex: circleGeneralLatex(S) },
      { label: "S₂ = 0", latex: circleGeneralLatex(S2) },
      { label: "d = C₁C₂", latex: rootLatex(d) },
      { label: "r₁ + r₂, |r₁ − r₂|", latex: `${num(r1 + r2)},\\ ${num(Math.abs(r1 - r2))}` },
      { label: "position", latex: rel.label },
      { label: "common tangents", latex: String(rel.tangents) },
    );
    if (has("radical-axis")) {
      readouts.push({
        label: meet.length === 2 ? "common chord S₁ − S₂ = 0" : "radical axis S₁ − S₂ = 0",
        latex: axis ? lineLatex(axis) : "\\text{none (concentric)}",
      });
      if (meet.length === 2) readouts.push({ label: "chord length", latex: num(dist(meet[0], meet[1])) });
    }
    if (meet.length === 2) {
      const cos = (r1 * r1 + r2 * r2 - d * d) / (2 * r1 * r2);
      readouts.push({ label: "angle of intersection", latex: `${deg(Math.acos(Math.max(-1, Math.min(1, cos))))}^\\circ` });
    }
    if (has("orthogonal")) {
      const k1 = { g: -C1[0], f: -C1[1], c: C1[0] ** 2 + C1[1] ** 2 - r1 * r1 };
      const k2 = { g: -C2[0], f: -C2[1], c: C2[0] ** 2 + C2[1] ** 2 - r2 * r2 };
      const lhs = 2 * k1.g * k2.g + 2 * k1.f * k2.f;
      const rhs = k1.c + k2.c;
      readouts.push(
        { label: "d² vs r₁² + r₂²", latex: `${num(d * d)}\\ \\text{vs}\\ ${num(r1 * r1 + r2 * r2)}` },
        {
          label: "orthogonal?",
          latex: `2g_1g_2 + 2f_1f_2 = ${num(lhs)},\\ c_1 + c_2 = ${num(rhs)}\\ (${Math.abs(lhs - rhs) < 1e-9 ? "\\text{yes}" : "\\text{no}"})`,
        },
      );
    }
    scene = (s) => (
      <>
        <SlcCircle s={s} centre={C1} r={r1} color="a" fillOpacity={0.05} />
        <SlcCircle s={s} centre={C2} r={r2} color="b" fillOpacity={0.05} />
        {tangents.map((t, i) => (
          <SlcLine key={`ct${i}`} s={s} L={t.line} color={t.kind === "direct" ? "result" : "c"} width={1.3} />
        ))}
        {has("radical-axis") && axis && <SlcLine s={s} L={axis} color="aux" dashed width={1.5} />}
        {meet.map((p, i) => (
          <SlcDot key={`m${i}`} s={s} p={p} color="aux" r={3.5} />
        ))}
        <SlcSegment s={s} p={C1} q={C2} color="muted" dashed width={1} />
        <SlcDot s={s} p={C1} color="a" r={2.5} />
        <SlcDot s={s} p={C2} color="b" r={2.5} />
        {label(s, C1, "C_1", "text-primary")}
        {label(s, C2, "C_2", "text-callout-info")}
      </>
    );
  }

  // ---------------------------------------------------------- three-circles
  if (mode === "three-circles") {
    const circles = [S, S2, S3];
    const axes: (Line | null)[] = [radicalAxis(S, S2), radicalAxis(S2, S3), radicalAxis(S3, S)];
    const names = ["S_1 - S_2 = 0", "S_2 - S_3 = 0", "S_3 - S_1 = 0"];
    circles.forEach((c, i) => readouts.push({ label: `S${["₁", "₂", "₃"][i]} = 0`, latex: circleGeneralLatex(c) }));
    axes.forEach((L, i) => readouts.push({ label: names[i].split(" = ")[0].replace(/_(\d)/g, "$1"), latex: L ? lineLatex(L) : "\\text{none (concentric)}" }));
    const RC = axes[0] && axes[1] ? intersect(axes[0], axes[1]) : null;
    const pw = RC ? power(S, RC) : 0;
    readouts.push({
      label: "radical centre",
      latex: RC ? ptLatex(RC) : "\\text{none: the axes are parallel (centres collinear)}",
    });
    if (RC) {
      readouts.push({ label: "power there", latex: `${num(pw)}\\ (\\text{equal for all three})` });
      if (has("orthogonal")) {
        readouts.push({
          label: "orthogonal circle",
          latex: pw > EPS ? `\\text{centre } ${ptLatex(RC)},\\ r = \\sqrt{${num(pw)}} = ${num(Math.sqrt(pw))}` : "\\text{none (power} \\le 0\\text{)}",
        });
      }
    }
    scene = (s) => (
      <>
        {circles.map((c, i) => (
          <SlcCircle key={`c${i}`} s={s} centre={c.centre} r={c.r} color={COLORS[i]} fillOpacity={0.04} />
        ))}
        {has("radical-axis") &&
          axes.map((L, i) => (L ? <SlcLine key={`ax${i}`} s={s} L={L} color="aux" dashed width={1.2} /> : null))}
        {RC && has("orthogonal") && pw > EPS && <SlcCircle s={s} centre={RC} r={Math.sqrt(pw)} color="c" dashed width={1.2} />}
        {RC && (
          <>
            <SlcDot s={s} p={RC} color="c" r={4.5} />
            {label(s, RC, "R", "text-callout-definition")}
          </>
        )}
        {label(s, C1, "C_1", "text-primary")}
        {label(s, C2, "C_2", "text-callout-info")}
        {label(s, C3, "C_3", "text-callout-tip")}
      </>
    );
  }

  const radiusSliders: { key: string; latex: string; value: number; range: Config["radius"]; set: (v: number) => void }[] = [
    { key: "r1", latex: mode === "two-circles" || mode === "three-circles" ? "r_1" : "r", value: r1, range: config.radius, set: setR1 },
  ];
  if (mode === "two-circles" || mode === "three-circles") {
    radiusSliders.push({ key: "r2", latex: "r_2", value: r2, range: config.radius2, set: setR2 });
  }
  if (mode === "three-circles") {
    radiusSliders.push({ key: "r3", latex: "r_3", value: r3, range: config.radius3, set: setR3 });
  }

  return (
    <InteractiveFrame title="Circle lab">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-3">
          <SlcCanvas
            win={config.window}
            handles={handles}
            snap={config.snap}
            onMove={(id, v) => setters[id as HandleId](v)}
            ariaLabel="Coordinate plane with a circle and draggable points"
          >
            {scene}
          </SlcCanvas>
          {radiusSliders.map((r) => (
            <SliderRow
              key={r.key}
              label={<Latex latex={r.latex} />}
              value={r.value}
              min={r.range.min}
              max={r.range.max}
              step={r.range.step}
              onChange={r.set}
            />
          ))}
          {mode === "circle" && has("parametric") && (
            <SliderRow label={<Latex latex="\theta" />} value={theta} min={0} max={360} step={15} onChange={setTheta} unit="°" />
          )}
        </div>
        <div className="w-full space-y-1 rounded-md border bg-background p-3 text-sm sm:w-72">
          {readouts.map((r, i) => (
            <SlcReadout key={`${r.label}-${i}`} label={r.label}>
              <Latex latex={r.latex} />
            </SlcReadout>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION[mode]} />
      </p>
    </InteractiveFrame>
  );
}

/** The line through p with normal vector n. */
function lineFromNormal(n: P, p: P): Line {
  return { a: n[0], b: n[1], c: -(n[0] * p[0] + n[1] * p[1]) };
}

