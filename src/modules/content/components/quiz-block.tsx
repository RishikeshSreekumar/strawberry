"use client";

import { useState } from "react";
import type { QuizBlock } from "../schemas/blocks";
import { RichText } from "./rich-text";

const variantLabels: Record<QuizBlock["variant"], string> = {
  practice: "Practice",
  concept: "Check your thinking",
  mastery: "Mastery check",
};

export function QuizBlockView({
  block,
  lessonId,
}: {
  block: QuizBlock;
  /** When set (student pages), attempts are recorded; admin preview omits it. */
  lessonId?: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const answered = selected !== null;
  const isCorrect = answered && Boolean(block.options[selected].correct);

  function selectOption(i: number) {
    setSelected(i);
    if (lessonId && block.id) {
      // Fire-and-forget: the UI must never block on attempt recording.
      // Dynamic import keeps the DB-backed action module out of
      // non-app render paths (tests, admin preview bundles).
      const questionId = block.id;
      import("@/modules/progress/actions")
        .then(({ recordQuizAttemptAction }) =>
          recordQuizAttemptAction({
            lessonId,
            questionId,
            selectedIndex: i,
            correct: Boolean(block.options[i].correct),
          }),
        )
        .catch(() => {});
    }
  }

  return (
    <div className="space-y-3 rounded-xl border bg-card p-4 shadow-xs">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {variantLabels[block.variant]}
      </p>
      <p className="font-medium leading-7">
        <RichText text={block.question} />
      </p>
      <div className="space-y-2">
        {block.options.map((option, i) => {
          let style = "bg-background hover:bg-accent/50";
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
              onClick={() => selectOption(i)}
              className={`block w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${style}`}
            >
              <RichText text={option.text} />
            </button>
          );
        })}
      </div>
      {answered && (
        <p
          className={`text-sm leading-6 ${
            isCorrect ? "text-success" : "text-destructive"
          }`}
        >
          {isCorrect ? "Correct. " : "Not quite. "}
          {block.options[selected].feedback && (
            <span className="text-foreground">
              <RichText text={block.options[selected].feedback} />
            </span>
          )}
          {!isCorrect && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="ml-2 text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Try again
            </button>
          )}
        </p>
      )}
      {block.hint && !isCorrect && (
        <div>
          {showHint ? (
            <p className="text-sm text-muted-foreground">
              Hint: <RichText text={block.hint} />
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Need a hint?
            </button>
          )}
        </div>
      )}
    </div>
  );
}
