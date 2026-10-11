import "dotenv/config";
import { and, eq } from "drizzle-orm";
import { db } from "../src/db";
import { chapters, courses, lessons } from "../src/db/schema";
import type { LessonSeed } from "../src/modules/content/chapter-0-content";
import { tdgChapter0Lessons } from "../src/modules/content/tdg-chapter-0-content";
import { tdgChapter1Lessons } from "../src/modules/content/tdg-chapter-1-content";
import { tdgChapter2Lessons } from "../src/modules/content/tdg-chapter-2-content";
import { tdgChapter3Lessons } from "../src/modules/content/tdg-chapter-3-content";
import { tdgChapter4Lessons } from "../src/modules/content/tdg-chapter-4-content";
import { tdgChapter5Lessons } from "../src/modules/content/tdg-chapter-5-content";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

/**
 * Seeds the `three-dimensional-geometry` course. Re-running is safe: existing
 * rows are updated in place and a fresh version of every lesson is
 * published.
 */
const COURSE_SLUG = "three-dimensional-geometry";
const COURSE_TITLE = "Three-Dimensional Geometry: Lines and Planes in Space";
const COURSE_DESCRIPTION =
  "Three-dimensional coordinate geometry taught to full JEE Main and Advanced depth, building on vector algebra (dot, cross and triple products). The course starts with coordinates in space: right-handed axes, octants, the distance and section formulas (internal and external division, the ratio in which a coordinate plane divides a segment), the centroid of a triangle and of a tetrahedron, and the projections of a segment on the axes. It then fixes the direction of a line: direction cosines and direction ratios, l² + m² + n² = 1, direction cosines from two points, the angle between two lines, parallel and perpendicular conditions, lines whose direction cosines satisfy two relations, and the projection of a segment on a line. The equation of a line follows in vector form r = a + λb and Cartesian symmetric form, with conversions between the forms, the general point, the foot of the perpendicular from a point and the distance from a line, the image of a point in a line, and intersecting lines. Skew lines come next: parallel, intersecting or skew, the shortest distance between skew lines in vector and Cartesian form, the condition for two lines to intersect, the distance between parallel lines and the equation of the line of shortest distance. Planes are built in every form: point and normal, general, normal form, through three points, intercept form, and the family P₁ + λP₂ = 0 through the intersection of two planes, with the angle between two planes, the distance of a point from a plane, the distance between parallel planes, the two sides of a plane and the bisector planes. The course closes with lines and planes together: the angle between a line and a plane, a line parallel to or lying in a plane, where a line meets a plane, the foot of the perpendicular and the image of a point in a plane, coplanar lines and the plane containing them, lines as intersections of planes, the projection of a line on a plane, and JEE-style mixed problems.";

const chapterSeeds: {
  slug: string;
  title: string;
  position: number;
  lessons: LessonSeed[];
}[] = [
  {
    slug: "coordinates-in-space",
    title: "Chapter 0 · Coordinates in Space",
    position: 0,
    lessons: tdgChapter0Lessons,
  },
  {
    slug: "direction-of-a-line",
    title: "Chapter 1 · Direction of a Line",
    position: 1,
    lessons: tdgChapter1Lessons,
  },
  {
    slug: "equation-of-a-line",
    title: "Chapter 2 · Equation of a Line",
    position: 2,
    lessons: tdgChapter2Lessons,
  },
  {
    slug: "skew-lines-and-shortest-distance",
    title: "Chapter 3 · Skew Lines and Shortest Distance",
    position: 3,
    lessons: tdgChapter3Lessons,
  },
  {
    slug: "planes",
    title: "Chapter 4 · Planes",
    position: 4,
    lessons: tdgChapter4Lessons,
  },
  {
    slug: "lines-and-planes-together",
    title: "Chapter 5 · Lines and Planes Together",
    position: 5,
    lessons: tdgChapter5Lessons,
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

  console.log(`\nThree-Dimensional Geometry seeded. Visit /course/${COURSE_SLUG}`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
