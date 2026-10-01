import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { emChapter0Lessons } from "../src/modules/content/em-chapter-0-content";
import { emChapter1Lessons } from "../src/modules/content/em-chapter-1-content";
import { emChapter2Lessons } from "../src/modules/content/em-chapter-2-content";
import { emChapter3Lessons } from "../src/modules/content/em-chapter-3-content";
import { emChapter4Lessons } from "../src/modules/content/em-chapter-4-content";
import { emChapter5Lessons } from "../src/modules/content/em-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `electricity-and-magnetism` course. Chapters are appended here as they are
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
    slug: "electric-charge-and-field",
    title: "Chapter 0 · Electric Charge and Field",
    position: 0,
    lessons: emChapter0Lessons,
  },
  {
    slug: "gauss-law-and-potential",
    title: "Chapter 1 · Gauss's Law and Electric Potential",
    position: 1,
    lessons: emChapter1Lessons,
  },
  {
    slug: "capacitors",
    title: "Chapter 2 · Capacitors",
    position: 2,
    lessons: emChapter2Lessons,
  },
  {
    slug: "current-electricity",
    title: "Chapter 3 · Current Electricity",
    position: 3,
    lessons: emChapter3Lessons,
  },
  {
    slug: "magnetic-effects-of-current",
    title: "Chapter 4 · Magnetic Effects of Current",
    position: 4,
    lessons: emChapter4Lessons,
  },
  {
    slug: "induction-and-ac",
    title: "Chapter 5 · Electromagnetic Induction and AC",
    position: 5,
    lessons: emChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "electricity-and-magnetism"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Electricity and Magnetism: Fields That Push, Store and Induce",
      slug: "electricity-and-magnetism",
      description:
        "Coulomb's law, electric fields and dipoles; Gauss's law, potential and conductors; capacitors, dielectrics and stored energy; current electricity with Kirchhoff's laws, bridges and the potentiometer; magnetic forces, Biot-Savart and Ampère's laws, loops and galvanometers; and electromagnetic induction, inductors, AC phasors, LCR resonance, transformers and EM waves. Taught to CBSE Class 12 / JEE Main and Advanced depth.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Electricity and Magnetism: Fields That Push, Store and Induce",
      description:
        "Coulomb's law, electric fields and dipoles; Gauss's law, potential and conductors; capacitors, dielectrics and stored energy; current electricity with Kirchhoff's laws, bridges and the potentiometer; magnetic forces, Biot-Savart and Ampère's laws, loops and galvanometers; and electromagnetic induction, inductors, AC phasors, LCR resonance, transformers and EM waves. Taught to CBSE Class 12 / JEE Main and Advanced depth.",
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
        `Published ${seed.title} (/course/electricity-and-magnetism/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nElectricity and Magnetism seeded. Visit /course/electricity-and-magnetism");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
