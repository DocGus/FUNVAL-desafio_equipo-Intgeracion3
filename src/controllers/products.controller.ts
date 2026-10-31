import { Request, Response } from 'express';
import { productStore, CreateProductBody, UpdateProductBody } from '../models/Product';

// @ts-ignore
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lista todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Array de productos
 */
export const getProducts = (_req: Request, res: Response): void => {
  res.json(productStore.findAll());
};

// @ts-ignore
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
export const getProduct = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const product = productStore.findById(id);
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }
  res.json(product);
};

// @ts-ignore
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto (requiere API Key)
 *     tags: [Products]
 *     security: [{ apiKey: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, stock, userId, categoryId]
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               stock: { type: integer }
 *               userId: { type: integer }
 *               categoryId: { type: integer }
 *     responses:
 *       201:
 *         description: Producto creado
 */
export const createProduct = (req: Request, res: Response): void => {
  const body = req.body as CreateProductBody;

  // Validación básica
  if (!body.name || body.price == null || body.stock == null) {
    res.status(400).json({ error: 'Faltan campos obligatorios: name, price, stock' });
    return;
  }

  const product = productStore.create(body);
  res.status(201).json(product);
};

// @ts-ignore
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto (requiere API Key)
 *     tags: [Products]
 *     security: [{ apiKey: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
export const updateProduct = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const updated = productStore.update(id, req.body as UpdateProductBody);
  if (!updated) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }
  res.json(updated);
};

// @ts-ignore
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto (requiere API Key)
 *     tags: [Products]
 *     security: [{ apiKey: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
export const deleteProduct = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const deleted = productStore.delete(id);
  if (!deleted) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }
  res.status(204).send("elimianado correctamente");
};   