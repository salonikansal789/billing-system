import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import Authentication from "../middleware/auth.middleware";
import validatePayload from "../middleware/validatePayload.middleware";
import { loginSchema, signupSchema } from "../validations/login.validation";
import userController from "../contoller/user.controller";
class UserRoute implements Routes {
  public path = "/user";
  public router = Router();
  private authentication = new Authentication();
  private userController = userController;
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validatePayload({ body: loginSchema }),
      this.userController.login
    );
    this.router.post(
      `${this.path}/signup`,
      validatePayload({ body: signupSchema }),
      this.userController.signup
    );
  }
}
export default UserRoute;
