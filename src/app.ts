import express from "express";
import cors from "cors";

import { corsOptions } from "./config/cors";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { apiKeyMiddleware } from "./middlewares/apiKey.middleware";
import usersRoutes from "./routes/users.routes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use(loggerMiddleware);

app.use("/api/users", apiKeyMiddleware, usersRoutes);

export default app;