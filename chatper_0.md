I’d change the earlier Chapter 0 fairly significantly.

Instead of treating it as “here are all the prerequisites you might need,” I’d make it **the minimum functional foundation needed to understand calculus**. Algebra skills should appear just-in-time as remediation rather than forcing students through a large algebra review first.

# Chapter 0 — Functions: The Language of Calculus

**Purpose:** Build enough intuition about functions, graphs, inputs/outputs, and change that limits and derivatives feel like natural next ideas.

**End state:** A student should look at

$$
f(x)=x^2
$$

and comfortably move between:

```text
formula ↔ inputs/outputs ↔ table ↔ graph ↔ behavior
```

They should also understand that calculus is primarily interested in **how the output of a function changes when its input changes**.

---

## Proposed chapter structure

| Lesson | Topic                         | Core idea                                               |
| ------ | ----------------------------- | ------------------------------------------------------- |
| 0.1    | What is a Function?           | A function describes a relationship between quantities  |
| 0.2    | Function Notation             | `f(x)` means the output corresponding to input `x`      |
| 0.3    | Domain and Range              | Not every input/output necessarily makes sense          |
| 0.4    | Reading Functions from Graphs | A graph is another representation of the same function  |
| 0.5    | How Functions Change          | Increasing, decreasing, maxima, minima, rate of change  |
| 0.6    | Transforming Functions        | Understand how changing a formula changes a graph       |
| 0.7    | Function Families             | Recognize common shapes calculus repeatedly uses        |
| 0.8    | Combining Functions           | Addition, multiplication and composition                |
| 0.9    | Piecewise Functions           | Different rules can define different regions            |
| 0.10   | From Functions to Calculus    | Average change → secants → the question calculus solves |
| —      | Chapter Mastery               | Diagnose whether the student is ready for limits        |

The important addition is **0.10**. The chapter shouldn't simply stop after teaching functions. It should create the question that motivates calculus.

---

# Lesson 0.1 — What is a Function?

### Learning objective

Understand a function as a rule associating every valid input with **exactly one output**.

### Block sequence

```text
HOOK
↓
INTERACTIVE
↓
EXPLANATION
↓
DEFINITION
↓
EXAMPLE
↓
GUIDED PROBLEM
↓
PRACTICE
↓
MISCONCEPTION CHECK
↓
MASTERY CHECK
```

### Hook

Don't begin with:

> A function is a relation from a set A to a set B...

Start with something concrete.

Imagine a taxi fare:

$$
\text{Fare} = 50 + 15(\text{distance})
$$

Change the distance and the fare changes.

```text
1 km → ₹65
2 km → ₹80
5 km → ₹125
```

The distance is the **input**.

The fare is the **output**.

The relationship between them is a **function**.

### Interactive

A simple input slider:

```text
Distance
0 ─────────●────────── 10 km

Fare: ₹125
```

Moving the slider changes the output.

Then introduce the abstraction:

```text
input → function → output

x → f → f(x)
```

### Formal idea

Only after intuition:

> A function assigns exactly one output to every valid input.

Then show:

```text
✓ Function

1 → A
2 → B
3 → A
```

versus

```text
✗ Not a function

1 → A
1 → B
```

### Practice

Mix representations:

* mapping diagrams
* tables
* simple formulas
* small graphs

Ask:

> Which of these represents a function?

This becomes useful later for introducing the vertical-line test.

---

# Lesson 0.2 — Function Notation

This lesson should solve one major misconception:

$$
f(x)
$$

does **not** mean

$$
f \times x
$$

### Start from something already understood

Given

$$
f(x)=x^2+1
$$

read it as:

> “The function \(f\), evaluated at \(x\).”

Then visually animate:

```text
f(x) = x² + 1

           x = 3
             ↓

f(3) = 3² + 1
     = 10
```

### Interactive

Let the student type:

```text
x = [ 5 ]
```

and show:

```text
f(x) = x²

5 → f → 25
```

Then transition:

```text
f(5) = 25
```

### Progression

Start easy:

$$
f(x)=2x+3,\qquad f(4)=?
$$

Then:

$$
g(t)=t^2-1,\qquad g(3)=?
$$

Then:

$$
f(a)=?
$$

for

$$
f(x)=x^2+2x
$$

giving:

$$
f(a)=a^2+2a
$$

That last step is important preparation for derivatives.

Eventually students will encounter:

$$
f(x+h)
$$

and shouldn't panic.

---

