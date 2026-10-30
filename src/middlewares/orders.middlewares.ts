import type { Request, Response, NextFunction } from 'express';
import type { Orders } from '../models/Order.ts';

export const validarOrden = (req: Request, res: Response, next: NextFunction): void => {
  const { userId, totalAmount, status, date } = req.body as Partial<Orders>;

  if (!userId || typeof userId !== 'number' || !userId) {
    res.status(400).json({ ok: false, error: 'El campo "userId" es obligatorio y debe ser un número.' });
    return;
  }

  if (totalAmount === undefined || totalAmount === null || typeof totalAmount !== 'number' || !totalAmount) {
    res.status(400).json({ ok: false, error: 'El campo "totalAmount" es obligatorio y debe ser un número.' });
    return;
  }

  if (status === undefined || status === null || typeof status !== 'string' || !status) {
    res.status(400).json({ ok: false, error: 'El campo "status" es obligatorio y debe ser texto.' });
    return;
  }

  if (date === undefined || date === null || !(date instanceof Date)) {
    res.status(400).json({ ok: false, error: 'El campo "date" es obligatorio y debe ser una fecha.' });
    return;
  }

  next();
};