"use client";

import { useRef, useState } from "react";
import type { z } from "zod";
import type { ompRayBenchSchema } from "../../schemas/blocks";
import { formatNumber } from "./function-plot";
import { InteractiveFrame, Latex, SliderRow } from "./ui";

type Config = z.infer<typeof ompRayBenchSchema>;
type Mode = Config["mode"];
type Range = Config["n1"];
type RayKind = Config["rays"][number];

const W = 400;
const RAD = Math.PI / 180;
const EPS = 1e-9;

const fmt = (v: number, d = 2) => formatNumber(v, d);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const snapTo = (v: number, r: Range) => clamp(Math.round((v - r.min) / r.step) * r.step + r.min, r.min, r.max);
/** Signed number for substitution into a formula: (-30) in brackets when negative. */
const sub = (v: number) => (v < 0 ? `(${fmt(v)})` : fmt(v));

const RAY_CLASS: Record<RayKind, string> = {
  parallel: "stroke-callout-info",
  centre: "stroke-callout-definition",
  focal: "stroke-callout-warning",
};
const RAY_FILL: Record<RayKind, string> = {
  parallel: "fill-callout-info",
  centre: "fill-callout-definition",
  focal: "fill-callout-warning",
};

const TITLES: Record<Mode, string> = {
  "plane-mirror": "Plane mirror",
  "concave-mirror": "Concave mirror",
  "convex-mirror": "Convex mirror",
  "convex-lens": "Convex (converging) lens",
  "concave-lens": "Concave (diverging) lens",
  refraction: "Refraction at a boundary",
  "apparent-depth": "Apparent depth",
  prism: "Prism",
};

const CAPTIONS: Record<Mode, string> = {
  "plane-mirror": "Drag the object. The reflected rays diverge as if from a point just as far behind the mirror.",
  "concave-mirror": "Drag the object through C and F. Watch the image flip from real and inverted to virtual and erect.",
  "convex-mirror": "Wherever you put the object, the image stays virtual, erect, diminished and between P and F.",
  "convex-lens": "Drag the object through 2F and F. Every ray from the arrow's tip meets again at the image's tip.",
  "concave-lens": "A diverging lens always gives a virtual, erect, diminished image on the object's side.",
  refraction: "Change the angle and the two indices. From denser to rarer, past the critical angle, no light gets through.",
  "apparent-depth": "Tilt the viewing ray. The object seems to rise, and seems shallower still when you look at a slant.",
  prism: "Vary i and watch δ fall and rise again. At the bottom of the curve the ray passes symmetrically, i = e.",
};

export function OmpRayBench({ config }: { config: Config }) {
  const { mode } = config;
  return (
    <InteractiveFrame title={TITLES[mode]}>
      {mode === "refraction" ? (
        <RefractionView config={config} />
      ) : mode === "apparent-depth" ? (
        <ApparentDepthView config={config} />
      ) : mode === "prism" ? (
        <PrismView config={config} />
      ) : (
        <ImageView config={config} />
      )}
    </InteractiveFrame>
  );
}

function Slider({ label, range, value, onChange, unit }: { label: string; range: Range; value: number; onChange: (v: number) => void; unit?: string }) {
  if (range.min === range.max) return null;
  return (
    <SliderRow label={<Latex latex={label} />} value={value} min={range.min} max={range.max} step={range.step} onChange={onChange} unit={unit} />
  );
}

function Footer({ caption, onReset }: { caption: string; onReset: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs text-muted-foreground">{caption}</p>
      <button type="button" onClick={onReset} className="shrink-0 rounded-md border bg-background px-2 py-1 text-xs">
        Reset
      </button>
    </div>
  );
}

