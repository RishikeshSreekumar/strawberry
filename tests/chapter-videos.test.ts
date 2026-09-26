import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { chapterLessons } from "@/modules/content/chapter-0-content";
import { chapter1Lessons } from "@/modules/content/chapter-1-content";
import { trigChapter0Lessons } from "@/modules/content/trig-chapter-0-content";
import { trigChapter1Lessons } from "@/modules/content/trig-chapter-1-content";
import { trigChapter2Lessons } from "@/modules/content/trig-chapter-2-content";
import { trigChapter3Lessons } from "@/modules/content/trig-chapter-3-content";
import { trigChapter4Lessons } from "@/modules/content/trig-chapter-4-content";
import { trigChapter5Lessons } from "@/modules/content/trig-chapter-5-content";
import { matricesChapter0Lessons } from "@/modules/content/matrices-chapter-0-content";
import { matricesChapter1Lessons } from "@/modules/content/matrices-chapter-1-content";
import { matricesChapter2Lessons } from "@/modules/content/matrices-chapter-2-content";
import { matricesChapter3Lessons } from "@/modules/content/matrices-chapter-3-content";
import { matricesChapter4Lessons } from "@/modules/content/matrices-chapter-4-content";
import { matricesChapter5Lessons } from "@/modules/content/matrices-chapter-5-content";
import { statisticsChapter0Lessons } from "@/modules/content/statistics-chapter-0-content";
import { statisticsChapter1Lessons } from "@/modules/content/statistics-chapter-1-content";
import { statisticsChapter2Lessons } from "@/modules/content/statistics-chapter-2-content";
import { statisticsChapter3Lessons } from "@/modules/content/statistics-chapter-3-content";
import { statisticsChapter4Lessons } from "@/modules/content/statistics-chapter-4-content";
import { statisticsChapter5Lessons } from "@/modules/content/statistics-chapter-5-content";
import { probabilityChapter0Lessons } from "@/modules/content/probability-chapter-0-content";
import { probabilityChapter1Lessons } from "@/modules/content/probability-chapter-1-content";
import { probabilityChapter2Lessons } from "@/modules/content/probability-chapter-2-content";
import { probabilityChapter3Lessons } from "@/modules/content/probability-chapter-3-content";
import { probabilityChapter4Lessons } from "@/modules/content/probability-chapter-4-content";
import { probabilityChapter5Lessons } from "@/modules/content/probability-chapter-5-content";
import { pncChapter0Lessons } from "@/modules/content/pnc-chapter-0-content";
import { pncChapter1Lessons } from "@/modules/content/pnc-chapter-1-content";
import { pncChapter2Lessons } from "@/modules/content/pnc-chapter-2-content";
import { pncChapter3Lessons } from "@/modules/content/pnc-chapter-3-content";
import { pncChapter4Lessons } from "@/modules/content/pnc-chapter-4-content";
import { pncChapter5Lessons } from "@/modules/content/pnc-chapter-5-content";
import { vectorsChapter0Lessons } from "@/modules/content/vectors-chapter-0-content";
import { vectorsChapter1Lessons } from "@/modules/content/vectors-chapter-1-content";
import { vectorsChapter2Lessons } from "@/modules/content/vectors-chapter-2-content";
import { vectorsChapter3Lessons } from "@/modules/content/vectors-chapter-3-content";
import { vectorsChapter4Lessons } from "@/modules/content/vectors-chapter-4-content";
import { vectorsChapter5Lessons } from "@/modules/content/vectors-chapter-5-content";

