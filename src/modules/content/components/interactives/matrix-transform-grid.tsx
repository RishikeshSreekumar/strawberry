"use client";

import { useEffect, useRef, useState } from "react";
import type { z } from "zod";
import type { matrixTransformGridSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";
import { ArrowSvg, SvgLatex } from "./vec-canvas-2d";

type Config = z.infer<typeof matrixTransformGridSchema>;
type Mode = Config["mode"];
type V2 = [number, number];
/** Row-major [[a, b], [c, d]]. */
type Mat = [[number, number], [number, number]];
type Handle = "i" | "j" | "probe";

const W = 360;
const H = 360;
const EPS = 1e-9;

const I2: Mat = [
  [1, 0],
  [0, 1],
];
const ROT90: Mat = [
  [0, -1],
  [1, 0],
];

// ---------- 2x2 algebra ----------

const cloneMat = (m: Mat): Mat => [
  [m[0][0], m[0][1]],
  [m[1][0], m[1][1]],
];
const det = (m: Mat) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
const apply = (m: Mat, v: V2): V2 => [m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1]];
const mulMat = (p: Mat, q: Mat): Mat => [
  [p[0][0] * q[0][0] + p[0][1] * q[1][0], p[0][0] * q[0][1] + p[0][1] * q[1][1]],
  [p[1][0] * q[0][0] + p[1][1] * q[1][0], p[1][0] * q[0][1] + p[1][1] * q[1][1]],
];
const lerpMat = (p: Mat, q: Mat, s: number): Mat => [
  [p[0][0] + (q[0][0] - p[0][0]) * s, p[0][1] + (q[0][1] - p[0][1]) * s],
  [p[1][0] + (q[1][0] - p[1][0]) * s, p[1][1] + (q[1][1] - p[1][1]) * s],
];
const sameMat = (p: Mat, q: Mat) =>
  Math.abs(p[0][0] - q[0][0]) < EPS &&
  Math.abs(p[0][1] - q[0][1]) < EPS &&
  Math.abs(p[1][0] - q[1][0]) < EPS &&
  Math.abs(p[1][1] - q[1][1]) < EPS;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const snapHalf = (v: number) => Math.round(v * 2) / 2;

function inverse(m: Mat): Mat | null {
  const d = det(m);
  if (Math.abs(d) < EPS) return null;
  return [
    [m[1][1] / d, -m[0][1] / d],
    [-m[1][0] / d, m[0][0] / d],
  ];
}

/** Smallest singular value: how much the matrix can shrink a vector. */
function minStretch(m: Mat): number {
  const p = m[0][0] ** 2 + m[1][0] ** 2;
  const q = m[0][0] * m[0][1] + m[1][0] * m[1][1];
  const r = m[0][1] ** 2 + m[1][1] ** 2;
  const tr = p + r;
  const disc = Math.sqrt(Math.max(0, (p - r) ** 2 + 4 * q * q));
  return Math.sqrt(Math.max(0, (tr - disc) / 2));
}

type Eigen =
  | { kind: "none" }
  | { kind: "all"; lambda: number }
  | { kind: "lines"; pairs: { lambda: number; dir: V2 }[] };

function eigen(m: Mat): Eigen {
  const [[a, b], [c, d]] = m;
  const tr = a + d;
  const disc = tr * tr - 4 * det(m);
  if (disc < -EPS) return { kind: "none" };
  const root = Math.sqrt(Math.max(0, disc));
  if (Math.abs(b) < EPS && Math.abs(c) < EPS) {
    if (Math.abs(a - d) < EPS) return { kind: "all", lambda: a };
    return {
      kind: "lines",
      pairs: [
        { lambda: a, dir: [1, 0] },
        { lambda: d, dir: [0, 1] },
      ],
    };
  }
  const lambdas = root < 1e-7 ? [tr / 2] : [(tr + root) / 2, (tr - root) / 2];
  const pairs = lambdas.map((lambda) => {
    const raw: V2 = Math.abs(b) > EPS ? [b, lambda - a] : [lambda - d, c];
    const l = Math.hypot(raw[0], raw[1]);
    return { lambda, dir: [raw[0] / l, raw[1] / l] as V2 };
  });
  return { kind: "lines", pairs };
}

