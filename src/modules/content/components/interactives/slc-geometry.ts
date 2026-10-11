/**
 * Shared plane geometry and LaTeX formatting for the Straight Lines and
 * Circles (slc) interactives. Pure functions, SSR-safe, and never print NaN:
 * every constructor that can degenerate returns null instead.
 */

export type P = [number, number];

/** The line ax + by + c = 0 (a and b not both zero). */
export type Line = { a: number; b: number; c: number };

/** The circle (x − h)² + (y − k)² = r². */
export type Circle = { centre: P; r: number };

export const EPS = 1e-9;

export const add = (p: P, q: P): P => [p[0] + q[0], p[1] + q[1]];
export const sub = (p: P, q: P): P => [p[0] - q[0], p[1] - q[1]];
export const scale = (k: number, p: P): P => [k * p[0], k * p[1]];
export const dot = (p: P, q: P) => p[0] * q[0] + p[1] * q[1];
export const len = (p: P) => Math.hypot(p[0], p[1]);
export const dist = (p: P, q: P) => len(sub(p, q));
export const same = (p: P, q: P) => dist(p, q) < EPS;
export const mid = (p: P, q: P): P => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];

/** Clean a float for display: -0 -> 0, 1.9999999 -> 2, non-finite -> 0. */
export function tidy(v: number, decimals = 2): number {
  if (!Number.isFinite(v)) return 0;
  const r = Number(v.toFixed(decimals));
  return Object.is(r, -0) ? 0 : r;
}

/** A number as LaTeX (2 decimals). */
export const num = (v: number, decimals = 2) => String(tidy(v, decimals));

/** (x, y) as LaTeX. */
export const ptLatex = (p: P, decimals = 2) => `(${num(p[0], decimals)},\\ ${num(p[1], decimals)})`;

/**
 * A length as LaTeX: exact when it is a whole number or the square root of a
 * whole number ("\sqrt{13} \approx 3.61"), else a decimal.
 */
export function rootLatex(v: number): string {
  if (!Number.isFinite(v)) return "0";
  const sq = v * v;
  const n = Math.round(sq);
  if (Math.abs(sq - n) < 1e-7 && n > 0) {
    const r = Math.round(Math.sqrt(n));
    if (r * r === n) return String(r);
    // Pull out square factors: √50 = 5√2.
    let outside = 1;
    let inside = n;
    for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
      if (inside % (k * k) === 0) {
        outside *= k;
        inside /= k * k;
        break;
      }
    }
    const exact = outside === 1 ? `\\sqrt{${inside}}` : `${outside}\\sqrt{${inside}}`;
    return `${exact} \\approx ${num(v)}`;
  }
  return num(v);
}

/** Degrees, one decimal. */
export const deg = (rad: number) => tidy((rad * 180) / Math.PI, 1);

// ---------- lines ----------

/** The line through p and q, or null when they coincide. */
export function lineThrough(p: P, q: P): Line | null {
  if (same(p, q)) return null;
  const a = q[1] - p[1];
  const b = p[0] - q[0];
  return { a, b, c: -(a * p[0] + b * p[1]) };
}

export const evalLine = (L: Line, p: P) => L.a * p[0] + L.b * p[1] + L.c;
export const normLen = (L: Line) => Math.hypot(L.a, L.b);

/** Perpendicular distance from p to L. */
export const distToLine = (L: Line, p: P) => Math.abs(evalLine(L, p)) / normLen(L);

/** Foot of the perpendicular from p to L. */
export function footOn(L: Line, p: P): P {
  const t = evalLine(L, p) / (L.a * L.a + L.b * L.b);
  return [p[0] - L.a * t, p[1] - L.b * t];
}

/** Mirror image of p in L. */
export function imageIn(L: Line, p: P): P {
  const t = (2 * evalLine(L, p)) / (L.a * L.a + L.b * L.b);
  return [p[0] - L.a * t, p[1] - L.b * t];
}

/** Meeting point of two lines, or null when parallel (or coincident). */
export function intersect(L1: Line, L2: Line): P | null {
  const det = L1.a * L2.b - L2.a * L1.b;
  if (Math.abs(det) < EPS) return null;
  return [(L1.b * L2.c - L2.b * L1.c) / det, (L1.c * L2.a - L2.c * L1.a) / det];
}

/** Unit direction vector along L. */
export function lineDir(L: Line): P {
  const n = normLen(L);
  return [-L.b / n, L.a / n];
}

