import type { InteractiveConfig } from "../../schemas/blocks";
import { CompositionMachine } from "./composition-machine";
import { EpsilonDelta } from "./epsilon-delta";
import { FamilyGallery } from "./family-gallery";
import { FunctionEvaluator } from "./function-evaluator";
import { FunctionMachine } from "./function-machine";
import { GraphExplorer } from "./graph-explorer";
import { LimitExplorer } from "./limit-explorer";
import { PiecewiseExplorer } from "./piecewise-explorer";
import { SecantExplorer } from "./secant-explorer";
import { TransformPlayground } from "./transform-playground";

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
  }
}
