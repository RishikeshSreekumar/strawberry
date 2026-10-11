import { z } from "zod";
import { isNumericAnswerCorrect } from "../lib/numeric-answer";
import { srfExpressionError, srfShadedRegions } from "../lib/srf";
import { seqExpressionError } from "../lib/seq";

/**
 * Lesson content is stored as a JSONB array of typed blocks
 * (see tech_plan.md §3). Every block type added here needs a
 * matching case in the BlockRenderer.
 *
 * Text-bearing fields (text/callout content, table cells, quiz text)
 * support inline math with $...$ delimiters, rendered via KaTeX.
 *
 * Questions: `quiz` (single-correct or, with `multiple: true`, select-all
 * MCQ) and `numeric` (typed number answer). See the authoring note on
 * quizBlockSchema for which to use.
 *
 * Solved problems ("Worked example 3", "Pattern 1", "Example: ...") go in a
 * `worked-example` block, not in text + math runs: see the authoring note
 * on workedExampleBlockSchema below.
 */

export const CURRENT_SCHEMA_VERSION = 1;

export const textBlockSchema = z.object({
  type: z.literal("text"),
  /**
   * Markdown-ish plain text: blank lines separate paragraphs, single
   * newlines break lines, and lines starting "- ", "* ", "• " or "1. " /
   * "1) " form lists (see lib/text-structure.ts). Same for callout content.
   */
  content: z.string().min(1),
});

/**
 * Section heading inside a lesson. Gets a stable anchor id slugged from its
 * text (lib/headings.ts); two or more level-2 headings produce an
 * "On this page" table of contents. Level defaults to 2.
 */
export const headingBlockSchema = z.object({
  type: z.literal("heading"),
  text: z.string().regex(/\S/, "heading text must not be blank"),
  level: z.union([z.literal(2), z.literal(3)]).optional(),
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
 * Narrated explainer video. Chapter overview videos are rendered from
 * videos/scenes/*.py (see videos/render.py) into public/videos/.
 */
export const videoBlockSchema = z.object({
  type: z.literal("video"),
  /** Site-relative path (e.g. "/videos/trig-0-angles-and-ratios.mp4") or absolute URL. */
  src: z.string().min(1),
  poster: z.string().min(1).optional(),
  title: z.string().optional(),
  caption: z.string().optional(),
});

/**
 * AUTHORING: which question block to use.
 * - `quiz` (single correct, the default): exactly one option is right. Use
 *   for conceptual checks and for JEE single-correct MCQs. Write wrong
 *   options that encode real misconceptions and give each one `feedback`.
 * - `quiz` with `multiple: true` (JEE "one or more correct"): the learner
 *   ticks every option that applies and presses Check; the answer counts
 *   only if the ticked set equals the set of correct options exactly (no
 *   partial credit). One correct option is allowed, as in JEE Advanced: the
 *   learner is not told how many to pick. Don't use it for a question that
 *   just happens to have one answer and doesn't need "select all".
 * - `numeric` (JEE numerical / integer type): the answer is a number the
 *   learner types (integer, decimal, fraction like 3/4, or 1.6e-19). Prefer
 *   it over an MCQ whenever the options would just be four candidate
 *   numbers; MCQ options leak the answer by elimination and estimation.
 *   Integer-type questions use the default tolerance (exact). Put the unit
 *   in `unit`, never in the number, and a worked `solution` for anything
 *   past a one-step calculation.
 *
 * Multiple-choice question with per-option feedback. `variant` shades the
 * framing: practice (low stakes), concept (misconception check),
 * mastery (end-of-lesson check). Option indices (attempt tracking) always
 * refer to authored order, whatever order the options are displayed in.
 *
 * Correct options: exactly one without `multiple`; at least one with
 * `multiple: true`. A quiz with no correct option is always rejected.
 */
export const quizBlockSchema = z
  .object({
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
    /**
     * Options are shown in a deterministic shuffled order (see
     * lib/quiz-shuffle.ts). Set false when an option refers to another by
     * position ("all of the above", "A and B"). Absent means true.
     */
    shuffle: z.boolean().optional(),
    /**
     * "Select all that apply": checkboxes plus a Check button, graded on
     * the exact set of correct options. Absent means single-correct.
     */
    multiple: z.boolean().optional(),
  })
  .superRefine((quiz, ctx) => {
    const correct = quiz.options.filter((o) => o.correct).length;
    if (correct === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "a quiz needs at least one correct option",
      });
    } else if (correct > 1 && !quiz.multiple) {
      ctx.addIssue({
        code: "custom",
        path: ["multiple"],
        message: `${correct} options are marked correct: set multiple: true for a "select all that apply" question, or mark exactly one`,
      });
    }
  });

/**
 * Numerical-answer question (JEE numerical value / integer type): the
 * learner types a number and presses Check. See the authoring note on
 * quizBlockSchema for when to use it.
 *
 * Grading (lib/numeric-answer.ts): a response x is correct when
 * |x - answer| <= max(tolerance, relTolerance * |answer|), plus a tiny
 * floating-point allowance. Both absent means exact (integer type).
 * The learner may type decimals, negatives, fractions ("3/4"), scientific
 * notation ("1.6e-19", "1.6 x 10^-19") and a unicode minus.
 *
 * Rich-text fields (text-block conventions, $math$): `question`, `unit`,
 * `hint`, `solution`, and each common mistake's `feedback`.
 */
export const numericBlockSchema = z
  .object({
    type: z.literal("numeric"),
    /** Stable identifier for attempt tracking; survives republishes. */
    id: z.string().min(1).optional(),
    variant: z.enum(["practice", "concept", "mastery"]),
    question: z.string().regex(/\S/, "question must not be blank"),
    /** The correct value, in the unit given by `unit`. */
    answer: z.number(),
    /** Absolute tolerance, in the answer's unit (e.g. 0.01). Default 0. */
    tolerance: z.number().min(0).optional(),
    /**
     * Relative tolerance as a fraction of |answer| (0.01 = 1%). Default 0.
     * An answer of 0 needs an absolute `tolerance` instead.
     */
    relTolerance: z.number().min(0).max(1).optional(),
    /** Unit shown after the input box, e.g. "m/s" or "$\\text{m s}^{-2}$". */
    unit: z.string().regex(/\S/, "unit must not be blank").optional(),
    hint: z.string().regex(/\S/, "hint must not be blank").optional(),
    /**
     * Worked solution (StructuredText: paragraphs, lists, $math$). Shown
     * once the learner is correct, or on request after two wrong attempts.
     */
    solution: z.string().regex(/\S/, "solution must not be blank").optional(),
    /**
     * Targeted feedback for predictable wrong answers (sign error, forgot
     * to square, wrong unit prefix). `tolerance` is absolute and defaults
     * to the question's own tolerance rule.
     */
    commonMistakes: z
      .array(
        z.object({
          answer: z.number(),
          tolerance: z.number().min(0).optional(),
          feedback: z.string().regex(/\S/, "feedback must not be blank"),
        }),
      )
      .min(1)
      .optional(),
  })
  .superRefine((block, ctx) => {
    if (block.answer === 0 && block.relTolerance && !(block.tolerance && block.tolerance > 0)) {
      ctx.addIssue({
        code: "custom",
        path: ["tolerance"],
        message:
          "relTolerance is a fraction of |answer| and so accepts nothing around an answer of 0: give an absolute tolerance",
      });
    }
    block.commonMistakes?.forEach((mistake, i) => {
      // The correct-answer check would accept this "mistake" first.
      if (isNumericAnswerCorrect(mistake.answer, block)) {
        ctx.addIssue({
          code: "custom",
          path: ["commonMistakes", i, "answer"],
          message: `common mistake ${mistake.answer} is within the accepted tolerance of the answer ${block.answer}`,
        });
      }
    });
  });

/**
 * A solved problem the learner can attempt before seeing the solution.
 *
 * AUTHORING: when to use worked-example instead of text/math blocks.
 * - Use it whenever the lesson poses a concrete problem and then solves it:
 *   "**Worked example 3.** A ball is thrown...", "Pattern 1: solve
 *   $2\sin x = 1$", "Example: find the determinant of...". The lead-in
 *   ("Worked example 3", "Pattern 1") becomes `title`; the question becomes
 *   `problem`; each numbered step or derivation line becomes one `steps`
 *   entry; the final result goes in `answer`.
 * - Keep using text/math/callout for exposition, derivations of the theory
 *   itself, and general strategy ("to solve any such equation, first...").
 *   If there is no specific question a learner could try, it is not a
 *   worked example.
 * - One step = one move a learner could check on their own: a sentence of
 *   reasoning (`text`) and/or the line of algebra it produces (`latex`).
 *   Put the explanation in `text` and the equation in `latex` rather than
 *   wrapping display math in `$$...$$` inside text.
 * - Set `tryFirst: false` only for a demonstration the learner cannot
 *   sensibly attempt yet (e.g. the very first example introducing a
 *   brand-new method); then every step is shown at once.
 * - The last step derives the result; `answer` restates it in one line
 *   with units. Don't add a separate "Answer: ..." step.
 * - A heading before a group of examples ("Worked examples") is fine; the
 *   block itself never creates a heading or a TOC entry.
 *
 * - Tables belong inside the example, not as separate table blocks around
 *   it: data given in the question goes in `problemTable` (shown under the
 *   problem, always visible); a table built while solving (frequency table,
 *   fx / cumulative-frequency columns) goes in that step's `table`.
 *
 * Fields: `title` is inline rich text ($math$, **bold**; no paragraphs or
 * lists). `problem`, step `text` and `answer` follow the text-block
 * conventions (paragraphs, "- " / "1. " lists, $math$, $$display$$,
 * **bold**). Step `latex` is raw LaTeX rendered with KaTeX in
 * display mode (like a math block). `problemTable` and step `table` have the
 * table block's shape; each cell is inline rich text ($math$, **bold**).
 * Each step needs at least one of `text`, `latex`, `table`; a step renders
 * them in the order text, table, latex (split into two steps for another
 * order).
 */
export const tableDataSchema = z.object({
  headers: z.array(z.string()).min(1),
  rows: z.array(z.array(z.string())).min(1),
});

export const workedExampleStepSchema = z
  .object({
    text: z.string().regex(/\S/, "step text must not be blank").optional(),
    latex: z.string().regex(/\S/, "step latex must not be blank").optional(),
    table: tableDataSchema.optional(),
  })
  .refine(
    (step) => step.text !== undefined || step.latex !== undefined || step.table !== undefined,
    { message: "a worked-example step needs text, latex or a table" },
  );

