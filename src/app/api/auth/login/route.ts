import { AuthTokenService } from "@/app/api/services/AuthTokenService";
import { CookieService } from "@/app/api/services/CookieService";
import { TUserLogin } from "@/model/UserModel";
import { NextRequest, NextResponse } from "next/server";
import UserRepository from "../../repository/UserRepository";
import UserService from "../../services/UserService";
export async function POST(req: NextRequest) {
  try {
    const data: TUserLogin = await req.json();
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const user = await userService.login(data);
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
