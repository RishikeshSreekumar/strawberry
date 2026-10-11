/**
 * Parsing and grading for numeric-answer questions (numericBlockSchema).
 * Pure functions shared by the schema refinement, the NumericBlockView and
 * tests.
 *
 * Accepted input (whitespace around the number is ignored):
 *   42   -3   +0.5   .5   5.   2.50
 *   3/4   -3/4   1.5/2   (fractions; each side a plain or scientific number)
 *   1.6e-19   1.5 e3   6.02E23   1.6 x 10^-19   1.6×10^(-19)   1.6·10⁻¹⁹
 *   10^-3   10^(-3)   (a bare power of ten)
 *   −3 (unicode minus, also en dash and other dash look-alikes)
 * Rejected, with a short message meant for the learner: empty input,
 * commas, units or other words, mixed numbers ("1 1/2"), "1.6x10-19"
 * (missing ^), a zero denominator, and anything that overflows to
 * Infinity or underflows to 0.
 */

export type ParsedNumber =
  | { ok: true; value: number }
  | { ok: false; reason: ParseFailure; message: string };

export type ParseFailure =
  | "empty"
  | "comma"
  | "letters"
  | "zero-denominator"
  | "out-of-range"
  | "missing-caret"
  | "invalid";

const FAILURE_MESSAGES: Record<ParseFailure, string> = {
  empty: "Type a number first.",
  comma: "Leave out commas; use a decimal point for decimals (e.g. 2.5).",
  letters:
    "Enter just the number, without units or words (e.g. 9.8, -3/4 or 1.6e-19).",
  "zero-denominator": "That fraction divides by zero.",
  "out-of-range": "That number is too large or too small to check.",
  "missing-caret":
    "Write powers of ten with ^ or e, e.g. 1.6e-19 or 1.6 × 10^-19.",
  invalid:
    "That doesn't look like a number. Try a form like 2.5, -3/4 or 1.6e-19.",
};

function fail(reason: ParseFailure): ParsedNumber {
  return { ok: false, reason, message: FAILURE_MESSAGES[reason] };
}

const SUPERSCRIPTS: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁻": "-",
  "⁺": "+",
};

/** Dash look-alikes learners paste or type for a minus sign. */
const MINUS_LIKE = /[\u2212\u2012\u2013\u2014\u2010\u2011\uFE63\uFF0D]/g;

/** Unsigned decimal: 12, 12., 12.5, .5 */
const DECIMAL = String.raw`(?:\d+\.?\d*|\.\d+)`;
/** Power-of-ten exponent after "^": -19, (-19), {-19}. */
const POW = String.raw`(?:\(\s*[+-]?\d+\s*\)|\{\s*[+-]?\d+\s*\}|[+-]?\d+)`;
const TIMES = String.raw`[xX×*·⋅]`;
/**
 * One signed number: a decimal with an optional exponent ("e-19",
 * " e3", "x10^-19", "×10^(−19)", "*10^{3}"), or a bare power of ten
 * ("10^-3", "10^(-3)"). Capture groups: sign, mantissa, e-exponent,
 * ×10^ exponent, bare 10^ exponent.
 */
const NUMBER = String.raw`([+-]?)(?:(${DECIMAL})(?:\s*[eE]\s*([+-]?\d+)|\s*${TIMES}\s*10\s*\^\s*(${POW}))?|10\s*\^\s*(${POW}))`;
/** The same pattern without capture groups, for composing fractions. */
const NUMBER_NC = NUMBER.replace(/(?<!\\)\((?!\?)/g, "(?:");
const NUMBER_RE = new RegExp(`^${NUMBER}$`);
const FRACTION_RE = new RegExp(`^(${NUMBER_NC})\\s*/\\s*(${NUMBER_NC})$`);
/** "1.6x10-19", "1.6 × 10 -19": a power of ten written without ^. */
const MISSING_CARET_RE = new RegExp(`${TIMES}\\s*10\\s*[+-]\\s*\\d+\\s*$`);

type NumberParts = { value: number; mantissaIsZero: boolean };

/** Value of one number matched by NUMBER, or null. */
function numberValue(token: string): NumberParts | null {
  const m = token.match(NUMBER_RE);
  if (!m) return null;
  const [, sign, mantissa, eExp, timesExp, bareExp] = m;
  const pow = (e: string) => e.replace(/[(){}\s]/g, "");
  if (bareExp !== undefined) {
    return { value: Number(`${sign}1e${pow(bareExp)}`), mantissaIsZero: false };
  }
  const exponent = eExp ?? (timesExp !== undefined ? pow(timesExp) : undefined);
  return {
    value: Number(`${sign}${mantissa}${exponent !== undefined ? `e${exponent}` : ""}`),
    mantissaIsZero: Number(mantissa) === 0,
  };
}

/** Parse a learner's typed answer. Never throws. */
export function parseNumericInput(raw: string): ParsedNumber {
  let s = raw
    .replace(MINUS_LIKE, "-")
    // Thin/no-break spaces count as spaces.
    .replace(/[\u00A0\u2009\u202F]/g, " ")
    .trim();
  if (s === "") return fail("empty");

  // "10⁻¹⁹" → "10^-19"
  s = s.replace(/10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+)/g, (_, sup: string) =>
    `10^${[...sup].map((c) => SUPERSCRIPTS[c]).join("")}`,
  );

  if (s.includes(",")) return fail("comma");

  let value: number;
  let nonZeroInput: boolean;
  const single = numberValue(s);
  const fraction = single ? null : s.match(FRACTION_RE);
  if (single) {
    value = single.value;
    nonZeroInput = !single.mantissaIsZero;
  } else if (fraction) {
    const numerator = numberValue(fraction[1])!;
    const denominator = numberValue(fraction[2])!;
    if (denominator.value === 0) {
      // 0 typed as the denominator, or one so small it underflowed.
      return fail(denominator.mantissaIsZero ? "zero-denominator" : "out-of-range");
    }
    value = numerator.value / denominator.value;
    nonZeroInput = !numerator.mantissaIsZero;
  } else if (MISSING_CARET_RE.test(s)) {
    return fail("missing-caret");
  } else {
    // Letters other than an exponent marker usually mean a unit or a word.
    return /[a-df-wyzA-DF-WYZ]/.test(s) ? fail("letters") : fail("invalid");
  }

  if (Number.isNaN(value)) return fail("invalid");
  if (!Number.isFinite(value)) return fail("out-of-range");
  // A non-zero number that underflowed to 0 ("1e-400") can't be graded.
  if (value === 0 && nonZeroInput) return fail("out-of-range");
  // Normalise -0 so it compares and serialises as 0.
  return { ok: true, value: value === 0 ? 0 : value };
}

