import { redirect } from "next/navigation";
import { getSession } from "@/modules/auth/session";

export default async function Home() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.status !== "approved") redirect("/pending");
  redirect("/courses");
}
