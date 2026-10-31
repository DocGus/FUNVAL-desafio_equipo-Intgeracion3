import type { Request, Response, NextFunction } from 'express';
import type { OrderItem } from '../models/OrderItem.ts';

export const validarDetalleDeOrden = (req: Request, res: Response, next: NextFunction): void => {
  const { orderId, productId, quantity, subtotal } = req.body as Partial<OrderItem>;

  if (!orderId || typeof orderId !== 'number' || !orderId) {
    res.status(400).json({ ok: false, error: 'El campo "orderId" es obligatorio y debe ser un número.' });
    return;
  }

  if (productId === undefined || productId === null || typeof productId !== 'number' || !productId) {
    res.status(400).json({ ok: false, error: 'El campo "productId" es obligatorio y debe ser un número.' });
    return;
  }

  if (quantity === undefined || quantity === null || typeof quantity !== 'number' || !quantity) {
    res.status(400).json({ ok: false, error: 'El campo "quantity" es obligatorio y debe ser un número.' });
    return;
  }

  if (subtotal === undefined || subtotal === null || typeof subtotal !== 'number' || !subtotal) {
    res.status(400).json({ ok: false, error: 'El campo "subtotal" es obligatorio y debe ser un número.' });
    return;
  }

  next();
};