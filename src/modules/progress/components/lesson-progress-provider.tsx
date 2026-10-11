"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { sessionProgress } from "@/modules/content/lib/session-progress";
import { markLessonCompletedAction } from "../actions";
import {
  LessonProgressStateContext,
  ReportSolvedContext,
  type LessonProgressState,
} from "../lesson-progress-context";
import { canAutoComplete, lessonScore, type LessonQuestion } from "../lib/lesson-score";

/**
 * Client-side lesson progress for a student lesson page: which questions
 * are solved (seeded from the server, then updated live as the question
 * cards report correct answers) and whether the lesson is complete.
 *
 * Completes the lesson automatically once canAutoComplete holds, including
 * on load when saved progress already qualifies (e.g. the earlier request
 * failed). The request runs in a transition, so the UI never waits on it,
 * and markLessonCompleted is idempotent. A router refresh afterwards
 * re-renders the server components (sidebar icons); client state survives
 * it. If the automatic request fails, the footer says so and the manual
 * button stays available.
 *
 * Starting state is the server's merged with this tab's session record
 * (lib/session-progress.ts), so Back/Forward, which reuses the page's
 * original RSC payload, doesn't roll the score back. The record is empty on
 * a full load, so hydration matches the server render.
 */
export function LessonProgressProvider({
  lessonId,
  questions,
  initialSolved,
  initialCompleted,
  children,
}: {
  lessonId: string;
  questions: LessonQuestion[];
  /** Question ids with at least one correct recorded attempt. */
  initialSolved: string[];
  initialCompleted: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [solved, setSolved] = useState<ReadonlySet<string>>(
    () => new Set([...initialSolved, ...sessionProgress.solvedIds(lessonId)]),
  );
  const [completedHere, setCompletedHere] = useState(() =>
    sessionProgress.isCompleted(lessonId),
  );
  // A refresh after completing passes initialCompleted = true.
  const completed = initialCompleted || completedHere;
  const [saveFailed, setSaveFailed] = useState(false);
  const [completing, startCompleting] = useTransition();
  const autoRequested = useRef(false);

  const reportSolved = useCallback((questionId: string) => {
    setSolved((prev) => (prev.has(questionId) ? prev : new Set(prev).add(questionId)));
  }, []);

  /** Saves completion; onFailure runs if it couldn't be saved. */
  const requestCompletion = useCallback(
    (onFailure?: () => void) => {
      setSaveFailed(false);
      startCompleting(async () => {
        let ok = false;
        try {
          ok = (await markLessonCompletedAction(lessonId)).ok;
        } catch {
          // Offline or signed out: handled as a failure below.
        }
        startCompleting(() => {
          if (!ok) {
            setSaveFailed(true);
            onFailure?.();
            return;
          }
          sessionProgress.noteCompleted(lessonId);
          setCompletedHere(true);
          router.refresh();
        });
      });
    },
    [lessonId, router],
  );

  const completeLesson = useCallback(() => requestCompletion(), [requestCompletion]);

  const eligible = canAutoComplete(questions, solved);
  useEffect(() => {
    if (!eligible || completed || autoRequested.current) return;
    autoRequested.current = true;
    // On failure, allow another automatic try if eligibility is regained
    // later (e.g. after a remount); the footer points to the button.
    requestCompletion(() => {
      autoRequested.current = false;
    });
  }, [eligible, completed, requestCompletion]);

  const score = useMemo(() => lessonScore(questions, solved), [questions, solved]);
  const state = useMemo<LessonProgressState>(
    () => ({ score, completed, completing, saveFailed, completeLesson }),
    [score, completed, completing, saveFailed, completeLesson],
  );

  return (
    <ReportSolvedContext value={reportSolved}>
      <LessonProgressStateContext value={state}>{children}</LessonProgressStateContext>
    </ReportSolvedContext>
  );
}
