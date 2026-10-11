/**
 * Deterministic display order for quiz options. Authors tend to write the
 * correct answer first, so options are shuffled at render time with a seed
 * derived from the quiz id: server render and client hydration agree, and
 * the order is stable across reloads. Attempts are still recorded against
 * the authored index, so callers map display slots back via the returned
 * array (displayOrder[slot] = authored index).
 */

/** 32-bit FNV-1a hash of a string. */
export function hashString(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** mulberry32: tiny seeded PRNG returning floats in [0, 1). */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Permutation of authored option indices [0, count) for display, seeded by
 * `seed` (Fisher–Yates). With `shuffle: false` the authored order is kept.
 */
export function quizDisplayOrder(
  count: number,
  seed: string,
  shuffle = true,
): number[] {
  const order = Array.from({ length: count }, (_, i) => i);
  if (!shuffle) return order;
  const random = mulberry32(hashString(seed));
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/** Seed for a quiz block: its stable id, else its question text. */
export function quizShuffleSeed(block: { id?: string; question: string }): string {
  return block.id ?? `question:${block.question}`;
}
