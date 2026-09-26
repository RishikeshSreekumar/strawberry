# Course — Permutations, Combinations & the Binomial Theorem

**Slug:** `permutations-combinations-binomial` (a course alongside `calculus` and `trigonometry`; same block schema, same seed-script pattern.)

**Purpose:** Replace the "which formula do I use?" panic with a single habit: *build the object you are counting, one decision at a time, and ask what each count overcounts.* Every formula in the chapter (nPr, n^r, n!/(p!q!), (n−1)!, nCr, stars and bars, the binomial coefficients) is derived from the product rule plus one correction: divide out the arrangements you did not want to tell apart.

**End state:** Given any counting problem from the CBSE Class 11 / JEE syllabus, the student can reconstruct the answer from:

```text
product rule (AND) + sum rule (OR) → slots → divide by overcount (order, identical, rotation) → nCr → (a + b)^n by choosing
```

They should never need a memorised "type of problem" list, they should be able to check a count by listing a small case, and they should read the binomial theorem as a counting statement, not an algebra identity to memorise.

**Three threads run through every chapter**
1. **Intuition + visualization.** Every new count first appears as a picture that moves: a decision tree that grows, a list of arrangements that collapses into groups, stars sliding between bars, a Pascal triangle that lights up paths.
2. **Small-case check.** Every formula is tested on a case small enough to list completely (n = 3 or 4) before it is trusted. Students learn to do this themselves as their main error detector.
3. **Overcount audit.** Each chapter names the overcount it corrects (order, identical items, rotations, unlabelled groups, "at least one" double counting) and has at least one concept quiz where the tempting answer is the overcounted one.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | Counting from First Principles | AND multiplies, OR adds; count the complement when "at least" appears |
| 1 | Permutations: Arranging Things | Fill slots in order; divide out what you can't tell apart |
| 2 | Combinations: Choosing Things | A selection is an arrangement with the order forgotten: nCr = nPr / r! |
| 3 | Distributions and Advanced Counting | Groups, stars and bars, onto maps; pick the right model |
| 4 | Pascal's Triangle and the Binomial Theorem | Expanding (a + b)^n is choosing which brackets give b |
| 5 | Binomial Coefficients at Work | Sums, divisibility, approximation, and a glimpse past integer n |

Lesson slugs are kebab-case and unique within their chapter. Titles use the middle dot: `2.3 · Selections with Restrictions`.

---

## Chapter 0 — Counting from First Principles

**Purpose:** Establish the two rules that everything else is built from, and the habit of checking a count by listing a small case.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 0.1 | `why-count-cleverly` | Why Count Cleverly | Listing works until it doesn't; structure beats listing | Hook: outfits from 3 shirts × 4 trousers, then licence plates (listing is hopeless). Interactive: `pnc-counting-tree` with 2 then 3 stages, watching leaves multiply. Ends with "the tree has a shape, and the shape has a formula" |
| 0.2 | `the-product-rule` | The Product Rule (AND) | Sequential decisions multiply, *if* the number of choices at each stage doesn't depend on earlier picks' identity | Definition callout. Tree for meals (starter AND main AND dessert). Worked examples: 3-letter codes, routes A→B→C. Misconception killed: "the number of options at step 2 must be the same *set* each time" (only the *count* must be fixed) |
| 0.3 | `the-sum-rule` | The Sum Rule (OR) and the Complement | Disjoint alternatives add; "at least one" is easiest as total minus none | `pnc-counting-tree` in `sum` mode (two separate trees side by side). AND vs OR sorting quiz. Complement counting: codes with at least one repeated digit. Misconception killed: "OR means add even when cases overlap" (double counting; preview of inclusion–exclusion) |
| 0.4 | `factorials` | Factorials: Arranging Everything | Arranging n distinct things is n·(n−1)···1 = n! | Slot picture: n choices, then n−1, … Interactive: `pnc-arrangement-lister` listing all 3! and 4! arrangements. Why 0! = 1 is *derived* (one way to arrange nothing; keeps n!/(n−r)! valid at r = n). Growth table 5!, 10!, 20!. Simplification drill: 10!/8!, (n+1)!/(n−1)! |
| 0.5 | `restricted-slots-first` | Restricted Slots First | Fill the most constrained slot first | Number formation: 4-digit numbers from 0–9 with no repetition (leading zero), even numbers (units slot first, split into cases when 0 interacts), numbers greater than 5000. Misconception killed: "fill slots left to right always" (gives wrong answers when a later slot is restricted). Worked examples in steps |
| 0.6 | `chapter-0-mastery` | Chapter 0 Mastery | Can the student decide AND vs OR vs complement and set up slots? | Mixed mastery quizzes: menus, codes, number formation with 0, "at least one vowel", a case-split problem |

