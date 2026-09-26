"use client";

import { useMemo, useRef, useState } from "react";
import type { z } from "zod";
import type { probSimulatorSchema } from "../../schemas/blocks";
import { InteractiveFrame, Latex } from "./ui";

type Config = z.infer<typeof probSimulatorSchema>;
type EventDef = Config["events"][number];
type Combine = Config["combine"];
type Track = NonNullable<Config["track"]>;

/** Trials kept in memory; the batch buttons stop here. */
const MAX_TRIALS = 50000;
const FACES = [1, 2, 3, 4, 5, 6];

// ---------- randomness ----------

function mulberry32(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted(weights: number[], u: number) {
  let acc = 0;
  for (let i = 0; i < weights.length; i++) {
    acc += weights[i];
    if (u < acc) return i;
  }
  return weights.length - 1;
}

// ---------- maths helpers ----------

function binom(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let v = 1;
  for (let k = 1; k <= Math.min(r, n - r); k++) v = (v * (n - k + 1)) / k;
  return Math.round(v);
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function frac(num: number, den: number) {
  if (den === 0) return "\\text{undefined}";
  const g = gcd(num, den) || 1;
  const n = num / g;
  const d = den / g;
  if (d === 1) return `${n}`;
  return `\\tfrac{${n}}{${d}}`;
}

function fmt(v: number, digits = 3) {
  if (!Number.isFinite(v)) return "-";
  return Number(v.toFixed(digits)).toString();
}

// ---------- two-dice events ----------

const cellIndex = (d1: number, d2: number) => (d1 - 1) * 6 + (d2 - 1);
const cellDice = (c: number): [number, number] => [Math.floor(c / 6) + 1, (c % 6) + 1];

function eventCells(e: EventDef): boolean[] {
  const inE = new Array<boolean>(36).fill(false);
  const v = e.value ?? 0;
  for (let c = 0; c < 36; c++) {
    const [a, b] = cellDice(c);
    const s = a + b;
    switch (e.preset) {
      case "sum-eq":
        inE[c] = s === v;
        break;
      case "sum-ge":
        inE[c] = s >= v;
        break;
      case "sum-le":
        inE[c] = s <= v;
        break;
      case "doubles":
        inE[c] = a === b;
        break;
      case "first-even":
        inE[c] = a % 2 === 0;
        break;
      case "first-eq":
        inE[c] = a === v;
        break;
      case "second-eq":
        inE[c] = b === v;
        break;
      case "max-eq":
        inE[c] = Math.max(a, b) === v;
        break;
      case "custom":
        break;
    }
  }
  if (e.preset === "custom") for (const [a, b] of e.cells ?? []) inE[cellIndex(a, b)] = true;
  return inE;
}

const COMBINE_LABEL: Record<Combine, string> = {
  none: "A, B",
  union: "A ∪ B",
  intersection: "A ∩ B",
  complementA: "A′",
  AnotB: "A − B",
};

function combineLatex(c: Combine, a: string, b: string) {
  switch (c) {
    case "none":
      return a;
    case "union":
      return `${a} \\cup ${b}`;
    case "intersection":
      return `${a} \\cap ${b}`;
    case "complementA":
      return `${a}'`;
    case "AnotB":
      return `${a} - ${b}`;
  }
}

function region(c: Combine, inA: boolean, inB: boolean) {
  switch (c) {
    case "none":
      return inA;
    case "union":
      return inA || inB;
    case "intersection":
      return inA && inB;
    case "complementA":
      return !inA;
    case "AnotB":
      return inA && !inB;
  }
}

// ---------- urn colours ----------

const URN_FILLS = ["fill-chart-1", "fill-chart-2", "fill-chart-5", "fill-chart-4", "fill-chart-3"];
const URN_TEXT = ["text-chart-1", "text-chart-2", "text-chart-5", "text-chart-4", "text-chart-3"];
const NAMED: [RegExp, number][] = [
  [/red|pink/i, 0],
  [/blue/i, 1],
  [/green/i, 2],
  [/yellow|orange|amber|gold/i, 3],
  [/purple|violet/i, 4],
];

function urnPalette(labels: string[]) {
  const used = new Set<number>();
  const out: number[] = [];
  for (const l of labels) {
    const hit = NAMED.find(([re, i]) => re.test(l) && !used.has(i));
    const idx = hit ? hit[1] : [0, 1, 2, 3, 4].find((i) => !used.has(i)) ?? 0;
    used.add(idx);
    out.push(idx);
  }
  return out;
}

// ---------- charts ----------

type Series = { label: string; stroke: string; points: [number, number][] };

/** Trial counts at which the running chart is sampled (dense early, logarithmic later). */
function sampleAt(n: number): number[] {
  const out: number[] = [];
  let k = 1;
  while (k <= n) {
    out.push(k);
    k = k < 100 ? k + 1 : Math.ceil(k * 1.03);
  }
  if (out[out.length - 1] !== n && n > 0) out.push(n);
  return out;
}

const CW = 400;
const CH = 170;
const PADL = 36;
const PADR = 10;
const PADT = 10;
const PADB = 26;

function RunningChart({
  series,
  nMax,
  yMin,
  yMax,
  refs,
  yLabel,
}: {
  series: Series[];
  nMax: number;
  yMin: number;
  yMax: number;
  refs: { value: number; label: string; stroke: string }[];
  yLabel: string;
}) {
  const top = Math.max(10, nMax);
  const lx = (n: number) => PADL + (Math.log10(Math.max(1, n)) / Math.log10(top)) * (CW - PADL - PADR);
  const ly = (v: number) => PADT + (1 - (v - yMin) / (yMax - yMin)) * (CH - PADT - PADB);
  const ticks: number[] = [];
  for (let t = 1; t <= top; t *= 10) ticks.push(t);
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => yMin + f * (yMax - yMin));
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full rounded-md border bg-background" role="img" aria-label={`Running ${yLabel} against number of trials`}>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={PADL} x2={CW - PADR} y1={ly(v)} y2={ly(v)} className="stroke-foreground/10" />
          <text x={PADL - 4} y={ly(v) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
            {fmt(v, 2)}
          </text>
        </g>
      ))}
      {ticks.map((t) => (
        <text key={t} x={lx(t)} y={CH - PADB + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
          {t >= 1000 ? `${t / 1000}k` : t}
        </text>
      ))}
      <text x={(PADL + CW - PADR) / 2} y={CH - 3} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        number of trials (log scale)
      </text>
      {refs.map((r) => (
        <g key={r.label}>
          <line x1={PADL} x2={CW - PADR} y1={ly(r.value)} y2={ly(r.value)} className={r.stroke} strokeDasharray="5 4" strokeWidth={1.2} />
          <text x={CW - PADR - 2} y={ly(r.value) - 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
            {r.label}
          </text>
        </g>
      ))}
      {series.map((s) =>
        s.points.length > 0 ? (
          <polyline
            key={s.label}
            fill="none"
            className={s.stroke}
            strokeWidth={1.8}
            strokeLinejoin="round"
            points={s.points.map(([n, v]) => `${lx(n).toFixed(1)},${ly(Math.min(yMax, Math.max(yMin, v))).toFixed(1)}`).join(" ")}
          />
        ) : null,
      )}
      {series.every((s) => s.points.length === 0) && (
        <text x={(PADL + CW - PADR) / 2} y={CH / 2} textAnchor="middle" className="fill-muted-foreground text-[11px]">
          Run some trials to start the chart
        </text>
      )}
    </svg>
  );
}

