import type { InteractiveConfig } from "../../schemas/blocks";
import { CalcSignChart } from "./calc-sign-chart";
import { CalcTangentExplorer } from "./calc-tangent-explorer";
import { CircleToWave } from "./circle-to-wave";
import { CqArgandPlane } from "./cq-argand-plane";
import { CqLocusExplorer } from "./cq-locus-explorer";
import { CqQuadraticExplorer } from "./cq-quadratic-explorer";
import { CompositionMachine } from "./composition-machine";
import { ConConicExplorer } from "./con-conic-explorer";
import { ConTangentLab } from "./con-tangent-lab";
import { EmCircuitLab } from "./em-circuit-lab";
import { EmFieldCanvas } from "./em-field-canvas";
import { EmMagnetLab } from "./em-magnet-lab";
import { EmWaveLab } from "./em-wave-lab";
import { EpsilonDelta } from "./epsilon-delta";
import { EquationSolutionViewer } from "./equation-solution-viewer";
import { FamilyGallery } from "./family-gallery";
import { FunctionEvaluator } from "./function-evaluator";
import { FunctionMachine } from "./function-machine";
import { GraphExplorer } from "./graph-explorer";
import { IdentityDiagram } from "./identity-diagram";
import { IntegAreaBetween } from "./integ-area-between";
import { IntegRiemannSum } from "./integ-riemann-sum";
import { IntegSlopeField } from "./integ-slope-field";
import { LimitExplorer } from "./limit-explorer";
import { LinearSystemLines } from "./linear-system-lines";
import { MatrixRowReducer } from "./matrix-row-reducer";
import { MatrixTransformGrid } from "./matrix-transform-grid";
import { MfeForceLab } from "./mfe-force-lab";
import { MfeMotionLab } from "./mfe-motion-lab";
import { MrgCollisionLab } from "./mrg-collision-lab";
import { MrgRollingLab } from "./mrg-rolling-lab";
import { OmpQuantumLab } from "./omp-quantum-lab";
import { OmpRayBench } from "./omp-ray-bench";
import { OwtThermoLab } from "./owt-thermo-lab";
import { OwtWaveLab } from "./owt-wave-lab";
import { PiecewiseExplorer } from "./piecewise-explorer";
import { PncArrangementLister } from "./pnc-arrangement-lister";
import { PncCountingTree } from "./pnc-counting-tree";
import { PncPascalTriangle } from "./pnc-pascal-triangle";
import { ProbDistributionExplorer } from "./prob-distribution-explorer";
import { ProbSimulator } from "./prob-simulator";
import { ProbTreeDiagram } from "./prob-tree-diagram";
import { RightTriangleExplorer } from "./right-triangle-explorer";
import { SecantExplorer } from "./secant-explorer";
import { SeqMeansLab } from "./seq-means-lab";
import { SeqProgressionLab } from "./seq-progression-lab";
import { SinusoidPlayground } from "./sinusoid-playground";
import { SlcCircleLab } from "./slc-circle-lab";
import { SlcLineExplorer } from "./slc-line-explorer";
import { SrfGraphLab } from "./srf-graph-lab";
import { TdgDistanceLab } from "./tdg-distance-lab";
import { TdgSpaceViewer } from "./tdg-space-viewer";
import { SrfMappingExplorer } from "./srf-mapping-explorer";
import { SrfVennDiagram } from "./srf-venn-diagram";
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
    case "con-conic-explorer":
      return <ConConicExplorer config={config} />;
    case "con-tangent-lab":
      return <ConTangentLab config={config} />;
    case "slc-line-explorer":
      return <SlcLineExplorer config={config} />;
    case "slc-circle-lab":
      return <SlcCircleLab config={config} />;
    case "tdg-space-viewer":
      return <TdgSpaceViewer config={config} />;
    case "tdg-distance-lab":
      return <TdgDistanceLab config={config} />;
    case "seq-progression-lab":
      return <SeqProgressionLab config={config} />;
    case "seq-means-lab":
      return <SeqMeansLab config={config} />;
    case "integ-riemann-sum":
      return <IntegRiemannSum config={config} />;
    case "integ-area-between":
      return <IntegAreaBetween config={config} />;
    case "integ-slope-field":
      return <IntegSlopeField config={config} />;
    case "calc-tangent-explorer":
      return <CalcTangentExplorer config={config} />;
    case "calc-sign-chart":
      return <CalcSignChart config={config} />;
    case "omp-ray-bench":
      return <OmpRayBench config={config} />;
    case "omp-quantum-lab":
      return <OmpQuantumLab config={config} />;
    case "em-field-canvas":
      return <EmFieldCanvas config={config} />;
    case "em-circuit-lab":
      return <EmCircuitLab config={config} />;
    case "em-magnet-lab":
      return <EmMagnetLab config={config} />;
    case "em-wave-lab":
      return <EmWaveLab config={config} />;
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
    case "mrg-collision-lab":
      return <MrgCollisionLab config={config} />;
    case "mrg-rolling-lab":
      return <MrgRollingLab config={config} />;
    case "owt-wave-lab":
      return <OwtWaveLab config={config} />;
    case "owt-thermo-lab":
      return <OwtThermoLab config={config} />;
    case "mfe-motion-lab":
      return <MfeMotionLab config={config} />;
    case "mfe-force-lab":
      return <MfeForceLab config={config} />;
    case "cq-quadratic-explorer":
      return <CqQuadraticExplorer config={config} />;
    case "cq-argand-plane":
      return <CqArgandPlane config={config} />;
    case "cq-locus-explorer":
      return <CqLocusExplorer config={config} />;
    case "srf-venn-diagram":
      return <SrfVennDiagram config={config} />;
    case "srf-mapping-explorer":
      return <SrfMappingExplorer config={config} />;
    case "srf-graph-lab":
      return <SrfGraphLab config={config} />;
  }
}
