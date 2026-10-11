import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { seqChapter0Lessons } from "../src/modules/content/seq-chapter-0-content";
import { seqChapter1Lessons } from "../src/modules/content/seq-chapter-1-content";
import { seqChapter2Lessons } from "../src/modules/content/seq-chapter-2-content";
import { seqChapter3Lessons } from "../src/modules/content/seq-chapter-3-content";
import { seqChapter4Lessons } from "../src/modules/content/seq-chapter-4-content";
import { seqChapter5Lessons } from "../src/modules/content/seq-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `sequences-series` course. Chapters are appended here as they are
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
    slug: "sequences-and-notation",
    title: "Chapter 0 · Sequences and Notation",
    position: 0,
    lessons: seqChapter0Lessons,
  },
  {
    slug: "arithmetic-progressions",
    title: "Chapter 1 · Arithmetic Progressions",
    position: 1,
    lessons: seqChapter1Lessons,
  },
  {
    slug: "geometric-progressions",
    title: "Chapter 2 · Geometric Progressions",
    position: 2,
    lessons: seqChapter2Lessons,
  },
  {
    slug: "harmonic-progressions-and-means",
    title: "Chapter 3 · Harmonic Progressions and Means",
    position: 3,
    lessons: seqChapter3Lessons,
  },
  {
    slug: "special-series",
    title: "Chapter 4 · Special Series",
    position: 4,
    lessons: seqChapter4Lessons,
  },
  {
    slug: "mixed-series-and-induction",
    title: "Chapter 5 · Mixed Series and Mathematical Induction",
    position: 5,
    lessons: seqChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "sequences-series"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Sequences and Series: Patterns That Add Up",
      slug: "sequences-series",
      description:
        "Sequences and series from first principles to JEE Main and Advanced depth. Sequences as functions on the natural numbers, general terms, recursive definitions and the Fibonacci sequence, series, sigma notation and its algebra, finite and infinite sums. Arithmetic progressions: n-th term, the sum by Gauss pairing, properties, symmetric choices of terms and arithmetic means. Geometric progressions: n-th term, sum of n terms, infinite GPs and convergence, recurring decimals, geometric means, mixed AP-GP problems and compound growth. Harmonic progressions and the three means: AM, GM and HM, G squared = AH, the AM-GM-HM inequality with proof and equality, AM-GM for maxima and minima, weighted means and JEE inequalities. Special series: sums of k, k squared and k cubed, sums of products, arithmetico-geometric progressions, telescoping with partial fractions, the method of differences and the Vn method. Mixed series with a given n-th term, binomial and reciprocal series, and mathematical induction for sums, divisibility and inequalities, closing with PYQ-style mixed problems.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Sequences and Series: Patterns That Add Up",
      description:
        "Sequences and series from first principles to JEE Main and Advanced depth. Sequences as functions on the natural numbers, general terms, recursive definitions and the Fibonacci sequence, series, sigma notation and its algebra, finite and infinite sums. Arithmetic progressions: n-th term, the sum by Gauss pairing, properties, symmetric choices of terms and arithmetic means. Geometric progressions: n-th term, sum of n terms, infinite GPs and convergence, recurring decimals, geometric means, mixed AP-GP problems and compound growth. Harmonic progressions and the three means: AM, GM and HM, G squared = AH, the AM-GM-HM inequality with proof and equality, AM-GM for maxima and minima, weighted means and JEE inequalities. Special series: sums of k, k squared and k cubed, sums of products, arithmetico-geometric progressions, telescoping with partial fractions, the method of differences and the Vn method. Mixed series with a given n-th term, binomial and reciprocal series, and mathematical induction for sums, divisibility and inequalities, closing with PYQ-style mixed problems.",
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
        `Published ${seed.title} (/course/sequences-series/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nSequences and Series seeded. Visit /course/sequences-series");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
