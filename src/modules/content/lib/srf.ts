/**
 * Helpers for the Sets, Relations and Functions (srf) interactives:
 * - a tiny set-expression language for Venn diagrams,
 * - an extended real-function evaluator (math-eval grammar plus the JEE
 *   special functions floor, ceil, frac, sgn and the principal branches of
 *   all six inverse trig functions),
 * - property checks for finite relations and functions.
 * Pure functions only, so the zod schemas can validate configs with them.
 */

// ---------- Venn diagrams ----------

/**
 * A Venn region is named by the sets it lies inside: "" (outside every set),
 * "A" (A only), "AB" (A and B, not C), "ABC", ...
 */
export type SrfRegion = string;

export function srfRegions(sets: 2 | 3): SrfRegion[] {
  return sets === 2
    ? ["", "A", "B", "AB"]
    : ["", "A", "B", "C", "AB", "AC", "BC", "ABC"];
}

type SetNode =
  | { kind: "set"; name: "A" | "B" | "C" | "U" | "0" }
  | { kind: "complement"; arg: SetNode }
  | { kind: "op"; op: "|" | "&" | "-" | "^"; left: SetNode; right: SetNode };

/**
 * Grammar (loosest first): `|` union, `^` symmetric difference, `-`
 * difference, `&` intersection, postfix `'` complement, parentheses. Atoms:
 * A, B, C, U (universal set) and 0 (empty set). All binary operators are
 * left-associative; use brackets whenever in doubt.
 */
class SetParser {
  private pos = 0;
  constructor(private src: string) {}

  parse(): SetNode {
    const node = this.parseUnion();
    this.skip();
    if (this.pos < this.src.length) throw new Error(`Unexpected "${this.src[this.pos]}" at ${this.pos}`);
    return node;
  }

  private skip() {
    while (this.pos < this.src.length && /\s/.test(this.src[this.pos])) this.pos++;
  }

  private peek(): string {
    this.skip();
    return this.src[this.pos] ?? "";
  }

  private level(ops: string, next: () => SetNode): SetNode {
    let left = next();
    for (;;) {
      const c = this.peek();
      if (c && ops.includes(c)) {
        this.pos++;
        left = { kind: "op", op: c as "|" | "&" | "-" | "^", left, right: next() };
      } else return left;
    }
  }

  private parseUnion = (): SetNode => this.level("|", this.parseSym);
  private parseSym = (): SetNode => this.level("^", this.parseDiff);
  private parseDiff = (): SetNode => this.level("-", this.parseInter);
  private parseInter = (): SetNode => this.level("&", this.parsePostfix);

  private parsePostfix = (): SetNode => {
    let node = this.parseAtom();
    while (this.peek() === "'") {
      this.pos++;
      node = { kind: "complement", arg: node };
    }
    return node;
  };

  private parseAtom(): SetNode {
    const c = this.peek();
    if (c === "(") {
      this.pos++;
      const inner = this.parseUnion();
      if (this.peek() !== ")") throw new Error(`Expected ")" at ${this.pos}`);
      this.pos++;
      return inner;
    }
    if (c === "A" || c === "B" || c === "C" || c === "U" || c === "0") {
      this.pos++;
      return { kind: "set", name: c };
    }
    throw new Error(`Unexpected "${c}" at ${this.pos}`);
  }
}

function inRegion(node: SetNode, region: SrfRegion): boolean {
  switch (node.kind) {
    case "set":
      if (node.name === "U") return true;
      if (node.name === "0") return false;
      return region.includes(node.name);
    case "complement":
      return !inRegion(node.arg, region);
    case "op": {
      const l = inRegion(node.left, region);
      const r = inRegion(node.right, region);
      switch (node.op) {
        case "|":
          return l || r;
        case "&":
          return l && r;
        case "-":
          return l && !r;
        case "^":
          return l !== r;
      }
    }
  }
}

function usedSets(node: SetNode): Set<string> {
  if (node.kind === "set") return new Set(node.name === "A" || node.name === "B" || node.name === "C" ? [node.name] : []);
  if (node.kind === "complement") return usedSets(node.arg);
  return new Set([...usedSets(node.left), ...usedSets(node.right)]);
}

/**
 * The regions an expression covers, or an error message. With 2 sets the
 * expression may not mention C.
 */
export function srfShadedRegions(expr: string, sets: 2 | 3): SrfRegion[] | string {
  let ast: SetNode;
  try {
    ast = new SetParser(expr).parse();
  } catch (e) {
    return (e as Error).message;
  }
  if (sets === 2 && usedSets(ast).has("C")) return "uses C in a two-set diagram";
  return srfRegions(sets).filter((r) => inRegion(ast, r));
}

// ---------- Real functions ----------

type FnNode =
  | { kind: "num"; value: number }
  | { kind: "var"; name: string }
  | { kind: "neg"; arg: FnNode }
  | { kind: "bin"; op: "+" | "-" | "*" | "/" | "^"; left: FnNode; right: FnNode }
  | { kind: "call"; fn: string; arg: FnNode };

