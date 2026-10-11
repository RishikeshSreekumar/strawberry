import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { cqChapter0Lessons } from "../src/modules/content/cq-chapter-0-content";
import { cqChapter1Lessons } from "../src/modules/content/cq-chapter-1-content";
import { cqChapter2Lessons } from "../src/modules/content/cq-chapter-2-content";
import { cqChapter3Lessons } from "../src/modules/content/cq-chapter-3-content";
import { cqChapter4Lessons } from "../src/modules/content/cq-chapter-4-content";
import { cqChapter5Lessons } from "../src/modules/content/cq-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `complex-numbers-quadratics` course. Re-running is safe:
 * existing rows are updated in place and a fresh version of every lesson
 * is published.
 */
const COURSE_SLUG = "complex-numbers-quadratics";
const COURSE_TITLE = "Complex Numbers and Quadratic Equations: Roots, Rotations and the Plane";
const COURSE_DESCRIPTION =
  "Quadratic equations and complex numbers as one story, taught to full JEE Main and Advanced depth. The course derives the quadratic formula by completing the square, reads the nature of roots from the discriminant, and builds Vieta's relations, symmetric functions and transformations of roots. It then uses the parabola to settle the sign of a quadratic, its maximum and minimum, the location of roots relative to given numbers, common roots, quadratic and rational inequalities (the wavy-curve method), modulus and logarithmic equations, and Vieta for cubics and quartics. The second half introduces i, the algebra, conjugate and modulus of a + ib, and square roots of complex numbers. It places complex numbers on the Argand plane with argument, polar and Euler forms, multiplication as scale-and-rotate, and the triangle inequality. De Moivre's theorem leads to n-th roots, the cube roots of unity and the regular polygon of roots of unity. The course closes with geometry in the complex plane: section formula, lines, circles, loci, the rotation theorem and maximum and minimum of the modulus.";

const chapterSeeds: {
  slug: string;
  title: string;
  position: number;
  lessons: LessonSeed[];
}[] = [
  {
    slug: "quadratic-equations",
    title: "Chapter 0 · Quadratic Equations",
    position: 0,
    lessons: cqChapter0Lessons,
  },
  {
    slug: "quadratic-expressions-and-inequalities",
    title: "Chapter 1 · Quadratic Expressions, Location of Roots and Inequalities",
    position: 1,
    lessons: cqChapter1Lessons,
  },
  {
    slug: "complex-numbers-as-numbers",
    title: "Chapter 2 · Complex Numbers as Numbers",
    position: 2,
    lessons: cqChapter2Lessons,
  },
  {
    slug: "argand-plane-and-polar-form",
    title: "Chapter 3 · The Argand Plane and Polar Form",
    position: 3,
    lessons: cqChapter3Lessons,
  },
  {
    slug: "de-moivre-and-roots-of-unity",
    title: "Chapter 4 · De Moivre's Theorem and Roots of Unity",
    position: 4,
    lessons: cqChapter4Lessons,
  },
  {
    slug: "geometry-with-complex-numbers",
    title: "Chapter 5 · Geometry with Complex Numbers",
    position: 5,
    lessons: cqChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, COURSE_SLUG))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: COURSE_TITLE,
      slug: COURSE_SLUG,
      description: COURSE_DESCRIPTION,
    });
  }
  await db
    .update(courses)
    .set({
      title: COURSE_TITLE,
      description: COURSE_DESCRIPTION,
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
        `Published ${seed.title} (/course/${COURSE_SLUG}/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log(`\nComplex Numbers and Quadratic Equations seeded. Visit /course/${COURSE_SLUG}`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
