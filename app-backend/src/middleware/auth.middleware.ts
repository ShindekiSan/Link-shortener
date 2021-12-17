import jwt from 'jsonwebtoken';
import config from 'config';
import { NextFunction, Request, Response } from 'express';

export default (req: Request, resp: Response, next: NextFunction): void | Response => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // @ts-ignore
    const token:string = req.headers.authorization.split(' ')[1];

    if (!token) {
      return resp.status(401).json({ message: 'no authorization' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.body.user = decoded;

    next();
  } catch (e) {
    return resp.status(401).json({ message: 'no authorization' });
  }
};