export const workedExampleBlockSchema = z.object({
  type: z.literal("worked-example"),
  /** Optional stable identifier (future reveal tracking); survives republishes. */
  id: z.string().min(1).optional(),
  /** Short label, e.g. "Worked example 3" or "Pattern 1: $\\sin x = k$". */
  title: z.string().regex(/\S/, "title must not be blank").optional(),
  problem: z.string().regex(/\S/, "problem must not be blank"),
  /** Data given in the question, shown under the problem (never hidden). */
  problemTable: tableDataSchema.optional(),
  steps: z.array(workedExampleStepSchema).min(1),
  answer: z.string().regex(/\S/, "answer must not be blank").optional(),
  /**
   * Hide the steps behind "Show first step" / "Next step" / "Show all" so
   * the learner attempts the problem first. Absent means true.
   */
  tryFirst: z.boolean().optional(),
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

// ---------- Trigonometry interactives ----------

/**
 * Right triangle with a draggable angle and an independent size slider:
 * the side lengths move, the ratios do not. Chapter 0's workhorse.
 */
export const rightTriangleExplorerSchema = z.object({
  component: z.literal("right-triangle-explorer"),
  /** Angle at the lower-left vertex, in degrees. */
  initialAngle: z.number(),
  minAngle: z.number().default(10),
  maxAngle: z.number().default(80),
  /** Hypotenuse length, in the units the labels use. */
  initialScale: z.number().default(5),
  minScale: z.number().default(2),
  maxScale: z.number().default(10),
  /** Show the size slider (the similar-triangle demonstration). */
  showScale: z.boolean().default(true),
  /** Which ratios get a live readout. */
  ratios: z.array(z.enum(["sin", "cos", "tan"])).default(["sin", "cos", "tan"]),
  angleLabel: z.string().default("\\theta"),
  unit: z.string().default(""),
  caption: z.string().optional(),
});

/**
 * The unit circle with a draggable angle: coordinates, the dropped right
 * triangle, quadrant signs, the reference angle, and tan as the slope of
 * the radius. Chapter 1's workhorse, reused in 4.1.
 */
export const unitCircleSchema = z.object({
  component: z.literal("unit-circle"),
  /** Angle in degrees; may run past 360 or below 0 to show coterminal angles. */
  initialAngle: z.number(),
  minAngle: z.number().default(-360),
  maxAngle: z.number().default(720),
  step: z.number().positive().default(1),
  /** Drop the right triangle from the point to the x-axis. */
  showTriangle: z.boolean().default(true),
  showCoordinates: z.boolean().default(true),
  /** Highlight the acute angle to the nearest half of the x-axis. */
  showReferenceAngle: z.boolean().default(false),
  /** Show tan as the slope of the radius, with its sign. */
  showTangent: z.boolean().default(false),
  /** Print the angle in radians alongside degrees. */
  showRadians: z.boolean().default(true),
  caption: z.string().optional(),
});

/**
 * Circle on the left, graph on the right, one shared angle: the moment the
 * circle becomes a wave. Also runs the tangent case, where the trace
 * escapes vertically instead of oscillating.
 */
export const circleToWaveSchema = z.object({
  component: z.literal("circle-to-wave"),
  fn: z.enum(["sin", "cos", "tan"]).default("sin"),
  /** How far the trace can run, in radians. */
  maxRadians: z.number().default(2 * Math.PI),
  initialAngle: z.number().default(0),
  caption: z.string().optional(),
});

/** a*sin(b(x - c)) + d against its untransformed base curve. */
export const sinusoidPlaygroundSchema = z.object({
  component: z.literal("sinusoid-playground"),
  fn: z.enum(["sin", "cos"]).default("sin"),
  initialA: z.number().default(1),
  initialB: z.number().default(1),
  initialC: z.number().default(0),
  initialD: z.number().default(0),
  window: plotWindowSchema,
  /** Optional target curve for "match this graph" exercises. */
  target: z
    .object({ a: z.number(), b: z.number(), c: z.number(), d: z.number() })
    .optional(),
  caption: z.string().optional(),
});

/**
 * The angle-sum construction: two stacked right triangles inside a unit
 * radius, with every segment labelled by the product it equals. Drives the
 * derivation of sin(a+b) and cos(a+b) in 3.3.
 */
export const identityDiagramSchema = z.object({
  component: z.literal("identity-diagram"),
  initialAlpha: z.number().default(30),
  initialBeta: z.number().default(25),
  /** Which of the two results the numeric check displays. */
  highlight: z.enum(["sin", "cos", "both"]).default("both"),
  caption: z.string().optional(),
});

/**
 * A horizontal line dragged across a trig graph, with every solution in a
 * chosen interval marked and listed. Makes "infinitely many answers"
 * something you can watch rather than assert.
 */
export const equationSolutionViewerSchema = z.object({
  component: z.literal("equation-solution-viewer"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  initialLevel: z.number().default(0.5),
  minLevel: z.number().default(-1.5),
  maxLevel: z.number().default(1.5),
  levelStep: z.number().positive().default(0.1),
  /** Interval the solutions are counted in (defaults to the plot window). */
  intervalMin: z.number().optional(),
  intervalMax: z.number().optional(),
  /** x-values where the expression is undefined; sign changes there are ignored. */
  excluded: z.array(z.number()).default([]),
  window: plotWindowSchema,
  caption: z.string().optional(),
});

/**
 * A general (non-right) triangle. In "sas" mode two sides and the included
 * angle are adjustable and the law of cosines closes the triangle; in
 * "ssa" mode the third side swings, so zero, one or two triangles fit.
 */
export const triangleSolverSchema = z.object({
  component: z.literal("triangle-solver"),
  mode: z.enum(["sas", "ssa"]).default("sas"),
  /** Side b (SAS: adjacent to A; SSA: the fixed side next to A). */
  initialB: z.number().default(6),
  /** Side c in SAS mode. */
  initialC: z.number().default(8),
  /** Side a in SSA mode: the one opposite the given angle, swung to fit. */
  initialA: z.number().default(5),
  /** The given angle at vertex A, in degrees. */
  initialAngle: z.number().default(40),
  /** Show the law-of-sines ratio readouts. */
  showLawOfSines: z.boolean().default(true),
  caption: z.string().optional(),
});

// ---------- Vector Algebra interactives ----------

const vec2Schema = z.tuple([z.number(), z.number()]);
const vec3Schema = z.tuple([z.number(), z.number(), z.number()]);

const vecRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

/**
 * The 2D vector canvas: a square-unit grid with draggable arrow tips (and
 * tails) and live KaTeX readouts. One component drives every plane
 * construction in the Vector Algebra course (Ch 0-3). In the point modes
 * (position, section, triangle) a/b/c are the points A, B, C; otherwise
 * they are vectors drawn from the origin.
 */
export const vecCanvas2dSchema = z.object({
  component: z.literal("vec-canvas-2d"),
  mode: z
    .enum([
      "free",
      "add",
      "subtract",
      "scale",
      "position",
      "components",
      "section",
      "triangle",
      "combination",
      "dot",
    ])
    .default("free"),
  /** Vector a (tip, drawn from the origin; from `tail` in free mode) or point A. */
  a: vec2Schema.default([3, 1]),
  /** Vector b (in add mode drawn from the tip of a) or point B. */
  b: vec2Schema.default([1, 3]),
  /** Point C (triangle mode only). */
  c: vec2Schema.default([-2, -1]),
  /** Tail of the arrow in free mode. */
  tail: vec2Schema.default([0, 0]),
  /** Handles the student may drag; omitted = a sensible per-mode default. */
  draggable: z.array(z.enum(["a", "b", "c", "tail"])).optional(),
  /** Snap dragged handles to integer grid points (else to tenths). */
  snap: z.boolean().default(true),
  window: plotWindowSchema.default({ xmin: -6, xmax: 6, ymin: -5, ymax: 5 }),
  /** add mode: also draw b from the origin and a from the tip of b. */
  showParallelogram: z.boolean().default(false),
  /** scale mode: the k slider. */
  scalar: vecRangeSchema.default({ min: -3, max: 3, step: 0.5, initial: 2 }),
  /** section mode: integer-friendly m and n sliders; P divides AB in m:n. */
  ratio: z
    .object({
      m: vecRangeSchema.default({ min: 1, max: 5, step: 1, initial: 2 }),
      n: vecRangeSchema.default({ min: 1, max: 5, step: 1, initial: 3 }),
      /** Offer an internal/external toggle. */
      allowExternal: z.boolean().default(false),
      /** Start in external division. */
      external: z.boolean().default(false),
    })
    .prefault({}),
  /** combination mode: sliders for x and y in x·a + y·b. */
  combo: z
    .object({
      x: vecRangeSchema.default({ min: -3, max: 3, step: 0.5, initial: 1 }),
      y: vecRangeSchema.default({ min: -3, max: 3, step: 0.5, initial: 1 }),
    })
    .prefault({}),
  /** dot mode: the shadow of b on the line of a. */
  showProjection: z.boolean().default(true),
  /** dot mode: split b into parts parallel and perpendicular to a. */
  showPerpendicular: z.boolean().default(false),
  /** Live values to show; omitted = a sensible per-mode default. */
  readouts: z
    .array(z.enum(["magnitude", "angle", "components", "dot", "projection", "ratio", "sum"]))
    .optional(),
  /** LaTeX names. Default \vec a, \vec b, \vec c (or A, B, C in point modes). */
  labels: z
    .object({ a: z.string().optional(), b: z.string().optional(), c: z.string().optional() })
    .default({}),
  caption: z.string().optional(),
});

/**
 * Rotatable 3D view (SVG projection, drag to rotate; right-handed axes, z
 * up) for the constructions that only make sense in space: the box whose
 * diagonal is |r|, direction angles, the cross product as the normal of
 * the spanned parallelogram, and the triple product as a volume.
 */
export const vecSpace3dSchema = z.object({
  component: z.literal("vec-space-3d"),
  mode: z.enum(["components", "direction-angles", "cross", "triple"]).default("components"),
  a: vec3Schema.default([3, 4, 2]),
  /** cross/triple; defaults to [1,3,0] (cross) or [4,0,0] (triple). */
  b: vec3Schema.optional(),
  /** triple; defaults to [1,3,0]. */
  c: vec3Schema.optional(),
  /**
   * Editable parameters. ax/ay/az override a's components. angle (cross):
   * the angle in degrees from a to b, turning b in the plane of a and b.
   * tilt (triple): the angle in degrees of a above the base plane of b, c.
   */
  sliders: z
    .array(
      z.object({
        name: z.enum(["ax", "ay", "az", "angle", "tilt"]),
        min: z.number(),
        max: z.number(),
        step: z.number().positive(),
        initial: z.number(),
      }),
    )
    .default([]),
  showBox: z.boolean().default(true),
  showAngles: z.boolean().default(true),
  showNormal: z.boolean().default(true),
  showParallelogram: z.boolean().default(true),
  /** Live values to show; omitted = a sensible per-mode default. */
  readouts: z
    .array(z.enum(["magnitude", "direction-cosines", "cross", "area", "volume", "dot"]))
    .optional(),
  /** Camera azimuth (yaw, from +x toward +y) and elevation (pitch), degrees. */
  initialView: z.object({ yaw: z.number(), pitch: z.number() }).default({ yaw: 35, pitch: 22 }),
  caption: z.string().optional(),
});

// ---------- Permutations, Combinations & the Binomial Theorem interactives ----------

const pncTreeStageSchema = z.object({
  /** What is being decided at this stage, e.g. "Shirt". */
  label: z.string().min(1),
  /** The choices; every node of the previous stage branches into all of them. */
  options: z.array(z.string().min(1)).min(1).max(6),
});

/**
 * A decision tree that grows stage by stage with a live leaf count: one
 * multiplying tree (product rule) or several disjoint trees whose leaf
 * counts add (sum rule).
 */
export const pncCountingTreeSchema = z
  .object({
    component: z.literal("pnc-counting-tree"),
    mode: z.enum(["product", "sum"]).default("product"),
    /** product mode: the stages of the single tree (1-4). */
    stages: z.array(pncTreeStageSchema).max(4).default([]),
    /** sum mode: the disjoint cases, each its own small tree (2-4 cases). */
    branches: z
      .array(
        z.object({
          label: z.string().min(1),
          stages: z.array(pncTreeStageSchema).min(1).max(3),
        }),
      )
      .max(4)
      .optional(),
    /** Start from the root and grow one stage per "Next stage" click. */
    revealStages: z.boolean().default(true),
    /** Live "3 × 4 × 2 = 24" (or "6 + 4 = 10") readout. */
    showFormula: z.boolean().default(true),
    /**
     * Option labels of one root-to-leaf path to trace, stage by stage. In sum
     * mode the first entry is the branch (case) label.
     */
    highlightPath: z.array(z.string().min(1)).optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.mode === "product" && cfg.stages.length === 0) {
      ctx.addIssue({ code: "custom", path: ["stages"], message: "product mode needs at least one stage" });
    }
    if (cfg.mode === "sum" && (!cfg.branches || cfg.branches.length < 2)) {
      ctx.addIssue({ code: "custom", path: ["branches"], message: "sum mode needs at least two branches" });
    }
  });

/**
 * Lists every arrangement of a small multiset (copies treated as labelled)
 * and colours the arrangements that collapse into the same class, so that
 * total ÷ class size = count is seen, not stated.
 */
export const pncArrangementListerSchema = z
  .object({
    component: z.literal("pnc-arrangement-lister"),
    /** The multiset; repeated strings are identical items. At most 8. */
    items: z.array(z.string().min(1)).min(1).max(8),
    /** Slots to fill; default all items. */
    r: z.number().int().min(1).max(8).optional(),
    /** Which arrangements count as the same; one colour per class. */
    groupBy: z
      .enum(["none", "selection", "identical", "rotation", "rotation-reflection"])
      .default("none"),
    /** Draw each arrangement as a row or around a circle. */
    mode: z.enum(["line", "circular"]).default("line"),
    /** stars-bars: items are "*" and "|"; each word is shown with its per-box counts. */
    display: z.enum(["sequence", "stars-bars"]).default("sequence"),
    /** Subscript identical copies (A₁, A₂) so the overcount is visible. */
    showLabels: z.boolean().default(false),
    /** Slot diagram "4 × 3 × 2" above the list. */
    showSlots: z.boolean().default(false),
    /** Cap on listed arrangements; the counts are always shown. */
    maxShown: z.number().int().min(1).max(720).default(120),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.r !== undefined && cfg.r > cfg.items.length) {
      ctx.addIssue({ code: "custom", path: ["r"], message: "r cannot exceed the number of items" });
    }
  });

/**
 * Pascal's triangle (rows 0..rows): count the paths to an entry, highlight a
 * pattern, or read row n as the coefficients of (a + b)^n.
 */
export const pncPascalTriangleSchema = z
  .object({
    component: z.literal("pnc-pascal-triangle"),
    /** Last row shown (rows 0..rows). */
    rows: z.number().int().min(1).max(12).default(8),
    mode: z.enum(["paths", "highlight", "expansion"]).default("paths"),
    /** paths mode: the entry nCr whose paths are drawn (also the start selection elsewhere). */
    initialCell: z.object({ n: z.number().int().min(0), r: z.number().int().min(0) }).optional(),
    /** highlight mode: which pattern to light up. */
    pattern: z
      .enum(["row-sum", "symmetry", "hockey-stick", "odd-entries", "powers-of-11"])
      .default("row-sum"),
    /** expansion mode: LaTeX for the two terms of (a + b)^n. */
    expansion: z.object({ a: z.string().min(1), b: z.string().min(1) }).default({ a: "a", b: "b" }),
    /** Show each entry as nCr on hover and in the readout. */
    showFormula: z.boolean().default(true),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    const cell = cfg.initialCell;
    if (cell && (cell.n > cfg.rows || cell.r > cell.n)) {
      ctx.addIssue({ code: "custom", path: ["initialCell"], message: "initialCell must satisfy 0 <= r <= n <= rows" });
    }
  });

// ---------- Probability interactives ----------

const probDieFace = z.number().int().min(1).max(6);

/** An event on the two-dice sample space (or a set of faces in die mode, via `cells`). */
const probEventSchema = z.object({
  id: z.enum(["A", "B"]),
  /** Plain-text name shown in buttons, e.g. "sum is 7". */
  label: z.string().min(1),
  /** LaTeX for the readouts, e.g. "A" or "S_7"; defaults to the id. */
  latex: z.string().min(1).optional(),
  preset: z.enum(["sum-eq", "sum-ge", "sum-le", "doubles", "first-even", "first-eq", "second-eq", "max-eq", "custom"]),
  /** The number the preset compares against (sum-*, first-eq, second-eq, max-eq). */
  value: z.number().int().optional(),
  /** custom preset: the (die 1, die 2) cells in the event. */
  cells: z.array(z.tuple([probDieFace, probDieFace])).optional(),
});

const PROB_PRESETS_WITH_VALUE = new Set(["sum-eq", "sum-ge", "sum-le", "first-eq", "second-eq", "max-eq"]);

/**
 * Monte Carlo simulator with a sample-space view: coin, die, two dice on the
 * 6×6 grid (events, set operations, conditioning), an urn with or without
 * replacement, and Monty Hall. A running chart shows the relative frequency
 * settling towards the theoretical value.
 */
export const probSimulatorSchema = z
  .object({
    component: z.literal("prob-simulator"),
    mode: z.enum(["coin", "die", "two-dice", "urn", "monty-hall"]),
    /** coin: P(heads). */
    coinP: z.number().min(0).max(1).default(0.5),
    /** die / two-dice: relative weights of faces 1-6 (normalised); omit for a fair die. */
    dieWeights: z.array(z.number().min(0)).length(6).optional(),
    /** die mode: faces that count as "event A" when track = "event-A". */
    dieFaces: z.array(probDieFace).min(1).max(6).default([6]),
    /** two-dice: draw the 36-cell sample space. */
    showGrid: z.boolean().default(true),
    /** two-dice: events A and B (at most one of each). */
    events: z.array(probEventSchema).max(2).default([]),
    /** two-dice: the region shaded (and tracked) at the start. */
    combine: z.enum(["none", "union", "intersection", "complementA", "AnotB"]).default("none"),
    /** two-dice: buttons to switch between A∪B, A∩B, A′, A−B. */
    allowCombineToggle: z.boolean().default(false),
    /** two-dice: condition on this event (other cells greyed; tracks P(target | given)). */
    givenEvent: z.enum(["A", "B"]).optional(),
    /**
     * What the running chart plots. Defaults: coin → heads, die → value-mean,
     * two-dice → event-A (or sum-distribution when no events), urn → event-A,
     * monty-hall → stick-vs-switch.
     */
    track: z.enum(["event-A", "heads", "value-mean", "sum-distribution", "stick-vs-switch"]).optional(),
    /** Reference line for the tracked proportion; computed exactly when omitted. */
    theoretical: z.number().optional(),
    /** Show the theoretical reference (hide it to make students predict first). */
    showTheoretical: z.boolean().default(true),
    /** urn mode: contents and the tracked event "exactly trackCount balls of trackColor in `draws` draws". */
    urn: z
      .object({
        colors: z.array(z.object({ label: z.string().min(1), count: z.number().int().min(0).max(20) })).min(2).max(5),
        draws: z.number().int().min(1).max(10),
        replacement: z.boolean().default(false),
        allowReplacementToggle: z.boolean().default(true),
        trackColor: z.string().min(1),
        trackCount: z.number().int().min(0),
      })
      .optional(),
    /** monty-hall: number of doors (host opens all but one of the others). */
    montyDoors: z.number().int().min(3).max(100).default(3),
    /** Batch buttons: run this many trials at once. */
    batchSizes: z.array(z.number().int().min(1).max(10000)).min(1).max(5).default([1, 10, 100, 1000]),
    /** Seed for a reproducible random stream. */
    seed: z.number().int().optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    const ids = cfg.events.map((e) => e.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", path: ["events"], message: "event ids must be unique" });
    }
    cfg.events.forEach((e, i) => {
      if (PROB_PRESETS_WITH_VALUE.has(e.preset) && e.value === undefined) {
        ctx.addIssue({ code: "custom", path: ["events", i, "value"], message: `preset ${e.preset} needs a value` });
      }
      if (e.preset === "custom" && (!e.cells || e.cells.length === 0)) {
        ctx.addIssue({ code: "custom", path: ["events", i, "cells"], message: "custom preset needs cells" });
      }
    });
    const hasA = ids.includes("A");
    const hasB = ids.includes("B");
    const needsB = cfg.combine === "union" || cfg.combine === "intersection" || cfg.combine === "AnotB";
    if (cfg.mode === "two-dice") {
      if ((cfg.combine !== "none" || cfg.allowCombineToggle) && !hasA) {
        ctx.addIssue({ code: "custom", path: ["events"], message: "combining events needs event A" });
      }
      if ((needsB || cfg.allowCombineToggle) && !hasB) {
        ctx.addIssue({ code: "custom", path: ["events"], message: "union/intersection/difference need event B" });
      }
      if (cfg.givenEvent && !(hasA && hasB)) {
        ctx.addIssue({ code: "custom", path: ["givenEvent"], message: "conditioning needs both events A and B" });
      }
      if (cfg.track === "event-A" && !hasA) {
        ctx.addIssue({ code: "custom", path: ["track"], message: "track event-A needs event A" });
      }
    }
    const allowed: Record<string, string[]> = {
      coin: ["heads"],
      die: ["value-mean", "event-A", "sum-distribution"],
      "two-dice": ["event-A", "value-mean", "sum-distribution"],
      urn: ["event-A"],
      "monty-hall": ["stick-vs-switch"],
    };
    if (cfg.track && !allowed[cfg.mode].includes(cfg.track)) {
      ctx.addIssue({ code: "custom", path: ["track"], message: `track ${cfg.track} is not available in ${cfg.mode} mode` });
    }
    if (cfg.mode === "urn") {
      if (!cfg.urn) {
        ctx.addIssue({ code: "custom", path: ["urn"], message: "urn mode needs an urn" });
      } else {
        const total = cfg.urn.colors.reduce((s, c) => s + c.count, 0);
        if (total < 1 || total > 30) ctx.addIssue({ code: "custom", path: ["urn", "colors"], message: "the urn must hold 1-30 balls" });
        if (!cfg.urn.colors.some((c) => c.label === cfg.urn!.trackColor)) {
          ctx.addIssue({ code: "custom", path: ["urn", "trackColor"], message: "trackColor must be one of the colour labels" });
        }
        if (cfg.urn.trackCount > cfg.urn.draws) {
          ctx.addIssue({ code: "custom", path: ["urn", "trackCount"], message: "trackCount cannot exceed draws" });
        }
        if (cfg.urn.draws > total && (!cfg.urn.replacement || cfg.urn.allowReplacementToggle)) {
          ctx.addIssue({ code: "custom", path: ["urn", "draws"], message: "cannot draw more balls than the urn holds without replacement" });
        }
      }
    }
  });

/** A node of an explicit probability tree: `prob` is the probability of the branch INTO this node. */
export type ProbTreeNode = {
  label: string;
  prob?: number;
  probLatex?: string;
  children?: ProbTreeNode[];
};

const probTreeNodeSchema: z.ZodType<ProbTreeNode> = z.lazy(() =>
  z.object({
    label: z.string().min(1),
    prob: z.number().min(0).max(1).optional(),
    probLatex: z.string().min(1).optional(),
    children: z.array(probTreeNodeSchema).min(1).max(4).optional(),
  }),
);

const probLeafSelectorSchema = z.union([
  /** Explicit leaf paths: branch indices from the root joined by ".", e.g. "0.1". */
  z.array(z.string().regex(/^\d+(\.\d+)*$/)),
  /** Every leaf whose last branch has this label. */
  z.object({ matchLastStage: z.string().min(1) }),
  /** Every leaf whose path contains exactly k branches with this label. */
  z.object({ successCount: z.object({ label: z.string().min(1), k: z.number().int().min(0) }) }),
]);

/**
 * Multi-stage probability tree: path products at the leaves, a sum-to-1
 * check, an event whose leaves are summed (multiply along, add across), and a
 * Bayes mode that reverses the tree with a natural-frequency readout.
 */
export const probTreeDiagramSchema = z
  .object({
    component: z.literal("prob-tree-diagram"),
    /** Same branches at every node of a stage (e.g. H/T three times). Use this or `root`. */
    stages: z
      .array(
        z.object({
          label: z.string().min(1),
          branches: z.array(z.object({ label: z.string().min(1), latex: z.string().min(1).optional() })).min(2).max(6),
        }),
      )
      .max(5)
      .optional(),
    /** An explicit tree (the root's own label/prob are ignored). Missing probs split the remainder equally. */
    root: probTreeNodeSchema.optional(),
    /** stages mode: branch probabilities per stage; the last row repeats for later stages. Default: equal split. */
    probs: z.array(z.array(z.number().min(0).max(1)).min(2)).optional(),
    /** Sliders for chosen branch probabilities; siblings rescale so they still sum to 1. */
    editable: z
      .array(
        z.object({
          /** Path of the branch's child node, e.g. "0" or "1.0" (edits that one branch). */
          path: z.string().regex(/^\d+(\.\d+)*$/).optional(),
          /** stages mode: edit branch `branch` at every node of this stage. */
          stage: z.number().int().min(0).optional(),
          /** stages mode: edit branch `branch` at every node of every stage (one p for all trials). */
          allStages: z.boolean().optional(),
          branch: z.number().int().min(0).default(0),
          /** Slider label (LaTeX), e.g. "p" or "P(D)". */
          label: z.string().min(1).optional(),
          min: z.number().min(0).max(1).default(0),
          max: z.number().min(0).max(1).default(1),
          step: z.number().positive().default(0.01),
        }),
      )
      .max(4)
      .default([]),
    showProbabilities: z.boolean().default(true),
    showLeafProducts: z.boolean().default(true),
    showLeafSum: z.boolean().default(true),
    /** Print probabilities as fractions (e.g. 4/52 × 3/51 = 1/221) instead of decimals. */
    format: z.enum(["decimal", "fraction"]).default("decimal"),
    /** An event made of leaves, summed live; students can tap leaves to toggle them. */
    highlight: z
      .object({
        label: z.string().min(1),
        latex: z.string().min(1).optional(),
        leaves: probLeafSelectorSchema,
      })
      .optional(),
    /** Bayes: P(first-stage branch | observed) with a reversed tree and "x out of N" counts. */
    bayes: z
      .object({
        observedLeaves: probLeafSelectorSchema,
        /** Plain-text name of the observation, e.g. "tests positive". */
        observedLabel: z.string().min(1).default("observed"),
        hypothesisStage: z.literal(0).default(0),
        population: z.number().int().min(10).max(1000000).default(10000),
      })
      .optional(),
    /** Group leaves by number of successes and show nCk paths × one path's probability. */
    collapseEqualPaths: z.boolean().default(false),
    /** Branch label counted as a success for collapseEqualPaths (default: first branch of stage 1). */
    successLabel: z.string().min(1).optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (!cfg.stages === !cfg.root) {
      ctx.addIssue({ code: "custom", path: ["stages"], message: "give exactly one of stages or root" });
      return;
    }
    if (cfg.stages) {
      if (cfg.stages.length === 0) ctx.addIssue({ code: "custom", path: ["stages"], message: "at least one stage" });
      const leaves = cfg.stages.reduce((p, s) => p * s.branches.length, 1);
      if (leaves > 32) ctx.addIssue({ code: "custom", path: ["stages"], message: "at most 32 leaves" });
      cfg.probs?.forEach((row, i) => {
        const stage = cfg.stages![Math.min(i, cfg.stages!.length - 1)];
        if (row.length !== stage.branches.length) {
          ctx.addIssue({ code: "custom", path: ["probs", i], message: "one probability per branch" });
        }
        if (Math.abs(row.reduce((s, x) => s + x, 0) - 1) > 1e-6) {
          ctx.addIssue({ code: "custom", path: ["probs", i], message: "branch probabilities must sum to 1" });
        }
      });
    } else if (cfg.root) {
      let leaves = 0;
      const walk = (n: ProbTreeNode, depth: number, path: (string | number)[]) => {
        if (depth > 5) ctx.addIssue({ code: "custom", path, message: "at most 5 levels" });
        if (!n.children) {
          leaves++;
          return;
        }
        const given = n.children.filter((c) => c.prob !== undefined).reduce((s, c) => s + (c.prob ?? 0), 0);
        const allGiven = n.children.every((c) => c.prob !== undefined);
        if (given > 1 + 1e-6 || (allGiven && Math.abs(given - 1) > 1e-6)) {
          ctx.addIssue({ code: "custom", path: [...path, "children"], message: "sibling probabilities must sum to 1" });
        }
        n.children.forEach((c, i) => walk(c, depth + 1, [...path, "children", i]));
      };
      walk(cfg.root, 0, ["root"]);
      if (leaves > 32) ctx.addIssue({ code: "custom", path: ["root"], message: "at most 32 leaves" });
    }
    cfg.editable.forEach((e, i) => {
      const n = [e.path !== undefined, e.stage !== undefined, e.allStages === true].filter(Boolean).length;
      if (n !== 1) ctx.addIssue({ code: "custom", path: ["editable", i], message: "give exactly one of path, stage or allStages" });
      if ((e.stage !== undefined || e.allStages) && !cfg.stages) {
        ctx.addIssue({ code: "custom", path: ["editable", i], message: "stage/allStages editing needs stages mode" });
      }
      if (e.min > e.max) ctx.addIssue({ code: "custom", path: ["editable", i], message: "min must be <= max" });
    });
    if (cfg.collapseEqualPaths && !cfg.stages) {
      ctx.addIssue({ code: "custom", path: ["collapseEqualPaths"], message: "collapseEqualPaths needs stages mode" });
    }
  });

const probParamSchema = z.object({
  name: z.enum(["n", "p", "lambda"]),
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

/**
 * PMF bar chart for a discrete random variable with a CDF staircase toggle,
 * the mean as a balance-point wedge, a ±σ band and a shaded range
 * probability. Custom (editable), binomial, geometric, Poisson and a
 * binomial-vs-Poisson overlay.
 */
export const probDistributionExplorerSchema = z
  .object({
    component: z.literal("prob-distribution-explorer"),
    mode: z.enum(["custom", "binomial", "geometric", "poisson", "binomial-vs-poisson"]).default("custom"),
    /** custom: the values X can take (at most 12). */
    values: z.array(z.number()).min(1).max(12).optional(),
    /** custom: initial probabilities, one per value. */
    probs: z.array(z.number()).min(1).max(12).optional(),
    /** custom: drag bars (or tap a bar and use its slider); live sum-to-1 check. */
    editable: z.boolean().default(false),
    /** custom: a second distribution overlaid for comparison. */
    compare: z
      .object({ values: z.array(z.number()).min(1).max(12), probs: z.array(z.number().min(0)).min(1).max(12), label: z.string().min(1) })
      .optional(),
    /** Label for the main distribution in legends. */
    label: z.string().min(1).optional(),
    /** Sliders for the parametric modes; sensible defaults per mode when omitted. */
    params: z.array(probParamSchema).max(3).default([]),
    /** geometric / poisson / overlay: largest k drawn (default from the tail). */
    maxK: z.number().int().min(2).max(40).optional(),
    showMean: z.boolean().default(true),
    showSd: z.boolean().default(false),
    /** Offer the PMF / CDF toggle. */
    showCdf: z.boolean().default(false),
    initialView: z.enum(["pmf", "cdf"]).default("pmf"),
    /** Shade P(a <= X <= b). */
    range: z.object({ a: z.number(), b: z.number(), adjustable: z.boolean().default(true) }).optional(),
    /** Show the pmf formula with the current parameters substituted. */
    showFormula: z.boolean().default(true),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.mode === "custom") {
      if (!cfg.values || !cfg.probs) {
        ctx.addIssue({ code: "custom", path: ["values"], message: "custom mode needs values and probs" });
      } else if (cfg.values.length !== cfg.probs.length) {
        ctx.addIssue({ code: "custom", path: ["probs"], message: "one probability per value" });
      } else if (new Set(cfg.values).size !== cfg.values.length) {
        ctx.addIssue({ code: "custom", path: ["values"], message: "values must be distinct" });
      }
    }
    if (cfg.compare && cfg.compare.values.length !== cfg.compare.probs.length) {
      ctx.addIssue({ code: "custom", path: ["compare", "probs"], message: "one probability per value" });
    }
    const allowed: Record<string, string[]> = {
      custom: [],
      binomial: ["n", "p"],
      geometric: ["p"],
      poisson: ["lambda"],
      "binomial-vs-poisson": ["n", "lambda"],
    };
    cfg.params.forEach((p, i) => {
      if (!allowed[cfg.mode].includes(p.name)) {
        ctx.addIssue({ code: "custom", path: ["params", i, "name"], message: `${p.name} is not a parameter of ${cfg.mode}` });
      }
      if (p.min > p.max || p.initial < p.min || p.initial > p.max) {
        ctx.addIssue({ code: "custom", path: ["params", i], message: "need min <= initial <= max" });
      }
      if (p.name === "n" && (p.min < 1 || p.max > 100 || !Number.isInteger(p.min) || !Number.isInteger(p.step))) {
        ctx.addIssue({ code: "custom", path: ["params", i], message: "n must be an integer in 1-100" });
      }
      if (p.name === "p" && (p.min < 0 || p.max > 1 || (cfg.mode === "geometric" && p.min <= 0))) {
        ctx.addIssue({ code: "custom", path: ["params", i], message: "p must lie in [0, 1]" });
      }
      if (p.name === "lambda" && (p.min <= 0 || p.max > 20)) {
        ctx.addIssue({ code: "custom", path: ["params", i], message: "lambda must lie in (0, 20]" });
      }
    });
    if (cfg.range && cfg.range.a > cfg.range.b) {
      ctx.addIssue({ code: "custom", path: ["range"], message: "range needs a <= b" });
    }
  });

// ---------- Matrices interactives ----------

const mat2RowSchema = z.tuple([z.number(), z.number()]);
/** A 2x2 matrix, row-major: [[a, b], [c, d]]. */
const mat2Schema = z.tuple([mat2RowSchema, mat2RowSchema]);

/**
 * The Matrices course workhorse: a grid plane, the basis vectors i-hat and
 * j-hat and the unit square, carried by a 2x2 matrix. A t slider morphs the
 * plane from the identity to A (single), from I to B to AB (compose), or from
 * I to A and back again by A^{-1} (inverse). Readouts: the matrix, det as
 * signed area, the probe's image and the real eigen-directions.
 */
export const matrixTransformGridSchema = z.object({
  component: z.literal("matrix-transform-grid"),
  /** A, row-major. Its columns are where i-hat and j-hat land. */
  matrix: mat2Schema.default([
    [1, 1],
    [0, 1],
  ]),
  /** Entries can be typed and the column tips dragged (snapping to 0.5). */
  editable: z.boolean().default(true),
  mode: z.enum(["single", "compose", "inverse"]).default("single"),
  /** compose mode: B, applied first; then A. Default: rotation by 90 degrees. */
  secondMatrix: mat2Schema.optional(),
  /** Signed-area readout and the shaded image of the unit square. */
  showDeterminant: z.boolean().default(true),
  /** Draw a draggable probe vector v and its image Av. */
  showProbe: z.boolean().default(false),
  /** Initial probe vector (default [1, 2]). */
  probe: mat2RowSchema.optional(),
  /** Overlay the real eigen-directions of A (dashed lines through O). */
  showEigenLines: z.boolean().default(false),
  /** Buttons that load a matrix (rotation, shear, reflection, projection...). */
  presets: z
    .array(z.object({ label: z.string().min(1), matrix: mat2Schema }))
    .max(8)
    .optional(),
  /** Half-width of the visible plane, in grid units. */
  range: z.number().min(1).max(10).default(4),
  caption: z.string().optional(),
});

const rowReducerMatrixSchema = z.array(z.array(z.number()).min(1).max(4)).min(2).max(4);

/**
 * A small (optionally augmented) matrix on which the learner performs
 * elementary row operations. Shows each operation in notation, a running
 * determinant factor, undo history, and detects echelon / reduced form,
 * rank, consistency and (in [A | I] mode) the extracted inverse.
 */
export const matrixRowReducerSchema = z
  .object({
    component: z.literal("matrix-row-reducer"),
    /** 2-4 rows of 2-4 entries each (all rows the same length). */
    matrix: rowReducerMatrixSchema,
    /** Right-hand block drawn after a divider: the column B, or I. In
     *  inverse mode it defaults to the identity. */
    augmented: rowReducerMatrixSchema.optional(),
    mode: z.enum(["determinant", "inverse", "solve", "rank"]).default("solve"),
    /** Track how det has changed (default: on in determinant mode only). */
    showDeterminantFactor: z.boolean().optional(),
    allowedOps: z
      .array(z.enum(["swap", "scale", "add"]))
      .min(1)
      .default(["swap", "scale", "add"]),
    /** Show entries as exact fractions (else decimals to 3 places). */
    fractions: z.boolean().default(true),
    /** Goal badge: the form the learner should reach. */
    target: z.enum(["echelon", "reduced"]).optional(),
    /** solve mode: names for the unknowns (default x, y, z, w). */
    variables: z.array(z.string().min(1)).max(4).optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    const cols = cfg.matrix[0].length;
    if (cols < 2) ctx.addIssue({ code: "custom", path: ["matrix"], message: "matrix needs 2-4 columns" });
    if (cfg.matrix.some((row) => row.length !== cols)) {
      ctx.addIssue({ code: "custom", path: ["matrix"], message: "all rows must have the same length" });
    }
    if (cfg.augmented) {
      if (cfg.augmented.length !== cfg.matrix.length) {
        ctx.addIssue({ code: "custom", path: ["augmented"], message: "augmented needs one row per matrix row" });
      }
      const aCols = cfg.augmented[0].length;
      if (cfg.augmented.some((row) => row.length !== aCols)) {
        ctx.addIssue({ code: "custom", path: ["augmented"], message: "all augmented rows must have the same length" });
      }
    }
    if ((cfg.mode === "determinant" || cfg.mode === "inverse") && cfg.matrix.length !== cols) {
      ctx.addIssue({ code: "custom", path: ["matrix"], message: `${cfg.mode} mode needs a square matrix` });
    }
    if (cfg.mode === "inverse" && cfg.augmented && cfg.augmented[0].length !== cols) {
      ctx.addIssue({ code: "custom", path: ["augmented"], message: "inverse mode augments with an n x n block" });
    }
    if (cfg.variables && cfg.variables.length < cols) {
      ctx.addIssue({ code: "custom", path: ["variables"], message: "need one variable name per column" });
    }
  });

const lineCoefSchema = z.object({ a: z.number(), b: z.number(), c: z.number() });

/**
 * Row picture of a 2x2 system a1x + b1y = c1, a2x + b2y = c2: both lines
 * with coefficient sliders, the intersection, live D, Dx, Dy (Cramer) and
 * a status badge (unique / no solution / infinitely many).
 */
export const linearSystemLinesSchema = z.object({
  component: z.literal("linear-system-lines"),
  line1: lineCoefSchema.default({ a: 1, b: 1, c: 4 }),
  line2: lineCoefSchema.default({ a: 1, b: -1, c: 0 }),
  /** Coefficients that get sliders. */
  adjustable: z
    .array(z.enum(["a1", "b1", "c1", "a2", "b2", "c2"]))
    .default(["a1", "b1", "c1", "a2", "b2", "c2"]),
  sliderMin: z.number().default(-5),
  sliderMax: z.number().default(5),
  step: z.number().positive().default(0.5),
  /** D, Dx, Dy readout and x = Dx/D, y = Dy/D. */
  showCramer: z.boolean().default(true),
  window: plotWindowSchema.default({ xmin: -6, xmax: 6, ymin: -5, ymax: 5 }),
  presets: z
    .array(z.object({ label: z.string().min(1), line1: lineCoefSchema, line2: lineCoefSchema }))
    .max(8)
    .optional(),
  caption: z.string().optional(),
});

// ---------- Statistics interactives ----------

const statsViewSchema = z.enum(["dotplot", "histogram", "ogive", "boxplot"]);
const statsStatSchema = z.enum(["mean", "median", "mode", "q1", "q3", "iqr", "range", "sd", "variance", "md-mean", "md-median"]);

/**
 * One-variable data playground: a data set (or two) as a dotplot, histogram,
 * ogive or boxplot with draggable points and live centre / spread markers.
 * Quartiles use the median-of-halves convention; variance and SD divide by n.
 */
export const statsDistributionBuilderSchema = z
  .object({
    component: z.literal("stats-distribution-builder"),
    /** The initial data values (all inside `range`). */
    data: z.array(z.number()).min(1).max(200),
    /** Optional second data set, drawn in a second colour in its own band. */
    compareData: z.array(z.number()).min(1).max(200).optional(),
    labels: z
      .object({ data: z.string().min(1).default("Data"), compare: z.string().min(1).default("Set B") })
      .default({ data: "Data", compare: "Set B" }),
    /** Initial view. */
    view: statsViewSchema.default("dotplot"),
    /** View tabs offered (default: only `view`). */
    views: z.array(statsViewSchema).min(1).max(4).optional(),
    /** Horizontal axis. */
    range: z.object({ min: z.number(), max: z.number() }),
    /** Axis name, e.g. "Height (cm)". */
    xLabel: z.string().optional(),
    /** Histogram / ogive class width (default: about a eighth of the range, rounded). */
    binWidth: z.number().positive().optional(),
    /** Left edge of the first class (default range.min). Classes are [l, u). */
    binStart: z.number().optional(),
    /** Bin-width slider under the histogram. */
    binSlider: z.object({ min: z.number().positive(), max: z.number().positive(), step: z.number().positive() }).optional(),
    /** Histogram heights are frequency density f / width instead of frequency. */
    density: z.boolean().default(false),
    /** With density: relative frequency density f / (n · width), total area 1. */
    relative: z.boolean().default(false),
    /**
     * Density curve overlay (a pdf in x, math-eval grammar, total area 1). It is
     * scaled to the histogram's units: ×n·w for frequency, ×n for frequency density,
     * ×1 for relative frequency density.
     */
    curveExpr: z.string().min(1).optional(),
    curveLatex: z.string().min(1).optional(),
    /** Ogive: plotted at upper (less-than) / lower (more-than) class boundaries. */
    ogiveType: z.enum(["less-than", "more-than", "both"]).default("less-than"),
    /** Readouts; centres are also drawn as markers. */
    stats: z.array(statsStatSchema).default(["mean", "median"]),
    /** Dotplot: a fulcrum under the mean. */
    showBalance: z.boolean().default(false),
    /** Dotplot (first data set): deviation overlay about the mean, or about `a` when centerSlider is on. */
    deviations: z.enum(["none", "bars", "absolute", "squares"]).default("none"),
    /** A draggable centre a with live Σ|x − a| and Σ(x − a)² and a small graph of the sum against a. */
    centerSlider: z.boolean().default(false),
    /** Sliders applying x → a + b·x to every value (dragging is paused while a ≠ 0 or b ≠ 1). */
    transform: z.object({ shift: z.boolean().default(false), scale: z.boolean().default(false) }).optional(),
    /** 1.5·IQR fences and outliers marked (boxplot and dotplot). */
    showFences: z.boolean().default(false),
    /** Drag points, tap empty space to add one, select + Remove to delete. */
    editable: z.boolean().default(true),
    /** Step dragged points snap to (default 1 for integer data, else a 1-2-5 step near 1/100 of the range). */
    snap: z.number().positive().optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (!(cfg.range.min < cfg.range.max)) {
      ctx.addIssue({ code: "custom", path: ["range"], message: "range.min must be below range.max" });
      return;
    }
    const outside = (xs: number[]) => xs.some((x) => x < cfg.range.min || x > cfg.range.max);
    if (outside(cfg.data)) ctx.addIssue({ code: "custom", path: ["data"], message: "every data value must lie inside range" });
    if (cfg.compareData && outside(cfg.compareData)) {
      ctx.addIssue({ code: "custom", path: ["compareData"], message: "every compareData value must lie inside range" });
    }
    if (cfg.views && !cfg.views.includes(cfg.view)) {
      ctx.addIssue({ code: "custom", path: ["views"], message: "views must include the initial view" });
    }
    if (cfg.binSlider && cfg.binSlider.min > cfg.binSlider.max) {
      ctx.addIssue({ code: "custom", path: ["binSlider"], message: "binSlider.min must not exceed binSlider.max" });
    }
    if (cfg.binStart !== undefined && cfg.binStart > cfg.range.min) {
      ctx.addIssue({ code: "custom", path: ["binStart"], message: "binStart must be at or left of range.min" });
    }
    if (cfg.relative && !cfg.density) {
      ctx.addIssue({ code: "custom", path: ["relative"], message: "relative needs density: true" });
    }
  });

/**
 * Bivariate playground: draggable scatter points, mean cross-hairs, signed
 * co-deviation rectangles, live Cov / r / r², a draggable user line with
 * residual squares, and the least-squares line(s). Cov and σ divide by n.
 */
export const statsScatterRegressionSchema = z
  .object({
    component: z.literal("stats-scatter-regression"),
    points: z.array(z.object({ x: z.number(), y: z.number() })).min(2).max(60),
    window: plotWindowSchema,
    xLabel: z.string().default("x"),
    yLabel: z.string().default("y"),
    /** Drag points, tap empty space to add one, select + Remove to delete. */
    editable: z.boolean().default(true),
    /** Step dragged points snap to on both axes (default: a 1-2-5 step near 1/40 of each axis span). */
    snap: z.number().positive().optional(),
    /** Cross-hairs at (x̄, ȳ). */
    showMeans: z.boolean().default(false),
    /** Shade the signed rectangles (x − x̄)(y − ȳ): green adds, orange subtracts. */
    showCoDeviation: z.boolean().default(false),
    /** Readouts. slope / intercept are those of the least-squares line of y on x. */
    stats: z.array(z.enum(["cov", "r", "r2", "sse", "slope", "intercept"])).default(["r"]),
    /** A draggable line ŷ = slope·x + intercept with residual squares and its SSE. */
    userLine: z.object({ slope: z.number(), intercept: z.number() }).optional(),
    /** Least-squares line of y on x: never, behind a "Show" button, or always. */
    showLeastSquares: z.enum(["hidden", "toggle", "always"]).default("hidden"),
    /** Also draw the regression line of x on y (whenever the least-squares line is shown). */
    showXonY: z.boolean().default(false),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    const w = cfg.window;
    if (!(w.xmin < w.xmax && w.ymin < w.ymax)) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window min must be below max" });
      return;
    }
    cfg.points.forEach((p, i) => {
      if (p.x < w.xmin || p.x > w.xmax || p.y < w.ymin || p.y > w.ymax) {
        ctx.addIssue({ code: "custom", path: ["points", i], message: "point lies outside the window" });
      }
    });
  });

/**
 * Normal-distribution lab. area: shade between bounds under N(μ, σ) with z and Φ.
 * sampling: histogram of sample means from a chosen population with the
 * N(μ, σ/√n) curve. intervals: many x̄ ± z*·σ/√n intervals, counting how many cover μ.
 */
export const statsNormalSamplingLabSchema = z
  .object({
    component: z.literal("stats-normal-sampling-lab"),
    mode: z.enum(["area", "sampling", "intervals"]),
    mu: z.number().default(0),
    sigma: z.number().positive().default(1),
    /** area mode: sliders for μ (±2σ) and σ (×½ to ×2). */
    paramSliders: z.boolean().default(false),
    /** Axis (default μ ± 4σ, or ± 5σ with paramSliders). */
    window: z.object({ xmin: z.number(), xmax: z.number() }).optional(),
    /** Name of the variable, e.g. "Height (cm)". */
    xLabel: z.string().optional(),
    /** area: the initial shaded interval; null = −∞ / +∞. Default μ − σ to μ + σ. */
    bounds: z.object({ a: z.number().nullable(), b: z.number().nullable() }).optional(),
    /** area: z-values of the bounds and the Φ lookup. */
    showZ: z.boolean().default(true),
    /** area: buttons shading μ ± 1σ, 2σ, 3σ. */
    showSigmaPresets: z.boolean().default(false),
    /** area: challenge — drag a bound until the shaded area equals this. */
    targetArea: z.number().gt(0).lt(1).optional(),
    /** sampling / intervals: the population shape (with mean μ and SD σ). */
    population: z.enum(["normal", "uniform", "right-skewed", "bimodal"]).default("normal"),
    sampleSize: z
      .object({ min: z.number().int().min(1), max: z.number().int().max(400), initial: z.number().int() })
      .default({ min: 1, max: 100, initial: 5 }),
    /** Samples per "draw many" click. */
    draws: z.number().int().min(2).max(1000).default(100),
    /** intervals: the initial confidence level (buttons switch it). */
    confidence: z.union([z.literal(0.9), z.literal(0.95), z.literal(0.99)]).default(0.95),
    /** Seed for a reproducible random stream. */
    seed: z.number().int().optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    const s = cfg.sampleSize;
    if (!(s.min <= s.initial && s.initial <= s.max)) {
      ctx.addIssue({ code: "custom", path: ["sampleSize"], message: "need min ≤ initial ≤ max" });
    }
    if (cfg.window && !(cfg.window.xmin < cfg.window.xmax)) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window.xmin must be below window.xmax" });
    }
    if (cfg.bounds && cfg.bounds.a !== null && cfg.bounds.b !== null && cfg.bounds.a > cfg.bounds.b) {
      ctx.addIssue({ code: "custom", path: ["bounds"], message: "bounds.a must not exceed bounds.b" });
    }
    if (cfg.bounds && cfg.bounds.a === null && cfg.bounds.b === null && cfg.targetArea !== undefined) {
      ctx.addIssue({ code: "custom", path: ["bounds"], message: "targetArea needs at least one finite bound to drag" });
    }
    if (cfg.targetArea !== undefined && cfg.mode !== "area") {
      ctx.addIssue({ code: "custom", path: ["targetArea"], message: "targetArea is only used in area mode" });
    }
  });

