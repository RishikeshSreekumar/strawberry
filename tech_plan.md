For this app, I’d build a **modular monolith first**: one Next.js application containing the student experience, admin/content system, APIs, authentication and most business logic. Avoid a separate FastAPI backend or microservices until you have a concrete reason.

## 1. Recommended stack

| Area                | Choice                                            |
| ------------------- | ------------------------------------------------- |
| Web framework       | **Next.js App Router + React + TypeScript**       |
| Styling/UI          | **Tailwind CSS + shadcn/ui**                      |
| Database            | **PostgreSQL on Neon**                            |
| ORM                 | **Drizzle ORM + Drizzle Kit**                     |
| Validation          | **Zod**                                           |
| Authentication      | **Better Auth**                                   |
| Math rendering      | **KaTeX**                                         |
| Math evaluation     | **math.js**                                       |
| Visualizations      | **React + SVG first**, Canvas when needed         |
| Rich text editing   | **Tiptap**, embedded inside custom content blocks |
| File/object storage | **Cloudflare R2**                                 |
| Background jobs     | **Trigger.dev**                                   |
| Deployment          | **Vercel**                                        |
| Monitoring          | **Sentry + Vercel Analytics**                     |
| Product analytics   | **PostHog**                                       |
| Testing             | **Vitest + Playwright**                           |

Next.js remains a strong fit because the App Router gives you Server Components plus full-stack application capabilities without needing a separate backend. ([Next.js][1]) Drizzle gives you typed SQL-style access and migration tooling without hiding Postgres behind a heavy abstraction. ([Drizzle ORM][2])

---

# 2. High-level architecture

```text
                         ┌────────────────────┐
                         │      Browser       │
                         └─────────┬──────────┘
                                   │
                         ┌─────────▼──────────┐
                         │      Next.js       │
                         │                    │
                         │ Student App        │
                         │ Admin CMS          │
                         │ API / Actions      │
                         │ Auth               │
                         └───┬────┬─────┬─────┘
                             │    │     │
                 ┌───────────┘    │     └───────────┐
                 ▼                ▼                 ▼
          ┌────────────┐   ┌────────────┐   ┌─────────────┐
          │   Neon     │   │ Cloudflare │   │ Trigger.dev │
          │ Postgres   │   │     R2     │   │ AI / Jobs   │
          └────────────┘   └────────────┘   └──────┬──────┘
                                                   │
                                                   ▼
                                            ┌────────────┐
                                            │ LLM APIs   │
                                            └────────────┘
```

Keep **student-facing rendering and business logic deterministic**. AI should primarily generate or assist content creation, not be required to render ordinary lessons.

---

# 3. Content architecture

This is probably the most important technical decision.

### Don't do this

```text
/components/calculus/chapter-0/lesson-1.tsx
/components/calculus/chapter-0/lesson-2.tsx
...
```

And don't store huge blobs of arbitrary HTML either.

Instead use:

**Relational DB for structure + JSONB for lesson blocks.**

```text
courses
  ↓
chapters
  ↓
lessons
  ↓
lesson_versions
```

For example:

```text
courses
- id
- slug
- title
- status

chapters
- id
- course_id
- slug
- position

lessons
- id
- chapter_id
- slug
- position
- published_version_id

lesson_versions
- id
- lesson_id
- version
- status
- schema_version
- blocks JSONB
- created_by
- created_at
- published_at
```

`blocks` is structured JSON:

```ts
type LessonBlock =
  | TextBlock
  | MathBlock
  | ExampleBlock
  | VisualizationBlock
  | ExerciseBlock
  | QuizBlock
  | CalloutBlock;
```

Each block type has three pieces in code:

```text
Zod Schema
     ↓
Block Renderer
     ↓
Block Editor
```

For example:

```text
"interactive-function-graph"
        ↓
interactiveFunctionGraphSchema
        ↓
<InteractiveFunctionGraph />
        ↓
<InteractiveFunctionGraphEditor />
```

This creates a **controlled content platform**, rather than a generic CMS.

---

# 4. Why JSONB + relational tables

Don't make every paragraph/formula/example a database row.

That becomes miserable to query, version and edit.

Instead:

```text
Relational

Course
Chapter
Lesson
Question
Assessment
User
Progress

Flexible JSONB

Lesson body
Visualization configuration
Question configuration
Explanation steps
```

Postgres is particularly well suited for this combination.

---

# 5. Content management

I would **not use Sanity/Contentful/Strapi** here.

Your content is too domain-specific.

Build an `/admin` area inside the same Next.js application.

```text
/admin
  /courses
  /chapters
  /lessons
  /questions
  /assessments
  /assets
  /ai-generations
```

A lesson editor would roughly be:

```text
Lesson metadata

──────────────────────

[ Theory block            ]
[ Formula block           ]
[ Example block           ]
[ Interactive graph block ]
[ Practice block          ]
[ + Add block             ]

──────────────────────

Preview
Save Draft
Publish
```

Use **Tiptap only inside prose blocks**. Don't make the whole lesson a giant rich-text document.

