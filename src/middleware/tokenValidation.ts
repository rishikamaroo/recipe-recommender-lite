import { CustomError } from '../utils/error';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { generateInvalidTokenResponse } from '../utils/response';

/**
 *
 * @param req - Request param
 * @param _res - Response param
 * @param next - Next fn
 */
export const validateToken = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!req.headers.authorization) {
      throw new CustomError('token missing');
    }
    return next();
  } catch (err) {
    generateInvalidTokenResponse(res);
  }
};
