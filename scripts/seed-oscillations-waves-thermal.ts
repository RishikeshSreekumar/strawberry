import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { owtChapter0Lessons } from "../src/modules/content/owt-chapter-0-content";
import { owtChapter1Lessons } from "../src/modules/content/owt-chapter-1-content";
import { owtChapter2Lessons } from "../src/modules/content/owt-chapter-2-content";
import { owtChapter3Lessons } from "../src/modules/content/owt-chapter-3-content";
import { owtChapter4Lessons } from "../src/modules/content/owt-chapter-4-content";
import { owtChapter5Lessons } from "../src/modules/content/owt-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `oscillations-waves-thermal` course. Chapters are appended here as they are
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
    slug: "simple-harmonic-motion",
    title: "Chapter 0 · Simple Harmonic Motion",
    position: 0,
    lessons: owtChapter0Lessons,
  },
  {
    slug: "waves-on-a-string",
    title: "Chapter 1 · Waves on a String",
    position: 1,
    lessons: owtChapter1Lessons,
  },
  {
    slug: "sound-waves",
    title: "Chapter 2 · Sound Waves",
    position: 2,
    lessons: owtChapter2Lessons,
  },
  {
    slug: "properties-of-matter",
    title: "Chapter 3 · Properties of Matter",
    position: 3,
    lessons: owtChapter3Lessons,
  },
  {
    slug: "heat-and-kinetic-theory",
    title: "Chapter 4 · Heat and Kinetic Theory",
    position: 4,
    lessons: owtChapter4Lessons,
  },
  {
    slug: "thermodynamics",
    title: "Chapter 5 · Thermodynamics",
    position: 5,
    lessons: owtChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "oscillations-waves-thermal"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Oscillations, Waves and Thermal Physics",
      slug: "oscillations-waves-thermal",
      description:
        "Simple harmonic motion, springs and pendulums; waves on strings, superposition and standing waves; sound, organ pipes, beats and the Doppler effect; elasticity, fluids, Bernoulli, viscosity and surface tension; heat, calorimetry, heat transfer and the kinetic theory of gases; and thermodynamics, from the first law and p-V diagrams to engines and the Carnot limit. Taught to CBSE Class 11 / JEE Main and Advanced depth.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Oscillations, Waves and Thermal Physics",
      description:
        "Simple harmonic motion, springs and pendulums; waves on strings, superposition and standing waves; sound, organ pipes, beats and the Doppler effect; elasticity, fluids, Bernoulli, viscosity and surface tension; heat, calorimetry, heat transfer and the kinetic theory of gases; and thermodynamics, from the first law and p-V diagrams to engines and the Carnot limit. Taught to CBSE Class 11 / JEE Main and Advanced depth.",
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
        `Published ${seed.title} (/course/oscillations-waves-thermal/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nOscillations, Waves and Thermal Physics seeded. Visit /course/oscillations-waves-thermal");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
