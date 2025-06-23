import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import Authentication from "../middleware/auth.middleware";
import validatePayload from "../middleware/validatePayload.middleware";
import { createBillSchema, enableDisableAutoRenewSchema } from "../validations/subscription.validation";
import subscriptionController from "../contoller/subscription.controller";
class SubscriptionRoute implements Routes {
  public path = "/subscribe";
  public router = Router();
  private authentication = new Authentication();
  private subscriptionController = subscriptionController;
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      "/create-bill",
      this.authentication.authenticationByJWT,
      validatePayload({ body: createBillSchema }),
      this.subscriptionController.createBill
    );
    this.router.put(
      `${this.path}/enable-disable-auto-renew`,
      this.authentication.authenticationByJWT,
      validatePayload({body:enableDisableAutoRenewSchema}),
      this.subscriptionController.disableEnableAutoRenew
    )
  }
}
export default SubscriptionRoute;
