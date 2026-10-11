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
import { mfeChapter0Lessons } from "@/modules/content/mfe-chapter-0-content";
import { mfeChapter1Lessons } from "@/modules/content/mfe-chapter-1-content";
import { mfeChapter2Lessons } from "@/modules/content/mfe-chapter-2-content";
import { mfeChapter3Lessons } from "@/modules/content/mfe-chapter-3-content";
import { mfeChapter4Lessons } from "@/modules/content/mfe-chapter-4-content";
import { mfeChapter5Lessons } from "@/modules/content/mfe-chapter-5-content";
import { mrgChapter0Lessons } from "@/modules/content/mrg-chapter-0-content";
import { mrgChapter1Lessons } from "@/modules/content/mrg-chapter-1-content";
import { mrgChapter2Lessons } from "@/modules/content/mrg-chapter-2-content";
import { mrgChapter3Lessons } from "@/modules/content/mrg-chapter-3-content";
import { mrgChapter4Lessons } from "@/modules/content/mrg-chapter-4-content";
import { mrgChapter5Lessons } from "@/modules/content/mrg-chapter-5-content";
import { owtChapter0Lessons } from "@/modules/content/owt-chapter-0-content";
import { owtChapter1Lessons } from "@/modules/content/owt-chapter-1-content";
import { owtChapter2Lessons } from "@/modules/content/owt-chapter-2-content";
import { owtChapter3Lessons } from "@/modules/content/owt-chapter-3-content";
import { owtChapter4Lessons } from "@/modules/content/owt-chapter-4-content";
import { owtChapter5Lessons } from "@/modules/content/owt-chapter-5-content";
import { emChapter0Lessons } from "@/modules/content/em-chapter-0-content";
import { emChapter1Lessons } from "@/modules/content/em-chapter-1-content";
import { emChapter2Lessons } from "@/modules/content/em-chapter-2-content";
import { emChapter3Lessons } from "@/modules/content/em-chapter-3-content";
import { emChapter4Lessons } from "@/modules/content/em-chapter-4-content";
import { emChapter5Lessons } from "@/modules/content/em-chapter-5-content";
import { ompChapter0Lessons } from "@/modules/content/omp-chapter-0-content";
import { ompChapter1Lessons } from "@/modules/content/omp-chapter-1-content";
import { ompChapter2Lessons } from "@/modules/content/omp-chapter-2-content";
import { ompChapter3Lessons } from "@/modules/content/omp-chapter-3-content";
import { ompChapter4Lessons } from "@/modules/content/omp-chapter-4-content";
import { ompChapter5Lessons } from "@/modules/content/omp-chapter-5-content";

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
  "mfe chapter 0": mfeChapter0Lessons,
  "mfe chapter 1": mfeChapter1Lessons,
  "mfe chapter 2": mfeChapter2Lessons,
  "mfe chapter 3": mfeChapter3Lessons,
  "mfe chapter 4": mfeChapter4Lessons,
  "mfe chapter 5": mfeChapter5Lessons,
  "mrg chapter 0": mrgChapter0Lessons,
  "mrg chapter 1": mrgChapter1Lessons,
  "mrg chapter 2": mrgChapter2Lessons,
  "mrg chapter 3": mrgChapter3Lessons,
  "mrg chapter 4": mrgChapter4Lessons,
  "mrg chapter 5": mrgChapter5Lessons,
  "owt chapter 0": owtChapter0Lessons,
  "owt chapter 1": owtChapter1Lessons,
  "owt chapter 2": owtChapter2Lessons,
  "owt chapter 3": owtChapter3Lessons,
  "owt chapter 4": owtChapter4Lessons,
  "owt chapter 5": owtChapter5Lessons,
  "em chapter 0": emChapter0Lessons,
  "em chapter 1": emChapter1Lessons,
  "em chapter 2": emChapter2Lessons,
  "em chapter 3": emChapter3Lessons,
  "em chapter 4": emChapter4Lessons,
  "em chapter 5": emChapter5Lessons,
  "omp chapter 0": ompChapter0Lessons,
  "omp chapter 1": ompChapter1Lessons,
  "omp chapter 2": ompChapter2Lessons,
  "omp chapter 3": ompChapter3Lessons,
  "omp chapter 4": ompChapter4Lessons,
  "omp chapter 5": ompChapter5Lessons,
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
  "mfe chapter 0": "mfe-0-units-dimensions-measurement",
  "mfe chapter 1": "mfe-1-motion-in-a-straight-line",
  "mfe chapter 2": "mfe-2-motion-in-a-plane",
  "mfe chapter 3": "mfe-3-newtons-laws-of-motion",
  "mfe chapter 4": "mfe-4-friction-and-circular-dynamics",
  "mfe chapter 5": "mfe-5-work-energy-and-power",
  "mrg chapter 0": "mrg-0-centre-of-mass",
  "mrg chapter 1": "mrg-1-momentum-impulse-collisions",
  "mrg chapter 2": "mrg-2-rotational-kinematics-moment-of-inertia",
  "mrg chapter 3": "mrg-3-torque-rotational-dynamics",
  "mrg chapter 4": "mrg-4-angular-momentum-rolling",
  "mrg chapter 5": "mrg-5-gravitation",
  "owt chapter 0": "owt-0-simple-harmonic-motion",
  "owt chapter 1": "owt-1-waves-on-a-string",
  "owt chapter 2": "owt-2-sound-waves",
  "owt chapter 3": "owt-3-properties-of-matter",
  "owt chapter 4": "owt-4-heat-and-kinetic-theory",
  "owt chapter 5": "owt-5-thermodynamics",
  "em chapter 0": "em-0-electric-charge-and-field",
  "em chapter 1": "em-1-gauss-law-and-potential",
  "em chapter 2": "em-2-capacitors",
  "em chapter 3": "em-3-current-electricity",
  "em chapter 4": "em-4-magnetic-effects-of-current",
  "em chapter 5": "em-5-induction-and-ac",
  "omp chapter 0": "omp-0-reflection-and-refraction",
  "omp chapter 1": "omp-1-lenses-prisms-and-instruments",
  "omp chapter 2": "omp-2-wave-optics",
  "omp chapter 3": "omp-3-dual-nature-of-radiation-and-matter",
  "omp chapter 4": "omp-4-atoms-and-nuclei",
  "omp chapter 5": "omp-5-semiconductor-electronics",
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
