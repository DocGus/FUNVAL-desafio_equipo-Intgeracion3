import { Request, Response, NextFunction } from 'express';
// Middleware para validar la API Key
export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  const expectedKey = process.env.API_KEY || 'funval-secret-key-2026';
  if (!apiKey || apiKey !== expectedKey) {
    res.status(401).json({
      success: false,
      message: 'Acceso no autorizado: x-api-key inválido o ausente'
    });
    return;
  }
  next();
};