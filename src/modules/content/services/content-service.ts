import { and, asc, desc, eq, isNotNull } from "drizzle-orm";
import type { PgDatabase } from "drizzle-orm/pg-core";
import * as schema from "@/db/schema";
import {
  CURRENT_SCHEMA_VERSION,
  parseLessonBlocks,
  type LessonBlock,
} from "../schemas/blocks";

const { courses, chapters, lessons, lessonVersions } = schema;

// Structural type so the same services run against Neon in the app
// and PGlite in tests.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DB = PgDatabase<any, typeof schema>;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ---------- Courses / chapters / lessons ----------

export async function createCourse(db: DB, input: { title: string; slug?: string; description?: string }) {
  const [course] = await db
    .insert(courses)
    .values({
      title: input.title,
      slug: input.slug?.trim() || slugify(input.title),
      description: input.description,
    })
    .returning();
  return course;
}

export async function createChapter(
  db: DB,
  input: { courseId: string; title: string; slug?: string; position?: number },
) {
  const [chapter] = await db
    .insert(chapters)
    .values({
      courseId: input.courseId,
      title: input.title,
      slug: input.slug?.trim() || slugify(input.title),
      position: input.position ?? 0,
    })
    .returning();
  return chapter;
}

export async function createLesson(
  db: DB,
  input: { chapterId: string; title: string; slug?: string; position?: number },
) {
  const [lesson] = await db
    .insert(lessons)
    .values({
      chapterId: input.chapterId,
      title: input.title,
      slug: input.slug?.trim() || slugify(input.title),
      position: input.position ?? 0,
    })
    .returning();
  return lesson;
}

// ---------- Versioning (tech_plan.md §6) ----------

/**
 * Save draft content for a lesson. Reuses the latest version if it is
 * still a draft; otherwise starts a new version on top of the latest.
 * Blocks are validated against the block schemas before touching the DB.
 */
export async function saveLessonDraft(
  db: DB,
  input: { lessonId: string; blocks: unknown; userId?: string },
) {
  const blocks: LessonBlock[] = parseLessonBlocks(input.blocks);

  const [latest] = await db
    .select()
    .from(lessonVersions)
    .where(eq(lessonVersions.lessonId, input.lessonId))
    .orderBy(desc(lessonVersions.version))
    .limit(1);

  if (latest && latest.status === "draft") {
    const [updated] = await db
      .update(lessonVersions)
      .set({ blocks })
      .where(eq(lessonVersions.id, latest.id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(lessonVersions)
    .values({
      lessonId: input.lessonId,
      version: (latest?.version ?? 0) + 1,
      status: "draft",
      schemaVersion: CURRENT_SCHEMA_VERSION,
      blocks,
      createdBy: input.userId,
    })
    .returning();
  return created;
}

/**
 * Publish a version: archive the currently published version (if any),
 * mark this one published, and swing the lesson's published pointer.
 */
export async function publishLessonVersion(db: DB, versionId: string) {
  const [version] = await db
    .select()
    .from(lessonVersions)
    .where(eq(lessonVersions.id, versionId))
    .limit(1);
  if (!version) throw new Error(`Lesson version ${versionId} not found`);
  if (version.status === "published") return version;

  await db
    .update(lessonVersions)
    .set({ status: "archived" })
    .where(
      and(
        eq(lessonVersions.lessonId, version.lessonId),
        eq(lessonVersions.status, "published"),
      ),
    );

  const [published] = await db
    .update(lessonVersions)
    .set({ status: "published", publishedAt: new Date() })
    .where(eq(lessonVersions.id, versionId))
    .returning();

  await db
    .update(lessons)
    .set({ publishedVersionId: versionId, updatedAt: new Date() })
    .where(eq(lessons.id, version.lessonId));

  return published;
}

// ---------- Read queries ----------

export async function listCourses(db: DB) {
  return db.select().from(courses).orderBy(asc(courses.title));
}

export async function getCourseBySlug(db: DB, slug: string) {
  const [course] = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  return course ?? null;
}

export async function listChapters(db: DB, courseId: string) {
  return db
    .select()
    .from(chapters)
    .where(eq(chapters.courseId, courseId))
    .orderBy(asc(chapters.position), asc(chapters.title));
}

export async function listLessons(db: DB, chapterId: string) {
  return db
    .select()
    .from(lessons)
    .where(eq(lessons.chapterId, chapterId))
    .orderBy(asc(lessons.position), asc(lessons.title));
}

export async function listLessonVersions(db: DB, lessonId: string) {
  return db
    .select()
    .from(lessonVersions)
    .where(eq(lessonVersions.lessonId, lessonId))
    .orderBy(desc(lessonVersions.version));
}

/**
 * Ordered outline of a course's published lessons, grouped by chapter.
 * Chapters with no published lessons are omitted.
 */
export async function getCourseOutline(db: DB, courseId: string) {
  const rows = await db
    .select({
      chapterId: chapters.id,
      chapterSlug: chapters.slug,
      chapterTitle: chapters.title,
      lessonId: lessons.id,
      lessonSlug: lessons.slug,
      lessonTitle: lessons.title,
    })
    .from(lessons)
    .innerJoin(chapters, eq(lessons.chapterId, chapters.id))
    .where(and(eq(chapters.courseId, courseId), isNotNull(lessons.publishedVersionId)))
    .orderBy(
      asc(chapters.position),
      asc(chapters.title),
      asc(lessons.position),
      asc(lessons.title),
    );

  const outline: Array<{
    id: string;
    slug: string;
    title: string;
    lessons: Array<{ id: string; slug: string; title: string }>;
  }> = [];
  for (const row of rows) {
    let chapter = outline.at(-1);
    if (!chapter || chapter.id !== row.chapterId) {
      chapter = {
        id: row.chapterId,
        slug: row.chapterSlug,
        title: row.chapterTitle,
        lessons: [],
      };
      outline.push(chapter);
    }
    chapter.lessons.push({
      id: row.lessonId,
      slug: row.lessonSlug,
      title: row.lessonTitle,
    });
  }
  return outline;
}

export type CourseOutline = Awaited<ReturnType<typeof getCourseOutline>>;

/** Resolve a published lesson by its slug path, for the student-facing page. */
export async function getPublishedLesson(
  db: DB,
  path: { courseSlug: string; chapterSlug: string; lessonSlug: string },
) {
  const [row] = await db
    .select({
      course: courses,
      chapter: chapters,
      lesson: lessons,
      version: lessonVersions,
    })
    .from(lessons)
    .innerJoin(chapters, eq(lessons.chapterId, chapters.id))
    .innerJoin(courses, eq(chapters.courseId, courses.id))
    .innerJoin(lessonVersions, eq(lessons.publishedVersionId, lessonVersions.id))
    .where(
      and(
        eq(courses.slug, path.courseSlug),
        eq(chapters.slug, path.chapterSlug),
        eq(lessons.slug, path.lessonSlug),
      ),
    )
    .limit(1);
  if (!row) return null;
  return { ...row, blocks: parseLessonBlocks(row.version.blocks) };
}
