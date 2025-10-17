import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (error: any) {
    console.error("[logout] Error to logout", error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
