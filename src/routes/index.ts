import UserRoute from "./user.route";
import PlansRoute from "./plans.route";
import StripeRoute from "./stripe.route";
export const routes = [new UserRoute(), new PlansRoute(), new StripeRoute()];
