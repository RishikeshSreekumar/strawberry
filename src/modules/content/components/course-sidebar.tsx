"use client";

import { ViewTransition, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Circle, CircleCheck, CircleDot } from "lucide-react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CourseOutline } from "../services/content-service";
import { splitCourseTitle, splitNumberedTitle } from "../lib/titles";
import { ProgressBar } from "@/components/progress-bar";

type LessonStatus = "started" | "completed";

function StatusIcon({ status }: { status?: LessonStatus }) {
  if (status === "completed")
    return <CircleCheck className="size-3.5 shrink-0 text-success" aria-hidden />;
  if (status === "started")
    return <CircleDot className="size-3.5 shrink-0 text-primary" aria-hidden />;
  return (
    <Circle className="size-3.5 shrink-0 text-muted-foreground/40" aria-hidden />
  );
}

export function CourseSidebar({
  outline,
  courseSlug,
  courseTitle,
  progressEntries,
  morph = true,
}: {
  outline: CourseOutline;
  courseSlug: string;
  courseTitle: string;
  progressEntries: [string, LessonStatus][];
  /**
   * Morph the course title to and from the course page. Only one mounted
   * copy may carry the view-transition name, so the mobile sheet opts out.
   */
  morph?: boolean;
}) {
  const pathname = usePathname();
  const progressByLesson = useMemo(
    () => new Map(progressEntries),
    [progressEntries],
  );

  const hrefFor = (chapterSlug: string, lessonSlug: string) =>
    `/course/${courseSlug}/${chapterSlug}/${lessonSlug}`;

  const activeChapterId = useMemo(
    () =>
      outline.find((chapter) =>
        chapter.lessons.some(
          (lesson) => hrefFor(chapter.slug, lesson.slug) === pathname,
        ),
      )?.id,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [outline, courseSlug, pathname],
  );

  // Chapters the user explicitly toggled; the active chapter is always open
  // unless they collapsed it after landing there.
  const [openOverrides, setOpenOverrides] = useState<Record<string, boolean>>(
    {},
  );

  // Entering a new chapter re-opens it even if it was collapsed earlier
  // (state adjusted during render, per React's derived-state pattern).
  const [prevActiveChapterId, setPrevActiveChapterId] =
    useState(activeChapterId);
  if (activeChapterId !== prevActiveChapterId) {
    setPrevActiveChapterId(activeChapterId);
    if (activeChapterId && openOverrides[activeChapterId] === false) {
      setOpenOverrides({ ...openOverrides, [activeChapterId]: true });
    }
  }

  const total = outline.reduce((n, c) => n + c.lessons.length, 0);
  const completed = outline.reduce(
    (n, c) =>
      n +
      c.lessons.filter((l) => progressByLesson.get(l.id) === "completed")
        .length,
    0,
  );
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const courseLink = (
    <Link
      href={`/course/${courseSlug}`}
      transitionTypes={["nav-back"]}
      className="block text-base font-semibold leading-snug tracking-tight hover:text-primary"
    >
      {splitCourseTitle(courseTitle).name}
    </Link>
  );

  return (
    <nav className="text-sm" aria-label="Course lessons">
      <div className="mb-5 space-y-2 px-2">
        {morph ? (
          <ViewTransition
            name={`course-${courseSlug}`}
            share="morph"
            default="none"
          >
            {courseLink}
          </ViewTransition>
        ) : (
          courseLink
        )}
        <div className="flex items-center gap-2">
          <ProgressBar value={percent} label="Course progress" className="flex-1" />
          <span className="text-xs tabular-nums text-muted-foreground">
            {completed}/{total}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {outline.map((chapter, chapterIndex) => {
          const done = chapter.lessons.filter(
            (l) => progressByLesson.get(l.id) === "completed",
          ).length;
          const chapterComplete =
            chapter.lessons.length > 0 && done === chapter.lessons.length;
          const isActiveChapter = chapter.id === activeChapterId;
          const open = openOverrides[chapter.id] ?? isActiveChapter;
          const title = splitNumberedTitle(chapter.title);
          return (
            <Collapsible
              key={chapter.id}
              open={open}
              onOpenChange={(next) =>
                setOpenOverrides((prev) => ({ ...prev, [chapter.id]: next }))
              }
            >
              <CollapsibleTrigger
                className={`group flex w-full items-start gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent/50 ${
                  isActiveChapter ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-px flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold tabular-nums ${
                    chapterComplete
                      ? "bg-success/15 text-success"
                      : isActiveChapter
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {chapterComplete ? (
                    <Check className="size-3" />
                  ) : (
                    (title.number ?? chapterIndex + 1)
                  )}
                </span>
                <span className="min-w-0 flex-1 font-medium leading-snug">
                  {title.text}
                </span>
                <span className="mt-px shrink-0 text-xs tabular-nums text-muted-foreground/80">
                  {done}/{chapter.lessons.length}
                </span>
              </CollapsibleTrigger>
              <CollapsiblePanel>
                <ul className="mt-0.5 mb-2 ml-[1.1rem] space-y-0.5 border-l pl-2">
                  {chapter.lessons.map((lesson) => {
                    const href = hrefFor(chapter.slug, lesson.slug);
                    const isCurrent = href === pathname;
                    // Visiting a lesson marks it started server-side; reflect
                    // that immediately without waiting for a refetch.
                    const status =
                      progressByLesson.get(lesson.id) ??
                      (isCurrent ? "started" : undefined);
                    const lessonTitle = splitNumberedTitle(lesson.title);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={href}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`flex items-start gap-2 rounded-md px-2 py-1.5 transition-colors ${
                            isCurrent
                              ? "bg-accent font-medium text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          }`}
                        >
                          <span className="mt-[0.2rem]">
                            <StatusIcon status={status} />
                          </span>
                          <span className="min-w-0 flex-1 leading-snug">
                            {lessonTitle.number && (
                              <span className="mr-1.5 tabular-nums opacity-70">
                                {lessonTitle.number}
                              </span>
                            )}
                            {lessonTitle.text}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CollapsiblePanel>
            </Collapsible>
          );
        })}
      </div>
    </nav>
  );
}
