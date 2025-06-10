import Joi, { ObjectSchema } from "joi";
import { ILogin } from "../interface/user.interface";
import { profile } from "console";

export const loginSchema: ObjectSchema<ILogin> = Joi.object<ILogin>({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false);
