/**
 * Pure helpers behind the per-lesson score and auto-completion. A
 * "question" is a quiz or numeric block with an `id` (blocks without one
 * aren't recorded, so they can't count); it is solved once any recorded
 * attempt was correct.
 */
import type { QuestionProgress } from "@/modules/content/lib/question-state";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import type { QuestionAttemptSummary } from "../services/progress-service";

export type LessonQuestion = { id: string; mastery: boolean };

/** Trackable questions in lesson order; a repeated id counts once. */
export function lessonQuestions(blocks: readonly LessonBlock[]): LessonQuestion[] {
  const seen = new Set<string>();
  const questions: LessonQuestion[] = [];
  for (const block of blocks) {
    if ((block.type !== "quiz" && block.type !== "numeric") || !block.id) continue;
    if (seen.has(block.id)) continue;
    seen.add(block.id);
    questions.push({ id: block.id, mastery: block.variant === "mastery" });
  }
  return questions;
}

export type LessonScore = {
  correct: number;
  total: number;
  masteryCorrect: number;
  masteryTotal: number;
};

export function lessonScore(
  questions: readonly LessonQuestion[],
  solved: ReadonlySet<string>,
): LessonScore {
  const mastery = questions.filter((q) => q.mastery);
  return {
    correct: questions.filter((q) => solved.has(q.id)).length,
    total: questions.length,
    masteryCorrect: mastery.filter((q) => solved.has(q.id)).length,
    masteryTotal: mastery.length,
  };
}

/**
 * A lesson completes itself once every mastery question is solved, or,
 * when it has no mastery questions, every question. Lessons without
 * questions never auto-complete (the learner marks them complete).
 */
export function canAutoComplete(
  questions: readonly LessonQuestion[],
  solved: ReadonlySet<string>,
): boolean {
  const mastery = questions.filter((q) => q.mastery);
  const required = mastery.length > 0 ? mastery : questions;
  return required.length > 0 && required.every((q) => solved.has(q.id));
}

/** Per-question restore data for the question cards, keyed by question id. */
export function questionProgressById(
  summaries: readonly QuestionAttemptSummary[],
): Record<string, QuestionProgress> {
  // No prototype: a question id like "constructor" can't hit Object.prototype.
  const result: Record<string, QuestionProgress> = Object.create(null);
  for (const s of summaries) {
    const progress: QuestionProgress = {
      solved: s.everCorrect,
      wrongAttempts: s.wrongAttempts,
    };
    const answer = s.latestCorrect;
    if (answer) {
      if (answer.response && "selected" in answer.response) {
        progress.solvedWith = { selected: answer.response.selected };
      } else if (answer.response && "value" in answer.response) {
        progress.solvedWith = { value: answer.response.value };
      } else if (answer.selectedIndex >= 0) {
        progress.solvedWith = { selectedIndex: answer.selectedIndex };
      }
    }
    result[s.questionId] = progress;
  }
  return result;
}
