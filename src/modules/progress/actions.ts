"use server";

import { z } from "zod";
import { db } from "@/db";
import { requireUser } from "@/modules/auth/session";
import {
  markLessonCompleted,
  recordQuizAttempt,
} from "./services/progress-service";

const lessonIdSchema = z.string().uuid();

const quizAttemptSchema = z.object({
  lessonId: z.string().uuid(),
  questionId: z.string().min(1).max(200),
  selectedIndex: z.number().int().min(0).max(50),
  correct: z.boolean(),
});

export async function markLessonCompletedAction(
  lessonId: string,
): Promise<{ ok: boolean }> {
  const user = await requireUser();
  const parsed = lessonIdSchema.safeParse(lessonId);
  if (!parsed.success) return { ok: false };
  await markLessonCompleted(db, { userId: user.id, lessonId: parsed.data });
  return { ok: true };
}

export async function recordQuizAttemptAction(input: {
  lessonId: string;
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}): Promise<{ ok: boolean }> {
  const user = await requireUser();
  const parsed = quizAttemptSchema.safeParse(input);
  if (!parsed.success) return { ok: false };
  await recordQuizAttempt(db, { userId: user.id, ...parsed.data });
  return { ok: true };
}
