import userRepository from "@/app/api/repository/UserRepository";
import { AuthTokenService } from "@/app/api/services/AuthTokenService";
import { CookieService } from "@/app/api/services/CookieService";
import { TUserLogin } from "@/model/UserModel";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const data: TUserLogin = await req.json();

    const user = await userRepository.login(data);
    const token = await AuthTokenService.generateToken(user);

    const response = NextResponse.json(
      { success: true, message: "Autenticado com sucesso." },
      { status: 200 },
    );

    return CookieService.setAuthCookie(response, token);
  } catch (error: any) {
    console.error("[login] Error to login", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
