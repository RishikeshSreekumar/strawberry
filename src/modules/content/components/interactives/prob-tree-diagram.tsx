"use client";

import { useState } from "react";
import type { z } from "zod";
import type { ProbTreeNode, probTreeDiagramSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof probTreeDiagramSchema>;
type Selector = NonNullable<Config["highlight"]>["leaves"];

/** Internal tree: `prob` is the probability of the branch into the node. */
type TNode = { label: string; prob: number; probLatex?: string; children: TNode[] };
type Leaf = { path: string; labels: string[]; probs: number[]; product: number };

// ---------- number formatting ----------

/** Best rational approximation with a bounded denominator (continued fractions). */
function toFraction(v: number, maxDen = 100000): [number, number] | null {
  if (!Number.isFinite(v)) return null;
  let h1 = 1;
  let h0 = 0;
  let k1 = 0;
  let k0 = 1;
  let x = v;
  for (let i = 0; i < 30; i++) {
    const a = Math.floor(x);
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;
    if (k2 > maxDen) break;
    h0 = h1;
    h1 = h2;
    k0 = k1;
    k1 = k2;
    if (Math.abs(v - h1 / k1) < 1e-10) return [h1, k1];
    const r = x - a;
    if (r < 1e-12) break;
    x = 1 / r;
  }
  return Math.abs(v - h1 / k1) < 1e-10 ? [h1, k1] : null;
}

function dec(v: number) {
  if (v === 0) return "0";
  if (Math.abs(v) < 0.001) return Number(v.toPrecision(3)).toString();
  return Number(v.toFixed(4)).toString();
}

function makeFmt(format: Config["format"]) {
  const text = (v: number) => {
    if (format === "fraction") {
      const f = toFraction(v);
      if (f) return f[1] === 1 ? `${f[0]}` : `${f[0]}/${f[1]}`;
    }
    return dec(v);
  };
  const latex = (v: number) => {
    if (format === "fraction") {
      const f = toFraction(v);
      if (f) return f[1] === 1 ? `${f[0]}` : `\\tfrac{${f[0]}}{${f[1]}}`;
    }
    return dec(v);
  };
  return { text, latex };
}

// ---------- building and editing the tree ----------

function equalSplit(n: number) {
  return Array.from({ length: n }, () => 1 / n);
}

function buildTree(cfg: Config): TNode {
  if (cfg.stages) {
    const stages = cfg.stages;
    const row = (d: number) => {
      const r = cfg.probs?.[Math.min(d, (cfg.probs?.length ?? 1) - 1)];
      return r && r.length === stages[d].branches.length ? r : equalSplit(stages[d].branches.length);
    };
    const grow = (d: number): TNode[] =>
      d >= stages.length
        ? []
        : stages[d].branches.map((b, i) => ({ label: b.label, prob: row(d)[i], children: grow(d + 1) }));
    return { label: "", prob: 1, children: grow(0) };
  }
  const conv = (n: ProbTreeNode, prob: number): TNode => {
    const kids = n.children ?? [];
    const given = kids.reduce((s, c) => s + (c.prob ?? 0), 0);
    const missing = kids.filter((c) => c.prob === undefined).length;
    const share = missing ? Math.max(0, 1 - given) / missing : 0;
    return { label: n.label, prob, probLatex: n.probLatex, children: kids.map((c) => conv(c, c.prob ?? share)) };
  };
  return conv(cfg.root!, 1);
}

/** Set child `idx` of `node` to v and rescale its siblings so they still sum to 1. */
function setBranch(node: TNode, idx: number, v: number): TNode {
  const kids = node.children;
  const others = kids.reduce((s, c, j) => (j === idx ? s : s + c.prob), 0);
  const rest = 1 - v;
  return {
    ...node,
    children: kids.map((c, j) =>
      j === idx ? { ...c, prob: v } : { ...c, prob: others > 1e-12 ? (c.prob / others) * rest : rest / (kids.length - 1) },
    ),
  };
}

function editPath(root: TNode, path: number[], v: number): TNode {
  if (path.length === 1) return path[0] < root.children.length ? setBranch(root, path[0], v) : root;
  const [head, ...tail] = path;
  if (head >= root.children.length) return root;
  return { ...root, children: root.children.map((c, j) => (j === head ? editPath(c, tail, v) : c)) };
}

/** Edit branch `branch` at every node whose children sit at depth `depth` (1-based), or at every depth. */
function editDepth(node: TNode, depth: number | "all", branch: number, v: number, d = 1): TNode {
  let next = node;
  if (node.children.length > branch && (depth === "all" || depth === d)) next = setBranch(node, branch, v);
  return { ...next, children: next.children.map((c) => editDepth(c, depth, branch, v, d + 1)) };
}

function nodeAt(root: TNode, path: number[]): TNode | null {
  let n: TNode | undefined = root;
  for (const i of path) {
    n = n?.children[i];
    if (!n) return null;
  }
  return n;
}

function firstAtDepth(root: TNode, depth: number, branch: number): TNode | null {
  let n = root;
  for (let d = 1; d < depth; d++) {
    if (!n.children[0]) return null;
    n = n.children[0];
  }
  return n.children[branch] ?? null;
}

function collectLeaves(root: TNode): Leaf[] {
  const out: Leaf[] = [];
  const walk = (n: TNode, path: number[], labels: string[], probs: number[]) => {
    if (n.children.length === 0) {
      out.push({ path: path.join("."), labels, probs, product: probs.reduce((a, b) => a * b, 1) });
      return;
    }
    n.children.forEach((c, i) => walk(c, [...path, i], [...labels, c.label], [...probs, c.prob]));
  };
  walk(root, [], [], []);
  return out;
}

function selectLeaves(sel: Selector, leaves: Leaf[]): Set<string> {
  if (Array.isArray(sel)) return new Set(sel);
  if ("matchLastStage" in sel) return new Set(leaves.filter((l) => l.labels[l.labels.length - 1] === sel.matchLastStage).map((l) => l.path));
  const { label, k } = sel.successCount;
  return new Set(leaves.filter((l) => l.labels.filter((x) => x === label).length === k).map((l) => l.path));
}

function outcomeName(labels: string[]) {
  return labels.every((l) => l.length <= 2) ? labels.join("") : labels.join(", ");
}

// ---------- drawing ----------

const W = 440;
const TOP = 22;

type Layout = { x: number; y: number; w: number };

function TreeSvg({
  root,
  headers,
  showProbabilities,
  showLeafProducts,
  lit,
  litClass,
  onLeafClick,
  fmt,
  ariaLabel,
}: {
  root: TNode;
  headers: string[];
  showProbabilities: boolean;
  showLeafProducts: boolean;
  lit: Set<string>;
  litClass: string;
  onLeafClick?: (path: string) => void;
  fmt: ReturnType<typeof makeFmt>;
  ariaLabel: string;
}) {
  const leaves = collectLeaves(root);
  const L = leaves.length;
  let depth = 0;
  for (const l of leaves) depth = Math.max(depth, l.labels.length);
  const rowH = L <= 6 ? 34 : L <= 10 ? 28 : L <= 16 ? 22 : 16;
  const font = L <= 16 ? 10 : 8.5;
  const H = TOP + L * rowH + 8;
  const leafArea = showProbabilities && showLeafProducts ? 150 : 70;
  const colW = (W - leafArea - 18) / Math.max(1, depth);

  const pos = new Map<string, Layout>();
  const labelW = (s: string) => Math.max(14, s.length * font * 0.6 + 8);
  let leafRow = 0;
  const place = (n: TNode, path: number[], d: number): number => {
    let y: number;
    if (n.children.length === 0) {
      y = TOP + (leafRow + 0.5) * rowH;
      leafRow++;
    } else {
      const ys = n.children.map((c, i) => place(c, [...path, i], d + 1));
      y = (ys[0] + ys[ys.length - 1]) / 2;
    }
    const x = d === 0 ? 10 : 18 + (d - 0.5) * colW;
    pos.set(path.join("."), { x, y, w: d === 0 ? 8 : labelW(n.label) });
    return y;
  };
  place(root, [], 0);

  // which edges lie on a lit leaf's path
  const litEdges = new Set<string>();
  for (const p of lit) {
    const parts = p.split(".");
    for (let i = 1; i <= parts.length; i++) litEdges.add(parts.slice(0, i).join("."));
  }

  const edges: React.ReactNode[] = [];
  const nodes: React.ReactNode[] = [];
  const walk = (n: TNode, path: number[]) => {
    const key = path.join(".");
    const a = pos.get(key)!;
    n.children.forEach((c, i) => {
      const ck = [...path, i].join(".");
      const b = pos.get(ck)!;
      const x1 = a.x + a.w / 2;
      const x2 = b.x - b.w / 2;
      const hot = litEdges.has(ck);
      edges.push(
        <line key={`e${ck}`} x1={x1} y1={a.y} x2={x2} y2={b.y} className={hot ? "stroke-callout-warning" : "stroke-foreground/35"} strokeWidth={hot ? 2 : 1.2} />,
      );
      if (showProbabilities) {
        const mx = (x1 + x2) / 2;
        const my = (a.y + b.y) / 2;
        const up = b.y <= a.y;
        edges.push(
          <text
            key={`p${ck}`}
            x={mx}
            y={my + (up ? -4 : 10)}
            textAnchor="middle"
            className="fill-plot text-[9px] font-medium tabular-nums"
            style={{ paintOrder: "stroke", stroke: "var(--background)", strokeWidth: 3 }}
          >
            {fmt.text(c.prob)}
          </text>,
        );
      }
      walk(c, [...path, i]);
    });
    if (path.length === 0) {
      nodes.push(<circle key="root" cx={a.x} cy={a.y} r={4} className="fill-foreground" />);
    } else {
      nodes.push(
        <g key={`n${key}`}>
          <rect x={a.x - a.w / 2} y={a.y - font * 0.8} width={a.w} height={font * 1.6} rx={3} className={litEdges.has(key) ? "fill-callout-warning/20 stroke-callout-warning/70" : "fill-background stroke-foreground/20"} />
          <text x={a.x} y={a.y + font * 0.35} textAnchor="middle" className="fill-foreground" style={{ fontSize: font }}>
            {n.label}
          </text>
        </g>,
      );
    }
  };
  walk(root, []);

  const leafX = W - leafArea + 4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label={ariaLabel}>
      {headers.map((h, d) => (
        <text key={d} x={18 + (d + 0.5) * colW} y={12} textAnchor="middle" className="fill-muted-foreground text-[9px] font-semibold uppercase">
          {h}
        </text>
      ))}
      {leaves.map((l, i) => {
        const y = TOP + i * rowH;
        const isLit = lit.has(l.path);
        return (
          <g
            key={`row${l.path}`}
            onClick={onLeafClick ? () => onLeafClick(l.path) : undefined}
            onKeyDown={
              onLeafClick
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onLeafClick(l.path);
                    }
                  }
                : undefined
            }
            role={onLeafClick ? "button" : undefined}
            tabIndex={onLeafClick ? 0 : undefined}
            aria-pressed={onLeafClick ? isLit : undefined}
            aria-label={onLeafClick ? `Outcome ${outcomeName(l.labels)}` : undefined}
            className={onLeafClick ? "cursor-pointer" : ""}
          >
            <rect x={leafX - 4} y={y + 1} width={leafArea - 2} height={rowH - 2} rx={3} className={isLit ? litClass : "fill-transparent"} />
            <text x={leafX} y={y + rowH / 2 + 3} className="fill-foreground tabular-nums" style={{ fontSize: font - 0.5 }}>
              <tspan className="fill-muted-foreground">{outcomeName(l.labels)}</tspan>
              {showProbabilities && showLeafProducts && (
                <tspan dx={6}>
                  {(() => {
                    const expanded = `${l.probs.map((p) => fmt.text(p)).join("×")} = ${fmt.text(l.product)}`;
                    return l.probs.length > 1 && expanded.length <= 26 ? expanded : fmt.text(l.product);
                  })()}
                </tspan>
              )}
            </text>
          </g>
        );
      })}
      {edges}
      {nodes}
    </svg>
  );
}

