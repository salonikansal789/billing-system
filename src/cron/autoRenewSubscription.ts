import cron from "node-cron";
import { AppDataSource } from "../db";
import { UserSubscription } from "../entity/UserSubscription";
import { Plan } from "../entity/Plan";
export function startAutoRenewCron() {
  cron.schedule("0 9 * * *", async () => {
    console.log("Auto-renew cron job started at 9:00 AM");

    const userSubRepo = AppDataSource.getRepository(UserSubscription);
    const today = new Date();

    const subscriptions = await userSubRepo.find({
      where: {
        autoRenew: true,
        subscriptionStatus: "active",
        paymentStatus: "completed",
      },
      relations: ["plan"],
    });

    for (const sub of subscriptions) {
      if (new Date(sub.renewDate) <= today && sub.planID) {
        const gstRate = 0.18; // 18% GST
        const feeRate = 0.025; // 2.5% platform fee

        const gstAmount = sub.paymentAmount * gstRate;
        const feeAmount = sub.paymentAmount * feeRate;
        const totalAmount = Number(sub.paymentAmount) + gstAmount + feeAmount;
        sub.paymentAmount = totalAmount;
        sub.receivedPayment = totalAmount;
        sub.paymentStatus = "completed";
        sub.renewDate = new Date(
          today.getTime() + sub.duration * 24 * 60 * 60 * 1000
        );
        sub.updatedAt = new Date();

        await userSubRepo.save(sub);
        console.log(` Subscription auto-renewed for user ID ${sub.userID}`);
      }
    }
  });
}
