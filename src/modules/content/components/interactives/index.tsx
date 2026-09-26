import type { InteractiveConfig } from "../../schemas/blocks";
import { CircleToWave } from "./circle-to-wave";
import { CompositionMachine } from "./composition-machine";
import { EpsilonDelta } from "./epsilon-delta";
import { EquationSolutionViewer } from "./equation-solution-viewer";
import { FamilyGallery } from "./family-gallery";
import { FunctionEvaluator } from "./function-evaluator";
import { FunctionMachine } from "./function-machine";
import { GraphExplorer } from "./graph-explorer";
import { IdentityDiagram } from "./identity-diagram";
import { LimitExplorer } from "./limit-explorer";
import { LinearSystemLines } from "./linear-system-lines";
import { MatrixRowReducer } from "./matrix-row-reducer";
import { MatrixTransformGrid } from "./matrix-transform-grid";
import { PiecewiseExplorer } from "./piecewise-explorer";
import { PncArrangementLister } from "./pnc-arrangement-lister";
import { PncCountingTree } from "./pnc-counting-tree";
import { PncPascalTriangle } from "./pnc-pascal-triangle";
import { ProbDistributionExplorer } from "./prob-distribution-explorer";
import { ProbSimulator } from "./prob-simulator";
import { ProbTreeDiagram } from "./prob-tree-diagram";
import { RightTriangleExplorer } from "./right-triangle-explorer";
import { SecantExplorer } from "./secant-explorer";
import { SinusoidPlayground } from "./sinusoid-playground";
import { StatsDistributionBuilder } from "./stats-distribution-builder";
import { StatsNormalSamplingLab } from "./stats-normal-sampling-lab";
import { StatsScatterRegression } from "./stats-scatter-regression";
import { TransformPlayground } from "./transform-playground";
import { TriangleSolver } from "./triangle-solver";
import { UnitCircle } from "./unit-circle";
import { VecCanvas2d } from "./vec-canvas-2d";
import { VecSpace3d } from "./vec-space-3d";

export function Interactive({ config }: { config: InteractiveConfig }) {
  switch (config.component) {
    case "function-machine":
      return <FunctionMachine config={config} />;
    case "function-evaluator":
      return <FunctionEvaluator config={config} />;
    case "graph-explorer":
      return <GraphExplorer config={config} />;
    case "transform-playground":
      return <TransformPlayground config={config} />;
    case "family-gallery":
      return <FamilyGallery config={config} />;
    case "composition-machine":
      return <CompositionMachine config={config} />;
    case "piecewise-explorer":
      return <PiecewiseExplorer config={config} />;
    case "secant-explorer":
      return <SecantExplorer config={config} />;
    case "limit-explorer":
      return <LimitExplorer config={config} />;
    case "epsilon-delta":
      return <EpsilonDelta config={config} />;
    case "right-triangle-explorer":
      return <RightTriangleExplorer config={config} />;
    case "unit-circle":
      return <UnitCircle config={config} />;
    case "circle-to-wave":
      return <CircleToWave config={config} />;
    case "sinusoid-playground":
      return <SinusoidPlayground config={config} />;
    case "identity-diagram":
      return <IdentityDiagram config={config} />;
    case "equation-solution-viewer":
      return <EquationSolutionViewer config={config} />;
    case "triangle-solver":
      return <TriangleSolver config={config} />;
    case "vec-canvas-2d":
      return <VecCanvas2d config={config} />;
    case "vec-space-3d":
      return <VecSpace3d config={config} />;
    case "pnc-counting-tree":
      return <PncCountingTree config={config} />;
    case "pnc-arrangement-lister":
      return <PncArrangementLister config={config} />;
    case "pnc-pascal-triangle":
      return <PncPascalTriangle config={config} />;
    case "prob-simulator":
      return <ProbSimulator config={config} />;
    case "prob-tree-diagram":
      return <ProbTreeDiagram config={config} />;
    case "prob-distribution-explorer":
      return <ProbDistributionExplorer config={config} />;
    case "matrix-transform-grid":
      return <MatrixTransformGrid config={config} />;
    case "matrix-row-reducer":
      return <MatrixRowReducer config={config} />;
    case "linear-system-lines":
      return <LinearSystemLines config={config} />;
    case "stats-distribution-builder":
      return <StatsDistributionBuilder config={config} />;
    case "stats-scatter-regression":
      return <StatsScatterRegression config={config} />;
    case "stats-normal-sampling-lab":
      return <StatsNormalSamplingLab config={config} />;
  }
}
