import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Circle, CircleCheck, CircleDot } from "lucide-react";
import { db } from "@/db";
import { requireUser } from "@/modules/auth/session";
import {
  getCourseBySlug,
  getCourseOutline,
} from "@/modules/content/services/content-service";
import {
  getContinueLesson,
  getCourseProgress,
} from "@/modules/progress/services/progress-service";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function StatusIcon({ status }: { status?: "started" | "completed" }) {
  if (status === "completed")
    return <CircleCheck className="size-4 shrink-0 text-primary" aria-label="Completed" />;
  if (status === "started")
    return <CircleDot className="size-4 shrink-0 text-primary/60" aria-label="In progress" />;
  return <Circle className="size-4 shrink-0 text-muted-foreground/40" aria-hidden />;
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
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Continue where you left off; if that lesson is done, advance to the
  // next uncompleted lesson in course order.
  let continueTarget = flat[0] ?? null;
  if (recent) {
    const idx = flat.findIndex(({ lesson }) => lesson.id === recent.lessonId);
    continueTarget =
      recent.status === "completed"
        ? (flat
            .slice(idx + 1)
            .find(({ lesson }) => progressByLesson.get(lesson.id) !== "completed") ??
          flat[idx] ??
          null)
        : (flat[idx] ?? null);
  }

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
              { label: "Courses", href: "/courses" },
              { label: course.title },
            ]}
          />
          <ViewTransition name={`course-${course.slug}`} share="morph" default="none">
            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
          </ViewTransition>
          {course.description && (
            <p className="text-lg text-muted-foreground">{course.description}</p>
          )}
          {total > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 max-w-xs flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {completed}/{total} lessons
                </span>
              </div>
              {continueTarget && (
                <Link
                  href={`/course/${course.slug}/${continueTarget.chapter.slug}/${continueTarget.lesson.slug}`}
                  transitionTypes={["nav-forward"]}
                  className={buttonVariants({ size: "lg" })}
                >
                  {completed === 0 && !recent ? "Start course" : "Continue learning"}
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {outline.map((chapter) => {
            const done = chapter.lessons.filter(
              (l) => progressByLesson.get(l.id) === "completed",
            ).length;
            const chapterComplete =
              chapter.lessons.length > 0 && done === chapter.lessons.length;
            return (
              <Collapsible
                key={chapter.id}
                className="rounded-xl border bg-card shadow-xs"
              >
                <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 rounded-xl p-5 text-left transition-colors hover:bg-accent/30">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <ChevronRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-90"
                      aria-hidden
                    />
                    <span className="truncate text-xl font-semibold">
                      {chapter.title}
                    </span>
                  </span>
                  <Badge
                    variant="secondary"
                    className={chapterComplete ? "text-success" : undefined}
                  >
                    {done}/{chapter.lessons.length} done
                  </Badge>
                </CollapsibleTrigger>
                <CollapsiblePanel>
                  <ul className="space-y-1 px-5 pb-5">
                    {chapter.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/course/${course.slug}/${chapter.slug}/${lesson.slug}`}
                          transitionTypes={["nav-forward"]}
                          className="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-accent/50"
                        >
                          <StatusIcon status={progressByLesson.get(lesson.id)} />
                          <span>{lesson.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CollapsiblePanel>
              </Collapsible>
            );
          })}
        </div>
      </div>
    </ViewTransition>
  );
}
