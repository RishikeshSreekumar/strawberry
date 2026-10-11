import { describe, expect, it } from "vitest";
import {
  answerAllowance,
  formatNumericAnswer,
  gradeNumericInput,
  isNumericAnswerCorrect,
  matchCommonMistake,
  parseNumericInput,
} from "@/modules/content/lib/numeric-answer";

const value = (raw: string) => {
  const parsed = parseNumericInput(raw);
  if (!parsed.ok) throw new Error(`${raw}: ${parsed.reason}`);
  return parsed.value;
};
const reason = (raw: string) => {
  const parsed = parseNumericInput(raw);
  return parsed.ok ? "ok" : parsed.reason;
};

describe("parseNumericInput", () => {
  it("parses integers and decimals, with optional sign and surrounding space", () => {
    expect(value("42")).toBe(42);
    expect(value("  -3 ")).toBe(-3);
    expect(value("+0.5")).toBe(0.5);
    expect(value(".5")).toBe(0.5);
    expect(value("5.")).toBe(5);
    expect(value("2.50")).toBe(2.5);
    expect(value("0007")).toBe(7);
  });

  it("accepts a unicode minus and dash look-alikes", () => {
    expect(value("−3")).toBe(-3);
    expect(value("–2.5")).toBe(-2.5);
    expect(value("1.6e−19")).toBeCloseTo(1.6e-19, 30);
  });

  it("normalises -0 to 0", () => {
    expect(Object.is(value("-0"), 0)).toBe(true);
  });

  it("parses fractions", () => {
    expect(value("3/4")).toBe(0.75);
    expect(value("-3/4")).toBe(-0.75);
    expect(value("3 / -4")).toBe(-0.75);
    expect(value("1.5/2")).toBe(0.75);
    expect(value("1/3")).toBeCloseTo(1 / 3, 15);
    expect(value("1e3/2")).toBe(500);
  });

  it("parses scientific notation in e and ×10^ forms", () => {
    expect(value("1.6e-19")).toBeCloseTo(1.6e-19, 30);
    expect(value("6.02E23")).toBeCloseTo(6.02e23, -18);
    expect(value("1.6 x 10^-19")).toBeCloseTo(1.6e-19, 30);
    expect(value("1.6×10^(-19)")).toBeCloseTo(1.6e-19, 30);
    expect(value("1.6*10^{-19}")).toBeCloseTo(1.6e-19, 30);
    expect(value("3·10^8")).toBe(3e8);
    expect(value("3 × 10⁸")).toBe(3e8);
    expect(value("1.6×10⁻¹⁹")).toBeCloseTo(1.6e-19, 30);
    expect(value("9.1 X 10^-31")).toBeCloseTo(9.1e-31, 40);
    expect(value("1.5 e3")).toBe(1500);
    expect(value("1.5e 3")).toBe(1500);
  });

  it("parses a bare power of ten, alone or in a fraction", () => {
    expect(value("10^-3")).toBe(0.001);
    expect(value("10^(-3)")).toBe(0.001);
    expect(value("10^{3}")).toBe(1000);
    expect(value("-10^2")).toBe(-100);
    expect(value("10⁻³")).toBe(0.001);
    expect(value("1/10^3")).toBe(0.001);
  });

  it("suggests ^ or e when a power of ten is missing its caret", () => {
    expect(reason("1.6x10-19")).toBe("missing-caret");
    expect(reason("1.6 × 10 -19")).toBe("missing-caret");
    expect(parseNumericInput("1.6x10-19")).toMatchObject({ message: expect.stringContaining("1.6e-19") });
  });

  it("rejects empty input", () => {
    expect(reason("")).toBe("empty");
    expect(reason("   ")).toBe("empty");
  });

  it("rejects commas with a hint to use a decimal point", () => {
    expect(reason("1,000")).toBe("comma");
    expect(reason("2,5")).toBe("comma");
  });

  it("rejects units and words", () => {
    expect(reason("9.8 m/s")).toBe("letters");
    expect(reason("5 kg")).toBe("letters");
    expect(reason("abc")).toBe("letters");
    expect(reason("pi")).toBe("letters");
  });

  it("rejects other garbage without throwing", () => {
    for (const raw of ["1 1/2", "--3", "3..4", "1/2/3", "e5", "1e", ".", "-", "3/", "/4", "1e1.5", "(3)", "10^", "10^1.5", "3 4", "2^3"]) {
      expect(reason(raw), raw).not.toBe("ok");
    }
  });

  it("rejects a zero denominator and overflow", () => {
    expect(reason("1/0")).toBe("zero-denominator");
    expect(reason("0/0")).toBe("zero-denominator");
    expect(reason("1e400")).toBe("out-of-range");
    expect(reason("1/1e400")).toBe("out-of-range");
  });

  it("rejects a non-zero number that underflows to 0, but keeps a real 0", () => {
    expect(reason("1e-400")).toBe("out-of-range");
    expect(reason("1/1e320")).toBe("out-of-range");
    expect(reason("3 × 10^-400")).toBe("out-of-range");
    expect(value("0e-400")).toBe(0);
    expect(value("0/5")).toBe(0);
    expect(value("0.000")).toBe(0);
  });

  it("gives a learner-facing message for every failure", () => {
    for (const raw of ["", "1,0", "kg", "1/0", "1e400", "1e-400", "1.6x10-19", "1..2"]) {
      const parsed = parseNumericInput(raw);
      expect(parsed.ok).toBe(false);
      if (!parsed.ok) expect(parsed.message.length).toBeGreaterThan(10);
    }
  });
});

