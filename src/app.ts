import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index";
import { Routes } from "./interface/routes.interface";
import { start } from "./server";

class App {
  public app: Application = express();
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.port || 3000;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    (async () => {
      await this.connectToDatabase(); 
      this.listen();
    })();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.ORIGIN,
        credentials: process.env.CREDENTIALS === "true",
      })
    );
    this.app.use(cookieParser());
  }
  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }
  private connectToDatabase() {
      start()
  }
}

const app = new App(routes);
app.listen();
