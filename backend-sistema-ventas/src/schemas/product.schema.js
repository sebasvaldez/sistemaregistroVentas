import { z } from "zod";

export const productSchema = z.object({
  brand: z.string().max(40),
  model: z.string().min(1),
  screen: z.object(),
  mainCamera: z.object(),
  precessor: z.string().max(40),
  memory: z.object(),
  battery: z.object(),
  image: z.string().url(),
  stock: z.number().min(1),
  price: z.number().min(1),
});
