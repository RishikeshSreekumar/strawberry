/**
 * Grading for multiple-correct ("select all that apply") quizzes. All
 * indices are authored option indices, never display slots.
 */

type Option = { correct?: boolean };

/** Authored indices of the correct options, ascending. */
export function correctOptionIndices(options: readonly Option[]): number[] {
  return options.flatMap((o, i) => (o.correct ? [i] : []));
}

/** Selected authored indices as a sorted, de-duplicated array. */
export function normalizeSelection(selected: Iterable<number>): number[] {
  return [...new Set(selected)].sort((a, b) => a - b);
}

/** Correct only when the selected set equals the correct set exactly. */
export function isSelectionCorrect(
  options: readonly Option[],
  selected: Iterable<number>,
): boolean {
  const picked = normalizeSelection(selected);
  const correct = correctOptionIndices(options);
  return (
    picked.length === correct.length && picked.every((i, k) => i === correct[k])
  );
}

export type OptionVerdict =
  /** Selected and correct. */
  | "hit"
  /** Selected but not correct. */
  | "wrong"
  /** Correct but not selected. */
  | "missed"
  /** Neither selected nor correct. */
  | "neutral";

/** Per-option outcome after Check, indexed by authored index. */
export function optionVerdicts(
  options: readonly Option[],
  selected: Iterable<number>,
): OptionVerdict[] {
  const picked = new Set(selected);
  return options.map((o, i) =>
    picked.has(i)
      ? o.correct
        ? "hit"
        : "wrong"
      : o.correct
        ? "missed"
        : "neutral",
  );
}
