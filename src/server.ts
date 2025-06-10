import mysql from "mysql2/promise";
import { db } from "./db.js";


export async function start() {
  try {
    const [rows] = await db.query("SELECT NOW() AS time");
    console.log("DB Connected. Time:", rows);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

