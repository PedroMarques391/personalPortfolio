import { MySQL } from "@/utils/database/connection";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const token = req.cookies.get("token")?.value;

    console.log(token);

    if (!token)
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const mysql = await MySQL();

    const { title, description, type, tags, url, imageURL } = await req.json();

    const query = `INSERT INTO projects (title, content, type, tags, url, imageURL, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const [rows]: any[] = await mysql.execute(query, [
      title,
      description,
      type,
      tags,
      url,
      imageURL.split(",")[0],
      payload.id,
    ]);

    await mysql.end();

    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