---

# 6. Content versioning

Never directly modify published content.

Use:

```text
DRAFT
  ↓
REVIEW
  ↓
PUBLISHED
  ↓
ARCHIVED
```

Suppose Lesson 4 currently points to:

```text
published_version_id → v7
```

You edit it:

```text
v7  PUBLISHED
v8  DRAFT
```

When v8 is published:

```text
published_version_id → v8
```

This gives you rollback essentially for free.

Also put a `schema_version` on JSON content so you can migrate old lesson structures later.

---

# 7. AI-generated content

AI should plug into the **CMS workflow**, not directly into production.

```text
Admin
  ↓
Generate lesson
  ↓
Trigger.dev job
  ↓
LLM
  ↓
Structured JSON
  ↓
Zod validation
  ↓
Draft LessonVersion
  ↓
Human review
  ↓
Publish
```

Store generation metadata:

```text
ai_generation_runs

id
entity_type
entity_id
prompt_version
model
input
output
status
created_at
```

Trigger.dev is appropriate here because long-running AI generation, retries and queues can happen independently from the HTTP request lifecycle. ([Trigger][3])

A useful rule:

> **AI generates drafts. Code validates. Humans publish.**

---

# 8. Visualization engine

Interactive visualizations should be **components in the codebase**, not arbitrary code stored in the DB.

For example:

```text
visualizations/
  FunctionGraph/
  LimitExplorer/
  SecantToTangent/
  EpsilonDelta/
  DerivativeExplorer/
  AreaUnderCurve/
  RiemannSum/
```

DB stores configuration:

```json
{
  "type": "secant-to-tangent",
  "function": "x^2",
  "x": 2,
  "startDelta": 2,
  "showTangent": true
}
```

The frontend interprets it:

```tsx
<VisualizationRenderer config={block.config} />
```

This is much safer and easier to maintain than storing JSX/JavaScript in the database.

Use **SVG for most calculus diagrams** because you need crisp graphs, labels, points, lines and interaction. Move individual heavy visualizations to Canvas only if SVG becomes a performance problem.

Use `math.js` for parsing user-friendly expressions such as `sin(x)` and `x^2`; it supports parsing/compilation rather than requiring you to `eval()` arbitrary JavaScript. ([Math.js][4])

Use KaTeX independently for mathematical typesetting. ([KaTeX][5])

---

# 9. Question / assessment engine

Questions should **not live inside lesson JSON exclusively**.

Maintain a reusable question bank.

```text
questions

id
course_id
chapter_id
lesson_id
type
difficulty
source
configuration JSONB
solution JSONB
tags
status
```

Possible technical question types:

```text
MCQ
MULTI_SELECT
NUMERIC
EXPRESSION
GRAPH_INTERACTION
MATCHING
ORDERING
```

Then:

```text
assessments
assessment_questions
```

lets the same question appear in:

```text
Lesson practice
Chapter test
Revision test
Mock examination
PYQ set
```

---

# 10. Grading

Do not use an LLM to decide whether:

```text
2x
```

is the derivative of:

```text
x²
```

Objective questions should have deterministic grading.

```text
MCQ          → exact comparison
numeric      → tolerance
multi-select → set comparison
```

Free-form symbolic expressions are harder.

For the initial product, support controlled answer types. Later, if you need things like:

```text
x² + 2x + 1
```

being recognised as equivalent to:

```text
(x + 1)²
```

add a **small SymPy-based math-evaluation service** rather than trying to turn the entire backend into Python.

That can be deployed separately on Cloud Run only when needed.

---

# 11. Student state

Separate content from user state.

Core tables:

```text
users

course_enrollments

lesson_progress
- user_id
- lesson_id
- status
- started_at
- completed_at

question_attempts
- user_id
- question_id
- answer
- correct
- duration_ms
- attempted_at

assessment_attempts

assessment_question_attempts

bookmarks

user_preferences
```

Later you can derive:

```text
mastery
weak concepts
revision queues
recommended lessons
```

from attempts rather than polluting your content model.

---

# 12. Authentication

Use **Better Auth + Postgres**.

Start with:

```text
Google
Email magic link
```

and simple roles:

```text
STUDENT
EDITOR
ADMIN
```

Better Auth supports Next.js and can use Drizzle/Postgres directly. ([Better Auth][6])

Don't build custom authentication.

---

# 13. Assets

Put these in Cloudflare R2:

```text
images
generated diagrams
videos
animations
PDFs
question attachments
```

Store only asset metadata in Postgres:

```text
assets
- id
- key
- mime_type
- width
- height
- size
- metadata
```

R2 exposes an S3-compatible API, so your storage layer stays fairly portable. ([Cloudflare Docs][7])

---

# 14. Next.js application structure

I would organize the repository by domain rather than technical layer:

```text
src/

  app/
    (learning)/
    admin/
    api/

  modules/
    content/
    questions/
    assessments/
    progress/
    visualizations/
    auth/
    ai/

  components/
    ui/

  db/
    schema/
    migrations/

  lib/

trigger/
  generate-lesson.ts
  generate-questions.ts
  validate-content.ts
```

