import { Router } from "express";

import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { customerSchema } from "../schemas/customer.schema.js";


const router = Router();

router.get("/get-customers", getCustomers);
router.post("/create-customer", validateSchema(customerSchema), createCustomer);
router.delete("/delete-customer/:id", deleteCustomer);
router.put("/update-customer/:id", updateCustomer);

export default router;
