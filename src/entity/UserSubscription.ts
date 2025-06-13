import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Plan } from "./Plan";

@Entity()
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  plan: Plan;

  @Column("decimal", { precision: 10, scale: 2 })
  paymentAmount: number;

  @Column()
  duration: number; // in days

  @Column() // pending, completed, failed
  paymentStatus: string;

  @Column({ type: "timestamp" })
  renewDate: Date;

  @Column({ default: "inactive" }) // active, expired, cancelled
  subscriptionStatus: string;

  @Column({ default: false })
  autoRenew: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
