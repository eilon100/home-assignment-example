import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { BadRequestError } from '../errors/bad-request';
import { DecodedToken } from '../types/decodedToken';

export const isAuth: RequestHandler = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1];

  if (!token) {
    throw new BadRequestError('token is invalid');
  }

  const decodedToken = verifyToken(token);

  req.session = { userId: decodedToken.userId };
  next();
};

function verifyToken(token: string) {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;

    return decodedToken;
  } catch (error) {
    throw new BadRequestError('token is invalid');
  }
}
