"use client";

import { useId, useState } from "react";
import type { z } from "zod";
import { srfRegions, srfShadedRegions, type SrfRegion } from "../../lib/srf";
import type { srfVennDiagramSchema } from "../../schemas/blocks";
import { RichText } from "../rich-text";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof srfVennDiagramSchema>;

const W = 400;
const H = 300;

type Layout = {
  circles: { name: "A" | "B" | "C"; cx: number; cy: number; r: number; lx: number; ly: number }[];
  /** Where each region's count is printed. */
  spots: Record<string, { x: number; y: number }>;
};

const LAYOUTS: Record<2 | 3, Layout> = {
  2: {
    circles: [
      { name: "A", cx: 155, cy: 150, r: 100, lx: 75, ly: 42 },
      { name: "B", cx: 245, cy: 150, r: 100, lx: 325, ly: 42 },
    ],
    spots: {
      A: { x: 100, y: 150 },
      AB: { x: 200, y: 150 },
      B: { x: 300, y: 150 },
      "": { x: 40, y: 272 },
    },
  },
  3: {
    circles: [
      { name: "A", cx: 165, cy: 118, r: 80, lx: 92, ly: 40 },
      { name: "B", cx: 235, cy: 118, r: 80, lx: 308, ly: 40 },
      { name: "C", cx: 200, cy: 183, r: 80, lx: 300, ly: 262 },
    ],
    spots: {
      A: { x: 128, y: 100 },
      B: { x: 272, y: 100 },
      C: { x: 200, y: 238 },
      AB: { x: 200, y: 84 },
      AC: { x: 158, y: 165 },
      BC: { x: 242, y: 165 },
      ABC: { x: 200, y: 138 },
      "": { x: 40, y: 272 },
    },
  },
};

const sameRegions = (a: SrfRegion[], b: SrfRegion[]) =>
  a.length === b.length && a.every((r) => b.includes(r));

