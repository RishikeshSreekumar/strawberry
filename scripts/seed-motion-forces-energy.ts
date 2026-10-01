import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { mfeChapter0Lessons } from "../src/modules/content/mfe-chapter-0-content";
import { mfeChapter1Lessons } from "../src/modules/content/mfe-chapter-1-content";
import { mfeChapter2Lessons } from "../src/modules/content/mfe-chapter-2-content";
import { mfeChapter3Lessons } from "../src/modules/content/mfe-chapter-3-content";
import { mfeChapter4Lessons } from "../src/modules/content/mfe-chapter-4-content";
import { mfeChapter5Lessons } from "../src/modules/content/mfe-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `motion-forces-energy` course. Chapters are appended here as they are
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
    slug: "units-dimensions-measurement",
    title: "Chapter 0 · Units, Dimensions and Measurement",
    position: 0,
    lessons: mfeChapter0Lessons,
  },
  {
    slug: "motion-in-a-straight-line",
    title: "Chapter 1 · Motion in a Straight Line",
    position: 1,
    lessons: mfeChapter1Lessons,
  },
  {
    slug: "motion-in-a-plane",
    title: "Chapter 2 · Motion in a Plane",
    position: 2,
    lessons: mfeChapter2Lessons,
  },
  {
    slug: "newtons-laws-of-motion",
    title: "Chapter 3 · Newton's Laws of Motion",
    position: 3,
    lessons: mfeChapter3Lessons,
  },
  {
    slug: "friction-and-circular-dynamics",
    title: "Chapter 4 · Friction and Circular Dynamics",
    position: 4,
    lessons: mfeChapter4Lessons,
  },
  {
    slug: "work-energy-and-power",
    title: "Chapter 5 · Work, Energy and Power",
    position: 5,
    lessons: mfeChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "motion-forces-energy"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Mechanics I: Motion, Forces and Energy",
      slug: "motion-forces-energy",
      description:
        "JEE mechanics from the ground up. Units, dimensions and errors; motion in a straight line with x-t and v-t graphs and the calculus of kinematics; projectiles, relative velocity and circular motion; Newton's laws with free-body diagrams, pulleys, constraints and pseudo forces; friction, banking and the vertical circle; and work, energy and power, from variable forces to potential-energy curves. Every result is derived from Newton's laws, taught to CBSE Class 11 / JEE Main and Advanced depth.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Mechanics I: Motion, Forces and Energy",
      description:
        "JEE mechanics from the ground up. Units, dimensions and errors; motion in a straight line with x-t and v-t graphs and the calculus of kinematics; projectiles, relative velocity and circular motion; Newton's laws with free-body diagrams, pulleys, constraints and pseudo forces; friction, banking and the vertical circle; and work, energy and power, from variable forces to potential-energy curves. Every result is derived from Newton's laws, taught to CBSE Class 11 / JEE Main and Advanced depth.",
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
        `Published ${seed.title} (/course/motion-forces-energy/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nMechanics I seeded. Visit /course/motion-forces-energy");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
