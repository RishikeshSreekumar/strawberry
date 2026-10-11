"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/modules/auth/client";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await signOut();
        // A full page load, not a router push: it drops the client router
        // cache and in-memory state (e.g. lib/session-progress.ts), so
        // nothing from this account carries over to the next sign-in.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- deliberate hard navigation (see above)
        window.location.assign("/sign-in");
      }}
    >
      Sign out
    </Button>
  );
}
