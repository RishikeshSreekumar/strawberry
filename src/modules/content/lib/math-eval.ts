/**
 * Tiny safe math expression evaluator for interactive block configs.
 * Content authors store expressions like "50 + 15*x" or "(x - a)^2 + b";
 * interactives evaluate them client-side with a variable environment.
 * No eval/Function — a recursive descent parser over a whitelist.
 */

type Node =
  | { kind: "num"; value: number }
  | { kind: "var"; name: string }
  | { kind: "unary"; op: "-"; arg: Node }
  | { kind: "binary"; op: "+" | "-" | "*" | "/" | "^"; left: Node; right: Node }
  | { kind: "call"; fn: string; arg: Node };

const FUNCTIONS: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt,
  abs: Math.abs,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  ln: Math.log,
  log: Math.log,
  exp: Math.exp,
};

class Parser {
  private pos = 0;
  constructor(private src: string) {}

  parse(): Node {
    const node = this.parseAddSub();
    this.skipWs();
    if (this.pos < this.src.length) {
      throw new Error(`Unexpected "${this.src[this.pos]}" at ${this.pos}`);
    }
    return node;
  }

  private skipWs() {
    while (this.pos < this.src.length && /\s/.test(this.src[this.pos])) this.pos++;
  }

  private peek(): string {
    this.skipWs();
    return this.src[this.pos] ?? "";
  }

  private parseAddSub(): Node {
    let left = this.parseMulDiv();
    for (;;) {
      const c = this.peek();
      if (c === "+" || c === "-") {
        this.pos++;
        left = { kind: "binary", op: c, left, right: this.parseMulDiv() };
      } else {
        return left;
      }
    }
  }

  private parseMulDiv(): Node {
    let left = this.parseUnary();
    for (;;) {
      const c = this.peek();
      if (c === "*" || c === "/") {
        this.pos++;
        left = { kind: "binary", op: c, left, right: this.parseUnary() };
      } else {
        return left;
      }
    }
  }

  private parseUnary(): Node {
    if (this.peek() === "-") {
      this.pos++;
      return { kind: "unary", op: "-", arg: this.parseUnary() };
    }
    return this.parsePower();
  }

  private parsePower(): Node {
    const base = this.parseAtom();
    if (this.peek() === "^") {
      this.pos++;
      // Right-associative; exponent may itself be unary (e.g. x^-1).
      return { kind: "binary", op: "^", left: base, right: this.parseUnary() };
    }
    return base;
  }

  private parseAtom(): Node {
    const c = this.peek();
    if (c === "(") {
      this.pos++;
      const inner = this.parseAddSub();
      if (this.peek() !== ")") throw new Error(`Expected ")" at ${this.pos}`);
      this.pos++;
      return inner;
    }
    if (/[0-9.]/.test(c)) {
      const match = /^[0-9]*\.?[0-9]+/.exec(this.src.slice(this.pos));
      if (!match) throw new Error(`Bad number at ${this.pos}`);
      this.pos += match[0].length;
      return { kind: "num", value: Number(match[0]) };
    }
    if (/[a-zA-Z]/.test(c)) {
      const match = /^[a-zA-Z_][a-zA-Z0-9_]*/.exec(this.src.slice(this.pos))!;
      this.pos += match[0].length;
      const name = match[0];
      if (this.peek() === "(") {
        if (!(name in FUNCTIONS)) throw new Error(`Unknown function "${name}"`);
        this.pos++;
        const arg = this.parseAddSub();
        if (this.peek() !== ")") throw new Error(`Expected ")" at ${this.pos}`);
        this.pos++;
        return { kind: "call", fn: name, arg };
      }
      return { kind: "var", name };
    }
    throw new Error(`Unexpected "${c}" at ${this.pos}`);
  }
}

function evalNode(node: Node, env: Record<string, number>): number {
  switch (node.kind) {
    case "num":
      return node.value;
    case "var": {
      const value = env[node.name];
      if (value === undefined) throw new Error(`Unknown variable "${node.name}"`);
      return value;
    }
    case "unary":
      return -evalNode(node.arg, env);
    case "call":
      return FUNCTIONS[node.fn](evalNode(node.arg, env));
    case "binary": {
      const l = evalNode(node.left, env);
      const r = evalNode(node.right, env);
      switch (node.op) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return l / r;
        case "^":
          return Math.pow(l, r);
      }
    }
  }
}

const cache = new Map<string, Node>();

/** Compile an expression once; returns an evaluator over a variable env. */
export function compileExpression(expr: string): (env: Record<string, number>) => number {
  let ast = cache.get(expr);
  if (!ast) {
    ast = new Parser(expr).parse();
    cache.set(expr, ast);
  }
  const compiled = ast;
  return (env) => evalNode(compiled, env);
}

/** Evaluate with a single variable x (the common case for f(x) plots). */
export function evaluateAt(expr: string, x: number, extra?: Record<string, number>): number {
  return compileExpression(expr)({ x, ...extra });
}
