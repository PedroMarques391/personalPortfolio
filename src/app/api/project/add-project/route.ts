import { MySQL } from "@/utils/database/connection";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const token = req.cookies.get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const mysql = await MySQL();

    const { title, description, type, tags, url, imageURL } = await req.json();

    const query = `INSERT INTO projects (title, content, type, tags, url, imageURL, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    await mysql.execute(query, [
      title,
      description,
      type,
      tags,
      url,
      imageURL,
      payload.id,
    ]);

    await mysql.end();

    return NextResponse.json(
      { message: "Project created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
