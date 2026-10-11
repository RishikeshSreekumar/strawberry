"use client";

import { useState } from "react";
import type { z } from "zod";
import type { tdgDistanceLabSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  add,
  clamp,
  cross,
  dec,
  dist,
  dot,
  evalPlane,
  footOnLine,
  footOnPlane,
  isZero,
  len,
  linePair,
  mul,
  niceDir,
  normalOf,
  numLatex,
  planeLatex,
  planeMeet,
  ptLatex,
  rootLatex,
  sqrtLatex,
  sub,
  symmetricLatex,
  toDeg,
  type Plane,
  type V3,
} from "./tdg-geometry";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof tdgDistanceLabSchema>;
type Mode = Config["mode"];
type InputKey = "p1" | "p2" | "d1" | "d2" | "plane1" | "plane2";

const INPUTS: Record<Mode, { key: InputKey; label: string }[]> = {
  "two-points": [
    { key: "p1", label: "P_1" },
    { key: "p2", label: "P_2" },
  ],
  direction: [{ key: "d1", label: "(a, b, c)" }],
  "two-directions": [
    { key: "d1", label: "\\vec b_1" },
    { key: "d2", label: "\\vec b_2" },
  ],
  "point-line": [
    { key: "p1", label: "P" },
    { key: "p2", label: "A" },
    { key: "d1", label: "\\vec b" },
  ],
  "skew-lines": [
    { key: "p1", label: "A_1" },
    { key: "d1", label: "\\vec b_1" },
    { key: "p2", label: "A_2" },
    { key: "d2", label: "\\vec b_2" },
  ],
  "point-plane": [
    { key: "p1", label: "P" },
    { key: "plane1", label: "(a, b, c, d)" },
  ],
  "two-planes": [
    { key: "plane1", label: "\\Pi_1" },
    { key: "plane2", label: "\\Pi_2" },
  ],
  "line-plane": [
    { key: "p1", label: "A" },
    { key: "d1", label: "\\vec b" },
    { key: "plane1", label: "(a, b, c, d)" },
  ],
};

const TITLES: Record<Mode, string> = {
  "two-points": "Distance between two points",
  direction: "Direction ratios to direction cosines",
  "two-directions": "Angle between two lines",
  "point-line": "Point and line",
  "skew-lines": "Shortest distance between two lines",
  "point-plane": "Point and plane",
  "two-planes": "Two planes",
  "line-plane": "Line and plane",
};

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  "two-points": "Change the coordinates. The distance is Pythagoras on the three projections; each coordinate plane cuts the segment in the ratio of the signed coordinates.",
  direction: "Scale the direction ratios by any non-zero number: the direction cosines do not change (except for an overall sign).",
  "two-directions": "Make the dot product zero for perpendicular lines; make the ratios proportional for parallel ones.",
  "point-line": "The foot is where (P − A)·b = 0; the image is as far beyond the line as P is in front of it.",
  "skew-lines": "Project the join A₁A₂ on the common normal b₁ × b₂. A zero triple product means the lines are coplanar.",
  "point-plane": "The sign of P(x₁, y₁, z₁) says which side; divide by the length of the normal to get the distance.",
  "two-planes": "The angle between the planes is the angle between their normals. Scale one equation until the normals match before comparing constants.",
  "line-plane": "The angle with the plane is the complement of the angle with the normal, so it uses a sine.",
};

const LIMIT = 20;
const W = 300;
const H = 150;

type Step = { key: string; latex: string; note?: string };

function Stepper({
  value,
  editable,
  onChange,
}: {
  value: number;
  editable: boolean;
  onChange: (v: number) => void;
}) {
  if (!editable) {
    return <span className="inline-block min-w-8 text-center tabular-nums">{value}</span>;
  }
  return (
    <span className="inline-flex items-center rounded-md border bg-background">
      <button
        type="button"
        className="px-1.5 text-muted-foreground hover:text-foreground"
        aria-label="decrease"
        onClick={() => onChange(clamp(value - 1, -LIMIT, LIMIT))}
      >
        −
      </button>
      <span className="min-w-7 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className="px-1.5 text-muted-foreground hover:text-foreground"
        aria-label="increase"
        onClick={() => onChange(clamp(value + 1, -LIMIT, LIMIT))}
      >
        +
      </button>
    </span>
  );
}

