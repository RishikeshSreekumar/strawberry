/**
 * State transitions for the interactive question cards (multi-select quiz
 * and numeric), kept pure so the reveal/recording rules are unit-tested
 * without a DOM. Each "check" returns the attempt to record, if any; the
 * components do the fire-and-forget recording.
 *
 * Shared rules:
 * - A wrong check never reveals the answer. After REVEAL_AFTER_WRONG wrong
 *   checks the learner may ask for it ("Show answer" / "Show solution").
 * - Once the answer is revealed, further checks are not recorded.
 */
import {
  gradeNumericInput,
  isNumericAnswerCorrect,
  type CommonMistake,
  type ToleranceSpec,
} from "./numeric-answer";
import {
  correctOptionIndices,
  isSelectionCorrect,
  normalizeSelection,
  optionVerdicts,
  type OptionVerdict,
} from "./quiz-grading";

/** Wrong checks before the answer can be revealed. */
export const REVEAL_AFTER_WRONG = 2;

type Option = { correct?: boolean };

// ---------- Multi-select quiz ----------

export type MultiSelectState = {
  /** Ticked authored indices, sorted. */
  picked: number[];
  /** Showing the result of the last Check (options locked). */
  checked: boolean;
  /**
   * The ticks of the last Check, or null before one. Checking the same
   * ticks again is not another attempt (Check is disabled until they change).
   */
  lastChecked: number[] | null;
  wrongChecks: number;
  solved: boolean;
  revealed: boolean;
};

export const initialMultiSelectState: MultiSelectState = {
  picked: [],
  checked: false,
  lastChecked: null,
  wrongChecks: 0,
  solved: false,
  revealed: false,
};

/** Options are locked while a result is shown, and for good once solved or revealed. */
export function multiSelectLocked(state: MultiSelectState): boolean {
  return state.checked || state.solved || state.revealed;
}

export function toggleOption(state: MultiSelectState, index: number): MultiSelectState {
  if (multiSelectLocked(state)) return state;
  const picked = state.picked.includes(index)
    ? state.picked.filter((p) => p !== index)
    : [...state.picked, index];
  return { ...state, picked: normalizeSelection(picked) };
}

function sameSelection(a: readonly number[], b: readonly number[] | null): boolean {
  return b !== null && a.length === b.length && a.every((v, i) => v === b[i]);
}

/** Check is enabled: unlocked, something ticked, and not the ticks just checked. */
export function canCheckSelection(state: MultiSelectState): boolean {
  return (
    !multiSelectLocked(state) &&
    state.picked.length > 0 &&
    !sameSelection(state.picked, state.lastChecked)
  );
}

export function checkSelection(
  state: MultiSelectState,
  options: readonly Option[],
): { state: MultiSelectState; attempt?: { correct: boolean; selected: number[] } } {
  if (!canCheckSelection(state)) return { state };
  const correct = isSelectionCorrect(options, state.picked);
  return {
    state: {
      ...state,
      checked: true,
      lastChecked: state.picked,
      solved: correct,
      wrongChecks: state.wrongChecks + (correct ? 0 : 1),
    },
    attempt: { correct, selected: state.picked },
  };
}

/** "Try again": keep the ticks, clear the verdicts, unlock. */
export function retrySelection(state: MultiSelectState): MultiSelectState {
  if (state.solved || state.revealed) return state;
  return { ...state, checked: false };
}

export function canRevealSelection(state: MultiSelectState): boolean {
  return !state.solved && !state.revealed && state.wrongChecks >= REVEAL_AFTER_WRONG;
}

/**
 * Reveal grades the last checked ticks, not unchecked edits made after
 * "Try again" (none, if nothing was checked since the page loaded).
 */
export function revealSelection(state: MultiSelectState): MultiSelectState {
  if (!canRevealSelection(state)) return state;
  return { ...state, picked: state.lastChecked ?? [], revealed: true, checked: true };
}

/** Why a wrong check was wrong, without saying how many options are correct. */
export type WrongReason = "wrong-ticks" | "missing" | "both";

export type MultiSelectView = {
  /** Per authored index; null = no marking. */
  verdicts: (OptionVerdict | null)[];
  /** Per authored index: show that option's feedback. */
  showFeedback: boolean[];
  status: "open" | "correct" | "revealed" | WrongReason;
};

export function multiSelectView(
  state: MultiSelectState,
  options: readonly Option[],
): MultiSelectView {
  const none = options.map(() => null);
  if (!state.checked) {
    return { verdicts: none, showFeedback: options.map(() => false), status: "open" };
  }
  const full = optionVerdicts(options, state.picked);
  if (state.revealed) {
    return {
      verdicts: full.map((v) => (v === "neutral" ? null : v)),
      showFeedback: full.map((v) => v !== "neutral"),
      status: "revealed",
    };
  }
  // Only ticked options are marked: a missed correct option stays unmarked.
  const verdicts = full.map((v) => (v === "hit" || v === "wrong" ? v : null));
  if (state.solved) {
    return { verdicts, showFeedback: full.map((v) => v === "hit"), status: "correct" };
  }
  const wrongTicks = full.includes("wrong");
  const missing = full.includes("missed");
  return {
    verdicts,
    showFeedback: full.map((v) => v === "wrong"),
    status: wrongTicks && missing ? "both" : wrongTicks ? "wrong-ticks" : "missing",
  };
}

// ---------- Numeric question ----------

export type NumericResult =
  | { kind: "invalid"; message: string }
  | { kind: "wrong"; mistake?: CommonMistake }
  | { kind: "correct" };

