import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { pncChapter0Lessons } from "../src/modules/content/pnc-chapter-0-content";
import { pncChapter1Lessons } from "../src/modules/content/pnc-chapter-1-content";
import { pncChapter2Lessons } from "../src/modules/content/pnc-chapter-2-content";
import { pncChapter3Lessons } from "../src/modules/content/pnc-chapter-3-content";
import { pncChapter4Lessons } from "../src/modules/content/pnc-chapter-4-content";
import { pncChapter5Lessons } from "../src/modules/content/pnc-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `permutations-combinations-binomial` course. Chapters are appended here as they are
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
    slug: "counting-from-first-principles",
    title: "Chapter 0 · Counting from First Principles",
    position: 0,
    lessons: pncChapter0Lessons,
  },
  {
    slug: "permutations",
    title: "Chapter 1 · Permutations: Arranging Things",
    position: 1,
    lessons: pncChapter1Lessons,
  },
  {
    slug: "combinations",
    title: "Chapter 2 · Combinations: Choosing Things",
    position: 2,
    lessons: pncChapter2Lessons,
  },
  {
    slug: "distributions-and-advanced-counting",
    title: "Chapter 3 · Distributions and Advanced Counting",
    position: 3,
    lessons: pncChapter3Lessons,
  },
  {
    slug: "pascal-and-the-binomial-theorem",
    title: "Chapter 4 · Pascal's Triangle and the Binomial Theorem",
    position: 4,
    lessons: pncChapter4Lessons,
  },
  {
    slug: "binomial-coefficients-at-work",
    title: "Chapter 5 · Binomial Coefficients at Work",
    position: 5,
    lessons: pncChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "permutations-combinations-binomial"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Permutations, Combinations & the Binomial Theorem",
      slug: "permutations-combinations-binomial",
      description:
        "Counting from first principles: the product and sum rules, then every arrangement and selection formula derived from slots plus one correction (divide out what you can't tell apart), distributions and stars and bars, and finally the binomial theorem read as a counting statement, with coefficient sums, divisibility and approximations. CBSE Class 11 / JEE coverage, taught for understanding.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Permutations, Combinations & the Binomial Theorem",
      description:
        "Counting from first principles: the product and sum rules, then every arrangement and selection formula derived from slots plus one correction (divide out what you can't tell apart), distributions and stars and bars, and finally the binomial theorem read as a counting statement, with coefficient sums, divisibility and approximations. CBSE Class 11 / JEE coverage, taught for understanding.",
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
        `Published ${seed.title} (/course/permutations-combinations-binomial/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nPermutations, Combinations & the Binomial Theorem seeded. Visit /course/permutations-combinations-binomial");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
