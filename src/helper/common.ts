import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class Common {
  public sendResponse = (
    res: Response,
    success: boolean,
    message: string,
    data: {},
    statusCode: number
  ): Promise<Response> => {
    return Promise.resolve(
      res.status(statusCode).json({
        success: success,
        message: message,
        data: data,
      })
    );
  };

  public generateToken = (userID: string, res: Response): String => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return token;
  };
  
  public verifyJWT = async (token: string): Promise<{} | boolean> => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
        algorithms: ["RS256"],
      });
      return decoded;
    } catch (error) {
      console.error("Error in verifyJWT:", error);
      return false;
    }
  };
}
export const common = new Common();

