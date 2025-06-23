import Joi, { ObjectSchema } from "joi";
import { ILogin, ISignup } from "../interface/user.interface";
import { profile } from "console";

export const loginSchema: ObjectSchema<ILogin> = Joi.object<ILogin>({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false);

export const signupSchema: ObjectSchema<ISignup> = Joi.object<ISignup>({
  email: Joi.string().required(),
  password: Joi.string().required(),
  mobileNo: Joi.string().required(),
  name: Joi.string().required(),
}).unknown(false);
