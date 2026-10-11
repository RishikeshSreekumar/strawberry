import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { lessons } from "./content";

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    status: text("status", { enum: ["started", "completed"] })
      .notNull()
      .default("started"),
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
    lastActivityAt: timestamp("last_activity_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("lesson_progress_user_lesson_idx").on(t.userId, t.lessonId)],
);

/**
 * What the learner answered, for question types a single option index
 * can't describe. Option indices are in authored order.
 * - multiple-correct quiz: { selected: [0, 2] } (sorted, non-empty)
 * - numeric: { value: 0.75 } (the parsed number, not the raw text)
 */
export type QuestionResponse = { selected: number[] } | { value: number };

export const questionAttempts = pgTable(
  "question_attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    /** Stable question block id from the lesson content (quiz/numeric `id`). */
    questionId: text("question_id").notNull(),
    /**
     * Chosen option (authored order) for a single-correct quiz; -1 for
     * question types recorded in `response` instead.
     */
    selectedIndex: integer("selected_index").notNull(),
    correct: boolean("correct").notNull(),
    /** Null for single-correct quizzes (selectedIndex says it all). */
    response: jsonb("response").$type<QuestionResponse>(),
    attemptedAt: timestamp("attempted_at").notNull().defaultNow(),
  },
  // Serves getLessonQuestionAttempts: one learner's attempts in one
  // lesson, in attempt order.
  (t) => [
    index("question_attempts_user_lesson_idx").on(t.userId, t.lessonId, t.attemptedAt),
  ],
);
