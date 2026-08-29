import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function connectionString(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  // `next build` evaluates server modules while collecting page data but
  // never runs queries (all authed pages are dynamic), so a placeholder
  // keeps builds env-free. At runtime a missing DATABASE_URL still fails
  // loudly on the first query.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return "postgresql://build:build@localhost:5432/build";
  }
  throw new Error("DATABASE_URL is not set");
}

export const db: NeonHttpDatabase<typeof schema> = drizzle(
  neon(connectionString()),
  { schema },
);
