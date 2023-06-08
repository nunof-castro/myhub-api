import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Transaction } from "./Transaction";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: ["debit", "credit"], nullable: false })
  type: string;

  @Column()
  name: string;

  @Column("double", { scale: 2 })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
