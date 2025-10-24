import { CookieService } from "@/core/services/CookieService";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });

    return CookieService.removeAuthCookie(response);
  } catch (error: any) {
    console.error("[logout] Error to logout", error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
