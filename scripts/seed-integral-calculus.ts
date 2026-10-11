import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { integChapter0Lessons } from "../src/modules/content/integ-chapter-0-content";
import { integChapter1Lessons } from "../src/modules/content/integ-chapter-1-content";
import { integChapter2Lessons } from "../src/modules/content/integ-chapter-2-content";
import { integChapter3Lessons } from "../src/modules/content/integ-chapter-3-content";
import { integChapter4Lessons } from "../src/modules/content/integ-chapter-4-content";
import { integChapter5Lessons } from "../src/modules/content/integ-chapter-5-content";
import { integChapter6Lessons } from "../src/modules/content/integ-chapter-6-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `integral-calculus` course. Chapters are appended here as they are
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
    slug: "antiderivatives",
    title: "Chapter 0 · Antiderivatives",
    position: 0,
    lessons: integChapter0Lessons,
  },
  {
    slug: "integration-by-substitution",
    title: "Chapter 1 · Integration by Substitution",
    position: 1,
    lessons: integChapter1Lessons,
  },
  {
    slug: "parts-and-partial-fractions",
    title: "Chapter 2 · Integration by Parts and Partial Fractions",
    position: 2,
    lessons: integChapter2Lessons,
  },
  {
    slug: "the-definite-integral",
    title: "Chapter 3 · The Definite Integral",
    position: 3,
    lessons: integChapter3Lessons,
  },
  {
    slug: "properties-of-definite-integrals",
    title: "Chapter 4 · Properties of Definite Integrals",
    position: 4,
    lessons: integChapter4Lessons,
  },
  {
    slug: "area-under-and-between-curves",
    title: "Chapter 5 · Area Under and Between Curves",
    position: 5,
    lessons: integChapter5Lessons,
  },
  {
    slug: "differential-equations",
    title: "Chapter 6 · Differential Equations",
    position: 6,
    lessons: integChapter6Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "integral-calculus"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Integral Calculus and Differential Equations: Accumulating Change",
      slug: "integral-calculus",
      description:
        "Integration as accumulation, from antiderivatives to differential equations, taught to CBSE Class 12 / JEE Main and Advanced depth. The course reads the derivative table backwards (standard integrals, linearity, trig rewriting, initial value problems), then builds the JEE toolkit: substitution, trig powers and trig substitutions, the standard forms and completing the square, the t = tan(x/2) substitution, integration by parts (ILATE, cyclic integrals, the e^x(f + f′) pattern), partial fractions and reduction formulae. The definite integral arrives as a limit of Riemann sums (including limits of sums evaluated as integrals), followed by the Fundamental Theorem, the Leibniz rule, King's rule, even/odd and periodic properties, modulus and greatest-integer integrands, bounds and Wallis' formula. Areas under and between curves (vertical and horizontal strips, conics, modulus regions, parameters) lead into differential equations: order and degree, formation, variables separable, homogeneous, linear and Bernoulli equations, and applications to growth, cooling, mixing and curves.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Integral Calculus and Differential Equations: Accumulating Change",
      description:
        "Integration as accumulation, from antiderivatives to differential equations, taught to CBSE Class 12 / JEE Main and Advanced depth. The course reads the derivative table backwards (standard integrals, linearity, trig rewriting, initial value problems), then builds the JEE toolkit: substitution, trig powers and trig substitutions, the standard forms and completing the square, the t = tan(x/2) substitution, integration by parts (ILATE, cyclic integrals, the e^x(f + f′) pattern), partial fractions and reduction formulae. The definite integral arrives as a limit of Riemann sums (including limits of sums evaluated as integrals), followed by the Fundamental Theorem, the Leibniz rule, King's rule, even/odd and periodic properties, modulus and greatest-integer integrands, bounds and Wallis' formula. Areas under and between curves (vertical and horizontal strips, conics, modulus regions, parameters) lead into differential equations: order and degree, formation, variables separable, homogeneous, linear and Bernoulli equations, and applications to growth, cooling, mixing and curves.",
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
        `Published ${seed.title} (/course/integral-calculus/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nIntegral Calculus seeded. Visit /course/integral-calculus");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