function FreqBars({
  labels,
  observed,
  theoretical,
  showTheoretical,
}: {
  labels: string[];
  observed: number[];
  theoretical: number[];
  showTheoretical: boolean;
}) {
  const yMax = Math.max(0.05, ...observed, ...(showTheoretical ? theoretical : [])) * 1.15;
  const slot = (CW - PADL - PADR) / labels.length;
  const ly = (v: number) => PADT + (1 - v / yMax) * (CH - PADT - PADB);
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full rounded-md border bg-background" role="img" aria-label="Observed relative frequencies against the theoretical probabilities">
      <line x1={PADL} x2={CW - PADR} y1={ly(0)} y2={ly(0)} className="stroke-foreground/30" />
      {[0, yMax / 2 / 1.15, yMax / 1.15].map((v) => (
        <text key={v} x={PADL - 4} y={ly(v) + 3} textAnchor="end" className="fill-muted-foreground text-[9px] tabular-nums">
          {fmt(v, 2)}
        </text>
      ))}
      {labels.map((l, i) => {
        const x = PADL + i * slot;
        const bw = slot * 0.62;
        return (
          <g key={l}>
            <rect x={x + (slot - bw) / 2} y={ly(observed[i])} width={bw} height={Math.max(0, ly(0) - ly(observed[i]))} className="fill-plot/70" />
            {showTheoretical && (
              <line x1={x + slot * 0.1} x2={x + slot * 0.9} y1={ly(theoretical[i])} y2={ly(theoretical[i])} className="stroke-callout-warning" strokeWidth={2} />
            )}
            <text x={x + slot / 2} y={CH - PADB + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] tabular-nums">
              {l}
            </text>
          </g>
        );
      })}
      <text x={(PADL + CW - PADR) / 2} y={CH - 3} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        bars: observed frequency{showTheoretical ? " · orange ticks: theoretical probability" : ""}
      </text>
    </svg>
  );
}

// ---------- component ----------

const DEFAULT_CAPTIONS: Record<Config["mode"], string> = {
  coin: "One flip is unpredictable; the proportion of heads over many flips is not. Early wobbles are large, and they shrink as the count grows.",
  die: "Each roll is a surprise, but the long-run pattern settles down.",
  "two-dice": "The 36 cells are the sample space. An event is a set of cells, and its probability is the share of the space it covers.",
  urn: "Without replacement the urn changes after every draw, so later draws depend on earlier ones.",
  "monty-hall": "The host always opens a goat door you did not pick. Play a few rounds, then run a thousand.",
};

type MontyGame = { car: number; pick: number | null; keep: number | null; final: number | null };

