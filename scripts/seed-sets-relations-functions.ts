import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { srfChapter0Lessons } from "../src/modules/content/srf-chapter-0-content";
import { srfChapter1Lessons } from "../src/modules/content/srf-chapter-1-content";
import { srfChapter2Lessons } from "../src/modules/content/srf-chapter-2-content";
import { srfChapter3Lessons } from "../src/modules/content/srf-chapter-3-content";
import { srfChapter4Lessons } from "../src/modules/content/srf-chapter-4-content";
import { srfChapter5Lessons } from "../src/modules/content/srf-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `sets-relations-functions` course. Chapters are appended here as they are
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
    slug: "sets",
    title: "Chapter 0 · Sets and Their Language",
    position: 0,
    lessons: srfChapter0Lessons,
  },
  {
    slug: "set-operations-and-counting",
    title: "Chapter 1 · Set Operations and Counting",
    position: 1,
    lessons: srfChapter1Lessons,
  },
  {
    slug: "relations",
    title: "Chapter 2 · Relations",
    position: 2,
    lessons: srfChapter2Lessons,
  },
  {
    slug: "functions",
    title: "Chapter 3 · Functions",
    position: 3,
    lessons: srfChapter3Lessons,
  },
  {
    slug: "composition-inverse-and-special-properties",
    title: "Chapter 4 · Composition, Inverses and Special Properties",
    position: 4,
    lessons: srfChapter4Lessons,
  },
  {
    slug: "inverse-trigonometric-functions",
    title: "Chapter 5 · Inverse Trigonometric Functions",
    position: 5,
    lessons: srfChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "sets-relations-functions"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Sets, Relations and Functions: The Grammar of Mathematics",
      slug: "sets-relations-functions",
      description:
        "The language every JEE chapter is written in, taught to JEE Main and Advanced depth. Sets: roster and set-builder form, empty, finite, equal and equivalent sets, subsets, power sets and intervals. Set operations: union, intersection, difference, symmetric difference, complement, De Morgan and distributive laws, and counting with inclusion-exclusion for two and three sets, including survey problems and bounds. Relations: Cartesian products, reflexive, symmetric, antisymmetric and transitive relations, equivalence relations and classes, and counting relations with given properties. Functions: domains and ranges of JEE-style expressions, the special real functions (modulus, signum, greatest integer, fractional part, exponential, logarithm), one-one, onto and bijective functions, and counting functions and surjections. Then composition, inverses, even and odd functions, periodic functions, graph transformations with modulus and greatest integer, functional equations, and the full theory of inverse trigonometric functions: principal branches, sawtooth compositions, identities with their exact ranges of validity, substitution and inverse-trig equations.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Sets, Relations and Functions: The Grammar of Mathematics",
      description:
        "The language every JEE chapter is written in, taught to JEE Main and Advanced depth. Sets: roster and set-builder form, empty, finite, equal and equivalent sets, subsets, power sets and intervals. Set operations: union, intersection, difference, symmetric difference, complement, De Morgan and distributive laws, and counting with inclusion-exclusion for two and three sets, including survey problems and bounds. Relations: Cartesian products, reflexive, symmetric, antisymmetric and transitive relations, equivalence relations and classes, and counting relations with given properties. Functions: domains and ranges of JEE-style expressions, the special real functions (modulus, signum, greatest integer, fractional part, exponential, logarithm), one-one, onto and bijective functions, and counting functions and surjections. Then composition, inverses, even and odd functions, periodic functions, graph transformations with modulus and greatest integer, functional equations, and the full theory of inverse trigonometric functions: principal branches, sawtooth compositions, identities with their exact ranges of validity, substitution and inverse-trig equations.",
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
        `Published ${seed.title} (/course/sets-relations-functions/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nSets, Relations and Functions seeded. Visit /course/sets-relations-functions");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
