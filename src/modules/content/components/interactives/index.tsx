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
import { PiecewiseExplorer } from "./piecewise-explorer";
import { RightTriangleExplorer } from "./right-triangle-explorer";
import { SecantExplorer } from "./secant-explorer";
import { SinusoidPlayground } from "./sinusoid-playground";
import { TransformPlayground } from "./transform-playground";
import { TriangleSolver } from "./triangle-solver";
import { UnitCircle } from "./unit-circle";

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
  }
}
