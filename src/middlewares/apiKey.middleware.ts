import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

const validateKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.header("x-api-key");

  if (!env.apiKey || apiKey !== env.apiKey) {
    res.status(401).json({
      success: false,
      message: "Acceso no autorizado: x-api-key inválido o ausente",
    });
    return;
  }

  next();
};

export const apiKeyMiddleware = validateKey;
export const validateApiKey = validateKey;