Inside a module:

```text
modules/content/

  schemas/
  services/
  queries/
  components/
  editors/
  renderers/
```

That will scale far better than dumping everything into `/components` and `/utils`.

---

# 15. API architecture

You don't need a REST API for every operation.

Use:

```text
Server Components
     ↓
direct DB queries

Server Actions
     ↓
mutations from your UI

Route Handlers
     ↓
public APIs
webhooks
external integrations
```

Keep domain logic in:

```text
modules/*/services/
```

rather than putting it directly inside Server Actions.

That keeps it extractable if you ever introduce another backend.

---

# 16. Caching

Published educational content changes rarely.

Use Next.js caching aggressively:

```text
/course/calculus
/chapter/functions
/lesson/domain-and-range
```

Published lesson:

```text
DB
 ↓
server rendering
 ↓
cached
```

On publish:

```text
revalidateTag(`lesson:${lessonId}`)
revalidateTag(`chapter:${chapterId}`)
```

User-specific things such as progress and attempts remain dynamic.

---

# 17. Database environments

Use Neon:

```text
production
staging
preview/dev branches
```

Its database branching model is particularly useful with Vercel preview deployments. ([Neon][8])

Schema changes should always go:

```text
Drizzle schema
      ↓
generated migration
      ↓
Git
      ↓
CI
      ↓
database
```

Never manually modify the production database schema.

---

# 18. Deployment

Keep it boring:

```text
GitHub
  │
  ├── PR
  │    ↓
  │  Vercel Preview
  │    ↓
  │  Neon preview DB
  │
  └── main
       ↓
     Vercel Production
       ↓
     Neon Production
```

Then separately:

```text
Trigger.dev → background processing

Cloudflare R2 → assets
```

Vercel provides first-class Next.js deployments and Git-based preview environments. ([Vercel][9])

---

# 19. Testing strategy

### Unit

Vitest:

```text
grading
content validation
math utilities
progress calculations
question generation
```

### Component

React Testing Library:

```text
question components
visualizations
block renderer
```

### E2E

Playwright:

```text
signup
start lesson
answer question
complete lesson
take test
admin creates lesson
publish lesson
```

Most important tests should be around **content schemas and grading**. A rendering bug is annoying; incorrectly marking a student's correct answer wrong destroys trust.

---

# 20. What I would explicitly avoid

At least initially:

```text
❌ Microservices
❌ Kubernetes
❌ Separate frontend/backend repos
❌ Redis
❌ Elasticsearch
❌ Dedicated vector database
❌ Generic third-party CMS
❌ GraphQL
❌ Event-driven everything
❌ LLM-based grading
❌ Lessons hardcoded as React
❌ Arbitrary executable JS stored in DB
```

You won't need any of them for a long time.

---

# Final architecture

The core design can be summarized as:

```text
                NEXT.JS MODULAR MONOLITH

        ┌──────────────────────────────┐
        │          Student UI          │
        │          Admin CMS           │
        │       Content Renderer       │
        │      Assessment Engine       │
        │   Visualization Components   │
        │       Progress Engine        │
        └──────────────┬───────────────┘
                       │
            ┌──────────┴───────────┐
            │                      │
       Neon/Postgres          Cloudflare R2
            │
       Structured data
       + JSONB blocks

                       │
                 Trigger.dev
                       │
                  AI generation
                       │
                   Draft CMS
```

The key architectural principle is **separating the learning platform from the learning material**:

**Code owns behavior:** rendering, visualizations, grading, validation, interaction and workflows.

**Database owns content:** courses, hierarchy, lessons, questions, tests, versions and configuration.

**AI produces structured drafts:** it never becomes your content database or application runtime.

That separation will let you build calculus now and later add algebra, physics, chemistry, etc. largely by adding **data and reusable block/visualization types**, rather than redesigning the application each time.

[1]: https://nextjs.org/docs?utm_source=chatgpt.com "Next.js Docs | Next.js"
[2]: https://orm.drizzle.team/docs/overview?utm_source=chatgpt.com "Drizzle ORM - Why Drizzle?"
[3]: https://trigger.dev/product?utm_source=chatgpt.com "Product | Trigger.dev"
[4]: https://mathjs.org/docs/expressions/parsing.html?utm_source=chatgpt.com "math.js | an extensive math library for JavaScript and Node.js"
[5]: https://katex.org/docs/browser?utm_source=chatgpt.com "Browser · KaTeX"
[6]: https://better-auth.com/docs/integrations/next?utm_source=chatgpt.com "Next.js integration | Better Auth"
[7]: https://developers.cloudflare.com/r2/get-started/s3/?utm_source=chatgpt.com "S3 · Cloudflare R2 docs"
[8]: https://neon.com/docs/introduction/branching?utm_source=chatgpt.com "Branching - Neon Docs"
[9]: https://vercel.com/docs/frameworks/full-stack/nextjs?utm_source=chatgpt.com "Next.js on Vercel"

