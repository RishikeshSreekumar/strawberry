import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Chapter 1 — Limits: The Art of Getting Close.
 * Picks up the 0/0 cliffhanger from Chapter 0 lesson 0.10; consumed by
 * scripts/seed-chapter-1.ts and the rendering smoke test.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "the-idea-of-a-limit",
  title: "1.1 · The Idea of a Limit",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "A speed camera photographs your car. A photograph freezes a single instant — in it, the car isn't moving at all. Yet the ticket says 62 km/h. How can a car have a speed *at an instant*, when speed is distance divided by time, and an instant contains no distance and no time?\n\nThat is the exact wall we hit at the end of Chapter 0. The average rate of change of $f(x) = x^2$ between two points worked fine — until we pushed the two points together and got:",
    },
    { type: "math", latex: "\\frac{f(2) - f(2)}{2 - 2} = \\frac{0}{0}" },
    {
      type: "text",
      content:
        "The fix is a genuinely new idea. Instead of asking *\"what is the value at the point?\"*, ask *\"what value are we closing in on as we approach the point?\"*\n\nHere is the cleanest possible lab specimen. This function is undefined at $x = 2$ — plugging in 2 gives $\\frac{0}{0}$:",
    },
    {
      type: "math",
      latex: "f(x) = \\frac{x^2 - 4}{x - 2}",
    },
    {
      type: "text",
      content:
        "So don't plug in 2. Sneak up on it instead, from both sides, and watch what the outputs do:",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "(x^2 - 4)/(x - 2)",
        exprLatex: "\\frac{x^2 - 4}{x - 2}",
        target: 2,
        hole: true,
        window: { xmin: -1, xmax: 5, ymin: 0, ymax: 8 },
      },
    },
    {
      type: "text",
      content:
        "From the left: $3.9, 3.99, 3.999\\ldots$ From the right: $4.1, 4.01, 4.001\\ldots$ The function never *reaches* a value at $x = 2$ — there is a hole there — but both sides are unmistakably closing in on 4. We say the **limit** is 4.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Limit (informal)",
      content:
        "The limit of $f(x)$ as $x$ approaches $a$ is the value $f(x)$ closes in on as $x$ gets arbitrarily close to $a$ — from both sides — without ever equalling $a$.",
    },
    { type: "text", content: "The notation reads exactly like the sentence:" },
    { type: "math", latex: "\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4" },
    {
      type: "callout",
      variant: "tip",
      content:
        "This is how your speedometer works: it can't measure speed at a true instant, so it measures average speed over an ever-tinier interval — and reports the value those averages close in on. A speedometer is a limit-computing machine.",
    },
    {
      type: "quiz",
      id: "the-idea-of-a-limit-quiz-1",
      variant: "practice",
      question:
        "In the explorer above, $f(1.999) = 3.999$ and $f(2.001) = 4.001$. What is $\\lim_{x \\to 2} f(x)$?",
      options: [
        {
          text: "$4$",
          correct: true,
          feedback:
            "Both sides squeeze in on 4. The limit is the value being approached — whether or not it's ever reached.",
        },
        {
          text: "Undefined, because $f(2)$ doesn't exist",
          feedback:
            "That's the whole point of limits: they ask what happens *near* 2, not *at* 2. Near 2, the outputs hug 4.",
        },
        {
          text: "$\\frac{0}{0}$",
          feedback:
            "$\\frac{0}{0}$ is what plugging in gives you — no answer at all. The limit sidesteps plugging in and reads the trend: 4.",
        },
      ],
    },
    {
      type: "quiz",
      id: "the-idea-of-a-limit-quiz-2",
      variant: "concept",
      question:
        "What is the key difference between $f(2)$ and $\\lim_{x \\to 2} f(x)$?",
      options: [
        {
          text: "$f(2)$ is the value AT 2; the limit is the value APPROACHED near 2.",
          correct: true,
          feedback:
            "Exactly. They often agree for well-behaved functions — but they are different questions, and this chapter lives in the gap between them.",
        },
        {
          text: "They're two notations for the same thing.",
          feedback:
            "The explorer above proves otherwise: $f(2)$ doesn't even exist, yet the limit is a clean 4.",
        },
        {
          text: "The limit is an approximation of $f(2)$.",
          feedback:
            "The limit isn't approximate — it is *exactly* 4. It just answers a different question: the trend near 2, not the value at 2.",
        },
      ],
    },
    {
      type: "quiz",
      id: "the-idea-of-a-limit-quiz-3",
      variant: "mastery",
      question:
        "A drone's altitude readings as it descends toward the ground at time $t = 10$s: at $t = 9.9$, 9.99, 9.999 the altitude is $2.1, 2.01, 2.001$ metres. The camera glitches at exactly $t = 10$. What can you say?",
      options: [
        {
          text: "$\\lim_{t \\to 10} h(t) = 2$ — the readings close in on 2, glitch or not.",
          correct: true,
          feedback:
            "The limit only cares about the approach. Missing (or wrong) data at the exact instant changes nothing.",
        },
        {
          text: "Nothing — without the $t = 10$ reading there's no answer.",
          feedback:
            "This is precisely where limits shine: the trend of nearby values is complete information about the approach.",
        },
        {
          text: "The altitude at $t = 10$ must be 2.",
          feedback:
            "Careful — the limit says the readings *approach* 2. What actually happens at the instant is a separate question (the glitch could report anything).",
        },
      ],
      hint: "Which question does a limit answer: at the point, or near the point?",
    },
    {
      type: "text",
      content:
        "**Worked example — estimating a limit from a table.** One of the most famous limits in mathematics: what is $\\lim_{x \\to 0} \\frac{\\sin x}{x}$? (Angle in radians.) Plugging in gives $\\frac{0}{0}$, so build a table instead:\n\nStep 1: pick inputs marching toward 0 from both sides.\nStep 2: compute the outputs.\nStep 3: read the trend.",
    },
    {
      type: "table",
      headers: ["$x$", "$\\frac{\\sin x}{x}$"],
      rows: [
        ["$-0.5$", "$0.9589$"],
        ["$-0.1$", "$0.9983$"],
        ["$-0.01$", "$0.99998$"],
        ["$0.01$", "$0.99998$"],
        ["$0.1$", "$0.9983$"],
        ["$0.5$", "$0.9589$"],
      ],
    },
    {
      type: "text",
      content:
        "Both columns squeeze in on 1 symmetrically. Conclusion: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ — a limit no amount of plugging-in could ever find, read cleanly off the approach. (This particular limit later becomes the engine behind the derivative of $\\sin$.)",
    },
    {
      type: "quiz",
      id: "the-idea-of-a-limit-quiz-4",
      variant: "practice",
      question:
        "A table for $f$ near $x = 3$ shows: $f(2.9) = 5.8$, $f(2.99) = 5.98$, $f(3.01) = 6.02$, $f(3.1) = 6.2$. Best estimate of $\\lim_{x \\to 3} f(x)$?",
      options: [
        {
          text: "$6$",
          correct: true,
          feedback:
            "From below: $5.8, 5.98, \\ldots$ climbing toward 6. From above: $6.2, 6.02, \\ldots$ descending toward 6. Consensus: 6.",
        },
        {
          text: "$5.98$ — the closest value from the left",
          feedback:
            "The limit is the trend's destination, not the last sample taken. Both sides are converging on 6.",
        },
        {
          text: "Can't tell without knowing $f(3)$",
          feedback:
            "$f(3)$ is irrelevant to the limit — the approach is complete information, and it points to 6.",
        },
      ],
      hint: "Read each side's trend separately, then check they agree.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "limits-dont-care-about-the-point",
  title: "1.2 · Limits Don't Care About the Point",
  position: 2,
  blocks: blocks([
    {
      type: "callout",
      variant: "warning",
      title: "The misconception this lesson exists to kill",
      content:
        "$\\lim_{x \\to a} f(x)$ has nothing to do with $f(a)$. The function's value at $a$ can be different, missing, or ridiculous — the limit doesn't even glance at it.",
    },
    {
      type: "text",
      content:
        "Here is a deliberately spiteful function. It's our friend from last lesson, except someone has *defined* the value at $x = 2$ to be 1:",
    },
    {
      type: "math",
      latex:
        "g(x) = \\begin{cases} \\dfrac{x^2 - 4}{x - 2} & x \\ne 2 \\\\ 1 & x = 2 \\end{cases}",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "(x^2 - 4)/(x - 2)",
        exprLatex: "\\frac{x^2-4}{x-2} \\;\\; (x \\ne 2)",
        target: 2,
        hole: true,
        valueAtTarget: 1,
        window: { xmin: -1, xmax: 5, ymin: 0, ymax: 8 },
      },
    },
    {
      type: "text",
      content:
        "The lone dot at height 1 is $g(2)$. The open circle at height 4 is where the curve is heading. Squeeze in from both sides: the outputs march to 4 and completely ignore the dot.",
    },
    { type: "math", latex: "\\lim_{x \\to 2} g(x) = 4 \\qquad \\text{but} \\qquad g(2) = 1" },
    {
      type: "text",
      content: "So there are three separate situations, and you should be able to tell them apart on sight:",
    },
    {
      type: "table",
      headers: ["Situation", "$f(a)$", "$\\lim_{x \\to a} f(x)$"],
      rows: [
        ["Nice point (e.g. $x^2$ at $a=2$)", "$4$", "$4$ — they agree"],
        ["Hole (our $\\frac{x^2-4}{x-2}$)", "undefined", "$4$ — limit exists anyway"],
        ["Relocated dot (the $g$ above)", "$1$", "$4$ — limit ignores the dot"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      content:
        "When value and limit *do* agree, the function is called continuous at that point — a big enough idea to get its own lesson (1.8). The mismatch cases are exactly what make limits worth defining.",
    },
    {
      type: "quiz",
      id: "limits-dont-care-quiz-1",
      variant: "practice",
      question: "For the function $g$ above, what is $\\lim_{x \\to 2} g(x)$?",
      options: [
        {
          text: "$4$",
          correct: true,
          feedback:
            "Approaching from either side, the outputs head to 4. The relocated dot at height 1 is invisible to the limit.",
        },
        {
          text: "$1$",
          feedback:
            "$1$ is $g(2)$ — the value AT the point. The limit reads the approach, and the approach says 4.",
        },
        {
          text: "It doesn't exist, because the graph is broken at 2",
          feedback:
            "A limit needs the two sides to agree on a target — and they do: both head to 4. Broken-looking graphs can have perfectly good limits.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limits-dont-care-quiz-2",
      variant: "concept",
      question:
        "Someone changes $g(2)$ from 1 to 100. What happens to $\\lim_{x \\to 2} g(x)$?",
      options: [
        {
          text: "Nothing — it's still 4.",
          correct: true,
          feedback:
            "You could move that dot to a million; the limit never looks at the point itself, only at the neighbourhood.",
        },
        {
          text: "It becomes 100.",
          feedback:
            "That changes $g(2)$, the value at the point. The limit is computed entirely from nearby values, which still march to 4.",
        },
        {
          text: "It stops existing.",
          feedback:
            "Existence of the limit depends on the two-sided approach agreeing — which it still does, at 4.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limits-dont-care-quiz-3",
      variant: "mastery",
      question:
        "True or false: if $\\lim_{x \\to 3} f(x) = 7$, then $f(3) = 7$.",
      options: [
        {
          text: "False — $f(3)$ could be 7, something else, or undefined.",
          correct: true,
          feedback:
            "The limit constrains the neighbourhood of 3, never the point itself. All three mismatch patterns from the table are possible.",
        },
        {
          text: "True — that's what the limit means.",
          feedback:
            "The $g$ above is the counterexample: limit 4, value 1. Limit and value are independent facts.",
        },
      ],
      hint: "Think of the relocated-dot function.",
    },
    {
      type: "text",
      content:
        "**Worked example — reading all three quantities off one function.** Let",
    },
    {
      type: "math",
      latex:
        "h(x) = \\begin{cases} x + 1 & x \\ne 0 \\\\ 5 & x = 0 \\end{cases}",
    },
    {
      type: "text",
      content:
        "Find $h(0)$, $\\lim_{x \\to 0^-} h(x)$, and $\\lim_{x \\to 0} h(x)$.\n\nStep 1 — the value: the $x = 0$ rule says $h(0) = 5$. Done; no limits involved.\nStep 2 — the approach: for every $x \\ne 0$ (which is ALL the limit looks at), $h(x) = x + 1$. From the left: $0.9, 0.99, \\ldots \\to 1$.\nStep 3 — the right side gives $1.1, 1.01, \\ldots \\to 1$ as well. Sides agree, so $\\lim_{x \\to 0} h(x) = 1$.\n\nSummary: value 5, limit 1, and the two never interact. When asked about a limit of a piecewise function, the rule *at* the point is the one piece of information you may completely ignore.",
    },
    {
      type: "quiz",
      id: "limits-dont-care-quiz-4",
      variant: "practice",
      question:
        "For the $h$ above: a classmate answers \"$\\lim_{x \\to 0} h(x) = 5$, because $h(0) = 5$.\" What's the error?",
      options: [
        {
          text: "They read the value at the point instead of the trend near it — the nearby outputs follow $x + 1$, heading to 1.",
          correct: true,
          feedback:
            "Exactly the confusion this lesson kills. The limit consults only $x \\ne 0$, where $h$ is $x + 1$: limit 1, value 5.",
        },
        {
          text: "Nothing — the limit really is 5.",
          feedback:
            "Check inputs near 0: $h(0.01) = 1.01$, $h(-0.01) = 0.99$. The approach targets 1; the lone dot at 5 has no vote.",
        },
        {
          text: "The limit should be the average of 1 and 5.",
          feedback:
            "Limits never compromise. The approach (both sides) says 1, so the limit is exactly 1 — the value 5 is simply a separate fact.",
        },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "one-sided-limits",
  title: "1.3 · One-Sided Limits",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A parking garage charges ₹50 for anything up to an hour, then jumps to ₹80 the moment you cross into the second hour. Stand at the one-hour mark and ask: what does the price *approach*?\n\nIt depends which direction you come from. Approaching 60 minutes from below, the price is glued to ₹50. Approaching from above, it's glued to ₹80. The two approaches disagree — and that disagreement needs its own notation.",
    },
    {
      type: "math",
      latex:
        "\\lim_{x \\to a^-} f(x) \\; \\text{(from the left)} \\qquad \\lim_{x \\to a^+} f(x) \\; \\text{(from the right)}",
    },
    {
      type: "text",
      content:
        "The little minus means \"from below\", the plus means \"from above\". Here's a function with the same personality as the parking garage — slide across $x = 1$ and watch each side commit to a different height:",
    },
    {
      type: "interactive",
      config: {
        component: "piecewise-explorer",
        breakpoint: 1,
        breakBelongsTo: "right",
        leftExpr: "x + 1",
        leftLatex: "x + 1",
        rightExpr: "4 - x",
        rightLatex: "4 - x",
        window: { xmin: -2, xmax: 4, ymin: -1, ymax: 5 },
        initial: -1,
      },
    },
    {
      type: "text",
      content:
        "Read the two approaches off the graph. Coming from the left, the heights are $1.9, 1.99, 1.999\\ldots$ Coming from the right: $3.1, 3.01, 3.001\\ldots$",
    },
    {
      type: "math",
      latex:
        "\\lim_{x \\to 1^-} f(x) = 2 \\qquad \\lim_{x \\to 1^+} f(x) = 3",
    },
    {
      type: "callout",
      variant: "definition",
      title: "When does the (two-sided) limit exist?",
      content:
        "$\\lim_{x \\to a} f(x)$ exists exactly when both one-sided limits exist and agree. Then the limit is that shared value. If they disagree, the two-sided limit does not exist.",
    },
    {
      type: "text",
      content:
        "So for the function above, $\\lim_{x \\to 1} f(x)$ simply does not exist — not \"is zero\", not \"is both\" — it fails to exist, because the left and right approaches never reconcile. Note that $f(1) = 3$ exists just fine; once again, value and limit are separate stories.",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "Jumps like this are everywhere in real pricing: postage by weight bands, tax brackets, surge pricing tiers, mobile data charges. Whenever a rule changes abruptly at a threshold, the one-sided limits at that threshold disagree.",
    },
    {
      type: "quiz",
      id: "one-sided-limits-quiz-1",
      variant: "practice",
      question:
        "For the function in the explorer, what is $\\lim_{x \\to 1^-} f(x)$?",
      options: [
        {
          text: "$2$",
          correct: true,
          feedback:
            "From the left the active rule is $x + 1$, and as $x \\to 1$ that heads to 2. (The open circle: approached, never claimed.)",
        },
        {
          text: "$3$",
          feedback:
            "$3$ is the right-side approach (and the actual value $f(1)$). The minus sign asks about the left side, ruled by $x+1 \\to 2$.",
        },
        {
          text: "It doesn't exist",
          feedback:
            "Each one-sided limit is fine on its own — the left side marches steadily to 2. It's the *two-sided* limit that fails.",
        },
      ],
    },
    {
      type: "quiz",
      id: "one-sided-limits-quiz-2",
      variant: "concept",
      question:
        "Left limit 2, right limit 3. What is $\\lim_{x \\to 1} f(x)$?",
      options: [
        {
          text: "It does not exist.",
          correct: true,
          feedback:
            "A two-sided limit demands consensus. $2 \\ne 3$, so there is no single value being approached — the limit fails to exist.",
        },
        {
          text: "$2.5$, the average",
          feedback:
            "Tempting, but no: the limit isn't a compromise. It must be the value BOTH sides approach, and no such value exists here.",
        },
        {
          text: "$3$, because $f(1) = 3$",
          feedback:
            "The value at the point can't rescue a disagreement in the approaches. Limits don't care about the point.",
        },
      ],
    },
    {
      type: "quiz",
      id: "one-sided-limits-quiz-3",
      variant: "mastery",
      question:
        "An online store ships free below 5 kg and charges ₹200 at 5 kg and above. $S(w)$ is the shipping cost. Which statement is right?",
      options: [
        {
          text: "$\\lim_{w \\to 5^-} S(w) = 0$, $\\lim_{w \\to 5^+} S(w) = 200$, and $\\lim_{w \\to 5} S(w)$ does not exist.",
          correct: true,
          feedback:
            "Below the threshold the cost hugs 0; above, it hugs 200. Disagreement — so no two-sided limit. You just did real-world one-sided analysis.",
        },
        {
          text: "$\\lim_{w \\to 5} S(w) = 200$, because $S(5) = 200$.",
          feedback:
            "$S(5) = 200$ is the value at the point. The left approach hugs 0, so the two sides disagree and the two-sided limit fails.",
        },
        {
          text: "$\\lim_{w \\to 5} S(w) = 100$, splitting the difference.",
          feedback:
            "Limits never average the sides. Either both sides agree on one value, or the limit does not exist.",
        },
      ],
      hint: "Handle each side separately first, then compare.",
    },
    {
      type: "text",
      content:
        "**Worked example — when the sides DO agree.** Not every piecewise function jumps. Take",
    },
    {
      type: "math",
      latex:
        "f(x) = \\begin{cases} x^2 & x < 2 \\\\ 6 - x & x \\ge 2 \\end{cases}",
    },
    {
      type: "text",
      content:
        "Does $\\lim_{x \\to 2} f(x)$ exist?\n\nStep 1 — left side: for $x < 2$ the rule is $x^2$, so $\\lim_{x \\to 2^-} f(x) = 2^2 = 4$.\nStep 2 — right side: for $x > 2$ the rule is $6 - x$, so $\\lim_{x \\to 2^+} f(x) = 6 - 2 = 4$.\nStep 3 — compare: $4 = 4$. The sides agree, so $\\lim_{x \\to 2} f(x) = 4$.\n\nTwo different formulas can still splice together seamlessly — the pieces happen to meet at height 4. A piecewise boundary is always a *question*, never automatically a jump. Run the two-sided check every time.",
    },
    {
      type: "quiz",
      id: "one-sided-limits-quiz-4",
      variant: "practice",
      question:
        "The sign-reading function $f(x) = \\dfrac{|x|}{x}$ outputs $1$ for positive $x$ and $-1$ for negative $x$. What are its one-sided limits at 0?",
      options: [
        {
          text: "$\\lim_{x \\to 0^-} f(x) = -1$, $\\lim_{x \\to 0^+} f(x) = 1$ — so the two-sided limit does not exist.",
          correct: true,
          feedback:
            "Each side is locked to a constant, and the constants disagree. This little function is the purest possible jump.",
        },
        {
          text: "Both are 0 — the function is heading to $f(0)$.",
          feedback:
            "$f$ never outputs 0 anywhere ($f(0)$ isn't even defined: $\\frac00$). Left of 0 it's frozen at $-1$; right of 0, at $1$.",
        },
        {
          text: "Both are 1, since $|x|$ makes everything positive.",
          feedback:
            "$|x|$ is positive, but the bottom $x$ keeps its sign. Test $x = -2$: $\\frac{|-2|}{-2} = \\frac{2}{-2} = -1$. The left side is glued to $-1$.",
        },
      ],
      hint: "Test one number from each side: $x = -2$ and $x = 2$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "when-limits-fail",
  title: "1.4 · When Limits Fail",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A limit is a promise: \"the outputs settle on one finite value.\" That promise can be broken in exactly three ways, and you've already met the first.\n\n**Failure 1 — the jump.** Left and right approaches disagree (last lesson's parking garage). Each side settles, but on different values.\n\n**Failure 2 — the blow-up.** The outputs don't settle on any finite value; they run away. Watch:",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "1/x^2",
        exprLatex: "\\frac{1}{x^2}",
        target: 0,
        hole: false,
        window: { xmin: -3, xmax: 3, ymin: 0, ymax: 20 },
      },
    },
    {
      type: "text",
      content:
        "Squeeze toward 0 and the outputs are $1$, then $4$, then $100$, then $10{,}000$… no settling, just escape. The graph climbs a wall on both sides of $x = 0$ — a **vertical asymptote**. We summarize the *manner* of failure by writing:",
    },
    { type: "math", latex: "\\lim_{x \\to 0} \\frac{1}{x^2} = \\infty" },
    {
      type: "callout",
      variant: "warning",
      content:
        "Writing $= \\infty$ does not mean the limit exists and equals some number called infinity. It's shorthand for a specific *kind* of non-existence: the outputs grow without bound. (For $\\frac{1}{x}$ it's even messier: $-\\infty$ from the left, $+\\infty$ from the right.)",
    },
    {
      type: "text",
      content:
        "**Failure 3 — the identity crisis.** The strangest one. Here is $\\sin\\left(\\frac{1}{x}\\right)$ near $x = 0$: as $x$ shrinks, $\\frac{1}{x}$ spins through thousands of radians, so the sine oscillates faster and faster. The outputs never run away — they stay between $-1$ and $1$ — but they never settle either:",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "sin(1/x)",
        exprLatex: "\\sin\\!\\left(\\frac{1}{x}\\right)",
        target: 0,
        hole: false,
        window: { xmin: -1.2, xmax: 1.2, ymin: -1.5, ymax: 1.5 },
      },
    },
    {
      type: "text",
      content:
        "Look at the table: $0.84$, $0.91$, $-0.54$, $-0.51$, $0.83$… tightening the squeeze doesn't calm it down, it makes it worse. No trend, no limit.",
    },
    {
      type: "table",
      headers: ["Failure mode", "What the outputs do", "Example"],
      rows: [
        ["Jump", "each side settles, on different values", "parking garage at the hour mark"],
        ["Blow-up", "grow without bound (vertical asymptote)", "$\\frac{1}{x^2}$ at $x = 0$"],
        ["Oscillation", "bounce forever, never choosing", "$\\sin(1/x)$ at $x = 0$"],
      ],
    },
    {
      type: "quiz",
      id: "when-limits-fail-quiz-1",
      variant: "practice",
      question:
        "As $x \\to 0$, the outputs of $\\frac{1}{x^2}$ go $1, 4, 100, 10000, \\ldots$ Does $\\lim_{x \\to 0} \\frac{1}{x^2}$ exist?",
      options: [
        {
          text: "No — the outputs grow without bound. We write $= \\infty$ to describe the failure.",
          correct: true,
          feedback:
            "A limit must be a finite settling value. $\\infty$ is a description of runaway behaviour, not a destination.",
        },
        {
          text: "Yes, and it equals infinity.",
          feedback:
            "Sneaky wording: $= \\infty$ is notation for a specific way of NOT existing. There's no number the outputs settle on.",
        },
        {
          text: "Yes, it's 10,000 — the biggest value in the table.",
          feedback:
            "Keep squeezing: the next rows would show $10^6$, $10^8$… any candidate value gets left behind.",
        },
      ],
    },
    {
      type: "quiz",
      id: "when-limits-fail-quiz-2",
      variant: "concept",
      question:
        "Why does $\\lim_{x \\to 0} \\sin(1/x)$ fail, when the outputs never even leave $[-1, 1]$?",
      options: [
        {
          text: "Staying bounded isn't enough — the outputs must settle on ONE value, and these keep oscillating forever.",
          correct: true,
          feedback:
            "Exactly. Bounded but indecisive still breaks the promise. A limit demands commitment.",
        },
        {
          text: "It doesn't fail — the limit is 0, the middle of the oscillation.",
          feedback:
            "The outputs don't cluster toward 0 — they keep swinging fully to $\\pm 1$ no matter how tight the squeeze. No single value is approached.",
        },
        {
          text: "Because $\\sin(1/0)$ is undefined.",
          feedback:
            "Being undefined AT the point never bothers a limit (lesson 1.2). The problem is the behaviour NEAR 0: eternal indecision.",
        },
      ],
    },
    {
      type: "quiz",
      id: "when-limits-fail-quiz-3",
      variant: "mastery",
      question:
        "Match the situation: a server's response time as load approaches its capacity limit — response times grow past every bound. Which failure mode is this?",
      options: [
        {
          text: "Blow-up: a vertical asymptote at the capacity point.",
          correct: true,
          feedback:
            "Queueing systems behave like $\\frac{1}{c - x}$ as load $x$ approaches capacity $c$: response time grows without bound. Engineers keep utilization below the asymptote for exactly this reason.",
        },
        {
          text: "Jump: the two sides disagree.",
          feedback:
            "A jump settles on two different finite values. Here nothing settles — the times run away past every bound. That's a blow-up.",
        },
        {
          text: "Oscillation: the values never choose.",
          feedback:
            "Oscillation stays bounded while refusing to settle. Runaway growth past every bound is the blow-up mode.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — a blow-up with a twist.** Classify $\\lim_{x \\to 0} \\frac{1}{x}$ (note: not $\\frac{1}{x^2}$).\n\nStep 1 — right side: $x = 0.1, 0.01, 0.001$ gives $10, 100, 1000$ — climbing to $+\\infty$.\nStep 2 — left side: $x = -0.1, -0.01$ gives $-10, -100$ — plunging to $-\\infty$.\nStep 3 — verdict: both sides blow up, but in *opposite directions*. There's a vertical asymptote at $x = 0$, yet we can't even write $= \\infty$ as a summary, because the sides can't agree on which infinity. The honest statement uses one-sided notation:",
    },
    {
      type: "math",
      latex:
        "\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty \\qquad \\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty",
    },
    {
      type: "text",
      content:
        "Compare with $\\frac{1}{x^2}$, where squaring forces both sides positive and up they go together. One exponent changes the whole geometry — always check each side's *sign*, not just its size.",
    },
    {
      type: "quiz",
      id: "when-limits-fail-quiz-4",
      variant: "practice",
      question:
        "Classify $\\lim_{x \\to 3} \\dfrac{1}{(x - 3)^2}$.",
      options: [
        {
          text: "Blow-up: both sides climb to $+\\infty$ — write $= \\infty$.",
          correct: true,
          feedback:
            "The square makes the denominator tiny AND positive on both sides of 3, so the outputs rocket upward together. Vertical asymptote at $x = 3$.",
        },
        {
          text: "The limit is 0, since the fraction's top is small compared to big inputs.",
          feedback:
            "Near $x = 3$ the DENOMINATOR is what shrinks — dividing by something tiny makes the result huge, not small.",
        },
        {
          text: "Jump: the sides land on different values.",
          feedback:
            "A jump means two different finite landings. Here neither side lands anywhere — both run away upward. Blow-up.",
        },
      ],
      hint: "What sign does $(x-3)^2$ have on each side of 3?",
    },
    {
      type: "quiz",
      id: "when-limits-fail-quiz-5",
      variant: "concept",
      question:
        "Sort each limit into its failure mode (or non-failure): (A) $\\lim_{x \\to 0} \\cos(1/x)$, (B) $\\lim_{x \\to 0} \\frac{1}{x^4}$, (C) $\\lim_{x \\to 0} (x + 2)$.",
      options: [
        {
          text: "A oscillates, B blows up, C exists and equals 2.",
          correct: true,
          feedback:
            "A swings forever in $[-1,1]$ like its sine cousin; B's even power sends both sides to $+\\infty$; C is a polite polynomial — plug in.",
        },
        {
          text: "All three fail — anything happening at 0 is trouble.",
          feedback:
            "C is perfectly healthy: $x + 2 \\to 2$ as $x \\to 0$. Limits at 0 are only interesting when the FUNCTION misbehaves there, and $x+2$ doesn't.",
        },
        {
          text: "A blows up, B oscillates, C jumps.",
          feedback:
            "Swapped: cosine of a huge spinning angle OSCILLATES (bounded, never settling); $\\frac{1}{x^4}$ BLOWS UP; and C doesn't fail at all — it's 2.",
        },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "limit-laws",
  title: "1.5 · Computing Limits: The Laws",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "So far we've found limits by squinting at tables. That was for understanding — nobody computes real limits that way. The good news: limits respect arithmetic. If $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$, then:",
    },
    {
      type: "table",
      headers: ["Law", "Statement"],
      rows: [
        ["Sum", "$\\lim_{x \\to a} [f(x) + g(x)] = L + M$"],
        ["Difference", "$\\lim_{x \\to a} [f(x) - g(x)] = L - M$"],
        ["Product", "$\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M$"],
        ["Quotient", "$\\lim_{x \\to a} \\dfrac{f(x)}{g(x)} = \\dfrac{L}{M}$, provided $M \\ne 0$"],
        ["Constant multiple", "$\\lim_{x \\to a} c \\cdot f(x) = c \\cdot L$"],
      ],
    },
    {
      type: "text",
      content:
        "Stack these laws on the two trivial limits $\\lim_{x \\to a} x = a$ and $\\lim_{x \\to a} c = c$, and something wonderful falls out: for any polynomial — and any rational function whose denominator isn't 0 at the target — the limit is found by *just plugging in*.",
    },
    { type: "math", latex: "\\lim_{x \\to 2} (x^2 + 3x - 1) = 2^2 + 3(2) - 1 = 9" },
    {
      type: "callout",
      variant: "tip",
      title: "Direct substitution — always the first move",
      content:
        "Try plugging in $a$. If you get a clean number, that's the limit — done. The interesting cases are exactly when plugging in fails: a nonzero number over 0 (blow-up, lesson 1.4) or $\\frac{0}{0}$ (a puzzle with a hidden answer — next lesson).",
    },
    {
      type: "text",
      content:
        "So the workflow is a triage. Plug in and look at what comes out:",
    },
    {
      type: "table",
      headers: ["Plugging in gives", "Diagnosis"],
      rows: [
        ["a number", "that's the limit — finished"],
        ["$\\frac{\\text{nonzero}}{0}$", "blow-up: vertical asymptote, no (finite) limit"],
        ["$\\frac{0}{0}$", "no verdict yet — algebra needed (lesson 1.6)"],
      ],
    },
    {
      type: "quiz",
      id: "limit-laws-quiz-1",
      variant: "practice",
      question: "What is $\\lim_{x \\to 3} (2x^2 - 5)$?",
      options: [
        {
          text: "$13$",
          correct: true,
          feedback: "Polynomial → plug in: $2(9) - 5 = 13$. No drama.",
        },
        {
          text: "$7$",
          feedback: "Check the squaring: $2 \\cdot 3^2 = 18$, then $18 - 5 = 13$.",
        },
        {
          text: "It needs a table of nearby values.",
          feedback:
            "Tables built the concept, but the limit laws license plugging in for polynomials: $2(3)^2 - 5 = 13$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limit-laws-quiz-2",
      variant: "practice",
      question: "What is $\\lim_{x \\to 1} \\dfrac{x + 4}{x - 3}$?",
      options: [
        {
          text: "$-\\dfrac{5}{2}$",
          correct: true,
          feedback:
            "Denominator at $x=1$ is $-2 \\ne 0$, so plug in: $\\frac{5}{-2}$. The quotient law approves.",
        },
        {
          text: "It doesn't exist — there's an $x - 3$ in the denominator.",
          feedback:
            "The danger zone is $x = 3$, but we're taking the limit at $x = 1$, where the denominator is a safe $-2$. Plug in: $-\\frac52$.",
        },
        {
          text: "$5$",
          feedback: "That's just the numerator. Divide by the denominator $1 - 3 = -2$ to get $-\\frac52$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limit-laws-quiz-3",
      variant: "mastery",
      question:
        "Triage these: (A) $\\lim_{x \\to 2} \\frac{x+1}{x-2}$, (B) $\\lim_{x \\to 2} \\frac{x^2-4}{x-2}$. Which diagnosis is right?",
      options: [
        {
          text: "A gives $\\frac{3}{0}$ — blow-up. B gives $\\frac{0}{0}$ — needs algebra.",
          correct: true,
          feedback:
            "A nonzero top over a vanishing bottom must explode. $\\frac00$ is different: both parts die together, and the true behaviour is hidden until you do algebra.",
        },
        {
          text: "Both are $\\frac{\\cdot}{0}$, so neither has a limit.",
          feedback:
            "The numerators differ! B's numerator ALSO hits 0, giving $\\frac00$ — and you already know from lesson 1.1 that B's limit is actually 4.",
        },
        {
          text: "Both need tables of values.",
          feedback:
            "Triage first: A is a clean blow-up ($\\frac30$). B is $\\frac00$, and next lesson's algebra beats any table.",
        },
      ],
      hint: "Evaluate top and bottom separately at $x = 2$.",
    },
    {
      type: "text",
      content:
        "**Worked example — a full computation, law by law.** Compute $\\lim_{x \\to 2} \\dfrac{x^3 - 2x + 1}{x + 3}$.\n\nStep 1 — triage the denominator: at $x = 2$ it's $5 \\ne 0$, so the quotient law applies and plugging in is licensed.\nStep 2 — numerator: $2^3 - 2(2) + 1 = 8 - 4 + 1 = 5$.\nStep 3 — assemble:",
    },
    {
      type: "math",
      latex:
        "\\lim_{x \\to 2} \\frac{x^3 - 2x + 1}{x + 3} = \\frac{5}{5} = 1",
    },
    {
      type: "text",
      content:
        "Every worked limit in this course starts exactly this way: check the denominator, then substitute. Only when the check fails does anything more interesting happen.",
    },
    {
      type: "quiz",
      id: "limit-laws-quiz-4",
      variant: "practice",
      question: "What is $\\lim_{x \\to -2} \\dfrac{x^2 + 4}{x + 1}$?",
      options: [
        {
          text: "$-8$",
          correct: true,
          feedback:
            "Denominator at $-2$ is $-1 \\ne 0$: safe to substitute. $\\frac{(-2)^2 + 4}{-2 + 1} = \\frac{8}{-1} = -8$. Mind both signs.",
        },
        {
          text: "$8$",
          feedback:
            "The numerator is 8, but the denominator is $-2 + 1 = -1$. The quotient is $-8$.",
        },
        {
          text: "$\\frac{0}{0}$ — needs algebra",
          feedback:
            "Check before declaring: numerator $= 8$, denominator $= -1$. Neither is 0, so plug in: $-8$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limit-laws-quiz-5",
      variant: "mastery",
      question:
        "Full triage, three patients: (A) $\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$, (B) $\\lim_{x \\to 1} \\frac{x^2 + 1}{x - 1}$, (C) $\\lim_{x \\to 1} \\frac{x^2 + 1}{x + 1}$. Which diagnosis chart is right?",
      options: [
        {
          text: "A: $\\frac00$, algebra needed. B: $\\frac20$, blow-up. C: healthy — limit is 1.",
          correct: true,
          feedback:
            "Three near-identical fractions, three different fates — everything hinges on what top and bottom do at the target. (C: $\\frac{1+1}{1+1} = 1$.)",
        },
        {
          text: "All three are $\\frac{\\cdot}{0}$ cases with no limit.",
          feedback:
            "Only A and B have a vanishing denominator ($x - 1 \\to 0$); C's denominator is $x + 1 \\to 2$. And A's $\\frac00$ hides a real answer (it's 2, via next lesson's algebra).",
        },
        {
          text: "A: blow-up. B: $\\frac00$. C: healthy.",
          feedback:
            "Check A's numerator: $1^2 - 1 = 0$, so A is $\\frac00$ (the puzzle). B's numerator is $2 \\ne 0$, so B is $\\frac20$: the blow-up.",
        },
      ],
      hint: "For each: evaluate numerator and denominator separately at $x = 1$ before deciding anything.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "the-zero-over-zero-puzzle",
  title: "1.6 · The 0/0 Puzzle: Algebra to the Rescue",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "$\\frac{0}{0}$ is not an answer — it's a disguise. It means numerator and denominator share a common cause of death at the target, and the cure is to find it, cancel it, and look again.\n\n**Trick 1 — factor and cancel.** Our chapter mascot:",
    },
    {
      type: "math",
      latex:
        "\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x - 2} = \\lim_{x \\to 2} (x + 2) = 4",
    },
    {
      type: "text",
      content:
        "Wait — are we allowed to cancel $(x - 2)$? At $x = 2$ that would be cancelling $\\frac{0}{0}$. But remember what a limit is: $x$ *approaches* 2 and never equals it. For every $x$ the limit actually looks at, $x - 2$ is a perfectly nonzero number, and cancelling is legal. The limit's \"never touch the point\" rule is exactly the loophole that makes the algebra valid.",
    },
    {
      type: "callout",
      variant: "info",
      content:
        "$\\frac{x^2-4}{x-2}$ and $x + 2$ are the same function everywhere except $x = 2$ — one has a hole there, the other doesn't. Since limits ignore the point itself, they can't tell the two apart. That's why swapping one for the other is fair.",
    },
    {
      type: "text",
      content:
        "**Trick 2 — rationalize.** When square roots cause the $\\frac00$, multiply by the conjugate. Try to guess this one from the picture first:",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "(sqrt(x + 4) - 2)/x",
        exprLatex: "\\frac{\\sqrt{x+4} - 2}{x}",
        target: 0,
        hole: true,
        window: { xmin: -4, xmax: 4, ymin: 0, ymax: 0.6 },
      },
    },
    {
      type: "text",
      content: "The table whispers $0.25$. The algebra confirms it:",
    },
    {
      type: "math",
      latex:
        "\\frac{\\sqrt{x+4}-2}{x} \\cdot \\frac{\\sqrt{x+4}+2}{\\sqrt{x+4}+2} = \\frac{x+4-4}{x(\\sqrt{x+4}+2)} = \\frac{1}{\\sqrt{x+4}+2} \\;\\xrightarrow{\\,x \\to 0\\,}\\; \\frac{1}{4}",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "The playbook for $\\frac{0}{0}$: factor & cancel for polynomials, conjugate for square roots, simplify for fractions-inside-fractions. In every case you're unmasking a simpler function that agrees everywhere except the point — then plugging in.",
    },
    {
      type: "quiz",
      id: "zero-over-zero-quiz-1",
      variant: "practice",
      question: "Compute $\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}$.",
      options: [
        {
          text: "$6$",
          correct: true,
          feedback:
            "$\\frac{(x-3)(x+3)}{x-3} = x + 3$ away from 3, and $3 + 3 = 6$.",
        },
        {
          text: "$0$",
          feedback:
            "Plugging in gave $\\frac00$ — that's the disguise, not the answer. Factor: $x^2 - 9 = (x-3)(x+3)$, cancel, get $x+3 \\to 6$.",
        },
        {
          text: "It doesn't exist.",
          feedback:
            "$\\frac00$ doesn't mean 'no limit' — it means 'no verdict yet'. The algebra reveals a clean 6.",
        },
      ],
      hint: "Difference of squares.",
    },
    {
      type: "quiz",
      id: "zero-over-zero-quiz-2",
      variant: "concept",
      question:
        "Why is cancelling $(x-2)$ legal when computing $\\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x-2}$?",
      options: [
        {
          text: "Because the limit only uses $x \\ne 2$, where $x - 2$ is a nonzero number.",
          correct: true,
          feedback:
            "The definition's fine print — approach, never touch — is doing real work here. It's what turns forbidden division into legal cancellation.",
        },
        {
          text: "Because $\\frac{0}{0} = 1$, so the factors cancel to 1.",
          feedback:
            "$\\frac00$ is undefined, never 1. The cancellation happens at the nearby points the limit examines, where both factors are honest nonzero numbers.",
        },
        {
          text: "It isn't really legal — it's an approximation that happens to work.",
          feedback:
            "It's exact. For every $x$ the limit inspects, the equality $\\frac{(x-2)(x+2)}{x-2} = x+2$ holds perfectly.",
        },
      ],
    },
    {
      type: "quiz",
      id: "zero-over-zero-quiz-3",
      variant: "mastery",
      question:
        "Which first move cracks $\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 9} - 3}{x}$?",
      options: [
        {
          text: "Multiply top and bottom by $\\sqrt{x+9} + 3$.",
          correct: true,
          feedback:
            "The conjugate. Top becomes $x$, cancel with the bottom, leaving $\\frac{1}{\\sqrt{x+9}+3} \\to \\frac16$.",
        },
        {
          text: "Plug in $x = 0$.",
          feedback:
            "That's always the first *test* — but here it returns $\\frac00$, which is the signal to bring algebra: multiply by the conjugate $\\sqrt{x+9}+3$.",
        },
        {
          text: "Factor the numerator as a difference of squares.",
          feedback:
            "$\\sqrt{x+9} - 3$ doesn't factor like a polynomial. Roots call for the conjugate trick: multiply by $\\sqrt{x+9}+3$.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — when BOTH top and bottom need factoring.** Compute $\\lim_{x \\to 1} \\dfrac{x^2 + x - 2}{x^2 - 1}$.\n\nStep 1 — triage: at $x = 1$, top is $1 + 1 - 2 = 0$, bottom is $0$. A genuine $\\frac00$.\nStep 2 — factor both. Top: $x^2 + x - 2 = (x + 2)(x - 1)$. Bottom: $x^2 - 1 = (x - 1)(x + 1)$.\nStep 3 — cancel the shared cause of death, $(x - 1)$, and substitute:",
    },
    {
      type: "math",
      latex:
        "\\lim_{x \\to 1} \\frac{(x+2)(x-1)}{(x-1)(x+1)} = \\lim_{x \\to 1} \\frac{x + 2}{x + 1} = \\frac{3}{2}",
    },
    {
      type: "text",
      content:
        "The $\\frac00$ always has a culprit factor — here $(x-1)$, hiding in both top and bottom because $x = 1$ kills each of them. Factoring is how you find it; cancelling is how you remove it; what's left tells the truth.",
    },
    {
      type: "quiz",
      id: "zero-over-zero-quiz-4",
      variant: "practice",
      question: "Compute $\\lim_{x \\to -3} \\dfrac{x^2 - 9}{x + 3}$.",
      options: [
        {
          text: "$-6$",
          correct: true,
          feedback:
            "$\\frac{(x-3)(x+3)}{x+3} = x - 3$ away from $-3$, and $-3 - 3 = -6$. Same factoring as at $+3$, opposite sign in the answer.",
        },
        {
          text: "$6$",
          feedback:
            "That's the limit at $x = +3$. Here the surviving factor is $x - 3$, evaluated at $-3$: it gives $-6$.",
        },
        {
          text: "$0$",
          feedback:
            "The $\\frac00$ from plugging in is the disguise. Factor $x^2 - 9 = (x-3)(x+3)$, cancel $(x+3)$, and read off $x - 3 \\to -6$.",
        },
      ],
      hint: "Difference of squares again — but watch which factor cancels this time.",
    },
    {
      type: "quiz",
      id: "zero-over-zero-quiz-5",
      variant: "practice",
      question: "Compute $\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 16} - 4}{x}$.",
      options: [
        {
          text: "$\\dfrac{1}{8}$",
          correct: true,
          feedback:
            "Conjugate: top becomes $x + 16 - 16 = x$, cancel with the bottom, leaving $\\frac{1}{\\sqrt{x+16}+4} \\to \\frac{1}{4+4} = \\frac18$.",
        },
        {
          text: "$\\dfrac{1}{4}$",
          feedback:
            "That's the $\\sqrt{x+4}$ answer from the lesson. Here the root heads to $\\sqrt{16} = 4$, so the tail is $\\frac{1}{4 + 4} = \\frac18$.",
        },
        {
          text: "$0$ — the numerator vanishes at $x = 0$",
          feedback:
            "The denominator vanishes too: $\\frac00$, no verdict from plugging in. Multiply by $\\frac{\\sqrt{x+16}+4}{\\sqrt{x+16}+4}$ and the answer $\\frac18$ appears.",
        },
      ],
      hint: "Multiply by the conjugate $\\sqrt{x+16} + 4$ over itself.",
    },
    {
      type: "quiz",
      id: "zero-over-zero-quiz-6",
      variant: "mastery",
      question:
        "The third playbook entry: $\\lim_{x \\to 0} \\dfrac{\\frac{1}{x + 2} - \\frac{1}{2}}{x}$ — a fraction inside a fraction. What is it?",
      options: [
        {
          text: "$-\\dfrac{1}{4}$",
          correct: true,
          feedback:
            "Combine the top: $\\frac{1}{x+2} - \\frac12 = \\frac{2 - (x+2)}{2(x+2)} = \\frac{-x}{2(x+2)}$. Divide by $x$ (cancel it!) to get $\\frac{-1}{2(x+2)} \\to -\\frac14$.",
        },
        {
          text: "$0$ — the top is 0 at $x = 0$",
          feedback:
            "So is the bottom: $\\frac00$ again. Put the top over a common denominator and an $x$ appears upstairs, ready to cancel; the dust settles at $-\\frac14$.",
        },
        {
          text: "$\\dfrac{1}{4}$",
          feedback:
            "Sign check: the combined top is $\\frac{2 - (x+2)}{2(x+2)} = \\frac{-x}{2(x+2)}$ — note the minus. The limit is $-\\frac14$.",
        },
      ],
      hint: "First job: write $\\frac{1}{x+2} - \\frac{1}{2}$ as one fraction over a common denominator.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "limits-at-infinity",
  title: "1.7 · Limits at Infinity",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "So far $x$ has been sneaking up on a point. Now let it run: what happens to $f(x)$ as $x$ grows without bound? This is the mathematics of *the long run* — where systems end up if you wait.\n\nA cup of coffee at 80°C sits in a 20°C room. Newton's law of cooling says the temperature after $t$ minutes looks like:",
    },
    { type: "math", latex: "T(t) = 20 + 60e^{-t}" },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "20 + 60*exp(-x)",
        exprLatex: "20 + 60e^{-x}",
        target: "infinity",
        asymptote: 20,
        window: { xmin: 0, xmax: 10, ymin: 0, ymax: 90 },
      },
    },
    {
      type: "text",
      content:
        "The coffee never *reaches* room temperature — $e^{-t}$ is never exactly 0 — but it closes in on 20°C relentlessly. The dashed line the curve hugs is a **horizontal asymptote**, and the sentence \"coffee ends up at room temperature\" is, precisely:",
    },
    { type: "math", latex: "\\lim_{t \\to \\infty} T(t) = 20" },
    {
      type: "text",
      content:
        "The engine behind most limits at infinity is one fact: dividing by something huge gives something tiny.",
    },
    {
      type: "math",
      latex: "\\lim_{x \\to \\infty} \\frac{1}{x} = 0, \\qquad \\lim_{x \\to \\infty} \\frac{c}{x^n} = 0 \\;\\; (n > 0)",
    },
    {
      type: "text",
      content:
        "For ratios of polynomials, that fact means only the heavyweight terms matter in the long run. Watch this one settle — the $+x$ and $+1$ that seem important near zero fade into irrelevance:",
    },
    {
      type: "interactive",
      config: {
        component: "limit-explorer",
        expr: "(3*x^2 + x)/(x^2 + 1)",
        exprLatex: "\\frac{3x^2 + x}{x^2 + 1}",
        target: "infinity",
        asymptote: 3,
        window: { xmin: 0, xmax: 20, ymin: 0, ymax: 5 },
      },
    },
    {
      type: "math",
      latex:
        "\\lim_{x \\to \\infty} \\frac{3x^2 + x}{x^2 + 1} = \\lim_{x \\to \\infty} \\frac{3 + \\frac{1}{x}}{1 + \\frac{1}{x^2}} = \\frac{3 + 0}{1 + 0} = 3",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where you'll meet this in the wild",
      content:
        "Long-run limits are everywhere:\n· A skydiver's speed approaches terminal velocity — air resistance vs gravity settling into balance.\n· A repeated medication dose approaches a steady-state concentration in the bloodstream — that plateau is what the prescription is designed around.\n· A population approaches its habitat's carrying capacity.\n· Average cost per unit $\\frac{5000 + 20x}{x}$ approaches ₹20 as production $x$ grows — fixed costs melt into irrelevance at scale.",
    },
    {
      type: "quiz",
      id: "limits-at-infinity-quiz-1",
      variant: "practice",
      question: "What is $\\lim_{x \\to \\infty} \\left(5 + \\dfrac{3}{x}\\right)$?",
      options: [
        {
          text: "$5$",
          correct: true,
          feedback: "$\\frac{3}{x}$ shrivels to 0 as $x$ grows, leaving 5. Horizontal asymptote at $y = 5$.",
        },
        {
          text: "$8$",
          feedback: "$8$ is the value at $x = 1$. As $x$ grows, $\\frac3x$ fades toward 0 and the outputs settle on 5.",
        },
        {
          text: "$\\infty$",
          feedback: "Only the $\\frac3x$ part changes, and it's shrinking. The function flattens onto $y = 5$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limits-at-infinity-quiz-2",
      variant: "practice",
      question:
        "A factory's average cost per unit is $A(x) = \\dfrac{5000 + 20x}{x}$. What does the average cost approach at very large production volumes?",
      options: [
        {
          text: "₹20 — the fixed ₹5000 gets spread ever thinner.",
          correct: true,
          feedback:
            "$A(x) = \\frac{5000}{x} + 20$, and the first term dies off. That's 'economies of scale' stated as a limit.",
        },
        {
          text: "₹0 — costs vanish at scale.",
          feedback:
            "The variable cost of ₹20 per unit never goes away. Only the fixed-cost share $\\frac{5000}{x}$ vanishes.",
        },
        {
          text: "₹5020 — the sum of the numbers.",
          feedback:
            "That's the cost of the very first unit ($x=1$). Split it: $\\frac{5000}{x} + 20 \\to 0 + 20$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limits-at-infinity-quiz-3",
      variant: "mastery",
      question: "What is $\\lim_{x \\to \\infty} \\dfrac{2x^3 - x}{5x^3 + 7x^2}$?",
      options: [
        {
          text: "$\\dfrac{2}{5}$",
          correct: true,
          feedback:
            "Same degree top and bottom → ratio of leading coefficients. Divide through by $x^3$ and every other term evaporates.",
        },
        {
          text: "$0$",
          feedback:
            "Zero happens when the bottom outweighs the top (higher degree below). Here both are cubics: the answer is the leading ratio $\\frac25$.",
        },
        {
          text: "$\\infty$",
          feedback:
            "Infinity needs the top to outgrow the bottom. Both are cubics, so they grow in lockstep — ratio $\\frac25$.",
        },
      ],
      hint: "Divide numerator and denominator by $x^3$.",
    },
    {
      type: "text",
      content:
        "**Worked example — the three degree cases, side by side.** For a ratio of polynomials as $x \\to \\infty$, everything is decided by comparing the top and bottom degrees. One example of each:\n\n*Case 1 — bottom heavier:* $\\lim_{x \\to \\infty} \\frac{5x + 1}{x^2 + 3}$. Divide through by $x^2$: top becomes $\\frac{5}{x} + \\frac{1}{x^2} \\to 0$, bottom $\\to 1$. Limit: $0$. The heavier denominator crushes the fraction flat.\n\n*Case 2 — equal degrees:* $\\lim_{x \\to \\infty} \\frac{3x^2 + x}{x^2 + 1} = 3$ (the lesson's example). Evenly matched heavyweights — the limit is the ratio of leading coefficients.\n\n*Case 3 — top heavier:* $\\lim_{x \\to \\infty} \\frac{x^3 + 1}{x^2 + 1}$. The top outgrows the bottom without bound: the outputs run away, $= \\infty$, no horizontal asymptote.\n\nSummary worth keeping:",
    },
    {
      type: "table",
      headers: ["Degrees", "$\\lim_{x \\to \\infty}$", "Graph's long-run look"],
      rows: [
        ["top < bottom", "$0$", "hugs the x-axis"],
        ["top = bottom", "ratio of leading coefficients", "hugs a horizontal line"],
        ["top > bottom", "$\\pm\\infty$ (no finite limit)", "climbs or dives forever"],
      ],
    },
    {
      type: "quiz",
      id: "limits-at-infinity-quiz-4",
      variant: "practice",
      question: "What is $\\lim_{x \\to \\infty} \\dfrac{7x + 2}{x^2 - 5}$?",
      options: [
        {
          text: "$0$",
          correct: true,
          feedback:
            "Degree 1 over degree 2: the bottom wins the growth race and the fraction is squeezed to 0. Horizontal asymptote at $y = 0$.",
        },
        {
          text: "$7$",
          feedback:
            "The leading-coefficient ratio only applies when the degrees MATCH. Here the bottom is heavier (2 vs 1): the limit is 0.",
        },
        {
          text: "$\\infty$",
          feedback:
            "Runaway needs the TOP to be heavier. It's the underdog here — the fraction dies to 0.",
        },
      ],
      hint: "Compare the degrees first; only then reach for coefficients.",
    },
    {
      type: "quiz",
      id: "limits-at-infinity-quiz-5",
      variant: "concept",
      question:
        "A battery's charge fades as $Q(t) = 100e^{-t/2}$ percent after $t$ hours. What is $\\lim_{t \\to \\infty} Q(t)$, and what does it mean?",
      options: [
        {
          text: "$0$ — in the long run the charge drains toward empty, never quite reaching it.",
          correct: true,
          feedback:
            "$e^{-t/2} \\to 0$, dragging the whole expression down to its horizontal asymptote at 0. Exponential decay: ever closer, never arrived.",
        },
        {
          text: "$100$ — that's the number in the formula.",
          feedback:
            "$100$ is the STARTING charge, $Q(0) = 100e^0 = 100$. The limit asks where things end up, and $e^{-t/2}$ drags it to 0.",
        },
        {
          text: "$50$ — halfway between full and empty.",
          feedback:
            "Limits don't average the journey. The decay factor $e^{-t/2}$ keeps shrinking past every positive value: destination 0.",
        },
      ],
    },
  ]),
};

const lesson08: LessonSeed = {
  slug: "continuity",
  title: "1.8 · Continuity",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "Some graphs you can draw without lifting your pen. That doodler's notion turns out to be one of the most important ideas in mathematics, and limits are exactly the tool that makes it precise.\n\nInformally: a function is continuous at a point when there's no surprise there — the value the neighbourhood promises is the value the point delivers.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Continuity at a point",
      content:
        "$f$ is continuous at $x = a$ when three things hold:\n1. $f(a)$ exists — there is a value.\n2. $\\lim_{x \\to a} f(x)$ exists — the neighbourhood agrees on a target.\n3. They're equal: $\\lim_{x \\to a} f(x) = f(a)$.",
    },
    {
      type: "text",
      content:
        "Each way to fail one of the three conditions is a discontinuity you've already met:",
    },
    {
      type: "table",
      headers: ["Type", "What fails", "Example"],
      rows: [
        ["Hole (removable)", "$f(a)$ missing, or the dot is relocated — limit exists but ≠ value", "$\\frac{x^2-4}{x-2}$, or the spiteful $g$ of 1.2"],
        ["Jump", "the two-sided limit doesn't exist (sides disagree)", "parking garage pricing"],
        ["Infinite", "the function blows up — no value, no finite limit", "$\\frac{1}{x^2}$ at 0"],
      ],
    },
    {
      type: "text",
      content:
        "A hole is called *removable* because one repair fixes it: redefine the single point to equal the limit, and continuity is restored. A jump can't be fixed by moving one dot — no single value can satisfy two disagreeing sides. Slide across this jump and feel why:",
    },
    {
      type: "interactive",
      config: {
        component: "piecewise-explorer",
        breakpoint: 0,
        breakBelongsTo: "right",
        leftExpr: "x + 3",
        leftLatex: "x + 3",
        rightExpr: "x^2",
        rightLatex: "x^2",
        window: { xmin: -4, xmax: 3, ymin: -2, ymax: 6 },
        initial: -2,
      },
    },
    {
      type: "text",
      content:
        "The payoff for continuity is a theorem that sounds obvious and is quietly powerful. If $f$ is continuous on $[a, b]$, it cannot skip values: on the way from $f(a)$ to $f(b)$, every height in between gets hit. That's the **Intermediate Value Theorem**.\n\nYou were once exactly 1 metre tall. Not approximately — exactly. Height is continuous (you never teleport from 99 cm to 101 cm), you started below 1 m and ended above it, so somewhere in between the value 1 m was hit. The same logic lets engineers guarantee an equation has a root between two test points: if $f(1) < 0$ and $f(2) > 0$ and $f$ is continuous, a solution lives in $(1, 2)$ — that's how root-finding software corners its prey.",
    },
    {
      type: "callout",
      variant: "warning",
      content:
        "The IVT needs continuity. The parking fee jumps from ₹50 to ₹80 without ever being ₹65 — jumps let functions skip values. Your bank balance, postage rates and tax owed are all staircase functions precisely because they are *not* continuous.",
    },
    {
      type: "quiz",
      id: "continuity-quiz-1",
      variant: "practice",
      question:
        "For the function in the explorer above, is $f$ continuous at $x = 0$?",
      options: [
        {
          text: "No — the left side approaches 3 but $f(0) = 0$: the limit doesn't exist, so condition 2 fails.",
          correct: true,
          feedback:
            "Left limit 3, right limit 0 — no consensus, no two-sided limit, no continuity. A jump.",
        },
        {
          text: "Yes — $f(0)$ exists, and that's what matters.",
          feedback:
            "Having a value is only condition 1 of 3. The neighbourhood must also agree on a target (it doesn't: 3 vs 0) and match the value.",
        },
        {
          text: "No, because the two rules use different formulas.",
          feedback:
            "Different formulas per region is fine — a piecewise function CAN be continuous if the pieces meet. These pieces don't meet: 3 vs 0.",
        },
      ],
    },
    {
      type: "quiz",
      id: "continuity-quiz-2",
      variant: "concept",
      question:
        "$f(x) = \\begin{cases} \\frac{x^2 - 9}{x - 3} & x \\ne 3 \\\\ k & x = 3 \\end{cases}$ — which $k$ makes $f$ continuous at 3?",
      options: [
        {
          text: "$k = 6$",
          correct: true,
          feedback:
            "The limit is $\\lim_{x \\to 3}(x + 3) = 6$, so placing the dot at 6 makes value = limit. You just removed a removable discontinuity.",
        },
        {
          text: "$k = 3$",
          feedback:
            "Continuity needs $k$ to equal the LIMIT, not the input. The limit is $x + 3 \\to 6$.",
        },
        {
          text: "No $k$ works — the function is broken at 3.",
          feedback:
            "It's a hole, the fixable kind! The two sides already agree on 6; setting $k = 6$ completes the repair.",
        },
      ],
      hint: "First find $\\lim_{x \\to 3} \\frac{x^2-9}{x-3}$ (lesson 1.6), then match it.",
    },
    {
      type: "quiz",
      id: "continuity-quiz-3",
      variant: "mastery",
      question:
        "A continuous temperature sensor reads 18°C at 6:00 and 26°C at 12:00. A staircase-priced parking fee goes ₹50 → ₹80 over the same period. Which claims does the IVT support?",
      options: [
        {
          text: "The temperature was exactly 22°C at some moment; no such guarantee for the fee being ₹65.",
          correct: true,
          feedback:
            "Continuous quantities can't skip intermediate values; jumpy ones can. That's the IVT and its fine print in one example.",
        },
        {
          text: "Both must have passed through every intermediate value.",
          feedback:
            "The fee jumps — it goes from ₹50 to ₹80 without ever being ₹65. The IVT's continuity requirement is not decoration.",
        },
        {
          text: "Neither — you'd need readings at every instant to be sure.",
          feedback:
            "That's the beauty of the theorem: continuity plus two endpoint values GUARANTEES the in-between value was hit, no extra readings needed.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — the three-condition checklist, run in full.** Is",
    },
    {
      type: "math",
      latex:
        "f(x) = \\begin{cases} x^2 & x < 1 \\\\ 2 - x & x \\ge 1 \\end{cases}",
    },
    {
      type: "text",
      content:
        "continuous at $x = 1$?\n\nCondition 1 — does $f(1)$ exist? The $x \\ge 1$ rule owns it: $f(1) = 2 - 1 = 1$. ✓\nCondition 2 — does the limit exist? Left: $x^2 \\to 1$. Right: $2 - x \\to 1$. Sides agree: $\\lim_{x \\to 1} f(x) = 1$. ✓\nCondition 3 — are they equal? $1 = 1$. ✓\n\nAll three hold: continuous. The two formulas splice without a seam — you could draw this graph without lifting your pen, corner and all. (A corner is perfectly continuous; it will cause trouble later, but for *derivatives*, not for continuity.)",
    },
    {
      type: "quiz",
      id: "continuity-quiz-4",
      variant: "practice",
      question:
        "Find $k$ so that $f(x) = \\begin{cases} kx + 1 & x < 2 \\\\ x^2 & x \\ge 2 \\end{cases}$ is continuous at $x = 2$.",
      options: [
        {
          text: "$k = \\dfrac{3}{2}$",
          correct: true,
          feedback:
            "The pieces must meet: left limit $2k + 1$ must equal right value $2^2 = 4$. Solve $2k + 1 = 4$: $k = \\frac32$. You just engineered continuity.",
        },
        {
          text: "$k = 2$",
          feedback:
            "That makes the left side approach $2(2) + 1 = 5$ while the right sits at 4 — still a jump. Set $2k + 1 = 4$ and solve: $k = \\frac32$.",
        },
        {
          text: "No $k$ can work — the formulas are different types.",
          feedback:
            "Different formulas can meet perfectly (see the worked example). The left approach is $2k+1$, a knob you control: dial it to 4.",
        },
      ],
      hint: "Write the left-hand limit at 2 in terms of $k$, and set it equal to $f(2)$.",
    },
    {
      type: "quiz",
      id: "continuity-quiz-5",
      variant: "concept",
      question:
        "Classify the discontinuity of $f(x) = \\dfrac{1}{x - 2}$ at $x = 2$.",
      options: [
        {
          text: "Infinite — the function blows up on both sides of 2.",
          correct: true,
          feedback:
            "No value at 2, no finite limit (the sides run to $-\\infty$ and $+\\infty$): the worst kind, and no redefinition of a single point could ever repair it.",
        },
        {
          text: "Removable — just define $f(2)$ to fill the hole.",
          feedback:
            "Removable requires a finite limit to move the dot to. There's no finite target here — the outputs escape to infinity. Nothing to patch with.",
        },
        {
          text: "It's continuous — the formula is defined by one clean expression.",
          feedback:
            "A single formula is no guarantee: $f(2)$ would be $\\frac{1}{0}$ — division by zero. Condition 1 already fails, and condition 2 fails harder.",
        },
      ],
    },
  ]),
};

const lesson09: LessonSeed = {
  slug: "how-close-is-close-enough",
  title: "1.9 · How Close Is Close Enough?",
  position: 9,
  blocks: blocks([
    {
      type: "text",
      content:
        "Everything so far leaned on the phrase \"closes in on\". It served us well — but \"closes in\" is a feeling, not a definition, and mathematics eventually demands a contract in writing. Here is the idea, told as a negotiation.\n\nA machine shop mills piston rings. The customer doesn't order \"a ring of exactly 80 mm\" — no physical process hits a value exactly. They order \"80 mm ± 0.1 mm\", a **tolerance**. The machinist's job: find how precisely the machine's settings must be held so the output stays inside that tolerance. Tighter tolerance demanded → tighter control needed — but *some* sufficient control setting always exists. That's what it means for the process to truly target 80 mm.\n\nLimits work the same way. Claim: $\\lim_{x \\to a} f(x) = L$. The skeptic demands an output tolerance: \"get $f(x)$ within $\\varepsilon$ of $L$.\" You answer with an input tolerance: \"keep $x$ within $\\delta$ of $a$, and it's guaranteed.\" The claim is TRUE if you can answer *every* demand, no matter how tight. Play the game:",
    },
    {
      type: "interactive",
      config: {
        component: "epsilon-delta",
        expr: "x^2",
        exprLatex: "x^2",
        target: 1,
        limitValue: 1,
        epsilons: [1, 0.5, 0.25, 0.1],
        window: { xmin: -0.5, xmax: 2.5, ymin: -0.5, ymax: 4 },
      },
    },
    {
      type: "text",
      content:
        "Every time the skeptic narrows the horizontal band (the demand), a vertical band (your answer) still exists that funnels the curve through it. That endless supply of winning answers — not any single one of them — is the limit.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Limit (the formal ε–δ version)",
      content:
        "$\\lim_{x \\to a} f(x) = L$ means: for every $\\varepsilon > 0$ there exists a $\\delta > 0$ such that whenever $0 < |x - a| < \\delta$, it follows that $|f(x) - L| < \\varepsilon$.\n\nNote the fine print $0 < |x - a|$: the point $x = a$ itself is explicitly exempt. The definition itself encodes \"limits don't care about the point.\"",
    },
    {
      type: "text",
      content:
        "Now watch the definition catch a liar. Claim: the parking-garage function of 1.3 has limit 2 at the jump. Skeptic picks $\\varepsilon = 0.5$: outputs must stay within $(1.5, 2.5)$. But *every* interval around the jump point contains right-side inputs with outputs near 3 — outside the band. No $\\delta$ works, the claim dies. Try claiming the limit is 3 instead, and left-side inputs betray you the same way. No candidate $L$ survives: the limit genuinely does not exist, now with a proof instead of a shrug.",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "You won't be writing ε–δ proofs in this course — that's the specialty of a real analysis class. What matters here is knowing that under every \"closes in on\" in this chapter sits this precise, checkable contract. Calculus is not built on vibes.",
    },
    {
      type: "quiz",
      id: "epsilon-delta-quiz-1",
      variant: "concept",
      question: "In the tolerance game, who moves first — and why does it matter?",
      options: [
        {
          text: "The skeptic picks ε first; you must then produce a δ that works for it. The limit claim means you can always answer.",
          correct: true,
          feedback:
            "Order is everything: the demand comes first, your guarantee is a response, and losing even one round kills the claim.",
        },
        {
          text: "You pick δ first and see how accurate the outputs turn out.",
          feedback:
            "Backwards — that would let you pick an easy δ and declare victory. The definition forces you to answer EVERY ε, including brutally tiny ones.",
        },
        {
          text: "It doesn't matter; the bands shrink together either way.",
          feedback:
            "It does: 'for every ε there exists δ' is a challenge-response contract. Swap the order and the sentence means something much weaker.",
        },
      ],
    },
    {
      type: "quiz",
      id: "epsilon-delta-quiz-2",
      variant: "practice",
      question:
        "For $f(x) = 2x$ near $a = 3$ (so $L = 6$): the skeptic demands $\\varepsilon = 0.1$. Which δ wins the round?",
      options: [
        {
          text: "$\\delta = 0.05$",
          correct: true,
          feedback:
            "Doubling stretches distances by 2: keep $x$ within 0.05 of 3 and $2x$ stays within 0.1 of 6. (Any smaller δ wins too.)",
        },
        {
          text: "$\\delta = 0.2$",
          feedback:
            "Too generous: $x = 3.15$ is within 0.2 of 3, but $f(x) = 6.3$ misses the ±0.1 band. Halve, don't double: δ = 0.05.",
        },
        {
          text: "$\\delta = 0.1$",
          feedback:
            "Close: $x = 3.09$ gives $f(x) = 6.18$, outside the band. Since $f$ doubles distances, δ must be at most ε/2 = 0.05.",
        },
      ],
      hint: "$f$ doubles every distance. What must you do to the input tolerance?",
    },
    {
      type: "quiz",
      id: "epsilon-delta-quiz-3",
      variant: "mastery",
      question:
        "Why does the definition require a δ for EVERY ε, rather than just one small ε like 0.001?",
      options: [
        {
          text: "One fixed tolerance can be passed by functions that don't actually settle — only the ability to meet every tolerance pins down a true limit.",
          correct: true,
          feedback:
            "Right. A function hovering 0.0005 away from L forever would pass the ε = 0.001 test while approaching nothing. 'Every ε' is what makes 'arbitrarily close' mean something.",
        },
        {
          text: "It's tradition — one small ε would do.",
          feedback:
            "A function could sit permanently 0.0005 away from L: it passes ε = 0.001 yet never closes in. Only the every-ε requirement rules that out.",
        },
        {
          text: "Because δ has to equal ε.",
          feedback:
            "δ rarely equals ε (you just saw δ = ε/2 for the doubler). The point of 'every ε' is to make the closing-in unbounded, not to fix a formula.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — answering a demand, with reasoning shown.** Claim: $\\lim_{x \\to 1} 4x = 4$. The skeptic demands $\\varepsilon = 0.2$: keep the outputs within $0.2$ of $4$. Find a winning $\\delta$.\n\nStep 1 — understand the machine: $f(x) = 4x$ multiplies every input-distance by 4. If $x$ sits within $\\delta$ of 1, then $4x$ sits within $4\\delta$ of 4.\nStep 2 — set up the requirement: we need $4\\delta \\le 0.2$.\nStep 3 — solve: $\\delta \\le 0.05$. Answer $\\delta = 0.05$ (or anything smaller).\nStep 4 — verify with an edge case: $x = 1.05$ gives $f(x) = 4.2$, exactly on the boundary of the tolerance band. ✓\n\nNotice the general pattern for a line of slope $m$: the winning answer is $\\delta = \\varepsilon / |m|$ — steeper functions demand proportionally tighter input control. That's the machinist's rule from the piston-ring shop, in symbols.",
    },
    {
      type: "quiz",
      id: "epsilon-delta-quiz-4",
      variant: "practice",
      question:
        "Claim: $\\lim_{x \\to 2} \\frac{x}{2} = 1$. The skeptic demands $\\varepsilon = 0.1$. What is the LARGEST $\\delta$ that still wins the round?",
      options: [
        {
          text: "$\\delta = 0.2$",
          correct: true,
          feedback:
            "This function HALVES distances, so the input leash can be twice the output tolerance: $\\delta = \\varepsilon / |m| = 0.1 / \\frac12 = 0.2$. Gentle slopes are forgiving.",
        },
        {
          text: "$\\delta = 0.05$",
          feedback:
            "That wins, but it's needlessly tight — the ε/2 reflex from the doubler. This function halves distances, so you can afford $\\delta = 2\\varepsilon = 0.2$.",
        },
        {
          text: "$\\delta = 0.4$",
          feedback:
            "Too loose: $x = 2.4$ is allowed but gives $f(x) = 1.2$, outside the $\\pm 0.1$ band. The largest safe leash is $0.2$.",
        },
      ],
      hint: "The slope is $\\frac12$: input errors get halved on the way through. How long can the leash be?",
    },
  ]),
};

const lesson10: LessonSeed = {
  slug: "from-limits-to-derivatives",
  title: "1.10 · From Limits to Derivatives",
  position: 10,
  blocks: blocks([
    {
      type: "text",
      content:
        "Time to pay off the debt this chapter was created for. Chapter 0 ended stuck: the slope of $f(x) = x^2$ at exactly $x = 2$ demanded $\\frac{0}{0}$. Watch the secant one more time — but now you know exactly what the settling behaviour is called:",
    },
    {
      type: "interactive",
      config: {
        component: "secant-explorer",
        expr: "x^2",
        exprLatex: "x^2",
        x1: 2,
        min: 0,
        max: 4,
        step: 0.05,
        initial: 4,
        window: { xmin: 0, xmax: 4.5, ymin: -2, ymax: 18 },
      },
    },
    {
      type: "text",
      content:
        "\"The secant slopes close in on 4\" is a limit statement. Write the second point as $2 + h$, where $h$ is the tiny gap, and the slope of the secant becomes a function of $h$ — and the instantaneous slope is its limit as the gap closes:",
    },
    {
      type: "math",
      latex: "\\text{slope at } 2 \\;=\\; \\lim_{h \\to 0} \\frac{f(2+h) - f(2)}{h}",
    },
    {
      type: "text",
      content:
        "Plugging in $h = 0$ gives $\\frac{0}{0}$ — but that's no longer a wall, it's a lesson-1.6 puzzle. Run the playbook:",
    },
    {
      type: "math",
      latex:
        "\\lim_{h \\to 0} \\frac{(2+h)^2 - 4}{h} = \\lim_{h \\to 0} \\frac{4 + 4h + h^2 - 4}{h} = \\lim_{h \\to 0} \\frac{h(4 + h)}{h} = \\lim_{h \\to 0} (4 + h) = 4",
    },
    {
      type: "callout",
      variant: "info",
      title: "Read that again",
      content:
        "The slope of $x^2$ at $x = 2$ is exactly 4. Not approximately — exactly. Expand ($0.2$), factor out $h$ ($0.2$ again — the notation $f(x+h)$ trick), cancel ($1.6$), substitute ($1.5$). Every move came from a lesson you've done.",
    },
    {
      type: "text",
      content:
        "This limit is so central that it gets a name and its own chapter. For any function $f$ and point $x$:",
    },
    {
      type: "math",
      latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
    },
    {
      type: "callout",
      variant: "info",
      title: "The cliffhanger",
      content:
        "$f'$ is called the derivative — the instantaneous rate of change, as a function in its own right. The speed on your speedometer, the steepness of a curve, the growth rate of anything: all this one limit.\n\nNext: Derivatives.",
    },
    {
      type: "quiz",
      id: "limits-to-derivatives-quiz-1",
      variant: "practice",
      question:
        "In $\\lim_{h \\to 0} \\frac{f(2+h) - f(2)}{h}$, what does $h$ represent?",
      options: [
        {
          text: "The gap between the two points of the secant line — shrinking to 0.",
          correct: true,
          feedback:
            "The two x-values are 2 and 2 + h. The limit closes the gap without ever letting it be exactly 0 — the whole trick of the chapter.",
        },
        {
          text: "The height of the function at 2.",
          feedback:
            "The heights are $f(2)$ and $f(2+h)$. $h$ lives on the x-axis: it's the horizontal gap between the secant's two anchor points.",
        },
        {
          text: "A very small fixed number, like 0.001.",
          feedback:
            "$h$ isn't any fixed number — it's a variable being sent to 0. Stopping at 0.001 would give a very good average slope, but the limit gives the exact instantaneous one.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limits-to-derivatives-quiz-2",
      variant: "practice",
      question:
        "Use the same method: what is $\\lim_{h \\to 0} \\dfrac{(3+h)^2 - 9}{h}$ — the slope of $x^2$ at $x = 3$?",
      options: [
        {
          text: "$6$",
          correct: true,
          feedback:
            "$\\frac{9 + 6h + h^2 - 9}{h} = \\frac{h(6+h)}{h} = 6 + h \\to 6$. Notice the pattern forming: slope of $x^2$ at $x$ seems to be $2x$…",
        },
        {
          text: "$0$",
          feedback:
            "$\\frac00$ at $h=0$ is the disguise, not the answer. Expand $(3+h)^2$, cancel the 9s, factor out $h$: what remains heads to 6.",
        },
        {
          text: "$9$",
          feedback:
            "$9$ is $f(3)$, the height. The limit computes the STEEPNESS there, which comes out to 6.",
        },
      ],
      hint: "Expand, cancel the constant, factor out $h$, cancel, substitute.",
    },
    {
      type: "quiz",
      id: "limits-to-derivatives-quiz-3",
      variant: "mastery",
      question:
        "Why was the limit concept genuinely necessary here — why not just compute the slope over a very tiny interval like $h = 0.0001$?",
      options: [
        {
          text: "A tiny interval gives an approximation (4.0001); the limit gives the exact value (4) — and 'exact' is what lets calculus build reliable formulas.",
          correct: true,
          feedback:
            "Every finite h leaves an error. The limit is the machine that extracts the exact answer the approximations point toward — and exactness is why $f'(x) = 2x$ can be a theorem, not a rule of thumb.",
        },
        {
          text: "No reason — 4.0001 is basically 4 and engineering rounds anyway.",
          feedback:
            "For one number, maybe. But building on approximations compounds errors, and formulas like 'slope of $x^2$ is exactly $2x$' — the bedrock of all of calculus — only exist because limits deliver exact values.",
        },
        {
          text: "Because computers can't handle numbers as small as 0.0001.",
          feedback:
            "They can (though much tinier ones do cause floating-point trouble!). The mathematical reason is exactness: the limit is the exact destination, a tiny-h slope is a nearby approximation.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — the slope at EVERY point at once.** Instead of $x = 2$ or $x = 3$ one at a time, run the computation at a general point $x$ for $f(x) = x^2$:\n\nStep 1 — set up the difference quotient:",
    },
    {
      type: "math",
      latex:
        "\\frac{f(x+h) - f(x)}{h} = \\frac{(x+h)^2 - x^2}{h}",
    },
    {
      type: "text",
      content: "Step 2 — expand and cancel (the $x^2$'s kill each other):",
    },
    {
      type: "math",
      latex:
        "\\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{h(2x + h)}{h} = 2x + h",
    },
    {
      type: "text",
      content: "Step 3 — take the limit as the gap closes:",
    },
    {
      type: "math",
      latex: "f'(x) = \\lim_{h \\to 0} (2x + h) = 2x",
    },
    {
      type: "text",
      content:
        "One computation, infinitely many answers: the slope of $x^2$ at any point $x$ is exactly $2x$. Check it against everything you've computed: at $x=2$, slope 4 ✓; at $x=3$, slope 6 ✓. The derivative isn't a number — it's a *function*, and this is the first entry in the table of derivatives Chapter 2 will fill.",
    },
    {
      type: "quiz",
      id: "limits-to-derivatives-quiz-4",
      variant: "practice",
      question:
        "Using $f'(x) = 2x$ for $f(x) = x^2$: what is the slope of the curve at $x = 5$, and at $x = -1$?",
      options: [
        {
          text: "$10$ and $-2$",
          correct: true,
          feedback:
            "Plug into $2x$. The negative slope at $x = -1$ checks out: the parabola's left half is falling — a downhill tangent.",
        },
        {
          text: "$25$ and $1$",
          feedback:
            "Those are the HEIGHTS $f(5)$ and $f(-1)$. The slope function is $f'(x) = 2x$: slopes 10 and $-2$.",
        },
        {
          text: "$10$ and $2$",
          feedback:
            "Half right — at $x = -1$ the slope is $2(-1) = -2$, and the sign matters: it says the curve is falling there.",
        },
      ],
    },
    {
      type: "quiz",
      id: "limits-to-derivatives-quiz-5",
      variant: "mastery",
      question:
        "Run the machinery on a line: for $f(x) = 3x$, what does $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$ give?",
      options: [
        {
          text: "$3$, for every $x$ — a line has the same slope everywhere.",
          correct: true,
          feedback:
            "$\\frac{3(x+h) - 3x}{h} = \\frac{3h}{h} = 3$ — no limit even needed, the $h$'s cancel outright. The machinery agrees with what you've always known about lines.",
        },
        {
          text: "$3x$",
          feedback:
            "Compute it: $\\frac{3(x+h) - 3x}{h} = \\frac{3h}{h} = 3$, with no $x$ left. The slope of a line doesn't depend on where you stand.",
        },
        {
          text: "$0$ — the numerator vanishes as $h \\to 0$",
          feedback:
            "Top and bottom vanish TOGETHER ($\\frac00$, the chapter's oldest friend). Simplify first: $\\frac{3h}{h} = 3$ for every $h \\ne 0$.",
        },
      ],
      hint: "Substitute, expand, and watch how much cancels before the limit is even taken.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "Chapter 1 Mastery Check",
  position: 11,
  blocks: blocks([
    {
      type: "text",
      content:
        "One question per big idea. If any of these feels shaky, revisit that lesson before moving on — derivatives are built out of limits, brick by brick.",
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-1",
      variant: "mastery",
      question:
        "$f(x)$ is undefined at $x = 5$, but $f(4.99) = 12.01$ and $f(5.01) = 11.99$, with the trend continuing as you squeeze. What is $\\lim_{x \\to 5} f(x)$? (1.1)",
      options: [
        {
          text: "$12$",
          correct: true,
          feedback: "Both sides close in on 12; the missing value at 5 is irrelevant.",
        },
        {
          text: "Undefined, since $f(5)$ is undefined",
          feedback: "Limits read the approach, never the point. The approach says 12.",
        },
        {
          text: "$11.99$ — the closest measured value",
          feedback: "The limit is the destination of the trend, not the last sample: 12.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-2",
      variant: "mastery",
      question:
        "$\\lim_{x \\to 2} f(x) = 7$ and $f(2) = 3$. Which is true? (1.2, 1.8)",
      options: [
        {
          text: "Both facts can hold at once — and they mean $f$ is not continuous at 2.",
          correct: true,
          feedback:
            "Limit and value are independent; disagreement is exactly a (removable) discontinuity.",
        },
        {
          text: "Impossible — the limit must equal the value.",
          feedback:
            "Only continuous functions promise that. A relocated dot breaks it while both facts remain true.",
        },
        {
          text: "The limit must be recomputed as 3.",
          feedback: "The value at the point has no vote in the limit.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-3",
      variant: "mastery",
      question:
        "$\\lim_{x \\to 4^-} f(x) = 10$ and $\\lim_{x \\to 4^+} f(x) = 10$, while $f(4) = 2$. What is $\\lim_{x \\to 4} f(x)$? (1.3)",
      options: [
        {
          text: "$10$ — the sides agree, so the two-sided limit exists.",
          correct: true,
          feedback:
            "Consensus between the one-sided limits is all that's required. (The odd value at 4 makes it discontinuous, but the limit is a clean 10.)",
        },
        {
          text: "Does not exist, because $f(4) \\ne 10$.",
          feedback: "The value at the point can't veto the limit. Sides agree → limit is 10.",
        },
        {
          text: "$2$",
          feedback: "That's $f(4)$. The approach — from both sides — targets 10.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-4",
      variant: "mastery",
      question:
        "Which limit fails to exist by *oscillation* rather than jumping or blowing up? (1.4)",
      options: [
        {
          text: "$\\lim_{x \\to 0} \\sin(1/x)$",
          correct: true,
          feedback:
            "Bounded forever between −1 and 1 but never settling — the identity crisis.",
        },
        {
          text: "$\\lim_{x \\to 0} \\frac{1}{x^2}$",
          feedback: "That one blows up — a vertical asymptote.",
        },
        {
          text: "The parking fee at the one-hour mark",
          feedback: "That's a jump: each side settles, on different values.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-5",
      variant: "mastery",
      question: "Triage: $\\lim_{x \\to 1} \\dfrac{x^2 + 3}{x - 1}$. (1.5)",
      options: [
        {
          text: "Plugging in gives $\\frac{4}{0}$ — a blow-up, no finite limit.",
          correct: true,
          feedback:
            "Nonzero over zero always explodes. (Only $\\frac00$ earns the algebra treatment.)",
        },
        {
          text: "Plug in: the limit is 4.",
          feedback: "The denominator hits 0 at $x=1$ — plugging in is only the *test* here, and it reports $\\frac40$: blow-up.",
        },
        {
          text: "$\\frac{0}{0}$ — factor and cancel.",
          feedback: "Check the numerator: $1 + 3 = 4 \\ne 0$. This is $\\frac40$, the runaway case.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-6",
      variant: "mastery",
      question: "Compute $\\lim_{x \\to 5} \\dfrac{x^2 - 25}{x - 5}$. (1.6)",
      options: [
        {
          text: "$10$",
          correct: true,
          feedback: "Factor, cancel the $(x-5)$, and $x + 5 \\to 10$.",
        },
        {
          text: "$\\frac{0}{0}$, so it doesn't exist",
          feedback: "$\\frac00$ means 'no verdict yet', never 'no limit'. The algebra uncovers 10.",
        },
        {
          text: "$25$",
          feedback: "That's $f(5)$ for the numerator's square. Factor and cancel: the limit is $5 + 5 = 10$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-7",
      variant: "mastery",
      question:
        "A patient takes a daily dose; blood concentration after $t$ days behaves like $C(t) = 8 - 8e^{-t}$ (mg/L). What does the long-run concentration approach? (1.7)",
      options: [
        {
          text: "8 mg/L — the steady state the dosing was designed around.",
          correct: true,
          feedback:
            "$e^{-t} \\to 0$, so $C(t) \\to 8$: a horizontal asymptote with a prescription attached.",
        },
        {
          text: "0 — the drug eventually washes out.",
          feedback: "With repeated dosing, elimination and intake balance: $8 - 8e^{-t}$ climbs toward 8, not down to 0.",
        },
        {
          text: "It grows without bound — doses keep adding up.",
          feedback: "The $-8e^{-t}$ term shrinks to nothing but never pushes past 8: the limit is a finite plateau.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-8",
      variant: "mastery",
      question:
        "$f$ is continuous on $[0, 10]$, with $f(0) = -4$ and $f(10) = 3$. What is guaranteed? (1.8)",
      options: [
        {
          text: "$f(c) = 0$ for at least one $c$ in $(0, 10)$.",
          correct: true,
          feedback:
            "The IVT: a continuous path from −4 to 3 must cross every value in between, 0 included. This is how root-finders trap solutions.",
        },
        {
          text: "$f$ is increasing on the interval.",
          feedback: "The IVT says nothing about direction — $f$ may wander freely, but it cannot SKIP values.",
        },
        {
          text: "Nothing, without a formula for $f$.",
          feedback: "That's the theorem's magic: continuity + endpoint signs is enough. No formula needed.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-9",
      variant: "mastery",
      question:
        "In ε–δ terms, what does $\\lim_{x \\to a} f(x) = L$ promise? (1.9)",
      options: [
        {
          text: "Every output tolerance ε can be met by some input tolerance δ.",
          correct: true,
          feedback: "The challenge–response contract: the skeptic never wins a round.",
        },
        {
          text: "There is one special ε for which a δ exists.",
          feedback: "One round proves little — a non-settling function can pass a single fixed tolerance. The promise is for EVERY ε.",
        },
        {
          text: "$f(a) = L$ exactly.",
          feedback: "The definition explicitly excludes $x = a$ (the $0 < |x-a|$ clause). It's about the neighbourhood, never the point.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-10",
      variant: "mastery",
      question:
        "The expression $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$ computes… (1.10)",
      options: [
        {
          text: "The instantaneous rate of change of $f$ at $x$ — the derivative.",
          correct: true,
          feedback:
            "Secant slopes with a shrinking gap, resolved by a limit. You're ready for Chapter 2.",
        },
        {
          text: "The average rate of change of $f$ over $[x, x+h]$.",
          feedback:
            "That's the fraction BEFORE the limit is taken. Sending $h \\to 0$ upgrades average to instantaneous.",
        },
        {
          text: "$\\frac{0}{0}$, which is undefined.",
          feedback:
            "Plugging $h = 0$ into the fraction is undefined — but the limit doesn't plug in, it approaches. That distinction is this whole chapter.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-11",
      variant: "mastery",
      question:
        "Full computation: $\\lim_{x \\to 0} \\dfrac{\\sqrt{x + 25} - 5}{x}$. (1.6)",
      options: [
        {
          text: "$\\dfrac{1}{10}$",
          correct: true,
          feedback:
            "Conjugate $\\sqrt{x+25}+5$: the top becomes $x$, cancel, and $\\frac{1}{\\sqrt{x+25}+5} \\to \\frac{1}{10}$.",
        },
        {
          text: "$0$",
          feedback:
            "$\\frac00$ is a disguise, not a zero. Rationalize with $\\sqrt{x+25}+5$ and the answer $\\frac1{10}$ emerges.",
        },
        {
          text: "$\\dfrac{1}{5}$",
          feedback:
            "After the conjugate move the tail is $\\frac{1}{\\sqrt{x+25} + 5} \\to \\frac{1}{5 + 5}$ — don't forget the added 5.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-1-mastery-quiz-12",
      variant: "mastery",
      question:
        "Long-run behaviour: $\\lim_{x \\to \\infty} \\dfrac{4x^2 + 1}{2x^2 - x}$. (1.7)",
      options: [
        {
          text: "$2$",
          correct: true,
          feedback:
            "Equal degrees → ratio of leading coefficients: $\\frac42 = 2$. The $+1$ and $-x$ are long-run irrelevancies.",
        },
        {
          text: "$4$",
          feedback:
            "$4$ is only the top's coefficient. The bottom grows with coefficient 2 in lockstep: the ratio settles at $\\frac42 = 2$.",
        },
        {
          text: "$\\infty$",
          feedback:
            "Runaway needs the top to outgun the bottom. Both are quadratics — evenly matched — so the ratio flattens onto $y = 2$.",
        },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content:
        "All solid? Then you own the tool calculus is built on. Next stop: using it — the derivative gets a whole chapter to itself.",
    },
  ]),
};

export const chapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lessonMastery,
];
