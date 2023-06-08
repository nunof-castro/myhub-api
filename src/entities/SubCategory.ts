import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Transaction } from "./Transaction";

@Entity("subcategories")
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => Transaction, (transaction) => transaction.subCategory)
  transactions: Transaction[];
}
