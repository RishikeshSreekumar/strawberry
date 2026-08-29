import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth, type SessionUser } from "./auth";

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

/** Requires a signed-in, approved user. Redirects otherwise. */
export async function requireUser(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.status !== "approved") redirect("/pending");
  return session.user;
}

/** Requires an approved user with editor or admin role. */
export async function requireEditor(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "editor" && user.role !== "admin") redirect("/");
  return user;
}

/** Requires an approved admin. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/");
  return user;
}
