import { MySQL } from "@/utils/database/connection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mysql = await MySQL();

    const query = `SELECT * FROM projects ORDER BY title ASC;`;
    const [rows]: any[] = await mysql.execute(query);

    await mysql.end();

    return NextResponse.json({ projects: rows }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
