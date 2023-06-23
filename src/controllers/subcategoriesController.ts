import { Request, Response } from "express";
import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { SubCategory } from "../entities/SubCategory";

const categoryRepository = AppDataSource.getRepository(Category);
const subcategoryRepository = AppDataSource.getRepository(SubCategory);

export const createSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  //Check if a category with the id passed on the endpoint exists
  const category = await categoryRepository.findOne({
    where: { id: Number(id) },
  });

  if (!category) {
    return res
      .status(404)
      .json({ message: `There is no category with id ${id}` });
  } else {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    //check if a subcategory already exists on that category
    const subcategoryExists = await subcategoryRepository.findOne({
      where: { name: ILike(name), category: category },
    });

    if (subcategoryExists) {
      return res.status(400).json({ message: "Subcategory already exists!" });
    } else {
      //create the subcategory
      const newSubcategory = new SubCategory();
      newSubcategory.name = name;

      try {
        await subcategoryRepository.save(newSubcategory);

        return res.status(201).json({
          subcategory: newSubcategory,
          message: "Subcategory created with success",
        });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Failed to create Subcategory" });
      }
    }
  }
};

export const getSubcategorieByCategoryId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const category = await categoryRepository.findOne({
      where: { id: Number(id) },
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with id ${id} not found` });
    }

    const subcategories = await subcategoryRepository.find({
      where: { category },
      relations: ["category"],
    });

    return res.status(200).json(subcategories);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSubcategory = async (req: Request, res: Response) => {
  const { id, subcategoryId } = req.params;

  try {
    const category = await categoryRepository.findOne({
      where: { id: Number(id) },
    });

    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with id ${id} not found` });
    }

    const subcategory = await subcategoryRepository.findOne({
      where: { id: Number(subcategoryId), category },
    });

    if (!subcategory) {
      return res.status(404).json({
        message: `Subcategory with id ${subcategoryId} not found on category ${category.name}!`,
      });
    }

    await subcategoryRepository.remove(subcategory);

    return res.status(200).json({
      message: `Subcategory ${subcategory.name} deleted successfully from ${category.name}!`,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
