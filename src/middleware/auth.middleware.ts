import { Request, Response, NextFunction } from "express";
import { common } from "../helper/common";
import { User } from "../entity/User";
import { AppDataSource } from "../db";
import { ICustomResponse } from "../interface/response.interface";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
enum Roles {
  ADMIN = "admin",
  USER = "user",
}

class Authentication {
  private readonly common = common;

  public authenticationByJWT = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        this.common.sendResponse(
          res,
          false,
          "Unauthorized: No token provided",
          {},
          401
        );
        return;
      }
      const token = authHeader.split(" ")[1];
      const decoded: any = common.verifyJWT(token);
      const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ userID: decoded.id });

      if (!user) {
        this.common.sendResponse(
          res,
          false,
          "Unauthorized: User not found",
          {},
          401
        );
        return;
      }

      req.user = user;
      return next();
    } catch (err) {
      next(err);
    }
  };
  authorizeRole =
    (roles: Array<Roles>) =>
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role as Roles)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }
      next();
    };


}

export default Authentication;
