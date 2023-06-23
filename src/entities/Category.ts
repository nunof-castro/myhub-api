import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { SubCategory } from "./SubCategory";
import { Transaction } from "./Transaction";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category, {})
  transactions: Transaction[];

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subcategories: SubCategory[];
}
