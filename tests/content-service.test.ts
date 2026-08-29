import { beforeEach, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { lessons, lessonVersions } from "@/db/schema";
import {
  createChapter,
  createCourse,
  createLesson,
  getPublishedLesson,
  publishLessonVersion,
  saveLessonDraft,
  type DB,
} from "@/modules/content/services/content-service";
import { createTestDb } from "./helpers/test-db";

const BLOCKS_V1 = [{ type: "text", content: "version one" }];
const BLOCKS_V2 = [{ type: "text", content: "version two" }];

describe("content versioning", () => {
  let db: DB;
  let lessonId: string;

  beforeEach(async () => {
    db = await createTestDb();
    const course = await createCourse(db, { title: "Calculus" });
    const chapter = await createChapter(db, {
      courseId: course.id,
      title: "Functions",
    });
    const lesson = await createLesson(db, {
      chapterId: chapter.id,
      title: "Domain and Range",
    });
    lessonId = lesson.id;
  });

  it("slugifies titles", async () => {
    const [lesson] = await db.select().from(lessons);
    expect(lesson.slug).toBe("domain-and-range");
  });

  it("rejects invalid blocks before touching the DB", async () => {
    await expect(
      saveLessonDraft(db, { lessonId, blocks: [{ type: "nope" }] }),
    ).rejects.toThrow();
    expect(await db.select().from(lessonVersions)).toHaveLength(0);
  });

  it("reuses the latest draft instead of stacking versions", async () => {
    await saveLessonDraft(db, { lessonId, blocks: BLOCKS_V1 });
    await saveLessonDraft(db, { lessonId, blocks: BLOCKS_V2 });
    const versions = await db.select().from(lessonVersions);
    expect(versions).toHaveLength(1);
    expect(versions[0].version).toBe(1);
    expect(versions[0].blocks).toEqual(BLOCKS_V2);
  });

  it("publishing swings the lesson pointer and archives the old version", async () => {
    const v1 = await saveLessonDraft(db, { lessonId, blocks: BLOCKS_V1 });
    await publishLessonVersion(db, v1.id);

    let [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
    expect(lesson.publishedVersionId).toBe(v1.id);

    // Editing after publish starts a new draft version.
    const v2 = await saveLessonDraft(db, { lessonId, blocks: BLOCKS_V2 });
    expect(v2.id).not.toBe(v1.id);
    expect(v2.version).toBe(2);
    expect(v2.status).toBe("draft");

    // Published content is still v1 until v2 is published.
    [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
    expect(lesson.publishedVersionId).toBe(v1.id);

    await publishLessonVersion(db, v2.id);
    [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
    expect(lesson.publishedVersionId).toBe(v2.id);

    const [oldV1] = await db
      .select()
      .from(lessonVersions)
      .where(eq(lessonVersions.id, v1.id));
    expect(oldV1.status).toBe("archived");
  });

  it("resolves a published lesson by slug path", async () => {
    const draft = await saveLessonDraft(db, { lessonId, blocks: BLOCKS_V1 });

    const path = {
      courseSlug: "calculus",
      chapterSlug: "functions",
      lessonSlug: "domain-and-range",
    };
    expect(await getPublishedLesson(db, path)).toBeNull();

    await publishLessonVersion(db, draft.id);
    const result = await getPublishedLesson(db, path);
    expect(result?.lesson.id).toBe(lessonId);
    expect(result?.blocks).toEqual(BLOCKS_V1);
  });

  it("publishing an already-published version is a no-op", async () => {
    const v1 = await saveLessonDraft(db, { lessonId, blocks: BLOCKS_V1 });
    await publishLessonVersion(db, v1.id);
    const again = await publishLessonVersion(db, v1.id);
    expect(again.status).toBe("published");
    const versions = await db.select().from(lessonVersions);
    expect(versions).toHaveLength(1);
  });
});
