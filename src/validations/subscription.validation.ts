import Joi, { ObjectSchema } from "joi";
import { IBill } from "../interface/subscription.interface";



export const createBillSchema: ObjectSchema<IBill> = Joi.object<IBill>({
  userID: Joi.string().required(),
  planID: Joi.string().required(),
  amount: Joi.number().required(),
}).unknown(false);

export const enableDisableAutoRenewSchema = Joi.object({
  isDisable: Joi.boolean().required(),
}).unknown(false);