export function ProbSimulator({ config }: { config: Config }) {
  const mode = config.mode;
  const rngRef = useRef<(() => number) | null>(null);
  const rand = () => {
    if (!rngRef.current) rngRef.current = mulberry32(config.seed ?? Math.floor(Math.random() * 2 ** 31));
    return rngRef.current();
  };

  const [history, setHistory] = useState<number[]>([]);
  const [combine, setCombine] = useState<Combine>(config.combine);
  const [replacement, setReplacement] = useState(config.urn?.replacement ?? false);
  const [lastDraw, setLastDraw] = useState<number[] | null>(null);
  const [doors, setDoors] = useState(config.montyDoors);
  const [game, setGame] = useState<MontyGame | null>(null);
  const [tally, setTally] = useState({ stickWin: 0, stickLose: 0, switchWin: 0, switchLose: 0 });

  // ----- weights -----
  const faceW = useMemo(() => {
    const w = config.dieWeights ?? [1, 1, 1, 1, 1, 1];
    const s = w.reduce((a, b) => a + b, 0) || 1;
    return w.map((x) => x / s);
  }, [config.dieWeights]);
  const fairDie = !config.dieWeights || config.dieWeights.every((w) => w === config.dieWeights![0]);

  const track: Track =
    config.track ??
    (mode === "coin"
      ? "heads"
      : mode === "die"
        ? "value-mean"
        : mode === "two-dice"
          ? config.events.some((e) => e.id === "A")
            ? "event-A"
            : "sum-distribution"
          : mode === "urn"
            ? "event-A"
            : "stick-vs-switch");

  // ----- two-dice sets -----
  const evA = config.events.find((e) => e.id === "A");
  const evB = config.events.find((e) => e.id === "B");
  const inA = useMemo(() => (evA ? eventCells(evA) : new Array<boolean>(36).fill(false)), [evA]);
  const inB = useMemo(() => (evB ? eventCells(evB) : new Array<boolean>(36).fill(false)), [evB]);
  const aL = evA?.latex ?? "A";
  const bL = evB?.latex ?? "B";
  const given = config.givenEvent;
  const inGiven = given === "A" ? inA : given === "B" ? inB : null;
  const target = useMemo(() => {
    const t = new Array<boolean>(36);
    for (let c = 0; c < 36; c++) {
      t[c] = given && combine === "none" ? (given === "B" ? inA[c] : inB[c]) : region(combine, inA[c], inB[c]);
    }
    return t;
  }, [combine, given, inA, inB]);
  const targetLatex = given && combine === "none" ? (given === "B" ? aL : bL) : combineLatex(combine, aL, bL);
  const givenLatex = given === "A" ? aL : bL;
  const cellP = (c: number) => {
    const [a, b] = cellDice(c);
    return faceW[a - 1] * faceW[b - 1];
  };

  // ----- urn -----
  const urn = config.urn;
  const urnIdx = urn ? urnPalette(urn.colors.map((c) => c.label)) : [];
  const urnBalls: number[] = [];
  urn?.colors.forEach((c, i) => {
    for (let k = 0; k < c.count; k++) urnBalls.push(i);
  });
  const trackColorIdx = urn ? urn.colors.findIndex((c) => c.label === urn.trackColor) : -1;
  const urnN = urnBalls.length;
  const urnK = urn ? urn.colors[trackColorIdx].count : 0;

  // ----- theoretical values -----
  const theory = ((): number | null => {
    if (config.theoretical !== undefined) return config.theoretical;
    switch (mode) {
      case "coin":
        return config.coinP;
      case "die":
        if (track === "value-mean") return FACES.reduce((s, f) => s + f * faceW[f - 1], 0);
        if (track === "event-A") return config.dieFaces.reduce((s, f) => s + faceW[f - 1], 0);
        return null;
      case "two-dice": {
        if (track === "value-mean") {
          let s = 0;
          for (let c = 0; c < 36; c++) s += (cellDice(c)[0] + cellDice(c)[1]) * cellP(c);
          return s;
        }
        if (track !== "event-A") return null;
        let pt = 0;
        let pg = 0;
        for (let c = 0; c < 36; c++) {
          const g = inGiven ? inGiven[c] : true;
          if (g) pg += cellP(c);
          if (g && target[c]) pt += cellP(c);
        }
        return pg > 0 ? pt / pg : null;
      }
      case "urn": {
        if (!urn) return null;
        const d = urn.draws;
        const k = urn.trackCount;
        if (replacement) {
          const p = urnK / urnN;
          return binom(d, k) * p ** k * (1 - p) ** (d - k);
        }
        return (binom(urnK, k) * binom(urnN - urnK, d - k)) / binom(urnN, d);
      }
      case "monty-hall":
        return (doors - 1) / doors;
    }
  })();

  // ----- running the experiment -----
  const trialOnce = (sink: { drawn: number[] | null }): number => {
    switch (mode) {
      case "coin":
        return rand() < config.coinP ? 1 : 0;
      case "die":
        return pickWeighted(faceW, rand()) + 1;
      case "two-dice":
        return cellIndex(pickWeighted(faceW, rand()) + 1, pickWeighted(faceW, rand()) + 1);
      case "urn": {
        const pool = [...urnBalls];
        const drawn: number[] = [];
        for (let i = 0; i < (urn?.draws ?? 0); i++) {
          const j = Math.floor(rand() * pool.length);
          drawn.push(pool[j]);
          if (!replacement) pool.splice(j, 1);
        }
        sink.drawn = drawn;
        return drawn.filter((x) => x === trackColorIdx).length;
      }
      case "monty-hall": {
        const car = Math.floor(rand() * doors);
        const pick = Math.floor(rand() * doors);
        return car === pick ? 1 : 0;
      }
    }
  };
  const run = (count: number) => {
    const room = MAX_TRIALS - history.length;
    const n = Math.min(count, room);
    if (n <= 0) return;
    const sink: { drawn: number[] | null } = { drawn: null };
    const fresh: number[] = [];
    for (let i = 0; i < n; i++) fresh.push(trialOnce(sink));
    setHistory((h) => [...h, ...fresh]);
    if (mode === "urn") setLastDraw(sink.drawn);
  };

  const reset = () => {
    setHistory([]);
    setLastDraw(null);
    setGame(null);
    setTally({ stickWin: 0, stickLose: 0, switchWin: 0, switchLose: 0 });
  };

  // ----- derived statistics -----
  const N = history.length;
  const last = N > 0 ? history[N - 1] : null;

  const chart = useMemo(() => {
    const pts = sampleAt(history.length);
    const series: Series[] = [];
    if (track === "sum-distribution") return { series, pts };
    if (track === "stick-vs-switch") {
      const stick: [number, number][] = [];
      const sw: [number, number][] = [];
      let wins = 0;
      let j = 0;
      for (let i = 0; i < history.length; i++) {
        wins += history[i];
        if (pts[j] === i + 1) {
          stick.push([i + 1, wins / (i + 1)]);
          sw.push([i + 1, 1 - wins / (i + 1)]);
          j++;
        }
      }
      series.push({ label: "switch", stroke: "stroke-plot", points: sw });
      series.push({ label: "stick", stroke: "stroke-plot-secondary", points: stick });
      return { series, pts };
    }
    const points: [number, number][] = [];
    let hits = 0;
    let base = 0;
    let j = 0;
    for (let i = 0; i < history.length; i++) {
      const o = history[i];
      if (track === "value-mean") {
        hits += mode === "die" ? o : cellDice(o)[0] + cellDice(o)[1];
        base++;
      } else if (mode === "coin") {
        hits += o;
        base++;
      } else if (mode === "die") {
        if (config.dieFaces.includes(o)) hits++;
        base++;
      } else if (mode === "urn") {
        if (o === urn?.trackCount) hits++;
        base++;
      } else {
        const g = inGiven ? inGiven[o] : true;
        if (g) {
          base++;
          if (target[o]) hits++;
        }
      }
      if (pts[j] === i + 1) {
        if (base > 0) points.push([i + 1, hits / base]);
        j++;
      }
    }
    series.push({ label: "observed", stroke: "stroke-plot", points });
    return { series, pts, hits, base };
  }, [history, track, mode, config.dieFaces, urn?.trackCount, inGiven, target]);

  // ----- mode-specific readouts -----
  const controls = (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {config.batchSizes.map((b) => (
        <button
          key={b}
          type="button"
          disabled={N >= MAX_TRIALS}
          onClick={() => run(b)}
          className="rounded-md border bg-background px-3 py-1 font-medium tabular-nums disabled:opacity-50"
        >
          {`${{ coin: "Flip", die: "Roll", "two-dice": "Roll", urn: "Draw", "monty-hall": "Play" }[mode]} ×${b.toLocaleString("en-US")}`}
        </button>
      ))}
      <button type="button" onClick={reset} className="rounded-md border bg-background px-3 py-1 text-xs">
        Reset
      </button>
      <span className="ml-auto text-xs tabular-nums text-muted-foreground" aria-live="polite">
        {N.toLocaleString("en-US")} {mode === "monty-hall" ? "games" : "trials"}
        {N >= MAX_TRIALS ? " (limit)" : ""}
      </span>
    </div>
  );

  let picture: React.ReactNode = null;
  const readout: React.ReactNode[] = [];

  if (mode === "coin") {
    const heads = history.reduce((s, x) => s + x, 0);
    const recent = history.slice(-30);
    let streak = 0;
    for (let i = N - 1; i >= 0 && history[i] === last; i--) streak++;
    // Gambler's fallacy check: what follows a run of 3+ heads?
    let afterRuns = 0;
    let afterRunsHeads = 0;
    let run3 = 0;
    for (let i = 0; i < N; i++) {
      if (run3 >= 3) {
        afterRuns++;
        afterRunsHeads += history[i];
      }
      run3 = history[i] === 1 ? run3 + 1 : 0;
    }
    picture = (
      <div className="flex items-center gap-3">
        <div
          className={`flex size-14 shrink-0 items-center justify-center rounded-full border-2 text-xl font-bold ${
            last === null ? "border-dashed text-muted-foreground" : last === 1 ? "border-callout-warning bg-callout-warning/20" : "border-plot bg-plot/15"
          }`}
          aria-label={last === null ? "No flip yet" : last === 1 ? "Heads" : "Tails"}
        >
          {last === null ? "?" : last === 1 ? "H" : "T"}
        </div>
        <div className="min-w-0 flex-1 font-mono text-sm leading-6 tracking-wider break-all" aria-label="Most recent flips">
          {recent.length === 0 ? <span className="text-muted-foreground">No flips yet</span> : recent.map((x, i) => (
            <span key={i} className={x === 1 ? "text-callout-warning" : "text-plot"}>
              {x === 1 ? "H" : "T"}
            </span>
          ))}
        </div>
      </div>
    );
    readout.push(
      <span key="h">
        Heads: <strong className="tabular-nums">{heads}</strong> of {N}
        {N > 0 && <> = <strong className="tabular-nums">{fmt(heads / N)}</strong></>}
        {config.showTheoretical && <span className="text-muted-foreground"> (theory {fmt(theory ?? 0.5)})</span>}
      </span>,
    );
    if (N > 0) readout.push(<span key="s" className="text-muted-foreground">Current streak: {streak} {last === 1 ? "head" : "tail"}{streak === 1 ? "" : "s"} in a row</span>);
    if (afterRuns >= 5)
      readout.push(
        <span key="g">
          After a run of 3+ heads, the next flip was heads{" "}
          <strong className="tabular-nums">
            {afterRunsHeads}/{afterRuns} = {fmt(afterRunsHeads / afterRuns)}
          </strong>
          <span className="text-muted-foreground">. The coin has no memory.</span>
        </span>,
      );
  }

  let bars: { labels: string[]; observed: number[]; theoretical: number[] } | null = null;

  if (mode === "die") {
    const counts = FACES.map((f) => history.filter((x) => x === f).length);
    picture = (
      <div className="flex items-center gap-3">
        <div
          className={`flex size-14 shrink-0 items-center justify-center rounded-lg border-2 text-2xl font-bold tabular-nums ${last === null ? "border-dashed text-muted-foreground" : "border-plot bg-plot/10"}`}
          aria-label={last === null ? "No roll yet" : `Rolled ${last}`}
        >
          {last ?? "?"}
        </div>
        <div className="min-w-0 flex-1 font-mono text-sm leading-6 tracking-wider break-all" aria-label="Most recent rolls">
          {N === 0 ? <span className="text-muted-foreground">No rolls yet</span> : history.slice(-30).join(" ")}
        </div>
      </div>
    );
    if (track === "sum-distribution") bars = { labels: FACES.map(String), observed: counts.map((c) => (N ? c / N : 0)), theoretical: faceW };
    if (track === "value-mean") {
      const mean = N ? history.reduce((s, x) => s + x, 0) / N : 0;
      readout.push(
        <span key="m">
          Running mean: <strong className="tabular-nums">{N ? fmt(mean) : "-"}</strong>
          {config.showTheoretical && theory !== null && (
            <span className="text-muted-foreground">
              {" "}
              · <Latex latex={`E[X] = ${fmt(theory)}`} />
              {fairDie && theory === 3.5 ? ", a value no single roll can show" : ""}
            </span>
          )}
        </span>,
      );
    }
    if (track === "event-A") {
      const hits = history.filter((x) => config.dieFaces.includes(x)).length;
      readout.push(
        <span key="e">
          Faces {config.dieFaces.join(", ")}: <strong className="tabular-nums">{hits}</strong> of {N}
          {N > 0 && <> = <strong className="tabular-nums">{fmt(hits / N)}</strong></>}
          {config.showTheoretical && theory !== null && <span className="text-muted-foreground"> (theory {fmt(theory)})</span>}
        </span>,
      );
    }
  }

  if (mode === "two-dice") {
    const G = 34;
    const OX = 30;
    const OY = 26;
    const size = OX + 6 * G + 6;
    const lastCell = last;
    const regionActive = combine !== "none" || !!given;
    const tone = (c: number) => {
      if (inGiven && !inGiven[c]) return "fill-muted/70";
      if (combine !== "none") return target[c] ? "fill-callout-warning/45" : "fill-background";
      if (given) return target[c] ? "fill-callout-warning/45" : "fill-background";
      if (inA[c] && inB[c]) return "fill-plot-secondary/35";
      if (inA[c]) return "fill-plot/25";
      if (inB[c]) return "fill-callout-info/15";
      return "fill-background";
    };
    const counts = new Array<number>(36).fill(0);
    for (const o of history) counts[o]++;
    picture = config.showGrid ? (
      <svg viewBox={`0 0 ${size} ${OY + 6 * G + 6}`} className="mx-auto w-full max-w-xs" role="img" aria-label="Sample space of two dice: 36 cells">
        <text x={OX + 3 * G} y={10} textAnchor="middle" className="fill-muted-foreground text-[9px]">
          die 1 →
        </text>
        <text x={8} y={OY + 3 * G} textAnchor="middle" className="fill-muted-foreground text-[9px]" transform={`rotate(-90 8 ${OY + 3 * G})`}>
          die 2 →
        </text>
        {FACES.map((f) => (
          <g key={f}>
            <text x={OX + (f - 0.5) * G} y={OY - 4} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {f}
            </text>
            <text x={OX - 6} y={OY + (f - 0.5) * G + 3} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
              {f}
            </text>
          </g>
        ))}
        {Array.from({ length: 36 }, (_, c) => {
          const [a, b] = cellDice(c);
          const x = OX + (a - 1) * G;
          const y = OY + (b - 1) * G;
          const dim = inGiven && !inGiven[c];
          return (
            <g key={c}>
              <title>{`(${a}, ${b}), sum ${a + b}${inA[c] ? `, in ${aL}` : ""}${inB[c] ? `, in ${bL}` : ""}`}</title>
              <rect x={x + 1} y={y + 1} width={G - 2} height={G - 2} rx={3} className={`${tone(c)} stroke-foreground/15`} />
              {!regionActive && inB[c] && (
                <rect x={x + 3.5} y={y + 3.5} width={G - 7} height={G - 7} rx={2} fill="none" className="stroke-callout-info" strokeWidth={1.6} />
              )}
              {regionActive && (inA[c] || inB[c]) && !dim && (
                <text x={x + G - 4} y={y + 10} textAnchor="end" className="fill-muted-foreground text-[7px] font-semibold">
                  {inA[c] && inB[c] ? "AB" : inA[c] ? "A" : "B"}
                </text>
              )}
              <text x={x + G / 2} y={y + G / 2 + 3} textAnchor="middle" className={`text-[9px] tabular-nums ${dim ? "fill-muted-foreground/50" : "fill-foreground"}`}>
                {`${a},${b}`}
              </text>
              {N > 0 && (
                <text x={x + G / 2} y={y + G - 4} textAnchor="middle" className="fill-muted-foreground text-[7px] tabular-nums">
                  {counts[c]}
                </text>
              )}
              {lastCell === c && <rect x={x + 1} y={y + 1} width={G - 2} height={G - 2} rx={3} fill="none" className="stroke-foreground" strokeWidth={2.2} />}
            </g>
          );
        })}
      </svg>
    ) : null;

    const sumLabels = Array.from({ length: 11 }, (_, i) => `${i + 2}`);
    if (track === "sum-distribution") {
      const obs = new Array<number>(11).fill(0);
      const th = new Array<number>(11).fill(0);
      for (const o of history) obs[cellDice(o)[0] + cellDice(o)[1] - 2]++;
      for (let c = 0; c < 36; c++) th[cellDice(c)[0] + cellDice(c)[1] - 2] += cellP(c);
      bars = { labels: sumLabels, observed: obs.map((x) => (N ? x / N : 0)), theoretical: th };
    }

    // exact probability readouts
    const count = (pred: (c: number) => boolean) => Array.from({ length: 36 }, (_, c) => c).filter(pred);
    const prob = (cells: number[]) => cells.reduce((s, c) => s + cellP(c), 0);
    const show = (cells: number[]) => (fairDie ? frac(cells.length, 36) : fmt(prob(cells), 4));
    const A = count((c) => inA[c]);
    const B = count((c) => inB[c]);
    const AB = count((c) => inA[c] && inB[c]);
    if (evA || evB) {
      readout.push(
        <span key="ev" className="flex flex-wrap gap-x-4 gap-y-1">
          {evA && (
            <span>
              <span className="mr-1 inline-block size-2.5 rounded-sm bg-plot/40 align-middle" />
              <Latex latex={aL} /> = {evA.label}: <Latex latex={`P(${aL}) = ${show(A)}`} />
            </span>
          )}
          {evB && (
            <span>
              <span className="mr-1 inline-block size-2.5 rounded-sm border-2 border-callout-info align-middle" />
              <Latex latex={bL} /> = {evB.label}: <Latex latex={`P(${bL}) = ${show(B)}`} />
            </span>
          )}
        </span>,
      );
    }
    if (given) {
      const G2 = count((c) => inGiven![c]);
      const TG = count((c) => inGiven![c] && target[c]);
      readout.push(
        <span key="given" className="overflow-x-auto">
          <Latex
            latex={`P(${targetLatex} \\mid ${givenLatex}) = \\frac{P(${targetLatex} \\cap ${givenLatex})}{P(${givenLatex})} = ${
              fairDie ? `\\frac{${TG.length}}{${G2.length}} = ${frac(TG.length, G2.length)}` : fmt(prob(TG) / prob(G2), 4)
            }`}
          />
        </span>,
      );
      readout.push(
        <span key="given2" className="text-xs text-muted-foreground">
          {`Only the ${G2.length} cells of `}
          <Latex latex={givenLatex} /> are left in play; the greyed cells can no longer happen.
        </span>,
      );
    } else if (combine !== "none") {
      const R = count((c) => target[c]);
      let why = "";
      if (fairDie) {
        if (combine === "union") why = ` = P(${aL}) + P(${bL}) - P(${aL}\\cap ${bL}) = \\tfrac{${A.length}}{36} + \\tfrac{${B.length}}{36} - \\tfrac{${AB.length}}{36}`;
        if (combine === "complementA") why = ` = 1 - P(${aL}) = 1 - \\tfrac{${A.length}}{36}`;
        if (combine === "AnotB") why = ` = P(${aL}) - P(${aL}\\cap ${bL}) = \\tfrac{${A.length}}{36} - \\tfrac{${AB.length}}{36}`;
      }
      readout.push(
        <span key="reg" className="overflow-x-auto">
          <Latex latex={`P(${targetLatex})${why} = ${show(R)}`} />
        </span>,
      );
    } else if (evA && evB) {
      readout.push(
        <span key="ab">
          <Latex latex={`P(${aL} \\cap ${bL}) = ${show(AB)}`} />
          {AB.length === 0 ? <span className="text-muted-foreground"> (no overlap: mutually exclusive)</span> : null}
        </span>,
      );
    }
    if (track === "event-A" && chart.base !== undefined) {
      readout.push(
        <span key="obs">
          Observed:{" "}
          {given ? (
            <>
              <Latex latex={givenLatex} /> happened {chart.base} times, and <Latex latex={targetLatex} /> also happened in {chart.hits} of those
            </>
          ) : (
            <>
              <Latex latex={targetLatex} /> happened {chart.hits} times in {N}
            </>
          )}
          {chart.base > 0 && (
            <>
              {" "}
              = <strong className="tabular-nums">{fmt((chart.hits ?? 0) / chart.base)}</strong>
            </>
          )}
          {config.showTheoretical && theory !== null && <span className="text-muted-foreground"> (theory {fmt(theory)})</span>}
        </span>,
      );
    }
    if (track === "value-mean") {
      const mean = N ? history.reduce((s, o) => s + cellDice(o)[0] + cellDice(o)[1], 0) / N : 0;
      readout.push(
        <span key="m">
          Running mean of the sum: <strong className="tabular-nums">{N ? fmt(mean) : "-"}</strong>
          {config.showTheoretical && theory !== null && <span className="text-muted-foreground"> (theory {fmt(theory)})</span>}
        </span>,
      );
    }
  }

  if (mode === "urn" && urn) {
    const R = 9;
    const perRow = Math.min(10, urnN);
    const rows = Math.ceil(urnN / perRow);
    const k = urn.trackCount;
    const d = urn.draws;
    const hits = chart.hits ?? 0;
    picture = (
      <div className="space-y-2">
        <svg viewBox={`0 0 ${perRow * 2 * (R + 3) + 12} ${rows * 2 * (R + 3) + 12}`} className="mx-auto w-full max-w-xs" role="img" aria-label={`Urn with ${urn.colors.map((c) => `${c.count} ${c.label}`).join(", ")}`}>
          <rect x={1} y={1} width={perRow * 2 * (R + 3) + 10} height={rows * 2 * (R + 3) + 10} rx={10} fill="none" className="stroke-foreground/30" />
          {urnBalls.map((ci, i) => (
            <circle
              key={i}
              cx={6 + (i % perRow) * 2 * (R + 3) + R + 3}
              cy={6 + Math.floor(i / perRow) * 2 * (R + 3) + R + 3}
              r={R}
              className={`${URN_FILLS[urnIdx[ci]]} stroke-foreground/30`}
            />
          ))}
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
          {urn.colors.map((c, i) => (
            <span key={c.label} className={URN_TEXT[urnIdx[i]]}>
              ● <span className="text-foreground">{c.count} {c.label}</span>
            </span>
          ))}
        </div>
        <p className="text-center text-sm" aria-live="polite">
          {lastDraw ? (
            <>
              Last draw:{" "}
              {lastDraw.map((ci, i) => (
                <span key={i} className={`${URN_TEXT[urnIdx[ci]]} font-semibold`}>
                  {urn.colors[ci].label}
                  {i < lastDraw.length - 1 ? ", " : ""}
                </span>
              ))}
            </>
          ) : (
            <span className="text-muted-foreground">Draw {d} ball{d === 1 ? "" : "s"} {replacement ? "with" : "without"} replacement</span>
          )}
        </p>
      </div>
    );
    readout.push(
      <span key="u">
        Exactly {k} {urn.trackColor} in {d} draws: <strong className="tabular-nums">{hits}</strong> of {N}
        {N > 0 && <> = <strong className="tabular-nums">{fmt(hits / N)}</strong></>}
      </span>,
    );
    if (config.showTheoretical && theory !== null) {
      readout.push(
        <span key="ut" className="overflow-x-auto">
          <Latex
            latex={
              replacement
                ? `\\binom{${d}}{${k}}\\left(\\tfrac{${urnK}}{${urnN}}\\right)^{${k}}\\left(\\tfrac{${urnN - urnK}}{${urnN}}\\right)^{${d - k}} = ${fmt(theory, 4)}`
                : `\\frac{\\binom{${urnK}}{${k}}\\binom{${urnN - urnK}}{${d - k}}}{\\binom{${urnN}}{${d}}} = \\frac{${binom(urnK, k) * binom(urnN - urnK, d - k)}}{${binom(urnN, d)}} = ${fmt(theory, 4)}`
            }
          />
        </span>,
      );
    }
  }

  if (mode === "monty-hall") {
    const g = game;
    const startGame = () => setGame({ car: Math.floor(rand() * doors), pick: null, keep: null, final: null });
    const choose = (door: number) => {
      if (!g || g.pick !== null) return;
      // Host keeps one other door shut: the car if you missed it, else a random goat door.
      let keep = g.car;
      if (door === g.car) {
        keep = Math.floor(rand() * (doors - 1));
        if (keep >= door) keep++;
      }
      setGame({ ...g, pick: door, keep });
    };
    const decide = (sw: boolean) => {
      if (!g || g.pick === null || g.keep === null || g.final !== null) return;
      const final = sw ? g.keep : g.pick;
      const win = final === g.car;
      setGame({ ...g, final });
      setTally((t) =>
        sw ? { ...t, switchWin: t.switchWin + (win ? 1 : 0), switchLose: t.switchLose + (win ? 0 : 1) } : { ...t, stickWin: t.stickWin + (win ? 1 : 0), stickLose: t.stickLose + (win ? 0 : 1) },
      );
    };
    const perRow = doors <= 10 ? doors : 10;
    const DW = doors <= 3 ? 90 : doors <= 10 ? 36 : 34;
    const DH = doors <= 3 ? 110 : doors <= 10 ? 60 : 24;
    const gap = doors <= 3 ? 16 : 4;
    const rowsN = Math.ceil(doors / perRow);
    const vw = perRow * (DW + gap) + gap;
    const vh = rowsN * (DH + gap) + gap;
    const opened = (i: number) => !!g && g.pick !== null && i !== g.pick && i !== g.keep;
    const revealAll = !!g && g.final !== null;
    picture = (
      <div className="space-y-2">
        <svg viewBox={`0 0 ${vw} ${vh}`} className={`mx-auto w-full ${doors <= 3 ? "max-w-sm" : ""}`} role="img" aria-label={`${doors} doors`}>
          {Array.from({ length: doors }, (_, i) => {
            const x = gap + (i % perRow) * (DW + gap);
            const y = gap + Math.floor(i / perRow) * (DH + gap);
            const open = opened(i) || revealAll;
            const isCar = !!g && i === g.car;
            const picked = !!g && i === g.pick;
            const final = !!g && i === g.final;
            const clickable = !!g && g.pick === null;
            return (
              <g
                key={i}
                onClick={() => choose(i)}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                aria-label={clickable ? `Pick door ${i + 1}` : undefined}
                onKeyDown={(e) => {
                  if (clickable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    choose(i);
                  }
                }}
                className={clickable ? "cursor-pointer" : ""}
              >
                <rect
                  x={x}
                  y={y}
                  width={DW}
                  height={DH}
                  rx={3}
                  className={
                    open
                      ? isCar
                        ? "fill-callout-tip/30 stroke-callout-tip"
                        : "fill-muted stroke-foreground/20"
                      : "fill-chart-1/15 stroke-chart-1/60"
                  }
                  strokeWidth={final ? 3 : picked ? 2.5 : 1}
                  strokeDasharray={picked && !final ? "4 2" : undefined}
                />
                <text x={x + DW / 2} y={y + DH / 2 + 4} textAnchor="middle" className={`${doors > 10 ? "text-[8px]" : "text-[11px]"} fill-foreground font-semibold`}>
                  {open ? (isCar ? "CAR" : doors > 10 ? "·" : "goat") : i + 1}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm" aria-live="polite">
          {!g || g.final !== null ? (
            <>
              {g && g.final !== null && (
                <span className={g.final === g.car ? "font-semibold text-callout-tip" : "font-semibold text-callout-warning"}>
                  {g.final === g.car ? "You won the car." : "A goat."}{" "}
                  {g.final === g.pick ? "(stuck)" : "(switched)"}
                </span>
              )}
              <button type="button" onClick={startGame} className="rounded-md border bg-background px-3 py-1 font-medium">
                {g ? "Play again" : "Play one game"}
              </button>
            </>
          ) : g.pick === null ? (
            <span>Pick a door.</span>
          ) : (
            <>
              <span>
                The host opened {doors - 2} goat door{doors - 2 === 1 ? "" : "s"}.
              </span>
              <button type="button" onClick={() => decide(false)} className="rounded-md border bg-background px-3 py-1">
                Stick with {g.pick + 1}
              </button>
              <button type="button" onClick={() => decide(true)} className="rounded-md border bg-background px-3 py-1 font-medium">
                Switch to {g.keep! + 1}
              </button>
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs" role="group" aria-label="Number of doors">
          {[3, 10, 100].map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={doors === d}
              onClick={() => {
                setDoors(d);
                reset();
              }}
              className={`rounded-md border px-2 py-0.5 ${doors === d ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {d} doors
            </button>
          ))}
        </div>
      </div>
    );
    const played = tally.stickWin + tally.stickLose + tally.switchWin + tally.switchLose;
    if (played > 0)
      readout.push(
        <span key="t">
          Your games: stuck {tally.stickWin + tally.stickLose} (won {tally.stickWin}), switched {tally.switchWin + tally.switchLose} (won {tally.switchWin})
        </span>,
      );
    const wins = history.reduce((s, x) => s + x, 0);
    if (N > 0)
      readout.push(
        <span key="sim">
          Simulated: sticking won <strong className="tabular-nums">{fmt(wins / N)}</strong>, switching won{" "}
          <strong className="tabular-nums">{fmt(1 - wins / N)}</strong> of {N.toLocaleString("en-US")} games
          {config.showTheoretical && (
            <span className="text-muted-foreground">
              {" "}
              (theory <Latex latex={`\\tfrac{1}{${doors}}`} /> and <Latex latex={`\\tfrac{${doors - 1}}{${doors}}`} />)
            </span>
          )}
        </span>,
      );
  }

  // ----- chart choice -----
  let chartNode: React.ReactNode = null;
  if (bars) {
    chartNode = <FreqBars {...bars} showTheoretical={config.showTheoretical} />;
  } else if (track === "stick-vs-switch") {
    chartNode = (
      <RunningChart
        series={chart.series}
        nMax={N}
        yMin={0}
        yMax={1}
        yLabel="win rate"
        refs={config.showTheoretical ? [{ value: (doors - 1) / doors, label: "switch", stroke: "stroke-plot/60" }, { value: 1 / doors, label: "stick", stroke: "stroke-plot-secondary/60" }] : []}
      />
    );
  } else {
    const isMean = track === "value-mean";
    const yMin = isMean ? (mode === "die" ? 1 : 2) : 0;
    const yMax = isMean ? (mode === "die" ? 6 : 12) : 1;
    chartNode = (
      <RunningChart
        series={chart.series}
        nMax={N}
        yMin={yMin}
        yMax={yMax}
        yLabel={isMean ? "mean" : "relative frequency"}
        refs={config.showTheoretical && theory !== null ? [{ value: theory, label: isMean ? `E = ${fmt(theory)}` : `P = ${fmt(theory)}`, stroke: "stroke-callout-warning" }] : []}
      />
    );
  }

  const title = {
    coin: "Coin-flip simulator",
    die: "Die-roll simulator",
    "two-dice": "Two dice: the sample space",
    urn: "Drawing from an urn",
    "monty-hall": "The Monty Hall game",
  }[mode];

  return (
    <InteractiveFrame title={title}>
      {picture}

      {mode === "two-dice" && config.allowCombineToggle && (
        <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Shade a combination of events">
          {(["none", "union", "intersection", "complementA", "AnotB"] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={combine === c}
              onClick={() => setCombine(c)}
              className={`rounded-md border px-3 py-1 ${combine === c ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {COMBINE_LABEL[c]}
            </button>
          ))}
        </div>
      )}

      {mode === "urn" && urn?.allowReplacementToggle && (
        <div className="flex flex-wrap gap-2 text-sm" role="group" aria-label="Replacement">
          {[false, true].map((r) => (
            <button
              key={String(r)}
              type="button"
              aria-pressed={replacement === r}
              onClick={() => {
                setReplacement(r);
                reset();
              }}
              className={`rounded-md border px-3 py-1 ${replacement === r ? "border-primary bg-primary/10 font-medium" : "bg-background"}`}
            >
              {r ? "With replacement" : "Without replacement"}
            </button>
          ))}
        </div>
      )}

      {controls}

      {readout.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-md border bg-background p-3 text-sm" aria-live="polite">
          {readout}
        </div>
      )}

      {chartNode}

      <p className="text-center text-xs text-muted-foreground">{config.caption ?? DEFAULT_CAPTIONS[mode]}</p>
    </InteractiveFrame>
  );
}