// ---------- Oscillations, Waves & Thermal (owt) interactives ----------

const owtRangeSchema = z.object({ min: z.number(), max: z.number(), step: z.number().positive() });

const owtWaveSliderSchema = z.enum([
  "amplitude",
  "omega",
  "phase",
  "damping",
  "mass",
  "length",
  "angleAmplitude",
  "wavelength",
  "frequency",
  "amplitude2",
  "wavelength2",
  "phase2",
  "harmonic",
  "stringLength",
  "waveSpeed",
  "f1",
  "f2",
  "sourceSpeed",
  "observerSpeed",
]);

/**
 * Oscillation and wave lab. One shared time t (slider plus a user-started
 * Play button; SSR renders the t = 0 frame, Doppler the developed pattern).
 * shm: spring block or pendulum with x/v/a-t graphs, energy bars, optional
 * reference circle and damping. traveling: y = A sin(kx ∓ ωt + φ) with a probe
 * particle. superposition: two waves and their sum. standing: harmonics on a
 * string or in a pipe with nodes/antinodes. beats: two tones and the envelope.
 * doppler: wavefronts from a moving source, observers ahead and behind.
 * Units: SI (m, s, Hz, rad, kg); g = 10 m/s².
 */
export const owtWaveLabSchema = z
  .object({
    component: z.literal("owt-wave-lab"),
    mode: z.enum(["shm", "traveling", "superposition", "standing", "beats", "doppler"]),
    /** shm: "spring" (block on a spring) or "pendulum" (ω = √(g/L)). */
    oscillator: z.enum(["spring", "pendulum"]).default("spring"),
    /** Amplitude in m (shm spring, traveling, superposition wave 1, standing: each travelling component). */
    amplitude: z.number().positive().default(0.1),
    /** shm spring: angular frequency in rad/s. */
    omega: z.number().positive().default(2 * Math.PI),
    /** Initial phase φ in rad (shm: x = A cos(ωt + φ); traveling: y = A sin(kx − ωt + φ)). */
    phase: z.number().default(0),
    /** shm: damping constant γ in s⁻¹ (x = A e^{−γt} cos(ω′t + φ)); 0 = undamped. */
    damping: z.number().min(0).default(0),
    /** shm: mass in kg, for energies and k = mω². */
    mass: z.number().positive().default(1),
    /** shm pendulum: length in m. */
    length: z.number().positive().default(1),
    /** shm pendulum: angular amplitude in degrees. */
    angleAmplitude: z.number().positive().max(30).default(10),
    /** shm: which time graphs to draw. */
    graphs: z.array(z.enum(["x", "v", "a"])).min(1).max(3).default(["x"]),
    /** shm: KE / PE / total energy bars. */
    showEnergy: z.boolean().default(true),
    /** shm: the rotating reference-circle phasor whose shadow is the motion. */
    showReferenceCircle: z.boolean().default(false),
    /** shm: time span of the graphs, in periods. */
    periodsShown: z.number().positive().max(10).default(3),
    /** traveling / superposition: wavelength in m. */
    wavelength: z.number().positive().default(1),
    /** traveling / superposition: frequency in Hz. */
    frequency: z.number().positive().default(1),
    /** traveling / superposition: direction of wave 1. */
    direction: z.enum(["right", "left"]).default("right"),
    /** superposition: wave 2 (defaults: same amplitude, wavelength, direction; φ₂ = 0). */
    amplitude2: z.number().positive().optional(),
    wavelength2: z.number().positive().optional(),
    direction2: z.enum(["right", "left"]).optional(),
    phase2: z.number().default(0),
    /** traveling / superposition: length of string shown, in m (default 3λ). */
    xMax: z.number().positive().optional(),
    /** traveling: x of the probe particle, in m (default λ/4). */
    probeX: z.number().min(0).optional(),
    /** traveling: faint snapshot of the wave at t = 0. */
    showGhost: z.boolean().default(true),
    /** standing: string ends (fixed-*) or pipe ends (open/closed-*). Position x is measured from the left end. */
    boundary: z.enum(["fixed-fixed", "fixed-free", "open-open", "closed-open", "closed-closed"]).default("fixed-fixed"),
    /** standing: string or pipe length L in m. */
    stringLength: z.number().positive().default(1),
    /** standing / doppler: wave speed in m/s. */
    waveSpeed: z.number().positive().default(100),
    /** standing: mode number (n for both-same ends; for one closed/free end the harmonic is 2n − 1). */
    harmonic: z.number().int().min(1).default(1),
    maxHarmonic: z.number().int().min(1).max(8).default(5),
    /** standing (strings): draw the two counter-travelling waves that build the pattern. */
    showComponents: z.boolean().default(false),
    /** beats: the two frequencies in Hz. */
    f1: z.number().positive().default(10),
    f2: z.number().positive().default(12),
    /** beats: time window in s (default three beat periods). */
    duration: z.number().positive().optional(),
    /** doppler: source frequency (Hz), source speed and observer speed (m/s, observer moves towards the source). */
    sourceFrequency: z.number().positive().default(500),
    sourceSpeed: z.number().min(0).default(40),
    observerSpeed: z.number().min(0).default(0),
    /** Which parameters get sliders (default depends on mode). */
    sliders: z.array(owtWaveSliderSchema).optional(),
    /** Override a slider's range, e.g. { amplitude: { min: 0.05, max: 0.3, step: 0.05 } }. */
    ranges: z.partialRecord(owtWaveSliderSchema, owtRangeSchema).optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.harmonic > cfg.maxHarmonic) {
      ctx.addIssue({ code: "custom", path: ["harmonic"], message: "harmonic must not exceed maxHarmonic" });
    }
    if (cfg.probeX !== undefined && cfg.xMax !== undefined && cfg.probeX > cfg.xMax) {
      ctx.addIssue({ code: "custom", path: ["probeX"], message: "probeX must lie on the string (≤ xMax)" });
    }
    if (cfg.mode === "shm" && cfg.oscillator === "spring" && cfg.damping >= cfg.omega) {
      ctx.addIssue({ code: "custom", path: ["damping"], message: "damping must be below omega (underdamped only)" });
    }
    for (const [key, r] of Object.entries(cfg.ranges ?? {})) {
      if (r && !(r.min < r.max)) {
        ctx.addIssue({ code: "custom", path: ["ranges", key], message: "min must be below max" });
      }
    }
  });