export type ToleranceSpec = {
  answer: number;
  /** Absolute tolerance (default 0). */
  tolerance?: number;
  /** Relative tolerance as a fraction of |answer| (default 0). */
  relTolerance?: number;
};

/**
 * Floating-point slack added to every comparison, so "1/3" matches an
 * authored 0.3333333333333333 and 0.1 + 0.2 matches 0.3. Purely relative
 * (1e-9 of the larger magnitude), so tiny answers like 1.6e-19 stay
 * strict and an answer of 0 needs exactly 0.
 */
function floatSlack(value: number, target: number): number {
  return 1e-9 * Math.max(Math.abs(value), Math.abs(target));
}

/** Largest accepted |value - answer|: max(tolerance, relTolerance·|answer|). */
export function answerAllowance(spec: ToleranceSpec): number {
  return Math.max(
    spec.tolerance ?? 0,
    (spec.relTolerance ?? 0) * Math.abs(spec.answer),
  );
}

/** Whether `value` is accepted as the answer under the spec's tolerance. */
export function isNumericAnswerCorrect(value: number, spec: ToleranceSpec): boolean {
  if (!Number.isFinite(value)) return false;
  return (
    Math.abs(value - spec.answer) <=
    answerAllowance(spec) + floatSlack(value, spec.answer)
  );
}

export type CommonMistake = {
  answer: number;
  tolerance?: number;
  feedback: string;
};

/**
 * The first common mistake `value` matches, if any. A mistake's own
 * `tolerance` is absolute; without one it borrows the question's rule
 * (tolerance / relTolerance) applied to the mistaken value.
 */
export function matchCommonMistake(
  value: number,
  spec: ToleranceSpec & { commonMistakes?: CommonMistake[] },
): CommonMistake | undefined {
  return spec.commonMistakes?.find((mistake) =>
    isNumericAnswerCorrect(
      value,
      mistake.tolerance !== undefined
        ? { answer: mistake.answer, tolerance: mistake.tolerance }
        : {
            answer: mistake.answer,
            tolerance: spec.tolerance,
            relTolerance: spec.relTolerance,
          },
    ),
  );
}

export type NumericGrade =
  | { kind: "invalid"; message: string }
  | { kind: "correct"; value: number }
  | { kind: "wrong"; value: number; mistake?: CommonMistake };

/** Parse and grade a typed answer in one step. */
export function gradeNumericInput(
  raw: string,
  spec: ToleranceSpec & { commonMistakes?: CommonMistake[] },
): NumericGrade {
  const parsed = parseNumericInput(raw);
  if (!parsed.ok) return { kind: "invalid", message: parsed.message };
  if (isNumericAnswerCorrect(parsed.value, spec)) {
    return { kind: "correct", value: parsed.value };
  }
  return {
    kind: "wrong",
    value: parsed.value,
    mistake: matchCommonMistake(parsed.value, spec),
  };
}

/**
 * A number as rich text: plain digits for everyday magnitudes ("0.75",
 * "-3", "9.81") and for integers up to Number.MAX_SAFE_INTEGER, inline math
 * for other very large or small values ("$1.6 \\times 10^{-19}$"). Keeps
 * 12 significant digits, which trims binary float noise.
 */
export function formatNumericAnswer(value: number): string {
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (Number.isSafeInteger(value)) return String(value);
  if (abs >= 1e6 || abs < 1e-4) {
    // toExponential rounds and renormalises: 9.999999999999999e-5 → "1.00000000000e-4".
    const [mantissa, exponent] = value.toExponential(11).split("e");
    return `$${Number(mantissa)} \\times 10^{${Number(exponent)}}$`;
  }
  return String(Number(value.toPrecision(12)));
}