// ---------- LaTeX ----------

const fmt = (v: number) => {
  const s = formatNumber(Math.abs(v) < 5e-4 ? 0 : v, 2);
  return s === "-0" ? "0" : s;
};
const paren = (v: number) => (v < -EPS ? `(${fmt(v)})` : fmt(v));
const matLatex = (m: Mat) =>
  `\\begin{pmatrix} ${fmt(m[0][0])} & ${fmt(m[0][1])} \\\\ ${fmt(m[1][0])} & ${fmt(m[1][1])} \\end{pmatrix}`;
const colLatex = (v: V2) => `\\begin{pmatrix} ${fmt(v[0])} \\\\ ${fmt(v[1])} \\end{pmatrix}`;

const DEFAULT_CAPTIONS: Record<Mode, string> = {
  single:
    "Slide t from 0 to 1 to watch the plane move from where it starts (the identity) to where A sends it. The columns of A are exactly where î and ĵ land; drag their tips or type entries to change A.",
  compose:
    "Slide t: first B moves the plane, then A moves the result. The product AB is the single matrix that does both, B first. Toggle to see AB in one move.",
  inverse:
    "Slide t from 0 to 1 to apply A, then on to 2 to apply A⁻¹ and put every point back where it started. When det A = 0 the plane collapses and nothing can undo it.",
};

// ---------- small editor ----------