const owtThermoSliderSchema = z.enum([
  "finalVolume",
  "finalPressure",
  "polytropicN",
  "coldTemperature",
  "compressionRatio",
  "pressureRatio",
  "temperature",
  "volume",
]);

/**
 * Ideal-gas / thermodynamics lab on a p–V diagram. Pressures in kPa, volumes
 * in L (so kPa·L = J), temperatures in K, R = 8.314 J/(mol·K).
 * process: one process from state A with W (shaded area), ΔU, Q readouts.
 * compare: isothermal vs adiabatic from A to the same final volume.
 * cycle: rectangle (2 isobars + 2 isochores), carnot or otto, with a per-leg
 * Q, W, ΔU table, net work (enclosed area) and efficiency.
 * kinetic: gas molecules in a box (Play to animate) with v_rms, P, U readouts.
 */
export const owtThermoLabSchema = z
  .object({
    component: z.literal("owt-thermo-lab"),
    mode: z.enum(["process", "compare", "cycle", "kinetic"]),
    /** monatomic γ = 5/3, diatomic γ = 7/5. */
    gas: z.enum(["monatomic", "diatomic"]).default("monatomic"),
    /** Offer monatomic / diatomic toggle buttons. */
    gasToggle: z.boolean().default(true),
    /** Amount of gas in mol. */
    moles: z.number().positive().default(1),
    /** State A (process/compare/cycle: rectangle bottom-left, carnot hot-isotherm start, otto start of compression). */
    initial: z.object({ p: z.number().positive(), v: z.number().positive() }).default({ p: 100, v: 25 }),
    /** process mode: which process. */
    process: z.enum(["isothermal", "isobaric", "isochoric", "adiabatic", "polytropic"]).default("isothermal"),
    /** Offer buttons to switch process. */
    processToggle: z.boolean().default(false),
    /** polytropic exponent n in pVⁿ = const. */
    polytropicN: z.number().default(1.5),
    /** Final volume in L (process except isochoric, compare, rectangle right edge, carnot state B). Default 2 × initial. */
    finalVolume: z.number().positive().optional(),
    /** Final pressure in kPa (isochoric process; rectangle top edge). Default 2 × initial. */
    finalPressure: z.number().positive().optional(),
    /** cycle: which cycle. */
    cycle: z.enum(["rectangle", "carnot", "otto"]).default("rectangle"),
    /** carnot: cold reservoir temperature in K (hot = T at A). Default T_A / 2. */
    coldTemperature: z.number().positive().optional(),
    /** otto: compression ratio V_max / V_min. */
    compressionRatio: z.number().gt(1).default(4),
    /** otto: pressure rise ratio in the heating step (p₃ / p₂). */
    pressureRatio: z.number().gt(1).default(2),
    /** Faint isotherms behind the p–V diagram. */
    showIsotherms: z.boolean().default(true),
    /** kinetic: temperature in K. */
    temperature: z.number().positive().default(300),
    /** kinetic: box volume in L. */
    volume: z.number().positive().default(25),
    /** kinetic: molar mass in g/mol (4 He, 28 N₂, 32 O₂). */
    molarMass: z.number().positive().default(4),
    /** kinetic: number of molecules drawn (the readouts still use `moles`). */
    particles: z.number().int().min(5).max(120).default(40),
    /** kinetic: deterministic seed for starting positions. */
    seed: z.number().int().default(7),
    /** Which parameters get sliders (default depends on mode). */
    sliders: z.array(owtThermoSliderSchema).optional(),
    ranges: z.partialRecord(owtThermoSliderSchema, owtRangeSchema).optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.mode === "process" && cfg.process === "polytropic" && Math.abs(cfg.polytropicN - 1) < 1e-9) {
      ctx.addIssue({ code: "custom", path: ["polytropicN"], message: "n = 1 is isothermal; use process: isothermal" });
    }
    for (const [key, r] of Object.entries(cfg.ranges ?? {})) {
      if (r && !(r.min < r.max)) {
        ctx.addIssue({ code: "custom", path: ["ranges", key], message: "min must be below max" });
      }
    }
  });

// ---------- Mechanics I (mfe) interactives ----------

/** One slider. min === max pins the value: it is shown as a fixed readout with no slider. */
const mfeRangeSchema = z
  .object({
    min: z.number(),
    max: z.number(),
    step: z.number().positive(),
    initial: z.number(),
  })
  .refine((r) => r.min <= r.initial && r.initial <= r.max, {
    message: "need min ≤ initial ≤ max",
  });

/**
 * Kinematics lab (SI units, g configurable, default 10 m/s²). Any slider
 * key left out gets a per-mode default; keys a mode does not use are ignored.
 *  line:       x0 (m), u (m/s), a (m/s²). Track + stacked x-t, v-t, a-t graphs with a time scrubber.
 *  projectile: speed (m/s), angle (° above horizontal), height (m, launch height above the ground).
 *  river-boat: river (m/s, flow to the right), boat (m/s, relative to water),
 *              heading (° from straight across; + = upstream).
 *  rain-man:   rain (m/s, vertical fall speed), wind (m/s, rain's horizontal velocity, + = right),
 *              man (m/s, + = right).
 *  circular:   radius (m), speed (m/s at t = 0), tangential (m/s², 0 = uniform circular motion).
 */
export const mfeMotionLabSchema = z.object({
  component: z.literal("mfe-motion-lab"),
  mode: z.enum(["line", "projectile", "river-boat", "rain-man", "circular"]).default("line"),
  g: z.number().positive().default(10),
  sliders: z
    .object({
      x0: mfeRangeSchema.optional(),
      u: mfeRangeSchema.optional(),
      a: mfeRangeSchema.optional(),
      speed: mfeRangeSchema.optional(),
      angle: mfeRangeSchema.optional(),
      height: mfeRangeSchema.optional(),
      river: mfeRangeSchema.optional(),
      boat: mfeRangeSchema.optional(),
      heading: mfeRangeSchema.optional(),
      rain: mfeRangeSchema.optional(),
      wind: mfeRangeSchema.optional(),
      man: mfeRangeSchema.optional(),
      radius: mfeRangeSchema.optional(),
      tangential: mfeRangeSchema.optional(),
    })
    .default({}),
  /** line, and circular with tangential ≠ 0: the time axis runs from 0 to this many seconds. */
  duration: z.number().positive().default(10),
  /** line: which stacked graphs to draw. */
  graphs: z.array(z.enum(["x", "v", "a"])).min(1).default(["x", "v", "a"]),
  /** line: shade the area under v-t up to t (the displacement). */
  showArea: z.boolean().default(true),
  /** line: draw the tangent to x-t at t (its slope is v). */
  showTangent: z.boolean().default(true),
  /** projectile: velocity and its components at t; circular: velocity and acceleration arrows. */
  showVectors: z.boolean().default(true),
  /** projectile: also trace the complementary angle 90° − θ at the same speed. */
  showComplementary: z.boolean().default(false),
  /** river-boat: river width in metres. */
  riverWidth: z.number().positive().default(100),
  caption: z.string().optional(),
});

/**
 * Forces lab: free-body diagrams with live Newton's-law bookkeeping (SI,
 * g default 10 m/s²). Any slider key left out gets a per-mode default.
 *  incline:        m (kg), angle (°), muS, muK, force (N, applied along the slope, + = up the slope).
 *  friction:       m (kg), muS, muK, force (N, horizontal pull). Includes the f-vs-F graph.
 *  lift:           m (kg), a (m/s², lift acceleration, + = up). Ground frame vs lift frame (pseudo force).
 *  atwood:         m1, m2 (kg) over an ideal pulley.
 *  table-pulley:   m1 (kg, on the table), m2 (kg, hanging), mu (table; static = kinetic).
 *  block-on-block: m1 (kg, top), m2 (kg, bottom), mu (between the blocks; floor smooth), force (N).
 *  banking:        m (kg), angle (° of bank), radius (m), speed (m/s), mu.
 *  vertical-circle: m (kg), radius (m), speed (m/s at the lowest point), theta (° from the lowest point).
 *  spring:         m (kg), k (N/m), x0 (m, initial compression), mu (floor). Released from rest; a
 *                  position slider runs over the first pass, with F-x graph and energy bars.
 */
export const mfeForceLabSchema = z.object({
  component: z.literal("mfe-force-lab"),
  mode: z
    .enum([
      "incline",
      "friction",
      "lift",
      "atwood",
      "table-pulley",
      "block-on-block",
      "banking",
      "vertical-circle",
      "spring",
    ])
    .default("incline"),
  g: z.number().positive().default(10),
  sliders: z
    .object({
      m: mfeRangeSchema.optional(),
      m1: mfeRangeSchema.optional(),
      m2: mfeRangeSchema.optional(),
      angle: mfeRangeSchema.optional(),
      muS: mfeRangeSchema.optional(),
      muK: mfeRangeSchema.optional(),
      mu: mfeRangeSchema.optional(),
      force: mfeRangeSchema.optional(),
      a: mfeRangeSchema.optional(),
      radius: mfeRangeSchema.optional(),
      speed: mfeRangeSchema.optional(),
      theta: mfeRangeSchema.optional(),
      k: mfeRangeSchema.optional(),
      x0: mfeRangeSchema.optional(),
    })
    .default({}),
  /** block-on-block: which block the force F acts on. */
  pushOn: z.enum(["bottom", "top"]).default("bottom"),
  /** lift: the frame the free-body diagram starts in (the student can toggle). */
  frame: z.enum(["ground", "lift"]).default("ground"),
  /** incline, banking: draw the components of the weight (incline) or of N and f (banking). */
  showComponents: z.boolean().default(true),
  /** friction: f-vs-F graph; vertical-circle, spring: energy bars and graphs. */
  showGraph: z.boolean().default(true),
  caption: z.string().optional(),
});

// ---------- Optics & Modern Physics (omp) interactives ----------

/** A slider: bounds, step and starting value. min === max hides the slider (value locked). */
const ompRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

type OmpRange = z.infer<typeof ompRangeSchema>;

function ompCheckRanges(
  ctx: z.RefinementCtx,
  ranges: Record<string, OmpRange>,
  positive: string[] = [],
) {
  for (const [key, r] of Object.entries(ranges)) {
    if (!(r.min <= r.initial && r.initial <= r.max)) {
      ctx.addIssue({ code: "custom", path: [key], message: "need min ≤ initial ≤ max" });
    }
    if (positive.includes(key) && r.min <= 0) {
      ctx.addIssue({ code: "custom", path: [key, "min"], message: "must be positive" });
    }
  }
}

