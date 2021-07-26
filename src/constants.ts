export const enum HTTPStatusCode {
  OK = 200,
  Created = 201,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export const enum LogColor {
  Red = '\u001b[1;31m',
  Green = '\u001b[1;32m',
  Yellow = '\u001b[1;33m',
  White = '\u001b[0;37m',
}

export type LogTypes = 'debug' | 'info' | 'warn' | 'error';
