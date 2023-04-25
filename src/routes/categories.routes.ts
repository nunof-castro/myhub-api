import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categories.controller";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);

export default router;
