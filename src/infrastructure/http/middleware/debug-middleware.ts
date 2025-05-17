import { Request, Response, NextFunction } from 'express';

export const debugMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('------ DEBUG REQUEST ------');
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  console.log('Query:', JSON.stringify(req.query, null, 2));
  console.log('--------------------------');
  next();
};