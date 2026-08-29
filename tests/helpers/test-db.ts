import fs from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "@/db/schema";
import type { DB } from "@/modules/content/services/content-service";

/** In-memory Postgres with the real migrations applied. */
export async function createTestDb(): Promise<DB> {
  const client = new PGlite();
  const migrationsDir = path.resolve(__dirname, "../../src/db/migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    for (const statement of sql.split("--> statement-breakpoint")) {
      await client.exec(statement);
    }
  }
  return drizzle(client, { schema }) as unknown as DB;
}
