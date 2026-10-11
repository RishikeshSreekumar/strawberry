import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { calcChapter2Lessons } from "../src/modules/content/calc-chapter-2-content";
import { calcChapter3Lessons } from "../src/modules/content/calc-chapter-3-content";
import { calcChapter4Lessons } from "../src/modules/content/calc-chapter-4-content";
import { calcChapter5Lessons } from "../src/modules/content/calc-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds Chapters 2–5 (differential calculus) into the existing `calculus`
 * course. Chapters 0 and 1 are seeded by seed-chapter-0.ts and
 * seed-chapter-1.ts and are not touched here. Re-running is safe: existing
 * rows are updated in place and a fresh version of every lesson is
 * published. The course title is left as it is; only the description is
 * refreshed to describe the full coverage.
 */
const COURSE_SLUG = "calculus";

const DESCRIPTION =
  "An intuitive, visual course in differential calculus, taught to JEE Main and Advanced depth. It starts with functions and limits, then proves the standard limits (trigonometric, exponential, logarithmic, power and the 1^∞ form, with series intuition) and defines the derivative as a slope and a rate, with differentiability versus continuity. The toolbox chapter covers the product, quotient and chain rules, inverse trigonometric functions, implicit, logarithmic and parametric differentiation, higher-order derivatives, differentiability of special functions and L'Hôpital's rule. The course closes with applications: related rates, tangents and normals, angles between curves, monotonicity, Rolle's and the mean value theorems, approximations and errors, maxima and minima, optimisation, concavity and inflection, curve sketching and proving inequalities.";

const chapterSeeds: {
  slug: string;
  title: string;
  position: number;
  lessons: LessonSeed[];
}[] = [
  {
    slug: "standard-limits-and-the-derivative",
    title: "Chapter 2 · Standard Limits and the Derivative",
    position: 2,
    lessons: calcChapter2Lessons,
  },
  {
    slug: "differentiation-techniques",
    title: "Chapter 3 · Differentiation Techniques",
    position: 3,
    lessons: calcChapter3Lessons,
  },
  {
    slug: "applications-of-derivatives",
    title: "Chapter 4 · Applications of Derivatives",
    position: 4,
    lessons: calcChapter4Lessons,
  },
  {
    slug: "maxima-minima-and-curve-sketching",
    title: "Chapter 5 · Maxima, Minima and Curve Sketching",
    position: 5,
    lessons: calcChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, COURSE_SLUG))
    .limit(1);
  if (!course) {
    // Normally created by seed-chapter-0.ts; keep its title if so.
    course = await createCourse(db, {
      title: "Calculus",
      slug: COURSE_SLUG,
      description: DESCRIPTION,
    });
  }
  await db
    .update(courses)
    .set({ description: DESCRIPTION, status: "published", updatedAt: new Date() })
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
        `Published ${seed.title} (/course/${COURSE_SLUG}/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log(`\nCalculus chapters 2–5 seeded. Visit /course/${COURSE_SLUG}`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
