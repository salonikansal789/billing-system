import Response  from "express";
import { IUser } from "./user.interface";
export interface ICustomResponse extends Response{
    success: boolean
    statusCode: number
    message: string
    data: object
}
export interface ICustomRequest extends Request {
  cookies: {
    jwt: string;
    [key: string]: any;
  };

  user?: IUser ;
}