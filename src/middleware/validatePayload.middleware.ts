import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

interface IValidatePayloadObj {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
}

export default function validatePayload({
  body,
  params,
  query,
}: IValidatePayloadObj) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      if (body) {
        const { error, value } = body.validate(req.body, {
          context: { ...req.query, ...req.params },
          abortEarly: false,
        });

        if (error) {
             throw new Error ('Invalid body request') 
        }
        (req as any).validatedBody = value;
      }

      if (params) {
        const { error, value } = params.validate(req.params, {
          context: { ...req.body, ...req.query },
          abortEarly: false,
        });

        if (error) {
             throw new Error("Invalid params request"); 

        }
        (req as any).validatedParams = value;
      }

      if (query) {
        const { error, value } = query.validate(req.query, {
          context: { ...req.body, ...req.params },
          abortEarly: false,
        });

        if (error) {
             throw new Error("Invalid query request"); 

        }
        (req as any).validatedQuery = value;
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
}
