"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user, type UserRole, type UserStatus } from "@/db/schema";
import { requireAdmin } from "@/modules/auth/session";

export async function setUserStatus(userId: string, status: UserStatus) {
  const admin = await requireAdmin();
  if (userId === admin.id) throw new Error("You cannot change your own status");
  await db
    .update(user)
    .set({ status, updatedAt: new Date() })
    .where(eq(user.id, userId));
  revalidatePath("/admin/users");
}

export async function setUserRole(userId: string, role: UserRole) {
  const admin = await requireAdmin();
  if (userId === admin.id) throw new Error("You cannot change your own role");
  await db
    .update(user)
    .set({ role, updatedAt: new Date() })
    .where(eq(user.id, userId));
  revalidatePath("/admin/users");
}
