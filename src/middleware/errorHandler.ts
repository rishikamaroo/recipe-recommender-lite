import * as express from 'express';
import _ from 'lodash';
import { HTTPStatusCode } from '../constants';
import { Logger } from '../utils/logger';

export function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  const logger = new Logger();
  logger.error('API request failed!', err);
  const code = _.get(err, 'code');
  res.json(err);
  if (code) {
    res.status(code);
  }

  res.status(HTTPStatusCode.InternalServerError).json({ message: err.message });
}
