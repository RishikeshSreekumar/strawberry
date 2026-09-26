import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { statisticsChapter0Lessons } from "../src/modules/content/statistics-chapter-0-content";
import { statisticsChapter1Lessons } from "../src/modules/content/statistics-chapter-1-content";
import { statisticsChapter2Lessons } from "../src/modules/content/statistics-chapter-2-content";
import { statisticsChapter3Lessons } from "../src/modules/content/statistics-chapter-3-content";
import { statisticsChapter4Lessons } from "../src/modules/content/statistics-chapter-4-content";
import { statisticsChapter5Lessons } from "../src/modules/content/statistics-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `statistics` course. Chapters are appended here as they are
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
    slug: "data-and-its-pictures",
    title: "Chapter 0 · Data and Its Pictures",
    position: 0,
    lessons: statisticsChapter0Lessons,
  },
  {
    slug: "measures-of-centre",
    title: "Chapter 1 · Measures of Centre",
    position: 1,
    lessons: statisticsChapter1Lessons,
  },
  {
    slug: "measures-of-spread",
    title: "Chapter 2 · Measures of Spread",
    position: 2,
    lessons: statisticsChapter2Lessons,
  },
  {
    slug: "shape-position-and-comparison",
    title: "Chapter 3 · Shape, Position and Comparison",
    position: 3,
    lessons: statisticsChapter3Lessons,
  },
  {
    slug: "correlation-and-regression",
    title: "Chapter 4 · Two Variables: Correlation and Regression",
    position: 4,
    lessons: statisticsChapter4Lessons,
  },
  {
    slug: "normal-distribution-and-estimation",
    title: "Chapter 5 · The Normal Distribution and Estimation",
    position: 5,
    lessons: statisticsChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "statistics"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Statistics: Seeing Patterns in Variation",
      slug: "statistics",
      description:
        "Statistics as the study of variation: picture a data set, summarise it with a centre and a spread you can derive rather than memorise, describe shape and compare groups, measure how two variables move together and fit the least-squares line, then use the normal distribution and sampling distributions to estimate a population mean. Covers CBSE Class 11-12 / JEE statistics (grouped mean, median, mode, mean deviation, variance, SD, CV, correlation, regression) and goes on to z-scores, the normal curve and confidence intervals.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Statistics: Seeing Patterns in Variation",
      description:
        "Statistics as the study of variation: picture a data set, summarise it with a centre and a spread you can derive rather than memorise, describe shape and compare groups, measure how two variables move together and fit the least-squares line, then use the normal distribution and sampling distributions to estimate a population mean. Covers CBSE Class 11-12 / JEE statistics (grouped mean, median, mode, mean deviation, variance, SD, CV, correlation, regression) and goes on to z-scores, the normal curve and confidence intervals.",
      status: "published",
      updatedAt: new Date(),
    })
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
        `Published ${seed.title} (/course/statistics/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nStatistics seeded. Visit /course/statistics");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
