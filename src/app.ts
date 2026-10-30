import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { env } from './config/env';
import { loggerMiddleware } from './middlewares/logger.middleware';
import productRoutes from './routes/products.routes';

const app = express();

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json());
app.use(loggerMiddleware);

app.use('/', productRoutes);

const swaggerPath = path.join(__dirname, '..', 'swagger-output.json');
if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

export default app;   