/**
 * The optics bench. Image modes (plane/concave/convex mirror, convex/concave
 * lens) trace the three principal rays from a draggable object (New
 * Cartesian signs, light travelling left to right, distances in cm) and
 * read out u, v, f, m and the nature of the image. `refraction` is Snell's
 * law at a flat boundary (with critical angle and TIR), `apparent-depth`
 * shows the virtual image of an object under a flat surface at a chosen
 * viewing angle, and `prism` traces a ray through a prism with a
 * deviation-vs-incidence graph and the minimum-deviation point.
 */
export const ompRayBenchSchema = z
  .object({
    component: z.literal("omp-ray-bench"),
    mode: z
      .enum([
        "plane-mirror",
        "concave-mirror",
        "convex-mirror",
        "convex-lens",
        "concave-lens",
        "refraction",
        "apparent-depth",
        "prism",
      ])
      .default("convex-lens"),
    /** Image modes: object distance |u| in cm (the object sits to the left). */
    objectDistance: ompRangeSchema.default({ min: 5, max: 60, step: 1, initial: 30 }),
    /** Curved mirror / lens modes: |f| in cm; the sign comes from the mode. */
    focalLength: ompRangeSchema.default({ min: 5, max: 30, step: 1, initial: 15 }),
    /** Image modes: object height in cm. */
    objectHeight: z.number().positive().default(3),
    /** Image modes: which principal rays to draw. */
    rays: z.array(z.enum(["parallel", "centre", "focal"])).min(1).default(["parallel", "centre", "focal"]),
    /** Image modes: show the mirror/lens formula with the live numbers substituted. */
    showFormula: z.boolean().default(true),
    /** Image modes: horizontal extent of the bench in cm (±). Omitted = fitted to the ranges. */
    benchHalfWidth: z.number().positive().optional(),
    /** refraction: medium the ray starts in (top). apparent-depth: medium of the observer (top). */
    n1: ompRangeSchema.default({ min: 1, max: 2.5, step: 0.01, initial: 1 }),
    /** refraction: medium the ray enters (bottom). apparent-depth: medium holding the object (bottom). */
    n2: ompRangeSchema.default({ min: 1, max: 2.5, step: 0.01, initial: 1.5 }),
    /** refraction: angle of incidence in degrees. */
    incidence: ompRangeSchema.default({ min: 0, max: 89, step: 1, initial: 30 }),
    /** apparent-depth: real depth of the object in cm. */
    depth: ompRangeSchema.default({ min: 5, max: 40, step: 1, initial: 20 }),
    /** apparent-depth: angle of the viewing ray to the normal, in the observer's medium (degrees). */
    viewAngle: ompRangeSchema.default({ min: 0, max: 70, step: 1, initial: 10 }),
    /** prism: apex (refracting) angle A in degrees. */
    apexAngle: ompRangeSchema.default({ min: 30, max: 75, step: 1, initial: 60 }),
    /** prism: refractive index of the prism (surroundings are air). */
    prismIndex: ompRangeSchema.default({ min: 1.2, max: 2, step: 0.01, initial: 1.5 }),
    /** prism: angle of incidence i in degrees. */
    prismIncidence: ompRangeSchema.default({ min: 20, max: 89, step: 1, initial: 40 }),
    /** prism: draw the δ-vs-i curve with the current point and δ_min. */
    showDeviationGraph: z.boolean().default(true),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    ompCheckRanges(
      ctx,
      {
        objectDistance: cfg.objectDistance,
        focalLength: cfg.focalLength,
        n1: cfg.n1,
        n2: cfg.n2,
        incidence: cfg.incidence,
        depth: cfg.depth,
        viewAngle: cfg.viewAngle,
        apexAngle: cfg.apexAngle,
        prismIndex: cfg.prismIndex,
        prismIncidence: cfg.prismIncidence,
      },
      ["objectDistance", "focalLength", "depth"],
    );
    for (const key of ["n1", "n2", "prismIndex"] as const) {
      if (cfg[key].min < 1) ctx.addIssue({ code: "custom", path: [key, "min"], message: "refractive index must be ≥ 1" });
    }
    for (const key of ["incidence", "viewAngle", "prismIncidence"] as const) {
      if (cfg[key].min < 0 || cfg[key].max > 89) {
        ctx.addIssue({ code: "custom", path: [key], message: "angles must lie in 0–89°" });
      }
    }
    if (cfg.apexAngle.min < 10 || cfg.apexAngle.max > 80) {
      ctx.addIssue({ code: "custom", path: ["apexAngle"], message: "apex angle must lie in 10–80°" });
    }
  });

const ompMetalSchema = z.object({
  name: z.string().min(1),
  /** Work function in eV. */
  workFunction: z.number().positive(),
});

/**
 * The quantum lab. `photoelectric`: light of chosen wavelength and
 * intensity on a metal plate, a collector voltage, electrons that reach (or
 * turn back before) the collector, and the I–V curve with the stopping
 * potential. `einstein-graph`: stopping potential (or K_max) against
 * frequency for several metals, parallel lines of slope h/e. `de-broglie`:
 * a particle accelerated through V and its wavelength λ = h/√(2mqV).
 * `bohr-levels`: hydrogen-like energy levels, a transition between two
 * levels, the photon's wavelength and series, and the orbits with n de
 * Broglie wavelengths fitted round the circumference. Uses hc = 1240 eV·nm.
 */
export const ompQuantumLabSchema = z
  .object({
    component: z.literal("omp-quantum-lab"),
    mode: z.enum(["photoelectric", "einstein-graph", "de-broglie", "bohr-levels"]).default("photoelectric"),
    /** Metals on offer (NCERT work functions by default). */
    metals: z
      .array(ompMetalSchema)
      .min(1)
      .max(6)
      .default([
        { name: "Caesium", workFunction: 2.14 },
        { name: "Potassium", workFunction: 2.3 },
        { name: "Sodium", workFunction: 2.75 },
        { name: "Calcium", workFunction: 3.2 },
        { name: "Copper", workFunction: 4.65 },
        { name: "Platinum", workFunction: 5.65 },
      ]),
    /** Index into metals of the one selected at start. */
    initialMetal: z.number().int().min(0).default(0),
    /** photoelectric: wavelength in nm. */
    wavelength: ompRangeSchema.default({ min: 150, max: 700, step: 5, initial: 400 }),
    /** photoelectric: light intensity in % of the lamp's maximum. */
    intensity: ompRangeSchema.default({ min: 0, max: 100, step: 5, initial: 60 }),
    /** photoelectric: collector potential relative to the emitter, in volts. */
    voltage: ompRangeSchema.default({ min: -5, max: 5, step: 0.1, initial: 0 }),
    /** einstein-graph: frequency in units of 10^14 Hz. */
    frequency: ompRangeSchema.default({ min: 4, max: 16, step: 0.1, initial: 8 }),
    /** einstein-graph: plot stopping potential (V) or K_max (eV). */
    graphY: z.enum(["stopping-potential", "kmax"]).default("stopping-potential"),
    /** de-broglie: the particle being accelerated. */
    particle: z.enum(["electron", "proton", "alpha"]).default("electron"),
    /** de-broglie: offer buttons to switch particle. */
    allowParticleChange: z.boolean().default(true),
    /** de-broglie: accelerating potential in volts. */
    acceleratingVoltage: ompRangeSchema.default({ min: 10, max: 1000, step: 10, initial: 100 }),
    /** bohr-levels: Z of the hydrogen-like ion (1 = H, 2 = He⁺, 3 = Li²⁺). */
    atomicNumber: z.number().int().min(1).max(3).default(1),
    /** bohr-levels: starting upper and lower levels (1–7, lower < upper). */
    upperLevel: z.number().int().min(2).max(7).default(3),
    lowerLevel: z.number().int().min(1).max(6).default(2),
    /** bohr-levels: emission (photon out, downward arrow) or absorption. */
    transition: z.enum(["emission", "absorption"]).default("emission"),
    /** bohr-levels: draw the orbits with the standing de Broglie wave on the upper orbit. */
    showOrbits: z.boolean().default(true),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    ompCheckRanges(
      ctx,
      {
        wavelength: cfg.wavelength,
        intensity: cfg.intensity,
        voltage: cfg.voltage,
        frequency: cfg.frequency,
        acceleratingVoltage: cfg.acceleratingVoltage,
      },
      ["wavelength", "frequency", "acceleratingVoltage"],
    );
    if (cfg.intensity.min < 0) ctx.addIssue({ code: "custom", path: ["intensity", "min"], message: "must be ≥ 0" });
    if (cfg.initialMetal >= cfg.metals.length) {
      ctx.addIssue({ code: "custom", path: ["initialMetal"], message: "initialMetal must index into metals" });
    }
    if (cfg.lowerLevel >= cfg.upperLevel) {
      ctx.addIssue({ code: "custom", path: ["lowerLevel"], message: "lowerLevel must be below upperLevel" });
    }
  });

// ---------- Mechanics II (mrg) interactives ----------

/** A slider: bounds, step and starting value (SI units unless noted). */
const mrgRangeSchema = z
  .object({
    min: z.number(),
    max: z.number(),
    step: z.number().positive(),
    initial: z.number(),
  })
  .refine((r) => r.min <= r.initial && r.initial <= r.max, { message: "need min ≤ initial ≤ max" });

/**
 * One-dimensional collision track (g = 10 m/s², SI units). Two carts meet
 * through a springy bumper that pushes with a constant force: the
 * compression phase ends at the common velocity, the restitution phase
 * gives back e times the approach speed. A time scrubber and a Play button
 * run the event; a graph below plots velocity, momentum or kinetic energy
 * against time.
 * - collision: carts m1, m2 with velocities u1, u2 (+ = rightwards) and
 *   coefficient of restitution e; ground or centre-of-mass frame.
 * - explosion: the two carts start locked together at v0; a spring
 *   releases `energy` joules and pushes them apart; the COM keeps gliding.
 * - wall: a ball (m1, u1 towards a rigid wall) bounces with restitution e;
 *   the graph is the force-time pulse (contactTime ms, pulse shape) whose
 *   shaded area is the impulse, accumulated up to the scrubber.
 */
export const mrgCollisionLabSchema = z.object({
  component: z.literal("mrg-collision-lab"),
  mode: z.enum(["collision", "explosion", "wall"]).default("collision"),
  /** Mass of cart 1 (the ball in wall mode), kg. */
  m1: mrgRangeSchema.default({ min: 0.5, max: 5, step: 0.5, initial: 2 }),
  /** Mass of cart 2, kg. */
  m2: mrgRangeSchema.default({ min: 0.5, max: 5, step: 0.5, initial: 1 }),
  /** Velocity of cart 1 before, m/s (wall mode: its speed towards the wall; sign ignored). */
  u1: mrgRangeSchema.default({ min: -6, max: 6, step: 0.5, initial: 4 }),
  /** Velocity of cart 2 before, m/s. */
  u2: mrgRangeSchema.default({ min: -6, max: 6, step: 0.5, initial: 0 }),
  /** Coefficient of restitution (collision, wall). */
  e: mrgRangeSchema.default({ min: 0, max: 1, step: 0.05, initial: 1 }),
  /** explosion: common velocity before the spring is released, m/s. */
  v0: mrgRangeSchema.default({ min: -3, max: 3, step: 0.5, initial: 0 }),
  /** explosion: energy released by the spring, J. */
  energy: mrgRangeSchema.default({ min: 0, max: 50, step: 1, initial: 12 }),
  /** wall: duration of contact, milliseconds. */
  contactTime: mrgRangeSchema.default({ min: 5, max: 200, step: 5, initial: 50 }),
  /** wall: shape of the force-time pulse (same area, different peak). */
  pulse: z.enum(["rectangle", "triangle", "half-sine"]).default("triangle"),
  /**
   * Sliders shown; omitted = per-mode default (collision: m1 m2 u1 u2 e;
   * explosion: m1 m2 v0 energy; wall: m1 u1 e contactTime). Hidden
   * quantities stay fixed at their `initial`.
   */
  controls: z.array(z.enum(["m1", "m2", "u1", "u2", "e", "v0", "energy", "contactTime"])).optional(),
  /** Mark the centre of mass on the track (collision, explosion). */
  showCom: z.boolean().default(true),
  /** Reference frame to start in (collision, explosion). */
  frame: z.enum(["ground", "com"]).default("ground"),
  /** Offer a ground/COM frame toggle (collision, explosion). */
  allowFrameToggle: z.boolean().default(true),
  /** Graph under the track (collision, explosion); wall mode always shows F against t. */
  graph: z.enum(["velocity", "momentum", "energy", "none"]).default("velocity"),
  /**
   * Live values; omitted = per-mode default (collision: velocities,
   * momentum, energy; explosion: velocities, momentum, energy, com;
   * wall: impulse, velocities).
   */
  readouts: z.array(z.enum(["velocities", "momentum", "energy", "com", "impulse"])).optional(),
  caption: z.string().optional(),
});

/**
 * Rolling and rotation lab (g = 10 m/s²). Bodies: ring (k²/R² = 1), disc
 * (1/2), solid-sphere (2/5), hollow-sphere (2/3), plus sliding-block in
 * the incline race.
 * - velocities: a wheel whose centre speed v and spin ω are separate
 *   sliders (ω > 0 = clockwise, the forward-rolling sense); every marked
 *   rim point shows v_cm + ω × r, split into its translation and rotation
 *   parts, with the contact-point velocity, rolling status, instantaneous
 *   centre and optional cycloid trace. lockRolling ties ω = v/R.
 * - incline: race of `bodies` down an incline of length `length`, angle
 *   slider, optional friction slider μ (below μ_min a body slips);
 *   progress bars, table of a, time, final speed and KE split.
 * - slip-to-roll: a `body` launched along a rough floor with v0 and ω0;
 *   kinetic friction drives v and ωR together until pure rolling; graph
 *   of v and ωR against t, and L about the contact point stays constant.
 */
export const mrgRollingLabSchema = z.object({
  component: z.literal("mrg-rolling-lab"),
  mode: z.enum(["velocities", "incline", "slip-to-roll"]).default("velocities"),
  /** velocities, slip-to-roll: the body (velocities only uses it for the KE readout). */
  body: z.enum(["ring", "disc", "solid-sphere", "hollow-sphere"]).default("disc"),
  /** Radius in metres (velocities, slip-to-roll). */
  radius: z.number().positive().default(0.5),
  /** velocities: speed of the centre, m/s (+ = rightwards). */
  v: mrgRangeSchema.default({ min: -4, max: 4, step: 0.5, initial: 2 }),
  /** velocities: angular velocity, rad/s (+ = clockwise). */
  omega: mrgRangeSchema.default({ min: -12, max: 12, step: 0.5, initial: 4 }),
  /** velocities: hide the ω slider and hold ω = v/R (pure rolling). */
  lockRolling: z.boolean().default(false),
  /** velocities: draw the translation and rotation parts at each rim point. */
  showParts: z.boolean().default(true),
  /** velocities: mark the instantaneous centre of rotation. */
  showIcr: z.boolean().default(false),
  /** velocities: trace the path of the marked rim point (cycloid when rolling). */
  showTrace: z.boolean().default(false),
  /** incline: bodies in the race (1-5, distinct). */
  bodies: z
    .array(z.enum(["ring", "disc", "solid-sphere", "hollow-sphere", "sliding-block"]))
    .min(1)
    .max(5)
    .default(["ring", "disc", "solid-sphere"]),
  /** incline: angle in degrees. */
  angle: mrgRangeSchema.default({ min: 10, max: 60, step: 5, initial: 30 }),
  /** incline: length of the slope, m. */
  length: z.number().positive().default(5),
  /** incline: friction coefficient slider; omitted = rough enough for pure rolling (block frictionless). */
  mu: mrgRangeSchema.optional(),
  /** slip-to-roll: launch speed, m/s. */
  v0: mrgRangeSchema.default({ min: 0, max: 8, step: 0.5, initial: 7 }),
  /** slip-to-roll: launch spin, rad/s (+ = forward topspin, − = backspin). */
  omega0: mrgRangeSchema.default({ min: -20, max: 20, step: 1, initial: 0 }),
  /** slip-to-roll: kinetic friction coefficient. */
  muK: mrgRangeSchema.default({ min: 0.1, max: 0.8, step: 0.05, initial: 0.2 }),
  /** Show the kinetic-energy split (translation vs rotation). */
  showEnergy: z.boolean().default(true),
  caption: z.string().optional(),
});

// ---------- Electricity & Magnetism (em) interactives ----------

const emRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

const emPointChargeSchema = z.object({
  /** Charge in microcoulombs (μC); the sign matters. */
  q: z.number(),
  /** Position in grid units (metres, or centimetres when unit = "cm"). */
  pos: vec2Schema,
  /** LaTeX name; default q_1, q_2, ... */
  label: z.string().optional(),
  /** Whether the student may drag this charge. */
  draggable: z.boolean().default(true),
});

/**
 * Point charges on a grid (k = 9 × 10⁹ SI). Draggable charges and probe
 * points; field lines traced from the charges, a field-arrow grid,
 * equipotential contours, Coulomb forces on one charge, and the work done
 * moving a test charge between two points. Readouts in SI via KaTeX.
 */
