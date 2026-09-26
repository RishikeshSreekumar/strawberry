import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { probabilityChapter0Lessons } from "../src/modules/content/probability-chapter-0-content";
import { probabilityChapter1Lessons } from "../src/modules/content/probability-chapter-1-content";
import { probabilityChapter2Lessons } from "../src/modules/content/probability-chapter-2-content";
import { probabilityChapter3Lessons } from "../src/modules/content/probability-chapter-3-content";
import { probabilityChapter4Lessons } from "../src/modules/content/probability-chapter-4-content";
import { probabilityChapter5Lessons } from "../src/modules/content/probability-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `probability` course. Chapters are appended here as they are
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
    slug: "chance-experiments-and-events",
    title: "Chapter 0 · Chance, Experiments and Events",
    position: 0,
    lessons: probabilityChapter0Lessons,
  },
  {
    slug: "measuring-probability",
    title: "Chapter 1 · Measuring Probability",
    position: 1,
    lessons: probabilityChapter1Lessons,
  },
  {
    slug: "conditional-probability-and-independence",
    title: "Chapter 2 · Conditional Probability and Independence",
    position: 2,
    lessons: probabilityChapter2Lessons,
  },
  {
    slug: "total-probability-and-bayes",
    title: "Chapter 3 · Total Probability and Bayes' Theorem",
    position: 3,
    lessons: probabilityChapter3Lessons,
  },
  {
    slug: "random-variables-expectation-variance",
    title: "Chapter 4 · Random Variables, Expectation and Variance",
    position: 4,
    lessons: probabilityChapter4Lessons,
  },
  {
    slug: "bernoulli-trials-and-binomial",
    title: "Chapter 5 · Bernoulli Trials and the Binomial Distribution",
    position: 5,
    lessons: probabilityChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "probability"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Probability: from Counting Outcomes to Distributions",
      slug: "probability",
      description:
        "Probability as the measure of a sample space. The course covers experiments and events, classical and axiomatic probability, the addition and complement rules, conditional probability, independence, trees, total probability and Bayes' theorem, random variables, expectation and variance, and Bernoulli trials with the binomial distribution plus a look at the geometric and Poisson distributions. It also covers the classic paradoxes (Monty Hall, the birthday problem, base-rate neglect). Every rule is derived, not stated, and simulated before it is proved. Coverage is CBSE Class 11-12 and JEE level, taught for understanding.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Probability: from Counting Outcomes to Distributions",
      description:
        "Probability as the measure of a sample space. The course covers experiments and events, classical and axiomatic probability, the addition and complement rules, conditional probability, independence, trees, total probability and Bayes' theorem, random variables, expectation and variance, and Bernoulli trials with the binomial distribution plus a look at the geometric and Poisson distributions. It also covers the classic paradoxes (Monty Hall, the birthday problem, base-rate neglect). Every rule is derived, not stated, and simulated before it is proved. Coverage is CBSE Class 11-12 and JEE level, taught for understanding.",
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
        `Published ${seed.title} (/course/probability/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nProbability seeded. Visit /course/probability");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
