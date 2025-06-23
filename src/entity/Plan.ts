import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserSubscription } from "./UserSubscription";
@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  planID: number;

  @Column()
  planTitle: string;

  @Column()
  description : string;

  @Column({ default: "inactive" })
  status: string;

  @Column("decimal", { precision: 10, scale: 2 })
  planAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserSubscription, (subscription) => subscription.planID)
  subscriptions: UserSubscription[];
}
