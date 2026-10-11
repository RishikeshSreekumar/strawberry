import { compileExpression } from "../../lib/math-eval";

/**
 * Numeric helpers shared by the calculus (calc-*) interactives: safe
 * evaluation, one-sided and central difference quotients, and sign-change
 * root finding. Everything returns NaN rather than throwing, so callers
 * only ever need Number.isFinite checks.
 */

export type RealFn = (x: number) => number;

/** Compile an expression in x; evaluation errors and excluded points give NaN. */
export function safeFn(expr: string, excluded: number[] = []): RealFn {
  let evaluate: (env: Record<string, number>) => number;
  try {
    evaluate = compileExpression(expr);
  } catch {
    return () => NaN;
  }
  return (x: number) => {
    if (excluded.some((ex) => Math.abs(x - ex) < 1e-12)) return NaN;
    try {
      const v = evaluate({ x });
      return Number.isFinite(v) ? v : NaN;
    } catch {
      return NaN;
    }
  };
}

/** Left and right difference quotients at x with step h. */
export function oneSided(f: RealFn, x: number, h: number): { left: number; right: number } {
  const fx = f(x);
  return { left: (fx - f(x - h)) / h, right: (f(x + h) - fx) / h };
}

export type TangentKind = "smooth" | "corner" | "vertical" | "undefined";

/**
 * Classify the derivative at x from the one-sided quotients: equal finite
 * sides are a derivative, unequal ones a corner, and sides that keep
 * growing as h shrinks are a vertical tangent (or cusp).
 */
export function tangentAt(
  f: RealFn,
  x: number,
): { kind: TangentKind; left: number; right: number; slope: number } {
  if (!Number.isFinite(f(x))) return { kind: "undefined", left: NaN, right: NaN, slope: NaN };
  const coarse = oneSided(f, x, 1e-5);
  const fine = oneSided(f, x, 1e-8);
  const blowsUp = (a: number, b: number) =>
    Number.isFinite(a) && Number.isFinite(b) && Math.abs(b) > 100 && Math.abs(b) > 4 * Math.abs(a);
  if (blowsUp(coarse.left, fine.left) || blowsUp(coarse.right, fine.right)) {
    return { kind: "vertical", left: fine.left, right: fine.right, slope: NaN };
  }
  const { left, right } = coarse;
  if (!Number.isFinite(left) && !Number.isFinite(right)) {
    return { kind: "undefined", left, right, slope: NaN };
  }
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    // An endpoint of the domain: only one side exists.
    const slope = Number.isFinite(left) ? left : right;
    return { kind: "smooth", left, right, slope };
  }
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  if (Math.abs(left - right) > 2e-3 * scale) return { kind: "corner", left, right, slope: NaN };
  return { kind: "smooth", left, right, slope: (left + right) / 2 };
}

/** Central first derivative (numeric). */
export function numericDerivative(f: RealFn): RealFn {
  const h = 1e-5;
  return (x: number) => {
    const v = (f(x + h) - f(x - h)) / (2 * h);
    return Number.isFinite(v) ? v : NaN;
  };
}

