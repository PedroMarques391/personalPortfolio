import userRepository from "@/core/repository/UserRepository";
import { AuthTokenService } from "@/core/services/AuthTokenService";
import { CookieService } from "@/core/services/CookieService";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await userRepository.login(email, password);
    const token = await AuthTokenService.generateToken(user);

    const response = NextResponse.json(
      { success: true, message: "Autenticado com sucesso." },
      { status: 200 }
    );

    return CookieService.setAuthCookie(response, token);
  } catch (error: any) {
    console.error("[login] Error to login", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
