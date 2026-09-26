import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Interactive } from "@/modules/content/components/interactives";
import {
  lessonBlocksSchema,
  parseLessonBlocks,
} from "@/modules/content/schemas/blocks";

describe("lesson block schemas", () => {
  it("accepts a valid mixed block list", () => {
    const blocks = [
      { type: "text", content: "Hello" },
      { type: "math", latex: "x^2" },
      { type: "callout", variant: "tip", content: "Watch out" },
      { type: "callout", variant: "definition", title: "Limit", content: "..." },
    ];
    expect(parseLessonBlocks(blocks)).toEqual(blocks);
  });

  it("rejects an unknown block type", () => {
    expect(() =>
      parseLessonBlocks([{ type: "audio", url: "http://x" }]),
    ).toThrow();
  });

  it("accepts video blocks and rejects one without a src", () => {
    const blocks = [
      { type: "video", src: "/videos/x.mp4", poster: "/videos/x.jpg", title: "Overview" },
    ];
    expect(parseLessonBlocks(blocks)).toEqual(blocks);
    expect(() => parseLessonBlocks([{ type: "video", src: "" }])).toThrow();
  });

  it("rejects empty content", () => {
    expect(() => parseLessonBlocks([{ type: "text", content: "" }])).toThrow();
    expect(() => parseLessonBlocks([{ type: "math", latex: "" }])).toThrow();
  });

  it("rejects an invalid callout variant", () => {
    expect(
      lessonBlocksSchema.safeParse([
        { type: "callout", variant: "danger", content: "x" },
      ]).success,
    ).toBe(false);
  });

  it("rejects non-array input", () => {
    expect(() => parseLessonBlocks({ type: "text", content: "x" })).toThrow();
  });

  it("accepts table blocks", () => {
    const blocks = [
      { type: "table", headers: ["x", "f(x)"], rows: [["1", "1"], ["2", "4"]] },
    ];
    expect(parseLessonBlocks(blocks)).toEqual(blocks);
  });

  it("rejects a table without rows", () => {
    expect(() =>
      parseLessonBlocks([{ type: "table", headers: ["x"], rows: [] }]),
    ).toThrow();
  });

  it("accepts quiz blocks and rejects single-option quizzes", () => {
    const quiz = {
      type: "quiz",
      variant: "practice",
      question: "2 + 2?",
      options: [
        { text: "4", correct: true, feedback: "Yes" },
        { text: "5" },
      ],
    };
    expect(parseLessonBlocks([quiz])).toEqual([quiz]);
    expect(() =>
      parseLessonBlocks([{ ...quiz, options: [{ text: "4" }] }]),
    ).toThrow();
  });

  it("quiz id is optional but must be non-empty when present", () => {
    const quiz = {
      type: "quiz",
      variant: "practice",
      question: "2 + 2?",
      options: [{ text: "4", correct: true }, { text: "5" }],
    };
    expect(parseLessonBlocks([{ ...quiz, id: "lesson-quiz-1" }])).toEqual([
      { ...quiz, id: "lesson-quiz-1" },
    ]);
    expect(parseLessonBlocks([quiz])).toEqual([quiz]);
    expect(() => parseLessonBlocks([{ ...quiz, id: "" }])).toThrow();
  });

  it("accepts interactive blocks and applies config defaults", () => {
    const parsed = parseLessonBlocks([
      {
        type: "interactive",
        config: {
          component: "function-machine",
          expr: "50 + 15*x",
          exprLatex: "50 + 15x",
          min: 0,
          max: 10,
          step: 1,
          initial: 5,
        },
      },
    ]);
    const block = parsed[0];
    if (block.type !== "interactive" || block.config.component !== "function-machine") {
      throw new Error("unexpected parse result");
    }
    expect(block.config.inputLabel).toBe("Input");
    expect(block.config.outputLabel).toBe("Output");
  });

  it("accepts the trigonometry interactives and applies their defaults", () => {
    const parsed = parseLessonBlocks([
      { type: "interactive", config: { component: "right-triangle-explorer", initialAngle: 30 } },
      { type: "interactive", config: { component: "unit-circle", initialAngle: 210 } },
      { type: "interactive", config: { component: "circle-to-wave" } },
      {
        type: "interactive",
        config: {
          component: "sinusoid-playground",
          window: { xmin: -6, xmax: 6, ymin: -3, ymax: 3 },
        },
      },
      { type: "interactive", config: { component: "identity-diagram" } },
      {
        type: "interactive",
        config: {
          component: "equation-solution-viewer",
          expr: "sin(x)",
          exprLatex: "\\sin x",
          window: { xmin: 0, xmax: 6.3, ymin: -1.5, ymax: 1.5 },
        },
      },
      { type: "interactive", config: { component: "triangle-solver", mode: "ssa" } },
    ]);
    expect(parsed).toHaveLength(7);
    const triangle = parsed[0];
    if (triangle.type !== "interactive" || triangle.config.component !== "right-triangle-explorer") {
      throw new Error("unexpected parse result");
    }
    expect(triangle.config.ratios).toEqual(["sin", "cos", "tan"]);
    expect(triangle.config.showScale).toBe(true);
    const circle = parsed[1];
    if (circle.type !== "interactive" || circle.config.component !== "unit-circle") {
      throw new Error("unexpected parse result");
    }
    expect(circle.config.showReferenceAngle).toBe(false);
    expect(circle.config.maxAngle).toBe(720);
  });

  it("rejects an interactive with an unknown component", () => {
    expect(() =>
      parseLessonBlocks([
        { type: "interactive", config: { component: "3d-plot" } },
      ]),
    ).toThrow();
  });
});

