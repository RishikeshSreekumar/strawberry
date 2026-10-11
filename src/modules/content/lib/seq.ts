import { compileExpression } from "./math-eval";

/**
 * Pure helpers behind the Sequences and Series (seq-*) interactives:
 * terms and partial sums of the standard progressions, their closed-form
 * sums and sums to infinity, and the three means of two positive numbers.
 * Everything returns NaN (never throws) for undefined values, so callers
 * only need Number.isFinite checks.
 */

export type SeqKind = "ap" | "gp" | "hp" | "agp" | "custom";

export type SeqParams = {
  /** First term (AP, GP, AGP) or first term of the underlying AP (HP). */
  a: number;
  /** Common difference (AP, HP's underlying AP, AGP's arithmetic part). */
  d: number;
  /** Common ratio (GP, AGP's geometric part). */
  r: number;
};

/**
 * General term t_k (k = 1, 2, ...).
 * - ap: a + (k − 1)d
 * - gp: a r^(k−1)
 * - hp: 1 / (a + (k − 1)d), the reciprocal of an AP (NaN when that AP term is 0)
 * - agp: (a + (k − 1)d) r^(k−1)
 */
export function seqTerm(kind: Exclude<SeqKind, "custom">, p: SeqParams, k: number): number {
  const arith = p.a + (k - 1) * p.d;
  const geom = Math.pow(p.r, k - 1);
  switch (kind) {
    case "ap":
      return arith;
    case "gp":
      return p.a * geom;
    case "hp":
      return Math.abs(arith) < 1e-12 ? NaN : 1 / arith;
    case "agp":
      return arith * geom;
  }
}

/** Evaluator for an authored general term in the variable k (math-eval grammar). */
export function seqCompile(expr: string): (k: number) => number {
  const evaluate = compileExpression(expr);
  return (k: number) => {
    try {
      const v = evaluate({ k });
      return Number.isFinite(v) ? v : NaN;
    } catch {
      return NaN;
    }
  };
}

/** Error message for a bad general-term expression, or null if it is usable. */
export function seqExpressionError(expr: string): string | null {
  try {
    const evaluate = compileExpression(expr);
    evaluate({ k: 1 });
    return null;
  } catch (e) {
    return `general term must be an expression in k: ${(e as Error).message}`;
  }
}

/**
 * Terms t_1..t_n and partial sums S_1..S_n. Once a term is undefined the
 * remaining partial sums are NaN too.
 */
export function seqTable(term: (k: number) => number, n: number): { terms: number[]; sums: number[] } {
  const terms: number[] = [];
  const sums: number[] = [];
  let s = 0;
  for (let k = 1; k <= n; k++) {
    const t = term(k);
    terms.push(t);
    s += t;
    sums.push(s);
  }
  return { terms, sums };
}

/**
 * Closed-form S_n where one exists (AP, GP, AGP); NaN for HP (no closed
 * form) or any undefined value.
 */
export function seqClosedSum(kind: Exclude<SeqKind, "custom">, p: SeqParams, n: number): number {
  const { a, d, r } = p;
  switch (kind) {
    case "ap":
      return (n / 2) * (2 * a + (n - 1) * d);
    case "gp":
      return Math.abs(r - 1) < 1e-12 ? n * a : (a * (1 - Math.pow(r, n))) / (1 - r);
    case "agp": {
      if (Math.abs(r - 1) < 1e-12) return (n / 2) * (2 * a + (n - 1) * d);
      const rn = Math.pow(r, n);
      return (a - (a + (n - 1) * d) * rn) / (1 - r) + (d * r * (1 - Math.pow(r, n - 1))) / ((1 - r) * (1 - r));
    }
    case "hp":
      return NaN;
  }
}

/**
 * Sum to infinity: a/(1 − r) for a GP and a/(1 − r) + dr/(1 − r)² for an
 * AGP when |r| < 1; NaN otherwise (AP and HP never converge unless trivial).
 */
export function seqSumToInfinity(kind: SeqKind, p: SeqParams): number {
  const { a, d, r } = p;
  if (kind === "gp") return Math.abs(r) < 1 ? a / (1 - r) : a === 0 ? 0 : NaN;
  if (kind === "agp") return Math.abs(r) < 1 ? a / (1 - r) + (d * r) / ((1 - r) * (1 - r)) : NaN;
  if (kind === "ap") return a === 0 && d === 0 ? 0 : NaN;
  return NaN;
}

/** AM, GM, HM of two positive numbers (NaN unless both are positive). */
export function seqMeans(a: number, b: number): { am: number; gm: number; hm: number } {
  if (!(a > 0 && b > 0)) return { am: NaN, gm: NaN, hm: NaN };
  return { am: (a + b) / 2, gm: Math.sqrt(a * b), hm: (2 * a * b) / (a + b) };
}

/** Compact number for readouts: up to `decimals` places, trailing zeros dropped. */
export function seqFmt(v: number, decimals = 4): string {
  if (!Number.isFinite(v)) return "undefined";
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 1e-4 && v !== 0)) {
    const [m, e] = v.toExponential(3).split("e");
    return `${Number(m)} \\times 10^{${Number(e)}}`;
  }
  const s = Number(v.toFixed(decimals));
  return Object.is(s, -0) ? "0" : String(s);
}
