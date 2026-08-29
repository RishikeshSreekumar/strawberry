import { beforeEach, describe, expect, it } from "vitest";
import { lessonProgress, questionAttempts, user } from "@/db/schema";
import {
  createChapter,
  createCourse,
  createLesson,
  type DB,
} from "@/modules/content/services/content-service";
import {
  getContinueLesson,
  getCourseProgress,
  markLessonCompleted,
  markLessonStarted,
  recordQuizAttempt,
} from "@/modules/progress/services/progress-service";
import { createTestDb } from "./helpers/test-db";

describe("progress service", () => {
  let db: DB;
  let userId: string;
  let courseId: string;
  let lessonA: string;
  let lessonB: string;

  beforeEach(async () => {
    db = await createTestDb();
    userId = "user-1";
    await db.insert(user).values({
      id: userId,
      name: "Test User",
      email: "test@example.com",
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const course = await createCourse(db, { title: "Calculus" });
    courseId = course.id;
    const chapter = await createChapter(db, {
      courseId,
      title: "Functions",
    });
    lessonA = (await createLesson(db, { chapterId: chapter.id, title: "Lesson A" })).id;
    lessonB = (await createLesson(db, { chapterId: chapter.id, title: "Lesson B" })).id;
  });

  it("markLessonStarted upserts a single row and bumps lastActivityAt", async () => {
    await markLessonStarted(db, { userId, lessonId: lessonA });
    const [first] = await db.select().from(lessonProgress);
    await new Promise((r) => setTimeout(r, 10));
    await markLessonStarted(db, { userId, lessonId: lessonA });
    const rows = await db.select().from(lessonProgress);
    expect(rows).toHaveLength(1);
    expect(rows[0].status).toBe("started");
    expect(rows[0].lastActivityAt.getTime()).toBeGreaterThan(
      first.lastActivityAt.getTime(),
    );
  });

  it("markLessonCompleted works without a prior start and is idempotent", async () => {
    await markLessonCompleted(db, { userId, lessonId: lessonA });
    const [first] = await db.select().from(lessonProgress);
    expect(first.status).toBe("completed");
    expect(first.completedAt).not.toBeNull();

    await new Promise((r) => setTimeout(r, 10));
    await markLessonCompleted(db, { userId, lessonId: lessonA });
    const rows = await db.select().from(lessonProgress);
    expect(rows).toHaveLength(1);
    expect(rows[0].completedAt?.getTime()).toBe(first.completedAt?.getTime());
  });

  it("markLessonStarted never downgrades a completed lesson", async () => {
    await markLessonCompleted(db, { userId, lessonId: lessonA });
    await markLessonStarted(db, { userId, lessonId: lessonA });
    const [row] = await db.select().from(lessonProgress);
    expect(row.status).toBe("completed");
  });

  it("recordQuizAttempt appends history", async () => {
    const attempt = {
      userId,
      lessonId: lessonA,
      questionId: "lesson-a-quiz-1",
      selectedIndex: 0,
      correct: false,
    };
    await recordQuizAttempt(db, attempt);
    await recordQuizAttempt(db, { ...attempt, selectedIndex: 2, correct: true });
    const rows = await db.select().from(questionAttempts);
    expect(rows).toHaveLength(2);
  });

  it("getCourseProgress is scoped to the course and user", async () => {
    await markLessonCompleted(db, { userId, lessonId: lessonA });
    await markLessonStarted(db, { userId, lessonId: lessonB });

    const otherCourse = await createCourse(db, { title: "Algebra" });
    const otherChapter = await createChapter(db, {
      courseId: otherCourse.id,
      title: "Basics",
    });
    const otherLesson = await createLesson(db, {
      chapterId: otherChapter.id,
      title: "Other",
    });
    await markLessonStarted(db, { userId, lessonId: otherLesson.id });

    const progress = await getCourseProgress(db, { userId, courseId });
    expect(progress).toHaveLength(2);
    expect(new Map(progress.map((p) => [p.lessonId, p.status]))).toEqual(
      new Map([
        [lessonA, "completed"],
        [lessonB, "started"],
      ]),
    );
  });

  it("getContinueLesson returns the most recently touched lesson", async () => {
    expect(await getContinueLesson(db, { userId, courseId })).toBeNull();

    await markLessonStarted(db, { userId, lessonId: lessonA });
    await new Promise((r) => setTimeout(r, 10));
    await markLessonStarted(db, { userId, lessonId: lessonB });

    const recent = await getContinueLesson(db, { userId, courseId });
    expect(recent?.lessonId).toBe(lessonB);
    expect(recent?.status).toBe("started");
  });
});
