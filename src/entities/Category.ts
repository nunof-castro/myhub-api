import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from "./SubCategory";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category, {
    onDelete: "CASCADE",
  })
  subcategories: SubCategory[];
}