/** Central second derivative (numeric). */
export function numericSecondDerivative(f: RealFn): RealFn {
  const h = 1e-4;
  return (x: number) => {
    const v = (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
    return Number.isFinite(v) ? v : NaN;
  };
}

/** Sign with a dead zone, so round-off near zero reads as 0. */
export function signOf(v: number, eps = 1e-7): -1 | 0 | 1 {
  if (!Number.isFinite(v) || Math.abs(v) <= eps) return 0;
  return v > 0 ? 1 : -1;
}

export type SignChange = {
  x: number;
  /** g is (nearly) zero and continuous there, rather than jumping across 0. */
  zero: boolean;
};

/**
 * Points in [lo, hi] where g changes sign or touches zero, found by
 * sampling and bisection. A sign change across a point where g blows up is
 * a pole and is skipped; one across a point where g is merely undefined
 * (NaN, e.g. an exact f′ at a corner) is reported with zero: false.
 * Callers drop points outside the domain of f.
 */
export function signChanges(g: RealFn, lo: number, hi: number, samples = 600): SignChange[] {
  const found: SignChange[] = [];
  const dx = (hi - lo) / samples;
  const xs = Array.from({ length: samples + 1 }, (_, i) => lo + i * dx);
  const vs = xs.map(g);
  // Median magnitude: robust to the huge values next to an asymptote.
  const mags = vs.filter(Number.isFinite).map((v) => Math.abs(v)).sort((a, b) => a - b);
  const scale = Math.max(1e-9, mags.length ? mags[Math.floor(mags.length / 2)] : 1);
  const eps = 1e-9 * scale + 1e-12;
  const huge = 1e4 * Math.max(1, scale);
  const push = (x: number, undefinedHere = false) => {
    if (found.some((p) => Math.abs(p.x - x) < 2 * dx)) return;
    const v = g(x);
    found.push({ x, zero: !undefinedHere && Number.isFinite(v) && Math.abs(v) < 1e-4 * Math.max(1, scale) });
  };
  for (let i = 0; i < samples; i++) {
    const a = xs[i];
    const b = xs[i + 1];
    const va = vs[i];
    const vb = vs[i + 1];
    if (!Number.isFinite(va) || !Number.isFinite(vb)) continue;
    if (Math.abs(va) <= eps) {
      push(a);
      continue;
    }
    if (va * vb < 0) {
      let l = a;
      let r = b;
      let vl = va;
      let pole = false;
      let undefinedHere = false;
      for (let k = 0; k < 60; k++) {
        const m = (l + r) / 2;
        const vm = g(m);
        if (Number.isFinite(vm) && Math.abs(vm) > huge) {
          pole = true;
          break;
        }
        if (!Number.isFinite(vm)) {
          // Undefined at an isolated point; a pole if g is huge beside it.
          const side = Math.max(Math.abs(g(m - 1e-9)), Math.abs(g(m + 1e-9)));
          pole = !(side < huge);
          undefinedHere = true;
          l = r = m;
          break;
        }
        if (vm === 0) {
          l = r = m;
          break;
        }
        if (vl * vm < 0) r = m;
        else {
          l = m;
          vl = vm;
        }
      }
      if (!pole) push(roundNice((l + r) / 2), undefinedHere);
    }
  }
  // A sample landing exactly on an undefined point between finite neighbours.
  for (let i = 1; i < samples; i++) {
    const [p, c, n] = [vs[i - 1], vs[i], vs[i + 1]];
    const big = 100 * Math.max(1, scale);
    if (!Number.isFinite(c) && Number.isFinite(p) && Number.isFinite(n) && Math.abs(p) < big && Math.abs(n) < big) {
      push(roundNice(xs[i]), true);
    }
  }
  if (vs.length && Number.isFinite(vs[samples]) && Math.abs(vs[samples]) <= eps) push(xs[samples]);
  // Touching zeros without a sign change show up as tiny local minima of |g|.
  for (let i = 1; i < samples; i++) {
    const [p, c, n] = [vs[i - 1], vs[i], vs[i + 1]];
    if (![p, c, n].every(Number.isFinite)) continue;
    if (Math.abs(c) <= Math.abs(p) && Math.abs(c) <= Math.abs(n) && Math.abs(c) < 1e-6 * Math.max(1, scale)) {
      push(roundNice(xs[i]));
    }
  }
  return found.sort((u, v) => u.x - v.x);
}

/** Snap values within 1e-7 of a multiple of 1/1000 (bisection noise). */
export function roundNice(x: number): number {
  const r = Math.round(x * 1000) / 1000;
  return Math.abs(r - x) < 1e-7 ? r : x;
}

/** Plain-text number for SVG labels and readouts ("—" when undefined). */
export function fmt(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  const r = Number(value.toFixed(decimals));
  return String(Object.is(r, -0) ? 0 : r);
}

/** Snap a slider value to its step grid (avoids 0.30000000000000004). */
export function snap(value: number, min: number, step: number): number {
  const k = Math.round((value - min) / step);
  return Number((min + k * step).toFixed(10));
}
