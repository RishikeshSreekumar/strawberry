/**
 * In-memory record of the question attempts and lesson completions made in
 * this browser tab, keyed by lesson + question id.
 *
 * Why: without cacheComponents, the App Router keeps the RSC payload a
 * lesson page was rendered with, and Back/Forward re-mounts the page from
 * that payload, i.e. from the saved progress as it was when the learner
 * first opened it. Question cards and the lesson progress provider merge
 * this record over their server props, so answers given since then
 * survive Back/Forward and soft navigations without re-rendering the page
 * on the server after every answer (the alternative, refresh() after each
 * recorded attempt, costs a full lesson re-render per answer).
 *
 * Hydration-safe: the record is empty on every full page load, so the
 * first client render matches the server render; it only fills as the
 * learner answers. It is optimistic: an attempt whose request fails still
 * counts here until the tab is reloaded.
 */
import type { QuestionProgress } from "./question-state";

export type RecordedAnswer = {
  selectedIndex: number;
  correct: boolean;
  response?: { selected: number[] } | { value: number };
};

/** Folds one attempt into a question's progress. Pure. */
export function applyAttempt(
  progress: QuestionProgress | undefined,
  attempt: RecordedAnswer,
): QuestionProgress {
  const base: QuestionProgress = progress ?? { solved: false, wrongAttempts: 0 };
  if (!attempt.correct) return { ...base, wrongAttempts: base.wrongAttempts + 1 };
  const { response, selectedIndex } = attempt;
  const solvedWith: QuestionProgress["solvedWith"] =
    response && "selected" in response
      ? { selected: response.selected }
      : response && "value" in response
        ? { value: response.value }
        : selectedIndex >= 0
          ? { selectedIndex }
          : undefined;
  return { ...base, solved: true, solvedWith };
}

/**
 * Server snapshot merged with this tab's record. Solved if either says so
 * (preferring this tab's answer, which is newer); wrong attempts take the
 * larger count, since the snapshot may or may not include this tab's.
 */
export function mergeQuestionProgress(
  server: QuestionProgress | undefined,
  session: QuestionProgress | undefined,
): QuestionProgress | undefined {
  if (!server || !session) return server ?? session;
  const solvedWith = session.solved ? session.solvedWith : server.solvedWith;
  return {
    solved: server.solved || session.solved,
    wrongAttempts: Math.max(server.wrongAttempts, session.wrongAttempts),
    ...(solvedWith ? { solvedWith } : {}),
  };
}

export function createSessionProgress({
  isServer = () => typeof window === "undefined",
}: { isServer?: () => boolean } = {}) {
  const questions = new Map<string, Map<string, QuestionProgress>>();
  const completed = new Set<string>();
  return {
    /**
     * `starting` is the card's server progress: a question's first entry
     * builds on it, so its wrong count stays right even when a later
     * Back/Forward payload is older than this tab's answers.
     */
    noteAttempt(
      lessonId: string,
      questionId: string,
      attempt: RecordedAnswer,
      starting?: QuestionProgress,
    ) {
      // Never on the server: this module instance is shared by all requests.
      if (isServer()) return;
      const lesson = questions.get(lessonId) ?? new Map<string, QuestionProgress>();
      lesson.set(questionId, applyAttempt(lesson.get(questionId) ?? starting, attempt));
      questions.set(lessonId, lesson);
    },
    question(lessonId: string | undefined, questionId: string | undefined) {
      if (!lessonId || !questionId) return undefined;
      return questions.get(lessonId)?.get(questionId);
    },
    solvedIds(lessonId: string): string[] {
      return [...(questions.get(lessonId) ?? [])].flatMap(([id, p]) => (p.solved ? [id] : []));
    },
    noteCompleted(lessonId: string) {
      if (isServer()) return;
      completed.add(lessonId);
    },
    isCompleted(lessonId: string): boolean {
      return completed.has(lessonId);
    },
  };
}

/**
 * This tab's record (module state: reset by every full page load). Only
 * event handlers write to it, and writes are ignored on the server, so the
 * server's copy of this module, shared by every request, stays empty.
 */
export const sessionProgress = createSessionProgress();