export const emFieldCanvasSchema = z
  .object({
    component: z.literal("em-field-canvas"),
    mode: z
      .enum(["field-lines", "field-vectors", "equipotentials", "force", "work"])
      .default("field-lines"),
    charges: z
      .array(emPointChargeSchema)
      .min(1)
      .max(6)
      .default([
        { q: 2, pos: [-2, 0], draggable: true },
        { q: -2, pos: [2, 0], draggable: true },
      ]),
    /** When set, each charge gets a q slider (μC) with this range. */
    chargeSlider: z
      .object({ min: z.number(), max: z.number(), step: z.number().positive() })
      .optional(),
    /** Probe point P (field/potential readouts); point A in work mode. */
    probe: vec2Schema.default([0, 2]),
    /** Point B in work mode. */
    probeB: vec2Schema.default([3, 2]),
    /** Test charge q₀ in μC placed at the probe (force readout, work mode). */
    testCharge: z.number().default(1),
    /** force mode: index into `charges` of the charge whose net force is shown. */
    forceOn: z.number().int().min(0).default(0),
    unit: z.enum(["m", "cm"]).default("m"),
    window: plotWindowSchema.default({ xmin: -5, xmax: 5, ymin: -4, ymax: 4 }),
    /** Grid step dragged handles snap to, in grid units. */
    snap: z.number().positive().default(0.5),
    /** Layer overrides; omitted = a sensible per-mode default. */
    showLines: z.boolean().optional(),
    showVectors: z.boolean().optional(),
    showEquipotentials: z.boolean().optional(),
    showProbe: z.boolean().optional(),
    /** Field lines drawn per μC of charge (line count ∝ q). */
    linesPerMicroC: z.number().positive().default(4),
    /** Equipotential levels in volts; omitted = automatic. */
    potentialLevels: z.array(z.number()).optional(),
    /** Live values to show; omitted = a sensible per-mode default. */
    readouts: z
      .array(z.enum(["field", "components", "potential", "superposition", "force", "work", "dipole"]))
      .optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.forceOn >= cfg.charges.length) {
      ctx.addIssue({ code: "custom", path: ["forceOn"], message: "forceOn must index an existing charge" });
    }
    if (cfg.mode === "force" && cfg.charges.length < 2) {
      ctx.addIssue({ code: "custom", path: ["charges"], message: "force mode needs at least two charges" });
    }
    if (cfg.window.xmin >= cfg.window.xmax || cfg.window.ymin >= cfg.window.ymax) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

/**
 * Circuit lab for time-varying circuits. rc / lr: charging or discharging
 * transients with τ marked. ac-element: a single R, L or C across an AC
 * source (waveforms + rotating phasors). lcr: series LCR phasor diagram,
 * impedance and power factor. resonance: I_rms against frequency with
 * bandwidth and Q. Units: resistance Ω, inductance mH, capacitance μF,
 * frequency Hz, emf V (battery EMF in rc/lr, peak voltage V₀ in AC modes).
 */
export const emCircuitLabSchema = z
  .object({
    component: z.literal("em-circuit-lab"),
    mode: z.enum(["rc", "lr", "ac-element", "lcr", "resonance"]).default("lcr"),
    /** rc / lr: charging (current growth) or discharging (decay). */
    process: z.enum(["charge", "discharge"]).default("charge"),
    emf: z.number().positive().default(10),
    /** ac-element mode: the single element across the source. */
    element: z.enum(["R", "L", "C"]).default("R"),
    resistance: emRangeSchema.default({ min: 10, max: 500, step: 10, initial: 100 }),
    inductance: emRangeSchema.default({ min: 10, max: 1000, step: 10, initial: 100 }),
    capacitance: emRangeSchema.default({ min: 1, max: 100, step: 1, initial: 10 }),
    frequency: emRangeSchema.default({ min: 10, max: 500, step: 5, initial: 50 }),
    /** Sliders to show; omitted = a sensible per-mode default. */
    sliders: z.array(z.enum(["R", "L", "C", "f"])).optional(),
    showPhasors: z.boolean().default(true),
    showWaveforms: z.boolean().default(true),
    /** rc / lr: keep the starting curve as a dashed ghost while sliders move. */
    showGhost: z.boolean().default(true),
    /** Live values to show; omitted = a sensible per-mode default. */
    readouts: z
      .array(
        z.enum(["tau", "instant", "energy", "reactance", "impedance", "phase", "power", "resonance", "quality"]),
      )
      .optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["resistance", "inductance", "capacitance", "frequency"] as const) {
      const r = cfg[key];
      if (r.min <= 0 || r.min > r.max || r.initial < r.min || r.initial > r.max) {
        ctx.addIssue({ code: "custom", path: [key], message: "need 0 < min ≤ initial ≤ max" });
      }
    }
  });

const emRangeIssue = (r: { min: number; max: number; initial: number }) =>
  r.min > r.max || r.initial < r.min || r.initial > r.max;

/**
 * Bar magnets and magnetic materials. field: a bar magnet (pole model,
 * poles at ±halfLength along its axis, drawn vertically) with traced field
 * lines and a probe at distance r and angle θ from the magnet's N
 * direction (exact field against the short-dipole formula); with
 * earthField > 0 the Earth's horizontal field points up the page
 * (geographic north) and the neutral points are marked. torque: a magnet
 * at angle θ to a uniform field, the couple on its poles, τ and U against
 * θ, and the small-oscillation period. hysteresis: a B–H loop with
 * retentivity and coercivity sliders, soft-iron and steel presets and the
 * loop area. Units: moment A m², lengths cm, earthField μT, coercivity and
 * hMax A/m, saturation and retentivity T.
 */
export const emMagnetLabSchema = z
  .object({
    component: z.literal("em-magnet-lab"),
    mode: z.enum(["field", "torque", "hysteresis"]).default("field"),
    moment: emRangeSchema.default({ min: 0.5, max: 10, step: 0.5, initial: 2 }),
    /** field mode: half the magnetic length l, in cm. */
    halfLength: z.number().positive().default(5),
    /** field mode: probe distance r from the centre, in cm. */
    distance: emRangeSchema.default({ min: 8, max: 28, step: 1, initial: 20 }),
    /** Starting angle in degrees: probe angle from the axis (field) or magnet angle to B (torque). */
    angle: z.number().optional(),
    /** field mode: Earth's horizontal component in μT (0 = no Earth field). */
    earthField: z.number().min(0).default(0),
    /** field mode: which geographic direction the magnet's N pole points. */
    magnetPointing: z.enum(["north", "south"]).default("north"),
    window: plotWindowSchema.default({ xmin: -40, xmax: 40, ymin: -30, ymax: 30 }),
    /** torque mode: the uniform field, in fieldUnit. */
    fieldStrength: emRangeSchema.default({ min: 5, max: 100, step: 5, initial: 40 }),
    fieldUnit: z.enum(["uT", "mT", "T"]).default("uT"),
    /** torque mode: moment of inertia about the suspension, kg m². */
    inertia: z.number().positive().default(1e-5),
    /** hysteresis mode. */
    saturation: z.number().positive().default(1.5),
    retentivity: emRangeSchema.default({ min: 0.3, max: 1.45, step: 0.05, initial: 1.2 }),
    coercivity: emRangeSchema.default({ min: 50, max: 2500, step: 50, initial: 150 }),
    hMax: z.number().positive().default(5000),
    /** hysteresis mode: frequency used for the power-loss readout, Hz. */
    frequency: z.number().positive().default(50),
    showGhost: z.boolean().default(true),
    /** Live values to show; omitted = a sensible per-mode default. */
    readouts: z
      .array(
        z.enum([
          "probe",
          "components",
          "axial-equatorial",
          "neutral",
          "torque",
          "energy",
          "work",
          "period",
          "loop",
          "point",
        ]),
      )
      .optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["moment", "distance", "fieldStrength", "retentivity", "coercivity"] as const) {
      if (emRangeIssue(cfg[key]) || cfg[key].min <= 0) {
        ctx.addIssue({ code: "custom", path: [key], message: "need 0 < min ≤ initial ≤ max" });
      }
    }
    if (cfg.distance.min <= cfg.halfLength) {
      ctx.addIssue({ code: "custom", path: ["distance"], message: "the probe must stay outside the poles (min > halfLength)" });
    }
    if (cfg.retentivity.max >= cfg.saturation) {
      ctx.addIssue({ code: "custom", path: ["retentivity"], message: "retentivity must stay below saturation" });
    }
    if (cfg.coercivity.max >= cfg.hMax) {
      ctx.addIssue({ code: "custom", path: ["coercivity"], message: "coercivity must stay below hMax" });
    }
    if (cfg.window.xmin >= cfg.window.xmax || cfg.window.ymin >= cfg.window.ymax) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

/**
 * Electromagnetic waves. wave: E and B drawn in perspective along x
 * (B drawn as cB so both share a scale), perpendicular to each other and
 * to the direction of travel, with an ωt slider, E₀, λ and refractive
 * index sliders, direction and polarisation toggles, and readouts for
 * B₀ = E₀/v, the wave equations, energy density, intensity and radiation
 * pressure. spectrum: a log-scale wavelength bar with the seven bands; a
 * slider moves a marker and reads off frequency, photon energy, sources
 * and uses. wavelength is in wavelengthUnit; wavelengthExp is log₁₀(λ/m).
 */
export const emWaveLabSchema = z
  .object({
    component: z.literal("em-wave-lab"),
    mode: z.enum(["wave", "spectrum"]).default("wave"),
    /** E₀ in V/m. */
    amplitude: emRangeSchema.default({ min: 1, max: 100, step: 1, initial: 30 }),
    wavelength: emRangeSchema.default({ min: 0.5, max: 10, step: 0.5, initial: 2 }),
    wavelengthUnit: z.enum(["nm", "um", "mm", "cm", "m"]).default("m"),
    refractiveIndex: emRangeSchema.default({ min: 1, max: 2.5, step: 0.05, initial: 1 }),
    direction: z.enum(["+x", "-x"]).default("+x"),
    /** The axis E oscillates along. */
    polarisation: z.enum(["y", "z"]).default("y"),
    wavelengthExp: emRangeSchema.default({ min: -13, max: 3, step: 0.05, initial: -6.3 }),
    /** wave mode sliders; omitted = all four. */
    sliders: z.array(z.enum(["E0", "lambda", "n", "t"])).optional(),
    readouts: z
      .array(
        z.enum(["fields", "equation", "speed", "energy", "intensity", "pressure", "band", "photon", "uses"]),
      )
      .optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["amplitude", "wavelength", "refractiveIndex"] as const) {
      if (emRangeIssue(cfg[key]) || cfg[key].min <= 0) {
        ctx.addIssue({ code: "custom", path: [key], message: "need 0 < min ≤ initial ≤ max" });
      }
    }
    if (cfg.refractiveIndex.min < 1) {
      ctx.addIssue({ code: "custom", path: ["refractiveIndex"], message: "refractive index must be at least 1" });
    }
    const e = cfg.wavelengthExp;
    if (emRangeIssue(e) || e.min < -14 || e.max > 4) {
      ctx.addIssue({ code: "custom", path: ["wavelengthExp"], message: "need -14 ≤ min ≤ initial ≤ max ≤ 4" });
    }
  });

// ---------- Calculus (calc) interactives ----------

const calcRangeSchema = z
  .object({ min: z.number(), max: z.number(), step: z.number().positive(), initial: z.number() })
  .refine((r) => r.min < r.max && r.initial >= r.min && r.initial <= r.max, {
    message: "need min < max and min ≤ initial ≤ max",
  });

/**
 * Tangent-line explorer: drag x₀ along f and watch the tangent, the
 * one-sided derivatives (LHD/RHD, computed numerically from `expr`) and,
 * optionally, f′ plotted underneath. A corner (LHD ≠ RHD) draws two half
 * tangents; slopes that blow up are reported as a vertical tangent.
 * `secant` adds an h slider (secant through x₀ and x₀ + h). `chord` is the
 * mean value theorem mode: the chord from a to b is drawn and every c in
 * (a, b) with f′(c) equal to the chord slope is marked. `derivExpr` is the
 * exact f′ (needed for `showDerivative`; otherwise numeric).
 */
export const calcTangentExplorerSchema = z
  .object({
    component: z.literal("calc-tangent-explorer"),
    expr: z.string().min(1),
    exprLatex: z.string().min(1),
    derivExpr: z.string().min(1).optional(),
    derivLatex: z.string().min(1).optional(),
    window: plotWindowSchema,
    /** y-window of the f′ panel (x-range is shared with `window`). */
    derivWindow: z.object({ ymin: z.number(), ymax: z.number() }).optional(),
    x0: calcRangeSchema,
    showDerivative: z.boolean().default(false),
    secant: calcRangeSchema.optional(),
    chord: z.object({ a: z.number(), b: z.number() }).optional(),
    /** x-values where f (and f′) are undefined. */
    excluded: z.array(z.number()).default([]),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.showDerivative && !cfg.derivExpr) {
      ctx.addIssue({ code: "custom", path: ["derivExpr"], message: "showDerivative needs derivExpr" });
    }
    if (cfg.chord && !(cfg.chord.a < cfg.chord.b)) {
      ctx.addIssue({ code: "custom", path: ["chord"], message: "chord needs a < b" });
    }
  });

/**
 * Sign-chart explorer: f with its critical points (f′ = 0 or f′ undefined)
 * and inflection points found numerically, plus sign charts of f′ and f″
 * underneath. A scanning x slider reads off f′(x), f″(x) and what they say
 * (rising/falling, concave up/down). `interval` turns on the closed-interval
 * method: endpoints and interior critical points are tabulated and the
 * absolute maximum and minimum are highlighted. Exact `derivExpr` /
 * `secondDerivExpr` are optional (central differences otherwise).
 */
export const calcSignChartSchema = z
  .object({
    component: z.literal("calc-sign-chart"),
    expr: z.string().min(1),
    exprLatex: z.string().min(1),
    derivExpr: z.string().min(1).optional(),
    secondDerivExpr: z.string().min(1).optional(),
    window: plotWindowSchema,
    rows: z.array(z.enum(["first", "second"])).min(1).default(["first", "second"]),
    interval: z.object({ a: z.number(), b: z.number() }).optional(),
    initial: z.number(),
    excluded: z.array(z.number()).default([]),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.interval && !(cfg.interval.a < cfg.interval.b)) {
      ctx.addIssue({ code: "custom", path: ["interval"], message: "interval needs a < b" });
    }
    if (cfg.initial < cfg.window.xmin || cfg.initial > cfg.window.xmax) {
      ctx.addIssue({ code: "custom", path: ["initial"], message: "initial must lie in the window" });
    }
  });

// ---------- Complex Numbers & Quadratics (cq) interactives ----------

const cqRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

const cqRangeValid = (r: z.infer<typeof cqRangeSchema>) =>
  r.min < r.max && r.initial >= r.min && r.initial <= r.max;

/**
 * The parabola y = ax² + bx + c with a, b, c sliders. Readouts: the
 * discriminant, the roots (real, equal or complex p ± qi), the vertex, the
 * sum and product of roots, the factored form and the range. `markers`
 * adds k₁ (and optionally k₂) on the x-axis with the location-of-roots
 * checklist (D, a·f(k), −b/2a against k). `showSign` colours the x-axis
 * where the quadratic is positive (green) or negative (red).
 */
