# 🍓 Strawberry

An interactive math-learning platform (calculus first). Next.js modular monolith with a controlled content platform: relational structure + JSONB lesson blocks, an in-app admin CMS, and versioned publishing. See `tech_plan.md` for the full architecture.

## Stack

Next.js (App Router, TS) · Tailwind v4 + shadcn/ui · Drizzle ORM · Neon Postgres · Better Auth (Google OAuth) · Zod · KaTeX · Vitest. Runs on Vercel Hobby + Neon free tier — $0 until there are paying users.

## Setup

### 1. Install

```bash
pnpm install
```

### 2. Database (Neon)

1. Create a free project at [neon.tech](https://neon.tech).
2. The default branch is production; create a `dev` branch for local work.
3. Copy the `dev` branch connection string.

### 3. Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com) → create a project.
2. **APIs & Services → OAuth consent screen**: External, add yourself as a test user.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy the client ID and secret.

### 4. Environment

```bash
cp .env.example .env
openssl rand -base64 32   # → BETTER_AUTH_SECRET
```

Fill in `DATABASE_URL` (dev branch), Google credentials, and put your own email in `ADMIN_EMAILS` — that grants you admin + auto-approval on first sign-in.

### 5. Migrate, seed, run

```bash
pnpm db:migrate   # apply migrations to the dev branch
pnpm db:seed      # sample calculus course
pnpm dev
```

Sign in at `http://localhost:3000` with your admin email → you land on `/courses` and can open `/admin`.

## How access works

- Anyone can sign in with Google, but new users get `status: pending` and only see an "awaiting approval" screen.
- Emails in `ADMIN_EMAILS` are auto-approved as `admin` on first sign-in.
- Admins approve/suspend users and assign roles (`student` / `editor` / `admin`) at `/admin/users`.
- `/admin` requires editor or admin; user management requires admin.

## Content model

`courses → chapters → lessons → lesson_versions`. Lesson content is a JSONB array of typed blocks (`text`, `math`, `callout` so far), validated by Zod schemas in `src/modules/content/schemas/blocks.ts` and rendered by `src/modules/content/components/block-renderer.tsx`. Publishing is a pointer swap (`lessons.published_version_id`), so rollback is trivial and drafts never touch live content.

To add a block type: extend the Zod union, add a case to `BlockRenderer`, bump nothing (schema_version covers breaking changes only).

## Scripts

| Command | What |
| --- | --- |
| `pnpm dev` | dev server |
| `pnpm build` | production build |
| `pnpm test` | Vitest (schemas + versioning against in-memory Postgres) |
| `pnpm db:generate` | generate migration from schema changes |
| `pnpm db:migrate` | apply migrations to `DATABASE_URL` |
| `pnpm db:seed` | seed sample course |
| `pnpm db:studio` | Drizzle Studio |

## Deploy (Vercel)

1. Push to GitHub, import the repo in Vercel (Hobby).
2. Set env vars: `DATABASE_URL` (Neon **production** branch), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (`https://your-domain.vercel.app`), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ADMIN_EMAILS`.
3. Add the production callback URL in Google Console: `https://your-domain.vercel.app/api/auth/callback/google` (and the domain as an authorized origin).
4. Run migrations against production: `DATABASE_URL=<prod-url> pnpm db:migrate`.

> Note: Vercel's Hobby tier is for non-commercial use. Move to Pro (or another host) when charging users.

## Deferred by design

Trigger.dev (AI generation will start as local scripts), Cloudflare R2, Sentry/PostHog, Tiptap, magic-link email, the question/assessment engine, and visualizations — see `tech_plan.md` for where they slot in.
