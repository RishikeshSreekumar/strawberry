"use client";

import { useId, useState } from "react";
import type { z } from "zod";
import type { matrixRowReducerSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof matrixRowReducerSchema>;
type Mode = Config["mode"];
type OpKind = Config["allowedOps"][number];

// ---------- exact fractions ----------

type Frac = { n: number; d: number };

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}
function frac(n: number, d = 1): Frac {
  if (d === 0) throw new Error("zero denominator");
  if (n === 0) return { n: 0, d: 1 };
  const g = gcd(n, d);
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}
/** Nearest fraction with a small denominator (config entries like 0.5, 1.25). */
function fromNumber(x: number): Frac {
  for (let d = 1; d <= 10000; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-9) return frac(n, d);
  }
  return frac(Math.round(x * 10000), 10000);
}
const fAdd = (p: Frac, q: Frac) => frac(p.n * q.d + q.n * p.d, p.d * q.d);
const fMul = (p: Frac, q: Frac) => frac(p.n * q.n, p.d * q.d);
const fDiv = (p: Frac, q: Frac) => frac(p.n * q.d, p.d * q.n);
const isZero = (p: Frac) => p.n === 0;
const isOne = (p: Frac) => p.n === 1 && p.d === 1;
const ONE = frac(1);

/** "3", "-2/3", "0.5", "1 / 4" → Frac, or null. */
function parseFrac(text: string): Frac | null {
  const s = text.replace(/\s+/g, "").replace(/−/g, "-");
  if (s === "") return null;
  const m = /^(-?\d+(?:\.\d+)?)(?:\/(-?\d+(?:\.\d+)?))?$/.exec(s);
  if (!m) return null;
  const top = fromNumber(Number(m[1]));
  if (m[2] === undefined) return top;
  const bottom = fromNumber(Number(m[2]));
  if (isZero(bottom)) return null;
  return fDiv(top, bottom);
}

function fracLatex(p: Frac, fractions: boolean): string {
  if (!fractions) {
    const v = Number((p.n / p.d).toFixed(3));
    return String(Object.is(v, -0) ? 0 : v);
  }
  if (p.d === 1) return String(p.n);
  return `${p.n < 0 ? "-" : ""}\\frac{${Math.abs(p.n)}}{${p.d}}`;
}

// ---------- row operations ----------

type Op =
  | { kind: "swap"; i: number; j: number }
  | { kind: "scale"; i: number; k: Frac }
  | { kind: "add"; i: number; j: number; k: Frac };

type State = { rows: Frac[][]; factor: Frac };

function applyOp(state: State, op: Op): State {
  const rows = state.rows.map((r) => r.slice());
  let factor = state.factor;
  if (op.kind === "swap") {
    [rows[op.i], rows[op.j]] = [rows[op.j], rows[op.i]];
    factor = fMul(factor, frac(-1));
  } else if (op.kind === "scale") {
    rows[op.i] = rows[op.i].map((x) => fMul(x, op.k));
    factor = fMul(factor, op.k);
  } else {
    rows[op.i] = rows[op.i].map((x, c) => fAdd(x, fMul(op.k, rows[op.j][c])));
  }
  return { rows, factor };
}

function opLatex(op: Op, fractions: boolean): string {
  const R = (i: number) => `R_{${i + 1}}`;
  if (op.kind === "swap") return `${R(op.i)} \\leftrightarrow ${R(op.j)}`;
  if (op.kind === "scale") {
    const k = op.k.n === -1 && op.k.d === 1 ? "-" : fracLatex(op.k, fractions);
    return `${R(op.i)} \\to ${k}${op.k.d !== 1 && fractions ? "\\," : ""}${R(op.i)}`;
  }
  const neg = op.k.n < 0;
  const abs = frac(Math.abs(op.k.n), op.k.d);
  const coef = isOne(abs) ? "" : `${fracLatex(abs, fractions)}${abs.d !== 1 && fractions ? "\\," : ""}`;
  return `${R(op.i)} \\to ${R(op.i)} ${neg ? "-" : "+"} ${coef}${R(op.j)}`;
}

// ---------- form detection ----------

