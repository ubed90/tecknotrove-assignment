import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || '';

  if (!token) {
    return res.status(401).json({ message: 'Not Authorised' });
  }

  jwt.verify(token as string, process.env.SECRET_KEY as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication Failure.' });
    }

    res.locals.user = user;
    next();
  });
};