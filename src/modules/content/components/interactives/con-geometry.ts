/**
 * Pure geometry for the Conic Sections (con) interactives: standard conics
 * as 3×3 symmetric matrices (so S₁, the polar T = 0 and line–conic
 * intersections are one computation for every conic), parametric points,
 * foci, directrices and the focus–directrix / cone-section pictures.
 * SSR-safe and never returns NaN (degenerate cases return null or []).
 */

export type P = [number, number];
/** The line A x + B y + C = 0. */
export type Line = [number, number, number];
export type Mat3 = [[number, number, number], [number, number, number], [number, number, number]];
export type ConicKind = "parabola" | "ellipse" | "hyperbola" | "rectangular";

const EPS = 1e-9;

export const add = (p: P, q: P): P => [p[0] + q[0], p[1] + q[1]];
export const sub = (p: P, q: P): P => [p[0] - q[0], p[1] - q[1]];
export const scale = (k: number, p: P): P => [k * p[0], k * p[1]];
export const dist = (p: P, q: P): number => Math.hypot(p[0] - q[0], p[1] - q[1]);

/** Clean a float for display: -0 -> 0, 1.9999999 -> 2. */
export function tidy(v: number, decimals = 2): number {
  if (!Number.isFinite(v)) return 0;
  const r = Number(v.toFixed(decimals));
  return Object.is(r, -0) ? 0 : r;
}

/** A number as LaTeX, rounded to 2 decimals. */
export const num = (v: number, decimals = 2): string => String(tidy(v, decimals));

/** (x, y) as LaTeX. */
export const ptLatex = (p: P): string => `(${num(p[0])},\\ ${num(p[1])})`;

/**
 * The conic as a symmetric matrix M with S(x, y) = [x y 1] M [x y 1]ᵀ:
 * y² − 4ax, x²/a² + y²/b² − 1, x²/a² − y²/b² − 1, xy − c² (c = a).
 */
export function conicMatrix(kind: ConicKind, a: number, b: number): Mat3 {
  switch (kind) {
    case "parabola":
      return [
        [0, 0, -2 * a],
        [0, 1, 0],
        [-2 * a, 0, 0],
      ];
    case "ellipse":
      return [
        [1 / (a * a), 0, 0],
        [0, 1 / (b * b), 0],
        [0, 0, -1],
      ];
    case "hyperbola":
      return [
        [1 / (a * a), 0, 0],
        [0, -1 / (b * b), 0],
        [0, 0, -1],
      ];
    case "rectangular":
      return [
        [0, 0.5, 0],
        [0.5, 0, 0],
        [0, 0, -a * a],
      ];
  }
}

const hom = (p: P): [number, number, number] => [p[0], p[1], 1];

function mulVec(M: Mat3, v: [number, number, number]): [number, number, number] {
  return [
    M[0][0] * v[0] + M[0][1] * v[1] + M[0][2] * v[2],
    M[1][0] * v[0] + M[1][1] * v[1] + M[1][2] * v[2],
    M[2][0] * v[0] + M[2][1] * v[1] + M[2][2] * v[2],
  ];
}

const dot3 = (u: [number, number, number], v: [number, number, number]) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];

/** S₁: the conic's expression evaluated at p. */
export function conicValue(M: Mat3, p: P): number {
  const v = hom(p);
  return dot3(v, mulVec(M, v));
}

/** The polar of p, T = 0: the tangent at p when p is on the conic, else the chord of contact. */
export function polarLine(M: Mat3, p: P): Line {
  return mulVec(M, hom(p));
}

/** The chord with midpoint p: T = S₁ (it passes through p, parallel to the polar). */
export function midpointChordLine(M: Mat3, p: P): Line {
  const [A, B, C] = polarLine(M, p);
  return [A, B, C - conicValue(M, p)];
}

/** Foot of the perpendicular from p to L. */
export function footOn(L: Line, p: P): P {
  const [A, B, C] = L;
  const n = A * A + B * B;
  if (n < EPS) return p;
  const k = (A * p[0] + B * p[1] + C) / n;
  return [p[0] - k * A, p[1] - k * B];
}

