import Joi from "joi";

export const addPlanSchema = Joi.object({
  planTitle: Joi.string().required(),
  planAmount: Joi.number().required(),
  description: Joi.string().required(),
}).unknown(false);

export const editPlanSchema = Joi.object({
  planTitle: Joi.string().optional(),
  planAmount: Joi.number().optional(),
  description: Joi.string().optional(),
}).unknown(false);