const chapters = {
  "calculus chapter 0": chapterLessons,
  "calculus chapter 1": chapter1Lessons,
  "trig chapter 0": trigChapter0Lessons,
  "trig chapter 1": trigChapter1Lessons,
  "trig chapter 2": trigChapter2Lessons,
  "trig chapter 3": trigChapter3Lessons,
  "trig chapter 4": trigChapter4Lessons,
  "trig chapter 5": trigChapter5Lessons,
  "matrices chapter 0": matricesChapter0Lessons,
  "matrices chapter 1": matricesChapter1Lessons,
  "matrices chapter 2": matricesChapter2Lessons,
  "matrices chapter 3": matricesChapter3Lessons,
  "matrices chapter 4": matricesChapter4Lessons,
  "matrices chapter 5": matricesChapter5Lessons,
  "statistics chapter 0": statisticsChapter0Lessons,
  "statistics chapter 1": statisticsChapter1Lessons,
  "statistics chapter 2": statisticsChapter2Lessons,
  "statistics chapter 3": statisticsChapter3Lessons,
  "statistics chapter 4": statisticsChapter4Lessons,
  "statistics chapter 5": statisticsChapter5Lessons,
  "probability chapter 0": probabilityChapter0Lessons,
  "probability chapter 1": probabilityChapter1Lessons,
  "probability chapter 2": probabilityChapter2Lessons,
  "probability chapter 3": probabilityChapter3Lessons,
  "probability chapter 4": probabilityChapter4Lessons,
  "probability chapter 5": probabilityChapter5Lessons,
  "pnc chapter 0": pncChapter0Lessons,
  "pnc chapter 1": pncChapter1Lessons,
  "pnc chapter 2": pncChapter2Lessons,
  "pnc chapter 3": pncChapter3Lessons,
  "pnc chapter 4": pncChapter4Lessons,
  "pnc chapter 5": pncChapter5Lessons,
  "vectors chapter 0": vectorsChapter0Lessons,
  "vectors chapter 1": vectorsChapter1Lessons,
  "vectors chapter 2": vectorsChapter2Lessons,
  "vectors chapter 3": vectorsChapter3Lessons,
  "vectors chapter 4": vectorsChapter4Lessons,
  "vectors chapter 5": vectorsChapter5Lessons,
};

const expectedVideo: Record<string, string> = {
  "matrices chapter 0": "mx-0-matrices-grids-that-move-the-plane",
  "matrices chapter 1": "mx-1-matrix-multiplication-is-composition",
  "matrices chapter 2": "mx-2-determinants-how-much-space-changes",
  "matrices chapter 3": "mx-3-the-inverse-undoing-a-transformation",
  "matrices chapter 4": "mx-4-solving-systems-of-linear-equations",
  "matrices chapter 5": "mx-5-rank-and-eigenvalues",
  "statistics chapter 0": "st-0-data-and-its-pictures",
  "statistics chapter 1": "st-1-measures-of-centre",
  "statistics chapter 2": "st-2-measures-of-spread",
  "statistics chapter 3": "st-3-shape-position-and-comparison",
  "statistics chapter 4": "st-4-correlation-and-regression",
  "statistics chapter 5": "st-5-normal-distribution-and-estimation",
  "probability chapter 0": "pr-0-chance-experiments-and-events",
  "probability chapter 1": "pr-1-measuring-probability",
  "probability chapter 2": "pr-2-conditional-probability-and-independence",
  "probability chapter 3": "pr-3-total-probability-and-bayes",
  "probability chapter 4": "pr-4-random-variables-expectation-variance",
  "probability chapter 5": "pr-5-bernoulli-trials-and-binomial",
  "pnc chapter 0": "pc-0-counting-from-first-principles",
  "pnc chapter 1": "pc-1-permutations",
  "pnc chapter 2": "pc-2-combinations",
  "pnc chapter 3": "pc-3-distributions-and-advanced-counting",
  "pnc chapter 4": "pc-4-pascal-and-the-binomial-theorem",
  "pnc chapter 5": "pc-5-binomial-coefficients-at-work",
  "vectors chapter 0": "va-0-what-a-vector-is",
  "vectors chapter 1": "va-1-vectors-in-coordinates",
  "vectors chapter 2": "va-2-section-formula-and-geometry",
  "vectors chapter 3": "va-3-dot-product",
  "vectors chapter 4": "va-4-cross-product",
  "vectors chapter 5": "va-5-triple-product-and-geometry",
};

const publicDir = join(__dirname, "..", "public");

describe("chapter overview videos", () => {
  for (const [name, lessons] of Object.entries(chapters)) {
    it(`${name} opens with an overview video whose files exist`, () => {
      const first = lessons[0].blocks[0];
      expect(first.type).toBe("video");
      if (first.type !== "video") return;
      expect(existsSync(join(publicDir, first.src))).toBe(true);
      expect(first.poster && existsSync(join(publicDir, first.poster))).toBe(true);
      if (expectedVideo[name]) {
        expect(first.src).toBe(`/videos/${expectedVideo[name]}.mp4`);
      }
    });
  }
});
