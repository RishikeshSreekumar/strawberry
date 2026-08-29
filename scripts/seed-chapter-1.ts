import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import { chapter1Lessons } from "../src/modules/content/chapter-1-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

async function main() {
  // Course (created by the chapter 0 seed in the normal flow)
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "calculus"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Calculus",
      slug: "calculus",
      description: "An intuitive, visual introduction to calculus.",
    });
  }
  await db
    .update(courses)
    .set({ status: "published" })
    .where(eq(courses.id, course.id));

  // Chapter
  const chapterTitle = "Chapter 1 · Limits: The Art of Getting Close";
  let [chapter] = await db
    .select()
    .from(chapters)
    .where(and(eq(chapters.courseId, course.id), eq(chapters.slug, "limits")))
    .limit(1);
  if (!chapter) {
    chapter = await createChapter(db, {
      courseId: course.id,
      title: chapterTitle,
      slug: "limits",
      position: 1,
    });
  } else {
    await db
      .update(chapters)
      .set({ title: chapterTitle, position: 1, updatedAt: new Date() })
      .where(eq(chapters.id, chapter.id));
  }

  for (const seed of chapter1Lessons) {
    let [lesson] = await db
      .select()
      .from(lessons)
      .where(and(eq(lessons.chapterId, chapter.id), eq(lessons.slug, seed.slug)))
      .limit(1);
    if (!lesson) {
      lesson = await createLesson(db, {
        chapterId: chapter.id,
        title: seed.title,
        slug: seed.slug,
        position: seed.position,
      });
    } else {
      await db
        .update(lessons)
        .set({ title: seed.title, position: seed.position, updatedAt: new Date() })
        .where(eq(lessons.id, lesson.id));
    }

    const draft = await saveLessonDraft(db, {
      lessonId: lesson.id,
      blocks: seed.blocks,
    });
    await publishLessonVersion(db, draft.id);
    console.log(`Published ${seed.title} (/course/calculus/limits/${seed.slug})`);
  }

  console.log("\nChapter 1 seeded. Visit /course/calculus");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
