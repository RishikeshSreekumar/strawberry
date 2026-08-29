import { z } from "zod";

/**
 * Lesson content is stored as a JSONB array of typed blocks
 * (see tech_plan.md §3). Every block type added here needs a
 * matching case in the BlockRenderer.
 *
 * Text-bearing fields (text/callout content, table cells, quiz text)
 * support inline math with $...$ delimiters, rendered via KaTeX.
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

export const tableBlockSchema = z.object({
  type: z.literal("table"),
  headers: z.array(z.string()).min(1),
  rows: z.array(z.array(z.string())).min(1),
});

/**
 * Multiple-choice question with per-option feedback. `variant` shades the
 * framing: practice (low stakes), concept (misconception check),
 * mastery (end-of-lesson check).
 */
export const quizBlockSchema = z.object({
  type: z.literal("quiz"),
  /** Stable identifier for attempt tracking; survives republishes. */
  id: z.string().min(1).optional(),
  variant: z.enum(["practice", "concept", "mastery"]),
  question: z.string().min(1),
  options: z
    .array(
      z.object({
        text: z.string().min(1),
        correct: z.boolean().optional(),
        feedback: z.string().optional(),
      }),
    )
    .min(2),
  hint: z.string().optional(),
});

// ---------- Interactive components ----------
// Expressions use the safe evaluator grammar in lib/math-eval.ts
// (variable x plus any declared parameter names).

const plotWindowSchema = z.object({
  xmin: z.number(),
  xmax: z.number(),
  ymin: z.number(),
  ymax: z.number(),
});

/** Slider input → function → output. The taxi-fare machine. */
export const functionMachineSchema = z.object({
  component: z.literal("function-machine"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
  inputLabel: z.string().default("Input"),
  outputLabel: z.string().default("Output"),
  inputUnit: z.string().optional(),
  outputPrefix: z.string().optional(),
});

/** Pick an input value and watch f(value) evaluated step by step. */
export const functionEvaluatorSchema = z.object({
  component: z.literal("function-evaluator"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  /** Function name shown in notation, e.g. "f" or "g". */
  name: z.string().default("f"),
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

/** Graph with a draggable point synced to formula and table. */
export const graphExplorerSchema = z.object({
  component: z.literal("graph-explorer"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  window: plotWindowSchema,
  initial: z.number(),
  /** x-values excluded from the domain (the plot refuses to evaluate there). */
  excluded: z.array(z.number()).default([]),
});

/** Base graph plus a parameterized transform driven by sliders. */
export const transformPlaygroundSchema = z.object({
  component: z.literal("transform-playground"),
  baseExpr: z.string().min(1),
  baseLatex: z.string().min(1),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  params: z
    .array(
      z.object({
        name: z.string().min(1),
        min: z.number(),
        max: z.number(),
        step: z.number().positive(),
        initial: z.number(),
      }),
    )
    .min(1),
  window: plotWindowSchema,
});

/** Flip between the common function families calculus reuses. */
export const familyGallerySchema = z.object({
  component: z.literal("family-gallery"),
  families: z
    .array(
      z.object({
        label: z.string().min(1),
        expr: z.string().min(1),
        latex: z.string().min(1),
        /** Skip plotting where the function is undefined, e.g. 0 for 1/x. */
        excluded: z.array(z.number()).default([]),
        xminOverride: z.number().optional(),
      }),
    )
    .min(2),
  window: plotWindowSchema,
});

/** x → g → g(x) → f → f(g(x)) pipeline with a slider. */
export const compositionMachineSchema = z.object({
  component: z.literal("composition-machine"),
  innerExpr: z.string().min(1),
  innerLatex: z.string().min(1),
  innerLabel: z.string().default("g"),
  outerExpr: z.string().min(1),
  outerLatex: z.string().min(1),
  outerLabel: z.string().default("f"),
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

/** Two-piece function; highlights the active rule as x moves. */
export const piecewiseExplorerSchema = z.object({
  component: z.literal("piecewise-explorer"),
  breakpoint: z.number(),
  /** Which side owns the breakpoint (closed circle). */
  breakBelongsTo: z.enum(["left", "right"]),
  leftExpr: z.string().min(1),
  leftLatex: z.string().min(1),
  rightExpr: z.string().min(1),
  rightLatex: z.string().min(1),
  window: plotWindowSchema,
  initial: z.number(),
});

/** Secant slope explorer: fixed x₁, movable x₂, watch Δf/Δx — until 0/0. */
export const secantExplorerSchema = z.object({
  component: z.literal("secant-explorer"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  x1: z.number(),
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
  window: plotWindowSchema,
});

/**
 * Approach a target x-value from both sides (or grow x without bound) and
 * watch f(x) settle — or refuse to. The workhorse of the limits chapter.
 */
export const limitExplorerSchema = z.object({
  component: z.literal("limit-explorer"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  /** Finite target for x → a, or "infinity" for end behaviour. */
  target: z.union([z.number(), z.literal("infinity")]),
  /** Draw an open circle at the target: the function is undefined there. */
  hole: z.boolean().default(false),
  /** The function's actual (different) value at the target, plotted as a filled dot. */
  valueAtTarget: z.number().optional(),
  /** Dashed horizontal asymptote (used with target: "infinity"). */
  asymptote: z.number().optional(),
  window: plotWindowSchema,
});

/**
 * The ε–δ guarantee game: pick a tolerance ε around the limit L and see the
 * input window δ around a that keeps f inside it.
 */
export const epsilonDeltaSchema = z.object({
  component: z.literal("epsilon-delta"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  target: z.number(),
  limitValue: z.number(),
  /** Tolerances offered by the slider, largest first. */
  epsilons: z.array(z.number().positive()).min(2),
  window: plotWindowSchema,
});

export const interactiveConfigSchema = z.discriminatedUnion("component", [
  functionMachineSchema,
  functionEvaluatorSchema,
  graphExplorerSchema,
  transformPlaygroundSchema,
  familyGallerySchema,
  compositionMachineSchema,
  piecewiseExplorerSchema,
  secantExplorerSchema,
  limitExplorerSchema,
  epsilonDeltaSchema,
]);

export const interactiveBlockSchema = z.object({
  type: z.literal("interactive"),
  config: interactiveConfigSchema,
});

export const lessonBlockSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  mathBlockSchema,
  calloutBlockSchema,
  tableBlockSchema,
  quizBlockSchema,
  interactiveBlockSchema,
]);

export const lessonBlocksSchema = z.array(lessonBlockSchema);

export type TextBlock = z.infer<typeof textBlockSchema>;
export type MathBlock = z.infer<typeof mathBlockSchema>;
export type CalloutBlock = z.infer<typeof calloutBlockSchema>;
export type TableBlock = z.infer<typeof tableBlockSchema>;
export type QuizBlock = z.infer<typeof quizBlockSchema>;
export type InteractiveBlock = z.infer<typeof interactiveBlockSchema>;
export type InteractiveConfig = z.infer<typeof interactiveConfigSchema>;
export type PlotWindow = z.infer<typeof plotWindowSchema>;
export type LessonBlock = z.infer<typeof lessonBlockSchema>;

export function parseLessonBlocks(input: unknown): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}
