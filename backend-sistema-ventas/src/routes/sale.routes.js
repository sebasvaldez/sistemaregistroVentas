import { Router } from "express";
import { createSale,getSale,getsales } from "../controllers/sale.controller.js";
import  saleSchema  from "../schemas/sale.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
const router = Router();

router.get("/get-sales", getsales);
router.get("/get-sale/:id", getSale);
router.post("/create-sale",validateSchema(saleSchema), createSale);

export default router;