/** Column of the first non-zero entry of each row among columns [0, upTo), or -1. */
function pivotCol(row: Frac[], upTo = row.length): number {
  for (let c = 0; c < upTo; c++) if (!isZero(row[c])) return c;
  return -1;
}

function isEchelon(rows: Frac[][]): boolean {
  let last = -1;
  let seenZero = false;
  for (const row of rows) {
    const p = pivotCol(row);
    if (p === -1) {
      seenZero = true;
      continue;
    }
    if (seenZero || p <= last) return false;
    last = p;
  }
  return true;
}

function isReduced(rows: Frac[][], upTo: number): boolean {
  if (!isEchelon(rows)) return false;
  for (let r = 0; r < rows.length; r++) {
    const p = pivotCol(rows[r]);
    if (p === -1 || p >= upTo) continue;
    if (!isOne(rows[r][p])) return false;
    for (let q = 0; q < rows.length; q++) if (q !== r && !isZero(rows[q][p])) return false;
  }
  return true;
}

function isUpperTriangular(rows: Frac[][], n: number): boolean {
  for (let r = 0; r < n; r++) for (let c = 0; c < r; c++) if (!isZero(rows[r][c])) return false;
  return true;
}

function isIdentity(rows: Frac[][], n: number): boolean {
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      const want = r === c ? 1 : 0;
      if (rows[r][c].n !== want || rows[r][c].d !== 1) return false;
    }
  return true;
}

// ---------- component ----------

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  determinant:
    "Swap rows (det changes sign), scale a row by k (det is multiplied by k) or add a multiple of one row to another (det unchanged) until the matrix is triangular; then det is the product of the diagonal.",
  inverse:
    "Row-reduce [A | I]. Whatever operations turn A into I, applied to I, build A⁻¹ on the right.",
  solve:
    "Use row operations to reach echelon form, then read the system off from the bottom row up. Row operations never change the solutions.",
  rank:
    "Row-reduce to echelon form: the number of non-zero rows is the rank. Row operations never change it.",
};

const OP_LABELS: Record<OpKind, string> = {
  swap: "Swap",
  scale: "Scale",
  add: "Add multiple",
};

const DEFAULT_VARS = ["x", "y", "z", "w"];