const sgn = (x: number) => (x > 0 ? 1 : x < 0 ? -1 : 0);
/** Snap values within 1e-9 of an integer, so floor(3 * (1/3)) is 1, not 0. */
const snap = (x: number) => (Math.abs(x - Math.round(x)) < 1e-9 ? Math.round(x) : x);

export const SRF_FUNCTIONS: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  cot: (x) => 1 / Math.tan(x),
  sec: (x) => 1 / Math.cos(x),
  csc: (x) => 1 / Math.sin(x),
  ln: Math.log,
  log: Math.log,
  exp: Math.exp,
  floor: (x) => Math.floor(snap(x)),
  ceil: (x) => Math.ceil(snap(x)),
  frac: (x) => snap(x) - Math.floor(snap(x)),
  sgn,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  /** Principal branch (0, pi). */
  acot: (x) => Math.PI / 2 - Math.atan(x),
  /** Principal branch [0, pi] minus pi/2, domain |x| >= 1. */
  asec: (x) => (Math.abs(x) < 1 ? NaN : Math.acos(1 / x)),
  /** Principal branch [-pi/2, pi/2] minus 0, domain |x| >= 1. */
  acsc: (x) => (Math.abs(x) < 1 ? NaN : Math.asin(1 / x)),
};

const SRF_CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

class FnParser {
  private pos = 0;
  constructor(private src: string) {}

  parse(): FnNode {
    const node = this.addSub();
    if (this.peek() !== "") throw new Error(`Unexpected "${this.src[this.pos]}" at ${this.pos}`);
    return node;
  }

  private peek(): string {
    while (this.pos < this.src.length && /\s/.test(this.src[this.pos])) this.pos++;
    return this.src[this.pos] ?? "";
  }

  private addSub(): FnNode {
    let left = this.mulDiv();
    for (let c = this.peek(); c === "+" || c === "-"; c = this.peek()) {
      this.pos++;
      left = { kind: "bin", op: c, left, right: this.mulDiv() };
    }
    return left;
  }

  private mulDiv(): FnNode {
    let left = this.unary();
    for (let c = this.peek(); c === "*" || c === "/"; c = this.peek()) {
      this.pos++;
      left = { kind: "bin", op: c, left, right: this.unary() };
    }
    return left;
  }

  private unary(): FnNode {
    if (this.peek() === "-") {
      this.pos++;
      return { kind: "neg", arg: this.unary() };
    }
    const base = this.atom();
    if (this.peek() === "^") {
      this.pos++;
      return { kind: "bin", op: "^", left: base, right: this.unary() };
    }
    return base;
  }

  private atom(): FnNode {
    const c = this.peek();
    if (c === "(") {
      this.pos++;
      const inner = this.addSub();
      if (this.peek() !== ")") throw new Error(`Expected ")" at ${this.pos}`);
      this.pos++;
      return inner;
    }
    if (/[0-9.]/.test(c)) {
      const m = /^[0-9]*\.?[0-9]+/.exec(this.src.slice(this.pos));
      if (!m) throw new Error(`Bad number at ${this.pos}`);
      this.pos += m[0].length;
      return { kind: "num", value: Number(m[0]) };
    }
    if (/[a-zA-Z]/.test(c)) {
      const name = /^[a-zA-Z_][a-zA-Z0-9_]*/.exec(this.src.slice(this.pos))![0];
      this.pos += name.length;
      if (this.peek() === "(") {
        if (!(name in SRF_FUNCTIONS)) throw new Error(`Unknown function "${name}"`);
        this.pos++;
        const arg = this.addSub();
        if (this.peek() !== ")") throw new Error(`Expected ")" at ${this.pos}`);
        this.pos++;
        return { kind: "call", fn: name, arg };
      }
      if (name !== "x" && !(name in SRF_CONSTANTS)) throw new Error(`Unknown variable "${name}"`);
      return { kind: "var", name };
    }
    throw new Error(`Unexpected "${c}" at ${this.pos}`);
  }
}

function evalFn(node: FnNode, x: number): number {
  switch (node.kind) {
    case "num":
      return node.value;
    case "var":
      return node.name === "x" ? x : SRF_CONSTANTS[node.name];
    case "neg":
      return -evalFn(node.arg, x);
    case "call":
      return SRF_FUNCTIONS[node.fn](evalFn(node.arg, x));
    case "bin": {
      const l = evalFn(node.left, x);
      const r = evalFn(node.right, x);
      switch (node.op) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return r === 0 ? NaN : l / r;
        case "^":
          return Math.pow(l, r);
      }
    }
  }
}

const fnCache = new Map<string, FnNode>();

/** Compile an expression in x; throws on a syntax error. Undefined values come back as NaN. */
export function srfCompile(expr: string): (x: number) => number {
  let ast = fnCache.get(expr);
  if (!ast) {
    ast = new FnParser(expr).parse();
    fnCache.set(expr, ast);
  }
  const compiled = ast;
  return (x) => {
    const y = evalFn(compiled, x);
    return Number.isFinite(y) ? y : NaN;
  };
}

