"use client";

import { Check } from "lucide-react";
import { useId, useRef, useState } from "react";
import { useReportSolved } from "@/modules/progress/lesson-progress-context";
import {
  canCheckSelection,
  canRevealSelection,
  checkSelection,
  multiSelectLocked,
  multiSelectView,
  restoredMultiSelectState,
  restoredSingleChoice,
  retrySelection,
  revealSelection,
  toggleOption,
  type MultiSelectState,
  type MultiSelectView,
  type QuestionProgress,
} from "../lib/question-state";
import type { OptionVerdict } from "../lib/quiz-grading";
import { quizDisplayOrder, quizShuffleSeed } from "../lib/quiz-shuffle";
import { mergeQuestionProgress, sessionProgress } from "../lib/session-progress";
import type { QuizBlock } from "../schemas/blocks";
import {
  HintToggle,
  linkButtonClass,
  questionCardClass,
  recordAttempt,
  useFocusAfterRender,
  variantLabels,
} from "./question-parts";
import { RichText } from "./rich-text";

type QuizProps = {
  block: QuizBlock;
  /** When set (student pages), attempts are recorded; admin preview omits it. */
  lessonId?: string;
  /** Saved progress to start from (student pages); see lib/question-state.ts. */
  progress?: QuestionProgress;
};

/**
 * Multiple-choice question. Single-correct quizzes answer on the first
 * click; `multiple: true` quizzes are "select all that apply" with a Check
 * button (rules in lib/question-state.ts: a wrong Check marks only the
 * ticked options; the full answer is offered after two wrong Checks).
 * Selections and recorded attempts always use authored option
 * indices; only the display order is shuffled.
 *
 * Initial state comes from `progress` merged with this tab's session
 * record (empty on a full load, so hydration matches; see
 * lib/session-progress.ts): a solved question reopens solved; an unsolved
 * one reopens fresh. Correct recorded answers are reported to the lesson's
 * score.
 */
export function QuizBlockView(props: QuizProps) {
  return props.block.multiple ? (
    <MultiSelectQuiz {...props} />
  ) : (
    <SingleChoiceQuiz {...props} />
  );
}

function displayOrderFor(block: QuizBlock): number[] {
  return quizDisplayOrder(
    block.options.length,
    quizShuffleSeed(block),
    block.shuffle ?? true,
  );
}

/** Server progress merged with answers given in this tab since. */
function startingProgress({ block, lessonId, progress }: QuizProps) {
  return mergeQuestionProgress(progress, sessionProgress.question(lessonId, block.id));
}

function SingleChoiceQuiz(props: QuizProps) {
  const { block, lessonId } = props;
  const [selected, setSelected] = useState<number | null>(() =>
    restoredSingleChoice(block.options, startingProgress(props)),
  );
  const reportSolved = useReportSolved();
  const groupRef = useRef<HTMLDivElement>(null);
  const focusAfterRender = useFocusAfterRender();
  // Guarded lookup: options can shrink when content is republished.
  const selectedOption = selected === null ? undefined : block.options[selected];
  const answered = selectedOption !== undefined;
  const isCorrect = Boolean(selectedOption?.correct);
  const displayOrder = displayOrderFor(block);

  function selectOption(i: number) {
    // Once answered correctly the question is done, and re-clicking the
    // wrong option on show is not another attempt.
    if (isCorrect || i === selected) return;
    setSelected(i);
    const correct = Boolean(block.options[i].correct);
    recordAttempt(lessonId, block.id, { selectedIndex: i, correct }, props.progress);
    if (correct && lessonId && block.id) reportSolved?.(block.id);
  }

  return (
    <div className={questionCardClass}>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {variantLabels[block.variant]}
      </p>
      <p className="font-medium leading-7">
        <RichText text={block.question} />
      </p>
      <div ref={groupRef} className="space-y-2">
        {displayOrder.map((i) => {
          const option = block.options[i];
          let style = isCorrect ? "bg-background cursor-default" : "bg-background hover:bg-accent/50";
          if (answered && i === selected) {
            style = option.correct
              ? "border-success bg-success/10"
              : "border-destructive bg-destructive/10";
          } else if (answered && isCorrect && option.correct) {
            style = "border-success bg-success/10";
          }
          return (
            <button
              key={i}
              type="button"
              data-option={i}
              aria-disabled={isCorrect || undefined}
              onClick={() => selectOption(i)}
              className={`block w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${style}`}
            >
              <RichText text={option.text} />
            </button>
          );
        })}
      </div>
      {/* Focus stays on the clicked option, so the result is announced here. */}
      <div aria-live="polite">
        {answered && (
          <p
            className={`text-sm leading-6 ${
              isCorrect ? "text-success" : "text-destructive"
            }`}
          >
            {isCorrect ? "Correct. " : "Not quite. "}
            {selectedOption.feedback && (
              <span className="text-foreground">
                <RichText text={selectedOption.feedback} />
              </span>
            )}
            {!isCorrect && (
              <button
                type="button"
                onClick={() => {
                  // This button unmounts: return focus to the option just tried.
                  focusAfterRender(() =>
                    groupRef.current?.querySelector<HTMLElement>(`[data-option="${selected}"]`) ??
                    null,
                  );
                  setSelected(null);
                }}
                className={`ml-2 ${linkButtonClass}`}
              >
                Try again
              </button>
            )}
          </p>
        )}
      </div>
      {block.hint && !isCorrect && <HintToggle hint={block.hint} />}
    </div>
  );
}

