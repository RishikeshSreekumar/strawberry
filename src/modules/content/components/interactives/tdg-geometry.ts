/**
 * Shared space geometry and LaTeX formatting for the Three-Dimensional
 * Geometry (tdg) interactives. Pure functions, SSR-safe, and never print
 * NaN: every constructor that can degenerate returns null instead.
 */

export type V3 = [number, number, number];

/** The plane ax + by + cz + d = 0, written [a, b, c, d]. */
export type Plane = [number, number, number, number];

export const EPS = 1e-9;

export const add = (p: V3, q: V3): V3 => [p[0] + q[0], p[1] + q[1], p[2] + q[2]];
export const sub = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
export const mul = (k: number, p: V3): V3 => [k * p[0], k * p[1], k * p[2]];
export const dot = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
export const cross = (p: V3, q: V3): V3 => [
  p[1] * q[2] - p[2] * q[1],
  p[2] * q[0] - p[0] * q[2],
  p[0] * q[1] - p[1] * q[0],
];
export const len = (p: V3) => Math.hypot(p[0], p[1], p[2]);
export const dist = (p: V3, q: V3) => len(sub(p, q));
export const isZero = (p: V3, eps = 1e-9) => len(p) < eps;
export const unit = (p: V3): V3 => {
  const l = len(p);
  return l < EPS ? [0, 0, 0] : mul(1 / l, p);
};
export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const toDeg = (r: number) => (r * 180) / Math.PI;
export const toRad = (d: number) => (d * Math.PI) / 180;

export const normalOf = (pl: Plane): V3 => [pl[0], pl[1], pl[2]];
/** P(x) = ax + by + cz + d. */
export const evalPlane = (pl: Plane, x: V3) => dot(normalOf(pl), x) + pl[3];

/** Some unit vector perpendicular to p (p non-zero). */
export function perpendicularTo(p: V3): V3 {
  const u = unit(p);
  const trial = Math.abs(u[2]) < 0.9 ? cross(u, [0, 0, 1]) : cross(u, [1, 0, 0]);
  return unit(trial);
}

/** Acute angle (degrees) between two lines with directions p and q, or null. */
export function lineAngle(p: V3, q: V3): number | null {
  const l = len(p) * len(q);
  if (l < EPS) return null;
  return toDeg(Math.acos(clamp(Math.abs(dot(p, q)) / l, 0, 1)));
}

/** Foot of the perpendicular from x to the line a + λb (b non-zero). */
export function footOnLine(x: V3, a: V3, b: V3): { foot: V3; lambda: number } | null {
  const bb = dot(b, b);
  if (bb < EPS) return null;
  const lambda = dot(sub(x, a), b) / bb;
  return { foot: add(a, mul(lambda, b)), lambda };
}

/** Foot of the perpendicular from x to the plane (normal non-zero). */
export function footOnPlane(x: V3, pl: Plane): { foot: V3; t: number } | null {
  const n = normalOf(pl);
  const nn = dot(n, n);
  if (nn < EPS) return null;
  const t = -evalPlane(pl, x) / nn;
  return { foot: add(x, mul(t, n)), t };
}

export type LinePair =
  | { kind: "degenerate" }
  | { kind: "coincident"; angle: 0 }
  | { kind: "parallel"; angle: 0; distance: number; p: V3; q: V3 }
  | { kind: "intersecting" | "skew"; angle: number; distance: number; p: V3; q: V3; lambda: number; mu: number };

/**
 * Two lines a + λb and c + μd: their relation, the angle between them, the
 * shortest distance and the feet p (on the first) and q (on the second) of
 * the common perpendicular.
 */
export function linePair(a: V3, b: V3, c: V3, d: V3): LinePair {
  if (isZero(b) || isZero(d)) return { kind: "degenerate" };
  const n = cross(b, d);
  const w = sub(c, a);
  if (len(n) < 1e-9 * len(b) * len(d)) {
    const f = footOnLine(a, c, d);
    if (!f) return { kind: "degenerate" };
    const distance = dist(a, f.foot);
    if (distance < 1e-9) return { kind: "coincident", angle: 0 };
    return { kind: "parallel", angle: 0, distance, p: a, q: f.foot };
  }
  // (w + μd − λb)·b = 0 and (w + μd − λb)·d = 0.
  const bb = dot(b, b);
  const bd = dot(b, d);
  const dd = dot(d, d);
  const wb = dot(w, b);
  const wd = dot(w, d);
  const det = bb * dd - bd * bd;
  const lambda = (wb * dd - bd * wd) / det;
  const mu = (bd * wb - bb * wd) / det;
  const p = add(a, mul(lambda, b));
  const q = add(c, mul(mu, d));
  const distance = Math.abs(dot(w, n)) / len(n);
  const angle = lineAngle(b, d) ?? 0;
  return { kind: distance < 1e-9 ? "intersecting" : "skew", angle, distance, p, q, lambda, mu };
}

/**
 * The line of intersection of two planes: a point on it (found by setting
 * to 0 the coordinate whose direction component is largest, which keeps
 * the numbers simple) and its direction n₁ × n₂; null when parallel.
 */
export function planeMeet(p1: Plane, p2: Plane): { point: V3; dir: V3 } | null {
  const n1 = normalOf(p1);
  const n2 = normalOf(p2);
  const u = cross(n1, n2);
  if (dot(u, u) < 1e-12) return null;
  const k = [0, 1, 2].reduce((best, i) => (Math.abs(u[i]) > Math.abs(u[best]) ? i : best), 0);
  const [i, j] = [0, 1, 2].filter((x) => x !== k);
  // n1[i] x_i + n1[j] x_j = -d1, n2[i] x_i + n2[j] x_j = -d2 (determinant ±u[k]).
  const det = n1[i] * n2[j] - n1[j] * n2[i];
  const xi = (-p1[3] * n2[j] + p2[3] * n1[j]) / det;
  const xj = (-n1[i] * p2[3] + n2[i] * p1[3]) / det;
  const point: V3 = [0, 0, 0];
  point[i] = xi;
  point[j] = xj;
  return { point, dir: u };
}