# Lesson 0.3 — Domain and Range

Don't teach domain as a vocabulary exercise.

Teach it as:

> **Which inputs actually make sense?**

Start with something obvious.

Suppose:

$$
f(x)=\frac{1}{x}
$$

Try:

```text
x = 2    → 0.5
x = 1    → 1
x = 0.5  → 2
x = 0    → ???
```

The visualization should physically refuse to plot \(x=0\).

Then introduce:

**Domain:** allowed inputs.

**Range:** possible outputs.

### Three important cases

$$
f(x)=x^2
$$

all real inputs are valid.

---

$$
f(x)=\frac1x
$$

\(x=0\) is invalid.

---

$$
f(x)=\sqrt{x}
$$

within real numbers:

$$
x\ge0
$$

This is enough initially. Don't turn this lesson into interval-notation hell.

---

# Lesson 0.4 — Reading Functions from Graphs

This lesson is extremely important for calculus.

A lot of students know how to **draw** a graph but struggle to actually **read information from it**.

The lesson should teach them to answer questions visually.

Given a graph, identify:

```text
f(2)

where f(x) = 0

where f(x) > 0

where the function increases

where it decreases

highest / lowest values

rough domain

rough range
```

### Core visualization

A draggable point on a graph:

$$
f(x)=x^2
$$

Dragging horizontally:

```text
x = -2
f(x) = 4
```

Display synchronized representations:

```text
Formula
f(x) = x²

Table
x    f(x)
-2    4
-1    1
 0    0

Graph
    ●
   / \
```

This reinforces the crucial idea:

> Formula, table and graph are not separate topics. They are different representations of the same function.

---

# Lesson 0.5 — How Functions Change

This is where Chapter 0 starts quietly becoming calculus.

Teach:

* increasing
* decreasing
* constant
* local maximum
* local minimum
* steepness
* faster/slower change

But **don't formally introduce derivatives yet**.

Show something like:

$$
f(x)=x^2
$$

Ask:

> As \(x\) moves from 1 → 2 → 3, what happens to \(f(x)\)?

```text
x     f(x)

1       1
2       4      +3
3       9      +5
4      16      +7
```

Something interesting is happening:

> The output isn't merely increasing. It's increasing **faster and faster**.

That thought is the seed of differentiation.

---

# Lesson 0.6 — Transforming Functions

Start with one base graph:

$$
f(x)=x^2
$$

Then let students manipulate:

$$
f(x)+a
$$

$$
f(x-a)
$$

$$
af(x)
$$

$$
f(ax)
$$

using sliders.

For example:

```text
y = (x - a)² + b

a: ─────●─────
b: ───●───────
```

Students should discover transformations visually **before memorizing rules**.

Then summarize:

$$
f(x)+k
$$

moves vertically.

$$
f(x-k)
$$

moves horizontally.

The horizontal direction being apparently “backwards” deserves its own misconception check.

---

# Lesson 0.7 — Function Families

Don't make students memorize dozens of functions.

Focus on the ones they'll repeatedly meet.

| Family         | Example           |   |   |
| -------------- | ----------------- | - | - |
| Constant       | \(f(x)=3\)        |   |   |
| Linear         | \(f(x)=x\)        |   |   |
| Quadratic      | \(f(x)=x^2\)      |   |   |
| Cubic          | \(f(x)=x^3\)      |   |   |
| Absolute value | (f(x)=            | x | ) |
| Reciprocal     | \(f(x)=1/x\)      |   |   |
| Square root    | \(f(x)=\sqrt{x}\) |   |   |
| Exponential    | \(f(x)=2^x\)      |   |   |
| Logarithmic    | \(f(x)=\ln x\)    |   |   |
| Trigonometric  | \(\sin x,\cos x\) |   |   |

The visualization should ideally let the student flip between them.

The goal isn't:

> Memorize this taxonomy.

It's:

> When this graph appears later, it shouldn't be a stranger.

---

# Lesson 0.8 — Combining Functions

Teach operations first:

$$
(f+g)(x)
$$

$$
(f-g)(x)
$$

$$
(fg)(x)
$$

$$
\frac fg(x)
$$

but spend most of the conceptual effort on **composition**.

### Composition visualization

Instead of jumping directly to:

$$
(f\circ g)(x)=f(g(x))
$$

show:

```text
x
↓
g
↓
g(x)
↓
f
↓
f(g(x))
```

Example:

$$
g(x)=x+1
$$

