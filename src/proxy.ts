import { AuthTokenService } from "@/app/api/services/AuthTokenService";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = [
  "/admin/addProjects",
  "/admin/myProjects",
  "/api/project/add-project",
  "/api/project/auth/logout",
  "/api/project/get-project/user-projects",
  "/api/project/delete-project",
];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname.startsWith(route) ||
      routing.locales.some((locale) =>
        pathname.startsWith(`/${locale}${route}`),
      ),
  );

  if (isProtectedRoute) {
    try {
      await AuthTokenService.verifyToken(req);
    } catch (err) {
      console.log("[middleware] Error verifying token", err);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|.*\\..*).*)",
    "/api/project/add-project/:path*",
    "/api/project/auth/logout/:path*",
    "/api/project/get-project/user-projects/:path*",
    "/api/project/delete-project/:path*",
  ],
};
