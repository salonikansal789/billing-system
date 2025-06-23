import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import { loginSchema, signupSchema } from "../validations/login.validation";
import validatePayload from "../middleware/validatePayload.middleware";
import Authentication from "../middleware/auth.middleware";
import { checkoutSchema } from "../validations/stripe.validation";
import { stripeController } from "../contoller/stripe.controller";
class StripeRoute implements Routes {
  public path = "/stripe";
  public router = Router();
  private stripeController = stripeController;
  private authentication = new Authentication();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/checkout`,
      // this.authentication.authenticationByJWT,
      validatePayload({ body: checkoutSchema }),
      this.stripeController.checkout.bind(this.stripeController)
    );
  }
}
export default StripeRoute
