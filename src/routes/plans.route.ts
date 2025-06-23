import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import validatePayload from "../middleware/validatePayload.middleware";
import Authentication from "../middleware/auth.middleware";
import { planController } from "../contoller/plans.controller";
import { addPlanSchema, editPlanSchema } from "../validations/plan.validation";
class PlansRoute implements Routes {
  public path = "/plans";
  public router = Router();
  private authentication = new Authentication();
  private planController = planController;
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(
      `${this.path}/`,
      this.authentication.authenticationByJWT,
      this.planController.getAll
    );
    this.router.post(
      `${this.path}`,
      this.authentication.authenticationByJWT,
      // this.authentication.authorizeRole(["admin"]),
      validatePayload({ body: addPlanSchema }),
      this.planController.create
    );
    this.router.put(
      `${this.path}/:id`,
      this.authentication.authenticationByJWT,
      // this.authentication.authorizeRole(["admin"]),
      validatePayload({ body: editPlanSchema }),
      this.planController.update
    );
  }
}
export default PlansRoute;
