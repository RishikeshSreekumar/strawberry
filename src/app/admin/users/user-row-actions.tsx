"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole, UserStatus } from "@/db/schema";
import { setUserRole, setUserStatus } from "./actions";

export function UserRowActions({
  userId,
  role,
  status,
}: {
  userId: string;
  role: UserRole;
  status: UserStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-2">
      <Select
        value={role}
        disabled={isPending}
        onValueChange={(value) =>
          startTransition(() => setUserRole(userId, value as UserRole))
        }
      >
        <SelectTrigger size="sm" className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      {status !== "approved" && (
        <Button
          size="sm"
          disabled={isPending}
          onClick={() =>
            startTransition(() => setUserStatus(userId, "approved"))
          }
        >
          Approve
        </Button>
      )}
      {status !== "suspended" && (
        <Button
          size="sm"
          variant="destructive"
          disabled={isPending}
          onClick={() =>
            startTransition(() => setUserStatus(userId, "suspended"))
          }
        >
          Suspend
        </Button>
      )}
    </div>
  );
}
