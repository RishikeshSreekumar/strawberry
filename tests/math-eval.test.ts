import { describe, expect, it } from "vitest";
import { compileExpression, evaluateAt } from "@/modules/content/lib/math-eval";

describe("math expression evaluator", () => {
  it("evaluates arithmetic with precedence", () => {
    expect(evaluateAt("50 + 15*x", 5)).toBe(125);
    expect(evaluateAt("2 + 3 * 4", 0)).toBe(14);
    expect(evaluateAt("(2 + 3) * 4", 0)).toBe(20);
  });

  it("handles powers, right-associative", () => {
    expect(evaluateAt("x^2", 3)).toBe(9);
    expect(evaluateAt("2^x", 5)).toBe(32);
    expect(evaluateAt("2^3^2", 0)).toBe(512);
  });

  it("handles unary minus", () => {
    expect(evaluateAt("-x^2", 3)).toBe(-9);
    expect(evaluateAt("(-x)^2", 3)).toBe(9);
    expect(evaluateAt("x^-1", 4)).toBe(0.25);
  });

  it("supports whitelisted functions", () => {
    expect(evaluateAt("sqrt(x)", 16)).toBe(4);
    expect(evaluateAt("abs(x)", -3)).toBe(3);
    expect(evaluateAt("sin(x)", 0)).toBe(0);
    expect(evaluateAt("ln(x)", Math.E)).toBeCloseTo(1);
  });

  it("supports multiple variables", () => {
    const fn = compileExpression("(x - a)^2 + b");
    expect(fn({ x: 3, a: 1, b: 2 })).toBe(6);
  });

  it("rejects unknown variables, functions and syntax", () => {
    expect(() => evaluateAt("x + y", 1)).toThrow(/Unknown variable/);
    expect(() => evaluateAt("hack(x)", 1)).toThrow(/Unknown function/);
    expect(() => evaluateAt("x +", 1)).toThrow();
    expect(() => evaluateAt("(x", 1)).toThrow();
  });

  it("supports the trigonometry grammar: inverse functions and pi", () => {
    expect(evaluateAt("cos(pi)", 0)).toBeCloseTo(-1);
    expect(evaluateAt("sin(pi/2)", 0)).toBeCloseTo(1);
    expect(evaluateAt("asin(x)", 1)).toBeCloseTo(Math.PI / 2);
    expect(evaluateAt("acos(x)", 0)).toBeCloseTo(Math.PI / 2);
    expect(evaluateAt("atan(x)", 1)).toBeCloseTo(Math.PI / 4);
    expect(evaluateAt("sin(x)/x", 0.001)).toBeCloseTo(1, 4);
  });

  it("resolves constants ahead of the caller's environment", () => {
    expect(compileExpression("pi")({ pi: 3 })).toBeCloseTo(Math.PI);
  });

  it("returns Infinity for division by zero (caller filters)", () => {
    expect(evaluateAt("1/x", 0)).toBe(Infinity);
  });
});
