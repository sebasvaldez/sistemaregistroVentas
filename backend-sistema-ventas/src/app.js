import express from "express";
import morgan from "morgan";
import authRoutes from "../src/routes/auth.routes.js";
import categoriesRoutes from "../src/routes/categories.routes.js";
import customerRoutes from "../src/routes/customer.routes.js";
import productRoutes from "../src/routes/product.routes.js";
import saleRoutes from "../src/routes/sale.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//me permite ver las peticiones que llegan al servidor
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", customerRoutes);
app.use("/api", productRoutes)
app.use("/api",saleRoutes)

export default app;
