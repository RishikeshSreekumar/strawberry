import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/modules/auth/session";
import { SignOutButton } from "./sign-out-button";

export default async function PendingPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.status === "approved") redirect("/");

  const suspended = session.user.status === "suspended";

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {suspended ? "Account suspended" : "Awaiting approval"}
          </CardTitle>
          <CardDescription>
            {suspended
              ? "Your account has been suspended. Contact us if you think this is a mistake."
              : "Thanks for signing up! Your account is waiting for approval — you'll get access as soon as it's reviewed."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignOutButton />
        </CardContent>
      </Card>
    </main>
  );
}
