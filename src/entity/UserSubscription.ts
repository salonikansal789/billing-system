import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Plan } from "./Plan";

@Entity()
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column()
  planID: number;

  @Column("decimal", { precision: 10, scale: 2 })
  paymentAmount: number;

  @Column("decimal", { precision: 10, scale: 2 })
  receivedPayment: number;

  @Column()
  duration: number; // in days

  @Column() // pending, completed, failed
  paymentStatus: string;

  @Column({ type: "timestamp" })
  renewDate: Date;

  @Column({ default: "inactive" }) // active, expired, cancelled
  subscriptionStatus: string;

  @Column({ default: true })
  autoRenew: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
