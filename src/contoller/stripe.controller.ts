import { NextFunction, Request, Response } from "express";
import { planService } from "../services/plans.service";
import Stripe from "stripe";
import { common } from "../helper/common";
import ResponseService from "../services/response.service";
import { AppDataSource } from "../db";
import { User } from "../entity/User";
import { UserSubscription } from "../entity/UserSubscription";
import { Plan } from "../entity/Plan";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

class StripeController extends ResponseService {
  // private userRepo = AppDataSource.getRepository(User);
  // private userSubRepo = AppDataSource.getRepository(UserSubscription);
  // private planRepo = AppDataSource.getRepository(Plan);

  async checkout(req: Request, res: Response, next: NextFunction) {
    try {
      const userRepo = AppDataSource.getRepository(User);
      const userSubRepo = AppDataSource.getRepository(UserSubscription);
      const planRepo = AppDataSource.getRepository(Plan);

      const { userID, planID, paymentAmount, receivedAmount } = req.body;
      // const userData = await this.userRepo.findOneBy({
      //   userID: Number(userID),
      // });

      // if (!userData) throw new Error("Not found User");

      // const planData = await planRepo.findOneBy({
      //   planID: Number(planID),
      // });

      // if (!planData) throw new Error("Invalid plan");

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "stripe payment",
              },
              unit_amount: paymentAmount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url:
          "https://checkout.stripe.com/c/pay/cs_test_a1djcG209Z7S8dJZEEVudIsUXbgSOkZPmJKCJlg6R8OlEW5HHYkiEn7Hf6#fidkdWxOYHwnPyd1blpxYHZxWjA0TjR8c0RONzA9U3B9aDFBYGNJRmhwT018VGppYD10XUFKRF1qYEpDaUJEc3NCYENyXGluYEhwcWBVRDYycmsxdGZKMmxqNDBfd3Y1Tm9BNGgwdF9sU3FLNTVzNjBhaG1dRCcpJ2hsYXYnP34naHBsYSc%2FJzI0N2Y2NTQ3KGcwZ2MoMWdjZCg8MDQ9KGExMD08NWA1Z2MwZD03NmZmYCcpJ3ZsYSc%2FJz1nNz1hNGcxKDRkMGAoMWFmMShkZ2ZmKDM1Zz01ZDw1N2NjZzFgPWE1MScpJ2JwbGEnPydmZDNhZ2Y0PShhZ2RhKDE3MzcoZ2EyYShnYzRkZ2BhNTcwPDYzYTUyYTcneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2PyoqYWpmdit2cXdsdWArZmpoJ3gl",

        cancel_url: "https://example.com/cancel",
      });

      console.log("####################", session);
      common.sendResponse(
        res,
        true,
        "Payment succesfully!",
        {
          success_url:
            "https://checkout.stripe.com/c/pay/cs_test_a1djcG209Z7S8dJZEEVudIsUXbgSOkZPmJKCJlg6R8OlEW5HHYkiEn7Hf6#fidkdWxOYHwnPyd1blpxYHZxWjA0TjR8c0RONzA9U3B9aDFBYGNJRmhwT018VGppYD10XUFKRF1qYEpDaUJEc3NCYENyXGluYEhwcWBVRDYycmsxdGZKMmxqNDBfd3Y1Tm9BNGgwdF9sU3FLNTVzNjBhaG1dRCcpJ2hsYXYnP34naHBsYSc%2FJzI0N2Y2NTQ3KGcwZ2MoMWdjZCg8MDQ9KGExMD08NWA1Z2MwZD03NmZmYCcpJ3ZsYSc%2FJz1nNz1hNGcxKDRkMGAoMWFmMShkZ2ZmKDM1Zz01ZDw1N2NjZzFgPWE1MScpJ2JwbGEnPydmZDNhZ2Y0PShhZ2RhKDE3MzcoZ2EyYShnYzRkZ2BhNTcwPDYzYTUyYTcneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2PyoqYWpmdit2cXdsdWArZmpoJ3gl",
        },
        200
      );
    } catch (error) {
      next(error);
    }
  }
}

export const stripeController = new StripeController();
