import { NextFunction, Request, Response } from "express";
import ResponseService from "../services/response.service";
import subscriptionService from "../services/subscription.service";
class SubscriptionController extends ResponseService {
  private readonly subscriptionService = subscriptionService;
  createBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const { statusCode, data, message } =
        await this.subscriptionService.createBill(payload);
      this.sendResponse(res, statusCode, data, message);
    } catch (error) {
      next(error);
    }
  };

  disableEnableAutoRenew = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { isDisable } = req.body
      // const { statusCode, data, message } =
      //   await this.subscriptionService.disableEnableAutoRenew(isDisable);
      // this.sendResponse(res, statusCode, {}, message);
    } catch (error) {
      next(error);
    }
  };
}

const subscriptionController = new SubscriptionController();
export default subscriptionController;
