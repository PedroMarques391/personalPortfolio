import mysql from "mysql2";

const MySQL = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: process.env.DATABASE_PORT,
    ssl: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  })
  .promise();

export default MySQL;