describe("vector algebra interactives", () => {
  const renderConfig = (config: unknown) => {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("unexpected parse result");
    return { config: block.config, html: renderToString(createElement(Interactive, { config: block.config })) };
  };

  it("applies vec-canvas-2d defaults", () => {
    const { config } = renderConfig({ component: "vec-canvas-2d" });
    if (config.component !== "vec-canvas-2d") throw new Error("unexpected component");
    expect(config.mode).toBe("free");
    expect(config.a).toEqual([3, 1]);
    expect(config.ratio.m.initial).toBe(2);
    expect(config.combo.y.initial).toBe(1);
    expect(config.window).toEqual({ xmin: -6, xmax: 6, ymin: -5, ymax: 5 });
  });

  it("renders every vec-canvas-2d mode", () => {
    const modes = ["free", "add", "subtract", "scale", "position", "components", "section", "triangle", "combination", "dot"];
    for (const mode of modes) {
      const { html } = renderConfig({
        component: "vec-canvas-2d",
        mode,
        a: [3, 1],
        b: [1, 3],
        c: [-2, -2],
        tail: [-4, -3],
        showParallelogram: true,
        showPerpendicular: true,
        ratio: { allowExternal: true },
        readouts: ["magnitude", "angle", "components", "dot", "projection", "ratio", "sum"],
      });
      expect(html).toContain("<svg");
      expect(html).toContain("katex");
    }
    const { html } = renderConfig({ component: "vec-canvas-2d", mode: "section", a: [1, 2], b: [6, 7] });
    expect(html).toContain("internally");
  });

  it("rejects a malformed vec-canvas-2d config", () => {
    expect(() => renderConfig({ component: "vec-canvas-2d", mode: "rotate" })).toThrow();
    expect(() => renderConfig({ component: "vec-canvas-2d", a: [1, 2, 3] })).toThrow();
  });

  it("renders every vec-space-3d mode", () => {
    const samples = [
      { component: "vec-space-3d", mode: "components", a: [3, 4, 2] },
      { component: "vec-space-3d", mode: "direction-angles", a: [2, 3, 6] },
      {
        component: "vec-space-3d",
        mode: "cross",
        a: [3, 0, 0],
        b: [1, 2, 0],
        sliders: [{ name: "angle", min: 0, max: 360, step: 5, initial: 60 }],
        readouts: ["cross", "area", "dot", "magnitude"],
      },
      {
        component: "vec-space-3d",
        mode: "triple",
        a: [1, 1, 3],
        b: [4, 0, 0],
        c: [1, 3, 0],
        sliders: [{ name: "tilt", min: -60, max: 90, step: 5, initial: 45 }],
        readouts: ["volume", "cross", "area"],
      },
    ];
    for (const sample of samples) {
      const { html } = renderConfig(sample);
      expect(html).toContain("<svg");
    }
    const { config } = renderConfig({ component: "vec-space-3d" });
    if (config.component !== "vec-space-3d") throw new Error("unexpected component");
    expect(config.mode).toBe("components");
    expect(config.initialView).toEqual({ yaw: 35, pitch: 22 });
    expect(config.sliders).toEqual([]);
  });

  it("shows the coplanar case at zero tilt", () => {
    const { html } = renderConfig({
      component: "vec-space-3d",
      mode: "triple",
      a: [2, 1, 3],
      b: [4, 0, 0],
      c: [1, 3, 0],
      sliders: [{ name: "tilt", min: -60, max: 90, step: 5, initial: 0 }],
    });
    expect(html).toContain("coplanar");
  });
});

