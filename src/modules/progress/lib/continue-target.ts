type LessonStatus = "started" | "completed";

/**
 * The lesson "Continue" should open: the most recently touched lesson, or,
 * if that one is done, the next uncompleted lesson after it in course
 * order. With no history, the first lesson.
 */
export function resolveContinueTarget<T extends { lesson: { id: string } }>(
  flat: readonly T[],
  progressByLesson: ReadonlyMap<string, LessonStatus>,
  recent: { lessonId: string; status: LessonStatus } | null,
): T | null {
  if (!recent) return flat[0] ?? null;
  const idx = flat.findIndex(({ lesson }) => lesson.id === recent.lessonId);
  if (idx < 0) return flat[0] ?? null;
  if (recent.status !== "completed") return flat[idx];
  return (
    flat
      .slice(idx + 1)
      .find(({ lesson }) => progressByLesson.get(lesson.id) !== "completed") ??
    flat[idx]
  );
}
