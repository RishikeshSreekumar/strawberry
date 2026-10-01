import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { ompChapter0Lessons } from "../src/modules/content/omp-chapter-0-content";
import { ompChapter1Lessons } from "../src/modules/content/omp-chapter-1-content";
import { ompChapter2Lessons } from "../src/modules/content/omp-chapter-2-content";
import { ompChapter3Lessons } from "../src/modules/content/omp-chapter-3-content";
import { ompChapter4Lessons } from "../src/modules/content/omp-chapter-4-content";
import { ompChapter5Lessons } from "../src/modules/content/omp-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `optics-and-modern-physics` course. Chapters are appended here as they are
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
    slug: "reflection-and-refraction",
    title: "Chapter 0 · Reflection and Refraction",
    position: 0,
    lessons: ompChapter0Lessons,
  },
  {
    slug: "lenses-prisms-and-instruments",
    title: "Chapter 1 · Lenses, Prisms and Optical Instruments",
    position: 1,
    lessons: ompChapter1Lessons,
  },
  {
    slug: "wave-optics",
    title: "Chapter 2 · Wave Optics",
    position: 2,
    lessons: ompChapter2Lessons,
  },
  {
    slug: "dual-nature-of-radiation-and-matter",
    title: "Chapter 3 · Dual Nature of Radiation and Matter",
    position: 3,
    lessons: ompChapter3Lessons,
  },
  {
    slug: "atoms-and-nuclei",
    title: "Chapter 4 · Atoms and Nuclei",
    position: 4,
    lessons: ompChapter4Lessons,
  },
  {
    slug: "semiconductor-electronics",
    title: "Chapter 5 · Semiconductor Electronics",
    position: 5,
    lessons: ompChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "optics-and-modern-physics"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Optics and Modern Physics: Rays, Waves and Quanta",
      slug: "optics-and-modern-physics",
      description:
        "Mirrors, refraction, total internal reflection, lenses, prisms and optical instruments; wave optics with Young's double slit, diffraction, resolving power and polarisation; the photoelectric effect and matter waves; Bohr's atom, spectra, nuclear binding energy and radioactivity; and semiconductor electronics, from p-n junctions and rectifiers to transistors and logic gates. Taught to CBSE Class 12 / JEE Main and Advanced depth.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Optics and Modern Physics: Rays, Waves and Quanta",
      description:
        "Mirrors, refraction, total internal reflection, lenses, prisms and optical instruments; wave optics with Young's double slit, diffraction, resolving power and polarisation; the photoelectric effect and matter waves; Bohr's atom, spectra, nuclear binding energy and radioactivity; and semiconductor electronics, from p-n junctions and rectifiers to transistors and logic gates. Taught to CBSE Class 12 / JEE Main and Advanced depth.",
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
        `Published ${seed.title} (/course/optics-and-modern-physics/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nOptics and Modern Physics seeded. Visit /course/optics-and-modern-physics");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
