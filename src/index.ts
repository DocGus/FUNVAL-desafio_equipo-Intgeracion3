import { Router } from 'express';
import productRoutes from './routes/products.routes';

const router = Router();

router.use(productRoutes);

export default router;   

import app from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`🚀 Server en http://localhost:${env.port}`);
  console.log(`📚 Swagger en http://localhost:${env.port}/api-docs`);
});   