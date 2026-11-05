import { AuthTokenService } from "@/app/api/services/AuthTokenService";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = [
  "/admin/addProjects",
  "/admin/myProjects",
  "/api/auth/logout",
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
    } catch {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|file|.*\\..*).*)",
    "/api/auth/logout/:path*",
  ],
};
