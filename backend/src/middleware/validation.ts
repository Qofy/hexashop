import { Request, Response, NextFunction } from 'express';

// Validate request body has required fields
export const validateRequired = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = requiredFields.filter(field => !req.body[field]);

    if (missing.length > 0) {
      return res.status(400).json({
        status: 'error',
        error: 'Missing required fields',
        missing,
      });
    }

    next();
  };
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate request has JSON body
export const validateJson = (req: Request, res: Response, next: NextFunction) => {
  if (!req.is('application/json')) {
    return res.status(400).json({
      status: 'error',
      error: 'Content-Type must be application/json',
    });
  }
  next();
};