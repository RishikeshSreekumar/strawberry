"use server";

import { z } from "zod";
import { db } from "@/db";
import type { QuestionResponse } from "@/db/schema/progress";
import { requireUser } from "@/modules/auth/session";
import {
  markLessonCompleted,
  recordQuizAttempt,
} from "./services/progress-service";
import { quizAttemptSchema } from "./attempt-schema";

const lessonIdSchema = z.string().uuid();

export async function markLessonCompletedAction(
  lessonId: string,
): Promise<{ ok: boolean }> {
  const user = await requireUser();
  const parsed = lessonIdSchema.safeParse(lessonId);
  if (!parsed.success) return { ok: false };
  await markLessonCompleted(db, { userId: user.id, lessonId: parsed.data });
  return { ok: true };
}

/**
 * Records one question attempt. Single-correct quiz: `selectedIndex` only.
 * Multiple-correct quiz / numeric: `selectedIndex: -1` plus `response`.
 */
export async function recordQuizAttemptAction(input: {
  lessonId: string;
  questionId: string;
  selectedIndex: number;
  correct: boolean;
  response?: QuestionResponse;
}): Promise<{ ok: boolean }> {
  const user = await requireUser();
  const parsed = quizAttemptSchema.safeParse(input);
  if (!parsed.success) return { ok: false };
  await recordQuizAttempt(db, { userId: user.id, ...parsed.data });
  return { ok: true };
}
