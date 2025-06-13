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
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 15, nullable: false })
  mobileNo: string;

  @Column({ default: "2",nullable:false }) // 1,2
  roleID: string;

  @Column({ default: "user" }) // roles: user, admin
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserSubscription, (subscription) => subscription.user)
  subscriptions: UserSubscription[];
}
