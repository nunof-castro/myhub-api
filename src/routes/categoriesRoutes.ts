import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoriesController";

import {
  createSubcategory,
  deleteSubcategory,
  getSubcategorieByCategoryId,
} from "../controllers/subcategoriesController";

const router = Router();

//Categories routes
router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);

//Subcategories routes
router.get("/:id/subcategories", getSubcategorieByCategoryId);
router.post("/:id/subcategories", createSubcategory);
router.delete("/:id/subcategories/:subcategoryId", deleteSubcategory);

export default router;