/** Unit direction along L. */
export function lineDir(L: Line): P {
  const n = Math.hypot(L[0], L[1]);
  if (n < EPS) return [1, 0];
  return [-L[1] / n, L[0] / n];
}

/** The line through p and q (null when they coincide). */
export function lineThrough(p: P, q: P): Line | null {
  if (dist(p, q) < EPS) return null;
  const A = q[1] - p[1];
  const B = p[0] - q[0];
  return [A, B, -(A * p[0] + B * p[1])];
}

/** The line through p perpendicular to L. */
export function perpendicularThrough(L: Line, p: P): Line {
  const [A, B] = L;
  return [B, -A, -(B * p[0] - A * p[1])];
}

/**
 * Points where the line meets the conic: 0, 1 (tangent, or a line parallel
 * to an axis / asymptote direction) or 2.
 */
export function lineConicIntersections(M: Mat3, L: Line): P[] {
  if (Math.hypot(L[0], L[1]) < EPS) return [];
  const p0 = footOn(L, [0, 0]);
  const d = lineDir(L);
  const w0 = hom(p0);
  const w1: [number, number, number] = [d[0], d[1], 0];
  const qa = dot3(w1, mulVec(M, w1));
  const qb = 2 * dot3(w1, mulVec(M, w0));
  const qc = dot3(w0, mulVec(M, w0));
  const at = (s: number): P => add(p0, scale(s, d));
  const size = Math.abs(qb) + Math.abs(qa) + Math.abs(qc) + 1;
  if (Math.abs(qa) < EPS * size) {
    if (Math.abs(qb) < EPS * size) return [];
    return [at(-qc / qb)];
  }
  const disc = qb * qb - 4 * qa * qc;
  const tol = 1e-9 * (qb * qb + Math.abs(4 * qa * qc) + 1);
  if (disc < -tol) return [];
  if (Math.abs(disc) <= tol) return [at(-qb / (2 * qa))];
  const r = Math.sqrt(disc);
  return [at((-qb - r) / (2 * qa)), at((-qb + r) / (2 * qa))];
}

/**
 * P on the conic from its parameter: t for (at², 2at) and (ct, c/t), an
 * angle in degrees for (a cos θ, b sin θ) and (a sec θ, b tan θ). Null where
 * the parameter gives no point (t = 0 on xy = c², θ = ±90° on the hyperbola).
 */
export function conicPoint(kind: ConicKind, a: number, b: number, t: number): P | null {
  const th = (t * Math.PI) / 180;
  switch (kind) {
    case "parabola":
      return [a * t * t, 2 * a * t];
    case "ellipse":
      return [a * Math.cos(th), b * Math.sin(th)];
    case "hyperbola": {
      const c = Math.cos(th);
      if (Math.abs(c) < 1e-3) return null;
      return [a / c, b * Math.tan(th)];
    }
    case "rectangular":
      if (Math.abs(t) < 1e-9) return null;
      return [a * t, a / t];
  }
}

export function conicEccentricity(kind: ConicKind, a: number, b: number): number {
  switch (kind) {
    case "parabola":
      return 1;
    case "ellipse": {
      const major = Math.max(a, b);
      const minor = Math.min(a, b);
      return Math.sqrt(Math.max(0, 1 - (minor * minor) / (major * major)));
    }
    case "hyperbola":
      return Math.sqrt(1 + (b * b) / (a * a));
    case "rectangular":
      return Math.SQRT2;
  }
}

/** Foci, the "first" one first (S, then S'). */
export function conicFoci(kind: ConicKind, a: number, b: number): P[] {
  const e = conicEccentricity(kind, a, b);
  switch (kind) {
    case "parabola":
      return [[a, 0]];
    case "ellipse":
      if (e < 1e-9) return [[0, 0]];
      return a >= b
        ? [
            [a * e, 0],
            [-a * e, 0],
          ]
        : [
            [0, b * e],
            [0, -b * e],
          ];
    case "hyperbola":
      return [
        [a * e, 0],
        [-a * e, 0],
      ];
    case "rectangular":
      return [
        [a * Math.SQRT2, a * Math.SQRT2],
        [-a * Math.SQRT2, -a * Math.SQRT2],
      ];
  }
}

