import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/account(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { protect } = await auth();
    await protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
