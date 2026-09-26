"use client";

import { useState } from "react";
import type { z } from "zod";
import type { pncPascalTriangleSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof pncPascalTriangleSchema>;
type Cell = { n: number; r: number };

const W = 400;
const TOP = 18;

function binom(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let v = 1;
  for (let k = 1; k <= Math.min(r, n - r); k++) v = (v * (n - k + 1)) / k;
  return Math.round(v);
}

/** k-th (0-based, lexicographic with L < R) word of n-r L's and r R's. */
function unrankPath(n: number, r: number, k: number): ("L" | "R")[] {
  const out: ("L" | "R")[] = [];
  let left = n - r;
  let right = r;
  let rank = k;
  while (left + right > 0) {
    const withL = left > 0 ? binom(left - 1 + right, right) : 0;
    if (rank < withL) {
      out.push("L");
      left--;
    } else {
      rank -= withL;
      out.push("R");
      right--;
    }
  }
  return out;
}

/** Wrap a LaTeX term in brackets when a power of it would be ambiguous. */
function base(term: string) {
  return /^[A-Za-z]$|^\d+$|^\\[A-Za-z]+$/.test(term.trim()) ? term : `\\left(${term}\\right)`;
}

function termLatex(n: number, r: number, a: string, b: string, coefMode: "binom" | "number" | "none") {
  const coef =
    coefMode === "binom" ? `\\binom{${n}}{${r}}` : coefMode === "none" || binom(n, r) === 1 ? "" : `${binom(n, r)}`;
  const pa = n - r === 0 ? "" : n - r === 1 ? base(a) : `${base(a)}^{${n - r}}`;
  const pb = r === 0 ? "" : r === 1 ? base(b) : `${base(b)}^{${r}}`;
  const body = `${coef}${coef && (pa || pb) ? "\\," : ""}${pa}${pa && pb ? "\\," : ""}${pb}`;
  return body || "1";
}

const DEFAULT_CAPTIONS: Record<string, string> = {
  paths:
    "Each step goes down-left or down-right. Every path to an entry must arrive from one of the two entries above it, so the counts add: that is Pascal's rule.",
  "row-sum": "Each path of n steps is a string of n left/right choices, so all the paths ending in row n number 2^n.",
  symmetry: "Swap every left step for a right step: paths to the r-th entry pair up with paths to the (n-r)-th.",
  "hockey-stick": "Unfold Pascal's rule down a diagonal: the blade is the sum of the handle.",
  "odd-entries": "Colour the odd entries and a Sierpinski triangle appears; row n has 2 to the power (number of 1s in binary n) odd entries.",
  "powers-of-11": "Read a row as the digits of 11^n: it works until an entry reaches 10 and the carries kick in.",
  expansion: "Each term of (a + b)^n picks b from r of the n brackets and a from the rest, which can happen nCr ways.",
};

export function PncPascalTriangle({ config }: { config: Config }) {
  const rows = config.rows;
  const mode = config.mode;
  const pattern = config.pattern;

  const hockey = mode === "highlight" && pattern === "hockey-stick";
  const defaultCell = (): Cell => {
    if (config.initialCell) {
      const { n, r } = config.initialCell;
      // The hockey-stick blade needs r >= 1 (the handle is column r - 1).
      return hockey && r === 0 ? { n: Math.max(1, n), r: 1 } : { n, r };
    }
    const n = Math.min(rows, 4);
    if (hockey) return { n: Math.min(rows, 6), r: Math.min(3, Math.min(rows, 6)) };
    if (mode === "highlight" && pattern === "symmetry") return { n, r: 1 };
    return { n, r: Math.floor(n / 2) };
  };

  const [cell, setCell] = useState<Cell>(defaultCell);
  const [pathK, setPathK] = useState(0);
  const [hover, setHover] = useState<Cell | null>(null);

  const DX = Math.min(40, (W - 16) / (rows + 1));
  const DY = Math.min(30, DX * 0.9);
  const H = TOP + rows * DY + 18;
  const font = DX < 30 ? 9 : 11;
  const pos = (n: number, r: number) => ({ x: W / 2 + (r - n / 2) * DX, y: TOP + n * DY });

  const pick = (n: number, r: number) => {
    if (hockey && r === 0) return;
    setCell({ n, r });
    setPathK(0);
  };

  // ---- which cells and edges are lit ----
  const { n: N, r: R } = cell;
  const pathCount = binom(N, R);
  const k = Math.min(pathK, pathCount - 1);
  const path = mode === "paths" ? unrankPath(N, R, k) : [];

  const inPathRegion = (n: number, r: number) => mode === "paths" && r <= R && n - r <= N - R;

  type Tone = "none" | "main" | "alt" | "target" | "dim";
  const tone = (n: number, r: number): Tone => {
    const v = binom(n, r);
    if (mode === "paths") {
      if (n === N && r === R) return "target";
      return inPathRegion(n, r) ? "alt" : "dim";
    }
    if (mode === "expansion") return n === N ? (r === R ? "target" : "main") : "dim";
    switch (pattern) {
      case "row-sum":
      case "powers-of-11":
        return n === N ? "main" : "none";
      case "symmetry":
        if (n !== N) return "none";
        return r === R ? "target" : r === N - R ? "main" : "none";
      case "hockey-stick":
        if (n === N && r === R) return "target";
        return r === R - 1 && n >= R - 1 && n <= N - 1 ? "main" : "none";
      case "odd-entries":
        return v % 2 === 1 ? "main" : "none";
    }
  };

  const edgesOnPath = new Set<string>();
  if (mode === "paths") {
    let n = 0;
    let r = 0;
    for (const step of path) {
      const nr = step === "R" ? r + 1 : r;
      edgesOnPath.add(`${n},${r}-${n + 1},${nr}`);
      n += 1;
      r = nr;
    }
  }

  const cells: Cell[] = [];
  for (let n = 0; n <= rows; n++) for (let r = 0; r <= n; r++) cells.push({ n, r });

  const fills: Record<Tone, string> = {
    none: "fill-background stroke-foreground/20",
    dim: "fill-background stroke-foreground/10",
    alt: "fill-callout-info/15 stroke-callout-info/60",
    main: "fill-plot/20 stroke-plot",
    target: "fill-callout-warning/30 stroke-callout-warning",
  };

  // ---- readout ----
  const rowSum = 2 ** N;
  let readout: React.ReactNode = null;
  if (mode === "paths") {
    readout = (
      <>
        <Latex latex={`\\binom{${N}}{${R}} = ${pathCount} \\text{ paths}`} />
        {N > 0 && R > 0 && R < N && (
          <Latex latex={`\\binom{${N}}{${R}} = \\binom{${N - 1}}{${R - 1}} + \\binom{${N - 1}}{${R}} = ${binom(N - 1, R - 1)} + ${binom(N - 1, R)}`} />
        )}
        {N > 0 && (
          <span className="font-mono text-sm">
            {`Path ${k + 1} of ${pathCount}: ${path.join(" ")} `}
            <span className="text-muted-foreground">
              ({N - R} L, {R} R)
            </span>
          </span>
        )}
      </>
    );
  } else if (mode === "expansion") {
    const terms = Array.from({ length: N + 1 }, (_, r) => r);
    const lhs = `\\left(${config.expansion.a} + ${config.expansion.b}\\right)^{${N}}`;
    readout = (
      <>
        <span className="overflow-x-auto">
          <Latex latex={`${lhs} = ${terms.map((r) => termLatex(N, r, config.expansion.a, config.expansion.b, "binom")).join(" + ")}`} />
        </span>
        <span className="overflow-x-auto">
          <Latex latex={`= ${terms.map((r) => termLatex(N, r, config.expansion.a, config.expansion.b, "number")).join(" + ")}`} />
        </span>
        <span className="overflow-x-auto">
          <Latex
            latex={`T_{${R + 1}} = ${termLatex(N, R, config.expansion.a, config.expansion.b, "binom")} = ${termLatex(N, R, config.expansion.a, config.expansion.b, "number")}`}
          />
        </span>
      </>
    );
  } else if (pattern === "row-sum") {
    readout = (
      <span className="overflow-x-auto">
        <Latex latex={`${Array.from({ length: N + 1 }, (_, r) => binom(N, r)).join(" + ")} = ${rowSum} = 2^{${N}}`} />
      </span>
    );
  } else if (pattern === "symmetry") {
    readout = <Latex latex={`\\binom{${N}}{${R}} = \\binom{${N}}{${N - R}} = ${binom(N, R)}`} />;
  } else if (pattern === "hockey-stick") {
    const handle = Array.from({ length: N - R + 1 }, (_, i) => binom(R - 1 + i, R - 1));
    readout = (
      <>
        <span className="overflow-x-auto">
          <Latex
            latex={`\\binom{${R - 1}}{${R - 1}} + ${N - R >= 1 ? `\\cdots + ` : ""}\\binom{${N - 1}}{${R - 1}} = \\binom{${N}}{${R}}`}
          />
        </span>
        <span className="overflow-x-auto">
          <Latex latex={`${handle.join(" + ")} = ${binom(N, R)}`} />
        </span>
      </>
    );
  } else if (pattern === "odd-entries") {
    const odd = Array.from({ length: N + 1 }, (_, r) => binom(N, r)).filter((v) => v % 2 === 1).length;
    readout = (
      <span>
        Row {N} has <strong>{odd}</strong> odd {odd === 1 ? "entry" : "entries"}
        <span className="text-muted-foreground">
          {" "}
          ({N} = {N.toString(2)} in binary, 2<sup>{N.toString(2).split("").filter((c) => c === "1").length}</sup> = {odd})
        </span>
      </span>
    );
  } else if (pattern === "powers-of-11") {
    const entries = Array.from({ length: N + 1 }, (_, r) => binom(N, r));
    const carries = entries.some((v) => v >= 10);
    readout = (
      <>
        <span className="overflow-x-auto">
          <Latex latex={`11^{${N}} = ${entries.map((v, r) => `${v}\\cdot 10^{${N - r}}`).join(" + ")} = ${11 ** N}`} />
        </span>
        <span className={carries ? "text-callout-warning" : "text-callout-tip"}>
          {carries
            ? `Row ${N} reads ${entries.join(" ")}, but ${entries.find((v) => v >= 10)} is not a digit: carrying gives ${11 ** N}.`
            : `Row ${N} reads ${entries.join("")} = 11^${N} directly.`}
        </span>
      </>
    );
  }

  const title = { paths: "Pascal's triangle: counting paths", highlight: "Patterns in Pascal's triangle", expansion: "Pascal's triangle and (a + b)ⁿ" }[mode];
  const caption = config.caption ?? DEFAULT_CAPTIONS[mode === "highlight" ? pattern : mode];

  return (
    <InteractiveFrame title={title}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border bg-background" role="img" aria-label={`Pascal's triangle, rows 0 to ${rows}`}>
        {/* lattice edges */}
        {cells
          .filter((c) => c.n < rows)
          .flatMap((c) =>
            [0, 1].map((d) => {
              const a = pos(c.n, c.r);
              const b = pos(c.n + 1, c.r + d);
              const key = `${c.n},${c.r}-${c.n + 1},${c.r + d}`;
              const hot = edgesOnPath.has(key);
              const region = inPathRegion(c.n, c.r) && inPathRegion(c.n + 1, c.r + d);
              return (
                <line
                  key={key}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={hot ? "stroke-callout-warning" : region ? "stroke-callout-info/50" : "stroke-foreground/10"}
                  strokeWidth={hot ? 3 : region ? 1.5 : 1}
                />
              );
            }),
          )}

        {/* symmetry axis */}
        {mode === "highlight" && pattern === "symmetry" && (
          <line x1={W / 2} y1={TOP - 12} x2={W / 2} y2={H - 4} className="stroke-callout-definition" strokeDasharray="4 3" />
        )}

        {cells.map(({ n, r }) => {
          const p = pos(n, r);
          const v = binom(n, r);
          const t = tone(n, r);
          const rad = DX * 0.42;
          return (
            <g
              key={`${n}-${r}`}
              onClick={() => pick(n, r)}
              onMouseEnter={() => setHover({ n, r })}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              {config.showFormula && <title>{`${n}C${r} = ${v}`}</title>}
              <circle cx={p.x} cy={p.y} r={rad} className={fills[t]} strokeWidth={t === "target" ? 2 : 1} />
              <text
                x={p.x}
                y={p.y + font * 0.36}
                textAnchor="middle"
                className={`tabular-nums ${t === "dim" ? "fill-muted-foreground/60" : "fill-foreground"} ${t === "target" || t === "main" ? "font-semibold" : ""}`}
                style={{ fontSize: v >= 100 ? font - 2 : font }}
              >
                {v}
              </text>
            </g>
          );
        })}

        {/* row sums at the right edge */}
        {mode === "highlight" && pattern === "row-sum" &&
          Array.from({ length: rows + 1 }, (_, n) => (
            <text key={n} x={W - 4} y={TOP + n * DY + 3} textAnchor="end" className={`text-[9px] tabular-nums ${n === N ? "fill-plot font-semibold" : "fill-muted-foreground"}`}>
              {2 ** n}
            </text>
          ))}
      </svg>

      {config.showFormula && (
        <p className="text-center text-xs text-muted-foreground" aria-live="polite">
          {hover ? (
            <Latex latex={`\\binom{${hover.n}}{${hover.r}} = ${binom(hover.n, hover.r)}`} />
          ) : (
            "Tap an entry to select it."
          )}
        </p>
      )}

      <div className="space-y-2">
        <SliderRow label={<Latex latex="n" />} value={N} min={hockey ? 1 : 0} max={rows} step={1} onChange={(n) => pick(n, Math.min(R, n))} />
        {(mode === "paths" || mode === "expansion" || pattern === "symmetry" || pattern === "hockey-stick") && (
          <SliderRow label={<Latex latex="r" />} value={R} min={hockey ? 1 : 0} max={N} step={1} onChange={(r) => pick(N, r)} />
        )}
      </div>

      {mode === "paths" && pathCount > 1 && (
        <div className="flex flex-wrap gap-2 text-sm">
          <button type="button" onClick={() => setPathK((k - 1 + pathCount) % pathCount)} className="rounded-md border bg-background px-3 py-1">
            Previous path
          </button>
          <button type="button" onClick={() => setPathK((k + 1) % pathCount)} className="rounded-md border bg-background px-3 py-1 font-medium">
            Next path
          </button>
        </div>
      )}

      <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
        {readout}
      </div>

      <p className="text-center text-xs text-muted-foreground">{caption}</p>
    </InteractiveFrame>
  );
}
