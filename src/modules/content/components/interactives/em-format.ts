/**
 * Shared number formatting and axis helpers for the Electricity &
 * Magnetism (em) interactives. Pure functions, SSR-safe.
 */

/** Coulomb constant k = 1/(4πε₀), in the JEE-rounded form. */
export const K_COULOMB = 9e9;

/** Trim a toPrecision string: "2.50" -> "2.5", "3.00" -> "3". */
function trim(s: string): string {
  return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}

/**
 * A number as LaTeX with `sig` significant figures: plain for moderate
 * magnitudes, a × 10^n otherwise. Never prints NaN.
 */
export function sciLatex(v: number, sig = 3): string {
  if (!Number.isFinite(v)) return "\\infty";
  if (Math.abs(v) < 1e-15) return "0";
  let exp = Math.floor(Math.log10(Math.abs(v)));
  if (exp >= -2 && exp <= 4) return trim(Number(v.toPrecision(sig)).toString());
  let mant = Number((v / 10 ** exp).toPrecision(sig));
  if (Math.abs(mant) >= 10) {
    mant /= 10;
    exp += 1;
  }
  return `${trim(mant.toPrecision(sig))} \\times 10^{${exp}}`;
}

/** Plain-text number with `sig` significant figures (tick labels, sliders). */
export function sigText(v: number, sig = 3): string {
  if (!Number.isFinite(v)) return "—";
  if (Math.abs(v) < 1e-12) return "0";
  return trim(Number(v.toPrecision(sig)).toString());
}

/** A "nice" step (1, 2 or 5 × 10^n) close to `raw`. */
export function niceStep(raw: number): number {
  if (!(raw > 0) || !Number.isFinite(raw)) return 1;
  const p = 10 ** Math.floor(Math.log10(raw));
  const f = raw / p;
  const m = f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10;
  return m * p;
}

/** Tick values between lo and hi with roughly `count` intervals. */
export function niceTicks(lo: number, hi: number, count = 5): number[] {
  if (!(hi > lo)) return [lo];
  const step = niceStep((hi - lo) / count);
  const out: number[] = [];
  for (let t = Math.ceil(lo / step - 1e-9) * step; t <= hi + step * 1e-9; t += step) {
    out.push(Number(t.toPrecision(12)));
  }
  return out;
}

/** Angle of (x, y) from +x, in degrees within [0, 360). */
export function directionDeg(x: number, y: number): number {
  const d = (Math.atan2(y, x) * 180) / Math.PI;
  return (d + 360) % 360;
}
