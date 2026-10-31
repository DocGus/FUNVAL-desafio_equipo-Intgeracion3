
import express from "express";
import swaggerUi from "swagger-ui-express";

import { corsMiddleware } from "./config/cors";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { apiKeyMiddleware } from "./middlewares/apiKey.middleware";

import usersRoutes from "./routes/users.routes";
import categoriesRoutes from "./routes/categories.routes";
import ordersRoutes from "./routes/orders.routes";
import orderItemsRoutes from "./routes/orderItems.routes";

const swaggerDocument = require("../swagger/swagger-output.json");

const app = express();

// Middlewares globales
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Documentación Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Rutas de la API
app.use("/api/users", apiKeyMiddleware, usersRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/order-items", orderItemsRoutes);

export default app;