// ---------- component ----------

export function ProbTreeDiagram({ config }: { config: Config }) {
  const [tree, setTree] = useState<TNode>(() => buildTree(config));
  const leaves = collectLeaves(tree);
  const [picked, setPicked] = useState<Set<string>>(() =>
    config.highlight ? selectLeaves(config.highlight.leaves, collectLeaves(buildTree(config))) : new Set(),
  );
  const [reversed, setReversed] = useState(false);
  const fmt = makeFmt(config.format);
  const showP = config.showProbabilities;

  const headers = config.stages ? config.stages.map((s) => s.label) : [];
  const observed = config.bayes ? selectLeaves(config.bayes.observedLeaves, leaves) : null;

  // ----- sliders -----
  const sliders = config.editable.map((e, i) => {
    let current: number | null = null;
    if (e.path !== undefined) current = nodeAt(tree, e.path.split(".").map(Number))?.prob ?? null;
    else if (e.stage !== undefined) current = firstAtDepth(tree, e.stage + 1, e.branch)?.prob ?? null;
    else current = firstAtDepth(tree, 1, e.branch)?.prob ?? null;
    if (current === null) return null;
    const branchLabel =
      e.path !== undefined
        ? nodeAt(tree, e.path.split(".").map(Number))?.label
        : config.stages?.[e.stage ?? 0]?.branches[e.branch]?.label;
    const onChange = (v: number) =>
      setTree((t) =>
        e.path !== undefined
          ? editPath(t, e.path.split(".").map(Number), v)
          : editDepth(t, e.allStages ? "all" : e.stage! + 1, e.branch, v),
      );
    return (
      <SliderRow
        key={i}
        label={<Latex latex={e.label ?? `P(\\text{${(branchLabel ?? "").replace(/[{}\\]/g, "")}})`} />}
        value={Number(current.toFixed(4))}
        min={e.min}
        max={e.max}
        step={e.step}
        onChange={onChange}
      />
    );
  });

  // ----- readouts -----
  const readout: React.ReactNode[] = [];
  const leafSum = leaves.reduce((s, l) => s + l.product, 0);

  if (!showP) {
    readout.push(
      <span key="n">
        <Latex latex={`n(S) = ${leaves.length}`} /> outcomes
        {config.highlight && (
          <>
            {" "}
            · <Latex latex={`n(${config.highlight.latex ?? "E"}) = ${picked.size}`} /> ({config.highlight.label})
          </>
        )}
      </span>,
    );
  } else {
    if (config.showLeafSum) {
      const ok = Math.abs(leafSum - 1) < 1e-9;
      readout.push(
        <span key="sum" className={ok ? "" : "text-callout-warning"}>
          All leaves together: <strong className="tabular-nums">{fmt.text(leafSum)}</strong>
          {ok ? <span className="text-muted-foreground"> (every path of the experiment is covered exactly once)</span> : " (should be 1)"}
        </span>,
      );
    }
    if (config.highlight) {
      const sel = leaves.filter((l) => picked.has(l.path));
      const total = sel.reduce((s, l) => s + l.product, 0);
      const name = config.highlight.latex ?? "E";
      readout.push(
        <span key="hl" className="overflow-x-auto">
          <span className="mr-1">{config.highlight.label}:</span>
          <Latex
            latex={
              sel.length === 0
                ? `P(${name}) = 0`
                : `P(${name}) = ${sel.length > 1 && sel.length <= 6 ? `${sel.map((l) => fmt.latex(l.product)).join(" + ")} = ` : ""}${fmt.latex(total)}`
            }
          />
          {sel.length > 6 && <span className="text-muted-foreground"> (sum of {sel.length} leaves)</span>}
        </span>,
      );
    }
  }

  // ----- Bayes -----
  let bayesNode: React.ReactNode = null;
  let reversedTree: TNode | null = null;
  if (config.bayes && observed && showP) {
    const { population, observedLabel } = config.bayes;
    const pObs = leaves.filter((l) => observed.has(l.path)).reduce((s, l) => s + l.product, 0);
    const hyps = tree.children.map((h, i) => {
      const inH = leaves.filter((l) => l.path.split(".")[0] === String(i));
      const joint = inH.filter((l) => observed.has(l.path)).reduce((s, l) => s + l.product, 0);
      return { label: h.label, prior: h.prob, joint, post: pObs > 0 ? joint / pObs : 0, postNot: pObs < 1 ? (h.prob - joint) / (1 - pObs) : 0 };
    });
    const round = (v: number) => Math.round(v * population);
    const obsCount = hyps.reduce((s, h) => s + round(h.joint), 0);
    reversedTree = {
      label: "",
      prob: 1,
      children: [
        { label: observedLabel, prob: pObs, children: hyps.map((h) => ({ label: h.label, prob: h.post, children: [] })) },
        { label: `not ${observedLabel}`, prob: 1 - pObs, children: hyps.map((h) => ({ label: h.label, prob: h.postNot, children: [] })) },
      ],
    };
    bayesNode = (
      <div className="flex flex-col gap-1.5 rounded-md border border-callout-info/40 bg-callout-info/5 p-3 text-sm" aria-live="polite">
        <span className="overflow-x-auto">
          <Latex latex={`P(\\text{${observedLabel}}) = ${fmt.latex(pObs)}`} />
          <span className="text-muted-foreground"> (sum of the shaded leaves)</span>
        </span>
        {hyps.map((h) => (
          <span key={h.label} className="overflow-x-auto">
            <Latex
              latex={`P(\\text{${h.label}} \\mid \\text{${observedLabel}}) = \\frac{${fmt.latex(h.joint)}}{${fmt.latex(pObs)}} = ${pObs > 0 ? dec(h.post) : "\\text{undefined}"}`}
            />
            {pObs > 0 && <span className="text-muted-foreground"> ({dec(h.post * 100)}%)</span>}
          </span>
        ))}
        <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Out of {population.toLocaleString("en-US")}</span>
        {hyps.map((h) => (
          <span key={`nf${h.label}`}>
            {round(h.prior).toLocaleString("en-US")} are <strong>{h.label}</strong>; {round(h.joint).toLocaleString("en-US")} of them {observedLabel}.
          </span>
        ))}
        {obsCount > 0 && (
          <span>
            So of the <strong className="tabular-nums">{obsCount.toLocaleString("en-US")}</strong> who {observedLabel},{" "}
            {hyps
              .map((h) => `${round(h.joint).toLocaleString("en-US")} are ${h.label}`)
              .join(", ")}
            .
          </span>
        )}
      </div>
    );
  }

  // ----- binomial grouping -----
  let collapseNode: React.ReactNode = null;
  if (config.collapseEqualPaths && config.stages && showP) {
    const success =
      config.successLabel ??
      (config.highlight && !Array.isArray(config.highlight.leaves) && "successCount" in config.highlight.leaves
        ? config.highlight.leaves.successCount.label
        : config.stages[0].branches[0].label);
    const n = config.stages.length;
    const groups = Array.from({ length: n + 1 }, (_, k) => leaves.filter((l) => l.labels.filter((x) => x === success).length === k));
    const pS = firstAtDepth(tree, 1, config.stages[0].branches.findIndex((b) => b.label === success))?.prob;
    const uniform =
      pS !== undefined &&
      config.stages.every((s) => s.branches.length === 2) &&
      leaves.every((l) => l.labels.every((x, d) => Math.abs(l.probs[d] - (x === success ? pS : 1 - pS)) < 1e-9));
    collapseNode = (
      <div className="overflow-x-auto rounded-md border bg-background">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-2 py-1.5 font-medium">{success} count k</th>
              <th className="px-2 py-1.5 font-medium">paths</th>
              <th className="px-2 py-1.5 font-medium">each path</th>
              <th className="px-2 py-1.5 font-medium">P(X = k)</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g, k) => {
              const total = g.reduce((s, l) => s + l.product, 0);
              const same = g.every((l) => Math.abs(l.product - g[0].product) < 1e-12);
              return (
                <tr key={k} className="border-b last:border-0">
                  <td className="px-2 py-1 tabular-nums">{k}</td>
                  <td className="px-2 py-1">
                    <Latex latex={`\\binom{${n}}{${k}} = ${g.length}`} />
                  </td>
                  <td className="px-2 py-1">
                    {g.length > 0 && same ? (
                      <Latex latex={uniform ? `p^{${k}}q^{${n - k}} = ${fmt.latex(g[0].product)}` : fmt.latex(g[0].product)} />
                    ) : (
                      <span className="text-muted-foreground">differ</span>
                    )}
                  </td>
                  <td className="px-2 py-1 font-medium">
                    <Latex latex={fmt.latex(total)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {uniform && (
          <p className="border-t px-2 py-1.5 text-center text-sm">
            <Latex latex={`P(X = k) = \\binom{${n}}{k}\\,p^{k}q^{${n}-k}, \\quad p = ${fmt.latex(pS!)},\\ q = ${fmt.latex(1 - pS!)}`} />
          </p>
        )}
      </div>
    );
  }

  const litForward = config.highlight ? picked : (observed ?? new Set<string>());
  const litClass = config.highlight ? "fill-callout-warning/25" : "fill-callout-info/20";
  const toggleLeaf = (p: string) =>
    setPicked((s) => {
      const next = new Set(s);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });

  const title = !showP
    ? "Listing outcomes with a tree"
    : config.bayes
      ? "Probability tree and Bayes' theorem"
      : config.collapseEqualPaths
        ? "From the tree to the binomial formula"
        : "Probability tree";
  const caption =
    config.caption ??
    (!showP
      ? "Each path from the root to a leaf is one outcome, so the leaves list the sample space."
      : config.bayes
        ? "Forward, the tree runs cause then effect. Bayes reads it backwards: among the shaded leaves, what share came from each first branch?"
        : "Multiply along a branch to get a path's probability; add across the leaves that make up an event.");

  return (
    <InteractiveFrame title={title}>
      {config.bayes && reversedTree && (
        <div className="flex gap-2 text-sm" role="group" aria-label="Tree direction">
          {[false, true].map((r) => (
            <button
              key={String(r)}
              type="button"
              aria-pressed={reversed === r}
              onClick={() => setReversed(r)}
              className={`rounded-md border px-3 py-1 ${reversed === r ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {r ? "Reversed tree" : "Forward tree"}
            </button>
          ))}
        </div>
      )}

      {reversed && reversedTree ? (
        <TreeSvg
          root={reversedTree}
          headers={[config.bayes!.observedLabel, config.stages?.[0]?.label ?? "cause"]}
          showProbabilities
          showLeafProducts={config.showLeafProducts}
          lit={new Set(reversedTree.children[0].children.map((_, i) => `0.${i}`))}
          litClass="fill-callout-info/20"
          fmt={fmt}
          ariaLabel="Reversed probability tree: observation first, then cause"
        />
      ) : (
        <TreeSvg
          root={tree}
          headers={headers}
          showProbabilities={showP}
          showLeafProducts={config.showLeafProducts}
          lit={litForward}
          litClass={litClass}
          onLeafClick={config.highlight ? toggleLeaf : undefined}
          fmt={fmt}
          ariaLabel={`Probability tree with ${leaves.length} outcomes`}
        />
      )}

      {config.highlight && !reversed && <p className="text-center text-xs text-muted-foreground">Tap a leaf to add it to or remove it from the event.</p>}

      {sliders.some(Boolean) && <div className="space-y-2">{sliders}</div>}

      {readout.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
          {readout}
        </div>
      )}

      {bayesNode}
      {collapseNode}

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground">{caption}</p>
        {(config.editable.length > 0 || config.highlight) && (
          <button
            type="button"
            onClick={() => {
              const t = buildTree(config);
              setTree(t);
              if (config.highlight) setPicked(selectLeaves(config.highlight.leaves, collectLeaves(t)));
            }}
            className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs"
          >
            Reset
          </button>
        )}
      </div>
    </InteractiveFrame>
  );
}