/** A dial: two rays from a centre with the acute angle θ between them (degrees). */
function AngleDial({ theta, label }: { theta: number; label: string }) {
  const cx = W / 2 - 40;
  const cy = H - 25;
  const r = 110;
  const t = (theta * Math.PI) / 180;
  const arcR = 38;
  const end = [cx + arcR * Math.cos(t), cy - arcR * Math.sin(t)];
  return (
    <g>
      <line x1={cx - 20} y1={cy} x2={cx + r} y2={cy} className="stroke-primary" strokeWidth={2.5} />
      <line x1={cx} y1={cy} x2={cx + r * Math.cos(t)} y2={cy - r * Math.sin(t)} className="stroke-callout-info" strokeWidth={2.5} />
      <path d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 0 ${end[0]} ${end[1]}`} fill="none" className="stroke-callout-warning" strokeWidth={2} />
      <text x={cx + arcR + 8} y={cy - 10} className="fill-foreground text-[12px]">
        {label}
      </text>
    </g>
  );
}

export function TdgDistanceLab({ config }: { config: Config }) {
  const { mode, editable } = config;
  const [vals, setVals] = useState<Record<InputKey, number[]>>(() => ({
    p1: [...config.p1],
    p2: [...config.p2],
    d1: [...config.d1],
    d2: [...config.d2],
    plane1: [...config.plane1],
    plane2: [...config.plane2],
  }));
  const set = (key: InputKey, i: number, v: number) =>
    setVals((prev) => ({ ...prev, [key]: prev[key].map((x, j) => (j === i ? v : x)) }));

  const p1 = vals.p1 as V3;
  const p2 = vals.p2 as V3;
  const d1 = vals.d1 as V3;
  const d2 = vals.d2 as V3;
  const pl1 = vals.plane1 as Plane;
  const pl2 = vals.plane2 as Plane;

  const steps: Step[] = [];
  const say = (key: string, latex: string, note?: string) => steps.push({ key, latex, note });
  let verdict = "";
  let picture: React.ReactNode = null;

  const txt = (x: number, y: number, s: string, cls = "fill-foreground") => (
    <text x={x} y={y} className={`${cls} text-[11px]`} textAnchor="middle">
      {s}
    </text>
  );

  if (mode === "two-points") {
    const dl = sub(p2, p1);
    const sq = dot(dl, dl);
    say("delta", `\\Delta = P_2 - P_1 = ${ptLatex(dl)}`);
    say("d", `P_1P_2 = \\sqrt{${dl.map((v) => `(${numLatex(v)})^2`).join(" + ")}} = ${rootLatex(sq)}`);
    say("mid", `\\text{midpoint } ${ptLatex(mul(0.5, add(p1, p2)))}`);
    const names = ["yz", "zx", "xy"];
    names.forEach((nm, i) => {
      if (Math.abs(p2[i]) < 1e-9) {
        say(`r${i}`, `\\text{${nm}-plane: } P_2 \\text{ lies on it}`);
        return;
      }
      const k = -p1[i] / p2[i];
      const how = Math.abs(k) < 1e-9 ? "at P₁" : k > 0 ? "internally" : "externally";
      say(`r${i}`, `\\text{${nm}-plane divides } P_1P_2 \\text{ in } k : 1,\\ k = -\\frac{${numLatex(p1[i])}}{${numLatex(p2[i])}} = ${numLatex(k)}`, how);
    });
    verdict = sq < 1e-12 ? "The two points coincide." : `Distance ${dec(Math.sqrt(sq))}`;
    const mx = Math.max(1, ...dl.map(Math.abs), Math.sqrt(sq));
    const bw = (v: number) => (Math.abs(v) / mx) * (W - 110);
    const rows: [string, number, string][] = [
      ["|Δx|", dl[0], "fill-callout-info"],
      ["|Δy|", dl[1], "fill-callout-tip"],
      ["|Δz|", dl[2], "fill-callout-warning"],
      ["P₁P₂", Math.sqrt(sq), "fill-primary"],
    ];
    picture = (
      <g>
        {rows.map(([name, v, cls], i) => (
          <g key={name}>
            <text x={8} y={28 + i * 32} className="fill-foreground text-[11px]">
              {name}
            </text>
            <rect x={60} y={16 + i * 32} width={bw(v)} height={16} rx={3} className={cls} opacity={0.75} />
            <text x={66 + bw(v)} y={28 + i * 32} className="fill-muted-foreground text-[11px]">
              {dec(Math.abs(v))}
            </text>
          </g>
        ))}
      </g>
    );
  }

  if (mode === "direction") {
    const r2 = dot(d1, d1);
    if (r2 < 1e-12) {
      say("bad", "(0, 0, 0) \\text{ is not a direction}");
      verdict = "Direction ratios cannot all be zero.";
    } else {
      const r = Math.sqrt(r2);
      say("len", `\\sqrt{a^2 + b^2 + c^2} = ${rootLatex(r2)}`);
      say("dc", `(l, m, n) = \\pm\\left(\\frac{${numLatex(d1[0])}}{${dec(r)}},\\ \\frac{${numLatex(d1[1])}}{${dec(r)}},\\ \\frac{${numLatex(d1[2])}}{${dec(r)}}\\right) = \\pm${ptLatex(d1.map((v) => v / r))}`);
      const angles = d1.map((v) => toDeg(Math.acos(clamp(v / r, -1, 1))));
      say("ang", `\\alpha = ${dec(angles[0], 1)}^\\circ,\\ \\beta = ${dec(angles[1], 1)}^\\circ,\\ \\gamma = ${dec(angles[2], 1)}^\\circ`, "with the + sign");
      say("sum", `l^2 + m^2 + n^2 = 1`, `but α + β + γ = ${dec(angles[0] + angles[1] + angles[2], 1)}°`);
      verdict = "Direction cosines found.";
      const cols = ["fill-callout-info", "fill-callout-tip", "fill-callout-warning"];
      const names = ["l", "m", "n"];
      const zeroX = W / 2;
      const scaleX = (W / 2 - 30);
      picture = (
        <g>
          <line x1={zeroX} y1={8} x2={zeroX} y2={100} className="stroke-foreground/40" strokeWidth={1} />
          {d1.map((v, i) => {
            const c = v / r;
            const w = Math.abs(c) * scaleX;
            return (
              <g key={i}>
                <rect x={c >= 0 ? zeroX : zeroX - w} y={12 + i * 28} width={w} height={16} rx={3} className={cols[i]} opacity={0.75} />
                <text x={14} y={24 + i * 28} className="fill-foreground text-[11px]">
                  {`${names[i]} = ${dec(c, 3)}`}
                </text>
              </g>
            );
          })}
          {d1.map((v, i) => {
            const w = ((v * v) / r2) * (W - 60);
            const x = 30 + (d1.slice(0, i).reduce((sum, u) => sum + u * u, 0) / r2) * (W - 60);
            return <rect key={`s${i}`} x={x} y={112} width={w} height={14} className={cols[i]} opacity={0.75} />;
          })}
          {txt(W / 2, 142, "l² + m² + n² fills the bar exactly")}
        </g>
      );
    }
  }

  if (mode === "two-directions") {
    if (isZero(d1) || isZero(d2)) {
      say("bad", "\\text{a zero vector is not a direction}");
      verdict = "Enter two non-zero direction ratios.";
    } else {
      const dp = dot(d1, d2);
      const cosT = Math.abs(dp) / (len(d1) * len(d2));
      const theta = toDeg(Math.acos(clamp(cosT, 0, 1)));
      say("dot", `a_1a_2 + b_1b_2 + c_1c_2 = ${numLatex(dp)}`);
      say("cos", `\\cos\\theta = \\frac{\\lvert ${numLatex(dp)}\\rvert}{${sqrtLatex(dot(d1, d1))}\\,${sqrtLatex(dot(d2, d2))}} = ${dec(cosT, 4)}`, `θ = ${dec(theta, 1)}°`);
      const parallel = isZero(cross(d1, d2), 1e-9);
      verdict = parallel ? "Proportional ratios: the lines are parallel." : Math.abs(dp) < 1e-9 ? "Dot product zero: the lines are perpendicular." : `The acute angle is ${dec(theta, 1)}°.`;
      picture = <AngleDial theta={theta} label={`θ = ${dec(theta, 1)}°`} />;
    }
  }

  if (mode === "point-line") {
    const f = footOnLine(p1, p2, d1);
    if (!f) {
      say("bad", "\\vec b = \\vec 0 \\text{ is not a direction}");
      verdict = "Enter a non-zero direction.";
    } else {
      const ap = sub(p1, p2);
      say("line", symmetricLatex(p2, d1));
      say("gp", `Q(\\lambda) = ${ptLatex(p2)} + \\lambda${ptLatex(d1)}`);
      say("lam", `(P - Q)\\cdot\\vec b = 0 \\Rightarrow \\lambda = \\frac{(P - A)\\cdot\\vec b}{\\lvert\\vec b\\rvert^2} = \\frac{${numLatex(dot(ap, d1))}}{${numLatex(dot(d1, d1))}} = ${numLatex(f.lambda)}`);
      say("foot", `\\text{foot } F = ${ptLatex(f.foot)}`);
      const dd = dist(p1, f.foot);
      say("dist", `PF = \\frac{\\lvert (P - A)\\times\\vec b\\rvert}{\\lvert\\vec b\\rvert} = ${rootLatex(dd * dd)}`);
      const img = sub(mul(2, f.foot), p1);
      say("img", `\\text{image } P' = 2F - P = ${ptLatex(img)}`);
      verdict = dd < 1e-9 ? "P lies on the line." : `Distance ${dec(dd)}`;
      const along = f.lambda * len(d1);
      const mx = Math.max(1, Math.abs(along), dd);
      const k = 55 / mx;
      const ax = W / 2 - along * k * 0.9;
      const fx = W / 2;
      const cy = H / 2;
      picture = (
        <g>
          <line x1={10} y1={cy} x2={W - 10} y2={cy} className="stroke-primary" strokeWidth={2.5} />
          <line x1={fx} y1={cy - dd * k} x2={fx} y2={cy + dd * k} className="stroke-callout-warning" strokeWidth={1.5} strokeDasharray="4 4" />
          <circle cx={ax} cy={cy} r={4} className="fill-primary" />
          {txt(ax, cy - 10, "A")}
          <circle cx={fx} cy={cy} r={4} className="fill-callout-warning" />
          {txt(fx + 12, cy + 16, "F")}
          <circle cx={fx} cy={cy - dd * k} r={4} className="fill-callout-definition" />
          {txt(fx + 14, cy - dd * k + 4, "P")}
          {dd > 1e-9 && <circle cx={fx} cy={cy + dd * k} r={4} className="fill-callout-definition" opacity={0.6} />}
          {dd > 1e-9 && txt(fx + 14, cy + dd * k + 4, "P'")}
          {txt(W - 20, cy - 8, "L")}
        </g>
      );
    }
  }

  if (mode === "skew-lines") {
    const pair = linePair(p1, d1, p2, d2);
    say("l1", `L_1:\\ ${symmetricLatex(p1, d1)}`);
    say("l2", `L_2:\\ ${symmetricLatex(p2, d2)}`);
    const cy = H / 2;
    if (pair.kind === "degenerate") {
      say("bad", "\\text{a zero direction is not a line}");
      verdict = "Enter non-zero directions.";
    } else if (pair.kind === "coincident") {
      say("same", "\\vec b_1 \\parallel \\vec b_2 \\text{ and } A_2 \\text{ lies on } L_1");
      verdict = "The two lines coincide.";
      picture = <line x1={10} y1={cy} x2={W - 10} y2={cy} className="stroke-primary" strokeWidth={3} />;
    } else {
      const w = sub(p2, p1);
      const n = cross(d1, d2);
      say("w", `\\vec a_2 - \\vec a_1 = ${ptLatex(w)}`);
      if (pair.kind === "parallel") {
        say("par", `\\vec b_1\\times\\vec b_2 = \\vec 0:\\ \\text{parallel}`);
        const wb = cross(w, d1);
        say("d", `d = \\frac{\\lvert(\\vec a_2 - \\vec a_1)\\times\\vec b_1\\rvert}{\\lvert\\vec b_1\\rvert} = \\frac{${sqrtLatex(dot(wb, wb))}}{${sqrtLatex(dot(d1, d1))}} = ${rootLatex(pair.distance ** 2)}`);
        verdict = `Parallel lines, ${dec(pair.distance)} apart.`;
      } else {
        const triple = dot(w, n);
        say("n", `\\vec b_1\\times\\vec b_2 = ${ptLatex(n)},\\ \\lvert\\vec b_1\\times\\vec b_2\\rvert = ${rootLatex(dot(n, n))}`);
        say(
          "det",
          `\\begin{vmatrix} ${w.map(numLatex).join(" & ")} \\\\ ${d1.map(numLatex).join(" & ")} \\\\ ${d2.map(numLatex).join(" & ")} \\end{vmatrix} = ${numLatex(triple)}`,
          "(a₂ − a₁)·(b₁ × b₂)",
        );
        say("sd", `SD = \\frac{\\lvert ${numLatex(triple)}\\rvert}{${sqrtLatex(dot(n, n))}} = ${rootLatex(pair.distance ** 2)}`);
        say("feet", `\\text{feet } ${ptLatex(pair.p)} \\text{ and } ${ptLatex(pair.q)}`, `λ = ${dec(pair.lambda)}, μ = ${dec(pair.mu)}`);
        verdict =
          pair.kind === "intersecting"
            ? `Triple product zero: the lines meet at (${pair.p.map((v) => dec(v)).join(", ")}).`
            : `Skew lines, shortest distance ${dec(pair.distance)}, angle ${dec(pair.angle, 1)}°.`;
      }
      const gap = pair.kind === "intersecting" ? 0 : 70;
      const t = ((pair.kind === "parallel" ? 0 : pair.angle) * Math.PI) / 180;
      const top = cy - gap / 2;
      const bot = cy + gap / 2;
      const r = 110;
      picture = (
        <g>
          <line x1={W / 2 - r} y1={bot} x2={W / 2 + r} y2={bot} className="stroke-primary" strokeWidth={2.5} />
          <line
            x1={W / 2 - r * Math.cos(t)}
            y1={top + (gap === 0 ? r * 0.5 * Math.sin(t) : 0)}
            x2={W / 2 + r * Math.cos(t)}
            y2={top - (gap === 0 ? r * 0.5 * Math.sin(t) : 0)}
            className="stroke-callout-info"
            strokeWidth={2.5}
            opacity={0.9}
          />
          {gap > 0 && <line x1={W / 2} y1={top} x2={W / 2} y2={bot} className="stroke-callout-warning" strokeWidth={2} />}
          {gap > 0 && txt(W / 2 + 34, cy + 4, `SD = ${dec(pair.distance)}`)}
          {txt(W / 2 + r + 10, bot + 4, "L₁")}
          {txt(W / 2 + r + 10, top + 4, "L₂")}
        </g>
      );
    }
  }

  if (mode === "point-plane") {
    const nv = normalOf(pl1);
    say("eq", planeLatex(pl1));
    if (isZero(nv)) {
      say("bad", "a = b = c = 0:\\ \\text{not a plane}");
      verdict = "The normal (a, b, c) cannot be zero.";
    } else {
      const nl = len(nv);
      const vp = evalPlane(pl1, p1);
      const vo = pl1[3];
      say("val", `P(x_1, y_1, z_1) = ${numLatex(vp)},\\quad P(0, 0, 0) = ${numLatex(vo)}`);
      say("dist", `\\text{distance} = \\frac{\\lvert ${numLatex(vp)}\\rvert}{${sqrtLatex(dot(nv, nv))}} = ${rootLatex((vp * vp) / dot(nv, nv))}`);
      const f = footOnPlane(p1, pl1);
      if (f) {
        say("foot", `t = -\\frac{${numLatex(vp)}}{${numLatex(dot(nv, nv))}}:\\ \\text{foot } ${ptLatex(f.foot)}`);
        say("img", `\\text{image } ${ptLatex(sub(mul(2, f.foot), p1))}`, "walk 2t along the normal");
      }
      verdict =
        Math.abs(vp) < 1e-9
          ? "P lies on the plane."
          : Math.abs(vo) < 1e-9
            ? "The plane passes through the origin."
            : vp * vo > 0
              ? "P and the origin are on the same side."
              : "P and the origin are on opposite sides.";
      const sp = vp / nl;
      const so = vo / nl;
      const mx = Math.max(1, Math.abs(sp), Math.abs(so));
      const k = 55 / mx;
      const cy = H / 2;
      const px = W / 2 + 50;
      const ox = W / 2 - 70;
      picture = (
        <g>
          <line x1={10} y1={cy} x2={W - 10} y2={cy} className="stroke-callout-info" strokeWidth={3} />
          {txt(W - 22, cy + 16, "Π")}
          <circle cx={ox} cy={cy - so * k} r={4} className="fill-foreground" />
          {txt(ox - 12, cy - so * k + 4, "O")}
          <line x1={px} y1={cy} x2={px} y2={cy - sp * k} className="stroke-callout-warning" strokeWidth={1.5} strokeDasharray="4 4" />
          <circle cx={px} cy={cy - sp * k} r={4} className="fill-callout-definition" />
          {txt(px + 12, cy - sp * k + 4, "P")}
          <circle cx={px} cy={cy} r={3} className="fill-callout-warning" />
          {Math.abs(sp) > 1e-9 && <circle cx={px} cy={cy + sp * k} r={4} className="fill-callout-definition" opacity={0.5} />}
          {Math.abs(sp) > 1e-9 && txt(px + 14, cy + sp * k + 4, "P'")}
          {txt(px - 40, cy - (sp * k) / 2, dec(Math.abs(sp)))}
        </g>
      );
    }
  }

  if (mode === "two-planes") {
    const n1 = normalOf(pl1);
    const n2 = normalOf(pl2);
    say("e1", `\\Pi_1:\\ ${planeLatex(pl1)}`);
    say("e2", `\\Pi_2:\\ ${planeLatex(pl2)}`);
    if (isZero(n1) || isZero(n2)) {
      say("bad", "\\text{a zero normal does not give a plane}");
      verdict = "Each plane needs a non-zero normal.";
    } else {
      const dp = dot(n1, n2);
      const cosT = Math.abs(dp) / (len(n1) * len(n2));
      const theta = toDeg(Math.acos(clamp(cosT, 0, 1)));
      say("cos", `\\cos\\theta = \\frac{\\lvert ${numLatex(dp)}\\rvert}{${sqrtLatex(dot(n1, n1))}\\,${sqrtLatex(dot(n2, n2))}} = ${dec(cosT, 4)}`, `θ = ${dec(theta, 1)}°`);
      const meet = planeMeet(pl1, pl2);
      if (meet) {
        say("line", `\\text{line of intersection: } ${symmetricLatex(meet.point, niceDir(meet.dir))}`);
        verdict = Math.abs(dp) < 1e-9 ? "Perpendicular planes." : `The planes meet at ${dec(theta, 1)}°.`;
        picture = <AngleDial theta={theta} label={`θ = ${dec(theta, 1)}°`} />;
      } else {
        const k = dp / dot(n1, n1);
        const d2s = pl2[3] / k;
        const gap = Math.abs(pl1[3] - d2s) / len(n1);
        say("scale", `\\Pi_2 \\div ${numLatex(k)}:\\ ${planeLatex([n1[0], n1[1], n1[2], d2s])}`, "match the normals first");
        say("gap", `\\text{distance} = \\frac{\\lvert ${numLatex(pl1[3])} - (${numLatex(d2s)})\\rvert}{${sqrtLatex(dot(n1, n1))}} = ${rootLatex(gap * gap)}`);
        verdict = gap < 1e-9 ? "The two equations describe the same plane." : `Parallel planes, ${dec(gap)} apart.`;
        const cy = H / 2;
        const g = gap < 1e-9 ? 0 : 60;
        picture = (
          <g>
            <line x1={20} y1={cy + g / 2} x2={W - 20} y2={cy + g / 2} className="stroke-callout-info" strokeWidth={3} />
            <line x1={20} y1={cy - g / 2} x2={W - 20} y2={cy - g / 2} className="stroke-callout-tip" strokeWidth={3} />
            {g > 0 && <line x1={W / 2} y1={cy - g / 2} x2={W / 2} y2={cy + g / 2} className="stroke-callout-warning" strokeWidth={1.5} strokeDasharray="4 4" />}
            {g > 0 && txt(W / 2 + 30, cy + 4, dec(gap))}
          </g>
        );
      }
    }
  }

  if (mode === "line-plane") {
    const nv = normalOf(pl1);
    say("eq", `\\Pi:\\ ${planeLatex(pl1)}`);
    if (isZero(nv) || isZero(d1)) {
      say("bad", "\\text{need a non-zero direction and a non-zero normal}");
      verdict = "Enter a non-zero direction and normal.";
    } else {
      say("line", `L:\\ ${symmetricLatex(p1, d1)}`);
      const bn = dot(d1, nv);
      const sinP = Math.abs(bn) / (len(d1) * len(nv));
      const phi = toDeg(Math.asin(clamp(sinP, 0, 1)));
      say("sin", `\\sin\\phi = \\frac{\\lvert ${numLatex(bn)}\\rvert}{${sqrtLatex(dot(d1, d1))}\\,${sqrtLatex(dot(nv, nv))}} = ${dec(sinP, 4)}`, `φ = ${dec(phi, 1)}°`);
      const va = evalPlane(pl1, p1);
      const cy = H / 2;
      if (Math.abs(bn) < 1e-9) {
        const gap = Math.abs(va) / len(nv);
        say("par", `\\vec b\\cdot\\vec n = 0:\\ P(A) = ${numLatex(va)}`);
        verdict = gap < 1e-9 ? "The line lies in the plane." : `The line is parallel to the plane, ${dec(gap)} away.`;
        const g = gap < 1e-9 ? 0 : 50;
        picture = (
          <g>
            <line x1={10} y1={cy + 20} x2={W - 10} y2={cy + 20} className="stroke-callout-info" strokeWidth={3} />
            <line x1={30} y1={cy + 20 - g} x2={W - 30} y2={cy + 20 - g} className="stroke-primary" strokeWidth={2.5} />
          </g>
        );
      } else {
        const t = -va / bn;
        const M = add(p1, mul(t, d1));
        say("meet", `\\lambda = -\\frac{P(A)}{\\vec b\\cdot\\vec n} = -\\frac{${numLatex(va)}}{${numLatex(bn)}} = ${numLatex(t)}:\\ M = ${ptLatex(M)}`);
        verdict = Math.abs(sinP - 1) < 1e-9 ? `The line is perpendicular to the plane and meets it at (${M.map((v) => dec(v)).join(", ")}).` : `The line meets the plane at ${dec(phi, 1)}°.`;
        const r = 100;
        const pr = (phi * Math.PI) / 180;
        picture = (
          <g>
            <line x1={10} y1={cy + 20} x2={W - 10} y2={cy + 20} className="stroke-callout-info" strokeWidth={3} />
            <line x1={W / 2} y1={cy + 20} x2={W / 2} y2={cy - 60} className="stroke-foreground/40" strokeWidth={1} strokeDasharray="4 4" />
            <line x1={W / 2 - r * Math.cos(pr) * 0.6} y1={cy + 20 + r * Math.sin(pr) * 0.6} x2={W / 2 + r * Math.cos(pr)} y2={cy + 20 - r * Math.sin(pr)} className="stroke-primary" strokeWidth={2.5} />
            <circle cx={W / 2} cy={cy + 20} r={4} className="fill-callout-tip" />
            {txt(W / 2 - 12, cy + 36, "M")}
            {txt(W / 2 + 70, cy + 14, `φ = ${dec(phi, 1)}°`)}
            {txt(W / 2 + 12, cy - 64, "n")}
          </g>
        );
      }
    }
  }

  return (
    <InteractiveFrame title={TITLES[mode]}>
      <div className="space-y-2 text-sm">
        {INPUTS[mode].map(({ key, label }) => (
          <div key={key} className="flex flex-wrap items-center gap-2">
            <span className="w-24 shrink-0">
              <Latex latex={label} />
            </span>
            {vals[key].map((v, i) => (
              <Stepper key={i} value={v} editable={editable} onChange={(nv) => set(key, i, nv)} />
            ))}
          </div>
        ))}
      </div>

      {picture && (
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-sm rounded-md border bg-background" role="img" aria-label={`${TITLES[mode]} schematic`}>
          {picture}
        </svg>
      )}

      <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
        {steps.map((st) => (
          <div key={st.key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="max-w-full overflow-x-auto">
              <Latex latex={st.latex} />
            </span>
            {st.note && <span className="text-xs text-muted-foreground">{st.note}</span>}
          </div>
        ))}
        {verdict && <p className="pt-1 font-medium">{verdict}</p>}
      </div>

      <p className="text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTIONS[mode]} />
      </p>
    </InteractiveFrame>
  );
}
