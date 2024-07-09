import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../controllers/product.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { productSchema } from "../schemas/product.schema.js";

const router = Router();

router.get("/get-products", getProducts);
router.get("/get-product/:id", getProduct);
router.post("/create-product", createProduct);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", updateProduct);

export default router;
