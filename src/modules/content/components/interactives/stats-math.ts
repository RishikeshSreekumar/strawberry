/** Shared maths for the statistics interactives. */

/** Round for display; tiny values keep two significant figures. */
export function fmt(v: number, digits = 3): string {
  if (!Number.isFinite(v)) return "—";
  if (v !== 0 && Math.abs(v) < 10 ** -digits) return Number(v.toPrecision(2)).toString();
  const r = Number(v.toFixed(digits));
  return Object.is(r, -0) ? "0" : String(r);
}

/** A 1-2-5 step close to `raw`. */
export function niceStep(raw: number): number {
  if (!(raw > 0) || !Number.isFinite(raw)) return 1;
  const p = 10 ** Math.floor(Math.log10(raw));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

/** Number of decimals in a step such as 0.25 → 2. */
export function decimalsOf(step: number): number {
  const s = String(Number(step.toPrecision(8)));
  const dot = s.indexOf(".");
  return dot < 0 ? 0 : s.length - dot - 1;
}

export function snapTo(v: number, step: number): number {
  return Number((Math.round(v / step) * step).toFixed(Math.min(10, decimalsOf(step))));
}

export function ticks(lo: number, hi: number, approx = 6): number[] {
  const step = niceStep((hi - lo) / approx);
  const out: number[] = [];
  for (let t = Math.ceil(lo / step - 1e-9) * step; t <= hi + step * 1e-9; t += step) out.push(Number(t.toFixed(10)));
  return out;
}

function medianOfSorted(s: number[]): number {
  const n = s.length;
  if (n === 0) return NaN;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}

export type Summary = {
  n: number;
  sorted: number[];
  mean: number;
  median: number;
  q1: number;
  q3: number;
  min: number;
  max: number;
  variance: number;
  sd: number;
  mdMean: number;
  mdMedian: number;
  /** null when no value repeats. */
  modes: number[] | null;
  lowerFence: number;
  upperFence: number;
  /** Whisker ends: the most extreme values inside the fences. */
  lowWhisker: number;
  highWhisker: number;
};

/** Population summary (÷ n); quartiles by the median-of-halves convention. */
export function summarize(xs: number[]): Summary {
  const sorted = [...xs].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((s, x) => s + x, 0) / n;
  const median = medianOfSorted(sorted);
  const lower = sorted.slice(0, Math.floor(n / 2));
  const upper = sorted.slice(Math.ceil(n / 2));
  const q1 = lower.length ? medianOfSorted(lower) : sorted[0];
  const q3 = upper.length ? medianOfSorted(upper) : sorted[n - 1];
  const variance = sorted.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  const mdMean = sorted.reduce((s, x) => s + Math.abs(x - mean), 0) / n;
  const mdMedian = sorted.reduce((s, x) => s + Math.abs(x - median), 0) / n;
  const counts = new Map<number, number>();
  for (const x of sorted) {
    const k = Number(x.toFixed(9));
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const maxC = Math.max(...counts.values());
  const modes = maxC > 1 ? [...counts.entries()].filter(([, c]) => c === maxC).map(([k]) => k) : null;
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const inside = sorted.filter((x) => x >= lowerFence - 1e-9 && x <= upperFence + 1e-9);
  return {
    n,
    sorted,
    mean,
    median,
    q1,
    q3,
    min: sorted[0],
    max: sorted[n - 1],
    variance,
    sd: Math.sqrt(variance),
    mdMean,
    mdMedian,
    modes,
    lowerFence,
    upperFence,
    lowWhisker: inside[0] ?? sorted[0],
    highWhisker: inside[inside.length - 1] ?? sorted[n - 1],
  };
}

export function normalPdf(x: number, mu = 0, sigma = 1): number {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

/** Φ(z), Abramowitz & Stegun 26.2.17 (|error| < 7.5e-8). */
export function phi(z: number): number {
  if (z === Infinity) return 1;
  if (z === -Infinity) return 0;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const poly = t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const upper = normalPdf(Math.abs(z)) * poly;
  return z >= 0 ? 1 - upper : upper;
}

/** Deterministic PRNG so a `seed` reproduces a run. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal via Box–Muller. */
export function randNormal(rng: () => number): number {
  const u = Math.max(rng(), 1e-12);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}