$$
f(x)=x^2
$$

Then:

```text
2
↓ +1
3
↓ square
9
```

Therefore:

$$
f(g(2))=9
$$

Only afterwards introduce \(f\circ g\).

This mental model becomes very important when the chain rule arrives.

---

# Lesson 0.9 — Piecewise Functions

Piecewise functions should come **late**, after graphs and function notation are comfortable.

Example:

$$
f(x)=
\begin{cases}
x+2 & x<0\\
x^2 & x\ge0
\end{cases}
$$

Visualization should highlight the active rule as \(x\) moves.

```text
x = -3

✓ x < 0
→ use x + 2

x = 2

✓ x ≥ 0
→ use x²
```

This is also the perfect place to introduce:

```text
open circle
closed circle
```

without yet formally teaching continuity.

That prepares the student for the next major topic.

---

# Lesson 0.10 — From Functions to Calculus

This lesson is the most important redesign I'd make.

Instead of ending with a test, create a **conceptual cliffhanger**.

Start with:

$$
f(x)=x^2
$$

Ask:

> How fast is this function changing?

Between \(x=1\) and \(x=3\):

$$
\frac{f(3)-f(1)}{3-1}
=
\frac{9-1}{2}
=
4
$$

Explain this geometrically as the slope of the **secant line**.

Then let the second point move:

```text
x₁ = 2

x₂ = 4
x₂ = 3
x₂ = 2.5
x₂ = 2.1
x₂ = 2.01
```

and show the secant changing.

Eventually the student naturally asks:

> What happens if the second point becomes exactly the first point?

But then:

$$
\frac{f(x)-f(x)}{x-x}
=
\frac00
$$

Oops.

That is exactly where Chapter 0 should end.

Then:

> To find instantaneous change, we need a way of getting **arbitrarily close** without simply setting the two points equal.

**Next: Limits.**

Now limits aren't some random new algebraic ritual. The student knows why they exist.

---

# Algebra should become supporting content

I'd remove a standalone giant “Algebra Skills” lesson from the main linear progression.

Instead, introduce reusable `remediation` blocks.

For example, during limits:

```text
Need to simplify:

(x² - 4) / (x - 2)

Student struggles
        ↓

Quick refresher:
Factoring difference of squares
        ↓
Return to problem
```

You could tag prerequisites:

```json
{
  "requires": ["factoring.difference-of-squares"]
}
```

And student mastery:

```json
{
  "factoring.difference-of-squares": 0.42
}
```

Then the learning engine can decide whether to surface the refresher.

Much better than making everyone complete 45 minutes of algebra beforehand.

---

# The lesson shouldn't be stored as one document

For example, Lesson 0.1 could internally look roughly like:

```json
{
  "id": "functions-introduction",
  "title": "What is a Function?",
  "objectives": [
    "Understand functions as input-output relationships",
    "Determine whether a relationship is a function"
  ],
  "blocks": [
    {
      "type": "hook",
      "id": "taxi-fare"
    },
    {
      "type": "interactive",
      "component": "input-output-machine",
      "config": {
        "function": "50 + 15*x"
      }
    },
    {
      "type": "explanation",
      "id": "function-intuition"
    },
    {
      "type": "definition",
      "term": "Function"
    },
    {
      "type": "example",
      "id": "mapping-example-1"
    },
    {
      "type": "guided_problem",
      "questionId": "fn-g-001"
    },
    {
      "type": "practice_set",
      "questionIds": [
        "fn-p-001",
        "fn-p-002",
        "fn-p-003"
      ]
    },
    {
      "type": "concept_check",
      "questionId": "fn-c-001"
    },
    {
      "type": "mastery_quiz",
      "questionPool": "functions-introduction"
    }
  ]
}
```

That is much closer to what I'd consider the **actual Chapter 0 content specification** for the product.

## One more architectural distinction

I'd separate three kinds of content:

```text
CURRICULUM CONTENT
"What should the student learn?"
→ lessons, explanation, examples

ASSESSMENT CONTENT
"Can the student actually do it?"
→ questions, tests, PYQs

LEARNING EXPERIENCE
"How should we teach it?"
→ visualizations, interactions, hints,
   guided solving, adaptive remediation
```

That separation is important because the third category is where your product can become substantially better than “a textbook rendered in React.”

And I'd use Chapter 0 as the proving ground: if we can make **functions → change → limits** feel intuitive through this system, we've validated most of the core learning architecture before building the rest of calculus.