/** Error message for a bad expression, or null. */
export function srfExpressionError(expr: string): string | null {
  try {
    srfCompile(expr);
    return null;
  } catch (e) {
    return (e as Error).message;
  }
}

// ---------- Finite relations and functions ----------

export type Pair = readonly [string, string];

const key = (a: string, b: string) => `${a}\u0000${b}`;

export type RelationReport = {
  reflexive: { ok: boolean; missing: string[] };
  symmetric: { ok: boolean; witness?: Pair };
  antisymmetric: { ok: boolean; witness?: Pair };
  transitive: { ok: boolean; witness?: [Pair, Pair] };
  equivalence: boolean;
  /** Equivalence classes when the relation is an equivalence relation. */
  classes: string[][];
};

export function srfRelationReport(set: string[], pairs: Pair[]): RelationReport {
  const has = new Set(pairs.map(([a, b]) => key(a, b)));
  const missing = set.filter((a) => !has.has(key(a, a)));
  const asym = pairs.find(([a, b]) => !has.has(key(b, a)));
  const anti = pairs.find(([a, b]) => a !== b && has.has(key(b, a)));
  let trans: [Pair, Pair] | undefined;
  outer: for (const [a, b] of pairs) {
    for (const [c, d] of pairs) {
      if (b === c && !has.has(key(a, d))) {
        trans = [
          [a, b],
          [c, d],
        ];
        break outer;
      }
    }
  }
  const equivalence = missing.length === 0 && !asym && !trans;
  const classes: string[][] = [];
  if (equivalence) {
    const seen = new Set<string>();
    for (const a of set) {
      if (seen.has(a)) continue;
      const cls = set.filter((b) => has.has(key(a, b)));
      cls.forEach((b) => seen.add(b));
      classes.push(cls);
    }
  }
  return {
    reflexive: { ok: missing.length === 0, missing },
    symmetric: { ok: !asym, witness: asym },
    antisymmetric: { ok: !anti, witness: anti },
    transitive: { ok: !trans, witness: trans },
    equivalence,
    classes,
  };
}

/** The smallest equivalence relation on `set` containing `pairs`. */
export function srfEquivalenceClosure(set: string[], pairs: Pair[]): Pair[] {
  const parent = new Map(set.map((a) => [a, a]));
  const find = (a: string): string => {
    let r = a;
    while (parent.get(r) !== r) r = parent.get(r)!;
    return r;
  };
  for (const [a, b] of pairs) {
    if (parent.has(a) && parent.has(b)) parent.set(find(a), find(b));
  }
  const out: Pair[] = [];
  for (const a of set) for (const b of set) if (find(a) === find(b)) out.push([a, b]);
  return out;
}

export type FunctionReport = {
  /** Domain elements with no image / more than one image. */
  noImage: string[];
  manyImages: string[];
  isFunction: boolean;
  range: string[];
  /** For a function: two inputs with the same image, if any. */
  collision?: [string, string];
  /** For a function: codomain elements with no pre-image. */
  unreached: string[];
  injective: boolean;
  surjective: boolean;
};

export function srfFunctionReport(domain: string[], codomain: string[], pairs: Pair[]): FunctionReport {
  const images = new Map(domain.map((a) => [a, pairs.filter(([x]) => x === a).map(([, y]) => y)]));
  const noImage = domain.filter((a) => images.get(a)!.length === 0);
  const manyImages = domain.filter((a) => images.get(a)!.length > 1);
  const isFunction = noImage.length === 0 && manyImages.length === 0;
  const range = codomain.filter((b) => pairs.some(([, y]) => y === b));
  let collision: [string, string] | undefined;
  if (isFunction) {
    const firstWith = new Map<string, string>();
    for (const a of domain) {
      const y = images.get(a)![0];
      const prev = firstWith.get(y);
      if (prev !== undefined && !collision) collision = [prev, a];
      else firstWith.set(y, a);
    }
  }
  const unreached = codomain.filter((b) => !range.includes(b));
  return {
    noImage,
    manyImages,
    isFunction,
    range,
    collision,
    unreached,
    injective: isFunction && !collision,
    surjective: isFunction && unreached.length === 0,
  };
}

function choose(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let v = 1;
  for (let i = 1; i <= k; i++) v = (v * (n - i + 1)) / i;
  return Math.round(v);
}

/** Counts of all functions, one-one functions and onto functions from an m-set to an n-set. */
export function srfFunctionCounts(m: number, n: number) {
  const all = n ** m;
  let injective = m > n ? 0 : 1;
  for (let i = 0; i < m && m <= n; i++) injective *= n - i;
  let surjective = 0;
  for (let k = 0; k <= n; k++) surjective += (k % 2 === 0 ? 1 : -1) * choose(n, k) * (n - k) ** m;
  return { all, injective, surjective };
}