export function MatrixRowReducer({ config }: { config: Config }) {
  const mode = config.mode;
  const nRows = config.matrix.length;
  const nA = config.matrix[0].length;
  const square = nRows === nA;
  const augmented =
    config.augmented ??
    (mode === "inverse" ? Array.from({ length: nRows }, (_, r) => Array.from({ length: nRows }, (_, c) => (r === c ? 1 : 0))) : undefined);
  const nB = augmented ? augmented[0].length : 0;
  const fractions = config.fractions;
  const showFactor = (config.showDeterminantFactor ?? mode === "determinant") && square;
  const vars = config.variables ?? DEFAULT_VARS;

  const initial: State = {
    rows: config.matrix.map((row, r) => [...row, ...(augmented ? augmented[r] : [])].map(fromNumber)),
    factor: ONE,
  };

  const [history, setHistory] = useState<{ op: Op; state: State }[]>([]);
  const current = history.length ? history[history.length - 1].state : initial;
  const rows = current.rows;

  const [opKind, setOpKind] = useState<OpKind>(config.allowedOps[0]);
  const [ri, setRi] = useState(nRows > 1 ? 1 : 0);
  const [rj, setRj] = useState(0);
  const [kText, setKText] = useState(opKind === "scale" ? "2" : "-1");
  const [error, setError] = useState<string | null>(null);
  const formId = useId();

  function apply() {
    let op: Op;
    if (opKind === "swap") {
      if (ri === rj) return setError("Pick two different rows to swap.");
      op = { kind: "swap", i: ri, j: rj };
    } else {
      const k = parseFrac(kText);
      if (!k) return setError("Type k as a whole number, a fraction like -2/3, or a decimal.");
      if (opKind === "scale") {
        if (isZero(k)) return setError("Scaling a row by 0 wipes out an equation — it is not allowed (it can't be undone).");
        op = { kind: "scale", i: ri, k };
      } else {
        if (ri === rj) return setError("Add a multiple of a different row (R → R + kR would just scale it).");
        if (isZero(k)) return setError("Adding 0 times a row changes nothing.");
        op = { kind: "add", i: ri, j: rj, k };
      }
    }
    setError(null);
    setHistory((h) => [...h, { op, state: applyOp(current, op) }]);
  }

  // ---------- analysis ----------
  const echelon = isEchelon(rows);
  const reduced = isReduced(rows, nA);
  const pivotsInA = rows.map((row) => pivotCol(row)).filter((p) => p !== -1 && p < nA);
  const rankA = pivotsInA.length;
  const nonZeroRows = rows.filter((row) => pivotCol(row) !== -1).length;
  const badRow = rows.findIndex((row) => {
    const p = pivotCol(row);
    return p !== -1 && p >= nA;
  });

  // Matrix LaTeX.
  const colSpec = "c".repeat(nA) + (nB ? "|" + "c".repeat(nB) : "");
  const body = rows.map((row) => row.map((x) => fracLatex(x, fractions)).join(" & ")).join(" \\\\ ");
  const matrixLatex = `\\left[\\begin{array}{${colSpec}} ${body} \\end{array}\\right]`;

  const last = history.length ? history[history.length - 1].op : null;
  const readouts: { key: string; latex?: string; text?: string; tone?: "good" | "warn" }[] = [];

  // Form badge text.
  const formText = reduced ? "Reduced row echelon form" : echelon ? "Row echelon form" : "Not yet in echelon form";

  if (showFactor) {
    const f = current.factor;
    readouts.push({
      key: "factor",
      latex: `\\det(\\text{current}) = ${fracLatex(f, fractions)} \\times \\det A`,
      text: "swap: ×(−1) · scale by k: ×k · add a multiple: ×1",
    });
    if (isUpperTriangular(rows, nA)) {
      let prod = ONE;
      for (let r = 0; r < nA; r++) prod = fMul(prod, rows[r][r]);
      const diag = rows
        .slice(0, nA)
        .map((row, r) => (row[r].n < 0 ? `(${fracLatex(row[r], fractions)})` : fracLatex(row[r], fractions)))
        .join(" \\cdot ");
      readouts.push({
        key: "tri",
        latex: `\\text{triangular: } \\det(\\text{current}) = ${diag} = ${fracLatex(prod, fractions)}`,
      });
      readouts.push({
        key: "detA",
        latex: `\\det A = \\frac{${fracLatex(prod, fractions)}}{${fracLatex(f, fractions)}} = ${fracLatex(fDiv(prod, f), fractions)}`,
        tone: "good",
      });
    } else if (mode === "determinant") {
      readouts.push({ key: "tri", text: "Clear the entries below the diagonal to make the matrix triangular." });
    }
  }

  if (mode === "rank") {
    if (echelon) {
      readouts.push({
        key: "rank",
        latex: nB
          ? `\\operatorname{rank} A = ${rankA}, \\quad \\operatorname{rank}[A \\mid B] = ${nonZeroRows}`
          : `\\operatorname{rank} = ${nonZeroRows} \\ \\text{(non-zero rows)}`,
        tone: "good",
      });
    } else {
      readouts.push({ key: "rank", text: "Reach echelon form, then count the non-zero rows to read off the rank." });
    }
  }

  if (mode === "solve" && nB) {
    if (badRow !== -1) {
      readouts.push({
        key: "cons",
        latex: `\\text{Row } ${badRow + 1}: \\ 0 = ${fracLatex(rows[badRow][pivotCol(rows[badRow])], fractions)}`,
        text: "Impossible equation: the system is inconsistent — no solution.",
        tone: "warn",
      });
    } else if (echelon) {
      const pivots = new Set(pivotsInA);
      const free = Array.from({ length: nA }, (_, c) => c).filter((c) => !pivots.has(c));
      if (free.length === 0) {
        readouts.push({ key: "cons", text: `Consistent, rank ${rankA} = number of unknowns: exactly one solution.`, tone: "good" });
      } else {
        readouts.push({
          key: "cons",
          latex: `\\text{free: } ${free.map((c) => vars[c]).join(", ")}`,
          text: `Consistent, rank ${rankA} < ${nA} unknowns: infinitely many solutions (${free.length} free variable${free.length > 1 ? "s" : ""}).`,
          tone: "good",
        });
      }
      if (reduced && nB === 1) {
        const eqs = rows
          .filter((row) => {
            const p = pivotCol(row);
            return p !== -1 && p < nA;
          })
          .map((row) => {
            const p = pivotCol(row);
            let rhs = fracLatex(row[nA], fractions);
            const terms = free
              .filter((c) => !isZero(row[c]))
              .map((c) => {
                const k = frac(-row[c].n, row[c].d);
                const abs = frac(Math.abs(k.n), k.d);
                return `${k.n < 0 ? "-" : "+"} ${isOne(abs) ? "" : fracLatex(abs, fractions)}${vars[c]}`;
              });
            if (terms.length) rhs = isZero(row[nA]) ? terms.join(" ").replace(/^\+ /, "") : `${rhs} ${terms.join(" ")}`;
            return `${vars[p]} = ${rhs}`;
          });
        readouts.push({ key: "sol", latex: eqs.join(", \\quad "), tone: "good" });
      } else {
        readouts.push({ key: "sol", text: "Back-substitute from the bottom row up, or keep going to reduced form to read the answer directly." });
      }
    } else {
      readouts.push({ key: "cons", text: "Reach echelon form (zeros below each leading entry) to decide whether the system is consistent." });
    }
  }

  if (mode === "inverse") {
    const zeroLeft = rows.findIndex((row) => pivotCol(row, nA) === -1);
    if (isIdentity(rows, nA)) {
      const right = rows.map((row) => row.slice(nA).map((x) => fracLatex(x, fractions)).join(" & ")).join(" \\\\ ");
      readouts.push({
        key: "inv",
        latex: `A^{-1} = \\begin{pmatrix} ${right} \\end{pmatrix}`,
        text: "The left block is I, so the right block is the inverse.",
        tone: "good",
      });
    } else if (zeroLeft !== -1) {
      readouts.push({
        key: "inv",
        text: `Row ${zeroLeft + 1} of the left block is all zeros: A can never become I, so A is singular (det A = 0) and has no inverse.`,
        tone: "warn",
      });
    } else {
      readouts.push({ key: "inv", text: "Keep going until the left block is the identity I." });
    }
  }

  const targetMet = config.target === "reduced" ? reduced : config.target === "echelon" ? echelon : false;

  const selectClass = "rounded-md border bg-background px-2 py-1 text-sm";
  const rowOptions = Array.from({ length: nRows }, (_, r) => (
    <option key={r} value={r}>
      {`R${r + 1}`}
    </option>
  ));

  return (
    <InteractiveFrame title={mode === "inverse" ? "Gauss–Jordan: [A | I]" : mode === "determinant" ? "Row operations and det" : "Row reduction"}>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`rounded-full border px-2 py-0.5 font-medium ${
            reduced ? "border-callout-tip text-callout-tip" : echelon ? "border-callout-info text-callout-info" : "text-muted-foreground"
          }`}
        >
          {formText}
        </span>
        {config.target && (
          <span
            className={`rounded-full border px-2 py-0.5 ${targetMet ? "border-callout-tip bg-callout-tip/10 font-medium text-callout-tip" : "text-muted-foreground"}`}
          >
            Goal: {config.target === "reduced" ? "reduced echelon form" : "echelon form"}
            {targetMet ? " ✓ reached" : ""}
          </span>
        )}
      </div>

      <div className="overflow-x-auto rounded-md border bg-background px-3 py-4 text-center text-base" aria-live="polite">
        <Latex latex={matrixLatex} display />
        <p className="mt-1 text-xs text-muted-foreground">
          {last ? (
            <>
              Last step: <Latex latex={opLatex(last, fractions)} />
            </>
          ) : (
            "Starting matrix"
          )}
        </p>
      </div>

      <div className="space-y-3 rounded-md border bg-background p-3">
        {config.allowedOps.length > 1 && (
          <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Row operation">
            {config.allowedOps.map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={opKind === k}
                onClick={() => {
                  setOpKind(k);
                  setError(null);
                  if (k === "scale" && kText === "-1") setKText("2");
                  if (k === "add" && kText === "2") setKText("-1");
                }}
                className={`rounded-md border px-3 py-1 ${opKind === k ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
              >
                {OP_LABELS[k]}
              </button>
            ))}
          </div>
        )}
        <form
          className="flex flex-wrap items-center gap-2 text-sm"
          aria-label={`${OP_LABELS[opKind]} rows`}
          onSubmit={(e) => {
            e.preventDefault();
            apply();
          }}
        >
          <label htmlFor={`${formId}-i`} className="sr-only">
            Row to change
          </label>
          <select id={`${formId}-i`} value={ri} onChange={(e) => setRi(Number(e.target.value))} className={selectClass}>
            {rowOptions}
          </select>
          {opKind === "swap" && (
            <>
              <Latex latex="\leftrightarrow" />
              <label htmlFor={`${formId}-j`} className="sr-only">
                Row to swap with
              </label>
              <select id={`${formId}-j`} value={rj} onChange={(e) => setRj(Number(e.target.value))} className={selectClass}>
                {rowOptions}
              </select>
            </>
          )}
          {opKind === "scale" && (
            <>
              <Latex latex="\to" />
              <label htmlFor={`${formId}-k`} className="sr-only">
                Multiplier k
              </label>
              <input
                id={`${formId}-k`}
                value={kText}
                onChange={(e) => setKText(e.target.value)}
                inputMode="text"
                className="w-16 rounded-md border bg-background px-2 py-1 text-center tabular-nums"
              />
              <span>{`× R${ri + 1}`}</span>
            </>
          )}
          {opKind === "add" && (
            <>
              <Latex latex={`\\to R_{${ri + 1}} +`} />
              <label htmlFor={`${formId}-k`} className="sr-only">
                Multiplier k
              </label>
              <input
                id={`${formId}-k`}
                value={kText}
                onChange={(e) => setKText(e.target.value)}
                inputMode="text"
                className="w-16 rounded-md border bg-background px-2 py-1 text-center tabular-nums"
              />
              <span>×</span>
              <label htmlFor={`${formId}-j`} className="sr-only">
                Row to add
              </label>
              <select id={`${formId}-j`} value={rj} onChange={(e) => setRj(Number(e.target.value))} className={selectClass}>
                {rowOptions}
              </select>
            </>
          )}
          <button type="submit" className="rounded-md border border-primary bg-primary/10 px-3 py-1 font-medium">
            Apply
          </button>
        </form>
        {error && (
          <p className="text-xs font-medium text-callout-warning" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            disabled={!history.length}
            onClick={() => setHistory((h) => h.slice(0, -1))}
            className="rounded-md border bg-background px-2 py-1 disabled:opacity-50"
          >
            Undo
          </button>
          <button
            type="button"
            disabled={!history.length}
            onClick={() => {
              setHistory([]);
              setError(null);
            }}
            className="rounded-md border bg-background px-2 py-1 disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </div>

      {history.length > 0 && (
        <ol className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground" aria-label="Steps so far">
          {history.map((h, idx) => (
            <li key={idx}>
              {idx + 1}. <Latex latex={opLatex(h.op, fractions)} />
            </li>
          ))}
        </ol>
      )}

      {readouts.length > 0 && (
        <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
          {readouts.map((r) => (
            <div key={r.key} className="space-y-0.5">
              {r.latex && (
                <div
                  className={`overflow-x-auto ${r.tone === "good" ? "text-callout-tip" : r.tone === "warn" ? "text-callout-warning" : ""}`}
                >
                  <Latex latex={r.latex} />
                </div>
              )}
              {r.text && (
                <p
                  className={
                    r.tone === "warn" ? "font-medium text-callout-warning" : r.latex ? "text-xs text-muted-foreground" : "text-muted-foreground"
                  }
                >
                  {r.text}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">{config.caption ?? DEFAULT_CAPTIONS[mode]}</p>
    </InteractiveFrame>
  );
}
