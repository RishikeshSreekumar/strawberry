import { z } from "zod";

/**
 * Lesson content is stored as a JSONB array of typed blocks
 * (see tech_plan.md §3). Every block type added here needs a
 * matching case in the BlockRenderer.
 */

export const CURRENT_SCHEMA_VERSION = 1;

export const textBlockSchema = z.object({
  type: z.literal("text"),
  /** Markdown-ish plain text for now; rich text editing comes later. */
  content: z.string().min(1),
});

export const mathBlockSchema = z.object({
  type: z.literal("math"),
  /** LaTeX source rendered with KaTeX in display mode. */
  latex: z.string().min(1),
});

export const calloutBlockSchema = z.object({
  type: z.literal("callout"),
  variant: z.enum(["info", "tip", "warning", "definition"]),
  title: z.string().optional(),
  content: z.string().min(1),
});

export const lessonBlockSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  mathBlockSchema,
  calloutBlockSchema,
]);

export const lessonBlocksSchema = z.array(lessonBlockSchema);

export type TextBlock = z.infer<typeof textBlockSchema>;
export type MathBlock = z.infer<typeof mathBlockSchema>;
export type CalloutBlock = z.infer<typeof calloutBlockSchema>;
export type LessonBlock = z.infer<typeof lessonBlockSchema>;

export function parseLessonBlocks(input: unknown): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}
