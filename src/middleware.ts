import { NextRequest, NextResponse } from "next/server";
import { AuthTokenService } from "./core/services/AuthTokenService";

export async function middleware(req: NextRequest) {
  try {
    await AuthTokenService.verifyToken(req);
    return NextResponse.next();
  } catch (err) {
    console.log("[middleware] Error verifying token", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/admin/addProjects/:path*",
    "/admin/myProjects/:path*",
    "/api/project/add-project/:path*",
    "/api/project/auth/logout/:path*",
    "/api/project/get-project/user-projects/:path*",
    "/api/project/delete-project/:path*",
  ],
};
