import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { vectorsChapter0Lessons } from "../src/modules/content/vectors-chapter-0-content";
import { vectorsChapter1Lessons } from "../src/modules/content/vectors-chapter-1-content";
import { vectorsChapter2Lessons } from "../src/modules/content/vectors-chapter-2-content";
import { vectorsChapter3Lessons } from "../src/modules/content/vectors-chapter-3-content";
import { vectorsChapter4Lessons } from "../src/modules/content/vectors-chapter-4-content";
import { vectorsChapter5Lessons } from "../src/modules/content/vectors-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `vector-algebra` course. Chapters are appended here as they are
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
    slug: "what-a-vector-is",
    title: "Chapter 0 · What a Vector Is",
    position: 0,
    lessons: vectorsChapter0Lessons,
  },
  {
    slug: "vectors-in-coordinates",
    title: "Chapter 1 · Vectors in Coordinates",
    position: 1,
    lessons: vectorsChapter1Lessons,
  },
  {
    slug: "section-formula-and-geometry",
    title: "Chapter 2 · Dividing Lines and Proving Geometry",
    position: 2,
    lessons: vectorsChapter2Lessons,
  },
  {
    slug: "dot-product",
    title: "Chapter 3 · The Dot Product",
    position: 3,
    lessons: vectorsChapter3Lessons,
  },
  {
    slug: "cross-product",
    title: "Chapter 4 · The Cross Product",
    position: 4,
    lessons: vectorsChapter4Lessons,
  },
  {
    slug: "triple-product-and-geometry",
    title: "Chapter 5 · The Scalar Triple Product and Vector Geometry",
    position: 5,
    lessons: vectorsChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "vector-algebra"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Vector Algebra: Arrows That Carry Direction",
      slug: "vector-algebra",
      description:
        "Vectors as arrows first and number triples second. The course covers scalars and vectors, types of vectors, triangle and parallelogram addition, scalar multiples, position vectors, the section formula, i/j/k components, magnitude, unit vectors and direction cosines. It then builds three products from their geometry: the dot product (shadow, angle, projection, work), the cross product (area, normal, torque) and the scalar triple product (volume, coplanarity). The course closes with vector proofs of classical geometry, taught to CBSE Class 12 / JEE depth.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Vector Algebra: Arrows That Carry Direction",
      description:
        "Vectors as arrows first and number triples second. The course covers scalars and vectors, types of vectors, triangle and parallelogram addition, scalar multiples, position vectors, the section formula, i/j/k components, magnitude, unit vectors and direction cosines. It then builds three products from their geometry: the dot product (shadow, angle, projection, work), the cross product (area, normal, torque) and the scalar triple product (volume, coplanarity). The course closes with vector proofs of classical geometry, taught to CBSE Class 12 / JEE depth.",
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
        `Published ${seed.title} (/course/vector-algebra/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nVector Algebra seeded. Visit /course/vector-algebra");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
