import Link from "next/link";
import { notFound } from "next/navigation";
import { isNotNull, and, inArray } from "drizzle-orm";
import { db } from "@/db";
import { lessons } from "@/db/schema";
import {
  getCourseBySlug,
  listChapters,
} from "@/modules/content/services/content-service";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = await getCourseBySlug(db, courseSlug);
  if (!course || course.status !== "published") notFound();

  const chapterList = await listChapters(db, course.id);
  const publishedLessons =
    chapterList.length === 0
      ? []
      : await db
          .select()
          .from(lessons)
          .where(
            and(
              inArray(
                lessons.chapterId,
                chapterList.map((c) => c.id),
              ),
              isNotNull(lessons.publishedVersionId),
            ),
          )
          .orderBy(lessons.position, lessons.title);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{course.title}</h1>
        {course.description && (
          <p className="mt-2 text-muted-foreground">{course.description}</p>
        )}
      </div>
      {chapterList.map((chapter) => {
        const chapterLessons = publishedLessons.filter(
          (l) => l.chapterId === chapter.id,
        );
        if (chapterLessons.length === 0) return null;
        return (
          <section key={chapter.id} className="space-y-3">
            <h2 className="text-xl font-semibold">{chapter.title}</h2>
            <ul className="space-y-1">
              {chapterLessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    href={`/course/${course.slug}/${chapter.slug}/${lesson.slug}`}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
