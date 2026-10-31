import type { Request, Response, NextFunction } from "express";

const logRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );

  next();
};

export const loggerMiddleware = logRequest;
export const requestLogger = logRequest;