import { NextFunction, Request, Response } from "express";
import { planService } from "../services/plans.service";
import { common } from "../helper/common";
import redisClient from "../redis/redis.config";

class PlanController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cacheKey = "plans:data";

      const cachedPlans = await redisClient.get(cacheKey);
      if (cachedPlans) {
        common.sendResponse(
          res,
          true,
          "Fetched from cache",
          JSON.parse(cachedPlans),
          200
        );
        return;
  
      }
      const plans = await planService.getAllPlans();
      await redisClient.set(cacheKey, JSON.stringify(plans), { EX: 3600 });

      common.sendResponse(res, true, "Get data succesfully!", plans, 200);
    } catch (err) {
      console.error("Error in getAll plans:", err);
      next(err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { planTitle, planAmount, description } = req.body;

      const plan = await planService.createPlan(
        planTitle,
        planAmount,
        description
      );
      common.sendResponse(res, true, "Create data succesfully!", plan, 200);
    } catch (err) {
      console.error("Error in getAll plans:", err);
      return;
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { planTitle, planAmount, description } = req.body;

    try {
      const plan = await planService.updatePlan(
        +id,
        planTitle,
        planAmount,
        description
      );
      res.json({ success: true, plan });
      common.sendResponse(res, true, "U[date data succesfully!", plan, 200);
    } catch (err: any) {
      common.sendResponse(res, false, "update failed", {}, 400);
    }
  }
}

export const planController = new PlanController();
