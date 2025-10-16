import mysql from "mysql2";

export async function MySQL() {
  const connection = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
  });

  const pool = connection.promise();
  return pool;
}
