import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Category } from "./Category";
import { SubCategory } from "./SubCategory";
import { User } from "./User";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: ["debit", "credit"], nullable: false })
  type: string;

  @Column({ nullable: false })
  amount: number;

  @Column()
  description: string;

  @Column({ type: "date" })
  date: Date;

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.transactions, {
    nullable: false,
  })
  @JoinColumn({ name: "subcategory_id" })
  subCategory: SubCategory;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: "user_id" })
  user: User;
}
