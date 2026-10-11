import type { RealFn } from "./calc-shared";

/**
 * Numeric helpers shared by the integral-calculus (integ-*) interactives.
 * Like calc-shared, everything returns NaN instead of throwing.
 */

/** Composite Simpson's rule on [a, b] with `panels` (made even) panels. */
export function simpson(f: RealFn, a: number, b: number, panels = 2000): number {
  if (!(Number.isFinite(a) && Number.isFinite(b))) return NaN;
  if (a === b) return 0;
  const n = panels % 2 === 0 ? panels : panels + 1;
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  for (let i = 1; i < n; i++) sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h);
  const v = (sum * h) / 3;
  return Number.isFinite(v) ? v : NaN;
}

export type RiemannMethod = "left" | "right" | "midpoint" | "trapezoid";

/** The n strips of a Riemann (or trapezoid) sum and their total. */
export function riemann(
  f: RealFn,
  a: number,
  b: number,
  n: number,
  method: RiemannMethod,
): { strips: { x1: number; x2: number; h1: number; h2: number }[]; total: number } {
  const dx = (b - a) / n;
  const strips: { x1: number; x2: number; h1: number; h2: number }[] = [];
  let total = 0;
  for (let i = 0; i < n; i++) {
    const x1 = a + i * dx;
    const x2 = x1 + dx;
    let h1: number;
    let h2: number;
    if (method === "trapezoid") {
      h1 = f(x1);
      h2 = f(x2);
    } else {
      const sample = method === "left" ? x1 : method === "right" ? x2 : (x1 + x2) / 2;
      h1 = h2 = f(sample);
    }
    strips.push({ x1, x2, h1, h2 });
    total += ((h1 + h2) / 2) * dx;
  }
  return { strips, total: Number.isFinite(total) ? total : NaN };
}

/** Button styling for mode pickers (same look as the srf graph lab). */
export function pill(active: boolean): string {
  return `rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
    active ? "border-plot bg-plot/10 text-plot" : "bg-background text-muted-foreground hover:text-foreground"
  }`;
}

/** Clamp y into a band around the window so SVG paths stay finite. */
export function clampY(y: number, ymin: number, ymax: number): number {
  const pad = (ymax - ymin) * 2;
  return Math.min(ymax + pad, Math.max(ymin - pad, y));
}
