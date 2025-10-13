import { MySQL } from "@/utils/database/connection";
import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";
  try {
    const mysql = await MySQL();
    const { email, password } = await req.json();

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const [rows]: any[] = await mysql.execute(query, [email, password]);

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    await mysql.end();

    const token = await new jose.SignJWT({ email: rows[0].email })
      .setExpirationTime("7d")
      .setProtectedHeader({ alg })
      .sign(secret);

    const response = NextResponse.json({ success: true, user: rows[0] });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
