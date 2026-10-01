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

export const interactiveConfigSchema = z.discriminatedUnion("component", [
  emFieldCanvasSchema,
  emCircuitLabSchema,
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
  videoBlockSchema,
  quizBlockSchema,
  interactiveBlockSchema,
]);

export const lessonBlocksSchema = z.array(lessonBlockSchema);

export type TextBlock = z.infer<typeof textBlockSchema>;
export type MathBlock = z.infer<typeof mathBlockSchema>;
export type CalloutBlock = z.infer<typeof calloutBlockSchema>;
export type TableBlock = z.infer<typeof tableBlockSchema>;
export type VideoBlock = z.infer<typeof videoBlockSchema>;
export type QuizBlock = z.infer<typeof quizBlockSchema>;
export type InteractiveBlock = z.infer<typeof interactiveBlockSchema>;
export type InteractiveConfig = z.infer<typeof interactiveConfigSchema>;
export type PlotWindow = z.infer<typeof plotWindowSchema>;
export type LessonBlock = z.infer<typeof lessonBlockSchema>;

export function parseLessonBlocks(input: unknown): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}
