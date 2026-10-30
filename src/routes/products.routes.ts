import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller';
import { apiKeyMiddleware } from '../middlewares/apiKey.middleware';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', apiKeyMiddleware, createProduct);
router.put('/products/:id', apiKeyMiddleware, updateProduct);
router.delete('/products/:id', apiKeyMiddleware, deleteProduct);

export default router;   