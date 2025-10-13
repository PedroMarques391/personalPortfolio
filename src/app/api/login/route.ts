import { MySQL } from "@/utils/database/connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    return NextResponse.json(rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
