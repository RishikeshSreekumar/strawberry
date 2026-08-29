import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import { chapterLessons } from "../src/modules/content/chapter-0-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

async function main() {
  // Course
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

  // Chapter (reuses the bootstrap "functions" chapter if present)
  const chapterTitle = "Chapter 0 · Functions: The Language of Calculus";
  let [chapter] = await db
    .select()
    .from(chapters)
    .where(and(eq(chapters.courseId, course.id), eq(chapters.slug, "functions")))
    .limit(1);
  if (!chapter) {
    chapter = await createChapter(db, {
      courseId: course.id,
      title: chapterTitle,
      slug: "functions",
      position: 0,
    });
  } else {
    await db
      .update(chapters)
      .set({ title: chapterTitle, position: 0, updatedAt: new Date() })
      .where(eq(chapters.id, chapter.id));
  }

  for (const seed of chapterLessons) {
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
    console.log(`Published ${seed.title} (/course/calculus/functions/${seed.slug})`);
  }

  console.log("\nChapter 0 seeded. Visit /course/calculus");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
