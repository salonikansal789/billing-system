import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./entity/User";
import { Plan } from "./entity/Plan";
import "reflect-metadata";

import { UserSubscription } from "./entity/UserSubscription";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  host: "localhost",
  username: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "WJ@28@krhps",
  database: process.env.MYSQL_DATABASE || "billingSystemDb",
  entities: [User, Plan, UserSubscription],
  synchronize: true,
  logging:true
});
