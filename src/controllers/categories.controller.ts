import { Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

const categoryRepository = AppDataSource.getRepository(Category);

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

    try {
      await categoryRepository.save(newCategory);
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
    return res.status(200).json(await categoryRepository.find());
  } catch (error) {
    return res.status(500).json({ message: "Failed to get categories" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categoryToDelete = await categoryRepository.findOneByOrFail({
      id: Number(id),
    });

    const { name } = categoryToDelete;

    await categoryRepository.remove(categoryToDelete);
    return res
      .status(200)
      .json({ message: `Category ${name} deleted successfully` });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Category with id ${id} not found` });
  }
};
