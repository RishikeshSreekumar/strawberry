"use client";

import { createContext, useContext } from "react";
import type { LessonScore } from "./lib/lesson-score";

/**
 * Two contexts, provided by LessonProgressProvider on student lesson pages
 * and absent elsewhere (admin preview, tests), where both hooks return null
 * and nothing is tracked.
 *
 * - The reporter is a stable function, so question cards that report a
 *   correct answer never re-render when the score changes.
 * - The state (score, completion) is read by the lesson footer.
 */

/** Report that a question was just answered correctly (idempotent). */
export type ReportSolved = (questionId: string) => void;

export type LessonProgressState = {
  score: LessonScore;
  completed: boolean;
  /** A complete-lesson request (manual or automatic) is in flight. */
  completing: boolean;
  /** The last complete-lesson request failed (offline, signed out, server error). */
  saveFailed: boolean;
  /** Manual "Mark lesson complete". */
  completeLesson: () => void;
};

export const ReportSolvedContext = createContext<ReportSolved | null>(null);
export const LessonProgressStateContext = createContext<LessonProgressState | null>(null);

export function useReportSolved(): ReportSolved | null {
  return useContext(ReportSolvedContext);
}

export function useLessonProgressState(): LessonProgressState | null {
  return useContext(LessonProgressStateContext);
}
