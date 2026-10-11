/**
 * Shared complex-number arithmetic and LaTeX formatting for the Complex
 * Numbers & Quadratics (cq) interactives. Pure functions, SSR-safe, and
 * never print NaN.
 */

export type C = [number, number];

export const cadd = (p: C, q: C): C => [p[0] + q[0], p[1] + q[1]];
export const csub = (p: C, q: C): C => [p[0] - q[0], p[1] - q[1]];
export const cmul = (p: C, q: C): C => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
export const cscale = (k: number, p: C): C => [k * p[0], k * p[1]];
export const cconj = (p: C): C => [p[0], -p[1]];
export const cabs = (p: C): number => Math.hypot(p[0], p[1]);
export const cfromPolar = (r: number, theta: number): C => [r * Math.cos(theta), r * Math.sin(theta)];

/** p / q, or null when q is (numerically) zero. */
export function cdiv(p: C, q: C): C | null {
  const d = q[0] * q[0] + q[1] * q[1];
  if (d < 1e-18) return null;
  return [(p[0] * q[0] + p[1] * q[1]) / d, (p[1] * q[0] - p[0] * q[1]) / d];
}

/** Principal argument in (−π, π], or null for z = 0. */
export function carg(p: C): number | null {
  if (cabs(p) < 1e-12) return null;
  const t = Math.atan2(p[1], p[0]);
  // atan2(-0, negative) is -π; the principal value is +π.
  return t <= -Math.PI + 1e-12 ? Math.PI : t;
}

/** Clean a float for display: -0 -> 0, 1.9999999 -> 2. */
export function tidy(v: number, decimals = 2): number {
  if (!Number.isFinite(v)) return 0;
  const r = Number(v.toFixed(decimals));
  return Object.is(r, -0) ? 0 : r;
}

/** A real number as LaTeX (2 decimals by default), "\infty" if not finite. */
export function numLatex(v: number, decimals = 2): string {
  if (!Number.isFinite(v)) return "\\infty";
  return String(tidy(v, decimals));
}

/** a + bi written the way people write it: 3 - 2i, i, -i, 2, 0. */
export function cxLatex(z: C, decimals = 2): string {
  const re = tidy(z[0], decimals);
  const im = tidy(z[1], decimals);
  const imPart = (v: number) => {
    const abs = Math.abs(v);
    return abs === 1 ? "i" : `${abs}i`;
  };
  if (im === 0) return String(re);
  if (re === 0) return `${im < 0 ? "-" : ""}${imPart(im)}`;
  return `${re} ${im < 0 ? "-" : "+"} ${imPart(im)}`;
}

/** "z - (2 + i)", "z + 1", "z - 2i", "z" for the shift z − a. */
export function shiftLatex(a: C, name = "z"): string {
  const re = tidy(a[0]);
  const im = tidy(a[1]);
  if (re === 0 && im === 0) return name;
  if (im === 0) return `${name} ${re < 0 ? "+" : "-"} ${Math.abs(re)}`;
  if (re === 0) return `${name} ${im < 0 ? "+" : "-"} ${Math.abs(im) === 1 ? "" : Math.abs(im)}i`;
  return `${name} - (${cxLatex(a)})`;
}

/**
 * An angle in radians as LaTeX: an exact multiple of π/12 when it is one
 * (\frac{\pi}{3}, -\frac{3\pi}{4}), otherwise a decimal.
 */
export function angleLatex(theta: number): string {
  if (!Number.isFinite(theta)) return "\\text{undefined}";
  const twelfths = (theta * 12) / Math.PI;
  const k = Math.round(twelfths);
  if (Math.abs(twelfths - k) < 1e-6) {
    if (k === 0) return "0";
    const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : Math.abs(x));
    const g = gcd(Math.abs(k), 12) || 1;
    const num = k / g;
    const den = 12 / g;
    const sign = num < 0 ? "-" : "";
    const absNum = Math.abs(num);
    const top = `${absNum === 1 ? "" : absNum}\\pi`;
    return den === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${den}}`;
  }
  return numLatex(theta, 3);
}

/** Degrees, tidy, for plain-text and LaTeX readouts. */
export function degrees(theta: number): number {
  return tidy((theta * 180) / Math.PI, 1);
}

/** Simplest surd for √n when n is a whole number (50 -> 5\sqrt{2}), else null. */
export function surdLatex(n: number): string | null {
  if (!Number.isFinite(n) || n < 0) return null;
  const whole = Math.round(n);
  if (Math.abs(n - whole) > 1e-9) return null;
  const root = Math.round(Math.sqrt(whole));
  if (root * root === whole) return String(root);
  for (let k = Math.floor(Math.sqrt(whole)); k >= 2; k--) {
    if (whole % (k * k) === 0) return `${k}\\sqrt{${whole / (k * k)}}`;
  }
  return `\\sqrt{${whole}}`;
}

/** |z| as an exact surd when |z|² is whole, plus a decimal: 2\sqrt{2} \approx 2.83. */
export function modLatex(z: C): string {
  const sq = z[0] * z[0] + z[1] * z[1];
  const exact = surdLatex(sq);
  const dec = numLatex(Math.sqrt(sq));
  if (exact === null || exact === dec) return dec;
  return `${exact} \\approx ${dec}`;
}

/** Keep huge coordinates finite and SVG-friendly. */
export function clampCoord(v: number, limit = 1e4): number {
  if (!Number.isFinite(v)) return v > 0 ? limit : -limit;
  return Math.max(-limit, Math.min(limit, v));
}
