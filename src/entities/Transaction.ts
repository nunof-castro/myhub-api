import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { SubCategory } from "./SubCategory";
  
  
  @Entity("transactions")
  export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "enum", enum: ["debit", "credit"], nullable: false })
    type: string;
  
    @Column()
    amount: number;
  
    @Column("double", {scale:2})
    description:string;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.transactions)
    @JoinColumn({ name: "subcategory_id" })
    subCategory: SubCategory;
  }
  