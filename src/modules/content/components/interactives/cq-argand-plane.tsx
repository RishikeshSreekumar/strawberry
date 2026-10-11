"use client";

import { useState } from "react";
import type { z } from "zod";
import type { cqArgandPlaneSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import {
  angleLatex,
  cabs,
  cadd,
  carg,
  cconj,
  cdiv,
  cfromPolar,
  cmul,
  cscale,
  csub,
  cxLatex,
  degrees,
  modLatex,
  numLatex,
  tidy,
  type C,
} from "./cq-format";
import { arcPoints, PlaneCanvas, PlaneDot, PlanePath, ReadoutRow, type PlaneHandle, type PlaneScales } from "./cq-plane";
import { ArrowSvg, SvgLatex, type VecColor } from "./vec-canvas-2d";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof cqArgandPlaneSchema>;
type Mode = Config["mode"];
type HandleId = "z1" | "z2" | "z3";
type Show = NonNullable<Config["show"]>[number];

const DEFAULT_DRAGGABLE: Record<Mode, HandleId[]> = {
  point: ["z1"],
  sum: ["z1", "z2"],
  product: ["z1", "z2"],
  powers: ["z1"],
  roots: ["z1"],
  rotation: ["z1", "z2", "z3"],
};

const DEFAULT_SHOW: Record<Mode, Show[]> = {
  point: ["conjugate"],
  sum: [],
  product: ["unit-circle"],
  powers: ["unit-circle"],
  roots: ["polygon"],
  rotation: [],
};

const HANDLE_COLOR: Record<HandleId, VecColor> = { z1: "a", z2: "b", z3: "c" };

const DEFAULT_CAPTION: Record<Mode, string> = {
  point:
    "Drag z. Its distance from 0 is the modulus, the angle from the positive real axis is the argument, and the conjugate is its mirror image in the real axis.",
  sum: "Adding complex numbers is adding arrows: z₁ + z₂ is the far corner of the parallelogram. The third side can never beat the other two.",
  product:
    "Multiplying by z₂ scales by |z₂| and rotates by arg z₂: the moduli multiply and the arguments add.",
  powers: "Each power multiplies the modulus by r and adds θ to the angle: inside the unit circle the powers spiral in, outside they spiral out.",
  roots: "The n-th roots share one modulus and are spaced 2π/n apart: the vertices of a regular n-gon.",
  rotation:
    "The ratio (z₃ − z₁)/(z₂ − z₁) carries the triangle's shape at z₁: its modulus is the ratio of the sides, its argument is the angle between them.",
};

/** Arrow from p to q in plane coordinates. */
function Arrow({ s, from, to, color, dashed, width }: { s: PlaneScales; from: C; to: C; color: VecColor; dashed?: boolean; width?: number }) {
  const [x1, y1] = s.pt(from);
  const [x2, y2] = s.pt(to);
  return <ArrowSvg x1={x1} y1={y1} x2={x2} y2={y2} color={color} dashed={dashed} width={width} />;
}

/** A label slightly beyond the tip of z (away from the origin). */
function Label({ s, z, latex, className }: { s: PlaneScales; z: C; latex: string; className?: string }) {
  const r = cabs(z);
  const off: C = r > 1e-9 ? [(z[0] / r) * 0.45, (z[1] / r) * 0.45] : [0.35, 0.35];
  const [x, y] = s.pt(cadd(z, off));
  return <SvgLatex x={x} y={y} latex={latex} className={className} />;
}

/** Arc showing arg z from the positive real axis, radius in plane units. */
function ArgArc({ s, z, radius, color }: { s: PlaneScales; z: C; radius: number; color: VecColor }) {
  const t = carg(z);
  if (t === null || Math.abs(t) < 1e-9) return null;
  return <PlanePath s={s} pts={arcPoints([0, 0], radius, 0, t)} color={color} width={2} />;
}

function polarLatex(z: C): string {
  const t = carg(z);
  if (t === null) return "0";
  return `${modLatex(z).split(" \\approx")[0]}\\left(\\cos ${angleLatex(t)} + i \\sin ${angleLatex(t)}\\right)`;
}

function eulerLatex(z: C): string {
  const t = carg(z);
  if (t === null) return "0";
  const r = modLatex(z).split(" \\approx")[0];
  return `${r === "1" ? "" : r}\\,e^{i${angleLatex(t)}}`;
}

export function CqArgandPlane({ config }: { config: Config }) {
  const mode = config.mode;
  const [z1, setZ1] = useState<C>(config.z1);
  const [z2, setZ2] = useState<C>(config.z2);
  const [z3, setZ3] = useState<C>(config.z3);
  const [n, setN] = useState(config.n.initial);

  const show = config.show ?? DEFAULT_SHOW[mode];
  const has = (k: Show) => show.includes(k);
  const draggable = config.draggable ?? DEFAULT_DRAGGABLE[mode];
  const win = config.window;
  const origin: C = [0, 0];

  const pos: Record<HandleId, C> = { z1, z2, z3 };
  const setters: Record<HandleId, (v: C) => void> = { z1: setZ1, z2: setZ2, z3: setZ3 };

  const nameOf: Record<Mode, Record<HandleId, string>> = {
    point: { z1: "z", z2: "z_2", z3: "z_3" },
    sum: { z1: "z_1", z2: "z_2", z3: "z_3" },
    product: { z1: "z_1", z2: "z_2", z3: "z_3" },
    powers: { z1: "z", z2: "z_2", z3: "z_3" },
    roots: { z1: "w", z2: "z_2", z3: "z_3" },
    rotation: { z1: "z_1", z2: "z_2", z3: "z_3" },
  };
  const names = nameOf[mode];

  const handles: PlaneHandle[] = draggable.map((id) => ({
    id,
    pos: pos[id],
    color: HANDLE_COLOR[id],
    name: names[id].replace("_", ""),
  }));

  // ---------- derived values ----------
  const sum = cadd(z1, z2);
  const diff = csub(z1, z2);
  const prod = cmul(z1, z2);
  const quot = cdiv(z1, z2);
  const recip = cdiv([1, 0], z1);

  // powers z, z^2, ..., z^n
  const powers: C[] = [];
  {
    let p: C = [1, 0];
    for (let k = 1; k <= n; k++) {
      p = cmul(p, z1);
      powers.push(p);
    }
  }

  // n-th roots of w = z1
  const wMod = cabs(z1);
  const wArg = carg(z1) ?? 0;
  const rootMod = wMod ** (1 / Math.max(1, n));
  const roots: C[] = Array.from({ length: Math.max(1, n) }, (_, k) =>
    cfromPolar(rootMod, (wArg + 2 * Math.PI * k) / Math.max(1, n)),
  );
  const rootSum = roots.reduce<C>((acc, r) => cadd(acc, r), [0, 0]);
  const rootProd = roots.reduce<C>((acc, r) => cmul(acc, r), [1, 0]);

  // rotation
  const u = csub(z2, z1);
  const v = csub(z3, z1);
  const ratio = cdiv(v, u);
  const ratioArg = ratio ? carg(ratio) : null;
  const equiTest = csub(
    cadd(cadd(cmul(z1, z1), cmul(z2, z2)), cmul(z3, z3)),
    cadd(cadd(cmul(z1, z2), cmul(z2, z3)), cmul(z3, z1)),
  );

  // ---------- scene ----------
  const scene = (s: PlaneScales) => {
    const unitCircle = has("unit-circle") ? (
      <PlanePath s={s} pts={arcPoints([0, 0], 1, 0, 2 * Math.PI, 96)} color="muted" dashed width={1} />
    ) : null;

    if (mode === "point") {
      return (
        <>
          {unitCircle}
          <PlanePath s={s} pts={[[z1[0], 0], z1]} color="muted" dashed width={1} />
          <PlanePath s={s} pts={[[0, z1[1]], z1]} color="muted" dashed width={1} />
          <ArgArc s={s} z={z1} radius={0.6} color="aux" />
          {has("conjugate") && (
            <>
              <Arrow s={s} from={origin} to={cconj(z1)} color="b" dashed />
              <Label s={s} z={cconj(z1)} latex="\bar z" className="text-callout-info" />
            </>
          )}
          {has("negative") && (
            <>
              <Arrow s={s} from={origin} to={cscale(-1, z1)} color="c" dashed />
              <Label s={s} z={cscale(-1, z1)} latex="-z" className="text-callout-definition" />
            </>
          )}
          {has("i-times") && (
            <>
              <Arrow s={s} from={origin} to={cmul([0, 1], z1)} color="result" />
              <Label s={s} z={cmul([0, 1], z1)} latex="iz" className="text-callout-tip" />
            </>
          )}
          {has("reciprocal") && recip && (
            <>
              <Arrow s={s} from={origin} to={recip} color="aux" />
              <Label s={s} z={recip} latex="\tfrac{1}{z}" className="text-callout-warning" />
            </>
          )}
          <Arrow s={s} from={origin} to={z1} color="a" />
          <Label s={s} z={z1} latex="z" className="text-primary" />
        </>
      );
    }

    if (mode === "sum") {
      return (
        <>
          {unitCircle}
          <PlanePath s={s} pts={[z1, sum]} color="b" dashed width={1.2} />
          <PlanePath s={s} pts={[z2, sum]} color="a" dashed width={1.2} />
          <Arrow s={s} from={origin} to={sum} color="result" />
          <Label s={s} z={sum} latex="z_1 + z_2" className="text-callout-tip" />
          {has("difference") && (
            <>
              <Arrow s={s} from={z2} to={z1} color="aux" />
              <Arrow s={s} from={origin} to={diff} color="aux" dashed width={1.5} />
              <Label s={s} z={diff} latex="z_1 - z_2" className="text-callout-warning" />
            </>
          )}
          <Arrow s={s} from={origin} to={z1} color="a" />
          <Arrow s={s} from={origin} to={z2} color="b" />
          <Label s={s} z={z1} latex="z_1" className="text-primary" />
          <Label s={s} z={z2} latex="z_2" className="text-callout-info" />
        </>
      );
    }

    if (mode === "product") {
      return (
        <>
          {unitCircle}
          <ArgArc s={s} z={z1} radius={0.5} color="a" />
          <ArgArc s={s} z={z2} radius={0.75} color="b" />
          <ArgArc s={s} z={prod} radius={1.0} color="result" />
          {has("quotient") && quot && (
            <>
              <Arrow s={s} from={origin} to={quot} color="aux" dashed />
              <Label s={s} z={quot} latex="\tfrac{z_1}{z_2}" className="text-callout-warning" />
            </>
          )}
          <Arrow s={s} from={origin} to={prod} color="result" />
          <Label s={s} z={prod} latex="z_1 z_2" className="text-callout-tip" />
          <Arrow s={s} from={origin} to={z1} color="a" />
          <Arrow s={s} from={origin} to={z2} color="b" />
          <Label s={s} z={z1} latex="z_1" className="text-primary" />
          <Label s={s} z={z2} latex="z_2" className="text-callout-info" />
        </>
      );
    }

    if (mode === "powers") {
      return (
        <>
          {unitCircle}
          <PlanePath s={s} pts={[[1, 0], ...powers]} color="muted" dashed width={1.2} />
          {powers.slice(1).map((p, i) => (
            <g key={`p${i}`}>
              <PlaneDot s={s} z={p} color={i === powers.length - 2 ? "result" : "muted"} r={3.5} />
            </g>
          ))}
          {powers.length > 1 && (
            <>
              <Arrow s={s} from={origin} to={powers[powers.length - 1]} color="result" />
              <Label s={s} z={powers[powers.length - 1]} latex={`z^{${n}}`} className="text-callout-tip" />
            </>
          )}
          <ArgArc s={s} z={z1} radius={0.5} color="aux" />
          <Arrow s={s} from={origin} to={z1} color="a" />
          <Label s={s} z={z1} latex="z" className="text-primary" />
        </>
      );
    }

    if (mode === "roots") {
      return (
        <>
          {unitCircle}
          {rootMod > 1e-9 && (
            <PlanePath s={s} pts={arcPoints([0, 0], rootMod, 0, 2 * Math.PI, 120)} color="muted" dashed width={1} />
          )}
          {has("polygon") && roots.length > 2 && <PlanePath s={s} pts={roots} color="result" closed width={1.5} />}
          {roots.map((r, k) => (
            <g key={`r${k}`}>
              <PlaneDot s={s} z={r} color="result" r={4.5} />
              {n <= 12 && <Label s={s} z={r} latex={`z_{${k}}`} className="text-callout-tip" />}
            </g>
          ))}
          <Arrow s={s} from={origin} to={z1} color="a" />
          <Label s={s} z={z1} latex="w" className="text-primary" />
        </>
      );
    }

    // rotation
    const angU = carg(u);
    const angV = carg(v);
    let arc: C[] = [];
    if (angU !== null && angV !== null && ratioArg !== null) {
      arc = arcPoints(z1, 0.6, angU, angU + ratioArg);
    }
    return (
      <>
        {unitCircle}
        <PlanePath s={s} pts={[z1, z2, z3]} color="muted" closed width={1} fillOpacity={0.08} />
        {arc.length > 0 && <PlanePath s={s} pts={arc} color="aux" width={2} />}
        <Arrow s={s} from={z1} to={z2} color="b" />
        <Arrow s={s} from={z1} to={z3} color="c" />
        <Label s={s} z={z1} latex="z_1" className="text-primary" />
        <Label s={s} z={z2} latex="z_2" className="text-callout-info" />
        <Label s={s} z={z3} latex="z_3" className="text-callout-definition" />
      </>
    );
  };

  // ---------- readouts ----------
  const argText = (z: C) => {
    const t = carg(z);
    return t === null ? "\\text{undefined}" : `${angleLatex(t)}\\ (${degrees(t)}^\\circ)`;
  };

  const readouts: { label: string; latex: string }[] = [];
  if (mode === "point") {
    readouts.push(
      { label: "z", latex: cxLatex(z1) },
      { label: "Re z, Im z", latex: `${numLatex(z1[0])},\\ ${numLatex(z1[1])}` },
      { label: "|z|", latex: modLatex(z1) },
      { label: "arg z (principal)", latex: argText(z1) },
      { label: "polar form", latex: polarLatex(z1) },
      { label: "Euler form", latex: eulerLatex(z1) },
    );
    if (has("conjugate")) readouts.push({ label: "conjugate", latex: `\\bar z = ${cxLatex(cconj(z1))}` });
    if (has("negative")) readouts.push({ label: "negative", latex: `-z = ${cxLatex(cscale(-1, z1))}` });
    if (has("i-times")) readouts.push({ label: "times i", latex: `iz = ${cxLatex(cmul([0, 1], z1))}` });
    if (has("reciprocal"))
      readouts.push({ label: "reciprocal", latex: recip ? `\\tfrac{1}{z} = ${cxLatex(recip)}` : "\\text{undefined at } z = 0" });
  } else if (mode === "sum") {
    readouts.push(
      { label: "z₁ + z₂", latex: cxLatex(sum) },
      { label: "|z₁ + z₂|", latex: numLatex(cabs(sum)) },
      { label: "|z₁| + |z₂|", latex: numLatex(cabs(z1) + cabs(z2)) },
      { label: "||z₁| − |z₂||", latex: numLatex(Math.abs(cabs(z1) - cabs(z2))) },
    );
    if (has("difference")) {
      readouts.push(
        { label: "z₁ − z₂", latex: cxLatex(diff) },
        { label: "|z₁ − z₂| (distance)", latex: numLatex(cabs(diff)) },
      );
    }
  } else if (mode === "product") {
    const a1 = carg(z1);
    const a2 = carg(z2);
    const ap = carg(prod);
    readouts.push(
      { label: "z₁ z₂", latex: cxLatex(prod) },
      { label: "|z₁| · |z₂|", latex: `${numLatex(cabs(z1))} \\times ${numLatex(cabs(z2))} = ${numLatex(cabs(z1) * cabs(z2))}` },
      { label: "|z₁ z₂|", latex: numLatex(cabs(prod)) },
      {
        label: "arg z₁ + arg z₂",
        latex: a1 !== null && a2 !== null ? `${degrees(a1)}^\\circ + ${degrees(a2)}^\\circ = ${tidy(degrees(a1) + degrees(a2), 1)}^\\circ` : "\\text{undefined}",
      },
      { label: "arg(z₁ z₂) (principal)", latex: ap === null ? "\\text{undefined}" : `${degrees(ap)}^\\circ` },
    );
    if (has("quotient")) {
      readouts.push({ label: "z₁ / z₂", latex: quot ? cxLatex(quot) : "\\text{undefined}" });
    }
  } else if (mode === "powers") {
    const t = carg(z1);
    const r = cabs(z1);
    readouts.push(
      { label: "z", latex: `${cxLatex(z1)} = ${polarLatex(z1)}` },
      { label: `zⁿ for n = ${n}`, latex: cxLatex(powers[powers.length - 1] ?? [0, 0]) },
      { label: "rⁿ", latex: `${numLatex(r)}^{${n}} = ${numLatex(r ** n)}` },
      { label: "nθ", latex: t === null ? "\\text{undefined}" : `${n} \\times ${degrees(t)}^\\circ = ${tidy(n * degrees(t), 1)}^\\circ` },
    );
  } else if (mode === "roots") {
    readouts.push(
      { label: "w", latex: `${cxLatex(z1)},\\ |w| = ${numLatex(wMod)}` },
      { label: "common modulus", latex: `|w|^{1/${n}} = ${numLatex(rootMod, 3)}` },
      { label: "spacing", latex: `\\tfrac{2\\pi}{${n}} = ${tidy(360 / n, 1)}^\\circ` },
      { label: "sum of the roots", latex: cxLatex(rootSum) },
      { label: "product of the roots", latex: cxLatex(rootProd) },
    );
    if (n <= 6) {
      roots.forEach((r, k) => readouts.push({ label: `z${k}`, latex: cxLatex(r, 3) }));
    }
  } else {
    readouts.push(
      {
        label: "(z₃ − z₁)/(z₂ − z₁)",
        latex: ratio ? cxLatex(ratio) : "\\text{undefined}",
      },
      {
        label: "|z₃ − z₁| / |z₂ − z₁|",
        latex: ratio ? `${numLatex(cabs(v))} / ${numLatex(cabs(u))} = ${numLatex(cabs(ratio))}` : "\\text{undefined}",
      },
      {
        label: "angle at z₁",
        latex: ratioArg === null ? "\\text{undefined}" : `${degrees(ratioArg)}^\\circ`,
      },
      {
        label: "collinear?",
        latex: ratio ? (Math.abs(ratio[1]) < 1e-9 ? "\\text{yes (ratio is real)}" : "\\text{no}") : "\\text{undefined}",
      },
      {
        label: "equilateral test",
        latex: `z_1^2 + z_2^2 + z_3^2 - z_1z_2 - z_2z_3 - z_3z_1 = ${cxLatex(equiTest)}`,
      },
    );
  }

  return (
    <InteractiveFrame title="Argand plane">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 space-y-3">
          <PlaneCanvas
            win={win}
            handles={handles}
            snap={config.snap}
            onMove={(id, value) => setters[id as HandleId](value)}
            ariaLabel="Argand plane with draggable complex numbers"
          >
            {scene}
          </PlaneCanvas>
          {(mode === "powers" || mode === "roots") && config.n.max > config.n.min && (
            <SliderRow label={<Latex latex="n" />} value={n} min={config.n.min} max={config.n.max} step={1} onChange={setN} />
          )}
        </div>
        <div className="w-full space-y-1 rounded-md border bg-background p-3 text-sm sm:w-64">
          {readouts.map((r) => (
            <ReadoutRow key={r.label} label={r.label}>
              <Latex latex={r.latex} />
            </ReadoutRow>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <RichText text={config.caption ?? DEFAULT_CAPTION[mode]} />
      </p>
    </InteractiveFrame>
  );
}
