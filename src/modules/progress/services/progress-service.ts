import { and, desc, eq, sql } from "drizzle-orm";
import * as schema from "@/db/schema";
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

/** Append-only attempt history; requires a stable quiz block id. */
export async function recordQuizAttempt(
  db: DB,
  input: {
    userId: string;
    lessonId: string;
    questionId: string;
    selectedIndex: number;
    correct: boolean;
  },
) {
  await db.insert(questionAttempts).values(input);
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
