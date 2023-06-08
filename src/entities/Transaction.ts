import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SubCategory } from "./SubCategory";
import { User } from "./User";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: ["debit", "credit"], nullable: false })
  type: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column({ type: "date" })
  date: Date;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.transactions)
  @JoinColumn({ name: "subcategory_id" })
  subCategory: SubCategory;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: "user_id" })
  user: User;
}
