import { z } from "zod";
import mongoose from "mongoose";

const ventaSchema = z.object({
  user: z.string().transform((str) => new mongoose.Types.ObjectId(str)),
  client: z
    .string()

    .transform((str) => new mongoose.Types.ObjectId(str)),
  products: z.array(
    z.object({
      product: z
        .string()

        .transform((str) => new mongoose.Types.ObjectId(str)),
      quantity: z.number().positive().int(),
      price: z.number().nonnegative(),
    })
  ),
  total: z.number().nonnegative(),
});

export default ventaSchema;
