"use client";

import { useState } from "react";
import type { z } from "zod";
import type { pncCountingTreeSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof pncCountingTreeSchema>;
type Stage = { label: string; options: string[] };
type Tree = { label: string | null; stages: Stage[] };

const W = 400;
const ROW = 20;
const TOP = 24;
const BAND_HEADER = 18;
const BAND_GAP = 14;
const ROOT_X = 12;
const LEAF_NUM_W = 30;
/** Most leaves drawn per tree; deeper stages are summarised in text. */
const MAX_DRAWN = 36;

type DrawnNode = {
  depth: number;
  /** Option indices from the root to this node. */
  path: number[];
  x: number;
  y: number;
  label: string;
  parent: DrawnNode | null;
};

const product = (xs: number[]) => xs.reduce((p, x) => p * x, 1);

/** Deepest depth <= limit whose node count stays drawable. */
function drawableDepth(stages: Stage[], limit: number) {
  let d = 0;
  while (d < limit && product(stages.slice(0, d + 1).map((s) => s.options.length)) <= MAX_DRAWN) d++;
  return d;
}

/** Lay out one tree left-to-right in a band starting at y0. */
function layoutTree(stages: Stage[], depth: number, y0: number, colW: number) {
  const nodes: DrawnNode[] = [];
  let nextLeafY = y0 + ROW / 2;
  const build = (d: number, path: number[], label: string, parent: DrawnNode | null): DrawnNode => {
    const node: DrawnNode = { depth: d, path, x: ROOT_X + d * colW, y: 0, label, parent };
    nodes.push(node);
    if (d === depth) {
      node.y = nextLeafY;
      nextLeafY += ROW;
    } else {
      const kids = stages[d].options.map((opt, i) => build(d + 1, [...path, i], opt, node));
      node.y = (kids[0].y + kids[kids.length - 1].y) / 2;
    }
    return node;
  };
  build(0, [], "", null);
  const leafCount = product(stages.slice(0, depth).map((s) => s.options.length));
  return { nodes, height: leafCount * ROW };
}

/** Mixed-radix position of a leaf path, 1-based. */
function leafIndex(stages: Stage[], path: number[]) {
  return path.reduce((acc, i, d) => acc * stages[d].options.length + i, 0) + 1;
}

function initialSelection(trees: Tree[], sum: boolean, highlight?: string[]) {
  if (!highlight || highlight.length === 0) return null;
  let rest = highlight;
  let tree = 0;
  if (sum) {
    tree = trees.findIndex((t) => t.label === highlight[0]);
    if (tree < 0) return null;
    rest = highlight.slice(1);
  }
  const path: number[] = [];
  for (let d = 0; d < rest.length && d < trees[tree].stages.length; d++) {
    const i = trees[tree].stages[d].options.indexOf(rest[d]);
    if (i < 0) break;
    path.push(i);
  }
  return { tree, path };
}

export function PncCountingTree({ config }: { config: Config }) {
  const sum = config.mode === "sum";
  const trees: Tree[] = sum
    ? (config.branches ?? []).map((b) => ({ label: b.label, stages: b.stages }))
    : [{ label: null, stages: config.stages }];
  const maxDepth = Math.max(...trees.map((t) => t.stages.length));
  const startDepth = config.revealStages ? Math.min(1, maxDepth) : maxDepth;

  const [depth, setDepth] = useState(startDepth);
  const [selected, setSelected] = useState(() => initialSelection(trees, sum, config.highlightPath));

  const colW = (W - ROOT_X - LEAF_NUM_W - 40) / Math.max(1, maxDepth);

  // Per-tree revealed depth, drawn depth and layout, stacked vertically.
  type Band = {
    t: number;
    tree: Tree;
    shown: number;
    drawn: number;
    top: number;
    bandTop: number;
    nodes: DrawnNode[];
    height: number;
    leaves: number;
  };
  const bands: Band[] = [];
  for (const [t, tree] of trees.entries()) {
    const bandTop = t === 0 ? TOP : bands[t - 1].top + bands[t - 1].height + BAND_GAP;
    const shown = Math.min(depth, tree.stages.length);
    const drawn = drawableDepth(tree.stages, shown);
    const top = bandTop + (sum ? BAND_HEADER : 0);
    const { nodes, height } = layoutTree(tree.stages, drawn, top, colW);
    const leaves = product(tree.stages.slice(0, shown).map((s) => s.options.length));
    bands.push({ t, tree, shown, drawn, top, bandTop, nodes, height, leaves });
  }
  const last = bands[bands.length - 1];
  const H = last.top + last.height + 8;
  const total = bands.reduce((s, b) => s + b.leaves, 0);

  const onPath = (t: number, path: number[]) =>
    selected !== null &&
    selected.tree === t &&
    path.length <= selected.path.length &&
    path.every((i, d) => selected.path[d] === i);

  const factorLatex = (b: Band) => {
    const sizes = b.tree.stages.slice(0, b.shown).map((s) => s.options.length);
    return sizes.length === 0 ? "1" : sizes.join(" \\times ");
  };

  let formula: string;
  if (!sum) {
    const b = bands[0];
    formula = b.shown === 0 ? "1 \\text{ (just the start)}" : b.shown === 1 ? `${b.leaves}` : `${factorLatex(b)} = ${b.leaves}`;
  } else {
    const parts = bands.map((b) => {
      const f = factorLatex(b);
      return b.shown > 1 ? `(${f})` : f;
    });
    const anyProduct = bands.some((b) => b.shown > 1);
    formula = `${parts.join(" + ")}${anyProduct ? ` = ${bands.map((b) => b.leaves).join(" + ")}` : ""} = ${total}`;
  }

  const sel = selected ? bands[selected.tree] : null;
  const selStages = sel ? sel.tree.stages : [];
  const selComplete = sel !== null && selected !== null && selected.path.length === sel.shown && sel.shown > 0;
  const offset = sel ? bands.slice(0, sel.t).reduce((s, b) => s + b.leaves, 0) : 0;

  const grow = () => setDepth((d) => Math.min(maxDepth, d + 1));

  return (
    <InteractiveFrame title={sum ? "Counting tree: separate cases add" : "Counting tree: stages multiply"}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-md border bg-background"
        role="img"
        aria-label={`Decision tree with ${total} ${total === 1 ? "leaf" : "leaves"}`}
      >
        {/* stage headers (product mode) */}
        {!sum &&
          config.stages.slice(0, depth).map((s, d) => (
            <text key={s.label} x={ROOT_X + (d + 1) * colW} y={14} className="fill-muted-foreground text-[10px] font-semibold">
              {s.label} ({s.options.length})
            </text>
          ))}

        {bands.map((b) => (
          <g key={b.t}>
            {sum && (
              <>
                <text x={ROOT_X} y={b.bandTop + 11} className="fill-foreground text-[10px] font-semibold">
                  {`Case ${b.t + 1}: ${b.tree.label}`}
                </text>
                <text x={W - 6} y={b.bandTop + 11} textAnchor="end" className="fill-callout-tip text-[10px] font-semibold">
                  {b.leaves} {b.leaves === 1 ? "way" : "ways"}
                </text>
              </>
            )}
            {/* edges */}
            {b.nodes
              .filter((n) => n.parent)
              .map((n) => {
                const p = n.parent as DrawnNode;
                const hot = onPath(b.t, n.path);
                const px = p.depth === 0 ? p.x + 4 : p.x + Math.min(colW - 16, p.label.length * 5.6 + 4);
                return (
                  <line
                    key={`e${n.path.join("-")}`}
                    x1={px}
                    y1={p.y}
                    x2={n.x - 3}
                    y2={n.y}
                    className={hot ? "stroke-plot" : "stroke-foreground/25"}
                    strokeWidth={hot ? 2.5 : 1}
                  />
                );
              })}
            {/* nodes */}
            {b.nodes.map((n) => {
              const hot = onPath(b.t, n.path);
              if (n.depth === 0) {
                return <circle key="root" cx={n.x} cy={n.y} r={4} className="fill-foreground stroke-none" />;
              }
              const isLeaf = n.depth === b.drawn;
              const text = (
                <text x={n.x} y={n.y + 3.5} className={`text-[10px] ${hot ? "fill-plot font-semibold" : "fill-foreground"}`}>
                  {n.label.length > Math.floor((colW - 14) / 5.6)
                    ? `${n.label.slice(0, Math.max(1, Math.floor((colW - 14) / 5.6) - 1))}…`
                    : n.label}
                </text>
              );
              if (!isLeaf) return <g key={n.path.join("-")}>{text}</g>;
              const idx = leafIndex(b.tree.stages, n.path);
              const select = () => setSelected({ tree: b.t, path: n.path });
              return (
                <g
                  key={n.path.join("-")}
                  role="button"
                  tabIndex={0}
                  aria-label={`Outcome ${n.path.map((i, d) => b.tree.stages[d].options[i]).join(", ")}`}
                  onClick={select}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select();
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <rect x={n.x - 4} y={n.y - ROW / 2 + 1} width={W - n.x} height={ROW - 2} rx={3} className={hot ? "fill-plot/10" : "fill-transparent"} />
                  {text}
                  {b.drawn === b.shown && (
                    <text x={W - 6} y={n.y + 3.5} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
                      #{(sum ? bands.slice(0, b.t).reduce((s, bb) => s + bb.leaves, 0) : 0) + idx}
                    </text>
                  )}
                </g>
              );
            })}
            {b.drawn < b.shown && (
              <text x={W - 6} y={b.top + b.height / 2} textAnchor="end" className="fill-callout-warning text-[9px]">
                {`each × ${b.tree.stages
                  .slice(b.drawn, b.shown)
                  .map((s) => s.options.length)
                  .join(" × ")} more`}
              </text>
            )}
          </g>
        ))}
      </svg>

      {config.revealStages && (
        <div className="flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={grow}
            disabled={depth >= maxDepth}
            className="rounded-md border bg-background px-3 py-1 font-medium disabled:opacity-50"
          >
            {depth >= maxDepth ? "All stages shown" : `Next stage (${depth}/${maxDepth})`}
          </button>
          <button type="button" onClick={() => setDepth(maxDepth)} disabled={depth >= maxDepth} className="rounded-md border bg-background px-3 py-1 disabled:opacity-50">
            Show all
          </button>
          <button
            type="button"
            onClick={() => {
              setDepth(startDepth);
              setSelected(initialSelection(trees, sum, config.highlightPath));
            }}
            className="rounded-md border bg-background px-3 py-1"
          >
            Reset
          </button>
        </div>
      )}

      <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        {config.showFormula && (
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-muted-foreground">{sum ? "Cases add" : "Leaves so far"}</span>
            <span className="overflow-x-auto">
              <Latex latex={formula} />
            </span>
          </div>
        )}
        {!config.showFormula && (
          <p>
            <span className="text-muted-foreground">Leaves: </span>
            <span className="tabular-nums font-medium">{total}</span>
          </p>
        )}
        {sel && selected && selected.path.length > 0 && (
          <p className="text-muted-foreground">
            {sum && <span className="font-medium text-foreground">{sel.tree.label}: </span>}
            {selected.path
              .slice(0, sel.shown)
              .map((i, d) => `${selStages[d].label} ${selStages[d].options[i]}`)
              .join(" → ")}
            {selComplete && (
              <span className="text-foreground">
                {" "}
                (outcome #{offset + leafIndex(selStages, selected.path.slice(0, sel.shown))} of {total})
              </span>
            )}
          </p>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          (sum
            ? "The cases cannot happen together, so no outcome is in two trees: the leaf counts simply add. Tap a leaf to trace it."
            : "Every node of one stage sprouts the same number of branches, so each new stage multiplies the leaf count. Tap a leaf to trace it.")}
      </p>
    </InteractiveFrame>
  );
}
