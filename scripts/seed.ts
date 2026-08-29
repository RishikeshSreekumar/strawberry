import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { courses } from "../src/db/schema";
import {
  createChapter,
  createCourse,
  createLesson,
  publishLessonVersion,
  saveLessonDraft,
} from "../src/modules/content/services/content-service";

async function main() {
  const existing = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, "calculus"))
    .limit(1);
  if (existing.length > 0) {
    console.log("Seed course already exists, nothing to do.");
    return;
  }

  const course = await createCourse(db, {
    title: "Calculus",
    slug: "calculus",
    description: "An intuitive, visual introduction to calculus.",
  });
  await db
    .update(courses)
    .set({ status: "published" })
    .where(eq(courses.id, course.id));

  const chapter = await createChapter(db, {
    courseId: course.id,
    title: "Functions",
    position: 1,
  });

  const lesson = await createLesson(db, {
    chapterId: chapter.id,
    title: "Domain and Range",
    position: 1,
  });

  const draft = await saveLessonDraft(db, {
    lessonId: lesson.id,
    blocks: [
      {
        type: "text",
        content:
          "A function is a rule that assigns to every input exactly one output. The set of allowed inputs is called the domain, and the set of outputs it can produce is called the range.",
      },
      {
        type: "math",
        latex: "f(x) = \\sqrt{x - 1}",
      },
      {
        type: "callout",
        variant: "definition",
        title: "Domain",
        content:
          "For f(x) = √(x − 1), the expression under the square root must be non-negative, so the domain is x ≥ 1.",
      },
      {
        type: "math",
        latex: "\\text{Domain: } [1, \\infty) \\qquad \\text{Range: } [0, \\infty)",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "When finding a domain, hunt for the two usual suspects: division by zero and even roots of negative numbers.",
      },
    ],
  });

  await publishLessonVersion(db, draft.id);

  console.log("Seeded course:", course.slug);
  console.log("Visit /course/calculus/functions/domain-and-range");
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
