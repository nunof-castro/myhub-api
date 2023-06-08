import { Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { SubCategory } from "../entities/SubCategory";

const categoryRepository = AppDataSource.getRepository(Category);
const subCategoryRepository = AppDataSource.getRepository(SubCategory);

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const categoryExists = await categoryRepository.findOne({
    where: { name: ILike(name) },
  });

  if (categoryExists) {
    return res.status(400).json({ message: "Category already exists" });
  } else {
    const newCategory = new Category();
    newCategory.name = name;

    const newSubCategory = new SubCategory();
    newSubCategory.name = name;
    newSubCategory.category = newCategory;

    try {
      await categoryRepository.save(newCategory);
      await subCategoryRepository.save(newSubCategory);

      return res.status(201).json({
        category: newCategory,
        message: "Category created with success",
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to create category" });
    }
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryRepository.find();

    if (categories.length !== 0) {
      return res.status(200).send(categories);
    } else {
      return res.status(400).send("No categories created");
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to get categories" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    //Find the category to be deleted
    const categoryToDelete = await categoryRepository.findOneByOrFail({
      id: Number(id),
    });

    //Find subcategories associated to the category
    const relatedSubcategories = await subCategoryRepository.find({
      where: { category: categoryToDelete },
    });

    //Delete all subcategories
    await subCategoryRepository.remove(relatedSubcategories);

    //Delete the category
    await categoryRepository.remove(categoryToDelete);

    const { name } = categoryToDelete;
    
    return res
      .status(200)
      .json({ message: `Category ${name} successfully deleted!` });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Category with id ${id} not found` });
  }
};
