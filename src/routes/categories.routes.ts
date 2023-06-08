import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categories.controller";

import {
  createSubcategory,
  getSubcategorieByCategoryId,
  deleteSubcategory,
} from "../controllers/subcategories.controller";

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
