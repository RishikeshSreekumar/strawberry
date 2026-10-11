import { and, asc, desc, eq, isNotNull, sql } from "drizzle-orm";
import * as schema from "@/db/schema";
import type { QuestionResponse } from "@/db/schema/progress";
import type { DB } from "@/modules/content/services/content-service";

const { chapters, lessons, lessonProgress, questionAttempts } = schema;

// All writes are single statements: neon-http has no transactions, so
// upserts lean on the (user_id, lesson_id) unique index instead.

/** Record that the user opened a lesson. Never downgrades "completed". */
export async function markLessonStarted(
  db: DB,
  input: { userId: string; lessonId: string },
) {
  await db
    .insert(lessonProgress)
    .values({ userId: input.userId, lessonId: input.lessonId })
    .onConflictDoUpdate({
      target: [lessonProgress.userId, lessonProgress.lessonId],
      set: { lastActivityAt: sql`now()` },
    });
}

/** Idempotent: re-completing keeps the original completedAt. */
export async function markLessonCompleted(
  db: DB,
  input: { userId: string; lessonId: string },
) {
  await db
    .insert(lessonProgress)
    .values({
      userId: input.userId,
      lessonId: input.lessonId,
      status: "completed",
      completedAt: sql`now()`,
    })
    .onConflictDoUpdate({
      target: [lessonProgress.userId, lessonProgress.lessonId],
      set: {
        status: "completed",
        completedAt: sql`coalesce(${lessonProgress.completedAt}, now())`,
        lastActivityAt: sql`now()`,
      },
    });
}

/**
 * Append-only attempt history; requires a stable question block id.
 * Single-correct quizzes pass `selectedIndex` (authored order) and no
 * `response`; multiple-correct quizzes and numeric questions pass
 * `selectedIndex: -1` plus a `response`.
 *
 * Needs migration 0003 (the `response` column): drizzle names every column
 * in the insert, so without it every attempt insert fails, single-correct
 * quizzes included, and those attempts are lost.
 */
export async function recordQuizAttempt(
  db: DB,
  input: {
    userId: string;
    lessonId: string;
    questionId: string;
    selectedIndex: number;
    correct: boolean;
    response?: QuestionResponse | null;
  },
) {
  await db
    .insert(questionAttempts)
    .values({ ...input, response: input.response ?? null });
}

export type RecordedAttempt = {
  selectedIndex: number;
  correct: boolean;
  response: QuestionResponse | null;
  attemptedAt: Date;
};

/** One learner's attempt history for one question, folded. */
export type QuestionAttemptSummary = {
  questionId: string;
  attempts: number;
  wrongAttempts: number;
  /** At least one attempt was correct. */
  everCorrect: boolean;
  latest: RecordedAttempt;
  /** The most recent correct attempt, or null. */
  latestCorrect: RecordedAttempt | null;
};

/**
 * Folds attempt rows (any order) into one summary per question, in order
 * of each question's first attempt. Pure; exported for tests.
 */
export function summarizeAttempts(
  rows: readonly (RecordedAttempt & { questionId: string })[],
): QuestionAttemptSummary[] {
  const sorted = [...rows].sort(
    (a, b) => a.attemptedAt.getTime() - b.attemptedAt.getTime(),
  );
  const byQuestion = new Map<string, QuestionAttemptSummary>();
  for (const { questionId, ...attempt } of sorted) {
    const summary = byQuestion.get(questionId) ?? {
      questionId,
      attempts: 0,
      wrongAttempts: 0,
      everCorrect: false,
      latest: attempt,
      latestCorrect: null,
    };
    summary.attempts += 1;
    summary.latest = attempt;
    if (attempt.correct) {
      summary.everCorrect = true;
      summary.latestCorrect = attempt;
    } else {
      summary.wrongAttempts += 1;
    }
    byQuestion.set(questionId, summary);
  }
  return [...byQuestion.values()];
}

/**
 * The user's attempt history for every question in one lesson: latest
 * attempt, whether any attempt was correct, and counts. Histories are
 * per learner per lesson (a few rows per question), so they are folded in
 * JS rather than with window functions.
 *
 * Reads the `response` column, so it fails until migration 0003 is applied
 * (callers rendering a page should degrade to "no saved progress").
 */
export async function getLessonQuestionAttempts(
  db: DB,
  input: { userId: string; lessonId: string },
): Promise<QuestionAttemptSummary[]> {
  const rows = await db
    .select({
      questionId: questionAttempts.questionId,
      selectedIndex: questionAttempts.selectedIndex,
      correct: questionAttempts.correct,
      response: questionAttempts.response,
      attemptedAt: questionAttempts.attemptedAt,
    })
    .from(questionAttempts)
    .where(
      and(
        eq(questionAttempts.userId, input.userId),
        eq(questionAttempts.lessonId, input.lessonId),
      ),
    )
    .orderBy(asc(questionAttempts.attemptedAt));
  return summarizeAttempts(rows);
}

/** Per-lesson progress rows for one user across a course. */
export async function getCourseProgress(
  db: DB,
  input: { userId: string; courseId: string },
) {
  return db
    .select({
      lessonId: lessonProgress.lessonId,
      status: lessonProgress.status,
      completedAt: lessonProgress.completedAt,
    })
    .from(lessonProgress)
    .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
    .innerJoin(chapters, eq(lessons.chapterId, chapters.id))
    .where(
      and(
        eq(lessonProgress.userId, input.userId),
        eq(chapters.courseId, input.courseId),
      ),
    );
}

/** The user's most recently touched lesson in a course, or null. */
export async function getContinueLesson(
  db: DB,
  input: { userId: string; courseId: string },
) {
  const [row] = await db
    .select({
      lessonId: lessons.id,
      lessonSlug: lessons.slug,
      lessonTitle: lessons.title,
      chapterSlug: chapters.slug,
      status: lessonProgress.status,
    })
    .from(lessonProgress)
    .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
    .innerJoin(chapters, eq(lessons.chapterId, chapters.id))
    .where(
      and(
        eq(lessonProgress.userId, input.userId),
        eq(chapters.courseId, input.courseId),
      ),
    )
    .orderBy(desc(lessonProgress.lastActivityAt))
    .limit(1);
  return row ?? null;
}

/**
 * One row per course the user has touched: published lessons completed,
 * and when they last worked in it. Feeds the course catalog.
 */
export async function getProgressByCourse(db: DB, input: { userId: string }) {
  return db
    .select({
      courseId: chapters.courseId,
      completed: sql<number>`count(*) filter (where ${lessonProgress.status} = 'completed')`.mapWith(Number),
      lastActivityAt: sql<Date>`max(${lessonProgress.lastActivityAt})`.mapWith(
        (v: string | Date) => new Date(v),
      ),
    })
    .from(lessonProgress)
    .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
    .innerJoin(chapters, eq(lessons.chapterId, chapters.id))
    .where(
      and(
        eq(lessonProgress.userId, input.userId),
        isNotNull(lessons.publishedVersionId),
      ),
    )
    .groupBy(chapters.courseId);
}
