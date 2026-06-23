import { clerkMiddleware } from "@clerk/nextjs/server";

// No protected routes — all pages are publicly accessible.
// Clerk stays installed but dormant.
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
