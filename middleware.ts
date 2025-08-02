import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
      Protect all routes except static files, _next, and API routes if needed
    */
    "/((?!.*\\..*|_next).*)",
    "/",
  ],
};