/** A direction rescaled to the smallest whole numbers when it is rational (34/9, −22/9, 5/9 → 34, −22, 5). */
export function niceDir(v: V3): V3 {
  for (let q = 1; q <= 60; q++) {
    const w = v.map((x) => x * q);
    if (w.every((x) => Math.abs(x - Math.round(x)) < 1e-7)) {
      const ints = w.map((x) => Math.round(x));
      const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
      const g = ints.reduce((acc, x) => gcd(acc, x), 0) || 1;
      return ints.map((x) => x / g) as V3;
    }
  }
  return v;
}

// ---------- LaTeX formatting ----------

/** Clean a float for display: -0 -> 0, 1.9999999 -> 2, non-finite -> 0. */
export function tidy(v: number, decimals = 2): number {
  if (!Number.isFinite(v)) return 0;
  const r = Number(v.toFixed(decimals));
  return Object.is(r, -0) ? 0 : r;
}

/** A number as LaTeX: an integer, a small fraction (\frac{7}{3}), else 2 decimals. */
export function numLatex(v: number): string {
  if (!Number.isFinite(v)) return "0";
  const r = Math.round(v);
  if (Math.abs(v - r) < 1e-9) return String(Object.is(r, -0) ? 0 : r);
  for (let q = 2; q <= 30; q++) {
    const p = Math.round(v * q);
    if (Math.abs(v * q - p) < 1e-9) {
      return `${p < 0 ? "-" : ""}\\tfrac{${Math.abs(p)}}{${q}}`;
    }
  }
  return String(tidy(v));
}

/** A plain-decimal number (for notes and approximations). */
export const dec = (v: number, decimals = 2) => String(tidy(v, decimals));

/** (x,\, y,\, z) with each entry by numLatex. */
export const ptLatex = (p: readonly number[]) => `\\left(${p.map(numLatex).join(",\\ ")}\\right)`;

/** √n simplified for a whole number n ("5\sqrt{2}"), or null. */
export function surd(n: number): string | null {
  if (!Number.isInteger(n) || n < 0) return null;
  const root = Math.round(Math.sqrt(n));
  if (root * root === n) return String(root);
  for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
    if (n % (k * k) === 0) return `${k}\\sqrt{${n / (k * k)}}`;
  }
  return `\\sqrt{${n}}`;
}

/** √n written exactly: "3", "2\\sqrt{5}", or \\sqrt{2.5} for a non-integer n. */
export const sqrtLatex = (n: number) => surd(Math.round(n * 1e9) / 1e9) ?? `\\sqrt{${numLatex(n)}}`;

/**
 * √(sq) as LaTeX: exact for a whole-number sq ("\sqrt{13} \approx 3.61"),
 * else a decimal.
 */
export function rootLatex(sq: number): string {
  if (!Number.isFinite(sq) || sq < 0) return "0";
  const n = Math.round(sq);
  if (Math.abs(sq - n) < 1e-7) {
    const s = surd(n) ?? dec(Math.sqrt(sq));
    return s.includes("sqrt") ? `${s} \\approx ${dec(Math.sqrt(sq))}` : s;
  }
  return dec(Math.sqrt(sq));
}

/** "x - 3" / "x + 2" / "x" for x − c. */
export function shiftLatex(name: string, c: number): string {
  if (tidy(c, 4) === 0) return name;
  return c > 0 ? `${name} - ${numLatex(c)}` : `${name} + ${numLatex(-c)}`;
}

/** c₁x + c₂y + ... as LaTeX (zero terms dropped; an empty name is a constant). */
export function linearLatex(coefs: readonly number[], names: readonly string[]): string {
  let out = "";
  coefs.forEach((raw, i) => {
    if (tidy(raw, 4) === 0) return;
    const v = raw;
    const abs = Math.abs(v);
    const coef = names[i] && Math.abs(abs - 1) < 1e-9 ? "" : numLatex(abs);
    const term = `${coef}${names[i]}`;
    if (out === "") out = `${v < 0 ? "-" : ""}${term}`;
    else out += ` ${v < 0 ? "-" : "+"} ${term}`;
  });
  return out || "0";
}

/** ax + by + cz + d = 0 as LaTeX. */
export const planeLatex = (pl: Plane) => `${linearLatex(pl, ["x", "y", "z", ""])} = 0`;

/** The symmetric (Cartesian) form of the line through a with direction b. */
export function symmetricLatex(a: V3, b: V3): string {
  const names = ["x", "y", "z"];
  const parts: string[] = [];
  const fixed: string[] = [];
  names.forEach((nm, i) => {
    if (Math.abs(b[i]) < 1e-9) fixed.push(`${nm} = ${numLatex(a[i])}`);
    else parts.push(`\\frac{${shiftLatex(nm, a[i])}}{${numLatex(b[i])}}`);
  });
  const sym = parts.join(" = ");
  if (fixed.length === 0) return sym;
  if (parts.length === 0) return fixed.join(",\\ ");
  return `${sym},\\ ${fixed.join(",\\ ")}`;
}

/** \vec r = (a) + λ(b) */
export const vectorFormLatex = (a: V3, b: V3, param = "\\lambda") =>
  `\\vec r = ${ptLatex(a)} + ${param}${ptLatex(b)}`;
