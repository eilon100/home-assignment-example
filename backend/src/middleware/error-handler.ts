import { ErrorRequestHandler } from 'express';
import { AbstractError } from '../errors/abstract-error';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AbstractError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  return res.status(500).json({ errors: [{ message: 'Internal Error' }] });
};