describe("permutations & combinations interactives", () => {
  const renderPnc = (config: unknown) => {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("unexpected parse result");
    return { config: block.config, html: renderToString(createElement(Interactive, { config: block.config })) };
  };

  it("renders pnc-counting-tree in product and sum mode", () => {
    const { config, html } = renderPnc({
      component: "pnc-counting-tree",
      stages: [
        { label: "Shirt", options: ["Red", "Blue", "White"] },
        { label: "Trousers", options: ["Jeans", "Chinos", "Shorts", "Cargo"] },
        { label: "Shoes", options: ["Sneakers", "Sandals"] },
      ],
      revealStages: false,
      highlightPath: ["Blue", "Chinos", "Sandals"],
    });
    if (config.component !== "pnc-counting-tree") throw new Error("unexpected component");
    expect(config.mode).toBe("product");
    expect(config.showFormula).toBe(true);
    expect(html).toContain("<svg");
    expect(html).toContain("= 24");
    expect(html).toContain("outcome #");

    const sum = renderPnc({
      component: "pnc-counting-tree",
      mode: "sum",
      revealStages: false,
      branches: [
        { label: "Bus", stages: [{ label: "Route", options: ["1", "2", "3"] }, { label: "Time", options: ["AM", "PM"] }] },
        { label: "Train", stages: [{ label: "Train", options: ["Fast", "Slow"] }, { label: "Time", options: ["AM", "PM"] }] },
      ],
    });
    expect(sum.html).toContain("= 10");
    expect(() => renderPnc({ component: "pnc-counting-tree", mode: "sum", branches: [] })).toThrow();
    expect(() => renderPnc({ component: "pnc-counting-tree" })).toThrow();
  });

  it("renders pnc-arrangement-lister groupings", () => {
    const sel = renderPnc({ component: "pnc-arrangement-lister", items: ["A", "B", "C", "D"], r: 2, groupBy: "selection", showSlots: true });
    if (sel.config.component !== "pnc-arrangement-lister") throw new Error("unexpected component");
    expect(sel.config.maxShown).toBe(120);
    expect(sel.config.mode).toBe("line");
    expect(sel.html).toContain("12 \\div 2 = 6");

    const banana = renderPnc({ component: "pnc-arrangement-lister", items: ["B", "A", "N", "A", "N", "A"], groupBy: "identical", showLabels: true });
    expect(banana.html).toContain("720 \\div 12 = 60");
    expect(banana.html).toContain("more not listed");

    const round = renderPnc({ component: "pnc-arrangement-lister", items: ["A", "B", "C", "D"], groupBy: "rotation", mode: "circular" });
    expect(round.html).toContain("24 \\div 4 = 6");
    const necklace = renderPnc({ component: "pnc-arrangement-lister", items: ["A", "B", "C", "D"], groupBy: "rotation-reflection", mode: "circular" });
    expect(necklace.html).toContain("24 \\div 8 = 3");

    const sweets = renderPnc({ component: "pnc-arrangement-lister", items: ["*", "*", "*", "*", "|", "|"], groupBy: "identical", display: "stars-bars" });
    expect(sweets.html).toContain("720 \\div 48 = 15");
    expect(() => renderPnc({ component: "pnc-arrangement-lister", items: ["A", "B"], r: 3 })).toThrow();
  });

  it("renders every pnc-pascal-triangle mode and pattern", () => {
    const paths = renderPnc({ component: "pnc-pascal-triangle", mode: "paths", initialCell: { n: 5, r: 2 } });
    if (paths.config.component !== "pnc-pascal-triangle") throw new Error("unexpected component");
    expect(paths.config.rows).toBe(8);
    expect(paths.html).toContain("Path 1 of 10");
    for (const pattern of ["row-sum", "symmetry", "hockey-stick", "odd-entries", "powers-of-11"]) {
      const { html } = renderPnc({ component: "pnc-pascal-triangle", mode: "highlight", pattern, rows: 12, initialCell: { n: 5, r: 2 } });
      expect(html).toContain("<svg");
    }
    const exp = renderPnc({ component: "pnc-pascal-triangle", mode: "expansion", rows: 6, expansion: { a: "x", b: "2" }, initialCell: { n: 3, r: 1 } });
    expect(exp.html).toContain("katex");
    expect(() => renderPnc({ component: "pnc-pascal-triangle", rows: 13 })).toThrow();
    expect(() => renderPnc({ component: "pnc-pascal-triangle", rows: 4, initialCell: { n: 5, r: 1 } })).toThrow();
  });
});

