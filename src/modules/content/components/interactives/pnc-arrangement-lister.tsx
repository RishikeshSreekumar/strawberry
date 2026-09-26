"use client";

import { useMemo, useState } from "react";
import type { z } from "zod";
import type { pncArrangementListerSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof pncArrangementListerSchema>;
type View = "all" | "grouped" | "one";

const SUBSCRIPTS = "₀₁₂₃₄₅₆₇₈₉";
const SEP = "\u0001";

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

/** All ordered selections of r distinct indices from 0..n-1, lexicographic. */
function arrangements(n: number, r: number): number[][] {
  const out: number[][] = [];
  const used = new Array<boolean>(n).fill(false);
  const cur: number[] = [];
  const walk = () => {
    if (cur.length === r) {
      out.push([...cur]);
      return;
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(i);
      walk();
      cur.pop();
      used[i] = false;
    }
  };
  walk();
  return out;
}

function rotations(seq: string[]) {
  return seq.map((_, k) => [...seq.slice(k), ...seq.slice(0, k)].join(SEP));
}

function classKey(seq: string[], idx: number[], groupBy: Config["groupBy"]) {
  switch (groupBy) {
    case "none":
      return idx.join(",");
    case "selection":
      return [...seq].sort().join(SEP);
    case "identical":
      return seq.join(SEP);
    case "rotation":
      return rotations(seq).sort()[0];
    case "rotation-reflection":
      return [...rotations(seq), ...rotations([...seq].reverse())].sort()[0];
  }
}

function hue(i: number) {
  return Math.round((i * 137.508) % 360);
}

export function PncArrangementLister({ config }: { config: Config }) {
  const { items, groupBy } = config;
  const n = items.length;
  const r = Math.min(config.r ?? n, n);
  const starsBars = config.display === "stars-bars";
  const circular = config.mode === "circular";

  // Copy labels: A₁, A₂ for items that repeat.
  const multiplicity = new Map<string, number>();
  for (const it of items) multiplicity.set(it, (multiplicity.get(it) ?? 0) + 1);
  const seen = new Map<string, number>();
  const labelled = items.map((it) => {
    const k = (seen.get(it) ?? 0) + 1;
    seen.set(it, k);
    const repeated = (multiplicity.get(it) ?? 0) > 1;
    return config.showLabels && repeated
      ? `${it}${String(k)
          .split("")
          .map((d) => SUBSCRIPTS[Number(d)])
          .join("")}`
      : it;
  });
  const distinct = multiplicity.size === n;

  const { list, classes } = useMemo(() => {
    const all = arrangements(n, r);
    const classIndex = new Map<string, number>();
    const members: number[][] = [];
    const list = all.map((idx, i) => {
      const key = classKey(
        idx.map((j) => items[j]),
        idx,
        groupBy,
      );
      let c = classIndex.get(key);
      if (c === undefined) {
        c = members.length;
        classIndex.set(key, c);
        members.push([]);
      }
      members[c].push(i);
      return { idx, cls: c };
    });
    return { list, classes: members };
  }, [items, n, r, groupBy]);

  const grouping = groupBy !== "none";
  const [view, setView] = useState<View>("all");
  const [active, setActive] = useState<number | null>(null);

  const total = list.length;
  const sizes = classes.map((m) => m.length);
  const uniform = sizes.every((s) => s === sizes[0]);

  const colourStyle = (cls: number, strong = false): React.CSSProperties =>
    grouping
      ? {
          backgroundColor: `hsl(${hue(cls)} 75% 55% / ${strong ? 0.28 : 0.16})`,
          borderColor: `hsl(${hue(cls)} 65% 50% / 0.75)`,
        }
      : {};

  const renderWord = (idx: number[]) => {
    const labels = idx.map((j) => labelled[j]);
    if (starsBars) {
      const word = idx.map((j) => items[j]).join("");
      const counts = word.split("|").map((part) => part.length);
      return (
        <span className="flex flex-col items-center leading-tight">
          <span className="font-mono tracking-wider">{idx.map((j) => (items[j] === "|" ? "|" : "★")).join("")}</span>
          <span className="text-[10px] text-muted-foreground tabular-nums">({counts.join(", ")})</span>
        </span>
      );
    }
    if (circular) {
      const R = 20;
      return (
        <svg viewBox="-30 -30 60 60" className="h-14 w-14" aria-hidden="true">
          <circle r={R} className="fill-none stroke-foreground/30" />
          {labels.map((lab, k) => {
            const a = -Math.PI / 2 + (2 * Math.PI * k) / labels.length;
            return (
              <text
                key={k}
                x={R * Math.cos(a)}
                y={R * Math.sin(a) + 3.5}
                textAnchor="middle"
                className={`text-[10px] font-semibold ${k === 0 ? "fill-plot" : "fill-foreground"}`}
              >
                {lab}
              </text>
            );
          })}
        </svg>
      );
    }
    return <span className="font-mono tracking-wide">{labels.join(config.showLabels && !distinct ? " " : "")}</span>;
  };

  const wordText = (idx: number[]) => idx.map((j) => labelled[j]).join(circular ? "-" : "");

  const chip = (i: number, badge?: number) => {
    const { idx, cls } = list[i];
    const dim = active !== null && active !== cls;
    return (
      <button
        key={i}
        type="button"
        onClick={() => setActive((a) => (a === cls || !grouping ? null : cls))}
        aria-pressed={grouping ? active === cls : undefined}
        aria-label={`${wordText(idx)}${grouping ? `, class ${cls + 1}` : ""}`}
        className={`relative flex min-w-9 items-center justify-center rounded-md border bg-background px-1.5 py-1 text-sm transition-opacity ${
          dim ? "opacity-25" : ""
        }`}
        style={colourStyle(cls, active === cls)}
      >
        {renderWord(idx)}
        {badge !== undefined && (
          <span className="ml-1 text-[10px] font-semibold text-muted-foreground tabular-nums">×{badge}</span>
        )}
      </button>
    );
  };

  // What gets listed under the cap.
  const cap = config.maxShown;
  let body: React.ReactNode;
  let hidden = 0;
  if (view === "all" || !grouping) {
    const shown = Math.min(total, cap);
    hidden = total - shown;
    body = <div className="flex flex-wrap gap-1.5">{list.slice(0, shown).map((_, i) => chip(i))}</div>;
  } else if (view === "grouped") {
    let budget = cap;
    const rows: React.ReactNode[] = [];
    classes.forEach((m, c) => {
      if (budget <= 0) {
        hidden += m.length;
        return;
      }
      const take = m.slice(0, budget);
      budget -= take.length;
      hidden += m.length - take.length;
      rows.push(
        <div key={c} className="flex items-center gap-2 rounded-md border-l-4 pl-2" style={{ borderLeftColor: `hsl(${hue(c)} 65% 50%)` }}>
          <div className="flex flex-1 flex-wrap gap-1.5">{take.map((i) => chip(i))}</div>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{m.length}</span>
        </div>,
      );
    });
    body = <div className="space-y-1.5">{rows}</div>;
  } else {
    const shown = Math.min(classes.length, cap);
    hidden = classes.length - shown;
    body = <div className="flex flex-wrap gap-1.5">{classes.slice(0, shown).map((m) => chip(m[0], m.length))}</div>;
  }

  // ---- readouts ----
  const slotFactors = Array.from({ length: r }, (_, k) => n - k);
  const totalLatex =
    r === n
      ? `${n}! = ${r > 1 ? `${slotFactors.join(" \\times ")} = ` : ""}${total}`
      : `{}^{${n}}P_{${r}} = ${slotFactors.join(" \\times ")} = ${total}`;
  const classWord = { none: "", selection: "selection", identical: "word", rotation: "arrangement", "rotation-reflection": "arrangement" }[groupBy];

  let named: string | null = null;
  const stars = items.filter((x) => x === "*").length;
  const bars = items.filter((x) => x === "|").length;
  if (starsBars && stars + bars === n && r === n) {
    named = `\\binom{${stars}+${bars}}{${bars}} = \\binom{${n}}{${bars}} = ${classes.length}`;
  } else if (groupBy === "selection" && distinct) {
    named = `\\binom{${n}}{${r}} = \\frac{{}^{${n}}P_{${r}}}{${r}!} = \\frac{${total}}{${factorial(r)}} = ${classes.length}`;
  } else if (groupBy === "identical" && r === n && !distinct) {
    const denom = [...multiplicity.values()]
      .filter((m) => m > 1)
      .map((m) => `${m}!`)
      .join("\\,");
    named = `\\frac{${n}!}{${denom}} = ${classes.length}`;
  } else if (groupBy === "rotation" && distinct) {
    named = r === n ? `\\frac{${n}!}{${n}} = (${n}-1)! = ${classes.length}` : `\\frac{{}^{${n}}P_{${r}}}{${r}} = ${classes.length}`;
  } else if (groupBy === "rotation-reflection" && distinct && r >= 3) {
    named = r === n ? `\\frac{(${n}-1)!}{2} = ${classes.length}` : `\\frac{{}^{${n}}P_{${r}}}{2 \\cdot ${r}} = ${classes.length}`;
  }

  const activeMembers = active !== null ? classes[active] : null;

  return (
    <InteractiveFrame title={circular ? "Circular arrangements" : starsBars ? "Stars and bars" : "Every arrangement, listed"}>
      {config.showSlots && (
        <div className="flex flex-wrap items-end justify-center gap-1.5" aria-label={`Slots: ${slotFactors.join(" times ")}`}>
          {slotFactors.map((f, k) => (
            <div key={k} className="flex items-end gap-1.5">
              {k > 0 && <span className="pb-5 text-muted-foreground">×</span>}
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-plot/60 bg-background text-base font-semibold tabular-nums">
                  {f}
                </span>
                <span className="mt-1 text-[10px] text-muted-foreground">slot {k + 1}</span>
              </div>
            </div>
          ))}
          <span className="pb-5 font-semibold tabular-nums">= {total}</span>
        </div>
      )}

      {grouping && (
        <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="View">
          {(
            [
              ["all", `All ${total}`],
              ["grouped", "Grouped"],
              ["one", `One per ${classWord}`],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded-md border px-3 py-1 ${view === v ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="max-h-96 overflow-y-auto rounded-md border bg-background p-2">
        {body}
        {hidden > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            …and {hidden} more not listed (the counts below include them).
          </p>
        )}
      </div>

      <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="text-muted-foreground">{distinct ? "Arrangements" : "Arrangements (copies labelled)"}</span>
          <span className="overflow-x-auto">
            <Latex latex={totalLatex} />
          </span>
        </div>
        {grouping && (
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-muted-foreground">
              Different {classWord}s
            </span>
            <span className="overflow-x-auto">
              {uniform ? (
                <Latex latex={`${total} \\div ${sizes[0]} = ${classes.length}`} />
              ) : (
                <span className="tabular-nums">{classes.length} (groups of unequal size)</span>
              )}
            </span>
          </div>
        )}
        {named && (
          <div className="flex justify-end overflow-x-auto">
            <Latex latex={named} />
          </div>
        )}
        {groupBy === "rotation-reflection" && r <= 2 && (
          <p className="text-xs text-callout-warning">With {r} {r === 1 ? "seat" : "seats"} a flip is already a rotation, so nothing halves.</p>
        )}
        {activeMembers && (
          <p className="text-muted-foreground">
            This {classWord}: {activeMembers.length} {activeMembers.length === 1 ? "arrangement" : "arrangements"} (
            {activeMembers
              .slice(0, 12)
              .map((i) => wordText(list[i].idx))
              .join(", ")}
            {activeMembers.length > 12 ? ", …" : ""})
          </p>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {config.caption ??
          (grouping
            ? "Same colour = counted once. Tap an arrangement to see everything that collapses into it."
            : "Fill the first slot, then the next, and so on: every arrangement appears exactly once.")}
      </p>
    </InteractiveFrame>
  );
}
