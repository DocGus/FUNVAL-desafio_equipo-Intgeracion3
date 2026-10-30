import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.headers['x-api-key'] as string;
  console.log(`🔑 Recibido: "${key}" | Esperado: "${env.apiKey}"`);

  if (!key || key !== env.apiKey) {
    res.status(401).json({ error: 'API Key inválida o ausente' });
    return;
  }

  next();
};   