/** Slope −a/b, or null for a vertical line. */
export const slopeOf = (L: Line): number | null => (Math.abs(L.b) < EPS ? null : -L.a / L.b);

/** Acute angle between two lines, in radians. */
export function acuteAngle(L1: Line, L2: Line): number {
  const cos = Math.abs(L1.a * L2.a + L1.b * L2.b) / (normLen(L1) * normLen(L2));
  return Math.acos(Math.min(1, cos));
}

/** Line from coefficients, or null when a = b = 0. */
export function lineFrom(a: number, b: number, c: number): Line | null {
  if (Math.abs(a) < EPS && Math.abs(b) < EPS) return null;
  return { a, b, c };
}

function gcd(x: number, y: number): number {
  let p = Math.abs(x);
  let q = Math.abs(y);
  while (q) [p, q] = [q, p % q];
  return p;
}

/**
 * Coefficients scaled to the form people write: smallest whole numbers when
 * the coefficients are rational with a small denominator, first non-zero of
 * (a, b) positive. Otherwise scaled so that a² + b² = 1.
 */
export function niceCoeffs(a: number, b: number, c: number): [number, number, number] {
  const vals = [a, b, c];
  for (const k of [1, 2, 3, 4, 6, 8, 12]) {
    const scaled = vals.map((v) => v * k);
    if (scaled.every((v) => Math.abs(v - Math.round(v)) < 1e-7)) {
      const ints = scaled.map((v) => Math.round(v));
      const g = ints.reduce((acc, v) => (v === 0 ? acc : gcd(acc, v)), 0) || 1;
      let out = ints.map((v) => v / g) as [number, number, number];
      const lead = out[0] !== 0 ? out[0] : out[1];
      if (lead < 0) out = out.map((v) => -v) as [number, number, number];
      return out.map((v) => (Object.is(v, -0) ? 0 : v)) as [number, number, number];
    }
  }
  const n = Math.hypot(a, b) || 1;
  const sign = (Math.abs(a) > EPS ? a : b) < 0 ? -1 : 1;
  return [(sign * a) / n, (sign * b) / n, (sign * c) / n];
}

/**
 * A sum of terms as LaTeX: [[3, "x"], [-2, "y"], [5, ""]] -> "3x - 2y + 5".
 * Zero terms are dropped; a coefficient of ±1 on a variable is hidden.
 */
export function termsLatex(terms: [number, string][], decimals = 2): string {
  let out = "";
  for (const [raw, v] of terms) {
    const k = tidy(raw, decimals);
    if (k === 0) continue;
    const abs = Math.abs(k);
    const body = v && abs === 1 ? v : `${abs}${v}`;
    if (out === "") out = `${k < 0 ? "-" : ""}${body}`;
    else out += ` ${k < 0 ? "-" : "+"} ${body}`;
  }
  return out === "" ? "0" : out;
}

/** "3x - 2y + 5 = 0" in the nicest whole-number scaling. */
export function lineLatex(L: Line): string {
  const [a, b, c] = niceCoeffs(L.a, L.b, L.c);
  return `${termsLatex([
    [a, "x"],
    [b, "y"],
    [c, ""],
  ])} = 0`;
}

/** A line rescaled to its nice coefficients (same line, tidy numbers). */
export function niceLine(L: Line): Line {
  const [a, b, c] = niceCoeffs(L.a, L.b, L.c);
  return { a, b, c };
}

/** "x - 2" style shift for (x − h)²: "x", "x - 2", "x + 1.5". */
export function shiftLatex(v: string, h: number): string {
  const t = tidy(h);
  if (t === 0) return v;
  return `${v} ${t > 0 ? "-" : "+"} ${Math.abs(t)}`;
}

// ---------- circles ----------

/** General-form coefficients g, f, c of x² + y² + 2gx + 2fy + c = 0. */
export function circleCoeffs(C: Circle): { g: number; f: number; c: number } {
  const [h, k] = C.centre;
  return { g: -h, f: -k, c: h * h + k * k - C.r * C.r };
}

/** "x^2 + y^2 - 4x + 6y - 3 = 0". */
export function circleGeneralLatex(C: Circle): string {
  const { g, f, c } = circleCoeffs(C);
  return `${termsLatex([
    [1, "x^2"],
    [1, "y^2"],
    [2 * g, "x"],
    [2 * f, "y"],
    [c, ""],
  ])} = 0`;
}

