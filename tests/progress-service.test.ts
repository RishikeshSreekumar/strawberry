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
  getLessonQuestionAttempts,
  markLessonCompleted,
  markLessonStarted,
  recordQuizAttempt,
  summarizeAttempts,
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
    // Single-correct quizzes leave the response column null.
    expect(rows.map((r) => r.response)).toEqual([null, null]);
  });

  it("recordQuizAttempt stores multi-select and numeric responses as jsonb", async () => {
    const base = { userId, lessonId: lessonA, selectedIndex: -1 };
    await recordQuizAttempt(db, {
      ...base,
      questionId: "multi-1",
      correct: true,
      response: { selected: [0, 2] },
    });
    await recordQuizAttempt(db, {
      ...base,
      questionId: "num-1",
      correct: false,
      response: { value: -1.6e-19 },
    });
    const rows = await db
      .select()
      .from(questionAttempts)
      .orderBy(questionAttempts.questionId);
    expect(rows.map((r) => [r.questionId, r.selectedIndex, r.correct, r.response])).toEqual([
      ["multi-1", -1, true, { selected: [0, 2] }],
      ["num-1", -1, false, { value: -1.6e-19 }],
    ]);
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

  describe("getLessonQuestionAttempts", () => {
    const at = (seconds: number) => new Date(Date.UTC(2026, 0, 1, 0, 0, seconds));
    const attempt = (
      questionId: string,
      seconds: number,
      fields: Partial<typeof questionAttempts.$inferInsert> = {},
    ): typeof questionAttempts.$inferInsert => ({
      userId,
      lessonId: lessonA,
      questionId,
      selectedIndex: 0,
      correct: false,
      attemptedAt: at(seconds),
      ...fields,
    });

    it("returns nothing when the user has no attempts", async () => {
      expect(await getLessonQuestionAttempts(db, { userId, lessonId: lessonA })).toEqual([]);
    });

    it("folds history into latest attempt, ever-correct and counts per question", async () => {
      // Inserted out of order: the fold follows attemptedAt, not insertion.
      await db.insert(questionAttempts).values([
        attempt("single", 3, { selectedIndex: 1, correct: false }),
        attempt("single", 1, { selectedIndex: 2, correct: false }),
        attempt("single", 2, { selectedIndex: 0, correct: true }),
        attempt("multi", 4, { selectedIndex: -1, correct: false, response: { selected: [1] } }),
        attempt("multi", 5, { selectedIndex: -1, correct: true, response: { selected: [0, 2] } }),
        attempt("num", 6, { selectedIndex: -1, correct: false, response: { value: 9.8 } }),
        attempt("num", 7, { selectedIndex: -1, correct: false, response: { value: 39.2 } }),
      ]);
      const summaries = await getLessonQuestionAttempts(db, { userId, lessonId: lessonA });
      const byId = new Map(summaries.map((s) => [s.questionId, s]));
      expect([...byId.keys()]).toEqual(["single", "multi", "num"]);

      const single = byId.get("single")!;
      expect(single).toMatchObject({ attempts: 3, wrongAttempts: 2, everCorrect: true });
      // Latest attempt is the wrong one after the correct one.
      expect(single.latest).toMatchObject({ selectedIndex: 1, correct: false, response: null });
      expect(single.latestCorrect).toMatchObject({ selectedIndex: 0, correct: true });

      const multi = byId.get("multi")!;
      expect(multi).toMatchObject({ attempts: 2, wrongAttempts: 1, everCorrect: true });
      expect(multi.latest.response).toEqual({ selected: [0, 2] });
      expect(multi.latestCorrect?.response).toEqual({ selected: [0, 2] });

      const num = byId.get("num")!;
      expect(num).toMatchObject({ attempts: 2, wrongAttempts: 2, everCorrect: false });
      expect(num.latest.response).toEqual({ value: 39.2 });
      expect(num.latestCorrect).toBeNull();
    });

    it("is scoped to the user and the lesson", async () => {
      await db.insert(user).values({
        id: "user-2",
        name: "Other User",
        email: "other@example.com",
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await db.insert(questionAttempts).values([
        attempt("q1", 1, { correct: false }),
        // Same question id, other user: correct, must not leak.
        attempt("q1", 2, { userId: "user-2", correct: true }),
        // Same question id, other lesson.
        attempt("q1", 3, { lessonId: lessonB, correct: true }),
        attempt("q2", 4, { lessonId: lessonB, correct: true }),
      ]);
      const a = await getLessonQuestionAttempts(db, { userId, lessonId: lessonA });
      expect(a.map((s) => [s.questionId, s.attempts, s.everCorrect])).toEqual([["q1", 1, false]]);
      const b = await getLessonQuestionAttempts(db, { userId, lessonId: lessonB });
      expect(b.map((s) => [s.questionId, s.everCorrect])).toEqual([
        ["q1", true],
        ["q2", true],
      ]);
      const other = await getLessonQuestionAttempts(db, { userId: "user-2", lessonId: lessonA });
      expect(other.map((s) => [s.questionId, s.everCorrect])).toEqual([["q1", true]]);
    });

    it("reads attempts written by recordQuizAttempt", async () => {
      const base = { userId, lessonId: lessonA, questionId: "num-1", selectedIndex: -1 };
      await recordQuizAttempt(db, { ...base, correct: false, response: { value: 1 } });
      await new Promise((r) => setTimeout(r, 5));
      await recordQuizAttempt(db, { ...base, correct: true, response: { value: 19.6 } });
      const [summary] = await getLessonQuestionAttempts(db, { userId, lessonId: lessonA });
      expect(summary).toMatchObject({ questionId: "num-1", attempts: 2, everCorrect: true });
      expect(summary.latest.response).toEqual({ value: 19.6 });
    });
  });

  it("summarizeAttempts keeps the input order for equal timestamps (stable)", () => {
    const t = new Date(0);
    const row = (correct: boolean, selectedIndex: number) => ({
      questionId: "q",
      selectedIndex,
      correct,
      response: null,
      attemptedAt: t,
    });
    const [summary] = summarizeAttempts([row(true, 0), row(false, 1)]);
    expect(summary.latest.selectedIndex).toBe(1);
    expect(summary.latestCorrect?.selectedIndex).toBe(0);
    expect(summarizeAttempts([])).toEqual([]);
  });
});
