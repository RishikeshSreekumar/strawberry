import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { trigChapter0Lessons } from "../src/modules/content/trig-chapter-0-content";
import { trigChapter1Lessons } from "../src/modules/content/trig-chapter-1-content";
import { trigChapter2Lessons } from "../src/modules/content/trig-chapter-2-content";
import { trigChapter3Lessons } from "../src/modules/content/trig-chapter-3-content";
import { trigChapter4Lessons } from "../src/modules/content/trig-chapter-4-content";
import { trigChapter5Lessons } from "../src/modules/content/trig-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `trigonometry` course. Chapters are appended here as they are
 * authored; re-running is safe — existing rows are updated in place and a
 * fresh version of every lesson is published.
 */
const chapterSeeds: {
  slug: string;
  title: string;
  position: number;
  lessons: LessonSeed[];
}[] = [
  {
    slug: "angles-and-ratios",
    title: "Chapter 0 · Angles and Ratios: Why Trigonometry Exists",
    position: 0,
    lessons: trigChapter0Lessons,
  },
  {
    slug: "the-unit-circle",
    title: "Chapter 1 \u00b7 The Unit Circle",
    position: 1,
    lessons: trigChapter1Lessons,
  },
  {
    slug: "trig-functions-as-functions",
    title: "Chapter 2 \u00b7 Trig Functions as Functions",
    position: 2,
    lessons: trigChapter2Lessons,
  },
  {
    slug: "identities",
    title: "Chapter 3 \u00b7 Identities: The Derivation Toolkit",
    position: 3,
    lessons: trigChapter3Lessons,
  },
  {
    slug: "solving-equations",
    title: "Chapter 4 \u00b7 Solving Trigonometric Equations",
    position: 4,
    lessons: trigChapter4Lessons,
  },
  {
    slug: "any-triangle",
    title: "Chapter 5 \u00b7 Any Triangle, and the Bridge to Calculus",
    position: 5,
    lessons: trigChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "trigonometry"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Trigonometry",
      slug: "trigonometry",
      description:
        "Angles, circles and waves — with every value and identity derived rather than memorized.",
    });
  }
  await db
    .update(courses)
    .set({ status: "published" })
    .where(eq(courses.id, course.id));

  for (const chapterSeed of chapterSeeds) {
    let [chapter] = await db
      .select()
      .from(chapters)
      .where(
        and(eq(chapters.courseId, course.id), eq(chapters.slug, chapterSeed.slug)),
      )
      .limit(1);
    if (!chapter) {
      chapter = await createChapter(db, {
        courseId: course.id,
        title: chapterSeed.title,
        slug: chapterSeed.slug,
        position: chapterSeed.position,
      });
    } else {
      await db
        .update(chapters)
        .set({
          title: chapterSeed.title,
          position: chapterSeed.position,
          updatedAt: new Date(),
        })
        .where(eq(chapters.id, chapter.id));
    }

    for (const seed of chapterSeed.lessons) {
      let [lesson] = await db
        .select()
        .from(lessons)
        .where(
          and(eq(lessons.chapterId, chapter.id), eq(lessons.slug, seed.slug)),
        )
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
          .set({
            title: seed.title,
            position: seed.position,
            updatedAt: new Date(),
          })
          .where(eq(lessons.id, lesson.id));
      }

      const draft = await saveLessonDraft(db, {
        lessonId: lesson.id,
        blocks: seed.blocks,
      });
      await publishLessonVersion(db, draft.id);
      console.log(
        `Published ${seed.title} (/course/trigonometry/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nTrigonometry seeded. Visit /course/trigonometry");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
