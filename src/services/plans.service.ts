import { AppDataSource } from "../db";
import { Plan } from "../entity/Plan";

class PlanService {
  private planRepo = AppDataSource.getRepository(Plan);

  async getAllPlans(): Promise<Plan[]> {
    return this.planRepo.find();
  }

  async createPlan(
    planTitle: string,
    planAmount: number,
    description: string
  ): Promise<Plan> {
    const plan = this.planRepo.create({ planTitle, planAmount, description });
    return this.planRepo.save(plan);
  }

  async updatePlan(
    planID: number,
    planTitle: string,
    planAmount: number,
    description: string
  ): Promise<Plan> {
    const plan = await this.planRepo.findOneBy({ planID });
    if (!plan) throw new Error("Plan not found");

    plan.planTitle = planTitle;
    plan.planAmount = planAmount;
    plan.description = description;

    return this.planRepo.save(plan);
  }
}

export const planService = new PlanService();
