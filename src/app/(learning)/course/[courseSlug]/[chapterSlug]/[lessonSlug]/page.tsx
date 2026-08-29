import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { requireUser } from "@/modules/auth/session";
import {
  getCourseOutline,
  getPublishedLesson,
} from "@/modules/content/services/content-service";
import {
  getCourseProgress,
  markLessonStarted,
} from "@/modules/progress/services/progress-service";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { LessonFooter } from "@/modules/progress/components/lesson-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    lessonSlug: string;
  }>;
}) {
  const { courseSlug, chapterSlug, lessonSlug } = await params;
  const user = await requireUser();
  const result = await getPublishedLesson(db, {
    courseSlug,
    chapterSlug,
    lessonSlug,
  });
  if (!result) notFound();

  const [outline, progress] = await Promise.all([
    getCourseOutline(db, result.course.id),
    getCourseProgress(db, { userId: user.id, courseId: result.course.id }),
    markLessonStarted(db, { userId: user.id, lessonId: result.lesson.id }),
  ]);

  const progressByLesson = new Map(progress.map((p) => [p.lessonId, p.status]));
  const flat = outline.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ chapter, lesson })),
  );
  const idx = flat.findIndex(({ lesson }) => lesson.id === result.lesson.id);
  const toNeighbor = (entry: (typeof flat)[number] | undefined) =>
    entry
      ? {
          href: `/course/${courseSlug}/${entry.chapter.slug}/${entry.lesson.slug}`,
          title: entry.lesson.title,
        }
      : null;
  const prev = idx > 0 ? toNeighbor(flat[idx - 1]) : null;
  const next = idx >= 0 ? toNeighbor(flat[idx + 1]) : null;

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <article>
        <div className="mb-8 space-y-3">
          <Breadcrumbs
            items={[
              { label: "Courses", href: "/courses" },
              {
                label: result.course.title,
                href: `/course/${result.course.slug}`,
              },
              { label: result.chapter.title },
              { label: result.lesson.title },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight">
            {result.lesson.title}
          </h1>
        </div>
        <div className="lesson-prose">
          <BlockRenderer blocks={result.blocks} lessonId={result.lesson.id} />
        </div>
        <LessonFooter
          lessonId={result.lesson.id}
          isCompleted={progressByLesson.get(result.lesson.id) === "completed"}
          prev={prev}
          next={next}
        />
      </article>
    </ViewTransition>
  );
}
