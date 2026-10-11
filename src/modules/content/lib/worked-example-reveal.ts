/**
 * Step-reveal state for a worked example: `shown` is how many of `total`
 * steps are visible (the answer appears once all are). Pure, so the
 * component and tests share one definition.
 */
export type RevealAction = "next" | "all" | "reset";

export function nextShown(shown: number, total: number, action: RevealAction): number {
  switch (action) {
    case "next":
      return Math.min(shown + 1, total);
    case "all":
      return total;
    case "reset":
      return 0;
  }
}

/** The primary button: reveals the next step, or hides the solution again. */
export function primaryReveal(
  shown: number,
  total: number,
): { label: string; action: RevealAction } {
  if (shown >= total) return { label: "Hide solution", action: "reset" };
  if (total === 1) return { label: "Show solution", action: "next" };
  return { label: shown === 0 ? "Show first step" : "Next step", action: "next" };
}
