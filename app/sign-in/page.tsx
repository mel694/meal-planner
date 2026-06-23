import { redirect } from "next/navigation";

// Login is no longer required. Redirect anyone who lands here to the planner.
export default function SignInPage() {
  redirect("/app");
}
