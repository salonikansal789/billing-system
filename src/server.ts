import mysql from "mysql2/promise";
import { AppDataSource } from "./db";


export async function start() {
  try {
    console.log("hello, i am connecting your mysql db..............")
    AppDataSource.initialize()
    console.log("DB Connected. Time:");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

