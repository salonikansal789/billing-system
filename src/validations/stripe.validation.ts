import Joi, { ObjectSchema } from "joi";
import { IChekout } from "../interface/stripe.interface";

export const checkoutSchema: ObjectSchema<IChekout> = Joi.object<IChekout>({
  userID: Joi.string().required(),
  planID: Joi.string().required(),
  paymentAmount: Joi.number().required(),
  receivedAmount: Joi.number().required(),
});