function Readouts({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5 rounded-md border bg-background p-3 text-sm">{children}</div>;
}

/** Small arrowhead at the middle of a screen-space segment, pointing from 1 to 2. */
function MidArrow({ x1, y1, x2, y2, className }: { x1: number; y1: number; x2: number; y2: number; className: string }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l = Math.hypot(dx, dy);
  if (!(l > 20)) return null;
  const ux = dx / l;
  const uy = dy / l;
  const mx = (x1 + x2) / 2 + ux * 4;
  const my = (y1 + y2) / 2 + uy * 4;
  const bx = mx - ux * 7;
  const by = my - uy * 7;
  return <polygon points={`${mx},${my} ${bx - uy * 3.5},${by + ux * 3.5} ${bx + uy * 3.5},${by - ux * 3.5}`} className={className} />;
}

/** Arc in screen space around (cx, cy) between two directions given in degrees (screen angles, y down). */
function arcPath(cx: number, cy: number, r: number, fromDeg: number, toDeg: number) {
  const a1 = fromDeg * RAD;
  const a2 = toDeg * RAD;
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2);
  const y2 = cy + r * Math.sin(a2);
  const sweep = toDeg > fromDeg ? 1 : 0;
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

// ---------- image modes: mirrors and thin lenses ----------

function ImageView({ config }: { config: Config }) {
  const { mode } = config;
  const isMirror = mode === "plane-mirror" || mode === "concave-mirror" || mode === "convex-mirror";
  const [U, setU] = useState(config.objectDistance.initial);
  const [F, setF] = useState(config.focalLength.initial);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const h = config.objectHeight;

  // New Cartesian: pole / optical centre at x = 0, object at x = -U.
  // f < 0 for concave mirror and concave lens. P = 1/f (0 for a plane mirror).
  const f = mode === "plane-mirror" ? Infinity : mode === "concave-mirror" || mode === "concave-lens" ? -F : F;
  const P = mode === "plane-mirror" ? 0 : 1 / f;
  const u = -U;
  // mirror: 1/v + 1/u = 1/f ; lens: 1/v - 1/u = 1/f
  const invV = isMirror ? P - 1 / u : P + 1 / u;
  const atInfinity = Math.abs(invV) < 1e-6;
  const v = atInfinity ? Infinity : 1 / invV;
  const m = atInfinity ? Infinity : isMirror ? -v / u : v / u;
  const real = !atInfinity && (isMirror ? v < 0 : v > 0);
  const hImg = atInfinity ? 0 : m * h;

  const halfX =
    config.benchHalfWidth ??
    Math.max(config.objectDistance.max, mode === "plane-mirror" ? 0 : 2 * config.focalLength.max) * 1.15;
  const halfY = h * 4;
  const H = 240;
  const sx = (x: number) => ((x + halfX) / (2 * halfX)) * W;
  const sy = (y: number) => H / 2 - (y / halfY) * (H / 2);
  // Keep far-off coordinates bounded (the SVG clips anyway).
  const syc = (y: number) => clamp(sy(y), -4 * H, 5 * H);

  // Outgoing slope dy/dx after the element, for a ray arriving with slope s at height y.
  const outSlope = (s: number, y: number) => (isMirror ? -s - y * P : s - y * P);
  const endX = isMirror ? -halfX : halfX;

  type Ray = { kind: RayKind; s: number };
  const rays: Ray[] = [];
  for (const kind of config.rays) {
    if (kind === "parallel") rays.push({ kind, s: 0 });
    else if (kind === "centre") rays.push({ kind, s: -h / U });
    else if (P !== 0) {
      // The ray that leaves parallel to the axis.
      const denom = isMirror ? 1 + U * P : 1 - U * P;
      if (Math.abs(denom) > 1e-6) rays.push({ kind, s: isMirror ? (-h * P) / denom : (h * P) / denom });
    }
  }

  function moveTo(clientX: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    const x = (px / W) * 2 * halfX - halfX;
    setU(snapTo(-x, config.objectDistance));
  }

  // Element drawing (screen space).
  const top = sy(halfY * 0.82);
  const bot = sy(-halfY * 0.82);
  const cx0 = sx(0);
  let element: React.ReactNode;
  if (isMirror) {
    const sag = mode === "concave-mirror" ? -8 : mode === "convex-mirror" ? 8 : 0;
    const hatch: React.ReactNode[] = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const yy = top + (bot - top) * t;
      const k = (2 * t - 1) ** 2;
      const xx = cx0 + sag * k;
      hatch.push(<line key={i} x1={xx} y1={yy} x2={xx + 7} y2={yy - 7} className="stroke-muted-foreground" strokeWidth={1} />);
    }
    element = (
      <g>
        <path d={`M ${cx0 + sag} ${top} Q ${cx0 - sag} ${(top + bot) / 2} ${cx0 + sag} ${bot}`} fill="none" className="stroke-foreground" strokeWidth={2.5} />
        {hatch}
      </g>
    );
  } else if (mode === "convex-lens") {
    element = (
      <path
        d={`M ${cx0} ${top} Q ${cx0 + 16} ${(top + bot) / 2} ${cx0} ${bot} Q ${cx0 - 16} ${(top + bot) / 2} ${cx0} ${top} Z`}
        className="fill-callout-info/15 stroke-callout-info"
        strokeWidth={1.5}
      />
    );
  } else {
    element = (
      <path
        d={`M ${cx0 - 9} ${top} L ${cx0 + 9} ${top} Q ${cx0 + 1} ${(top + bot) / 2} ${cx0 + 9} ${bot} L ${cx0 - 9} ${bot} Q ${cx0 - 1} ${(top + bot) / 2} ${cx0 - 9} ${top} Z`}
        className="fill-callout-info/15 stroke-callout-info"
        strokeWidth={1.5}
      />
    );
  }

  // Focal and centre-of-curvature marks.
  const marks: { x: number; label: string }[] = [];
  if (Number.isFinite(f)) {
    if (isMirror) {
      marks.push({ x: f, label: "F" }, { x: 2 * f, label: "C" });
    } else {
      marks.push({ x: F, label: mode === "convex-lens" ? "F₂" : "F₁" }, { x: -F, label: mode === "convex-lens" ? "F₁" : "F₂" });
      marks.push({ x: 2 * F, label: "2F" }, { x: -2 * F, label: "2F" });
    }
  }

  const objX = sx(u);
  const objTop = sy(h);
  const axisY = sy(0);

  const arrowShape = (x: number, y0: number, y1: number, cls: string, fillCls: string, dashed: boolean, key: string) => {
    const dir = y1 < y0 ? 1 : -1;
    return (
      <g key={key}>
        <line x1={x} y1={y0} x2={x} y2={y1 + dir * 5} className={cls} strokeWidth={2.5} strokeDasharray={dashed ? "5 3" : undefined} />
        <polygon points={`${x},${y1} ${x - 5},${y1 + dir * 9} ${x + 5},${y1 + dir * 9}`} className={fillCls} />
      </g>
    );
  };

  const vText = atInfinity ? "\\infty" : `${fmt(v, 1)}\\text{ cm}`;
  const mText = atInfinity ? "\\infty" : fmt(m, 2);
  const nature = (() => {
    if (atInfinity) return "Image at infinity: the rays leave parallel.";
    const size = Math.abs(Math.abs(m) - 1) < 0.005 ? "same size" : Math.abs(m) > 1 ? "magnified" : "diminished";
    return `${real ? "Real" : "Virtual"}, ${m < 0 ? "inverted" : "erect"}, ${size}.`;
  })();

  const formula = (() => {
    if (mode === "plane-mirror") return `v = -u = ${fmt(-u, 1)}\\text{ cm}`;
    const fx = fmt(f, 1);
    if (isMirror) {
      return `\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}:\\quad \\frac{1}{v} + \\frac{1}{${sub(u)}} = \\frac{1}{${f < 0 ? `(${fx})` : fx}} \\;\\Rightarrow\\; v = ${vText}`;
    }
    return `\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}:\\quad \\frac{1}{v} - \\frac{1}{${sub(u)}} = \\frac{1}{${f < 0 ? `(${fx})` : fx}} \\;\\Rightarrow\\; v = ${vText}`;
  })();

  const vOffBench = !atInfinity && Math.abs(v) > halfX;
  const hOff = !atInfinity && Math.abs(hImg) > halfY;

  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto w-full max-w-md select-none rounded-md border bg-background"
        role="group"
        aria-label={`${TITLES[mode]} ray diagram`}
        onPointerMove={(e) => {
          if (dragging) moveTo(e.clientX);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <line x1={0} y1={axisY} x2={W} y2={axisY} className="stroke-foreground/40" strokeWidth={1} strokeDasharray="6 4" />
        {marks.map((mk) =>
          Math.abs(mk.x) < halfX ? (
            <g key={`${mk.label}${mk.x}`}>
              <circle cx={sx(mk.x)} cy={axisY} r={2.5} className="fill-foreground" />
              <text x={sx(mk.x)} y={axisY + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                {mk.label}
              </text>
            </g>
          ) : null,
        )}
        <text x={cx0 + 4} y={axisY + 14} className="fill-muted-foreground text-[10px]">
          {isMirror ? "P" : "O"}
        </text>
        {element}

        {rays.map((ray) => {
          const yHit = h + ray.s * U;
          const s2 = outSlope(ray.s, yHit);
          const ex = endX;
          const ey = yHit + s2 * ex;
          const cls = RAY_CLASS[ray.kind];
          const ext =
            !atInfinity && !real
              ? { x: v, y: yHit + s2 * v }
              : null;
          return (
            <g key={ray.kind}>
              <line x1={objX} y1={objTop} x2={cx0} y2={syc(yHit)} className={cls} strokeWidth={1.6} />
              <MidArrow x1={objX} y1={objTop} x2={cx0} y2={syc(yHit)} className={RAY_FILL[ray.kind]} />
              <line x1={cx0} y1={syc(yHit)} x2={sx(ex)} y2={syc(ey)} className={cls} strokeWidth={1.6} />
              <MidArrow x1={cx0} y1={syc(yHit)} x2={sx(ex * 0.5)} y2={syc(yHit + s2 * ex * 0.5)} className={RAY_FILL[ray.kind]} />
              {ext && (
                <line x1={cx0} y1={syc(yHit)} x2={sx(ext.x)} y2={syc(ext.y)} className={cls} strokeWidth={1.2} strokeDasharray="4 3" opacity={0.7} />
              )}
            </g>
          );
        })}

        {!atInfinity && Math.abs(hImg) > 1e-6 &&
          arrowShape(sx(clamp(v, -halfX * 3, halfX * 3)), axisY, syc(hImg), "stroke-callout-tip", "fill-callout-tip", !real, "img")}
        {arrowShape(objX, axisY, objTop, "stroke-primary", "fill-primary", false, "obj")}

        <g
          tabIndex={0}
          role="slider"
          aria-label="Object position"
          aria-valuenow={U}
          aria-valuemin={config.objectDistance.min}
          aria-valuemax={config.objectDistance.max}
          className={`group outline-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            e.preventDefault();
            svgRef.current?.setPointerCapture(e.pointerId);
            setDragging(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setU(snapTo(U + config.objectDistance.step, config.objectDistance));
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              setU(snapTo(U - config.objectDistance.step, config.objectDistance));
            }
          }}
        >
          <circle cx={objX} cy={objTop} r={16} fill="transparent" />
          <circle cx={objX} cy={objTop} r={11} fill="none" className="stroke-transparent group-focus-visible:stroke-foreground" strokeWidth={1.5} />
          <circle cx={objX} cy={objTop} r={6} className="fill-primary stroke-primary opacity-90" />
        </g>
      </svg>

      <Slider label="\lvert u\rvert" range={config.objectDistance} value={U} onChange={setU} unit="cm" />
      {mode !== "plane-mirror" && <Slider label="\lvert f\rvert" range={config.focalLength} value={F} onChange={setF} unit="cm" />}

      <Readouts>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <Latex latex={`u = ${fmt(u, 1)}\\text{ cm}`} />
          <Latex latex={`v = ${atInfinity ? "\\infty" : `${fmt(v, 1)}\\text{ cm}`}`} />
          <Latex latex={`f = ${Number.isFinite(f) ? `${fmt(f, 1)}\\text{ cm}` : "\\infty"}`} />
          <Latex latex={`m = ${isMirror ? "-\\tfrac{v}{u}" : "\\tfrac{v}{u}"} = ${mText}`} />
        </div>
        {config.showFormula && (
          <div className="overflow-x-auto">
            <Latex latex={formula} />
          </div>
        )}
        <p className="font-medium">{nature}</p>
        {(vOffBench || hOff) && (
          <p className="text-xs text-muted-foreground">The image lies beyond the edge of the drawing; follow the rays or read v and m above.</p>
        )}
      </Readouts>
      <p className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">
        {config.rays.map((k) => (
          <span key={k} className="flex items-center gap-1">
            <svg width="16" height="6" aria-hidden>
              <line x1={0} y1={3} x2={16} y2={3} className={RAY_CLASS[k]} strokeWidth={2} />
            </svg>
            {k === "parallel" ? "parallel to axis" : k === "centre" ? (isMirror ? "to the pole" : "through the centre") : isMirror ? "through / towards F" : "through F, leaves parallel"}
          </span>
        ))}
      </p>
      <Footer
        caption={config.caption ?? CAPTIONS[mode]}
        onReset={() => {
          setU(config.objectDistance.initial);
          setF(config.focalLength.initial);
        }}
      />
    </>
  );
}

// ---------- Snell's law at a flat boundary ----------

function MediumBands({ H, surfaceY, n1, n2 }: { H: number; surfaceY: number; n1: number; n2: number }) {
  const op = (n: number) => clamp(0.04 + (n - 1) * 0.22, 0.04, 0.4);
  return (
    <>
      <rect x={0} y={0} width={W} height={surfaceY} className="fill-callout-info" opacity={op(n1)} />
      <rect x={0} y={surfaceY} width={W} height={H - surfaceY} className="fill-callout-info" opacity={op(n2)} />
      <line x1={0} y1={surfaceY} x2={W} y2={surfaceY} className="stroke-foreground/60" strokeWidth={1.5} />
      <text x={8} y={16} className="fill-muted-foreground text-[11px]">
        n₁ = {fmt(n1)}
      </text>
      <text x={8} y={H - 8} className="fill-muted-foreground text-[11px]">
        n₂ = {fmt(n2)}
      </text>
    </>
  );
}

function RefractionView({ config }: { config: Config }) {
  const [i, setI] = useState(config.incidence.initial);
  const [n1, setN1] = useState(config.n1.initial);
  const [n2, setN2] = useState(config.n2.initial);
  const H = 260;
  const ox = W / 2;
  const oy = H / 2;
  const L = 120;
  const ir = i * RAD;
  const sinR = (n1 * Math.sin(ir)) / n2;
  const tir = sinR > 1 + EPS;
  const r = tir ? null : Math.asin(Math.min(1, sinR)) / RAD;
  const critical = n1 > n2 ? Math.asin(n2 / n1) / RAD : null;

  const inX = ox - L * Math.sin(ir);
  const inY = oy - L * Math.cos(ir);
  const reflX = ox + L * Math.sin(ir);
  const reflY = oy - L * Math.cos(ir);

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Ray refracting at a boundary">
        <MediumBands H={H} surfaceY={oy} n1={n1} n2={n2} />
        <line x1={ox} y1={10} x2={ox} y2={H - 10} className="stroke-muted-foreground" strokeDasharray="4 4" strokeWidth={1} />
        <line x1={inX} y1={inY} x2={ox} y2={oy} className="stroke-callout-warning" strokeWidth={2.5} />
        <MidArrow x1={inX} y1={inY} x2={ox} y2={oy} className="fill-callout-warning" />
        <line x1={ox} y1={oy} x2={reflX} y2={reflY} className="stroke-callout-warning" strokeWidth={tir ? 2.5 : 1.2} opacity={tir ? 1 : 0.35} />
        <MidArrow x1={ox} y1={oy} x2={reflX} y2={reflY} className="fill-callout-warning" />
        {r !== null && (
          <>
            <line x1={ox} y1={oy} x2={ox + L * Math.sin(r * RAD)} y2={oy + L * Math.cos(r * RAD)} className="stroke-callout-warning" strokeWidth={2.5} />
            <MidArrow x1={ox} y1={oy} x2={ox + L * Math.sin(r * RAD)} y2={oy + L * Math.cos(r * RAD)} className="fill-callout-warning" />
            {r > 0.5 && <path d={arcPath(ox, oy, 34, 90 - r, 90)} fill="none" className="stroke-foreground/70" strokeWidth={1} />}
            <text x={ox + 14} y={oy + 52} className="fill-foreground text-[11px]">
              r
            </text>
          </>
        )}
        {i > 0.5 && <path d={arcPath(ox, oy, 30, -90 - i, -90)} fill="none" className="stroke-foreground/70" strokeWidth={1} />}
        <text x={ox - 18} y={oy - 40} className="fill-foreground text-[11px]">
          i
        </text>
        {tir && (
          <text x={W - 8} y={oy + 24} textAnchor="end" className="fill-callout-warning text-[11px] font-semibold">
            total internal reflection
          </text>
        )}
      </svg>

      <Slider label="i" range={config.incidence} value={i} onChange={setI} unit="°" />
      <Slider label="n_1" range={config.n1} value={n1} onChange={setN1} />
      <Slider label="n_2" range={config.n2} value={n2} onChange={setN2} />

      <Readouts>
        <div className="overflow-x-auto">
          <Latex
            latex={
              tir
                ? `\\sin r = \\frac{n_1 \\sin i}{n_2} = \\frac{${fmt(n1)} \\times ${fmt(Math.sin(ir), 3)}}{${fmt(n2)}} = ${fmt(sinR, 3)} > 1`
                : `n_1 \\sin i = n_2 \\sin r:\\quad ${fmt(n1)} \\sin ${fmt(i, 1)}^\\circ = ${fmt(n2)} \\sin r \\;\\Rightarrow\\; r = ${fmt(r ?? 0, 1)}^\\circ`
            }
          />
        </div>
        {critical !== null ? (
          <Latex latex={`\\text{critical angle } \\theta_c = \\sin^{-1}\\frac{n_2}{n_1} = ${fmt(critical, 1)}^\\circ`} />
        ) : (
          <p className="text-muted-foreground">Rarer to denser (or equal): there is no critical angle, some light always gets through.</p>
        )}
        <p className="font-medium">
          {tir
            ? "No refracted ray: i exceeds the critical angle, so all the light is reflected."
            : r !== null && Math.abs(r - i) < 0.05
              ? "No bending."
              : r !== null && r < i
                ? `Bends towards the normal; deviation ${fmt(i - (r ?? 0), 1)}°.`
                : `Bends away from the normal; deviation ${fmt((r ?? 0) - i, 1)}°.`}
        </p>
      </Readouts>
      <Footer
        caption={config.caption ?? CAPTIONS.refraction}
        onReset={() => {
          setI(config.incidence.initial);
          setN1(config.n1.initial);
          setN2(config.n2.initial);
        }}
      />
    </>
  );
}

// ---------- apparent depth ----------

function ApparentDepthView({ config }: { config: Config }) {
  const [d, setD] = useState(config.depth.initial);
  const [theta, setTheta] = useState(config.viewAngle.initial);
  const [n1, setN1] = useState(config.n1.initial);
  const [n2, setN2] = useState(config.n2.initial);
  const H = 260;
  const surfaceY = 60;
  const scale = (H - surfaceY - 24) / Math.max(config.depth.max, 1);
  const ox = W / 2;
  const objY = surfaceY + d * scale;

  const th = theta * RAD;
  const sinA = (n1 * Math.sin(th)) / n2;
  const noRay = sinA > 1 - EPS;
  const alpha = noRay ? 0 : Math.asin(sinA);
  // Back-extension of the emergent ray meets the vertical through the object at depth d'.
  const dApp = noRay ? 0 : d * (n1 / n2) * (Math.cos(th) / Math.cos(alpha));
  const dPar = (d * n1) / n2;
  const hitDx = d * Math.tan(alpha) * scale;
  const eyeLen = 70;
  const appY = surfaceY + dApp * scale;

  const rays = noRay
    ? []
    : [1, -1].map((side) => {
        const hx = ox + side * hitDx;
        return {
          side,
          hx,
          ex: hx + side * eyeLen * Math.sin(th),
          ey: surfaceY - eyeLen * Math.cos(th),
        };
      });

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Apparent depth ray diagram">
        <MediumBands H={H} surfaceY={surfaceY} n1={n1} n2={n2} />
        <line x1={ox} y1={10} x2={ox} y2={H - 6} className="stroke-muted-foreground" strokeDasharray="3 4" strokeWidth={1} />
        {rays.map((ray) => (
          <g key={ray.side} opacity={ray.side === 1 ? 1 : 0.45}>
            <line x1={ox} y1={objY} x2={ray.hx} y2={surfaceY} className="stroke-callout-warning" strokeWidth={2} />
            <MidArrow x1={ox} y1={objY} x2={ray.hx} y2={surfaceY} className="fill-callout-warning" />
            <line x1={ray.hx} y1={surfaceY} x2={ray.ex} y2={ray.ey} className="stroke-callout-warning" strokeWidth={2} />
            <line x1={ray.hx} y1={surfaceY} x2={ox} y2={appY} className="stroke-callout-warning" strokeWidth={1.2} strokeDasharray="4 3" />
          </g>
        ))}
        {rays[0] && (
          <text x={rays[0].ex + 4} y={rays[0].ey} className="fill-muted-foreground text-[10px]">
            eye
          </text>
        )}
        <circle cx={ox} cy={objY} r={5} className="fill-primary" />
        <text x={ox - 10} y={objY + 4} textAnchor="end" className="fill-foreground text-[10px]">
          object
        </text>
        {!noRay && (
          <>
            <circle cx={ox} cy={appY} r={4} className="fill-callout-tip" opacity={0.85} />
            <text x={ox - 10} y={appY + 4} textAnchor="end" className="fill-callout-tip text-[10px]">
              image
            </text>
          </>
        )}
        <line x1={ox + 40} y1={surfaceY + dPar * scale} x2={ox + 56} y2={surfaceY + dPar * scale} className="stroke-muted-foreground" strokeWidth={1.5} />
        <text x={ox + 60} y={surfaceY + dPar * scale + 3} className="fill-muted-foreground text-[9px]">
          d·n₁/n₂
        </text>
      </svg>

      <Slider label="d" range={config.depth} value={d} onChange={setD} unit="cm" />
      <Slider label="\theta" range={config.viewAngle} value={theta} onChange={setTheta} unit="°" />
      <Slider label="n_1" range={config.n1} value={n1} onChange={setN1} />
      <Slider label="n_2" range={config.n2} value={n2} onChange={setN2} />

      <Readouts>
        {noRay ? (
          <p className="font-medium">No ray from the object can leave at this angle (it would need sin α &gt; 1).</p>
        ) : (
          <>
            <Latex latex={`\\text{near-normal: } d' = d\\,\\frac{n_1}{n_2} = ${fmt(d, 1)} \\times \\frac{${fmt(n1)}}{${fmt(n2)}} = ${fmt(dPar, 2)}\\text{ cm}`} />
            <Latex latex={`\\text{at } \\theta = ${fmt(theta, 0)}^\\circ:\\; d' = ${fmt(dApp, 2)}\\text{ cm}, \\quad \\text{shift } d - d' = ${fmt(d - dApp, 2)}\\text{ cm}`} />
          </>
        )}
      </Readouts>
      <Footer
        caption={config.caption ?? CAPTIONS["apparent-depth"]}
        onReset={() => {
          setD(config.depth.initial);
          setTheta(config.viewAngle.initial);
          setN1(config.n1.initial);
          setN2(config.n2.initial);
        }}
      />
    </>
  );
}

// ---------- prism ----------

type PrismTrace = { r1: number; r2: number; e: number | null; delta: number | null };

/** Angles in degrees. e and delta are null when the ray is totally reflected at the second face. */
function tracePrism(i: number, A: number, n: number): PrismTrace {
  const r1 = Math.asin(Math.sin(i * RAD) / n) / RAD;
  const r2 = A - r1;
  const s = n * Math.sin(r2 * RAD);
  if (Math.abs(s) > 1) return { r1, r2, e: null, delta: null };
  const e = Math.asin(s) / RAD;
  return { r1, r2, e, delta: i + e - A };
}

function PrismView({ config }: { config: Config }) {
  const [A, setA] = useState(config.apexAngle.initial);
  const [n, setN] = useState(config.prismIndex.initial);
  const [i, setI] = useState(config.prismIncidence.initial);
  const H = 250;
  const baseY = 220;
  const t = 180;
  const b = t * Math.tan((A / 2) * RAD);
  const X = (x: number) => W / 2 + x;
  const Y = (y: number) => baseY - y;
  const apex = { x: 0, y: t };
  const bl = { x: -b, y: 0 };
  const br = { x: b, y: 0 };
  const frac = 0.5;
  const p1 = { x: bl.x + frac * (apex.x - bl.x), y: bl.y + frac * (apex.y - bl.y) };

  const tr = tracePrism(i, A, n);
  const dirIn = { x: Math.cos((-A / 2 + i) * RAD), y: Math.sin((-A / 2 + i) * RAD) };
  const dirMid = { x: Math.cos((-A / 2 + tr.r1) * RAD), y: Math.sin((-A / 2 + tr.r1) * RAD) };
  // Intersect p1 + λ dirMid with the right face apex + s (br - apex).
  const fx = br.x - apex.x;
  const fy = br.y - apex.y;
  const den = dirMid.x * fy - dirMid.y * fx;
  let p2: { x: number; y: number } | null = null;
  let hitsBase = false;
  if (Math.abs(den) > EPS) {
    const qx = apex.x - p1.x;
    const qy = apex.y - p1.y;
    const lam = (qx * fy - qy * fx) / den;
    const s = (qx * dirMid.y - qy * dirMid.x) / den;
    if (lam > 0 && s >= 0 && s <= 1) p2 = { x: p1.x + lam * dirMid.x, y: p1.y + lam * dirMid.y };
  }
  if (!p2) {
    hitsBase = true;
    const lam = dirMid.y < -EPS ? -p1.y / dirMid.y : 0;
    p2 = { x: p1.x + lam * dirMid.x, y: p1.y + lam * dirMid.y };
  }
  const emerges = !hitsBase && tr.e !== null;
  const dirOut = tr.e !== null ? { x: Math.cos((A / 2 - tr.e) * RAD), y: Math.sin((A / 2 - tr.e) * RAD) } : null;
  const Lin = 130;
  const Lout = 140;

  const canEmerge = n * Math.sin((A / 2) * RAD) <= 1;
  const iMin = canEmerge ? Math.asin(n * Math.sin((A / 2) * RAD)) / RAD : null;
  const dMin = iMin !== null ? 2 * iMin - A : null;

  // δ-vs-i curve.
  const GW = 400;
  const GH = 170;
  const pad = { l: 34, r: 10, t: 10, b: 26 };
  const samples: { i: number; d: number }[] = [];
  for (let k = 0; k <= 178; k++) {
    const ii = k * 0.5;
    const tt = tracePrism(ii, A, n);
    if (tt.delta !== null) samples.push({ i: ii, d: tt.delta });
  }
  const dMax = samples.length ? Math.max(...samples.map((p) => p.d)) : 1;
  const yTop = Math.max(10, Math.ceil(dMax / 10) * 10);
  const gx = (ii: number) => pad.l + (ii / 90) * (GW - pad.l - pad.r);
  const gy = (dd: number) => GH - pad.b - (clamp(dd, 0, yTop) / yTop) * (GH - pad.t - pad.b);
  const curve = samples.map((p, k) => `${k === 0 ? "M" : "L"} ${gx(p.i).toFixed(2)} ${gy(p.d).toFixed(2)}`).join(" ");

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Ray through a prism">
        <polygon points={`${X(apex.x)},${Y(apex.y)} ${X(bl.x)},${Y(bl.y)} ${X(br.x)},${Y(br.y)}`} className="fill-callout-info/20 stroke-callout-info" strokeWidth={1.5} />
        <text x={X(0)} y={Y(t) + 26} textAnchor="middle" className="fill-foreground text-[10px]">
          A
        </text>
        {/* incident ray and its undeviated continuation */}
        <line x1={X(p1.x - Lin * dirIn.x)} y1={Y(p1.y - Lin * dirIn.y)} x2={X(p1.x)} y2={Y(p1.y)} className="stroke-callout-warning" strokeWidth={2.2} />
        <MidArrow x1={X(p1.x - Lin * dirIn.x)} y1={Y(p1.y - Lin * dirIn.y)} x2={X(p1.x)} y2={Y(p1.y)} className="fill-callout-warning" />
        <line x1={X(p1.x)} y1={Y(p1.y)} x2={X(p1.x + 260 * dirIn.x)} y2={Y(p1.y + 260 * dirIn.y)} className="stroke-muted-foreground" strokeWidth={1} strokeDasharray="4 4" />
        {/* normals */}
        {[
          { p: p1, ang: -A / 2 },
          ...(!hitsBase ? [{ p: p2, ang: A / 2 }] : []),
        ].map(({ p, ang }, k) => (
          <line
            key={k}
            x1={X(p.x - 30 * Math.cos(ang * RAD))}
            y1={Y(p.y - 30 * Math.sin(ang * RAD))}
            x2={X(p.x + 30 * Math.cos(ang * RAD))}
            y2={Y(p.y + 30 * Math.sin(ang * RAD))}
            className="stroke-muted-foreground"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ))}
        <line x1={X(p1.x)} y1={Y(p1.y)} x2={X(p2.x)} y2={Y(p2.y)} className="stroke-callout-warning" strokeWidth={2.2} />
        {emerges && dirOut && (
          <>
            <line x1={X(p2.x)} y1={Y(p2.y)} x2={X(p2.x + Lout * dirOut.x)} y2={Y(p2.y + Lout * dirOut.y)} className="stroke-callout-warning" strokeWidth={2.2} />
            <MidArrow x1={X(p2.x)} y1={Y(p2.y)} x2={X(p2.x + Lout * dirOut.x)} y2={Y(p2.y + Lout * dirOut.y)} className="fill-callout-warning" />
          </>
        )}
      </svg>

      {config.showDeviationGraph && (
        <svg viewBox={`0 0 ${GW} ${GH}`} className="mx-auto w-full max-w-md rounded-md border bg-background" role="img" aria-label="Deviation against angle of incidence">
          <line x1={pad.l} y1={GH - pad.b} x2={GW - pad.r} y2={GH - pad.b} className="stroke-foreground/40" />
          <line x1={pad.l} y1={pad.t} x2={pad.l} y2={GH - pad.b} className="stroke-foreground/40" />
          {[0, 30, 60, 90].map((v) => (
            <text key={v} x={gx(v)} y={GH - pad.b + 12} textAnchor="middle" className="fill-muted-foreground text-[9px]">
              {v}°
            </text>
          ))}
          {[0, yTop / 2, yTop].map((v) => (
            <text key={v} x={pad.l - 4} y={gy(v) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
              {fmt(v, 0)}°
            </text>
          ))}
          <text x={GW - pad.r} y={GH - 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
            i
          </text>
          <text x={4} y={pad.t + 8} className="fill-muted-foreground text-[9px]">
            δ
          </text>
          {curve && <path d={curve} fill="none" className="stroke-plot" strokeWidth={2} />}
          {dMin !== null && (
            <>
              <line x1={pad.l} y1={gy(dMin)} x2={GW - pad.r} y2={gy(dMin)} className="stroke-muted-foreground" strokeDasharray="4 3" />
              <text x={GW - pad.r - 2} y={gy(dMin) - 4} textAnchor="end" className="fill-muted-foreground text-[9px]">
                δ_min = {fmt(dMin, 1)}°
              </text>
            </>
          )}
          {tr.delta !== null && <circle cx={gx(i)} cy={gy(tr.delta)} r={4.5} className="fill-primary" />}
          {!samples.length && (
            <text x={GW / 2} y={GH / 2} textAnchor="middle" className="fill-muted-foreground text-[11px]">
              No angle of incidence lets the ray out.
            </text>
          )}
        </svg>
      )}

      <Slider label="i" range={config.prismIncidence} value={i} onChange={setI} unit="°" />
      <Slider label="A" range={config.apexAngle} value={A} onChange={setA} unit="°" />
      <Slider label="n" range={config.prismIndex} value={n} onChange={setN} />

      <Readouts>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <Latex latex={`r_1 = ${fmt(tr.r1, 1)}^\\circ`} />
          <Latex latex={`r_2 = A - r_1 = ${fmt(tr.r2, 1)}^\\circ`} />
          {tr.e !== null && <Latex latex={`e = ${fmt(tr.e, 1)}^\\circ`} />}
          {tr.delta !== null && <Latex latex={`\\delta = i + e - A = ${fmt(tr.delta, 1)}^\\circ`} />}
        </div>
        {dMin !== null && iMin !== null ? (
          <Latex latex={`\\delta_{\\min} = 2\\sin^{-1}\\!\\left(n\\sin\\tfrac{A}{2}\\right) - A = ${fmt(dMin, 1)}^\\circ \\text{ at } i = e = ${fmt(iMin, 1)}^\\circ`} />
        ) : (
          <p className="text-muted-foreground">n sin(A/2) &gt; 1: the prism totally reflects every ray at the second face.</p>
        )}
        <p className="font-medium">
          {hitsBase
            ? "This ray reaches the base before the second face."
            : tr.e === null
              ? "Total internal reflection at the second face: no emergent ray."
              : iMin !== null && Math.abs(i - iMin) < 0.75
                ? "i ≈ e: minimum deviation. Inside, the ray runs parallel to the base."
                : `Emerges, deviated towards the base by ${fmt(tr.delta ?? 0, 1)}°.`}
        </p>
      </Readouts>
      <Footer
        caption={config.caption ?? CAPTIONS.prism}
        onReset={() => {
          setA(config.apexAngle.initial);
          setN(config.prismIndex.initial);
          setI(config.prismIncidence.initial);
        }}
      />
    </>
  );
}
