/* Copyright (c) 2021 Rishika Maroo */

import { HTTPStatusCode } from '../constants';
import { IException } from '../types';

export class ValidationError extends Error implements IException {
  public code: number;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = HTTPStatusCode.BadRequest;
  }
}

export class InvalidRequestError extends Error implements IException {
  public code: number;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = HTTPStatusCode.BadRequest;
  }
}

export class NotFoundError extends Error implements IException {
  public code: number;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = HTTPStatusCode.NotFound;
  }
}

export class InternalServerError extends Error implements IException {
  public code: number;
  constructor(message: string) {
    super();
    this.message = message;
    this.code = HTTPStatusCode.InternalServerError;
  }
}

export class CustomError extends Error implements IException {
  public code: number;
  constructor(message?: string, code?: number) {
    super();
    this.message =
      message ||
      'The action you are trying to take is not avialable, please contact Author for suggestions';
    this.code = code || HTTPStatusCode.InternalServerError;
  }
}
