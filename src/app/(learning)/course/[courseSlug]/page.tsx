import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Circle, CircleCheck, CircleDot, PlayCircle } from "lucide-react";
import { db } from "@/db";
import { requireUser } from "@/modules/auth/session";
import {
  getCourseBySlug,
  getCourseOutline,
} from "@/modules/content/services/content-service";
import { trackForCourse } from "@/modules/content/lib/catalog";
import { splitCourseTitle, splitNumberedTitle } from "@/modules/content/lib/titles";
import {
  getContinueLesson,
  getCourseProgress,
} from "@/modules/progress/services/progress-service";
import { resolveContinueTarget } from "@/modules/progress/lib/continue-target";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProgressBar } from "@/components/progress-bar";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

function StatusIcon({ status }: { status?: "started" | "completed" }) {
  if (status === "completed")
    return <CircleCheck className="size-4 shrink-0 text-success" aria-label="Completed" />;
  if (status === "started")
    return <CircleDot className="size-4 shrink-0 text-primary" aria-label="In progress" />;
  return <Circle className="size-4 shrink-0 text-muted-foreground/40" aria-label="Not started" />;
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const user = await requireUser();
  const course = await getCourseBySlug(db, courseSlug);
  if (!course || course.status !== "published") notFound();

  const [outline, progress, recent] = await Promise.all([
    getCourseOutline(db, course.id),
    getCourseProgress(db, { userId: user.id, courseId: course.id }),
    getContinueLesson(db, { userId: user.id, courseId: course.id }),
  ]);

  const progressByLesson = new Map(progress.map((p) => [p.lessonId, p.status]));
  const flat = outline.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ chapter, lesson })),
  );
  const total = flat.length;
  const completed = flat.filter(
    ({ lesson }) => progressByLesson.get(lesson.id) === "completed",
  ).length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  const courseDone = total > 0 && completed === total;
  const continueTarget = resolveContinueTarget(flat, progressByLesson, recent);

  const { name, tagline } = splitCourseTitle(course.title);
  const track = trackForCourse(course.slug);
  const nextLesson = continueTarget ? splitNumberedTitle(continueTarget.lesson.title) : null;

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="space-y-4">
          <Breadcrumbs
            items={[
              { label: track?.title ?? "Courses", href: "/courses" },
              { label: name },
            ]}
          />
          <div className="space-y-2">
            <ViewTransition name={`course-${course.slug}`} share="morph" default="none">
              <h1 className="text-4xl font-bold tracking-tight">{name}</h1>
            </ViewTransition>
            {tagline && <p className="text-xl text-muted-foreground">{tagline}</p>}
          </div>
          {course.description && (
            <p className="max-w-3xl text-muted-foreground">{course.description}</p>
          )}
        </div>

        {total > 0 && (
          <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-baseline justify-between gap-3 text-sm sm:justify-start">
                <span className="font-medium">
                  {courseDone ? "Course complete" : "Your progress"}
                </span>
                <span className="tabular-nums text-muted-foreground">
                  {completed} of {total} lessons · {outline.length} chapters
                </span>
              </div>
              <ProgressBar value={percent} label="Course progress" className="max-w-md" />
            </div>
            {continueTarget && nextLesson && (
              <Link
                href={`/course/${course.slug}/${continueTarget.chapter.slug}/${continueTarget.lesson.slug}`}
                transitionTypes={["nav-forward"]}
                className={buttonVariants({
                  size: "lg",
                  variant: courseDone ? "outline" : "default",
                  className: "h-auto min-h-10 max-w-full gap-2 py-2 whitespace-normal",
                })}
              >
                <PlayCircle aria-hidden />
                <span className="text-left">
                  <span className="block text-xs font-normal opacity-80">
                    {courseDone ? "Review" : recent ? "Continue" : "Start course"}
                  </span>
                  <span className="block leading-snug">{nextLesson.text}</span>
                </span>
              </Link>
            )}
          </div>
        )}

        <section aria-label="Chapters" className="space-y-3">
          {outline.map((chapter, chapterIndex) => {
            const done = chapter.lessons.filter(
              (l) => progressByLesson.get(l.id) === "completed",
            ).length;
            const chapterComplete =
              chapter.lessons.length > 0 && done === chapter.lessons.length;
            const title = splitNumberedTitle(chapter.title);
            const isCurrentChapter = continueTarget?.chapter.id === chapter.id;
            return (
              <Collapsible
                key={chapter.id}
                defaultOpen={isCurrentChapter && !courseDone}
                className={cn(
                  "rounded-xl border bg-card shadow-xs",
                  isCurrentChapter && !courseDone && "border-primary/30",
                )}
              >
                <CollapsibleTrigger className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors hover:bg-accent/30 sm:p-5">
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums",
                      chapterComplete
                        ? "bg-success/15 text-success"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {chapterComplete ? (
                      <CircleCheck className="size-5" />
                    ) : (
                      (title.number ?? chapterIndex + 1)
                    )}
                  </span>
                  <span className="min-w-0 flex-1 space-y-1.5">
                    {isCurrentChapter && !courseDone && (
                      <span className="block text-xs font-medium text-primary">
                        You&apos;re here
                      </span>
                    )}
                    <span className="block text-lg font-semibold leading-snug">
                      <span className="sr-only">Chapter {title.number ?? chapterIndex + 1}: </span>
                      {title.text}
                    </span>
                    <span className="flex items-center gap-2">
                      <ProgressBar
                        value={(done / Math.max(chapter.lessons.length, 1)) * 100}
                        label={`${title.text} progress`}
                        className="w-24"
                      />
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {done}/{chapter.lessons.length} lessons
                      </span>
                    </span>
                  </span>
                  <ChevronRight
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-90"
                    aria-hidden
                  />
                </CollapsibleTrigger>
                <CollapsiblePanel>
                  <ol className="space-y-0.5 border-t px-3 py-3 sm:px-4">
                    {chapter.lessons.map((lesson) => {
                      const lessonTitle = splitNumberedTitle(lesson.title);
                      const isNext = continueTarget?.lesson.id === lesson.id && !courseDone;
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/course/${course.slug}/${chapter.slug}/${lesson.slug}`}
                            transitionTypes={["nav-forward"]}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent/50",
                              isNext && "bg-accent/60",
                            )}
                          >
                            <StatusIcon status={progressByLesson.get(lesson.id)} />
                            {lessonTitle.number && (
                              <span className="w-8 shrink-0 text-sm tabular-nums text-muted-foreground">
                                {lessonTitle.number}
                              </span>
                            )}
                            <span className="min-w-0 flex-1">{lessonTitle.text}</span>
                            {isNext && (
                              <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                                Up next
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                </CollapsiblePanel>
              </Collapsible>
            );
          })}
        </section>
      </div>
    </ViewTransition>
  );
}