const verdictStyles: Record<OptionVerdict, string> = {
  hit: "border-success bg-success/10",
  wrong: "border-destructive bg-destructive/10",
  missed: "border-dashed border-success bg-background",
  neutral: "bg-background",
};

const verdictLabels: Record<OptionVerdict, string | null> = {
  hit: "Correct",
  wrong: "Incorrect",
  missed: "Missed: this one is also correct",
  neutral: null,
};

/** Result line; never says how many options are correct. */
const statusMessages: Record<Exclude<MultiSelectView["status"], "open">, string> = {
  correct: "Correct. You found every correct option.",
  "wrong-ticks": "Not quite. At least one of your ticks is wrong.",
  missing: "Not quite. Your ticks are right, but at least one correct option is missing.",
  both: "Not quite. At least one tick is wrong, and at least one correct option is missing.",
  revealed: "Here is the answer: every correct option is marked.",
};

function MultiSelectQuiz(props: QuizProps) {
  const { block, lessonId } = props;
  const [state, setState] = useState<MultiSelectState>(() =>
    restoredMultiSelectState(block.options, startingProgress(props)),
  );
  const reportSolved = useReportSolved();
  const groupRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const focusAfterRender = useFocusAfterRender();
  const baseId = useId();
  const questionId = `${baseId}-question`;
  const instructionsId = `${baseId}-instructions`;
  const displayOrder = displayOrderFor(block);
  const view = multiSelectView(state, block.options);
  const locked = multiSelectLocked(state);

  function check() {
    const { state: next, attempt } = checkSelection(state, block.options);
    setState(next);
    // Check unmounts while the result shows: move focus to the result.
    if (next !== state) focusAfterRender(statusRef);
    if (attempt) {
      recordAttempt(lessonId, block.id, {
        selectedIndex: -1,
        correct: attempt.correct,
        response: { selected: attempt.selected },
      }, props.progress);
      if (attempt.correct && lessonId && block.id) reportSolved?.(block.id);
    }
  }

  return (
    <div className={questionCardClass}>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {variantLabels[block.variant]}
      </p>
      <p id={questionId} className="font-medium leading-7">
        <RichText text={block.question} />
      </p>
      <p id={instructionsId} className="text-sm text-muted-foreground">
        Select all that apply, then press Check.
      </p>
      <div
        ref={groupRef}
        role="group"
        aria-labelledby={questionId}
        aria-describedby={instructionsId}
        className="space-y-2"
      >
        {displayOrder.map((i) => {
          const option = block.options[i];
          const isPicked = state.picked.includes(i);
          const verdict = view.verdicts[i];
          const style = verdict
            ? verdictStyles[verdict]
            : isPicked && !locked
              ? "border-primary bg-primary/5"
              : locked
                ? "bg-background"
                : "bg-background hover:bg-accent/50";
          const label =
            // Revealed before any Check this visit: nothing was ticked, so
            // "also correct" would be odd.
            verdict === "missed" && state.picked.length === 0
              ? "Correct answer"
              : verdict
                ? verdictLabels[verdict]
                : null;
          const feedback = view.showFeedback[i] ? option.feedback : undefined;
          return (
            <button
              key={i}
              type="button"
              role="checkbox"
              data-option={i}
              aria-checked={isPicked}
              aria-disabled={locked || undefined}
              onClick={() => setState(toggleOption(state, i))}
              className={`flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors ${style} ${
                locked ? "cursor-default" : ""
              }`}
            >
              <span
                aria-hidden
                className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-sm border ${
                  isPicked
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/50 bg-background"
                }`}
              >
                {isPicked && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1 space-y-1">
                <span className="block">
                  <RichText text={option.text} />
                </span>
                {label && (
                  <span
                    className={`block text-xs font-semibold ${
                      verdict === "wrong" ? "text-destructive" : "text-success"
                    }`}
                  >
                    {label}
                  </span>
                )}
                {feedback && (
                  <span className="block leading-6 text-foreground">
                    <RichText text={feedback} />
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {/* Not a live region: Check and Show answer move focus here, which
          announces it (a live region would announce it twice). */}
      <div>
        {view.status !== "open" && (
          <p
            ref={statusRef}
            tabIndex={-1}
            className={`text-sm leading-6 outline-none ${
              view.status === "correct" || view.status === "revealed"
                ? "text-success"
                : "text-destructive"
            }`}
          >
            {statusMessages[view.status]}
            {!state.solved && !state.revealed && (
              <button
                type="button"
                onClick={() => {
                  // This button unmounts: focus the first option (in display order).
                  focusAfterRender(() =>
                    groupRef.current?.querySelector<HTMLElement>("[data-option]") ?? null,
                  );
                  setState(retrySelection(state));
                }}
                className={`ml-2 ${linkButtonClass}`}
              >
                Try again
              </button>
            )}
          </p>
        )}
      </div>
      {!locked && (
        <div>
          <button
            type="button"
            onClick={check}
            // Disabled until something is ticked, and after Try again until
            // the ticks differ from the ones just checked.
            disabled={!canCheckSelection(state)}
            className="rounded-md border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Check
          </button>
        </div>
      )}
      {canRevealSelection(state) && (
        <button
          type="button"
          onClick={() => {
            focusAfterRender(statusRef);
            setState(revealSelection(state));
          }}
          className={`block text-sm ${linkButtonClass}`}
        >
          Show answer
        </button>
      )}
      {block.hint && !state.solved && !state.revealed && <HintToggle hint={block.hint} />}
    </div>
  );
}