## Chapter 1 — Permutations: Arranging Things

**Purpose:** Arrangements with every kind of twist, all obtained from the slot picture and one move: divide out arrangements that look the same.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 1.1 | `arranging-r-of-n` | Arranging r out of n | Fill r slots from n distinct items: nPr = n!/(n−r)! | Slot derivation, then rewrite as a factorial ratio. `pnc-arrangement-lister` with n = 4, r = 2 (12 arrangements listed). Podium (gold/silver/bronze from 8 runners). Small-case check drill. nPr notation equivalences (ⁿPᵣ, P(n, r)). Particular item always included (r·ⁿ⁻¹Pᵣ₋₁) / always excluded (ⁿ⁻¹Pᵣ) — LOGARITHM 1344 + 1680 = 3024 — and the recurrence ⁿPᵣ = ⁿ⁻¹Pᵣ + r·ⁿ⁻¹Pᵣ₋₁ by counting two ways (optional callout). JEE extension: sum of all numbers formed from 1, 2, 3, 4 = 3!·10·1111 = 66 660 by the column-sum argument |
| 1.2 | `repetition-allowed` | When Repetition Is Allowed | Every slot has all n choices: n^r | PINs, passwords, functions from an r-set to an n-set. Side-by-side table: with vs without repetition. Misconception killed: "r^n vs n^r" (each *slot* picks from n, so n appears as the base). Concept quiz: 5 letters into 3 postboxes (3^5, not 5^3) |
| 1.3 | `identical-objects` | Arranging with Identical Objects | Label the identical items, count, then divide by the ways to permute the labels: n!/(p!q!r!) | `pnc-arrangement-lister` for "AAB" and "BANANA" with `groupBy: identical` so labelled copies A₁A₂ collapse. Derivation: every visible word is produced p!·q! times. MISSISSIPPI worked example. Identical digits with a leading-zero restriction: numbers > 1 000 000 from 2, 3, 0, 3, 4, 2, 3 = 420 − 60 = 360. Misconception killed: "subtract the repeats" instead of dividing |
| 1.4 | `circular-arrangements` | Circular Arrangements | Rotations of a circle are the same arrangement: n!/n = (n−1)! | `pnc-arrangement-lister` with `mode: circular`, rotations grouped. Fix one person as reference derivation. Necklaces / garlands: also flip ⇒ (n−1)!/2, and why this fails for n ≤ 2. Round table with two people who must sit together. r of n around a circle: ⁿPᵣ/r (lister with r < n; 6 of 10 at a table = 25 200). Misconception killed: "use (n−1)!/2 for every circular problem" (only when clockwise = anticlockwise) |
| 1.5 | `together-and-apart` | Together, Apart, and Fixed Positions | Glue items that must be together; place items that must be apart into the gaps | Block method (treat group as one item, then arrange inside). Gap method (arrange the others, choose gaps). Vowels together / no two vowels together in a word. Small-case check: the 12 AB-adjacent arrangements of ABCD listed as 6 blocks × 2. Fixed positions (EQUATION with consonants at both ends = 4320). Complement vs gap method compared, with the trap "not all together ≠ no two together" killed in a concept quiz, plus a concept quiz showing they coincide for exactly 2 items |
| 1.6 | `dictionary-rank` | Rank of a Word in the Dictionary | Count everything that comes before, letter by letter | Worked steps for the rank of a word (distinct letters, then a word with a repeated letter). Structured as the product rule applied position by position. Practice: rank of "MOTHER", "AGAIN" (worked), "BANANA" (quiz, rank 35). Reverse question: word at rank k |
| 1.7 | `chapter-1-mastery` | Chapter 1 Mastery | Any arrangement problem from slots + overcount | Mixed mastery: repetition vs not, identical letters, circular with restriction, gap method (row and circle), rank and reverse rank, fixed positions, combined moves (ALLAHABAD with L's together = 1680) |

## Chapter 2 — Combinations: Choosing Things

**Purpose:** Selections are arrangements with the order forgotten. From this single sentence come nCr, its identities, and every "committee" problem.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 2.1 | `from-arrangements-to-selections` | From Arrangements to Selections | Each selection of r items appears r! times in the arrangement list: nCr = nPr / r! | `pnc-arrangement-lister` with `groupBy: selection` (n = 4, r = 2: 12 arrangements collapse into 6 groups of 2). Definition callout for nCr = n!/(r!(n−r)!). Misconception killed: "a team of captain + vice-captain is a combination" (roles make order matter) |
| 2.2 | `ncr-identities` | Identities by Counting | Prove identities by counting one set two ways | Symmetry nCr = nC(n−r) (choosing who is in = choosing who is out). Pascal's rule nCr + nC(r−1) = (n+1)Cr via "is the special person in or out?". r·nCr = n·(n−1)C(r−1) (choose a committee then a chair vs chair first). If nCa = nCb then a = b or a + b = n. Algebraic verification after each counting proof |
| 2.3 | `selections-with-restrictions` | Selections with Restrictions | Split into cases, or use the complement | Committees of 5 from 6 men and 4 women with "at least 2 women" (cases vs complement). Particular person included / excluded. Misconception killed: "choose one woman first, then any 4" (overcounts; small-case listing shows the duplicates) |
| 2.4 | `choose-then-arrange` | Choose, Then Arrange | Many problems are a selection followed by an arrangement | Words using 2 vowels and 3 consonants from given letters (C·C·5!). Geometry counts: lines through n points, triangles, diagonals of an n-gon n(n−3)/2, with collinear points subtracted. Parallelograms from two sets of parallel lines |
| 2.5 | `all-possible-selections` | All Possible Selections | Each item is in or out: 2^n subsets; identical items give (p+1)(q+1)… choices | Subsets via product rule, sum of nCr over r = 2^n (preview of Ch 5). Fruit baskets with identical fruits (at least one fruit: subtract 1). Number of divisors of 360 = (3+1)(2+1)(1+1). Misconception killed: "selecting from identical items uses nCr" |
| 2.6 | `chapter-2-mastery` | Chapter 2 Mastery | Arrange or choose? Cases or complement? | Mixed mastery incl. one problem where the student must decide whether order matters and one geometry count with collinear points |

## Chapter 3 — Distributions and Advanced Counting

**Purpose:** Finish the counting toolkit — groups, identical objects into boxes, onto functions — and end with a decision procedure for picking the right model.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 3.1 | `dividing-into-groups` | Dividing into Groups | Labelled groups: multinomial; unlabelled equal-size groups: divide by k! | 12 students into groups of 5, 4, 3 (12!/(5!4!3!)). Into three unlabelled groups of 4: divide by 3!. Distributing those groups to named rooms multiplies the 3! back. Misconception killed: "equal-sized groups are counted the same as labelled groups" (small case: 4 people into two pairs = 3, not 6) |
| 3.2 | `stars-and-bars` | Stars and Bars | n identical items into k distinct boxes ↔ arrangements of n stars and k−1 bars: C(n+k−1, k−1) | `pnc-arrangement-lister` in `display: stars-bars` mode listing every distribution of 4 sweets to 3 children and its star-bar word. Link back to 1.3 (it is an identical-objects arrangement). Non-negative integer solutions of x + y + z = 10. Misconception killed: "C(n, k) for identical objects into boxes" |
| 3.3 | `bounds-on-variables` | Lower and Upper Bounds | Shift variables to remove lower bounds; subtract to handle upper bounds | Positive solutions (give everyone one first): C(n−1, k−1). x ≥ 2 substitution. One upper bound via complement (x ≤ 3 = all − (x ≥ 4)). Dice sums as a bounded equation. Worked examples in steps |
| 3.4 | `distinct-into-distinct` | Distinct Objects into Distinct Boxes | Each object picks a box: k^n; "no empty box" needs inclusion–exclusion | 5 letters into 3 postboxes = 3^5. Onto count for n into 3 boxes: 3^n − 3·2^n + 3·1^n derived via inclusion–exclusion with a Venn-style table. Derangements D₄ = 9 by listing, general formula shown as the same principle (JEE extension, marked optional in a callout) |
| 3.5 | `choosing-the-model` | Choosing the Right Model | Three questions: does order matter, can things repeat, are items/boxes identical? | Decision table covering nPr, n^r, n!/(p!q!), (n−1)!, nCr, 2^n, stars and bars, k^n. Sorting drill: 8 word problems, pick the model before computing. Concept quizzes where two models look plausible |
| 3.6 | `chapter-3-mastery` | Chapter 3 Mastery | Model selection under pressure | Mixed mastery drawing on Chapters 0–3 |

## Chapter 4 — Pascal's Triangle and the Binomial Theorem

**Purpose:** Discover the binomial theorem as a counting statement, not an algebraic trick.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 4.1 | `pascals-triangle-as-paths` | Pascal's Triangle as Paths | Each entry counts down-left/down-right paths, so it is nCr, and it obeys Pascal's rule | `pnc-pascal-triangle` in `paths` mode: click an entry, every path to it lights up. Grid-path problem (right/up moves) as a word of R and U. Links Pascal's rule from 2.2 to "the last step came from the left or the right" |
| 4.2 | `patterns-in-the-triangle` | Patterns in the Triangle | Row sums 2^n, symmetry, hockey stick, 11^n — each with a counting reason | `pnc-pascal-triangle` in `highlight` mode (row sum, hockey stick, symmetry, odd entries). Each pattern gets its one-line counting proof. Misconception killed: "11^n reads off every row" (fails from row 5 due to carries) |
| 4.3 | `expanding-by-choosing` | Expanding (a + b)^n by Choosing | Multiply out n brackets: each term picks a or b from every bracket, and nCr ways give a^{n−r}b^r | Expand (a+b)^3 by listing all 8 picks (aab, aba, …) and grouping. `pnc-pascal-triangle` in `expansion` mode with n slider showing coefficients next to terms. Statement of the theorem with sigma notation. Misconception killed: "(a + b)^n = a^n + b^n" |
| 4.4 | `the-general-term` | The General Term | T_{r+1} = nCr a^{n−r} b^r finds any single term | Coefficient of x^5 in (2x − 3)^8, sign handling with (a − b)^n. Term independent of x in (x² + 1/x)^9: solve for r from the power. Worked examples in steps. Misconception killed: "T_r uses nCr" (off-by-one). JEE extension: the multinomial coefficient n!/(p!q!s!) for a term of (a + b + c)^n, derived by the same choose-the-brackets argument (links 1.3, 3.1, 3.2) |
| 4.5 | `middle-and-greatest-terms` | Middle Terms and the Largest Coefficient | Symmetry puts the largest nCr at the middle; n even has one middle term, n odd has two | Middle terms of (x − 2/x)^{10} and (1 + x)^{7}. Ratio T_{r+1}/T_r to find the numerically greatest term in (1 + 2x)^{10} at x = 1/2. Interactive: `pnc-pascal-triangle` row view to see the peak |
| 4.6 | `chapter-4-mastery` | Chapter 4 Mastery | Any single term, coefficient, or middle term, from the counting picture | Mixed mastery incl. a term-independent-of-x problem and an off-by-one trap |

## Chapter 5 — Binomial Coefficients at Work

**Purpose:** Use the theorem as a tool: sums of coefficients, divisibility, approximations; close with where the theorem goes next.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 5.1 | `sums-by-substitution` | Sums by Substitution | Put x = 1 and x = −1 in (1 + x)^n | ΣnCr = 2^n, alternating sum = 0, so even-indexed and odd-indexed sums are both 2^{n−1}. Sum of coefficients of (3x − 2)^7 = 1. Misconception killed: "sum of coefficients = sum of binomial coefficients" (the 3 and −2 matter) |
| 5.2 | `weighted-sums-and-vandermonde` | Weighted Sums and Vandermonde | Use r·nCr = n·(n−1)C(r−1), and count committees from two groups | Σ r·nCr = n·2^{n−1} via the identity (no calculus). Σ (nCr)² = 2nCn by choosing n from 2n people split into two teams. Vandermonde as the general case |
| 5.3 | `divisibility-and-remainders` | Divisibility and Remainders | Write the base as (multiple + small) and expand | 9^n − 8n − 1 divisible by 64. Remainder of 2^{100} on division by 7 (write 8 = 7 + 1). Last two digits of 7^{100}. Comparing 101^{50} with 100^{50} + 99^{50} |
| 5.4 | `approximations` | Binomial Approximations | For small x, (1 + x)^n ≈ 1 + nx; each dropped term is much smaller | `graph-explorer` / `family-gallery` comparing (1 + x)^5 with 1 + 5x and 1 + 5x + 10x². (1.02)^{10} and (0.99)^5 to 3 decimal places. When the approximation fails (x not small). Misconception killed: "(1 + x)^n ≈ 1 + x^n" |
| 5.5 | `beyond-whole-number-powers` | Beyond Whole-Number Powers | For |x| < 1 the pattern continues for negative and fractional n as an infinite series | Preview (JEE enrichment, flagged in a callout): coefficients n(n−1)···(n−r+1)/r! still make sense. `family-gallery` of partial sums of (1 − x)^{−1} and √(1 + x). Why |x| < 1 is required (partial sums of 1/(1−x) at x = 2). √1.02 ≈ 1.01 |
| 5.6 | `chapter-5-mastery` | Chapter 5 Mastery | Full-course diagnostic | Mixed mastery spanning counting models, general term, coefficient sums, divisibility, approximation |

---

## Interactives

### Existing components reused

| Component | Used in | How |
| --------- | ------- | --- |
| `family-gallery` | 5.4, 5.5 | Flip between (1 + x)^n and its truncations / partial sums |
| `graph-explorer` | 5.4 | Drag x on (1 + x)^{10} and compare with the linear readout |
| `function-machine` | 0.2, 1.2 | Slider n → n^r (e.g. `x^4` PIN count) or product-rule count `x*(x-1)` |

The expression grammar (`math-eval.ts`) has no factorial or nCr, so every factorial-based picture needs the new components below.

### New components (3)

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `pnc-counting-tree` | 0.1–0.3, 0.5 | A decision tree that grows stage by stage; leaves counted live. Product mode (one tree) or sum mode (disjoint trees side by side) |
| `pnc-arrangement-lister` | 0.4, 1.1, 1.3, 1.4, 2.1, 3.2 | Lists every arrangement of a small multiset and colours the ones that collapse into the same class (same selection, same word once labels are erased, same rotation), showing total ÷ class size = count. Stars-and-bars display mode |
| `pnc-pascal-triangle` | 4.1–4.5 | Pascal's triangle up to row 12: click an entry to see its paths, highlight patterns, or show row n as the (a + b)^n expansion |

**`pnc-counting-tree` config sketch**
- `component: "pnc-counting-tree"`
- `mode: "product" | "sum"` — one multiplying tree, or separate trees whose leaf counts add
- `stages: { label: string; options: string[] }[]` — product mode: each stage's options branch from every node (2–4 stages, ≤ 5 options each)
- `branches?: { label: string; stages: { label: string; options: string[] }[] }[]` — sum mode: each disjoint case is its own small tree
- `revealStages: boolean` (default true) — a "next stage" button grows the tree one level at a time so the multiplication is seen happening
- `showFormula: boolean` (default true) — live readout "3 × 4 × 2 = 24" (or "6 + 4 = 10")
- `highlightPath?: string[]` — a path of option labels to trace (e.g. one outfit)
- `caption?: string`

**`pnc-arrangement-lister` config sketch**
- `component: "pnc-arrangement-lister"`
- `items: string[]` — the multiset, e.g. `["A","B","C","D"]` or `["B","A","N","A","N","A"]`; repeated strings are identical items
- `r?: number` — how many slots to fill (default: all items)
- `groupBy: "none" | "selection" | "identical" | "rotation" | "rotation-reflection"` — which arrangements are treated as the same; each class gets one colour
- `mode: "line" | "circular"` — draw each arrangement as a row or around a circle
- `display: "sequence" | "stars-bars"` — stars-bars renders `*`/`|` words as sweets-per-child distributions (e.g. `**|*|*` → 2, 1, 1)
- `showLabels: boolean` — subscript identical copies (A₁, A₂) so the overcount is visible before collapsing
- `showSlots: boolean` — slot diagram "4 × 3 × 2" above the list
- `maxShown: number` (default 120) — cap on listed arrangements; beyond it only the counts are shown
- `caption?: string`

**`pnc-pascal-triangle` config sketch**
- `component: "pnc-pascal-triangle"`
- `rows: number` (default 8, max 12)
- `mode: "paths" | "highlight" | "expansion"`
- `initialCell?: { n: number; r: number }` — paths mode: the entry whose paths are drawn and counted
- `pattern?: "row-sum" | "symmetry" | "hockey-stick" | "odd-entries" | "powers-of-11"` — highlight mode
- `expansion?: { a: string; b: string }` — expansion mode: LaTeX labels for the two terms (e.g. `"x"`, `"2"`); row n shown as `nC_r a^{n-r} b^r` with an n slider
- `showFormula: boolean` — show each entry as nCr on hover
- `caption?: string`

---

## Engineering work this course needs

- Schemas for the three new components in `src/modules/content/schemas/blocks.ts`, renderer cases in `components/interactives/index.tsx`.
- Content files `pnc-chapter-{0..5}-content.ts` (mirroring `trig-chapter-*-content.ts`) and a seed script creating the `permutations-combinations-binomial` course row.
- One narrated chapter video per chapter (`videos/scripts/pc-{n}-*.md`, `videos/scenes/pc-{n}-*.py`, rendered to `public/videos/pc-{n}-*.mp4` with a `.jpg` poster) following the trigonometry video pipeline. Each chapter's first lesson opens with its video block.