describe("probability interactives", () => {
  const renderProb = (config: unknown) => {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("unexpected parse result");
    return { config: block.config, html: renderToString(createElement(Interactive, { config: block.config })) };
  };

  it("renders prob-simulator in every mode", () => {
    const coin = renderProb({ component: "prob-simulator", mode: "coin", seed: 1 });
    if (coin.config.component !== "prob-simulator") throw new Error("unexpected component");
    expect(coin.config.batchSizes).toEqual([1, 10, 100, 1000]);
    expect(coin.html).toContain("Flip ×1,000");

    const grid = renderProb({
      component: "prob-simulator",
      mode: "two-dice",
      events: [
        { id: "A", label: "sum is 7", latex: "A", preset: "sum-eq", value: 7 },
        { id: "B", label: "doubles", latex: "B", preset: "doubles" },
      ],
      combine: "union",
      allowCombineToggle: true,
    });
    expect(grid.html).toContain("<svg");
    expect(grid.html).toContain("katex");

    const given = renderProb({
      component: "prob-simulator",
      mode: "two-dice",
      events: [
        { id: "A", label: "first die even", preset: "first-even" },
        { id: "B", label: "sum is 7", preset: "sum-eq", value: 7 },
      ],
      givenEvent: "B",
    });
    expect(given.html).toContain("Only the 6 cells");

    expect(renderProb({ component: "prob-simulator", mode: "die", track: "value-mean" }).html).toContain("Running mean");
    expect(renderProb({ component: "prob-simulator", mode: "two-dice", track: "sum-distribution" }).html).toContain("observed frequency");
    const urn = renderProb({
      component: "prob-simulator",
      mode: "urn",
      urn: { colors: [{ label: "red", count: 5 }, { label: "blue", count: 3 }], draws: 2, replacement: false, trackColor: "red", trackCount: 2 },
    });
    expect(urn.html).toContain("Without replacement");
    expect(renderProb({ component: "prob-simulator", mode: "monty-hall" }).html).toContain("Play one game");

    expect(() => renderProb({ component: "prob-simulator", mode: "coin", track: "stick-vs-switch" })).toThrow();
    expect(() => renderProb({ component: "prob-simulator", mode: "two-dice", events: [{ id: "A", label: "x", preset: "sum-eq" }] })).toThrow();
    expect(() => renderProb({ component: "prob-simulator", mode: "urn" })).toThrow();
  });

  it("renders prob-tree-diagram: products, highlight, Bayes, binomial grouping", () => {
    const coins = renderProb({
      component: "prob-tree-diagram",
      stages: [
        { label: "Coin 1", branches: [{ label: "H" }, { label: "T" }] },
        { label: "Coin 2", branches: [{ label: "H" }, { label: "T" }] },
      ],
      format: "fraction",
      highlight: { label: "exactly one head", latex: "E", leaves: { successCount: { label: "H", k: 1 } } },
    });
    if (coins.config.component !== "prob-tree-diagram") throw new Error("unexpected component");
    expect(coins.config.showLeafSum).toBe(true);
    expect(coins.html).toContain("1/2×1/2 = 1/4");

    const listing = renderProb({
      component: "prob-tree-diagram",
      showProbabilities: false,
      stages: [
        { label: "Coin", branches: [{ label: "H" }, { label: "T" }] },
        { label: "Die", branches: ["1", "2", "3", "4", "5", "6"].map((label) => ({ label })) },
      ],
    });
    expect(listing.html).toContain("n(S) = 12");

    const bayes = renderProb({
      component: "prob-tree-diagram",
      root: {
        label: "start",
        children: [
          { label: "Disease", prob: 0.01, children: [{ label: "+", prob: 0.99 }, { label: "−", prob: 0.01 }] },
          { label: "Healthy", prob: 0.99, children: [{ label: "+", prob: 0.05 }, { label: "−", prob: 0.95 }] },
        ],
      },
      editable: [{ path: "0", label: "P(D)", min: 0.001, max: 0.5, step: 0.001 }],
      bayes: { observedLeaves: { matchLastStage: "+" }, observedLabel: "test positive", population: 10000 },
    });
    expect(bayes.html).toContain("Reversed tree");
    expect(bayes.html).toContain("594");

    const binom = renderProb({
      component: "prob-tree-diagram",
      stages: [1, 2, 3].map((i) => ({ label: `Trial ${i}`, branches: [{ label: "S" }, { label: "F" }] })),
      probs: [[0.3, 0.7]],
      editable: [{ allStages: true, label: "p" }],
      collapseEqualPaths: true,
    });
    expect(binom.html).toContain("\\binom{3}{2} = 3");

    expect(() => renderProb({ component: "prob-tree-diagram" })).toThrow();
    expect(() =>
      renderProb({ component: "prob-tree-diagram", stages: [{ label: "x", branches: [{ label: "a" }, { label: "b" }] }], probs: [[0.3, 0.3]] }),
    ).toThrow();
  });

  it("renders prob-distribution-explorer in every mode", () => {
    const custom = renderProb({
      component: "prob-distribution-explorer",
      mode: "custom",
      values: [0, 1, 2, 3],
      probs: [0.1, 0.3, 0.4, 0.2],
      editable: true,
      showSd: true,
      showCdf: true,
      range: { a: 1, b: 2 },
    });
    if (custom.config.component !== "prob-distribution-explorer") throw new Error("unexpected component");
    expect(custom.config.showMean).toBe(true);
    expect(custom.html).toContain("E[X] = 1.7");
    expect(custom.html).toContain("Rescale to sum 1");

    expect(renderProb({ component: "prob-distribution-explorer", mode: "binomial", showSd: true }).html).toContain("npq");
    expect(renderProb({ component: "prob-distribution-explorer", mode: "geometric" }).html).toContain("Geometric");
    expect(renderProb({ component: "prob-distribution-explorer", mode: "poisson", showCdf: true, initialView: "cdf" }).html).toContain("<svg");
    expect(renderProb({ component: "prob-distribution-explorer", mode: "binomial-vs-poisson" }).html).toContain("Poisson(2)");

    expect(() => renderProb({ component: "prob-distribution-explorer", mode: "custom", values: [1, 2], probs: [1] })).toThrow();
    expect(() =>
      renderProb({ component: "prob-distribution-explorer", mode: "geometric", params: [{ name: "n", min: 1, max: 5, step: 1, initial: 2 }] }),
    ).toThrow();
  });
});

