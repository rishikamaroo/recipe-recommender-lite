/* Copyright (c) 2021 Rishika Maroo */

/**
 * Http status codes
 */
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

/**
 * Log colors
 */
export const enum LogColor {
  Red = '\u001b[1;31m',
  Green = '\u001b[1;32m',
  Yellow = '\u001b[1;33m',
  White = '\u001b[0;37m',
}

/**
 * Http status messages
 */
export const HttpStatusMessage = {
  Success: 'Success',
  InternalServerError: 'Internal server error',
  BadRequestError: 'Invalid request passed',
  NotFoundError: 'No resource found',
  UnAuthorizedError: 'Invalid login credentials',
  InvalidTokenCredentials: 'Invalid token credentials',
};

export type LogTypes = 'debug' | 'info' | 'warn' | 'error';
export type RecipeTypes = 'veg' | 'non-veg' | 'vegan';

export const HASH_ROUNDS = 12;