describe("isNumericAnswerCorrect", () => {
  it("is exact by default, with float slack", () => {
    expect(isNumericAnswerCorrect(4, { answer: 4 })).toBe(true);
    expect(isNumericAnswerCorrect(4.01, { answer: 4 })).toBe(false);
    expect(isNumericAnswerCorrect(0.1 + 0.2, { answer: 0.3 })).toBe(true);
    expect(isNumericAnswerCorrect(value("1/3"), { answer: 0.3333333333333333 })).toBe(true);
    // Slack is relative: tiny answers stay strict, and 0 means exactly 0.
    expect(isNumericAnswerCorrect(value("1.6e-19"), { answer: 1.6e-19 })).toBe(true);
    expect(isNumericAnswerCorrect(1.7e-19, { answer: 1.6e-19 })).toBe(false);
    expect(isNumericAnswerCorrect(0, { answer: 1.6e-19 })).toBe(false);
    expect(isNumericAnswerCorrect(1e-12, { answer: 0 })).toBe(false);
    expect(isNumericAnswerCorrect(0, { answer: 0 })).toBe(true);
  });

  it("applies absolute tolerance inclusively", () => {
    const spec = { answer: 9.8, tolerance: 0.1 };
    expect(isNumericAnswerCorrect(9.7, spec)).toBe(true);
    expect(isNumericAnswerCorrect(9.9, spec)).toBe(true);
    expect(isNumericAnswerCorrect(9.95, spec)).toBe(false);
  });

  it("applies relative tolerance as a fraction of |answer|", () => {
    const spec = { answer: -200, relTolerance: 0.01 };
    expect(answerAllowance(spec)).toBe(2);
    expect(isNumericAnswerCorrect(-198, spec)).toBe(true);
    expect(isNumericAnswerCorrect(-197.9, spec)).toBe(false);
    expect(isNumericAnswerCorrect(198, spec)).toBe(false);
  });

  it("uses the larger of absolute and relative tolerance", () => {
    expect(answerAllowance({ answer: 100, tolerance: 0.5, relTolerance: 0.01 })).toBe(1);
    expect(answerAllowance({ answer: 10, tolerance: 0.5, relTolerance: 0.01 })).toBe(0.5);
  });

  it("relative tolerance on small magnitudes works (scientific answers)", () => {
    const spec = { answer: 1.6e-19, relTolerance: 0.02 };
    expect(isNumericAnswerCorrect(1.63e-19, spec)).toBe(true);
    expect(isNumericAnswerCorrect(1.7e-19, spec)).toBe(false);
  });

  it("never accepts non-finite values", () => {
    expect(isNumericAnswerCorrect(NaN, { answer: 0, tolerance: 1 })).toBe(false);
    expect(isNumericAnswerCorrect(Infinity, { answer: 0, tolerance: 1 })).toBe(false);
  });
});

