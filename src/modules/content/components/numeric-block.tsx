"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useReportSolved } from "@/modules/progress/lesson-progress-context";
import { answerAllowance, formatNumericAnswer } from "../lib/numeric-answer";
import {
  canRevealNumeric,
  checkNumeric,
  editNumeric,
  restoredNumeric,
  revealNumeric,
  type NumericState,
  type QuestionProgress,
} from "../lib/question-state";
import { mergeQuestionProgress, sessionProgress } from "../lib/session-progress";
import type { NumericBlock } from "../schemas/blocks";
import {
  HintToggle,
  questionCardClass,
  recordAttempt,
  useFocusAfterRender,
  variantLabels,
} from "./question-parts";
import { RichText } from "./rich-text";
import { StructuredText } from "./structured-text";

/** "±0.01", "within 2%", or null for an exact (integer-type) answer. Rich text. */
function toleranceNote(block: NumericBlock): string | null {
  const allowance = answerAllowance(block);
  if (allowance === 0) return null;
  const rel = block.relTolerance ?? 0;
  if (rel > 0 && rel * Math.abs(block.answer) >= (block.tolerance ?? 0)) {
    return `within ${Number((rel * 100).toPrecision(6))}%`;
  }
  return `±${formatNumericAnswer(allowance)}`;
}

/**
 * Numerical-answer question: type a number, press Check. Accepts decimals,
 * negatives, fractions and scientific notation (lib/numeric-answer.ts);
 * unparseable input gets a gentle message and is not counted or recorded.
 * The worked solution (or, without one, the answer) shows once correct, or
 * on request after REVEAL_AFTER_WRONG wrong attempts; checks after that
 * are not recorded (rules in lib/question-state.ts).
 *
 * Initial state comes from `progress` merged with this tab's session
 * record (empty on a full load, so hydration matches; see
 * lib/session-progress.ts): a solved question reopens with the learner's value and the solution; an
 * unsolved one reopens empty. Correct recorded answers are reported to the
 * lesson's score.
 */
export function NumericBlockView({
  block,
  lessonId,
  progress,
}: {
  block: NumericBlock;
  /** When set (student pages), attempts are recorded; admin preview omits it. */
  lessonId?: string;
  /** Saved progress to start from (student pages); see lib/question-state.ts. */
  progress?: QuestionProgress;
}) {
  const [restored] = useState(() =>
    restoredNumeric(
      block,
      mergeQuestionProgress(progress, sessionProgress.question(lessonId, block.id)),
    ),
  );
  const [input, setInput] = useState(restored.input);
  const [state, setState] = useState<NumericState>(restored.state);
  const reportSolved = useReportSolved();
  const inputRef = useRef<HTMLInputElement>(null);
  const correctRef = useRef<HTMLParagraphElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const focusAfterRender = useFocusAfterRender();
  const baseId = useId();
  const questionId = `${baseId}-question`;
  const inputId = `${baseId}-input`;
  const unitId = `${baseId}-unit`;
  const feedbackId = `${baseId}-feedback`;
  const { result } = state;
  const isCorrect = result?.kind === "correct";
  const showReveal = isCorrect || state.revealed;
  const note = toleranceNote(block);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { state: next, attempt } = checkNumeric(state, input, block);
    setState(next);
    if (next !== state) {
      // Check unmounts once correct (focus the result); otherwise it is
      // disabled until the input changes (focus the input to edit).
      focusAfterRender(next.result?.kind === "correct" ? correctRef : inputRef);
    }
    if (attempt) {
      recordAttempt(lessonId, block.id, {
        selectedIndex: -1,
        correct: attempt.correct,
        response: { value: attempt.value },
      }, progress);
      if (attempt.correct && lessonId && block.id) reportSolved?.(block.id);
    }
  }

  function onChange(value: string) {
    setInput(value);
    // Stale "Not quite" / format messages go away as soon as the learner edits.
    setState(editNumeric(state));
  }

  return (
    <div className={questionCardClass}>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {variantLabels[block.variant]}
      </p>
      <div id={questionId}>
        <StructuredText content={block.question} className="font-medium leading-7" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-2">
        <label htmlFor={inputId} className="sr-only">
          Your answer
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="e.g. 2.5, -3/4, 1.6e-19"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          readOnly={isCorrect}
          aria-describedby={[questionId, block.unit ? unitId : null, feedbackId]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={result?.kind === "invalid" || undefined}
          className={`w-44 rounded-md border bg-background px-3 py-1.5 text-sm tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
            isCorrect
              ? "border-success bg-success/10"
              : result?.kind === "wrong"
                ? "border-destructive"
                : ""
          }`}
        />
        {block.unit && (
          <span id={unitId} className="text-sm">
            <RichText text={block.unit} />
          </span>
        )}
        {!isCorrect && (
          <button
            type="submit"
            disabled={input.trim() === "" || result !== null}
            className="rounded-md border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Check
          </button>
        )}
      </form>

      <div id={feedbackId} aria-live="polite">
        {result?.kind === "invalid" && (
          <p className="text-sm leading-6 text-muted-foreground">{result.message}</p>
        )}
        {result?.kind === "wrong" && (
          <p className="text-sm leading-6 text-destructive">
            Not quite.{" "}
            {result.mistake ? (
              <span className="text-foreground">
                <RichText text={result.mistake.feedback} />
              </span>
            ) : (
              <span className="text-muted-foreground">Check your working and try again.</span>
            )}
          </p>
        )}
      </div>
      {/* Outside the live region: a correct Check moves focus here, which
          announces it. Wrong/invalid messages are announced by the region
          (focus stays in the input). */}
      {isCorrect && (
        <p ref={correctRef} tabIndex={-1} className="text-sm leading-6 text-success outline-none">
          Correct.
        </p>
      )}

      {canRevealNumeric(state) && (
        <button
          type="button"
          onClick={() => {
            focusAfterRender(revealRef);
            setState(revealNumeric(state));
          }}
          className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          {block.solution ? "Show solution" : "Show answer"}
        </button>
      )}

      {showReveal && (
        <div
          ref={revealRef}
          tabIndex={-1}
          className="space-y-2 rounded-lg border border-success/40 bg-success/5 px-3 py-2 outline-none"
        >
          <p className="text-xs font-semibold tracking-wide text-success uppercase">
            {block.solution ? "Solution" : "Answer"}
          </p>
          <p className="text-sm leading-6">
            <span className="font-semibold">Answer: </span>
            <RichText text={formatNumericAnswer(block.answer)} />
            {block.unit && (
              <>
                {" "}
                <RichText text={block.unit} />
              </>
            )}
            {note && (
              <span className="text-muted-foreground">
                {" ("}
                <RichText text={note} />
                {" accepted)"}
              </span>
            )}
          </p>
          {block.solution && <StructuredText content={block.solution} className="leading-7" />}
        </div>
      )}

      {block.hint && !showReveal && <HintToggle hint={block.hint} />}
    </div>
  );
}
