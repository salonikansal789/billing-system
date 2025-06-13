import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "mysql-db",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "WJ@28@krhps",
  database: process.env.MYSQL_DATABASE || "billingSystemDb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
