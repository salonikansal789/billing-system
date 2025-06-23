import { NextFunction, Request, Response } from "express";
import ResponseService from "../services/response.service";
import { IBill } from "../interface/subscription.interface";
import { AppDataSource } from "../db";
import { UserSubscription } from "../entity/UserSubscription";
class SubscriptionService extends ResponseService {
  private userSubRepo = AppDataSource.getRepository(UserSubscription);

  createBill = async (payload: IBill) => {
    const { userID, planID, amount } = payload;

    const gstRate = 0.18; // 18% GST
    const feeRate = 0.025; // 2.5% platform fee

    const gstAmount = amount * gstRate;
    const feeAmount = amount * feeRate;
    const totalAmount = Number(amount) + gstAmount + feeAmount;

    await this.userSubRepo.create({
      userID: Number(userID),
      planID: Number(planID),
      paymentStatus: "pending",
      paymentAmount: totalAmount,
    });

    const data = {
      userID,
      planID,
      baseAmount: Number(amount),
      gstAmount: Number(gstAmount.toFixed(2)),
      feeAmount: Number(feeAmount.toFixed(2)),
      totalPayable: Number(totalAmount.toFixed(2)),
    };

    return this.serviceResponse(200, data, "Bill Created successfully...");
  };

  disableEnableAutoRenew = async (
isDisable:boolean
  ) => {

  };
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;
