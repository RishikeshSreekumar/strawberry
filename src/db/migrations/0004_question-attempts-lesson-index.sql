DROP INDEX "question_attempts_user_question_idx";--> statement-breakpoint
CREATE INDEX "question_attempts_user_lesson_idx" ON "question_attempts" USING btree ("user_id","lesson_id","attempted_at");