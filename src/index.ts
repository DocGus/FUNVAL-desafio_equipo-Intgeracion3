import express, { Application } from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './config/cors';
import { requestLogger } from './middlewares/logger.middleware';
import categoriesRoutes from './routes/categories.routes';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(requestLogger);

// Ruta de categorías
app.use('/api/categories', categoriesRoutes);

// Documentación interactiva Swagger en /api-docs
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const swaggerFile = require('../swagger/swagger-output.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (error) {
  console.log('Documentación Swagger no encontrada. Recuerda ejecutar: npm run swagger');
}

// Ruta de bienvenida
app.get('/', (req, res) => {
  /* #swagger.ignore = true */
  res.json({
    mensaje: 'API REST E-commerce funcionando',
    documentacion: `http://localhost:${PORT}/api-docs`
  });
});

// Iniciar Servidor bomito 
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`===============================================`);
});

export default app;