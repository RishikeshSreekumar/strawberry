import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { conChapter0Lessons } from "../src/modules/content/con-chapter-0-content";
import { conChapter1Lessons } from "../src/modules/content/con-chapter-1-content";
import { conChapter2Lessons } from "../src/modules/content/con-chapter-2-content";
import { conChapter3Lessons } from "../src/modules/content/con-chapter-3-content";
import { conChapter4Lessons } from "../src/modules/content/con-chapter-4-content";
import { conChapter5Lessons } from "../src/modules/content/con-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `conic-sections` course. Chapters are appended here as they are
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
    slug: "slicing-the-cone",
    title: "Chapter 0 · Slicing the Cone",
    position: 0,
    lessons: conChapter0Lessons,
  },
  {
    slug: "the-parabola",
    title: "Chapter 1 · The Parabola",
    position: 1,
    lessons: conChapter1Lessons,
  },
  {
    slug: "parabola-tangents-normals-chords",
    title: "Chapter 2 · Parabola: Tangents, Normals and Chords",
    position: 2,
    lessons: conChapter2Lessons,
  },
  {
    slug: "the-ellipse",
    title: "Chapter 3 · The Ellipse",
    position: 3,
    lessons: conChapter3Lessons,
  },
  {
    slug: "the-hyperbola",
    title: "Chapter 4 · The Hyperbola",
    position: 4,
    lessons: conChapter4Lessons,
  },
  {
    slug: "ellipse-hyperbola-tangents-normals",
    title: "Chapter 5 · Tangents, Normals and Chords for Ellipse and Hyperbola",
    position: 5,
    lessons: conChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "conic-sections"))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: "Conic Sections: Parabola, Ellipse and Hyperbola",
      slug: "conic-sections",
      description:
        "Conic sections from first principles to JEE Main and Advanced depth. Slicing the double cone: circles, ellipses, parabolas, hyperbolas and the degenerate sections; the focus-directrix definition PS = e PM and classification by eccentricity; writing a conic from a focus and a directrix; the general second-degree equation with h squared - ab and the discriminant Delta, pairs of lines, and shifting a conic to standard position. The parabola: the four standard forms, focus, directrix, vertex, axis and latus rectum, focal distance, the parametric point (at^2, 2at), focal chords, shifted parabolas and the reflective property. Parabola tangents, normals and chords: position of a point, line-parabola intersection, tangents in point, slope (y = mx + a/m) and parametric form, normals (y = mx - 2am - am^3) and co-normal points, chord of contact, chord with a given midpoint, pair of tangents and the classic properties. The ellipse: the sum of focal distances, standard form, b^2 = a^2(1 - e^2), foci, directrices, latus rectum, focal distances, the auxiliary circle, eccentric angle and parametric form, shifted ellipses. The hyperbola: the difference of focal distances, b^2 = a^2(e^2 - 1), foci, directrices, latus rectum, asymptotes, the conjugate hyperbola and the rectangular hyperbola x^2 - y^2 = a^2 and xy = c^2 with (ct, c/t). Tangents, normals and chords for the ellipse and hyperbola: the condition c^2 = a^2 m^2 +/- b^2, tangents and normals in every form, the director circle, chord of contact, midpoint chords, pairs of tangents, a comparison table across all conics and JEE-style mixed problems.",
    });
  }
  await db
    .update(courses)
    .set({
      title: "Conic Sections: Parabola, Ellipse and Hyperbola",
      description:
        "Conic sections from first principles to JEE Main and Advanced depth. Slicing the double cone: circles, ellipses, parabolas, hyperbolas and the degenerate sections; the focus-directrix definition PS = e PM and classification by eccentricity; writing a conic from a focus and a directrix; the general second-degree equation with h squared - ab and the discriminant Delta, pairs of lines, and shifting a conic to standard position. The parabola: the four standard forms, focus, directrix, vertex, axis and latus rectum, focal distance, the parametric point (at^2, 2at), focal chords, shifted parabolas and the reflective property. Parabola tangents, normals and chords: position of a point, line-parabola intersection, tangents in point, slope (y = mx + a/m) and parametric form, normals (y = mx - 2am - am^3) and co-normal points, chord of contact, chord with a given midpoint, pair of tangents and the classic properties. The ellipse: the sum of focal distances, standard form, b^2 = a^2(1 - e^2), foci, directrices, latus rectum, focal distances, the auxiliary circle, eccentric angle and parametric form, shifted ellipses. The hyperbola: the difference of focal distances, b^2 = a^2(e^2 - 1), foci, directrices, latus rectum, asymptotes, the conjugate hyperbola and the rectangular hyperbola x^2 - y^2 = a^2 and xy = c^2 with (ct, c/t). Tangents, normals and chords for the ellipse and hyperbola: the condition c^2 = a^2 m^2 +/- b^2, tangents and normals in every form, the director circle, chord of contact, midpoint chords, pairs of tangents, a comparison table across all conics and JEE-style mixed problems.",
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
        `Published ${seed.title} (/course/conic-sections/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log("\nConic Sections seeded. Visit /course/conic-sections");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