describe("matrices interactives", () => {
  const renderConfig = (config: unknown) => {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("unexpected parse result");
    return { config: block.config, html: renderToString(createElement(Interactive, { config: block.config })) };
  };

  it("renders matrix-transform-grid in every mode", () => {
    const { config } = renderConfig({ component: "matrix-transform-grid" });
    if (config.component !== "matrix-transform-grid") throw new Error("unexpected component");
    expect(config.matrix).toEqual([[1, 1], [0, 1]]);
    expect(config.mode).toBe("single");
    expect(config.range).toBe(4);
    const samples = [
      {
        component: "matrix-transform-grid",
        matrix: [[2, 1], [1, 2]],
        showProbe: true,
        probe: [1, 1],
        showEigenLines: true,
        presets: [
          { label: "Rotate 90°", matrix: [[0, -1], [1, 0]] },
          { label: "Shear", matrix: [[1, 1], [0, 1]] },
        ],
      },
      { component: "matrix-transform-grid", mode: "compose", matrix: [[1, 1], [0, 1]], secondMatrix: [[0, -1], [1, 0]] },
      { component: "matrix-transform-grid", mode: "inverse", matrix: [[2, 1], [1, 1]] },
      { component: "matrix-transform-grid", mode: "inverse", matrix: [[1, 2], [2, 4]], showEigenLines: true },
      { component: "matrix-transform-grid", matrix: [[0, -1], [1, 0]], showEigenLines: true, editable: false },
    ];
    for (const sample of samples) {
      const { html } = renderConfig(sample);
      expect(html).toContain("<svg");
      expect(html).toContain("katex");
    }
    expect(renderConfig(samples[3]).html).toContain("no inverse");
    expect(renderConfig(samples[4]).html).toContain("no real eigen-directions");
    expect(() => renderConfig({ component: "matrix-transform-grid", matrix: [[1, 2, 3], [4, 5, 6]] })).toThrow();
  });

  it("renders matrix-row-reducer in every mode", () => {
    const samples = [
      { component: "matrix-row-reducer", mode: "determinant", matrix: [[2, 1, 3], [0, 4, 1], [0, 0, 5]] },
      { component: "matrix-row-reducer", mode: "inverse", matrix: [[2, 1], [1, 1]], target: "reduced" },
      { component: "matrix-row-reducer", mode: "solve", matrix: [[1, 0], [0, 1]], augmented: [[3], [-2]] },
      { component: "matrix-row-reducer", mode: "rank", matrix: [[1, 2, 3], [2, 4, 6]], fractions: false },
      { component: "matrix-row-reducer", mode: "solve", matrix: [[1, 1], [0, 0]], augmented: [[2], [5]] },
    ];
    const htmls = samples.map((s) => renderConfig(s).html);
    for (const html of htmls) expect(html).toContain("katex");
    expect(htmls[0]).toContain("triangular");
    expect(htmls[2]).toContain("Reduced row echelon form");
    expect(htmls[3]).toContain("rank");
    expect(htmls[4]).toContain("no solution");
    const { config } = renderConfig(samples[2]);
    if (config.component !== "matrix-row-reducer") throw new Error("unexpected component");
    expect(config.allowedOps).toEqual(["swap", "scale", "add"]);
    expect(() => renderConfig({ component: "matrix-row-reducer", mode: "determinant", matrix: [[1, 2, 3], [4, 5, 6]] })).toThrow();
    expect(() => renderConfig({ component: "matrix-row-reducer", matrix: [[1, 2], [3]] })).toThrow();
  });

  it("renders linear-system-lines with each status", () => {
    const { config, html } = renderConfig({ component: "linear-system-lines" });
    if (config.component !== "linear-system-lines") throw new Error("unexpected component");
    expect(config.adjustable).toHaveLength(6);
    expect(html).toContain("Unique solution");
    const parallel = renderConfig({
      component: "linear-system-lines",
      line1: { a: 1, b: 2, c: 3 },
      line2: { a: 2, b: 4, c: 1 },
      presets: [{ label: "Parallel", line1: { a: 1, b: 2, c: 3 }, line2: { a: 2, b: 4, c: 1 } }],
    }).html;
    expect(parallel).toContain("No solution");
    const same = renderConfig({ component: "linear-system-lines", line1: { a: 1, b: 2, c: 3 }, line2: { a: 2, b: 4, c: 6 }, adjustable: ["c2"] }).html;
    expect(same).toContain("Infinitely many");
  });
});