describe("common mistakes and grading", () => {
  const spec = {
    answer: 19.6,
    tolerance: 0.1,
    commonMistakes: [
      { answer: 9.8, feedback: "squared t?" },
      { answer: -19.6, tolerance: 0, feedback: "sign" },
    ],
  };

  it("matches a mistake using its own tolerance or the question's", () => {
    expect(matchCommonMistake(9.85, spec)?.feedback).toBe("squared t?");
    expect(matchCommonMistake(-19.6, spec)?.feedback).toBe("sign");
    expect(matchCommonMistake(-19.65, spec)).toBeUndefined();
    expect(matchCommonMistake(5, spec)).toBeUndefined();
  });

  it("grades typed input in one step", () => {
    expect(gradeNumericInput("19.65", spec)).toEqual({ kind: "correct", value: 19.65 });
    expect(gradeNumericInput("98/5", spec)).toEqual({ kind: "correct", value: 19.6 });
    expect(gradeNumericInput("9.8", spec)).toMatchObject({
      kind: "wrong",
      value: 9.8,
      mistake: { feedback: "squared t?" },
    });
    expect(gradeNumericInput("3", spec)).toEqual({ kind: "wrong", value: 3, mistake: undefined });
    expect(gradeNumericInput("19.6 m", spec).kind).toBe("invalid");
  });

  it("handles integer-type questions (tolerance 0)", () => {
    const integer = { answer: 7 };
    expect(gradeNumericInput("7", integer).kind).toBe("correct");
    expect(gradeNumericInput("7.0", integer).kind).toBe("correct");
    expect(gradeNumericInput("14/2", integer).kind).toBe("correct");
    expect(gradeNumericInput("7.01", integer).kind).toBe("wrong");
  });
});

describe("formatNumericAnswer", () => {
  it("prints everyday magnitudes plainly and trims float noise", () => {
    expect(formatNumericAnswer(0.75)).toBe("0.75");
    expect(formatNumericAnswer(-3)).toBe("-3");
    expect(formatNumericAnswer(0.1 + 0.2)).toBe("0.3");
    expect(formatNumericAnswer(0)).toBe("0");
  });

  it("renormalises a mantissa that rounds up to 10", () => {
    expect(formatNumericAnswer(9.999999999999999e-5)).toBe("$1 \\times 10^{-4}$");
    expect(formatNumericAnswer(9999999999999.99)).toBe("$1 \\times 10^{13}$");
  });

  it("keeps every digit of integers up to the safe-integer limit", () => {
    expect(formatNumericAnswer(1234567)).toBe("1234567");
    expect(formatNumericAnswer(-98765432109)).toBe("-98765432109");
    expect(formatNumericAnswer(Number.MAX_SAFE_INTEGER)).toBe("9007199254740991");
    expect(formatNumericAnswer(1e300)).toBe("$1 \\times 10^{300}$");
  });

  it("uses inline math for very large or small magnitudes", () => {
    expect(formatNumericAnswer(1.6e-19)).toBe("$1.6 \\times 10^{-19}$");
    expect(formatNumericAnswer(6.02e23)).toBe("$6.02 \\times 10^{23}$");
    expect(formatNumericAnswer(-3.5e-8)).toBe("$-3.5 \\times 10^{-8}$");
    expect(formatNumericAnswer(1.5e20 + 0.5)).toBe("$1.5 \\times 10^{20}$"); // beyond safe integers
  });
});
