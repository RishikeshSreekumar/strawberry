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
  getLessonQuestionAttempts,
  markLessonStarted,
  type QuestionAttemptSummary,
} from "@/modules/progress/services/progress-service";
import { BlockRenderer } from "@/modules/content/components/block-renderer";
import { LessonFooter } from "@/modules/progress/components/lesson-footer";
import { LessonProgressProvider } from "@/modules/progress/components/lesson-progress-provider";
import {
  lessonQuestions,
  questionProgressById,
} from "@/modules/progress/lib/lesson-score";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { splitCourseTitle, splitNumberedTitle } from "@/modules/content/lib/titles";

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

  const questions = lessonQuestions(result.blocks);
  const [outline, progress, attempts] = await Promise.all([
    getCourseOutline(db, result.course.id),
    getCourseProgress(db, { userId: user.id, courseId: result.course.id }),
    questions.length > 0
      ? loadAttempts(user.id, result.lesson.id)
      : ([] as QuestionAttemptSummary[]),
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

  const courseName = splitCourseTitle(result.course.title).name;
  const chapterTitle = splitNumberedTitle(result.chapter.title);
  const lessonTitle = splitNumberedTitle(result.lesson.title);
  const chapterEntry = outline.find((c) => c.id === result.chapter.id);
  const lessonIndex =
    chapterEntry?.lessons.findIndex((l) => l.id === result.lesson.id) ?? -1;

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <article className="mx-auto w-full max-w-[38.25rem]">
        <header className="mb-8 space-y-3">
          <Breadcrumbs
            items={[
              { label: courseName, href: `/course/${result.course.slug}` },
              { label: chapterTitle.number !== null ? `Chapter ${chapterTitle.number}` : chapterTitle.text },
            ]}
          />
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-primary">
              {chapterTitle.text}
              {chapterEntry && (
                <span className="font-normal text-muted-foreground">
                  {" "}· Lesson {lessonIndex + 1} of {chapterEntry.lessons.length}
                </span>
              )}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {lessonTitle.text}
            </h1>
          </div>
        </header>
        <LessonProgressProvider
          lessonId={result.lesson.id}
          questions={questions}
          initialSolved={attempts.filter((a) => a.everCorrect).map((a) => a.questionId)}
          initialCompleted={progressByLesson.get(result.lesson.id) === "completed"}
        >
          <div className="lesson-prose">
            <BlockRenderer
              blocks={result.blocks}
              lessonId={result.lesson.id}
              questionProgress={questionProgressById(attempts)}
            />
          </div>
          <LessonFooter
            prev={prev}
            next={next}
            courseHref={`/course/${result.course.slug}`}
          />
        </LessonProgressProvider>
      </article>
    </ViewTransition>
  );
}

/**
 * Saved question progress, or none if it can't be read: until migration
 * 0003 (question_attempts.response) is applied the query fails, and the
 * lesson should still render, just without restored answers.
 */
async function loadAttempts(
  userId: string,
  lessonId: string,
): Promise<QuestionAttemptSummary[]> {
  try {
    return await getLessonQuestionAttempts(db, { userId, lessonId });
  } catch (error) {
    console.error("Could not load saved question attempts", error);
    return [];
  }
}