/** Directrices in the same order as the foci (none for a circle). */
export function conicDirectrices(kind: ConicKind, a: number, b: number): Line[] {
  const e = conicEccentricity(kind, a, b);
  switch (kind) {
    case "parabola":
      return [[1, 0, a]];
    case "ellipse":
      if (e < 1e-9) return [];
      return a >= b
        ? [
            [1, 0, -a / e],
            [1, 0, a / e],
          ]
        : [
            [0, 1, -b / e],
            [0, 1, b / e],
          ];
    case "hyperbola":
      return [
        [1, 0, -a / e],
        [1, 0, a / e],
      ];
    case "rectangular":
      return [
        [1, 1, -Math.SQRT2 * a],
        [1, 1, Math.SQRT2 * a],
      ];
  }
}

/** Latus rectum segments, one per focus. */
export function latusRecta(kind: ConicKind, a: number, b: number): [P, P][] {
  const e = conicEccentricity(kind, a, b);
  switch (kind) {
    case "parabola":
      return [
        [
          [a, 2 * a],
          [a, -2 * a],
        ],
      ];
    case "ellipse":
      if (a >= b) {
        const h = (b * b) / a;
        return [1, -1].map((s): [P, P] => [
          [s * a * e, h],
          [s * a * e, -h],
        ]);
      } else {
        const h = (a * a) / b;
        return [1, -1].map((s): [P, P] => [
          [h, s * b * e],
          [-h, s * b * e],
        ]);
      }
    case "hyperbola": {
      const h = (b * b) / a;
      return [1, -1].map((s): [P, P] => [
        [s * a * e, h],
        [s * a * e, -h],
      ]);
    }
    case "rectangular":
      return conicFoci(kind, a, b).map((f): [P, P] => [add(f, [a, -a]), add(f, [-a, a])]);
  }
}

/** Asymptotes (hyperbola, xy = c²); [] otherwise. */
export function conicAsymptotes(kind: ConicKind, a: number, b: number): Line[] {
  if (kind === "hyperbola") {
    return [
      [b, -a, 0],
      [b, a, 0],
    ];
  }
  if (kind === "rectangular") {
    return [
      [1, 0, 0],
      [0, 1, 0],
    ];
  }
  return [];
}

/** Sampled curve pieces for drawing; `span` is the size of the visible region. */
export function sampleConic(kind: ConicKind, a: number, b: number, span: number): P[][] {
  const out: P[][] = [];
  switch (kind) {
    case "parabola": {
      const T = Math.max(2, span / Math.max(a, 0.05));
      const pts: P[] = [];
      for (let i = 0; i <= 400; i++) {
        const t = -T + (2 * T * i) / 400;
        pts.push([a * t * t, 2 * a * t]);
      }
      out.push(pts);
      break;
    }
    case "ellipse": {
      const pts: P[] = [];
      for (let i = 0; i <= 240; i++) {
        const th = (2 * Math.PI * i) / 240;
        pts.push([a * Math.cos(th), b * Math.sin(th)]);
      }
      out.push(pts);
      break;
    }
    case "hyperbola": {
      const U = Math.asinh((2 * span) / Math.max(b, 0.05));
      for (const s of [1, -1]) {
        const pts: P[] = [];
        for (let i = 0; i <= 240; i++) {
          const u = -U + (2 * U * i) / 240;
          pts.push([s * a * Math.cosh(u), b * Math.sinh(u)]);
        }
        out.push(pts);
      }
      break;
    }
    case "rectangular": {
      const lo = Math.log(a / (2 * span));
      const hi = Math.log((2 * span) / a);
      for (const s of [1, -1]) {
        const pts: P[] = [];
        for (let i = 0; i <= 240; i++) {
          const t = s * Math.exp(lo + ((hi - lo) * i) / 240);
          pts.push([a * t, a / t]);
        }
        out.push(pts);
      }
      break;
    }
  }
  return out;
}