export function SrfVennDiagram({ config }: { config: Config }) {
  const sets = config.sets;
  const layout = LAYOUTS[sets];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const names = ["A", "B", "C"].slice(0, sets);
  const label = (name: string) => config.labels?.[names.indexOf(name)] ?? name;

  const presetRegions = config.expressions.map((e) => {
    const r = srfShadedRegions(e.expr, sets);
    return typeof r === "string" ? [] : r;
  });
  const [shaded, setShaded] = useState<SrfRegion[]>(
    config.initialExpression !== undefined ? presetRegions[config.initialExpression] : [],
  );

  const counts = config.counts;
  const count = (r: SrfRegion) => counts?.[r as keyof typeof counts] ?? 0;
  const total = (regions: SrfRegion[]) => regions.reduce((s, r) => s + count(r), 0);

  const regionAt = (x: number, y: number): SrfRegion =>
    layout.circles
      .filter((c) => (x - c.cx) ** 2 + (y - c.cy) ** 2 < c.r ** 2)
      .map((c) => c.name)
      .join("");

  const toggle = (region: SrfRegion) =>
    setShaded((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]));

  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    if (box.width === 0 || box.height === 0) return;
    const x = ((e.clientX - box.left) / box.width) * W;
    const y = ((e.clientY - box.top) / box.height) * H;
    if (x < 8 || x > W - 8 || y < 8 || y > H - 8) return;
    toggle(regionAt(x, y));
  };

  const matches = config.expressions.filter((_, i) => sameRegions(presetRegions[i], shaded));
  const ordered = srfRegions(sets).filter((r) => shaded.includes(r));

  const describe = (r: SrfRegion) => {
    if (r === "") return `outside every set`;
    const inside = r.split("").map(label);
    const outside = names.filter((n) => !r.includes(n)).map(label);
    return outside.length === 0
      ? `in ${inside.join(" and ")}`
      : `in ${inside.join(" and ")} only`;
  };

  // Inclusion–exclusion pieces.
  const nOf = (members: string) =>
    total(srfRegions(sets).filter((r) => members.split("").every((m) => r.includes(m))));
  const union = total(srfRegions(sets).filter((r) => r !== ""));

  let ieLatex = "";
  if (config.showInclusionExclusion && counts) {
    if (sets === 2) {
      ieLatex = `n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = ${nOf("A")} + ${nOf("B")} - ${nOf("AB")} = ${union}`;
    } else {
      ieLatex = `n(A \\cup B \\cup C) = ${nOf("A")} + ${nOf("B")} + ${nOf("C")} - ${nOf("AB")} - ${nOf("BC")} - ${nOf("AC")} + ${nOf("ABC")} = ${union}`;
    }
  }

  const caption =
    config.caption ??
    "Click any region to shade or unshade it, or pick an expression to shade it for you. Two expressions are equal exactly when they shade the same regions.";

  return (
    <InteractiveFrame title={sets === 2 ? "Venn diagram: two sets" : "Venn diagram: three sets"}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-md cursor-pointer rounded-md border bg-background"
        role="img"
        aria-label={`Venn diagram of ${names.map(label).join(", ")} inside ${config.universeLabel}`}
        onClick={onClick}
      >
        <defs>
          {layout.circles.map((c) => (
            <clipPath key={c.name} id={`${uid}-clip-${c.name}`}>
              <circle cx={c.cx} cy={c.cy} r={c.r} />
            </clipPath>
          ))}
          {srfRegions(sets).map((region) => {
            const inside = layout.circles.filter((c) => region.includes(c.name));
            const outside = layout.circles.filter((c) => !region.includes(c.name));
            let body: React.ReactNode = <rect x={8} y={8} width={W - 16} height={H - 16} fill="white" />;
            for (const c of inside) {
              body = <g clipPath={`url(#${uid}-clip-${c.name})`}>{body}</g>;
            }
            return (
              <mask key={region || "out"} id={`${uid}-region-${region || "out"}`}>
                <rect x={0} y={0} width={W} height={H} fill="black" />
                {body}
                {outside.map((c) => (
                  <circle key={c.name} cx={c.cx} cy={c.cy} r={c.r} fill="black" />
                ))}
              </mask>
            );
          })}
        </defs>

        <rect x={8} y={8} width={W - 16} height={H - 16} rx={6} className="fill-background stroke-foreground/40" strokeWidth={1.5} />
        {ordered.map((region) => (
          <rect
            key={region || "out"}
            x={0}
            y={0}
            width={W}
            height={H}
            mask={`url(#${uid}-region-${region || "out"})`}
            className="fill-plot/35"
          />
        ))}
        {layout.circles.map((c) => (
          <circle key={c.name} cx={c.cx} cy={c.cy} r={c.r} fill="none" className="stroke-foreground/70" strokeWidth={2} />
        ))}
        {layout.circles.map((c) => (
          <text key={c.name} x={c.lx} y={c.ly} textAnchor="middle" className="fill-foreground text-[14px] font-semibold">
            {label(c.name)}
          </text>
        ))}
        <text x={22} y={30} className="fill-muted-foreground text-[13px] font-semibold">
          {config.universeLabel}
        </text>
        {counts &&
          srfRegions(sets).map((r) => {
            const spot = layout.spots[r];
            return (
              <text
                key={r || "out"}
                x={spot.x}
                y={spot.y + 5}
                textAnchor="middle"
                className={`text-[14px] tabular-nums ${shaded.includes(r) ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}
              >
                {count(r)}
              </text>
            );
          })}
      </svg>

      {config.expressions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {config.expressions.map((e, i) => {
            const active = sameRegions(presetRegions[i], shaded);
            return (
              <button
                key={`${e.expr}-${i}`}
                type="button"
                onClick={() => setShaded(presetRegions[i])}
                className={`rounded-md border px-2.5 py-1 text-sm transition-colors ${
                  active ? "border-plot bg-plot/10" : "bg-background hover:bg-muted"
                }`}
              >
                <Latex latex={e.latex} />
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setShaded([])}
            className="rounded-md border bg-background px-2.5 py-1 text-sm text-muted-foreground hover:bg-muted"
          >
            Clear
          </button>
        </div>
      )}

      <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        {ordered.length === 0 ? (
          <p className="text-muted-foreground">Nothing shaded: that is the empty set.</p>
        ) : (
          <>
            <p>
              Shaded: {ordered.map(describe).join("; ")}.
            </p>
            {matches.length > 0 && (
              <p>
                This shading is{" "}
                {matches.map((m, i) => (
                  <span key={i}>
                    {i > 0 && " = "}
                    <Latex latex={m.latex} />
                  </span>
                ))}
                .
              </p>
            )}
            {counts && (
              <p className="tabular-nums">
                Elements shaded: {ordered.map((r) => count(r)).join(" + ")} = <strong>{total(ordered)}</strong>
              </p>
            )}
          </>
        )}
        {ieLatex && (
          <div className="overflow-x-auto border-t pt-2">
            <Latex latex={ieLatex} />
          </div>
        )}
        {counts && (
          <p className="text-xs text-muted-foreground tabular-nums">
            Total in {config.universeLabel}: {total(srfRegions(sets))}
          </p>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <RichText text={caption} />
      </p>
    </InteractiveFrame>
  );
}
