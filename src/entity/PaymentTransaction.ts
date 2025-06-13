import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { PaymentStatus } from "../enum/payment.enum";

@Entity()
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column()
  paymentGateway: string; // e.g., stripe, razorpay

  @Column()
  transactionId: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "enum", enum: PaymentStatus }) // success, failed, pending
  status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