/** "y = 0.5x + 2", "x = 3", "y = -3": a line in the form people read. */
export function lineLatex(L: Line): string {
  const [A, B, C] = L;
  if (Math.abs(B) > EPS * (Math.abs(A) + 1)) {
    const m = tidy(-A / B);
    const c = tidy(-C / B);
    let rhs = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${m}x`;
    if (rhs === "") rhs = String(c);
    else if (c !== 0) rhs += c < 0 ? ` - ${Math.abs(c)}` : ` + ${c}`;
    return `y = ${rhs}`;
  }
  if (Math.abs(A) < EPS) return "\\text{no line}";
  return `x = ${tidy(-C / A)}`;
}

// ---------- focus–directrix picture ----------

/**
 * The point at polar angle θ (degrees) seen from the focus S = O on the conic
 * PS = e·PM with directrix x = −ℓ/e: r = ℓ / (1 − e cos θ). A negative r is a
 * point of the far branch of a hyperbola. Null where r is infinite.
 */
export function focusDirectrixPoint(e: number, l: number, thetaDeg: number): P | null {
  const th = (thetaDeg * Math.PI) / 180;
  const den = 1 - e * Math.cos(th);
  if (Math.abs(den) < 1e-6) return null;
  const r = l / den;
  return [r * Math.cos(th), r * Math.sin(th)];
}

/** Sampled pieces of the focus–directrix conic, dropping points beyond radius R. */
export function focusDirectrixCurve(e: number, l: number, R: number): P[][] {
  const pieces: P[][] = [];
  let cur: P[] = [];
  let lastSign = 0;
  const N = 1440;
  for (let i = 0; i <= N; i++) {
    const th = (2 * Math.PI * i) / N;
    const den = 1 - e * Math.cos(th);
    const sign = Math.sign(den);
    const r = Math.abs(den) < 1e-9 ? Infinity : l / den;
    if (!Number.isFinite(r) || Math.abs(r) > R || (lastSign !== 0 && sign !== lastSign)) {
      if (cur.length > 1) pieces.push(cur);
      cur = [];
    }
    lastSign = sign;
    if (Number.isFinite(r) && Math.abs(r) <= R) cur.push([r * Math.cos(th), r * Math.sin(th)]);
  }
  if (cur.length > 1) pieces.push(cur);
  return pieces;
}

export type ConicName = "circle" | "ellipse" | "parabola" | "hyperbola";

export function nameByEccentricity(e: number): ConicName {
  if (e < 1e-9) return "circle";
  if (Math.abs(e - 1) < 1e-9) return "parabola";
  return e < 1 ? "ellipse" : "hyperbola";
}

// ---------- cone sections ----------

export type ConeSectionName = ConicName | "point" | "line" | "pair of lines";

/**
 * Cutting a double cone of semi-vertical angle α by a plane at angle β to
 * the axis, at perpendicular distance `offset` from the vertex.
 */
export function coneSection(
  alphaDeg: number,
  betaDeg: number,
  offset: number,
): { name: ConeSectionName; e: number; degenerate: boolean } {
  const rad = Math.PI / 180;
  const raw = Math.cos(betaDeg * rad) / Math.cos(alphaDeg * rad);
  const e = Math.abs(betaDeg - 90) < 1e-9 ? 0 : Math.abs(betaDeg - alphaDeg) < 1e-9 ? 1 : raw;
  if (offset < 1e-9) {
    const name: ConeSectionName =
      Math.abs(betaDeg - alphaDeg) < 1e-9 ? "line" : betaDeg > alphaDeg ? "point" : "pair of lines";
    return { name, e, degenerate: true };
  }
  return { name: nameByEccentricity(e), e, degenerate: false };
}
