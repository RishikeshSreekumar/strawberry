/**
 * How the course catalog is grouped for learners. Courses carry no subject
 * column, so the grouping lives here, keyed by slug. Within a track,
 * courses are listed in the suggested study order.
 */
export type Track = {
  id: string;
  title: string;
  blurb: string;
  courseSlugs: readonly string[];
};

export const TRACKS: readonly Track[] = [
  {
    id: "algebra",
    title: "Algebra",
    blurb: "Sets and functions, then equations, number patterns and matrices.",
    courseSlugs: [
      "sets-relations-functions",
      "complex-numbers-quadratics",
      "sequences-series",
      "matrices",
    ],
  },
  {
    id: "geometry",
    title: "Trigonometry & Geometry",
    blurb: "Angles first, then lines, circles and conics, then vectors and space.",
    courseSlugs: [
      "trigonometry",
      "straight-lines-circles",
      "conic-sections",
      "vector-algebra",
      "three-dimensional-geometry",
    ],
  },
  {
    id: "calculus",
    title: "Calculus",
    blurb: "Limits and derivatives, then integrals and differential equations.",
    courseSlugs: ["calculus", "integral-calculus"],
  },
  {
    id: "counting-chance",
    title: "Counting, Probability & Statistics",
    blurb: "Count outcomes, reason about chance, then read real data.",
    courseSlugs: ["permutations-combinations-binomial", "probability", "statistics"],
  },
  {
    id: "physics",
    title: "Physics",
    blurb: "The JEE physics syllabus, from mechanics through modern physics.",
    courseSlugs: [
      "motion-forces-energy",
      "momentum-rotation-gravitation",
      "oscillations-waves-thermal",
      "electricity-and-magnetism",
      "optics-and-modern-physics",
    ],
  },
];

const OTHER_TRACK: Track = {
  id: "other",
  title: "More courses",
  blurb: "",
  courseSlugs: [],
};

/** The track a course belongs to, or null if it isn't in the catalog. */
export function trackForCourse(slug: string): Track | null {
  return TRACKS.find((t) => t.courseSlugs.includes(slug)) ?? null;
}

/**
 * Courses grouped by track, in catalog order. Courses not in the catalog
 * go in a trailing "More courses" group; empty tracks are dropped.
 */
export function groupCoursesByTrack<T extends { slug: string }>(
  courses: readonly T[],
): { track: Track; courses: T[] }[] {
  const groups = TRACKS.map((track) => ({
    track,
    courses: track.courseSlugs.flatMap((slug) => {
      const course = courses.find((c) => c.slug === slug);
      return course ? [course] : [];
    }),
  }));
  const other = courses.filter((c) => !trackForCourse(c.slug));
  if (other.length > 0) groups.push({ track: OTHER_TRACK, courses: other });
  return groups.filter((g) => g.courses.length > 0);
}
