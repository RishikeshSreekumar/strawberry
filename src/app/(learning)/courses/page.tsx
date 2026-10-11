import { ViewTransition } from "react";
import Link from "next/link";
import { and, countDistinct, eq, isNotNull } from "drizzle-orm";
import { ArrowRight, CircleCheck, PlayCircle } from "lucide-react";
import { db } from "@/db";
import { chapters, courses, lessons } from "@/db/schema";
import { requireUser } from "@/modules/auth/session";
import { getCourseOutline } from "@/modules/content/services/content-service";
import { groupCoursesByTrack } from "@/modules/content/lib/catalog";
import { splitCourseTitle, splitNumberedTitle } from "@/modules/content/lib/titles";
import {
  getContinueLesson,
  getCourseProgress,
  getProgressByCourse,
} from "@/modules/progress/services/progress-service";
import { resolveContinueTarget } from "@/modules/progress/lib/continue-target";
import { buttonVariants } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";

type CourseRow = typeof courses.$inferSelect;
type CourseStats = {
  chapters: number;
  lessons: number;
  completed: number;
  started: boolean;
};

export default async function CoursesPage() {
  const user = await requireUser();
  const [published, counts, progress] = await Promise.all([
    db.select().from(courses).where(eq(courses.status, "published")),
    // Published lessons only, matching what the course outline shows.
    db
      .select({
        courseId: chapters.courseId,
        chapterCount: countDistinct(chapters.id),
        lessonCount: countDistinct(lessons.id),
      })
      .from(chapters)
      .innerJoin(
        lessons,
        and(eq(lessons.chapterId, chapters.id), isNotNull(lessons.publishedVersionId)),
      )
      .groupBy(chapters.courseId),
    getProgressByCourse(db, { userId: user.id }),
  ]);

  const countsByCourse = new Map(counts.map((c) => [c.courseId, c]));
  const progressByCourse = new Map(progress.map((p) => [p.courseId, p]));
  const statsFor = (course: CourseRow): CourseStats => {
    const count = countsByCourse.get(course.id);
    return {
      chapters: count?.chapterCount ?? 0,
      lessons: count?.lessonCount ?? 0,
      completed: progressByCourse.get(course.id)?.completed ?? 0,
      started: progressByCourse.has(course.id),
    };
  };

  // The course worked in most recently, unless it's finished.
  const recentCourse = progress
    .map((p) => ({ p, course: published.find((c) => c.id === p.courseId) }))
    .filter(
      ({ p, course }) =>
        course && p.completed < (countsByCourse.get(course.id)?.lessonCount ?? 0),
    )
    .sort((a, b) => b.p.lastActivityAt.getTime() - a.p.lastActivityAt.getTime())[0]
    ?.course;

  const groups = groupCoursesByTrack(published);

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Pick a track and work through it in order, or jump into any course.
          </p>
        </div>

        {recentCourse && (
          <ContinueCard course={recentCourse} userId={user.id} stats={statsFor(recentCourse)} />
        )}

        {published.length === 0 ? (
          <p className="text-muted-foreground">
            No courses published yet. Check back soon!
          </p>
        ) : (
          groups.map(({ track, courses: trackCourses }) => (
            <section key={track.id} aria-labelledby={`track-${track.id}`} className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b pb-2">
                <h2 id={`track-${track.id}`} className="text-xl font-semibold tracking-tight">
                  {track.title}
                </h2>
                {track.blurb && (
                  <p className="text-sm text-muted-foreground">{track.blurb}</p>
                )}
              </div>
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trackCourses.map((course, i) => (
                  <li key={course.id}>
                    <CourseCard
                      course={course}
                      stats={statsFor(course)}
                      step={track.id === "other" ? null : i + 1}
                    />
                  </li>
                ))}
              </ol>
            </section>
          ))
        )}
      </div>
    </ViewTransition>
  );
}

async function ContinueCard({
  course,
  userId,
  stats,
}: {
  course: CourseRow;
  userId: string;
  stats: CourseStats;
}) {
  const [outline, progress, recent] = await Promise.all([
    getCourseOutline(db, course.id),
    getCourseProgress(db, { userId, courseId: course.id }),
    getContinueLesson(db, { userId, courseId: course.id }),
  ]);
  const progressByLesson = new Map(progress.map((p) => [p.lessonId, p.status]));
  const flat = outline.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ chapter, lesson })),
  );
  const target = resolveContinueTarget(flat, progressByLesson, recent);
  if (!target) return null;

  const { name } = splitCourseTitle(course.title);
  const chapter = splitNumberedTitle(target.chapter.title);
  const lesson = splitNumberedTitle(target.lesson.title);
  const percent = stats.lessons === 0 ? 0 : (stats.completed / stats.lessons) * 100;

  return (
    <section
      aria-label="Continue learning"
      className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-accent/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="min-w-0 space-y-2">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          Pick up where you left off
        </p>
        <div>
          <p className="text-lg font-semibold leading-snug">{lesson.text}</p>
          <p className="text-sm text-muted-foreground">
            {name} · {chapter.text}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar value={percent} label={`${name} progress`} className="w-40 bg-card" />
          <span className="text-xs tabular-nums text-muted-foreground">
            {stats.completed}/{stats.lessons} lessons
          </span>
        </div>
      </div>
      <Link
        href={`/course/${course.slug}/${target.chapter.slug}/${target.lesson.slug}`}
        transitionTypes={["nav-forward"]}
        className={buttonVariants({ size: "lg", className: "gap-2 self-start sm:self-auto" })}
      >
        <PlayCircle aria-hidden />
        Continue
      </Link>
    </section>
  );
}

function CourseCard({
  course,
  stats,
  step,
}: {
  course: CourseRow;
  stats: CourseStats;
  step: number | null;
}) {
  const { name, tagline } = splitCourseTitle(course.title);
  const percent = stats.lessons === 0 ? 0 : (stats.completed / stats.lessons) * 100;
  const done = stats.lessons > 0 && stats.completed >= stats.lessons;

  return (
    <Link
      href={`/course/${course.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-sm"
    >
      <div className="flex items-start gap-3">
        {step !== null && (
          <span
            aria-hidden
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular-nums text-secondary-foreground"
          >
            {step}
          </span>
        )}
        <div className="min-w-0">
          <ViewTransition name={`course-${course.slug}`} share="morph" default="none">
            <h3 className="font-semibold leading-snug group-hover:text-primary">{name}</h3>
          </ViewTransition>
          {tagline && <p className="text-sm text-muted-foreground">{tagline}</p>}
        </div>
      </div>
      {course.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
      )}
      <div className="mt-auto space-y-2 pt-1">
        {stats.completed > 0 && <ProgressBar value={percent} label={`${name} progress`} />}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {stats.lessons > 0
              ? `${stats.chapters} chapters · ${stats.lessons} lessons`
              : "Coming soon"}
          </span>
          {done ? (
            <span className="flex items-center gap-1 font-medium text-success">
              <CircleCheck className="size-3.5" aria-hidden />
              Completed
            </span>
          ) : stats.started ? (
            <span className="font-medium tabular-nums text-primary">
              {stats.completed > 0 ? `${Math.round(percent)}% done` : "In progress"}
            </span>
          ) : (
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden
            />
          )}
        </div>
      </div>
    </Link>
  );
}