/** "(x - 2)^2 + (y + 1)^2 = 9". */
export function circleStandardLatex(C: Circle): string {
  const sq = (v: string, h: number) => (tidy(h) === 0 ? `${v}^2` : `(${shiftLatex(v, h)})^2`);
  return `${sq("x", C.centre[0])} + ${sq("y", C.centre[1])} = ${num(C.r * C.r)}`;
}

/** S₁: the power of p with respect to C, CP² − r². */
export const power = (C: Circle, p: P) => dist(C.centre, p) ** 2 - C.r * C.r;

/** T = 0 for the point p: chord of contact / polar / tangent at p. Null when p is the centre. */
export function polarLine(C: Circle, p: P): Line | null {
  const { g, f, c } = circleCoeffs(C);
  return lineFrom(p[0] + g, p[1] + f, g * p[0] + f * p[1] + c);
}

/** Points where L meets C (0, 1 or 2 of them). */
export function lineCircle(L: Line, C: Circle): P[] {
  const d = distToLine(L, C.centre);
  const F = footOn(L, C.centre);
  if (d > C.r + 1e-9) return [];
  const half = Math.sqrt(Math.max(0, C.r * C.r - d * d));
  if (half < 1e-9) return [F];
  const u = lineDir(L);
  return [add(F, scale(-half, u)), add(F, scale(half, u))];
}

/** Radical axis S₁ − S₂ = 0, or null for concentric circles. */
export function radicalAxis(C1: Circle, C2: Circle): Line | null {
  const k1 = circleCoeffs(C1);
  const k2 = circleCoeffs(C2);
  return lineFrom(2 * (k1.g - k2.g), 2 * (k1.f - k2.f), k1.c - k2.c);
}

/**
 * Common tangents of two circles as lines (unit normal form). External
 * tangents first, then internal ones. Coincident circles give none.
 */
export function commonTangents(C1: Circle, C2: Circle): { line: Line; kind: "direct" | "transverse" }[] {
  const out: { line: Line; kind: "direct" | "transverse" }[] = [];
  const dx = C2.centre[0] - C1.centre[0];
  const dy = C2.centre[1] - C1.centre[1];
  const z = dx * dx + dy * dy;
  if (z < EPS) return out;
  const cases: { dr: number; kind: "direct" | "transverse" }[] = [
    { dr: C2.r - C1.r, kind: "direct" },
    { dr: -C2.r - C1.r, kind: "transverse" },
  ];
  for (const { dr, kind } of cases) {
    const disc = z - dr * dr;
    if (disc < -1e-9) continue;
    const root = Math.sqrt(Math.max(0, disc));
    const signs = root < 1e-9 ? [1] : [1, -1];
    for (const s of signs) {
      const a = (dr * dx + s * dy * root) / z;
      const b = (dr * dy - s * dx * root) / z;
      // a·x + b·y + c = 0 with signed distance r₁ from the first centre.
      const c = C1.r - (a * C1.centre[0] + b * C1.centre[1]);
      out.push({ line: { a, b, c }, kind });
    }
  }
  return out;
}

/** Relative position of two circles and the number of common tangents. */
export function circleRelation(C1: Circle, C2: Circle): { label: string; tangents: number } {
  const d = dist(C1.centre, C2.centre);
  const sum = C1.r + C2.r;
  const diff = Math.abs(C1.r - C2.r);
  const eq = (x: number, y: number) => Math.abs(x - y) < 1e-9;
  if (d < EPS && eq(C1.r, C2.r)) return { label: "\\text{the same circle}", tangents: 0 };
  if (d > sum && !eq(d, sum)) return { label: "\\text{separate (outside each other)}", tangents: 4 };
  if (eq(d, sum)) return { label: "\\text{touch externally}", tangents: 3 };
  if (d > diff && !eq(d, diff)) return { label: "\\text{intersect at two points}", tangents: 2 };
  if (eq(d, diff)) return { label: "\\text{touch internally}", tangents: 1 };
  return { label: d < EPS ? "\\text{concentric}" : "\\text{one inside the other}", tangents: 0 };
}

/** Points where two circles meet (0, 1 or 2), via the radical axis. */
export function circleCircle(C1: Circle, C2: Circle): P[] {
  const L = radicalAxis(C1, C2);
  if (!L) return [];
  return lineCircle(L, C1);
}
