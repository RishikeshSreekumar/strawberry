"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/modules/auth/client";

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Strawberry</CardTitle>
          <CardDescription>Learn math by seeing it move.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: "/" })
            }
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
