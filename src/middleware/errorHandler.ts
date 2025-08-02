import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

export const errorHandler = (
  err: AppError | ZodError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  console.error('Error:', err);

  // Zod validation errors
  if (err instanceof ZodError) {
    const message = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message,
      details: err.errors
    });
  }

  // Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(400).json({
          success: false,
          error: 'Duplicate Entry',
          message: 'A record with this information already exists'
        });
      case 'P2025':
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Record not found'
        });
      default:
        return res.status(500).json({
          success: false,
          error: 'Database Error',
          message: 'An error occurred while accessing the database'
        });
    }
  }

  // Handle other errors
  let errorMessage = 'Server Error';
  let statusCode = 500;

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  // Handle specific error types
  if (err.name === 'CastError') {
    errorMessage = 'Resource not found';
    statusCode = 404;
  }

  if ('code' in err && typeof err.code === 'string' && err.code === '11000') {
    errorMessage = 'Duplicate field value entered';
    statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    errorMessage = 'Validation Error';
    statusCode = 400;
  }

  // Use statusCode from AppError if available
  if ('statusCode' in err && typeof err.statusCode === 'number' && err.statusCode) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    success: false,
    error: errorMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}; 