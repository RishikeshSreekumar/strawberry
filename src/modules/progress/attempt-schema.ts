import { z } from "zod";

/**
 * Validation for recordQuizAttemptAction input (client-supplied, so
 * untrusted). Lives outside actions.ts because a "use server" module may
 * only export async functions.
 */

const MAX_OPTION_INDEX = 50;

const questionResponseSchema = z.union([
  // Multiple-correct quiz: ticked options, authored order, sorted, unique.
  z.strictObject({
    selected: z
      .array(z.number().int().min(0).max(MAX_OPTION_INDEX))
      .min(1)
      .max(MAX_OPTION_INDEX + 1)
      .refine((a) => a.every((v, i) => i === 0 || v > a[i - 1]), {
        message: "selected must be sorted and unique",
      }),
  }),
  // Numeric question: the parsed value (z.number() rejects NaN/Infinity).
  z.strictObject({ value: z.number() }),
]);

export const quizAttemptSchema = z
  .object({
    lessonId: z.string().uuid(),
    questionId: z.string().min(1).max(200),
    /** Authored option index; -1 when the answer is in `response`. */
    selectedIndex: z.number().int().min(-1).max(MAX_OPTION_INDEX),
    correct: z.boolean(),
    response: questionResponseSchema.optional(),
  })
  .refine((a) => (a.selectedIndex === -1) === (a.response !== undefined), {
    message: "send selectedIndex -1 with a response, or an index without one",
  });
