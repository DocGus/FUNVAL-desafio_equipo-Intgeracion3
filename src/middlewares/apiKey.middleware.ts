import type { Request, Response, NextFunction } from "express";

const validateKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header("x-api-key");
  const validApiKey = process.env.API_KEY;

  if (!validApiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      message: "Acceso no autorizado: x-api-key inválido o ausente",
    });
  }

  next();
};

export const apiKeyMiddleware = validateKey;
export const validateApiKey = validateKey;