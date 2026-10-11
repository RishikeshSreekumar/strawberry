import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { slcChapter0Lessons } from "../src/modules/content/slc-chapter-0-content";
import { slcChapter1Lessons } from "../src/modules/content/slc-chapter-1-content";
import { slcChapter2Lessons } from "../src/modules/content/slc-chapter-2-content";
import { slcChapter3Lessons } from "../src/modules/content/slc-chapter-3-content";
import { slcChapter4Lessons } from "../src/modules/content/slc-chapter-4-content";
import { slcChapter5Lessons } from "../src/modules/content/slc-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `straight-lines-circles` course. Re-running is safe: existing
 * rows are updated in place and a fresh version of every lesson is
 * published.
 */
const COURSE_SLUG = "straight-lines-circles";
const COURSE_TITLE = "Straight Lines and Circles: Geometry in Coordinates";
const COURSE_DESCRIPTION =
  "Coordinate geometry of the straight line and the circle, taught to full JEE Main and Advanced depth. The course starts on the coordinate plane with the distance and section formulas (internal and external division), the centroid, incentre, excentres, circumcentre and orthocentre of a triangle, area of a triangle or polygon by determinants, collinearity, the equation of a locus and shifting the origin. It builds the straight line from slope and inclination, parallel and perpendicular conditions, and every standard form: slope-intercept, point-slope, two-point, intercept, normal, parametric (distance) and general, with conversions between them. It then measures the plane with lines: the angle between two lines, the distance of a point from a line and between parallel lines, the foot of the perpendicular and the image of a point, which side of a line a point lies on, and the angle bisectors (the one containing the origin and the acute one). Families of lines through an intersection, the concurrency determinant, lines at a given angle, reflection of a line, pairs of straight lines (ax² + 2hxy + by² = 0 and the general second-degree pair) and JEE triangle problems complete the straight line. The circle follows in every form (centre-radius, general, diameter, parametric), with the position of a point, a line meeting a circle and the chord length, tangents (at a point, of given slope, from an external point, tangent length) and normals. The course closes with chords and systems of circles: chord with a given midpoint, chord of contact, pole and polar, the director circle, two circles and their common tangents, the common chord, orthogonal circles, families S + λL = 0 and S + λS' = 0, and the radical axis and radical centre.";

const chapterSeeds: {
  slug: string;
  title: string;
  position: number;
  lessons: LessonSeed[];
}[] = [
  {
    slug: "the-coordinate-plane",
    title: "Chapter 0 · The Coordinate Plane",
    position: 0,
    lessons: slcChapter0Lessons,
  },
  {
    slug: "slope-and-equations-of-a-line",
    title: "Chapter 1 · Slope and Equations of a Line",
    position: 1,
    lessons: slcChapter1Lessons,
  },
  {
    slug: "angles-and-distances",
    title: "Chapter 2 · Angles and Distances",
    position: 2,
    lessons: slcChapter2Lessons,
  },
  {
    slug: "families-and-concurrency",
    title: "Chapter 3 · Families and Concurrency",
    position: 3,
    lessons: slcChapter3Lessons,
  },
  {
    slug: "circles",
    title: "Chapter 4 · Circles",
    position: 4,
    lessons: slcChapter4Lessons,
  },
  {
    slug: "chords-and-systems-of-circles",
    title: "Chapter 5 · Chords and Systems of Circles",
    position: 5,
    lessons: slcChapter5Lessons,
  },
];

async function main() {
  let [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, COURSE_SLUG))
    .limit(1);
  if (!course) {
    course = await createCourse(db, {
      title: COURSE_TITLE,
      slug: COURSE_SLUG,
      description: COURSE_DESCRIPTION,
    });
  }
  await db
    .update(courses)
    .set({
      title: COURSE_TITLE,
      description: COURSE_DESCRIPTION,
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
        `Published ${seed.title} (/course/${COURSE_SLUG}/${chapterSeed.slug}/${seed.slug})`,
      );
    }
  }

  console.log(`\nStraight Lines and Circles seeded. Visit /course/${COURSE_SLUG}`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
