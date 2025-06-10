import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { loginSchema } from "../validations/login.validation";
import validatePayload from "../middleware/validatePayload.middleware";


class UserRoute implements Routes {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validatePayload({ body: loginSchema }),
      // this.UserController.login
    );

  }
}
export default UserRoute;