describe("statistics interactives", () => {
  const renderConfig = (config: unknown) => {
    const [block] = parseLessonBlocks([{ type: "interactive", config }]);
    if (block.type !== "interactive") throw new Error("unexpected parse result");
    return { config: block.config, html: renderToString(createElement(Interactive, { config: block.config })) };
  };
  const heights = [148, 152, 155, 155, 158, 160, 160, 160, 162, 165, 168, 171, 175, 190];

  it("renders stats-distribution-builder in every view", () => {
    const dot = renderConfig({
      component: "stats-distribution-builder",
      data: [2, 3, 3, 5, 7],
      range: { min: 0, max: 20 },
      stats: ["mean", "median", "mode", "sd", "md-median"],
      showBalance: true,
      deviations: "squares",
      centerSlider: true,
      transform: { shift: true, scale: true },
    });
    if (dot.config.component !== "stats-distribution-builder") throw new Error("unexpected component");
    expect(dot.config.editable).toBe(true);
    expect(dot.config.labels).toEqual({ data: "Data", compare: "Set B" });
    expect(dot.html).toContain("Remove selected");
    expect(dot.html).toContain(">4<"); // the mean
    expect(dot.html).toContain("Σ(x − a)² as a moves");

    const hist = renderConfig({
      component: "stats-distribution-builder",
      data: heights,
      range: { min: 140, max: 200 },
      view: "histogram",
      views: ["dotplot", "histogram", "ogive", "boxplot"],
      binWidth: 10,
      binSlider: { min: 2, max: 20, step: 1 },
      density: true,
      relative: true,
      curveExpr: "exp(-((x-163)^2)/(2*10^2))/(10*sqrt(2*pi))",
      curveLatex: "N(163, 10^2)",
    });
    expect(hist.html).toContain("Relative freq. density");
    expect(hist.html).toContain("Ogive");

    expect(
      renderConfig({ component: "stats-distribution-builder", data: heights, range: { min: 140, max: 200 }, view: "ogive", binWidth: 10, ogiveType: "both" }).html,
    ).toContain("n/2: this reading is the median");
    const box = renderConfig({
      component: "stats-distribution-builder",
      data: heights,
      compareData: [150, 158, 161, 163, 166, 170],
      labels: { data: "Class A", compare: "Class B" },
      range: { min: 140, max: 200 },
      view: "boxplot",
      stats: ["q1", "median", "q3", "iqr"],
      showFences: true,
    });
    expect(box.html).toContain("Class B");
    expect(box.html).toContain("UF");

    expect(() => renderConfig({ component: "stats-distribution-builder", data: [1, 50], range: { min: 0, max: 10 } })).toThrow();
    expect(() =>
      renderConfig({ component: "stats-distribution-builder", data: [1], range: { min: 0, max: 10 }, view: "ogive", views: ["dotplot"] }),
    ).toThrow();
  });

  it("renders stats-scatter-regression with lines and co-deviation", () => {
    const sc = renderConfig({
      component: "stats-scatter-regression",
      points: [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 },
      ],
      window: { xmin: 0, xmax: 6, ymin: 0, ymax: 8 },
      showMeans: true,
      showCoDeviation: true,
      stats: ["cov", "r", "r2", "sse", "slope", "intercept"],
      userLine: { slope: 0.5, intercept: 2 },
      showLeastSquares: "always",
      showXonY: true,
    });
    if (sc.config.component !== "stats-scatter-regression") throw new Error("unexpected component");
    expect(sc.config.xLabel).toBe("x");
    expect(sc.html).toContain("0.9"); // r = 0.9
    expect(sc.html).toContain("Snap my line to least squares");
    expect(sc.html).toContain("x on y");

    const toggle = renderConfig({
      component: "stats-scatter-regression",
      points: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ],
      window: { xmin: 0, xmax: 5, ymin: 0, ymax: 5 },
      stats: ["slope"],
      showLeastSquares: "toggle",
    });
    expect(toggle.html).toContain("Show least-squares line");
    expect(() =>
      renderConfig({ component: "stats-scatter-regression", points: [{ x: 9, y: 1 }, { x: 1, y: 1 }], window: { xmin: 0, xmax: 5, ymin: 0, ymax: 5 } }),
    ).toThrow();
  });

  it("renders stats-normal-sampling-lab in every mode", () => {
    const area = renderConfig({
      component: "stats-normal-sampling-lab",
      mode: "area",
      mu: 160,
      sigma: 8,
      bounds: { a: null, b: 176 },
      targetArea: 0.9,
      paramSliders: true,
      showSigmaPresets: true,
    });
    if (area.config.component !== "stats-normal-sampling-lab") throw new Error("unexpected component");
    expect(area.config.showZ).toBe(true);
    expect(area.html).toContain("0.9772"); // Φ(2)
    expect(area.html).toContain("Target area");

    const def = renderConfig({ component: "stats-normal-sampling-lab", mode: "area" });
    expect(def.html).toContain("0.6827");

    const samp = renderConfig({ component: "stats-normal-sampling-lab", mode: "sampling", mu: 50, sigma: 10, population: "right-skewed", seed: 3 });
    expect(samp.html).toContain("Draw 100 samples");
    expect(samp.html).toContain("Right-skewed population");

    const iv = renderConfig({
      component: "stats-normal-sampling-lab",
      mode: "intervals",
      population: "bimodal",
      sampleSize: { min: 5, max: 100, initial: 25 },
      confidence: 0.99,
    });
    expect(iv.html).toContain("2.576");

    expect(() => renderConfig({ component: "stats-normal-sampling-lab", mode: "sampling", targetArea: 0.5 })).toThrow();
    expect(() => renderConfig({ component: "stats-normal-sampling-lab", mode: "intervals", confidence: 0.8 })).toThrow();
  });
});
