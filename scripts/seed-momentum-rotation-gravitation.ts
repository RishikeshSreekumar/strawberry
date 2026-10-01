import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { mrgChapter0Lessons } from "../src/modules/content/mrg-chapter-0-content";
import { mrgChapter1Lessons } from "../src/modules/content/mrg-chapter-1-content";
import { mrgChapter2Lessons } from "../src/modules/content/mrg-chapter-2-content";
import { mrgChapter3Lessons } from "../src/modules/content/mrg-chapter-3-content";
import { mrgChapter4Lessons } from "../src/modules/content/mrg-chapter-4-content";
import { mrgChapter5Lessons } from "../src/modules/content/mrg-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `momentum-rotation-gravitation` course. Chapters are appended here as they are
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
    slug: "centre-of-mass",
    title: "Chapter 0 · Centre of Mass",
    position: 0,
    lessons: mrgChapter0Lessons,
  },
  {
    slug: "momentum-impulse-collisions",
    title: "Chapter 1 · Momentum, Impulse and Collisions",
    position: 1,
    lessons: mrgChapter1Lessons,
  },
  {
    slug: "rotational-kinematics-moment-of-inertia",
    title: "Chapter 2 · Rotational Kinematics and Moment of Inertia",
    position: 2,
    lessons: mrgChapter2Lessons,
  },
  {
    slug: "torque-rotational-dynamics",
    title: "Chapter 3 · Torque and Rotational Dynamics",
    position: 3,
    lessons: mrgChapter3Lessons,
  },
  {
    slug: "angular-momentum-rolling",
    title: "Chapter 4 · Angular Momentum and Rolling",
    position: 4,
    lessons: mrgChapter4Lessons,
  },
  {
    slug: "gravitation",
    title: "Chapter 5 · Gravitation",
    position: 5,
    lessons: mrgChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "momentum-rotation-gravitation"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Mechanics II: Momentum, Rotation and Gravitation",
      slug: "momentum-rotation-gravitation",
      description:
        "Systems and rigid bodies for JEE. Centre of mass of particles and continuous bodies; momentum, impulse, rockets and collisions with restitution; rotational kinematics and moment of inertia with the parallel and perpendicular axis theorems; torque, equilibrium and rotational energy; angular momentum and rolling; and gravitation, from the variation of g to orbits, escape speed and Kepler's laws. Taught to CBSE Class 11 / JEE Main and Advanced depth.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Mechanics II: Momentum, Rotation and Gravitation",
      description:
        "Systems and rigid bodies for JEE. Centre of mass of particles and continuous bodies; momentum, impulse, rockets and collisions with restitution; rotational kinematics and moment of inertia with the parallel and perpendicular axis theorems; torque, equilibrium and rotational energy; angular momentum and rolling; and gravitation, from the variation of g to orbits, escape speed and Kepler's laws. Taught to CBSE Class 11 / JEE Main and Advanced depth.",
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
        `Published ${seed.title} (/course/momentum-rotation-gravitation/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nMechanics II seeded. Visit /course/momentum-rotation-gravitation");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
