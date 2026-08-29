"use client";

import { ViewTransition, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Circle, CircleCheck, CircleDot } from "lucide-react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CourseOutline } from "../services/content-service";

type LessonStatus = "started" | "completed";

function StatusIcon({ status }: { status?: LessonStatus }) {
  if (status === "completed")
    return <CircleCheck className="size-3.5 shrink-0 text-primary" aria-hidden />;
  if (status === "started")
    return <CircleDot className="size-3.5 shrink-0 text-primary/60" aria-hidden />;
  return (
    <Circle className="size-3.5 shrink-0 text-muted-foreground/40" aria-hidden />
  );
}

export function CourseSidebar({
  outline,
  courseSlug,
  courseTitle,
  progressEntries,
}: {
  outline: CourseOutline;
  courseSlug: string;
  courseTitle: string;
  progressEntries: [string, LessonStatus][];
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

  return (
    <nav className="text-sm" aria-label="Course lessons">
      <div className="mb-4 space-y-2 px-2">
        <ViewTransition
          name={`course-${courseSlug}`}
          share="morph"
          default="none"
        >
          <Link
            href={`/course/${courseSlug}`}
            transitionTypes={["nav-back"]}
            className="block font-semibold leading-snug tracking-tight hover:text-primary"
          >
            {courseTitle}
          </Link>
        </ViewTransition>
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs tabular-nums text-muted-foreground">
            {percent}%
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {outline.map((chapter) => {
          const done = chapter.lessons.filter(
            (l) => progressByLesson.get(l.id) === "completed",
          ).length;
          const isActiveChapter = chapter.id === activeChapterId;
          const open = openOverrides[chapter.id] ?? isActiveChapter;
          return (
            <Collapsible
              key={chapter.id}
              open={open}
              onOpenChange={(next) =>
                setOpenOverrides((prev) => ({ ...prev, [chapter.id]: next }))
              }
            >
              <CollapsibleTrigger className="group flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground">
                <ChevronRight
                  className="size-3.5 shrink-0 transition-transform duration-200 group-data-[panel-open]:rotate-90"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate">{chapter.title}</span>
                <span className="shrink-0 font-normal normal-case tabular-nums text-muted-foreground/70">
                  {done}/{chapter.lessons.length}
                </span>
              </CollapsibleTrigger>
              <CollapsiblePanel>
                <ul className="mt-0.5 mb-2 space-y-0.5 border-l pl-2 ml-[0.9rem]">
                  {chapter.lessons.map((lesson) => {
                    const href = hrefFor(chapter.slug, lesson.slug);
                    const isCurrent = href === pathname;
                    // Visiting a lesson marks it started server-side; reflect
                    // that immediately without waiting for a refetch.
                    const status =
                      progressByLesson.get(lesson.id) ??
                      (isCurrent ? "started" : undefined);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={href}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                            isCurrent
                              ? "bg-accent font-medium text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          }`}
                        >
                          <StatusIcon status={status} />
                          <span className="truncate">{lesson.title}</span>
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
