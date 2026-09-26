import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { matricesChapter0Lessons } from "../src/modules/content/matrices-chapter-0-content";
import { matricesChapter1Lessons } from "../src/modules/content/matrices-chapter-1-content";
import { matricesChapter2Lessons } from "../src/modules/content/matrices-chapter-2-content";
import { matricesChapter3Lessons } from "../src/modules/content/matrices-chapter-3-content";
import { matricesChapter4Lessons } from "../src/modules/content/matrices-chapter-4-content";
import { matricesChapter5Lessons } from "../src/modules/content/matrices-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `matrices` course. Chapters are appended here as they are
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
    slug: "matrices-grids-that-move-the-plane",
    title: "Chapter 0 · Matrices: Grids That Move the Plane",
    position: 0,
    lessons: matricesChapter0Lessons,
  },
  {
    slug: "matrix-multiplication-is-composition",
    title: "Chapter 1 · Matrix Multiplication Is Composition",
    position: 1,
    lessons: matricesChapter1Lessons,
  },
  {
    slug: "determinants-how-much-space-changes",
    title: "Chapter 2 · Determinants: How Much Space Changes",
    position: 2,
    lessons: matricesChapter2Lessons,
  },
  {
    slug: "the-inverse-undoing-a-transformation",
    title: "Chapter 3 · The Inverse: Undoing a Transformation",
    position: 3,
    lessons: matricesChapter3Lessons,
  },
  {
    slug: "solving-systems-of-linear-equations",
    title: "Chapter 4 · Solving Systems of Linear Equations",
    position: 4,
    lessons: matricesChapter4Lessons,
  },
  {
    slug: "rank-and-eigenvalues",
    title: "Chapter 5 · Rank and Eigenvalues: The Shape of a Transformation",
    position: 5,
    lessons: matricesChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "matrices"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Matrices: Grids That Move Space",
      slug: "matrices",
      description:
        "Matrices and determinants taught as both grids of numbers and transformations of the plane: columns as where the axes land, multiplication as composition, determinants as area/volume scale factors, the inverse as undo, linear systems (inverse method, Cramer, row reduction, consistency), rank, and eigenvalues as the finale. Covers CBSE Class 12 / JEE matrices and determinants, with geometric intuition first.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Matrices: Grids That Move Space",
      description:
        "Matrices and determinants taught as both grids of numbers and transformations of the plane: columns as where the axes land, multiplication as composition, determinants as area/volume scale factors, the inverse as undo, linear systems (inverse method, Cramer, row reduction, consistency), rank, and eigenvalues as the finale. Covers CBSE Class 12 / JEE matrices and determinants, with geometric intuition first.",
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
        `Published ${seed.title} (/course/matrices/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nMatrices seeded. Visit /course/matrices");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
