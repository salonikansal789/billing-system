import { NextFunction, Request, Response } from "express";
import ResponseService from "../services/response.service";
import userService from "../services/user.service";
class UserController extends ResponseService {
  private userService = userService;
  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("hello signup");

      const { name, mobileNo, email, password } = req.body;
      const user = await this.userService.signup(
        name,
        mobileNo,
        email,
        password,
        "user"
      );
      this.sendResponse(res, 200, user, "Signup successfully...");
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password, res);
      this.sendResponse(res, 200, user, "Login successfully...");
    } catch (error) {
      next(error);
    }
  };
}

const userController = new UserController();
export default userController;