export const cqQuadraticExplorerSchema = z
  .object({
    component: z.literal("cq-quadratic-explorer"),
    a: cqRangeSchema.default({ min: -3, max: 3, step: 0.5, initial: 1 }),
    b: cqRangeSchema.default({ min: -6, max: 6, step: 0.5, initial: -2 }),
    c: cqRangeSchema.default({ min: -6, max: 6, step: 0.5, initial: -3 }),
    /** Location of roots: one number k₁, or an interval (k₁, k₂). */
    markers: z.object({ k1: cqRangeSchema, k2: cqRangeSchema.optional() }).optional(),
    showVertex: z.boolean().default(true),
    showAxis: z.boolean().default(true),
    showRoots: z.boolean().default(true),
    showSign: z.boolean().default(false),
    /** Live values to show; omitted = discriminant, roots, vertex, sum-product. */
    readouts: z
      .array(z.enum(["discriminant", "roots", "vertex", "sum-product", "factored", "range"]))
      .optional(),
    window: plotWindowSchema.default({ xmin: -6, xmax: 6, ymin: -8, ymax: 8 }),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["a", "b", "c"] as const) {
      if (!cqRangeValid(cfg[key])) {
        ctx.addIssue({ code: "custom", path: [key], message: "need min < max and min ≤ initial ≤ max" });
      }
    }
    if (cfg.markers) {
      if (!cqRangeValid(cfg.markers.k1)) {
        ctx.addIssue({ code: "custom", path: ["markers", "k1"], message: "need min < max and min ≤ initial ≤ max" });
      }
      if (cfg.markers.k2 && !cqRangeValid(cfg.markers.k2)) {
        ctx.addIssue({ code: "custom", path: ["markers", "k2"], message: "need min < max and min ≤ initial ≤ max" });
      }
    }
    if (cfg.window.xmin >= cfg.window.xmax || cfg.window.ymin >= cfg.window.ymax) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

/**
 * The Argand plane with draggable complex numbers. Modes:
 * point (z, its modulus, principal argument, polar and Euler forms, plus
 * optional conjugate / −z / iz / 1/z), sum (parallelogram, triangle
 * inequality, optional difference), product (scale-and-rotate, args add,
 * optional quotient), powers (z, z², …, zⁿ: De Moivre), roots (the n-th
 * roots of z₁ on a circle, a regular polygon; z₁ = 1 gives roots of unity),
 * rotation (triangle z₁z₂z₃ and (z₃ − z₁)/(z₂ − z₁) as ratio·e^{iθ}).
 */
export const cqArgandPlaneSchema = z
  .object({
    component: z.literal("cq-argand-plane"),
    mode: z.enum(["point", "sum", "product", "powers", "roots", "rotation"]).default("point"),
    z1: vec2Schema.default([2, 1]),
    z2: vec2Schema.default([1, 2]),
    z3: vec2Schema.default([0, 3]),
    /** powers / roots: the exponent n (whole numbers). */
    n: z
      .object({ min: z.number().int().min(1), max: z.number().int().max(24), initial: z.number().int() })
      .default({ min: 2, max: 12, initial: 3 }),
    /** Optional overlays; which apply depends on the mode. */
    show: z
      .array(
        z.enum(["conjugate", "negative", "i-times", "reciprocal", "difference", "quotient", "unit-circle", "polygon"]),
      )
      .optional(),
    /** Handles the learner may drag; omitted = a sensible per-mode default. */
    draggable: z.array(z.enum(["z1", "z2", "z3"])).optional(),
    /** Grid step that dragged points snap to. */
    snap: z.number().positive().default(0.5),
    window: plotWindowSchema.default({ xmin: -4, xmax: 4, ymin: -4, ymax: 4 }),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.n.min > cfg.n.max || cfg.n.initial < cfg.n.min || cfg.n.initial > cfg.n.max) {
      ctx.addIssue({ code: "custom", path: ["n"], message: "need min ≤ initial ≤ max" });
    }
    if (cfg.window.xmin >= cfg.window.xmax || cfg.window.ymin >= cfg.window.ymax) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

/**
 * Loci in the Argand plane, with fixed points a and b (draggable if listed):
 * circle |z − a| = k, bisector |z − a| = |z − b|, ellipse |z − a| + |z − b| = k,
 * hyperbola |z − a| − |z − b| = k (one branch), apollonius |z − a| = k|z − b|,
 * arc arg((z − a)/(z − b)) = θ. A draggable test point P shows the defining
 * quantity at P; `probe` q marks the points of the locus nearest to and
 * farthest from q (max/min of |z − q|).
 */
export const cqLocusExplorerSchema = z
  .object({
    component: z.literal("cq-locus-explorer"),
    locus: z.enum(["circle", "bisector", "ellipse", "hyperbola", "apollonius", "arc"]).default("circle"),
    a: vec2Schema.default([-1, 0]),
    b: vec2Schema.default([1, 0]),
    /** The constant k (radius, sum, difference or ratio); omitted = a per-locus default. */
    k: cqRangeSchema.optional(),
    /** arc: θ in degrees. */
    theta: cqRangeSchema.default({ min: 15, max: 165, step: 15, initial: 60 }),
    /** Test point P. */
    p: vec2Schema.default([0, 2]),
    /** When set, mark the nearest and farthest points of the locus from q. */
    probe: vec2Schema.optional(),
    /** Shade the inside of a closed locus (circle, ellipse, apollonius). */
    shade: z.boolean().default(false),
    draggable: z.array(z.enum(["a", "b", "p", "probe"])).default(["p"]),
    snap: z.number().positive().default(0.5),
    window: plotWindowSchema.default({ xmin: -5, xmax: 5, ymin: -4, ymax: 4 }),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.k && !cqRangeValid(cfg.k)) {
      ctx.addIssue({ code: "custom", path: ["k"], message: "need min < max and min ≤ initial ≤ max" });
    }
    if (!cqRangeValid(cfg.theta)) {
      ctx.addIssue({ code: "custom", path: ["theta"], message: "need min < max and min ≤ initial ≤ max" });
    }
    if (cfg.window.xmin >= cfg.window.xmax || cfg.window.ymin >= cfg.window.ymax) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

// ---------- Sets, Relations and Functions (srf) interactives ----------

const srfRegionKey = z.enum(["", "A", "B", "C", "AB", "AC", "BC", "ABC"]);

/**
 * Two- or three-set Venn diagram. Shade a preset expression or click regions
 * to shade your own; with `counts`, every shaded region shows its count and
 * the readout totals them (plus the inclusion–exclusion breakdown).
 * Expressions use `|` union, `&` intersection, `-` difference, `^` symmetric
 * difference, postfix `'` complement, brackets, and atoms A, B, C, U, 0.
 */
export const srfVennDiagramSchema = z
  .object({
    component: z.literal("srf-venn-diagram"),
    sets: z.union([z.literal(2), z.literal(3)]).default(2),
    /** Display names for the circles (plain text), default A, B, C. */
    labels: z.array(z.string().min(1).max(14)).min(2).max(3).optional(),
    universeLabel: z.string().min(1).max(14).default("U"),
    /**
     * Element count of each region: "" outside every set, "A" in A only,
     * "AB" in A and B only, "ABC" in all three. Missing regions count 0.
     */
    counts: z.partialRecord(srfRegionKey, z.number().int().min(0)).optional(),
    /** Preset expressions offered as buttons; `latex` is raw KaTeX (no $). */
    expressions: z
      .array(z.object({ expr: z.string().min(1), latex: z.string().min(1) }))
      .max(8)
      .default([]),
    /** Index into `expressions` shaded at the start; absent means nothing shaded. */
    initialExpression: z.number().int().min(0).optional(),
    /** Show n(A), n(A ∩ B), ... and the inclusion–exclusion total (needs counts). */
    showInclusionExclusion: z.boolean().default(false),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.labels && cfg.labels.length !== cfg.sets) {
      ctx.addIssue({ code: "custom", path: ["labels"], message: "need one label per set" });
    }
    cfg.expressions.forEach((e, i) => {
      const result = srfShadedRegions(e.expr, cfg.sets);
      if (typeof result === "string") {
        ctx.addIssue({ code: "custom", path: ["expressions", i, "expr"], message: result });
      }
    });
    if (cfg.initialExpression !== undefined && cfg.initialExpression >= cfg.expressions.length) {
      ctx.addIssue({ code: "custom", path: ["initialExpression"], message: "no such expression" });
    }
    if (cfg.sets === 2 && cfg.counts && Object.keys(cfg.counts).some((k) => k.includes("C"))) {
      ctx.addIssue({ code: "custom", path: ["counts"], message: "a two-set diagram has no C regions" });
    }
    if (cfg.showInclusionExclusion && !cfg.counts) {
      ctx.addIssue({ code: "custom", path: ["counts"], message: "showInclusionExclusion needs counts" });
    }
  });

/**
 * Arrow diagram for a finite relation or function, with a pair grid to
 * toggle pairs. Relation mode (R on one set A): reflexive / symmetric /
 * antisymmetric / transitive checks with counterexamples, equivalence
 * classes and an equivalence-closure button. Function mode (A to B):
 * function? one-one? onto? with witnesses, and the counts of all, one-one
 * and onto functions between sets of these sizes.
 */
export const srfMappingExplorerSchema = z
  .object({
    component: z.literal("srf-mapping-explorer"),
    mode: z.enum(["relation", "function"]).default("relation"),
    /** Relation mode: the set A. Function mode: the domain. Plain-text labels. */
    domain: z.array(z.string().min(1).max(6)).min(1).max(6),
    /** Function mode: the codomain (defaults to the domain). */
    codomain: z.array(z.string().min(1).max(6)).min(1).max(6).optional(),
    /** Starting pairs [a, b] meaning a R b, or f(a) = b. */
    pairs: z.array(z.tuple([z.string(), z.string()])).default([]),
    editable: z.boolean().default(true),
    /** Function mode: show the counts of functions / injections / surjections. */
    showCounts: z.boolean().default(false),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    const codomain = cfg.codomain ?? cfg.domain;
    if (new Set(cfg.domain).size !== cfg.domain.length || new Set(codomain).size !== codomain.length) {
      ctx.addIssue({ code: "custom", path: ["domain"], message: "element labels must be distinct" });
    }
    cfg.pairs.forEach(([a, b], i) => {
      if (!cfg.domain.includes(a) || !codomain.includes(b)) {
        ctx.addIssue({ code: "custom", path: ["pairs", i], message: `pair (${a}, ${b}) uses an unknown element` });
      }
    });
  });

/**
 * Plot lab for the JEE special functions and graph transformations. Each
 * function is an expression in x (math-eval grammar plus floor, ceil, frac,
 * sgn, cbrt, cot, sec, csc, acot, asec, acsc); jumps get open and closed
 * dots. Transforms: |f(x)|, f(|x|), [f(x)], {f(x)}, -f(x), f(-x), and the
 * inverse (reflection of the `branch` piece in y = x).
 */
export const srfGraphLabSchema = z
  .object({
    component: z.literal("srf-graph-lab"),
    functions: z
      .array(
        z.object({
          label: z.string().min(1),
          expr: z.string().min(1),
          /** Raw KaTeX for f(x), no $. */
          latex: z.string().min(1),
          /** Restricted domain whose piece is highlighted and inverted. */
          branch: z.object({ min: z.number(), max: z.number() }).optional(),
        }),
      )
      .min(1)
      .max(10),
    transforms: z
      .array(z.enum(["none", "abs", "abs-x", "floor", "frac", "neg", "neg-x", "inverse"]))
      .min(1)
      .default(["none"]),
    window: plotWindowSchema,
    /** Label the x-axis in multiples of pi. */
    xAxis: z.enum(["numeric", "radians"]).default("numeric"),
    /** Draw the line y = x (always drawn for the inverse transform). */
    showMirror: z.boolean().default(false),
    /** Start value of the x probe; absent hides the probe. */
    probe: z.number().optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    cfg.functions.forEach((f, i) => {
      const err = srfExpressionError(f.expr);
      if (err) ctx.addIssue({ code: "custom", path: ["functions", i, "expr"], message: err });
      if (f.branch && !(f.branch.min < f.branch.max)) {
        ctx.addIssue({ code: "custom", path: ["functions", i, "branch"], message: "branch needs min < max" });
      }
    });
    const w = cfg.window;
    if (!(w.xmin < w.xmax && w.ymin < w.ymax)) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window needs xmin < xmax and ymin < ymax" });
    }
    if (cfg.probe !== undefined && (cfg.probe < w.xmin || cfg.probe > w.xmax)) {
      ctx.addIssue({ code: "custom", path: ["probe"], message: "probe must lie in the window" });
    }
  });

// ---------- Integral Calculus (integ) interactives ----------

const integRangeSchema = z
  .object({ min: z.number(), max: z.number(), step: z.number().positive(), initial: z.number() })
  .refine((r) => r.min < r.max && r.initial >= r.min && r.initial <= r.max, {
    message: "need min < max and min ≤ initial ≤ max",
  });

/**
 * Riemann-sum explorer: f on [a, b] cut into n strips, with left, right,
 * midpoint or trapezoid heights. Rectangles above the axis are shaded one
 * colour, below the axis another (signed area). The sum is compared with
 * the exact integral (`exact`, or Simpson's rule with 2000 panels when
 * absent). `accumulate` is the Fundamental Theorem mode: an upper-limit
 * slider x sweeps from a to b and reads off A(x) = ∫ₐˣ f(t) dt and f(x).
 */
export const integRiemannSumSchema = z
  .object({
    component: z.literal("integ-riemann-sum"),
    expr: z.string().min(1),
    exprLatex: z.string().min(1),
    window: plotWindowSchema,
    a: z.number(),
    b: z.number(),
    /** LaTeX for the limits when they are not tidy decimals, e.g. "\\pi". */
    aLatex: z.string().min(1).optional(),
    bLatex: z.string().min(1).optional(),
    n: z
      .object({
        min: z.number().int().min(1),
        max: z.number().int().max(200),
        initial: z.number().int(),
      })
      .default({ min: 1, max: 50, initial: 4 }),
    methods: z
      .array(z.enum(["left", "right", "midpoint", "trapezoid"]))
      .min(1)
      .default(["left", "right", "midpoint"]),
    /** Exact value of the integral (numeric fallback when absent). */
    exact: z.number().optional(),
    /** LaTeX for the exact value, e.g. "\\tfrac{8}{3}". */
    exactLatex: z.string().min(1).optional(),
    accumulate: z.boolean().default(false),
    excluded: z.array(z.number()).default([]),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (!(cfg.a < cfg.b)) ctx.addIssue({ code: "custom", path: ["b"], message: "need a < b" });
    if (cfg.a < cfg.window.xmin || cfg.b > cfg.window.xmax) {
      ctx.addIssue({ code: "custom", path: ["a"], message: "[a, b] must lie in the window" });
    }
    if (!(cfg.n.min <= cfg.n.initial && cfg.n.initial <= cfg.n.max)) {
      ctx.addIssue({ code: "custom", path: ["n"], message: "need n.min ≤ n.initial ≤ n.max" });
    }
  });

/**
 * Area between two curves. `variable: "x"` takes y = f(x) and y = g(x)
 * (expressions in x) with vertical strips from a to b; `variable: "y"`
 * takes x = f(y) and x = g(y) (expressions in y) with horizontal strips
 * from y = a to y = b. g defaults to 0 (the axis). The region is shaded
 * (where f ≥ g one colour, where f < g another), crossings are found
 * numerically, and a strip slider reads off the strip length f − g. The
 * readout compares the signed ∫(f − g) with the area ∫|f − g|.
 */
export const integAreaBetweenSchema = z
  .object({
    component: z.literal("integ-area-between"),
    variable: z.enum(["x", "y"]).default("x"),
    f: z.string().min(1),
    fLatex: z.string().min(1),
    g: z.string().min(1).default("0"),
    gLatex: z.string().min(1).default("0"),
    a: z.number(),
    b: z.number(),
    aLatex: z.string().min(1).optional(),
    bLatex: z.string().min(1).optional(),
    window: plotWindowSchema,
    /** Initial strip position (defaults to the midpoint of [a, b]). */
    strip: z.number().optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (!(cfg.a < cfg.b)) ctx.addIssue({ code: "custom", path: ["b"], message: "need a < b" });
    if (cfg.strip !== undefined && (cfg.strip < cfg.a || cfg.strip > cfg.b)) {
      ctx.addIssue({ code: "custom", path: ["strip"], message: "strip must lie in [a, b]" });
    }
  });

/**
 * Slope field for dy/dx = F(x, y) (an expression in x and y). Short
 * segments of slope F are drawn on a grid; the solution curve through the
 * draggable point (x₀, y₀) is traced numerically (RK4) both ways until it
 * leaves the window or the slope blows up. `curves` adds fixed solution
 * curves through extra points (a family). With F depending on x alone,
 * every curve is a vertical shift of the others: the + C of an
 * antiderivative.
 */
export const integSlopeFieldSchema = z.object({
  component: z.literal("integ-slope-field"),
  expr: z.string().min(1),
  exprLatex: z.string().min(1),
  window: plotWindowSchema,
  x0: integRangeSchema,
  y0: integRangeSchema,
  grid: z.number().int().min(6).max(30).default(17),
  curves: z.array(z.object({ x: z.number(), y: z.number() })).max(8).default([]),
  caption: z.string().optional(),
});

// ---------- Sequences and Series (seq) interactives ----------

const seqRangeSchema = z
  .object({ min: z.number(), max: z.number(), step: z.number().positive(), initial: z.number() })
  .refine((r) => r.min < r.max && r.initial >= r.min && r.initial <= r.max, {
    message: "need min < max and min ≤ initial ≤ max",
  });

/**
 * Sequence and partial-sum plotter. Pick a progression (AP, GP, HP, AGP)
 * and drag a, d, r and n: the terms t_k are drawn as stems, the partial
 * sums S_k as a joined dot plot, and for a convergent GP / AGP (|r| < 1)
 * the sum to infinity as a dashed line. Readouts give t_n, S_n (from the
 * closed form where one exists) and S∞. `series` adds authored general
 * terms in the variable k (math-eval grammar), e.g. "1/(k*(k+1))", with an
 * optional known `limit` drawn as the dashed line. HP terms are
 * 1/(a + (k − 1)d), the reciprocals of the AP with the same a and d.
 */
export const seqProgressionLabSchema = z
  .object({
    component: z.literal("seq-progression-lab"),
    kinds: z.array(z.enum(["ap", "gp", "hp", "agp"])).max(4).default(["ap", "gp"]),
    series: z
      .array(
        z.object({
          /** Plain-text button label. */
          label: z.string().min(1).max(24),
          /** General term in k, e.g. "1/(k*(k+1))". */
          expr: z.string().min(1),
          /** Raw KaTeX for t_k, no $. */
          latex: z.string().min(1),
          /** Known sum to infinity, drawn as a dashed line. */
          limit: z.number().optional(),
          /** Raw KaTeX for the limit (defaults to the number). */
          limitLatex: z.string().min(1).optional(),
        }),
      )
      .max(6)
      .default([]),
    a: seqRangeSchema.default({ min: -5, max: 10, step: 0.5, initial: 2 }),
    d: seqRangeSchema.default({ min: -3, max: 3, step: 0.25, initial: 1 }),
    r: seqRangeSchema.default({ min: -1.5, max: 1.5, step: 0.05, initial: 0.5 }),
    n: seqRangeSchema.default({ min: 1, max: 30, step: 1, initial: 10 }),
    view: z.enum(["terms", "sums", "both"]).default("both"),
    /** Draw S∞ for a convergent GP / AGP (and `limit` for authored series). */
    showLimit: z.boolean().default(true),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.kinds.length + cfg.series.length === 0) {
      ctx.addIssue({ code: "custom", path: ["kinds"], message: "need at least one progression or series" });
    }
    cfg.series.forEach((s, i) => {
      const err = seqExpressionError(s.expr);
      if (err) ctx.addIssue({ code: "custom", path: ["series", i, "expr"], message: err });
    });
    const n = cfg.n;
    if (!(Number.isInteger(n.min) && Number.isInteger(n.max) && Number.isInteger(n.initial) && n.step === 1)) {
      ctx.addIssue({ code: "custom", path: ["n"], message: "n needs integer min, max, initial and step 1" });
    }
    if (n.min < 1 || n.max > 60) {
      ctx.addIssue({ code: "custom", path: ["n"], message: "n must stay within 1 to 60" });
    }
  });

/**
 * AM–GM–HM on a semicircle. Two positive lengths a and b (sliders) lie
 * end to end along a diameter. The radius is the AM, the half-chord
 * perpendicular to the diameter at the join is the GM, and the foot of the
 * perpendicular from the join onto the radius cuts off the HM. Readouts
 * show AM ≥ GM ≥ HM and G² = AH; equality when a = b. `fixed` locks the
 * sum (a + b) or the product (ab) so the learner sees the AM–GM
 * optimisation: with a fixed sum the product is largest at a = b, with a
 * fixed product the sum is smallest at a = b.
 */
export const seqMeansLabSchema = z
  .object({
    component: z.literal("seq-means-lab"),
    a: seqRangeSchema.default({ min: 0.5, max: 12, step: 0.5, initial: 9 }),
    b: seqRangeSchema.default({ min: 0.5, max: 12, step: 0.5, initial: 4 }),
    fixed: z.enum(["none", "sum", "product"]).default("none"),
    showHm: z.boolean().default(true),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (!(cfg.a.min > 0 && cfg.b.min > 0)) {
      ctx.addIssue({ code: "custom", path: ["a"], message: "a and b must be positive" });
    }
  });

// ---------- Three-Dimensional Geometry (tdg) interactives ----------

const tdgRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

const tdgRangeValid = (r: z.infer<typeof tdgRangeSchema>) =>
  r.min < r.max && r.initial >= r.min && r.initial <= r.max;

/** A plane ax + by + cz + d = 0, written [a, b, c, d]. */
const tdgPlaneSchema = z.tuple([z.number(), z.number(), z.number(), z.number()]);

/**
 * Rotatable 3D scene (orthographic SVG projection; drag or arrow keys to
 * rotate; right-handed axes, z up) for points, lines and planes. Modes:
 * - points: A and B, the segment AB and its length. `show`: "box" (the
 *   coordinate box of each point), "projections" (AB projected on the
 *   axes), "section" (P divides AB in m : n; add "external" for external
 *   division), "centroid" (of triangle ABC, and of tetrahedron ABCD).
 * - line: r = a + λb through A (`a`) with direction `b`, in vector and
 *   Cartesian form with direction cosines. "general-point" (λ slider),
 *   "foot" and "image" (of P).
 * - two-lines: L₁ = (a, b), L₂ = (c, d): parallel / intersecting / skew,
 *   the angle, and "shortest-distance" (the common perpendicular, its feet).
 * - plane: `plane` with "normal", the foot from O, and P with "foot",
 *   "image", distance and side; "intercepts" draws the intercept triangle.
 * - two-planes: `plane` and `plane2`: the angle between them, the line of
 *   intersection ("intersection"), or the gap when parallel.
 * - line-plane: line (a, b) and `plane`: the angle between them,
 *   "intersection" (the meeting point) and "projection" (the projection of
 *   the line on the plane).
 */
export const tdgSpaceViewerSchema = z
  .object({
    component: z.literal("tdg-space-viewer"),
    mode: z.enum(["points", "line", "two-lines", "plane", "two-planes", "line-plane"]).default("points"),
    /** points: A. Line modes: a point on L₁. */
    a: vec3Schema.default([1, 2, 3]),
    /** points: B. Line modes: the direction of L₁. */
    b: vec3Schema.default([4, -2, 1]),
    /** points: C. two-lines: a point on L₂. */
    c: vec3Schema.default([-2, 1, 2]),
    /** points: D (tetrahedron centroid). two-lines: the direction of L₂. */
    d: vec3Schema.default([1, 3, -1]),
    /** The external point P (line, plane modes). */
    p: vec3Schema.default([3, 3, 2]),
    plane: tdgPlaneSchema.default([1, 2, 2, -6]),
    plane2: tdgPlaneSchema.default([2, -1, 1, -2]),
    /** points + section: the ratio m : n. */
    m: tdgRangeSchema.default({ min: 1, max: 5, step: 1, initial: 2 }),
    n: tdgRangeSchema.default({ min: 1, max: 5, step: 1, initial: 1 }),
    /** line + general-point: the parameter λ. */
    lambda: tdgRangeSchema.default({ min: -3, max: 3, step: 0.25, initial: 1 }),
    /** Extra sliders: the coordinates of P, or the constant d of `plane`. */
    sliders: z
      .array(
        z.object({
          name: z.enum(["px", "py", "pz", "d"]),
          min: z.number(),
          max: z.number(),
          step: z.number().positive(),
          initial: z.number(),
        }),
      )
      .default([]),
    /** Optional overlays; omitted = a sensible per-mode default. */
    show: z
      .array(
        z.enum([
          "box",
          "projections",
          "section",
          "external",
          "centroid",
          "general-point",
          "foot",
          "image",
          "shortest-distance",
          "normal",
          "intercepts",
          "intersection",
          "projection",
        ]),
      )
      .optional(),
    /** Camera azimuth (yaw, from +x toward +y) and elevation (pitch), degrees. */
    initialView: z.object({ yaw: z.number(), pitch: z.number() }).default({ yaw: 35, pitch: 22 }),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["m", "n", "lambda"] as const) {
      if (!tdgRangeValid(cfg[key])) {
        ctx.addIssue({ code: "custom", path: [key], message: "need min < max and min ≤ initial ≤ max" });
      }
    }
    if (cfg.m.min <= 0 || cfg.n.min <= 0) {
      ctx.addIssue({ code: "custom", path: ["m"], message: "m and n must be positive" });
    }
    cfg.sliders.forEach((s, i) => {
      if (!tdgRangeValid(s)) {
        ctx.addIssue({ code: "custom", path: ["sliders", i], message: "need min < max and min ≤ initial ≤ max" });
      }
    });
  });

