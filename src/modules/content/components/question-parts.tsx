"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { QuestionResponse } from "@/db/schema/progress";
import { sessionProgress } from "../lib/session-progress";
import type { QuestionProgress } from "../lib/question-state";
import type { QuizBlock } from "../schemas/blocks";
import { RichText } from "./rich-text";

/** Shared pieces of the quiz and numeric question cards. */

export const variantLabels: Record<QuizBlock["variant"], string> = {
  practice: "Practice",
  concept: "Check your thinking",
  mastery: "Mastery check",
};

export const questionCardClass = "space-y-3 rounded-xl border bg-card p-4 shadow-xs";

export const linkButtonClass =
  "text-muted-foreground underline underline-offset-2 hover:text-foreground";

/**
 * Fire-and-forget attempt recording: the UI never waits on it and a failed
 * request (offline, signed out, server error) is swallowed, so the question
 * keeps working. Swallowed failures are lost attempts, though: in
 * particular, until migration 0003 (question_attempts.response) is applied,
 * every insert fails and no attempts of any question type are saved.
 * Dynamic import keeps the DB-backed action module out of non-app render
 * paths (tests, admin preview bundles). No-op without a lesson id (admin
 * preview) or a question id (untracked block). Also noted in this tab's
 * session record (lib/session-progress.ts) so the answer survives
 * Back/Forward.
 */
export function recordAttempt(
  lessonId: string | undefined,
  questionId: string | undefined,
  attempt: { selectedIndex: number; correct: boolean; response?: QuestionResponse },
  /** The card's server progress, seeding this tab's record. */
  starting?: QuestionProgress,
) {
  if (!lessonId || !questionId) return;
  sessionProgress.noteAttempt(lessonId, questionId, attempt, starting);
  import("@/modules/progress/actions")
    .then(({ recordQuizAttemptAction }) =>
      recordQuizAttemptAction({ lessonId, questionId, ...attempt }),
    )
    .catch(() => {});
}

/**
 * Focus an element after the next commit. Used when the control that had
 * focus is about to unmount (Check, Try again, Show answer), so keyboard
 * and screen-reader users land on the result instead of the page body.
 */
export function useFocusAfterRender() {
  const pending = useRef<RefObject<HTMLElement | null> | (() => HTMLElement | null) | null>(
    null,
  );
  useEffect(() => {
    const target = pending.current;
    if (!target) return;
    pending.current = null;
    const el = typeof target === "function" ? target() : target.current;
    el?.focus({ preventScroll: true });
  });
  return useCallback(
    (target: RefObject<HTMLElement | null> | (() => HTMLElement | null)) => {
      pending.current = target;
    },
    [],
  );
}

export function HintToggle({ hint }: { hint: string }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      {showHint ? (
        <p className="text-sm text-muted-foreground">
          Hint: <RichText text={hint} />
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setShowHint(true)}
          className={`text-sm ${linkButtonClass}`}
        >
          Need a hint?
        </button>
      )}
    </div>
  );
}