function EntryInput({
  value,
  label,
  onCommit,
}: {
  value: number;
  label: string;
  onCommit: (v: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      type="number"
      step={0.5}
      inputMode="decimal"
      aria-label={label}
      value={draft ?? String(Number(value.toFixed(3)))}
      onChange={(e) => {
        const text = e.target.value;
        setDraft(text);
        const n = Number(text);
        if (text.trim() !== "" && Number.isFinite(n)) onCommit(clamp(n, -99, 99));
      }}
      onBlur={() => setDraft(null)}
      className="w-14 rounded-md border bg-background px-1.5 py-1 text-center text-sm tabular-nums"
    />
  );
}

function MatrixEditor({
  name,
  matrix,
  onChange,
}: {
  name: string;
  matrix: Mat;
  onChange: (m: Mat) => void;
}) {
  const set = (r: 0 | 1, c: 0 | 1, v: number) => {
    const next = cloneMat(matrix);
    next[r][c] = v;
    onChange(next);
  };
  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Entries of ${name}`}>
      <Latex latex={`${name} =`} />
      <div className="flex items-stretch gap-1">
        <span className="w-1.5 rounded-l-md border-y-2 border-l-2 border-foreground/60" aria-hidden />
        <div className="grid grid-cols-2 gap-1 py-0.5">
          {([0, 1] as const).map((r) =>
            ([0, 1] as const).map((c) => (
              <EntryInput
                key={`${r}${c}`}
                value={matrix[r][c]}
                label={`${name}, row ${r + 1}, column ${c + 1}`}
                onCommit={(v) => set(r, c, v)}
              />
            )),
          )}
        </div>
        <span className="w-1.5 rounded-r-md border-y-2 border-r-2 border-foreground/60" aria-hidden />
      </div>
    </div>
  );
}

// ---------- component ----------

export function MatrixTransformGrid({ config }: { config: Config }) {
  const mode = config.mode;
  const R = config.range;
  const u = W / (2 * R);
  const sx = (x: number) => W / 2 + x * u;
  const sy = (y: number) => H / 2 - y * u;

  const [A, setA] = useState<Mat>(() => cloneMat(config.matrix));
  const [B, setB] = useState<Mat>(() => cloneMat(config.secondMatrix ?? ROT90));
  const [direct, setDirect] = useState(false);
  const [probe, setProbe] = useState<V2>(config.probe ?? [1, 2]);
  const [t, setT] = useState(1);
  const [play, setPlay] = useState<{ from: number } | null>(null);
  const [dragging, setDragging] = useState<Handle | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const detA = det(A);
  const invA = inverse(A);
  const AB = mulMat(A, B);
  const tMax = mode === "single" || (mode === "compose" && direct) || (mode === "inverse" && !invA) ? 1 : 2;
  const tt = Math.min(t, tMax);

  // The matrix currently on screen.
  let M: Mat;
  if (mode === "single") M = lerpMat(I2, A, tt);
  else if (mode === "compose") {
    if (direct) M = lerpMat(I2, AB, tt);
    else M = tt <= 1 ? lerpMat(I2, B, tt) : lerpMat(B, AB, tt - 1);
  } else M = tt <= 1 ? lerpMat(I2, A, tt) : lerpMat(A, I2, tt - 1);

  // The matrix whose eigen-directions and determinant the lesson is about.
  const target: Mat = mode === "compose" ? AB : A;
  const detM = det(M);

  // Animate t from `from` to tMax.
  useEffect(() => {
    if (!play) return;
    let pos = play.from;
    let last: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      if (last !== null) pos = Math.min(tMax, pos + (now - last) / 1300);
      last = now;
      setT(Number(pos.toFixed(3)));
      if (pos >= tMax) {
        setPlay(null);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [play, tMax]);

  function startPlay(from: number) {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPlay(null);
      setT(tMax);
      return;
    }
    setPlay({ from });
  }

  function worldFromEvent(e: React.PointerEvent<SVGSVGElement>): V2 {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const py = ((e.clientY - rect.top) / rect.height) * H;
    return [(px - W / 2) / u, (H / 2 - py) / u];
  }

  function moveHandle(h: Handle, p: V2) {
    const q: V2 = [clamp(snapHalf(p[0]), -R, R), clamp(snapHalf(p[1]), -R, R)];
    if (h === "probe") {
      setProbe(q);
      return;
    }
    const next = cloneMat(A);
    const col = h === "i" ? 0 : 1;
    next[0][col] = q[0];
    next[1][col] = q[1];
    setA(next);
  }

  function reset() {
    setPlay(null);
    setA(cloneMat(config.matrix));
    setB(cloneMat(config.secondMatrix ?? ROT90));
    setProbe(config.probe ?? [1, 2]);
    setDirect(false);
    setT(1);
  }

  // Handles for A's columns only while the screen shows A itself.
  const showingA = mode !== "compose" && Math.abs(tt - 1) < 1e-6;
  const handles: Handle[] = [];
  if (config.editable && showingA) handles.push("i", "j");
  if (config.showProbe) handles.push("probe");

  // Transformed grid lines: enough of them to cover the view even when M shrinks.
  const shrink = minStretch(M);
  const N = Math.min(40, Math.ceil(R / Math.max(shrink, 0.1)) + 1);
  const L = N + 1;
  const gridLines: { key: string; p: V2; q: V2; axis: boolean }[] = [];
  for (let k = -N; k <= N; k++) {
    gridLines.push({ key: `v${k}`, p: apply(M, [k, -L]), q: apply(M, [k, L]), axis: k === 0 });
    gridLines.push({ key: `h${k}`, p: apply(M, [-L, k]), q: apply(M, [L, k]), axis: k === 0 });
  }
  const staticTicks: number[] = [];
  for (let k = -Math.floor(R); k <= Math.floor(R); k++) staticTicks.push(k);

  const iImg = apply(M, [1, 0]);
  const jImg = apply(M, [0, 1]);
  const sqImg = [[0, 0] as V2, iImg, apply(M, [1, 1]), jImg];
  const sqPoints = sqImg.map((p) => `${sx(p[0])},${sy(p[1])}`).join(" ");
  const sqClass =
    Math.abs(detM) < 1e-6
      ? "fill-none stroke-callout-warning"
      : detM > 0
        ? "fill-callout-info/20 stroke-callout-info"
        : "fill-callout-warning/25 stroke-callout-warning";

  const probeImg = apply(M, probe);
  const probeFinal = apply(target, probe);
  const eig = config.showEigenLines ? eigen(target) : null;
  const probeLen = Math.hypot(probe[0], probe[1]);
  const probeOnEigen =
    config.showEigenLines &&
    probeLen > EPS &&
    Math.abs(probe[0] * probeFinal[1] - probe[1] * probeFinal[0]) < 1e-6;
  const probeLambda =
    probeOnEigen && probeLen > EPS ? (probe[0] * probeFinal[0] + probe[1] * probeFinal[1]) / (probeLen * probeLen) : null;

  const near = (v: number) => Math.abs(tt - v) < 1e-6;
  let probeImgLabel = "M\\vec v";
  if (near(0) || (mode === "inverse" && near(2))) probeImgLabel = "\\vec v";
  else if (mode === "single" && near(1)) probeImgLabel = "A\\vec v";
  else if (mode === "inverse" && near(1)) probeImgLabel = "A\\vec v";
  else if (mode === "compose" && near(tMax)) probeImgLabel = "AB\\vec v";
  else if (mode === "compose" && !direct && near(1)) probeImgLabel = "B\\vec v";

  const tipLabelPos = (v: V2): V2 => {
    const l = Math.hypot(v[0], v[1]);
    if (l < EPS) return [sx(0) + 12, sy(0) - 12];
    return [clamp(sx(v[0]) + (v[0] / l) * 14, 10, W - 10), clamp(sy(v[1]) - (v[1] / l) * 14, 10, H - 10)];
  };
  const iLab = tipLabelPos(iImg);
  const jLab = tipLabelPos(jImg);

  // ---------- readouts ----------
  const lines: { key: string; latex: string; note?: string }[] = [];
  const nameT = mode === "compose" ? "AB" : "A";
  if (mode === "compose") {
    lines.push({ key: "B", latex: `B = ${matLatex(B)}`, note: "applied first" });
    lines.push({ key: "A", latex: `A = ${matLatex(A)}`, note: "applied second" });
    lines.push({
      key: "AB",
      latex: `AB = \\begin{pmatrix} A${colLatex([B[0][0], B[1][0]])} & A${colLatex([B[0][1], B[1][1]])} \\end{pmatrix} = ${matLatex(AB)}`,
      note: "column j of AB is A times column j of B",
    });
    const BA = mulMat(B, A);
    lines.push({
      key: "BA",
      latex: `BA = ${matLatex(BA)}`,
      note: sameMat(AB, BA) ? "same as AB here: these two happen to commute" : "not AB: the order matters",
    });
  } else {
    lines.push({
      key: "A",
      latex: `A = ${matLatex(A)}`,
      note: "columns: where î and ĵ land",
    });
  }
  if (config.showDeterminant) {
    if (mode === "compose") {
      lines.push({
        key: "det",
        latex: `\\det(AB) = \\det A \\cdot \\det B = ${paren(detA)} \\cdot ${paren(det(B))} = ${fmt(det(AB))}`,
      });
    } else {
      lines.push({
        key: "det",
        latex: `\\det A = ad - bc = ${paren(A[0][0])}${paren(A[1][1])} - ${paren(A[0][1])}${paren(A[1][0])} = ${fmt(detA)}`,
      });
    }
    lines.push({
      key: "area",
      latex: `\\text{shaded area now} = \\lvert ${fmt(detM)} \\rvert \\times \\text{(unit square)}`,
    });
  }
  if (mode === "inverse") {
    if (invA) {
      lines.push({
        key: "inv",
        latex: `A^{-1} = \\frac{1}{${fmt(detA)}}\\begin{pmatrix} ${fmt(A[1][1])} & ${fmt(-A[0][1])} \\\\ ${fmt(-A[1][0])} & ${fmt(A[0][0])} \\end{pmatrix} = ${matLatex(invA)}`,
      });
    }
  }
  if (config.showProbe) {
    const [x, y] = probe;
    lines.push({
      key: "probe",
      latex: `${nameT}\\vec v = ${paren(x)}${colLatex([target[0][0], target[1][0]])} + ${paren(y)}${colLatex([target[0][1], target[1][1]])} = ${colLatex(probeFinal)}`,
      note: `v = (${fmt(x)}, ${fmt(y)}): x copies of column 1 plus y copies of column 2`,
    });
  }
  if (eig) {
    if (eig.kind === "none") {
      lines.push({ key: "eig", latex: `\\text{no real eigen-directions}`, note: "every non-zero vector is turned off its line" });
    } else if (eig.kind === "all") {
      lines.push({
        key: "eig",
        latex: `\\text{every direction: } \\lambda = ${fmt(eig.lambda)}`,
        note: "a pure scaling keeps every line through O",
      });
    } else {
      eig.pairs.forEach((pr, idx) => {
        lines.push({
          key: `eig${idx}`,
          latex: `\\lambda_{${idx + 1}} = ${fmt(pr.lambda)}, \\ \\text{along } ${colLatex(pr.dir)}`,
        });
      });
    }
  }

  const notes: string[] = [];
  if (config.showDeterminant) {
    if (Math.abs(detM) < 1e-6) notes.push("det = 0 right now: the plane is squashed onto a line (or a point). Area is gone.");
    else if (detM < 0) notes.push("det < 0: the plane has been flipped over — î and ĵ have swapped their turning order.");
  }
  if (mode === "inverse" && !invA) notes.push("det A = 0, so A has no inverse: once the plane collapses, many points share one image and nothing can pull them apart.");
  if (mode === "inverse" && invA && Math.abs(tt - 2) < 1e-6) notes.push("A⁻¹A = I: every point is back where it started.");
  if (probeOnEigen && probeLambda !== null) notes.push(`v lies on an eigen-line: ${nameT}v = ${fmt(probeLambda)}·v, it stays on its own line.`);

  let stage = "";
  if (mode === "compose" && !direct) stage = tt <= 1 ? "stage 1: B acts" : "stage 2: A acts on the result";
  if (mode === "inverse" && tMax === 2) stage = tt <= 1 ? "applying A" : "undoing with A⁻¹";

  const handlePos: Record<Handle, V2> = { i: [A[0][0], A[1][0]], j: [A[0][1], A[1][1]], probe };
  const handleLabel: Record<Handle, string> = {
    i: "tip of column 1 (where î lands)",
    j: "tip of column 2 (where ĵ lands)",
    probe: "probe vector v",
  };
  const handleClass: Record<Handle, string> = {
    i: "fill-callout-tip stroke-callout-tip",
    j: "fill-callout-warning stroke-callout-warning",
    probe: "fill-background stroke-callout-definition",
  };

  const loadPreset = (m: Mat) => {
    setA(cloneMat(m));
    setT(0);
    startPlay(0);
  };

  return (
    <InteractiveFrame title={mode === "compose" ? "Composing transformations" : mode === "inverse" ? "Undoing a transformation" : "Matrix as a transformation"}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-md select-none overflow-hidden rounded-md border bg-background"
        role="group"
        aria-label={`Grid transformed by the matrix ${fmt(M[0][0])}, ${fmt(M[0][1])}; ${fmt(M[1][0])}, ${fmt(M[1][1])}`}
        onPointerMove={(e) => {
          if (dragging) moveHandle(dragging, worldFromEvent(e));
        }}
        onPointerUp={() => setDragging(null)}
        onPointerCancel={() => setDragging(null)}
      >
        {/* the original grid, faint */}
        {staticTicks.map((k) => (
          <g key={`s${k}`}>
            <line x1={sx(k)} y1={0} x2={sx(k)} y2={H} className="stroke-border" strokeWidth={0.6} />
            <line x1={0} y1={sy(k)} x2={W} y2={sy(k)} className="stroke-border" strokeWidth={0.6} />
          </g>
        ))}
        <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} className="stroke-foreground/25" strokeWidth={1} />
        <line x1={sx(0)} y1={0} x2={sx(0)} y2={H} className="stroke-foreground/25" strokeWidth={1} />

        {/* eigen-lines (invariant under the transformation, so drawn once) */}
        {eig?.kind === "lines" &&
          eig.pairs.map((pr, idx) => {
            const far = 3 * R;
            const lab: V2 = [pr.dir[0] * R * 0.8, pr.dir[1] * R * 0.8];
            return (
              <g key={`eig${idx}`}>
                <line
                  x1={sx(-pr.dir[0] * far)}
                  y1={sy(-pr.dir[1] * far)}
                  x2={sx(pr.dir[0] * far)}
                  y2={sy(pr.dir[1] * far)}
                  className="stroke-callout-definition"
                  strokeWidth={2}
                  strokeDasharray="7 5"
                />
                <SvgLatex
                  x={clamp(sx(lab[0]) + 14, 20, W - 20)}
                  y={clamp(sy(lab[1]) - 10, 12, H - 12)}
                  latex={`\\lambda = ${fmt(pr.lambda)}`}
                  className="text-callout-definition"
                />
              </g>
            );
          })}

        {/* the transformed grid */}
        {gridLines.map((g) => (
          <line
            key={g.key}
            x1={sx(g.p[0])}
            y1={sy(g.p[1])}
            x2={sx(g.q[0])}
            y2={sy(g.q[1])}
            className={g.axis ? "stroke-primary/70" : "stroke-primary/25"}
            strokeWidth={g.axis ? 1.5 : 1}
          />
        ))}

        {/* image of the unit square */}
        {config.showDeterminant && <polygon points={sqPoints} className={sqClass} strokeWidth={1.5} />}

        {/* probe */}
        {config.showProbe && (
          <>
            <ArrowSvg x1={sx(0)} y1={sy(0)} x2={sx(probe[0])} y2={sy(probe[1])} color="muted" width={2} dashed opacity={0.8} />
            {probeImgLabel !== "\\vec v" && (
              <SvgLatex
                x={clamp(sx(probe[0]) + 14, 20, W - 20)}
                y={clamp(sy(probe[1]) + 12, 12, H - 12)}
                latex="\\vec v"
                className="text-muted-foreground"
              />
            )}
            <ArrowSvg x1={sx(0)} y1={sy(0)} x2={sx(probeImg[0])} y2={sy(probeImg[1])} color="c" width={2.5} />
            <SvgLatex
              x={clamp(sx(probeImg[0]) + 16, 20, W - 20)}
              y={clamp(sy(probeImg[1]) - 12, 12, H - 12)}
              latex={probeImgLabel}
              className="text-callout-definition"
            />
          </>
        )}

        {/* basis vectors */}
        <ArrowSvg x1={sx(0)} y1={sy(0)} x2={sx(iImg[0])} y2={sy(iImg[1])} color="result" width={3} />
        <ArrowSvg x1={sx(0)} y1={sy(0)} x2={sx(jImg[0])} y2={sy(jImg[1])} color="aux" width={3} />
        <SvgLatex x={iLab[0]} y={iLab[1]} latex="\hat{\imath}" className="text-callout-tip" />
        <SvgLatex x={jLab[0]} y={jLab[1]} latex="\hat{\jmath}" className="text-callout-warning" />
        <circle cx={sx(0)} cy={sy(0)} r={2.5} className="fill-foreground" />

        {handles.map((h) => {
          const p = handlePos[h];
          const hx = sx(p[0]);
          const hy = sy(p[1]);
          return (
            <g
              key={`h-${h}`}
              tabIndex={0}
              role="button"
              aria-label={`Move ${handleLabel[h]}, now at (${fmt(p[0])}, ${fmt(p[1])}). Use arrow keys.`}
              className={`group outline-none ${dragging === h ? "cursor-grabbing" : "cursor-grab"}`}
              style={{ touchAction: "none" }}
              onPointerDown={(e) => {
                e.preventDefault();
                setPlay(null);
                svgRef.current?.setPointerCapture(e.pointerId);
                setDragging(h);
              }}
              onKeyDown={(e) => {
                const delta: Record<string, V2> = {
                  ArrowLeft: [-0.5, 0],
                  ArrowRight: [0.5, 0],
                  ArrowUp: [0, 0.5],
                  ArrowDown: [0, -0.5],
                };
                const d = delta[e.key];
                if (!d) return;
                e.preventDefault();
                moveHandle(h, [p[0] + d[0], p[1] + d[1]]);
              }}
            >
              <circle cx={hx} cy={hy} r={18} fill="transparent" />
              <circle
                cx={hx}
                cy={hy}
                r={12}
                fill="none"
                className="stroke-transparent group-focus-visible:stroke-foreground"
                strokeWidth={1.5}
              />
              <circle cx={hx} cy={hy} r={h === "probe" ? 5.5 : 6.5} className={`${handleClass[h]} stroke-2 opacity-90`} />
            </g>
          );
        })}
      </svg>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <SliderRow
              label={<Latex latex="t" />}
              value={tt}
              min={0}
              max={tMax}
              step={0.01}
              onChange={(v) => {
                setPlay(null);
                setT(v);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => (play ? setPlay(null) : startPlay(tt >= tMax - 1e-6 ? 0 : tt))}
            className="shrink-0 rounded-md border bg-background px-2.5 py-1 text-xs font-medium"
            aria-pressed={play !== null}
          >
            {play ? "Pause" : "Play"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          <Latex latex={`\\text{on screen: } ${matLatex(M)}`} />
          {stage && <span className="ml-2">({stage})</span>}
        </p>
      </div>

      {mode === "compose" && (
        <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="How to apply the product">
          {([false, true] as const).map((d) => (
            <button
              key={String(d)}
              type="button"
              aria-pressed={direct === d}
              onClick={() => {
                setDirect(d);
                setT(0);
                startPlay(0);
              }}
              className={`rounded-md border px-3 py-1 ${direct === d ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {d ? "AB in one move" : "B, then A"}
            </button>
          ))}
        </div>
      )}

      {config.editable && (
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {mode === "compose" && <MatrixEditor name="B" matrix={B} onChange={setB} />}
          <MatrixEditor name="A" matrix={A} onChange={setA} />
        </div>
      )}

      {config.presets && config.presets.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Preset matrices">
          {config.presets.map((p) => {
            const active = sameMat(A, p.matrix as Mat);
            return (
              <button
                key={p.label}
                type="button"
                aria-pressed={active}
                onClick={() => loadPreset(p.matrix as Mat)}
                className={`rounded-md border px-2.5 py-1 text-xs ${active ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">
        {lines.map((l) => (
          <div key={l.key} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="max-w-full overflow-x-auto">
              <Latex latex={l.latex} />
            </span>
            {l.note && <span className="text-xs text-muted-foreground">{l.note}</span>}
          </div>
        ))}
      </div>

      {notes.map((note) => (
        <p key={note} className="text-sm font-medium text-callout-warning">
          {note}
        </p>
      ))}

      <div className="flex items-start justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {config.caption ?? DEFAULT_CAPTIONS[mode]}
          {config.editable && mode !== "compose" && !showingA ? " (Set t = 1 to drag the column tips.)" : ""}
        </p>
        <button type="button" onClick={reset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
          Reset
        </button>
      </div>
    </InteractiveFrame>
  );
}
