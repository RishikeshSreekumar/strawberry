import { describe, expect, it } from "vitest";
import { groupCoursesByTrack, trackForCourse } from "@/modules/content/lib/catalog";
import { splitCourseTitle, splitNumberedTitle } from "@/modules/content/lib/titles";
import { resolveContinueTarget } from "@/modules/progress/lib/continue-target";

describe("splitNumberedTitle", () => {
  it("splits chapter titles", () => {
    expect(splitNumberedTitle("Chapter 0 · Angles and Ratios: Why Trigonometry Exists")).toEqual({
      number: "0",
      text: "Angles and Ratios: Why Trigonometry Exists",
    });
  });
  it("splits lesson titles", () => {
    expect(splitNumberedTitle("0.1 · The Unreachable Measurement")).toEqual({
      number: "0.1",
      text: "The Unreachable Measurement",
    });
  });
  it("leaves unnumbered titles alone", () => {
    expect(splitNumberedTitle("Limits")).toEqual({ number: null, text: "Limits" });
  });
});

describe("splitCourseTitle", () => {
  it("splits on the first colon", () => {
    expect(splitCourseTitle("Matrices: Grids That Move Space")).toEqual({
      name: "Matrices",
      tagline: "Grids That Move Space",
    });
  });
  it("keeps titles without a tagline", () => {
    expect(splitCourseTitle("Calculus")).toEqual({ name: "Calculus", tagline: null });
  });
});

describe("groupCoursesByTrack", () => {
  it("orders courses by track and puts unknown courses last", () => {
    const groups = groupCoursesByTrack([
      { slug: "calculus" },
      { slug: "zoology" },
      { slug: "trigonometry" },
      { slug: "motion-forces-energy" },
    ]);
    expect(groups.map((g) => [g.track.id, g.courses.map((c) => c.slug)])).toEqual([
      ["geometry", ["trigonometry"]],
      ["calculus", ["calculus"]],
      ["physics", ["motion-forces-energy"]],
      ["other", ["zoology"]],
    ]);
    expect(trackForCourse("zoology")).toBeNull();
  });
});

describe("resolveContinueTarget", () => {
  const flat = ["a", "b", "c"].map((id) => ({ lesson: { id } }));
  it("starts at the first lesson with no history", () => {
    expect(resolveContinueTarget(flat, new Map(), null)?.lesson.id).toBe("a");
  });
  it("resumes an unfinished lesson", () => {
    expect(
      resolveContinueTarget(flat, new Map([["b", "started"]]), { lessonId: "b", status: "started" })
        ?.lesson.id,
    ).toBe("b");
  });
  it("skips ahead past completed lessons", () => {
    const progress = new Map([
      ["a", "completed"],
      ["b", "completed"],
    ] as const);
    expect(
      resolveContinueTarget(flat, progress, { lessonId: "a", status: "completed" })?.lesson.id,
    ).toBe("c");
  });
  it("falls back to the first lesson when the recent one is gone", () => {
    expect(
      resolveContinueTarget(flat, new Map(), { lessonId: "zz", status: "started" })?.lesson.id,
    ).toBe("a");
  });
});