export type NumericState = {
  /** Result for the current input; null once the input is edited. */
  result: NumericResult | null;
  wrongCount: number;
  revealed: boolean;
};

export const initialNumericState: NumericState = {
  result: null,
  wrongCount: 0,
  revealed: false,
};

export function checkNumeric(
  state: NumericState,
  input: string,
  spec: ToleranceSpec & { commonMistakes?: CommonMistake[] },
): { state: NumericState; attempt?: { correct: boolean; value: number } } {
  // The result already reflects this input (editing clears it): checking
  // the same answer again is not another attempt.
  if (state.result !== null) return { state };
  const grade = gradeNumericInput(input, spec);
  if (grade.kind === "invalid") {
    return { state: { ...state, result: { kind: "invalid", message: grade.message } } };
  }
  const correct = grade.kind === "correct";
  const next: NumericState = {
    ...state,
    result: correct ? { kind: "correct" } : { kind: "wrong", mistake: grade.mistake },
    wrongCount: state.wrongCount + (correct ? 0 : 1),
  };
  // After the answer is revealed, checks are for the learner's own
  // satisfaction only.
  return state.revealed
    ? { state: next }
    : { state: next, attempt: { correct, value: grade.value } };
}

/** The learner edited the input: drop a stale wrong/invalid result. */
export function editNumeric(state: NumericState): NumericState {
  if (state.result === null || state.result.kind === "correct") return state;
  return { ...state, result: null };
}

export function canRevealNumeric(state: NumericState): boolean {
  return (
    !state.revealed &&
    state.result?.kind !== "correct" &&
    state.wrongCount >= REVEAL_AFTER_WRONG
  );
}

export function revealNumeric(state: NumericState): NumericState {
  return canRevealNumeric(state) ? { ...state, revealed: true } : state;
}

// ---------- Restoring saved progress ----------

/**
 * What the server knows about one question for the current learner, built
 * from their recorded attempts (progress module) and passed down as props,
 * so the restored card is identical on the server render and on hydration.
 * Answers use authored option indices.
 */
export type QuestionProgress = {
  /** At least one recorded attempt was correct. */
  solved: boolean;
  /** Recorded wrong attempts (for "Show answer" eligibility). */
  wrongAttempts: number;
  /**
   * The learner's most recent correct answer, when one was recorded:
   * `selectedIndex` for single-correct quizzes, `selected` for
   * multiple-correct quizzes, `value` for numeric questions.
   */
  solvedWith?: { selectedIndex: number } | { selected: number[] } | { value: number };
};

/**
 * Single-correct quiz restore: a solved question shows its correct option
 * selected, with feedback, exactly as right after answering. An unsolved
 * one starts fresh (no option selected): re-showing a stale wrong pick adds
 * nothing, since "Try again" would just clear it. A solved question stays
 * solved even if the learner clicked a wrong option afterwards.
 *
 * Content can change after an attempt, so the saved index is only reused
 * while it is still a correct option; otherwise the first correct option is
 * shown.
 */
export function restoredSingleChoice(
  options: readonly Option[],
  progress: QuestionProgress | undefined,
): number | null {
  if (!progress?.solved) return null;
  const saved =
    progress.solvedWith && "selectedIndex" in progress.solvedWith
      ? progress.solvedWith.selectedIndex
      : -1;
  if (options[saved]?.correct) return saved;
  const first = options.findIndex((o) => o.correct);
  return first >= 0 ? first : null;
}

/**
 * Multi-select restore: solved shows the solved, locked state (the saved
 * ticks if they are still exactly right, else the correct set). Unsolved
 * starts with nothing ticked but keeps the wrong-check count, so a learner
 * who already earned "Show answer" keeps it.
 */
export function restoredMultiSelectState(
  options: readonly Option[],
  progress: QuestionProgress | undefined,
): MultiSelectState {
  if (!progress) return initialMultiSelectState;
  if (!progress.solved) {
    return { ...initialMultiSelectState, wrongChecks: progress.wrongAttempts };
  }
  const saved =
    progress.solvedWith && "selected" in progress.solvedWith
      ? progress.solvedWith.selected
      : null;
  const picked =
    saved && isSelectionCorrect(options, saved)
      ? normalizeSelection(saved)
      : correctOptionIndices(options);
  return {
    picked,
    checked: true,
    lastChecked: picked,
    solved: true,
    wrongChecks: progress.wrongAttempts,
    revealed: false,
  };
}

/** A number as plain input text that parseNumericInput reads back ("0.75", "1.6e-19"). */
export function numericInputText(value: number): string {
  return String(Number(value.toPrecision(12)));
}

/**
 * Numeric restore: solved shows the learner's correct value (or, if it no
 * longer grades correct after a content change, the authored answer) as a
 * correct, read-only answer with the solution panel. Unsolved starts with
 * an empty input but keeps the wrong count (see restoredMultiSelectState).
 */
export function restoredNumeric(
  spec: ToleranceSpec,
  progress: QuestionProgress | undefined,
): { input: string; state: NumericState } {
  if (!progress) return { input: "", state: initialNumericState };
  if (!progress.solved) {
    return {
      input: "",
      state: { ...initialNumericState, wrongCount: progress.wrongAttempts },
    };
  }
  const saved =
    progress.solvedWith && "value" in progress.solvedWith ? progress.solvedWith.value : null;
  const value =
    saved !== null && Number.isFinite(saved) && isNumericAnswerCorrect(saved, spec)
      ? saved
      : spec.answer;
  return {
    input: numericInputText(value),
    state: { result: { kind: "correct" }, wrongCount: progress.wrongAttempts, revealed: false },
  };
}
