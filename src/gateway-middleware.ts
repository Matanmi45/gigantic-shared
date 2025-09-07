import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const token: string[] = [
  'auth',
  'seller',
  'search',
  'gig',
  'order',
  'buyer',
  'review',
  'message',
];

export const verifyGatewayRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers?.gatewayToken) {
    throw new NotAuthorizedError(
      'Invalid request',
      'VerifyGatewayRequest() method: Request not coming from api gateway'
    );
  }

  const token: string = req.headers?.gatewayToken as string;
  if (!token) {
    throw new NotAuthorizedError(
      'Invalid request',
      'VerifyGatewayRequest() method: Request not coming from api gateway'
    );
  }

  try {
    const payload: { id: string; iat: number } = jwt.verify(token, '') as {
      id: string;
      iat: number;
    };
  } catch (error) {
    throw new NotAuthorizedError(
      'Invalid request',
      'VerifyGatewayRequest() method: Request not coming from api gateway'
    );
  }
};
