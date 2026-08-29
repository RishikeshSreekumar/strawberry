import { asc } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema";
import { requireAdmin } from "@/modules/auth/session";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserRowActions } from "./user-row-actions";
import { Badge } from "@/components/ui/badge";

const statusVariant = {
  approved: "default",
  pending: "secondary",
  suspended: "destructive",
} as const;

export default async function AdminUsersPage() {
  const admin = await requireAdmin();
  const users = await db.select().from(user).orderBy(asc(user.createdAt));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell className="capitalize">{u.role}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[u.status]} className="capitalize">
                  {u.status}
                </Badge>
              </TableCell>
              <TableCell>{u.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                {u.id !== admin.id && (
                  <UserRowActions
                    userId={u.id}
                    role={u.role}
                    status={u.status}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
