import { Request, Response, NextFunction } from "express";
import { ICustomRequest,ICustomResponse } from "../interface/response.interface";
import { common } from "../helper/common";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../interface/user.interface";

class Authentication {
  private readonly common = common;


  public authenticateByJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ICustomResponse | void> => {
    try {
      let token: string;
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith("Bearer")) {
        await this.common.sendResponse(
          res,
          false,
          "Un-Authorized Request",
          {},
          401
        );
        return;
      }

      token = authorization.split(" ")[1];

      if (!token) {
        await this.common.sendResponse(
          res,
          false,
          "Please Provide Token",
          {},
          401
        );
        return;
      }

      if (token) {
        const decoded = (await this.common.verifyJWT(token)) as
          | {
              _id: number;
              iat: number;
              exp: number;
              permissions: Array<string>;
              roleId: number;
            }
          | false;
        if (!decoded) {
          await this.common.sendResponse(
            res,
            false,
            "Error In Verifying Token",
            {},
            401
          );
          return;
        }

        const user = await db("users").where({ userID: decoded._id }).first();
        if (user) {
          req.user = user;

          // Added roles and permissions

          req.user.permissions = decoded.permissions;
          req.user.roleId = decoded.roleId;

          return next();
        }
        await this.common.sendResponse(
          res,
          false,
          "Unauthorised Request: Incorrect Token",
          {},
          401
        );
        return;
      } else {
        await this.common.sendResponse(
          res,
          false,
          "Unauthorised Request",
          {},
          401
        );
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      next(new HttpException(401, "Wrong authentication token"));
    }
  };
}

export default Authentication;
