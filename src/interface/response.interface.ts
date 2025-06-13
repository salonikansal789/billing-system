import Response  from "express";
import { IUser } from "./user.interface";
export interface ICustomResponse extends Response{
    success: boolean
    statusCode: number
    message: string
    data: object
}
export interface ICustomRequest extends Request {
  user?: IUser & { permissions: string[]; roleId: number };
}
