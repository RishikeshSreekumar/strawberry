"use client";

import { useId, useState } from "react";
import type { z } from "zod";
import {
  srfEquivalenceClosure,
  srfFunctionCounts,
  srfFunctionReport,
  srfRelationReport,
  type Pair,
} from "../../lib/srf";
import type { srfMappingExplorerSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { InteractiveFrame } from "./ui";

type Config = z.infer<typeof srfMappingExplorerSchema>;

const W = 400;
const H = 280;

const fmtPair = ([a, b]: Pair) => `(${a}, ${b})`;
const fmtSet = (xs: string[]) => (xs.length === 0 ? "∅" : `{${xs.join(", ")}}`);

function Check({ ok, label, detail }: { ok: boolean; label: string; detail?: string }) {
  return (
    <li className="flex gap-2">
      <span className={`w-4 shrink-0 font-bold ${ok ? "text-callout-tip" : "text-callout-warning"}`}>{ok ? "✓" : "✗"}</span>
      <span>
        <span className="font-medium">{label}</span>
        {detail && <span className="text-muted-foreground">: {detail}</span>}
      </span>
    </li>
  );
}

export function SrfMappingExplorer({ config }: { config: Config }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const relation = config.mode === "relation";
  const domain = config.domain;
  const codomain = relation ? domain : (config.codomain ?? domain);
  const initial: Pair[] = config.pairs.map(([a, b]) => [a, b] as const);
  const [pairs, setPairs] = useState<Pair[]>(initial);
  const [inverse, setInverse] = useState(false);

  const has = (a: string, b: string) => pairs.some(([x, y]) => x === a && y === b);
  const toggle = (a: string, b: string) => {
    if (!config.editable) return;
    setPairs((prev) =>
      prev.some(([x, y]) => x === a && y === b)
        ? prev.filter(([x, y]) => !(x === a && y === b))
        : [...prev, [a, b] as const],
    );
  };
  // Canonical order (row by row) for display.
  const sorted: Pair[] = [];
  for (const a of domain) for (const b of codomain) if (has(a, b)) sorted.push([a, b]);
  const shown: Pair[] = inverse ? sorted.map(([a, b]) => [b, a] as const) : sorted;

  // ---- geometry ----
  const columnPos = (i: number, n: number, x: number) => ({ x, y: H / 2 + (i - (n - 1) / 2) * Math.min(44, (H - 60) / Math.max(1, n - 1)) });
  const circlePos = (i: number) => {
    const n = domain.length;
    const t = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return n === 1 ? { x: W / 2, y: H / 2 } : { x: W / 2 + 100 * Math.cos(t), y: H / 2 + 100 * Math.sin(t) };
  };
  const leftX = 100;
  const rightX = 300;
  const from = (a: string) => {
    if (relation) return circlePos(domain.indexOf(a));
    return inverse
      ? columnPos(codomain.indexOf(a), codomain.length, rightX)
      : columnPos(domain.indexOf(a), domain.length, leftX);
  };
  const to = (b: string) => {
    if (relation) return circlePos(domain.indexOf(b));
    return inverse
      ? columnPos(domain.indexOf(b), domain.length, leftX)
      : columnPos(codomain.indexOf(b), codomain.length, rightX);
  };

  const R = 15;
  const arrow = ([a, b]: Pair, i: number) => {
    const p = from(a);
    const q = to(b);
    if (relation && a === b) {
      const out = { x: p.x - W / 2, y: p.y - H / 2 };
      const len = Math.hypot(out.x, out.y) || 1;
      const ux = domain.length === 1 ? 0 : out.x / len;
      const uy = domain.length === 1 ? -1 : out.y / len;
      const cx = p.x + ux * 26;
      const cy = p.y + uy * 26;
      return <circle key={i} cx={cx} cy={cy} r={12} fill="none" className="stroke-plot" strokeWidth={1.8} />;
    }
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const sx = p.x + ux * R;
    const sy = p.y + uy * R;
    const ex = q.x - ux * (R + 3);
    const ey = q.y - uy * (R + 3);
    // Bend relation arrows so a→b and b→a are both visible.
    const bend = relation ? 18 : 0;
    const mx = (sx + ex) / 2 - uy * bend;
    const my = (sy + ey) / 2 + ux * bend;
    return (
      <path
        key={i}
        d={`M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`}
        fill="none"
        className="stroke-plot"
        strokeWidth={1.8}
        markerEnd={`url(#${uid}-head)`}
      />
    );
  };

  const node = (label: string, p: { x: number; y: number }, key: string) => (
    <g key={key}>
      <circle cx={p.x} cy={p.y} r={R} className="fill-background stroke-foreground/60" strokeWidth={1.5} />
      <text x={p.x} y={p.y + 5} textAnchor="middle" className="fill-foreground text-[13px] font-semibold">
        {label}
      </text>
    </g>
  );

  // ---- readouts ----
  let readout: React.ReactNode;
  if (relation) {
    const rep = srfRelationReport(domain, sorted);
    const dom = domain.filter((a) => sorted.some(([x]) => x === a));
    const rng = domain.filter((b) => sorted.some(([, y]) => y === b));
    readout = (
      <>
        <p className="break-words">
          {inverse ? "R⁻¹" : "R"} = {shown.length === 0 ? "∅" : `{${shown.map(fmtPair).join(", ")}}`}{" "}
          <span className="text-muted-foreground">({shown.length} of {domain.length ** 2} possible pairs)</span>
        </p>
        <p className="text-muted-foreground">
          Domain {fmtSet(inverse ? rng : dom)}, range {fmtSet(inverse ? dom : rng)}
        </p>
        <ul className="space-y-1">
          <Check
            ok={rep.reflexive.ok}
            label="Reflexive"
            detail={rep.reflexive.ok ? "every (a, a) is present" : `missing ${rep.reflexive.missing.map((a) => `(${a}, ${a})`).join(", ")}`}
          />
          <Check
            ok={rep.symmetric.ok}
            label="Symmetric"
            detail={rep.symmetric.witness ? `${fmtPair(rep.symmetric.witness)} is in but ${fmtPair([rep.symmetric.witness[1], rep.symmetric.witness[0]])} is not` : "every pair has its reverse"}
          />
          <Check
            ok={rep.antisymmetric.ok}
            label="Antisymmetric"
            detail={rep.antisymmetric.witness ? `both ${fmtPair(rep.antisymmetric.witness)} and ${fmtPair([rep.antisymmetric.witness[1], rep.antisymmetric.witness[0]])} with ${rep.antisymmetric.witness[0]} ≠ ${rep.antisymmetric.witness[1]}` : "no two-way arrows between different elements"}
          />
          <Check
            ok={rep.transitive.ok}
            label="Transitive"
            detail={rep.transitive.witness ? `${fmtPair(rep.transitive.witness[0])} and ${fmtPair(rep.transitive.witness[1])} are in but (${rep.transitive.witness[0][0]}, ${rep.transitive.witness[1][1]}) is not` : "every two-step path has a shortcut"}
          />
        </ul>
        <p className={rep.equivalence ? "font-medium text-callout-tip" : "text-muted-foreground"}>
          {rep.equivalence
            ? `Equivalence relation. Classes: ${rep.classes.map(fmtSet).join(", ")}`
            : "Not an equivalence relation."}
        </p>
      </>
    );
  } else {
    const rep = srfFunctionReport(domain, codomain, sorted);
    const counts = srfFunctionCounts(domain.length, codomain.length);
    readout = (
      <>
        <p className="break-words">
          {inverse ? "Inverse relation" : "Pairs"}: {shown.length === 0 ? "∅" : `{${shown.map(fmtPair).join(", ")}}`}
        </p>
        <ul className="space-y-1">
          <Check
            ok={rep.isFunction}
            label="Function from A to B"
            detail={
              rep.isFunction
                ? `every element of A has exactly one image; range ${fmtSet(rep.range)}`
                : [
                    rep.noImage.length > 0 ? `${rep.noImage.join(", ")} ${rep.noImage.length === 1 ? "has" : "have"} no image` : "",
                    rep.manyImages.length > 0 ? `${rep.manyImages.join(", ")} ${rep.manyImages.length === 1 ? "has" : "have"} more than one image` : "",
                  ]
                    .filter(Boolean)
                    .join("; ")
            }
          />
          {rep.isFunction && (
            <>
              <Check
                ok={rep.injective}
                label="One-one (injective)"
                detail={rep.collision ? `${rep.collision[0]} and ${rep.collision[1]} share an image` : "different inputs, different images"}
              />
              <Check
                ok={rep.surjective}
                label="Onto (surjective)"
                detail={rep.unreached.length > 0 ? `${rep.unreached.join(", ")} ${rep.unreached.length === 1 ? "has" : "have"} no pre-image` : "range = codomain"}
              />
            </>
          )}
        </ul>
        {rep.isFunction && (
          <p className={rep.injective && rep.surjective ? "font-medium text-callout-tip" : "text-muted-foreground"}>
            {rep.injective && rep.surjective
              ? "Bijective: the inverse relation is again a function."
              : "Not bijective."}
          </p>
        )}
        {config.showCounts && (
          <p className="border-t pt-2 text-muted-foreground tabular-nums">
            From a {domain.length}-element set to a {codomain.length}-element set there are {counts.all} functions, {counts.injective} one-one and {counts.surjective} onto.
          </p>
        )}
      </>
    );
  }

  const caption =
    config.caption ??
    (relation
      ? "Tick cells in the grid to add or remove pairs. Each check names the pair that breaks it."
      : "Tick cells to choose images. A function needs exactly one tick in every row.");

  const btn = "rounded-md border bg-background px-3 py-1 text-sm hover:bg-muted";

  return (
    <InteractiveFrame title={relation ? "Relation explorer" : "Function explorer"}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md rounded-md border bg-background" role="img" aria-label={relation ? "Arrow diagram of a relation" : "Arrow diagram from A to B"}>
        <defs>
          <marker id={`${uid}-head`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-plot" />
          </marker>
        </defs>
        {!relation && (
          <>
            {[leftX, rightX].map((x, side) => {
              const n = side === 0 ? domain.length : codomain.length;
              const top = columnPos(0, n, x).y;
              const bottom = columnPos(n - 1, n, x).y;
              return (
                <ellipse key={x} cx={x} cy={(top + bottom) / 2} rx={42} ry={(bottom - top) / 2 + 34} fill="none" className="stroke-foreground/25" strokeWidth={1.5} />
              );
            })}
            <text x={leftX} y={18} textAnchor="middle" className="fill-muted-foreground text-[13px] font-semibold">
              {inverse ? "A (target)" : "A (domain)"}
            </text>
            <text x={rightX} y={18} textAnchor="middle" className="fill-muted-foreground text-[13px] font-semibold">
              {inverse ? "B (start)" : "B (codomain)"}
            </text>
          </>
        )}
        {shown.map(arrow)}
        {relation
          ? domain.map((a, i) => node(a, circlePos(i), `n-${a}`))
          : [
              ...domain.map((a, i) => node(a, columnPos(i, domain.length, leftX), `l-${a}`)),
              ...codomain.map((b, i) => node(b, columnPos(i, codomain.length, rightX), `r-${b}`)),
            ]}
      </svg>

      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-center text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-xs font-normal text-muted-foreground">{relation ? "a \\ b" : "x \\ f(x)"}</th>
              {codomain.map((b) => (
                <th key={b} className="px-2 py-1 font-semibold">
                  {b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {domain.map((a) => (
              <tr key={a}>
                <th className="px-2 py-1 font-semibold">{a}</th>
                {codomain.map((b) => {
                  const on = has(a, b);
                  return (
                    <td key={b} className="p-0.5">
                      <button
                        type="button"
                        disabled={!config.editable}
                        onClick={() => toggle(a, b)}
                        aria-pressed={on}
                        aria-label={`${relation ? "pair" : "image"} (${a}, ${b})`}
                        className={`h-8 w-8 rounded border text-sm ${on ? "border-plot bg-plot/20 font-bold text-plot" : "bg-background text-muted-foreground"} ${config.editable ? "hover:bg-muted" : "cursor-default"}`}
                      >
                        {on ? "✓" : ""}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={btn} onClick={() => setInverse((v) => !v)}>
          {inverse ? "Show original" : relation ? "Show R⁻¹" : "Show inverse relation"}
        </button>
        {config.editable && (
          <>
            {relation && (
              <button type="button" className={btn} onClick={() => setPairs(srfEquivalenceClosure(domain, sorted))}>
                Equivalence closure
              </button>
            )}
            <button type="button" className={btn} onClick={() => setPairs(initial)}>
              Reset
            </button>
            <button type="button" className={btn} onClick={() => setPairs([])}>
              Clear
            </button>
          </>
        )}
      </div>

      <div className="space-y-2 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        {readout}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <RichText text={caption} />
      </p>
    </InteractiveFrame>
  );
}
