import { Router } from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/categories.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { categorySchema } from "../schemas/category.schema.js";

const router = Router();

router.get("/get-categories", getCategories);

router.post("/create-category", validateSchema(categorySchema), createCategory);
router.delete("/delete-category/:id", deleteCategory);

export default router;