/**
 * Distance and angle calculator: editable integer inputs (± steppers),
 * the formula worked on the live numbers step by step, and a small
 * schematic. Inputs per mode:
 * - two-points (p1, p2): distance, midpoint, projections on the axes and
 *   the ratio in which each coordinate plane divides P₁P₂.
 * - direction (d1): direction ratios → direction cosines and angles.
 * - two-directions (d1, d2): angle between two lines, parallel/perpendicular.
 * - point-line (p1 = P; p2, d1 = the line): foot, distance, image.
 * - skew-lines (p1, d1; p2, d2): classification and shortest distance.
 * - point-plane (p1, plane1): signed value, distance, side, foot, image.
 * - two-planes (plane1, plane2): angle, or the distance when parallel.
 * - line-plane (p1, d1, plane1): angle, and the meeting point.
 */
export const tdgDistanceLabSchema = z.object({
  component: z.literal("tdg-distance-lab"),
  mode: z
    .enum(["two-points", "direction", "two-directions", "point-line", "skew-lines", "point-plane", "two-planes", "line-plane"])
    .default("point-plane"),
  p1: vec3Schema.default([1, 2, 3]),
  p2: vec3Schema.default([4, -2, 1]),
  d1: vec3Schema.default([2, -1, 2]),
  d2: vec3Schema.default([1, 2, -2]),
  plane1: tdgPlaneSchema.default([2, -1, 2, -5]),
  plane2: tdgPlaneSchema.default([4, -2, 4, 7]),
  /** Show ± steppers on every input (else the inputs are fixed). */
  editable: z.boolean().default(true),
  caption: z.string().optional(),
});

// ---------- Straight Lines and Circles (slc) interactives ----------

const slcRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

const slcRangeValid = (r: z.infer<typeof slcRangeSchema>) =>
  r.min < r.max && r.initial >= r.min && r.initial <= r.max;

const slcWindowValid = (w: z.infer<typeof plotWindowSchema>) => w.xmin < w.xmax && w.ymin < w.ymax;

/**
 * Coordinate plane with draggable points A, B, C, D and P (snapping to a
 * grid). Modes:
 * - section: P divides AB internally in m : n (and Q externally), with the
 *   section formula worked on the live numbers.
 * - triangle: triangle ABC, its area by the determinant and the centres
 *   (centroid, incentre, circumcentre, orthocentre, excentres, Euler line,
 *   circumcircle, incircle, medians, altitudes) chosen in `show`.
 * - line: the line AB with its slope, inclination, intercepts and every
 *   standard form (slope-intercept, point-slope, two-point, intercept,
 *   normal, parametric, general).
 * - point-line: line AB and point P: distance, foot of the perpendicular,
 *   image, and the sign of L(P) against L(O) (same or opposite side).
 * - two-lines: L₁ = AB and L₂ = CD: intersection, acute angle, parallel /
 *   perpendicular tests, and (show "bisectors") both angle bisectors with
 *   the origin-containing and acute bisectors named.
 * - family: L₁ + λL₂ = 0 with a λ slider; every member passes through
 *   L₁ ∩ L₂ (show "family-fan" draws several members faintly).
 * - pair: ax² + 2hxy + by² = 0 with a, h, b sliders: the two lines through
 *   the origin, h² − ab, m₁ + m₂, m₁m₂ and the angle between them.
 */
export const slcLineExplorerSchema = z
  .object({
    component: z.literal("slc-line-explorer"),
    mode: z.enum(["section", "triangle", "line", "point-line", "two-lines", "family", "pair"]).default("line"),
    a: vec2Schema.default([-3, -1]),
    b: vec2Schema.default([3, 2]),
    c: vec2Schema.default([1, 4]),
    d: vec2Schema.default([4, -2]),
    p: vec2Schema.default([3, -2]),
    /** section: the ratio m : n. */
    m: slcRangeSchema.default({ min: 1, max: 6, step: 1, initial: 2 }),
    n: slcRangeSchema.default({ min: 1, max: 6, step: 1, initial: 1 }),
    /** family: λ in L₁ + λL₂ = 0. */
    lambda: slcRangeSchema.default({ min: -4, max: 4, step: 0.25, initial: 1 }),
    /** pair: coefficients of ax² + 2hxy + by² = 0. */
    coef: z
      .object({ a: slcRangeSchema, h: slcRangeSchema, b: slcRangeSchema })
      .default({
        a: { min: -5, max: 5, step: 0.5, initial: 1 },
        h: { min: -5, max: 5, step: 0.5, initial: 2 },
        b: { min: -5, max: 5, step: 0.5, initial: -3 },
      }),
    /** Optional overlays; omitted = a sensible per-mode default. */
    show: z
      .array(
        z.enum([
          "centroid",
          "incentre",
          "circumcentre",
          "orthocentre",
          "excentres",
          "euler-line",
          "circumcircle",
          "incircle",
          "medians",
          "altitudes",
          "external",
          "forms",
          "intercepts",
          "foot",
          "image",
          "bisectors",
          "family-fan",
        ]),
      )
      .optional(),
    /** Points the learner may drag; omitted = a per-mode default. */
    draggable: z.array(z.enum(["a", "b", "c", "d", "p"])).optional(),
    snap: z.number().positive().default(0.5),
    window: plotWindowSchema.default({ xmin: -6, xmax: 6, ymin: -5, ymax: 5 }),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    const ranges = { m: cfg.m, n: cfg.n, lambda: cfg.lambda, "coef.a": cfg.coef.a, "coef.h": cfg.coef.h, "coef.b": cfg.coef.b };
    for (const [key, r] of Object.entries(ranges)) {
      if (!slcRangeValid(r)) {
        ctx.addIssue({ code: "custom", path: key.split("."), message: "need min < max and min ≤ initial ≤ max" });
      }
    }
    if (cfg.m.min <= 0 || cfg.n.min <= 0) {
      ctx.addIssue({ code: "custom", path: ["m"], message: "m and n must be positive" });
    }
    if (!slcWindowValid(cfg.window)) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

/**
 * Circle lab: a circle with draggable centre and a radius slider. Modes:
 * - circle: centre-radius and general equations, a test point P with S₁ and
 *   its position (show "parametric" adds a θ slider and the point
 *   (h + r cos θ, k + r sin θ); "normal" draws the normal through P).
 * - line: the line AB against the circle: distance from the centre, number
 *   of meeting points, chord length 2√(r² − d²), tangency.
 * - tangents: point P. Outside: both tangents, the tangent length √S₁ and
 *   the chord of contact. Inside: the polar of P and the chord with
 *   midpoint P. Optional director circle.
 * - two-circles: a second circle: d against r₁ + r₂ and |r₁ − r₂|, the
 *   relative position, the number of common tangents (drawn), the radical
 *   axis / common chord and the orthogonality test.
 * - three-circles: three circles, their three radical axes and the radical
 *   centre (with the orthogonal circle when the power there is positive).
 */
export const slcCircleLabSchema = z
  .object({
    component: z.literal("slc-circle-lab"),
    mode: z.enum(["circle", "line", "tangents", "two-circles", "three-circles"]).default("circle"),
    centre: vec2Schema.default([0, 0]),
    radius: slcRangeSchema.default({ min: 0.5, max: 5, step: 0.25, initial: 2.5 }),
    p: vec2Schema.default([4, 2]),
    a: vec2Schema.default([-4, -3]),
    b: vec2Schema.default([4, 1]),
    centre2: vec2Schema.default([3, 1]),
    radius2: slcRangeSchema.default({ min: 0.5, max: 5, step: 0.25, initial: 2 }),
    centre3: vec2Schema.default([-1, 3]),
    radius3: slcRangeSchema.default({ min: 0.5, max: 5, step: 0.25, initial: 1.5 }),
    /** Optional overlays; omitted = a sensible per-mode default. */
    show: z
      .array(
        z.enum([
          "general-form",
          "parametric",
          "normal",
          "tangents",
          "chord-of-contact",
          "polar",
          "midpoint-chord",
          "director-circle",
          "common-tangents",
          "radical-axis",
          "orthogonal",
        ]),
      )
      .optional(),
    /** Handles the learner may drag; omitted = a per-mode default. */
    draggable: z.array(z.enum(["centre", "p", "a", "b", "centre2", "centre3"])).optional(),
    snap: z.number().positive().default(0.5),
    window: plotWindowSchema.default({ xmin: -6, xmax: 6, ymin: -5, ymax: 5 }),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["radius", "radius2", "radius3"] as const) {
      if (!slcRangeValid(cfg[key])) {
        ctx.addIssue({ code: "custom", path: [key], message: "need min < max and min ≤ initial ≤ max" });
      } else if (cfg[key].min <= 0) {
        ctx.addIssue({ code: "custom", path: [key], message: "radius must be positive" });
      }
    }
    if (!slcWindowValid(cfg.window)) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

// ---------- Conic Sections (con) interactives ----------

const conRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
});

const conRangeValid = (r: z.infer<typeof conRangeSchema>) =>
  r.min < r.max && r.initial >= r.min && r.initial <= r.max;

/**
 * One definition, every conic. Mode `focus-directrix`: focus S at the
 * origin, directrix x = −ℓ/e; the e slider morphs a circle (e = 0) into an
 * ellipse, a parabola (e = 1) and a hyperbola at a fixed semi-latus rectum
 * ℓ. P sits on the conic at polar angle θ (degrees) seen from S; readouts
 * PS, PM and PS/PM = e. `show` adds the second focus and directrix, the
 * centre and the latus rectum. Mode `cone`: side view of a double cone with
 * semi-vertical angle α cut by a plane at angle β to the axis, at
 * perpendicular distance `offset` from the vertex (0 = through it): names the
 * section, degenerate ones included, with e = cos β / cos α.
 */
export const conConicExplorerSchema = z
  .object({
    component: z.literal("con-conic-explorer"),
    mode: z.enum(["focus-directrix", "cone"]).default("focus-directrix"),
    e: conRangeSchema.default({ min: 0, max: 2.5, step: 0.05, initial: 0.6 }),
    /** Semi-latus rectum ℓ (half the latus rectum): fixes the size. */
    l: conRangeSchema.default({ min: 1, max: 4, step: 0.5, initial: 2 }),
    /** Polar angle of P at the focus, degrees. */
    theta: conRangeSchema.default({ min: -180, max: 180, step: 5, initial: 60 }),
    /** cone: semi-vertical angle α, degrees. */
    alpha: conRangeSchema.default({ min: 15, max: 60, step: 5, initial: 30 }),
    /** cone: angle β between the cutting plane and the axis, degrees. */
    beta: conRangeSchema.default({ min: 0, max: 90, step: 5, initial: 60 }),
    /** cone: perpendicular distance d of the plane from the vertex (0 = through the vertex). */
    offset: conRangeSchema.default({ min: 0, max: 3, step: 0.5, initial: 1.5 }),
    /** Sliders to show; omitted = e and θ (focus-directrix) or α, β and offset (cone). */
    sliders: z.array(z.enum(["e", "l", "theta", "alpha", "beta", "offset"])).optional(),
    show: z
      .array(z.enum(["directrix", "distances", "second-focus", "centre", "latus-rectum"]))
      .default(["directrix", "distances"]),
    window: plotWindowSchema.default({ xmin: -7, xmax: 9, ymin: -6, ymax: 6 }),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["e", "l", "theta", "alpha", "beta", "offset"] as const) {
      if (!conRangeValid(cfg[key])) {
        ctx.addIssue({ code: "custom", path: [key], message: "need min < max and min ≤ initial ≤ max" });
      }
    }
    if (cfg.e.min < 0) ctx.addIssue({ code: "custom", path: ["e"], message: "e cannot be negative" });
    if (cfg.l.min <= 0) ctx.addIssue({ code: "custom", path: ["l"], message: "ℓ must be positive" });
    if (cfg.alpha.min <= 0 || cfg.alpha.max >= 90) {
      ctx.addIssue({ code: "custom", path: ["alpha"], message: "α must lie strictly between 0° and 90°" });
    }
    if (cfg.beta.min < 0 || cfg.beta.max > 90) {
      ctx.addIssue({ code: "custom", path: ["beta"], message: "β must lie in [0°, 90°]" });
    }
    if (cfg.offset.min < 0) ctx.addIssue({ code: "custom", path: ["offset"], message: "offset cannot be negative" });
    if (cfg.window.xmin >= cfg.window.xmax || cfg.window.ymin >= cfg.window.ymax) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

/**
 * Tangent–normal–chord lab on a standard conic: parabola y² = 4ax, ellipse
 * x²/a² + y²/b² = 1 (major axis on y when b > a), hyperbola
 * x²/a² − y²/b² = 1, rectangular hyperbola xy = c² (c is the `a` slider).
 * P is (at², 2at), (a cos θ, b sin θ), (a sec θ, b tan θ) or (ct, c/t):
 * `t` is t, or θ in degrees. Overlays in `show`. The draggable point Q
 * (when `q` is set) drives chord-of-contact (T = 0), pair-of-tangents and
 * midpoint-chord (T = S₁) overlays, with S₁ and the tangent count.
 */
export const conTangentLabSchema = z
  .object({
    component: z.literal("con-tangent-lab"),
    conic: z.enum(["parabola", "ellipse", "hyperbola", "rectangular"]).default("parabola"),
    /** a (or c for xy = c²); omitted = a per-conic default. */
    a: conRangeSchema.optional(),
    /** b (ellipse, hyperbola); omitted = a per-conic default. */
    b: conRangeSchema.optional(),
    /** P's parameter: t, or θ in degrees; omitted = a per-conic default. */
    t: conRangeSchema.optional(),
    /** Slider-free values are fixed at `initial`; list the sliders to show (omitted = a, b where used, and t). */
    sliders: z.array(z.enum(["a", "b", "t"])).optional(),
    show: z
      .array(
        z.enum([
          "tangent",
          "normal",
          "focus",
          "directrix",
          "latus-rectum",
          "focal-chord",
          "focal-radii",
          "auxiliary-circle",
          "director-circle",
          "asymptotes",
          "chord-of-contact",
          "pair-of-tangents",
          "midpoint-chord",
        ]),
      )
      .default(["tangent", "normal"]),
    /** Draggable point Q for the chord overlays. */
    q: vec2Schema.optional(),
    snap: z.number().positive().default(0.5),
    /** omitted = a per-conic default window. */
    window: plotWindowSchema.optional(),
    caption: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    for (const key of ["a", "b", "t"] as const) {
      const r = cfg[key];
      if (r && !conRangeValid(r)) {
        ctx.addIssue({ code: "custom", path: [key], message: "need min < max and min ≤ initial ≤ max" });
      }
    }
    for (const key of ["a", "b"] as const) {
      const r = cfg[key];
      if (r && r.min <= 0) ctx.addIssue({ code: "custom", path: [key], message: `${key} must be positive` });
    }
    if (cfg.window && (cfg.window.xmin >= cfg.window.xmax || cfg.window.ymin >= cfg.window.ymax)) {
      ctx.addIssue({ code: "custom", path: ["window"], message: "window must have positive width and height" });
    }
  });

export const interactiveConfigSchema = z.discriminatedUnion("component", [
  conConicExplorerSchema,
  conTangentLabSchema,
  slcLineExplorerSchema,
  slcCircleLabSchema,
  tdgSpaceViewerSchema,
  tdgDistanceLabSchema,
  seqProgressionLabSchema,
  seqMeansLabSchema,
  integRiemannSumSchema,
  integAreaBetweenSchema,
  integSlopeFieldSchema,
  srfVennDiagramSchema,
  srfMappingExplorerSchema,
  srfGraphLabSchema,
  calcTangentExplorerSchema,
  calcSignChartSchema,
  emFieldCanvasSchema,
  emCircuitLabSchema,
  emMagnetLabSchema,
  emWaveLabSchema,
  ompRayBenchSchema,
  ompQuantumLabSchema,
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
  rightTriangleExplorerSchema,
  unitCircleSchema,
  circleToWaveSchema,
  sinusoidPlaygroundSchema,
  identityDiagramSchema,
  equationSolutionViewerSchema,
  triangleSolverSchema,
  vecCanvas2dSchema,
  vecSpace3dSchema,
  pncCountingTreeSchema,
  pncArrangementListerSchema,
  pncPascalTriangleSchema,
  probSimulatorSchema,
  probTreeDiagramSchema,
  probDistributionExplorerSchema,
  matrixTransformGridSchema,
  matrixRowReducerSchema,
  linearSystemLinesSchema,
  statsDistributionBuilderSchema,
  statsScatterRegressionSchema,
  statsNormalSamplingLabSchema,
  mrgCollisionLabSchema,
  mrgRollingLabSchema,
  owtWaveLabSchema,
  owtThermoLabSchema,
  mfeMotionLabSchema,
  mfeForceLabSchema,
  cqQuadraticExplorerSchema,
  cqArgandPlaneSchema,
  cqLocusExplorerSchema,
]);

export const interactiveBlockSchema = z.object({
  type: z.literal("interactive"),
  config: interactiveConfigSchema,
});

export const lessonBlockSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  headingBlockSchema,
  mathBlockSchema,
  calloutBlockSchema,
  tableBlockSchema,
  videoBlockSchema,
  quizBlockSchema,
  numericBlockSchema,
  workedExampleBlockSchema,
  interactiveBlockSchema,
]);

/**
 * A lesson's blocks. Question and worked-example ids must be unique within
 * the lesson: attempts are stored and restored by id, and question cards
 * are keyed by it.
 */
export const lessonBlocksSchema = z.array(lessonBlockSchema).superRefine((blocks, ctx) => {
  const seen = new Map<string, number>();
  blocks.forEach((block, i) => {
    if (block.type !== "quiz" && block.type !== "numeric" && block.type !== "worked-example") {
      return;
    }
    if (!block.id) return;
    const first = seen.get(block.id);
    if (first === undefined) {
      seen.set(block.id, i);
      return;
    }
    ctx.addIssue({
      code: "custom",
      path: [i, "id"],
      message: `duplicate block id "${block.id}" (also used by block ${first})`,
    });
  });
});

export type TextBlock = z.infer<typeof textBlockSchema>;
export type HeadingBlock = z.infer<typeof headingBlockSchema>;
export type MathBlock = z.infer<typeof mathBlockSchema>;
export type CalloutBlock = z.infer<typeof calloutBlockSchema>;
export type TableBlock = z.infer<typeof tableBlockSchema>;
export type VideoBlock = z.infer<typeof videoBlockSchema>;
export type QuizBlock = z.infer<typeof quizBlockSchema>;
export type NumericBlock = z.infer<typeof numericBlockSchema>;
export type WorkedExampleBlock = z.infer<typeof workedExampleBlockSchema>;
export type WorkedExampleStep = z.infer<typeof workedExampleStepSchema>;
export type TableData = z.infer<typeof tableDataSchema>;
export type InteractiveBlock = z.infer<typeof interactiveBlockSchema>;
export type InteractiveConfig = z.infer<typeof interactiveConfigSchema>;
export type PlotWindow = z.infer<typeof plotWindowSchema>;
export type LessonBlock = z.infer<typeof lessonBlockSchema>;

export function parseLessonBlocks(input: unknown): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}
